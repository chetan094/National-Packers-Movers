'use client';
import { useState } from 'react';

const OP_TABS = [
  {
    id: 'household',
    title: 'Packing & Loading',
    icon: '📦',
    image: '/photos/premium-cushion-sofa-wrapping.jpg',
    alt: 'Premium sofa packing in progress',
    status: 'Packing & Secure Loading',
    progress: 10,
    desc: (city) => `Every item is wrapped in multi-layer packing materials (bubble wrap, foam rolls, and heavy corrugated cartons) and loaded securely using ramp-loading techniques in ${city}.`
  },
  {
    id: 'vehicle',
    title: 'Safe Transit',
    icon: '🚛',
    image: '/photos/secure-cargo-stacking-layout.jpg',
    alt: 'Closed container transport vehicle in highway transit',
    status: 'Highways Transit / In-Transit',
    progress: 50,
    desc: (city) => `Dispatched in our own weather-proof closed containers. The cargo travels via optimized highway routes from ${city} under GPS tracking and with a trained highway driver.`
  },
  {
    id: 'corporate',
    title: 'Unloading & Fitting',
    icon: '🔧',
    image: '/photos/destination-bed-reassembly.jpg',
    alt: 'Unpacking and furniture reassembly at destination',
    status: 'Unloading & Furniture Fitting',
    progress: 90,
    desc: (city) => `Unloaded with care at the destination. Our crew unpacks and places each item, including double-beds, dining tables, and wardrobes, reassembling them exactly where you direct.`
  }
];

export default function LocalOperationsShowcase({ cityName, styles }) {
  const [activeTab, setActiveTab] = useState('household');
  const activeData = OP_TABS.find(t => t.id === activeTab);

  return (
    <div className={styles.opsShowcase}>
      <span className={styles.opsTag}>Live from the Field</span>
      <h3 className={styles.opsHeading}>Local Operations &amp; Fleet in Action</h3>
      <p className={styles.opsSubheading}>
        Real-time snapshot of our shifting processes and active transport setups in {cityName}.
      </p>

      <div className={styles.opsGrid}>
        {/* Left column: Vertical Tab Buttons */}
        <div className={styles.opsTabs}>
          {OP_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.opsTabBtn} ${activeTab === tab.id ? styles.opsTabBtnActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.opsTabIcon}>{tab.icon}</span>
              <span className={styles.opsTabTitle}>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Right column: Dynamic Content Panel */}
        <div className={styles.opsContentPanel}>
          <p className={styles.opsDesc}>{activeData.desc(cityName)}</p>

          {/* Transit Road Animation */}
          <div className={styles.transitTracker}>
            <div className={styles.transitRoad}>
              {/* Background Track Line */}
              <div className={styles.trackBackground}></div>
              
              {/* Active Progress Highlight Line */}
              <div 
                className={styles.trackProgress} 
                style={{ width: `${activeData.progress}%` }}
              ></div>
              
              {/* Custom Branded SVG Container Truck */}
              <div 
                className={styles.transitTruck} 
                style={{ left: `${activeData.progress}%` }}
              >
                <svg className={styles.premiumTruckSvg} viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="22" width="56" height="4" rx="2" fill="var(--gold)" />
                  <path d="M44 10H52C55.3 10 58 12.7 58 16V22H44V10Z" fill="var(--white)" />
                  <path d="M48 12H52C53.7 12 55 13.3 55 15V18H48V12Z" fill="#080c12" />
                  <rect x="44" y="18" width="2" height="4" fill="var(--gold)" />
                  <rect x="6" y="6" width="36" height="16" rx="2" fill="var(--red)" />
                  <line x1="10" y1="10" x2="38" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <line x1="10" y1="14" x2="38" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <line x1="10" y1="18" x2="38" y2="18" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <text x="24" y="16.5" fill="var(--white)" fontSize="5.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">NATIONAL</text>
                  <circle cx="14" cy="24" r="5" fill="#111" />
                  <circle cx="14" cy="24" r="2.5" fill="var(--gold)" />
                  <circle cx="22" cy="24" r="5" fill="#111" />
                  <circle cx="22" cy="24" r="2.5" fill="var(--gold)" />
                  <circle cx="50" cy="24" r="5" fill="#111" />
                  <circle cx="50" cy="24" r="2.5" fill="var(--gold)" />
                </svg>
              </div>

              {/* Milestone Checkpoint Nodes */}
              {OP_TABS.map((tab) => {
                const isPassed = OP_TABS.indexOf(OP_TABS.find(t => t.id === activeTab)) >= OP_TABS.indexOf(tab);
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    className={`${styles.milestoneNode} ${
                      isActive ? styles.milestoneNodeActive : ''
                    } ${
                      isPassed ? styles.milestoneNodePassed : ''
                    }`}
                    style={{ left: `${tab.progress}%` }}
                  >
                    <div className={styles.milestoneDot}></div>
                    <span className={`${styles.milestoneLabel} ${isActive ? styles.milestoneLabelActive : ''}`}>
                      {tab.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.transitStatus}>
              <span>Status: <strong className={styles.statusGlowText}>{activeData.status}</strong></span>
              <span>Progress: <strong>{activeData.progress}%</strong></span>
            </div>
          </div>

          {/* Image Frame */}
          <div className={styles.opsPhotoFrame}>
            {OP_TABS.map((tab) => (
              <div
                key={tab.id}
                className={`${styles.opsPhotoWrapper} ${activeTab === tab.id ? styles.opsPhotoWrapperActive : ''}`}
              >
                <img
                  src={tab.image}
                  alt={tab.alt}
                  className={styles.opsPhoto}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
