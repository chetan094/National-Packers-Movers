'use client';
import { useState, useEffect } from 'react';
import styles from './TrackerWidget.module.css';

const STEP_MILESTONES = [
  { key: 'Booked', label: 'Booked', percentage: 10, icon: '📋' },
  { key: 'Packed', label: 'Packed & Loaded', percentage: 35, icon: '📦' },
  { key: 'Dispatched', label: 'Dispatched', percentage: 60, icon: '🚛' },
  { key: 'In Transit', label: 'In Transit', percentage: 80, icon: '🛰️' },
  { key: 'Delivered', label: 'Delivered', percentage: 100, icon: '✅' }
];

export default function TrackerWidget() {
  const [cnInput, setCnInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shipment, setShipment] = useState(null);

  // Auto-fetch if CN number is in URL query parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryCn = params.get('cn');
      if (queryCn) {
        setCnInput(queryCn);
        performTrack(queryCn);
      }
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!cnInput.trim()) {
      setError('Please enter a valid consignment number.');
      return;
    }
    performTrack(cnInput.trim());
  };

  const performTrack = async (cnNumber) => {
    setLoading(true);
    setError('');
    setShipment(null);
    try {
      const res = await fetch(`/api/track?cn=${encodeURIComponent(cnNumber)}`);
      const data = await res.json();
      
      if (res.ok) {
        setShipment(data.shipment);
      } else {
        setError(data.error || 'Failed to fetch consignment details.');
      }
    } catch (err) {
      console.error('Tracking query failed:', err);
      setError('Network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getActiveProgressPercentage = (status) => {
    // Standard mapping values
    if (status === 'Booked') return 10;
    if (status === 'Packed') return 35;
    if (status === 'Dispatched') return 60;
    if (status === 'In Transit') return 80;
    if (status === 'Out for Delivery') return 90;
    if (status === 'Delivered') return 100;
    return 0;
  };

  const checkMilestonePassed = (currentStatus, milestoneKey) => {
    const statusOrder = ['Booked', 'Packed', 'Dispatched', 'In Transit', 'Delivered'];
    
    // Normalize 'Out for Delivery' to 'In Transit' for index ordering
    const normalizedStatus = currentStatus === 'Out for Delivery' ? 'In Transit' : currentStatus;
    const currentIndex = statusOrder.indexOf(normalizedStatus);
    
    let milestoneIndex = statusOrder.indexOf(milestoneKey);
    return currentIndex >= milestoneIndex;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const parsed = new Date(dateStr);
      if (isNaN(parsed.getTime())) return dateStr;
      return parsed.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={styles.trackerWrapper}>
      {/* ── SEARCH INPUT FORM ────────────────────────────────── */}
      <div className={styles.searchCard}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.inputBoxGroup}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Enter Consignment No. (e.g. NPM-2026-1001)"
              value={cnInput}
              onChange={(e) => setCnInput(e.target.value)}
              className={styles.searchInput}
              disabled={loading}
              required
            />
          </div>
          <button type="submit" className={styles.searchBtn} disabled={loading}>
            {loading ? '⏳ Searching...' : 'Track Cargo'}
          </button>
        </form>
        {error && <div className={styles.errorAlert}>⚠️ {error}</div>}
      </div>

      {/* ── LOADER SKELETON ──────────────────────────────────── */}
      {loading && (
        <div className={styles.loaderCard}>
          <div className={styles.spinner}></div>
          <p>Connecting to GPS transit desk...</p>
        </div>
      )}

      {/* ── TRACKING RESULT REPORT ───────────────────────────── */}
      {shipment && !loading && (
        <div className={styles.reportContainer}>
          
          {/* Header Summary Row */}
          <div className={styles.reportHeader}>
            <div className={styles.headerTitleCol}>
              <span className={styles.livePulse}>Live Track</span>
              <h2 className={styles.cnHeader}>CN: {shipment.consignment_number}</h2>
              <p className={styles.routeHeader}>
                {shipment.origin} ➔ {shipment.destination}
              </p>
            </div>
            <div className={styles.headerStatusCol}>
              <span className={`${styles.statusLabel} ${styles['status' + shipment.current_status.replace(/\s+/g, '')]}`}>
                {shipment.current_status}
              </span>
              <p className={styles.updateStamp}>
                Updated: {new Date(shipment.created_at || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Stepper Timeline Stepper */}
          <div className={styles.stepperContainer}>
            <div className={styles.roadTrack}>
              <div className={styles.roadBg}></div>
              <div 
                className={styles.roadProgress} 
                style={{ width: `${getActiveProgressPercentage(shipment.current_status)}%` }}
              ></div>
              
              {STEP_MILESTONES.map((milestone, idx) => {
                const isPassed = checkMilestonePassed(shipment.current_status, milestone.key);
                const isActive = shipment.current_status === milestone.key || 
                  (milestone.key === 'In Transit' && shipment.current_status === 'Out for Delivery');
                return (
                  <div
                    key={idx}
                    className={`${styles.stepNode} ${isPassed ? styles.stepNodePassed : ''} ${isActive ? styles.stepNodeActive : ''}`}
                    style={{ left: `${milestone.percentage}%` }}
                  >
                    <div className={styles.stepDot}>
                      <span className={styles.stepIcon}>{milestone.icon}</span>
                    </div>
                    <span className={styles.stepLabel}>{milestone.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Details Cards */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailsCard}>
              <h3>🚛 Consignment Parameters</h3>
              <div className={styles.parameterRow}>
                <span>Customer Identity</span>
                <strong>{shipment.customer_name}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Booking Location</span>
                <strong>{shipment.origin}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Destination Area</span>
                <strong>{shipment.destination}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Booking Date</span>
                <strong>{formatDate(shipment.booking_date)}</strong>
              </div>
            </div>

            <div className={styles.detailsCard}>
              <h3>🛰️ Transit Logistics Status</h3>
              <div className={styles.parameterRow}>
                <span>Assigned Fleet No.</span>
                <strong>{shipment.vehicle_number}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Current Coordinates</span>
                <strong>{shipment.current_location}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Duty Pilot (Driver)</span>
                <strong>{shipment.driver_name}</strong>
              </div>
              <div className={styles.parameterRow}>
                <span>Driver Contact Desk</span>
                <strong>{shipment.driver_phone}</strong>
              </div>
            </div>
          </div>

          {/* Dynamic Milestones Log Timeline */}
          <div className={styles.timelineLogCard}>
            <h3>📋 Chronological Transit Terminal Log</h3>
            <div className={styles.logList}>
              {shipment.status_history && shipment.status_history.length > 0 ? (
                // Sort history in reverse-chronological order (newest first)
                [...shipment.status_history]
                  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                  .map((log, index) => (
                    <div key={index} className={styles.logItem}>
                      <div className={styles.logIndicator}>
                        <div className={styles.logDotActive}></div>
                        {index < shipment.status_history.length - 1 && <div className={styles.logLine}></div>}
                      </div>
                      <div className={styles.logContent}>
                        <div className={styles.logHeaderRow}>
                          <strong className={styles.logStatus}>{log.status}</strong>
                          <span className={styles.logDate}>
                            {formatDate(log.date)} {log.time || ''}
                          </span>
                        </div>
                        <p className={styles.logLoc}>📍 {log.location || 'Terminal Hub'}</p>
                        {log.notes && <p className={styles.logNotes}>Note: {log.notes}</p>}
                      </div>
                    </div>
                  ))
              ) : (
                <div className={styles.emptyLog}>
                  📌 Awaiting first transit dispatch terminal scans from origin hub.
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
