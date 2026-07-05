'use client';
import { useState, useMemo } from 'react';
import styles from './BranchPage.module.css';
import { trackEvent } from '@/lib/analytics';

const INVENTORY_ITEMS = [
  { id: 'doubleBed', name: 'Double Bed (with Mattress)', volume: 60, icon: '🛏️', category: 'Furniture' },
  { id: 'singleBed', name: 'Single Bed (with Mattress)', volume: 30, icon: '🛏️', category: 'Furniture' },
  { id: 'wardrobe', name: 'Large Wardrobe', volume: 50, icon: '🚪', category: 'Furniture' },
  { id: 'sofa3', name: 'Sofa (3-Seater)', volume: 35, icon: '🛋️', category: 'Furniture' },
  { id: 'sofa1', name: 'Sofa (1-Seater)', volume: 15, icon: '🛋️', category: 'Furniture' },
  { id: 'diningTable', name: 'Dining Table (4 Chairs)', volume: 40, icon: '🪑', category: 'Furniture' },
  { id: 'studyTable', name: 'Study / Center Table', volume: 12, icon: '📝', category: 'Furniture' },
  { id: 'shoeRack', name: 'Shoe Rack', volume: 12, icon: '👞', category: 'Furniture' },
  { id: 'fridge', name: 'Refrigerator', volume: 30, icon: '❄️', category: 'Appliances' },
  { id: 'washer', name: 'Washing Machine', volume: 20, icon: '🧼', category: 'Appliances' },
  { id: 'ac', name: 'Air Conditioner (AC)', volume: 15, icon: '💨', category: 'Appliances' },
  { id: 'tv', name: 'LED TV with Stand', volume: 15, icon: '📺', category: 'Appliances' },
  { id: 'microwave', name: 'Microwave Oven', volume: 5, icon: '⚡', category: 'Appliances' },
  { id: 'waterPurifier', name: 'Water Purifier', volume: 5, icon: '💧', category: 'Appliances' },
  { id: 'geyser', name: 'Geyser', volume: 6, icon: '🔥', category: 'Appliances' },
  { id: 'box', name: 'Shifting Carton (Standard)', volume: 3, icon: '📦', category: 'Boxes & Bags' },
  { id: 'bag', name: 'Suitcase / Travel Bag', volume: 4, icon: '💼', category: 'Boxes & Bags' },
  { id: 'cooler', name: 'Desert Cooler', volume: 15, icon: '🌬️', category: 'Boxes & Bags' },
  { id: 'flowerPot', name: 'Flower Pot', volume: 3, icon: '🪴', category: 'Boxes & Bags' },
  { id: 'bicycle', name: 'Bicycle', volume: 12, icon: '🚲', category: 'Vehicles' },
  { id: 'bike', name: 'Bike / Two-Wheeler', volume: 35, icon: '🏍️', category: 'Vehicles' }
];

export default function CalculatorModal({ cityName }) {
  const [inventory, setInventory] = useState({
    doubleBed: 0,
    singleBed: 0,
    wardrobe: 0,
    sofa3: 0,
    sofa1: 0,
    diningTable: 0,
    studyTable: 0,
    shoeRack: 0,
    fridge: 0,
    washer: 0,
    ac: 0,
    tv: 0,
    microwave: 0,
    waterPurifier: 0,
    geyser: 0,
    box: 0,
    bag: 0,
    cooler: 0,
    flowerPot: 0,
    bicycle: 0,
    bike: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', from: '', to: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleItemChange = (id, delta) => {
    setInventory(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const handleResetInventory = () => {
    setInventory({
      doubleBed: 0, singleBed: 0, wardrobe: 0, sofa3: 0, sofa1: 0, diningTable: 0, studyTable: 0, shoeRack: 0,
      fridge: 0, washer: 0, ac: 0, tv: 0, microwave: 0, waterPurifier: 0, geyser: 0,
      box: 0, bag: 0, cooler: 0, flowerPot: 0,
      bicycle: 0, bike: 0
    });
  };

  const totalCft = useMemo(() => {
    return INVENTORY_ITEMS.reduce((sum, item) => sum + (inventory[item.id] || 0) * item.volume, 0);
  }, [inventory]);

  const priceEstimates = useMemo(() => {
    if (totalCft === 0) return { local: '—', domestic: '—' };
    
    let localMin = 0, localMax = 0, domesticMin = 0, domesticMax = 0;
    
    if (totalCft <= 200) {
      localMin = 3000; localMax = 6000;
      domesticMin = 12000; domesticMax = 20000;
    } else if (totalCft <= 350) {
      localMin = 4500; localMax = 8500;
      domesticMin = 16000; domesticMax = 29000;
    } else if (totalCft <= 600) {
      localMin = 6500; localMax = 11500;
      domesticMin = 23000; domesticMax = 43000;
    } else if (totalCft <= 1000) {
      localMin = 9000; localMax = 16000;
      domesticMin = 28000; domesticMax = 60000;
    } else {
      localMin = 15000; localMax = 25000;
      domesticMin = 38000; domesticMax = 95000;
    }
    
    return {
      local: `₹${localMin.toLocaleString('en-IN')} - ₹${localMax.toLocaleString('en-IN')}`,
      domestic: `₹${domesticMin.toLocaleString('en-IN')} - ₹${domesticMax.toLocaleString('en-IN')}`
    };
  }, [totalCft]);

  const matchedTruck = useMemo(() => {
    const cft = totalCft;
    if (cft === 0) return { name: 'No Items Selected', desc: 'Select items below to estimate cargo volume and matched truck.', icon: '📋' };
    if (cft <= 200) return { name: 'Tata Ace (Chota Hathi)', desc: 'Ideal for single-room luggage shifts, bike transit, or micro-moves (Max 850kg capacity).', icon: '🚚' };
    if (cft <= 350) return { name: 'Mahindra Bolero Pickup', desc: 'Best fit for 1 BHK local apartment relocations or partial shifting loads (Max 1.5 Tons capacity).', icon: '🛻' };
    if (cft <= 600) return { name: '14-Foot Closed Container Truck', desc: 'Secure weather-proof container for 1.5 BHK or standard 2 BHK moves (Max 3.5 Tons capacity).', icon: '🚛' };
    if (cft <= 1000) return { name: '17-Foot / 19-Foot Container Truck', desc: 'Heavy-duty closed container perfect for standard 3 BHK residential shifts (Max 5 Tons capacity).', icon: '🚛' };
    return { name: '20-Foot / 24-Foot Large Container or Multiple Trips', desc: 'Required for large bungalow shifting, corporate offices, or massive cargo loads.', icon: '🚚' };
  }, [totalCft]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormState({ name: '', phone: '', email: '', from: '', to: '' });
    setFormErrors({});
    setFormSubmitted(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormState(prev => ({
      ...prev,
      from: cityName.replace(/ \(hq\)/i, '')
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Full Name is required';
    if (!formState.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formState.to.trim()) errors.to = 'Destination (To where) is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    trackEvent('click', 'calculator_submit');

    const selectedItems = INVENTORY_ITEMS
      .filter(item => inventory[item.id] > 0)
      .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
      .join(', ');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          from: formState.from,
          to: formState.to,
          inventory: selectedItems,
          matchedVehicle: matchedTruck.name,
          totalCft: totalCft,
          source: 'Calculator Modal'
        })
      });
      if (!res.ok) {
        console.error('Enquiry API returned non-OK status');
      }
    } catch (err) {
      console.error('Error dispatching enquiry background alert:', err);
    }

    setLoading(false);
    setFormSubmitted(true);

    const waUrl = `https://wa.me/919835168368?text=Hi%20National%20Packers,%20I%20just%20submitted%20an%20inventory%20shifting%20request.%0A%0A*Name:*%20${encodeURIComponent(formState.name)}%0A*Phone:*%20${encodeURIComponent(formState.phone)}%0A*Route:*%20${encodeURIComponent(formState.from)}%20to%20${encodeURIComponent(formState.to)}%0A*Suggested%20Truck:*%20${encodeURIComponent(matchedTruck.name)}%0A*Inventory:*%20${encodeURIComponent(selectedItems)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Volume Estimator</span>
            <h2 className="section-title">Shifting Volume &amp; <span>Truck Calculator</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Select your household items below to calculate total volume in Cubic Feet (CFT) and discover the matched truck for {cityName} relocations.
            </p>
          </div>
          
          <div className={styles.calcCard} data-reveal="up" data-delay="100">
            <div className={styles.calcGrid}>
              
              {/* Left Column: Input Categories */}
              <div className={styles.calcInputs}>
                {['Furniture', 'Appliances', 'Boxes & Bags', 'Vehicles'].map((cat) => (
                  <div key={cat} className={styles.calcCategoryGroup}>
                    <h4 className={styles.calcCategoryTitle}>{cat}</h4>
                    <div className={styles.calcItemsList}>
                      {INVENTORY_ITEMS.filter(item => item.category === cat).map((item) => (
                        <div key={item.id} className={styles.calcItemRow}>
                          <div className={styles.calcItemMeta}>
                            <span className={styles.calcItemIcon}>{item.icon}</span>
                            <div>
                              <span className={styles.calcItemName}>{item.name}</span>
                              <span className={styles.calcItemVolume}>{item.volume} CFT</span>
                            </div>
                          </div>
                          <div className={styles.calcControls}>
                            <button 
                              type="button"
                              className={styles.calcControlBtn} 
                              onClick={() => handleItemChange(item.id, -1)}
                              disabled={inventory[item.id] === 0}
                              aria-label={`Decrease ${item.name}`}
                            >
                              −
                            </button>
                            <span className={styles.calcItemCount}>{inventory[item.id]}</span>
                            <button 
                              type="button"
                              className={styles.calcControlBtn} 
                              onClick={() => handleItemChange(item.id, 1)}
                              aria-label={`Increase ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Matched Results Banner */}
              <div className={styles.calcResults}>
                <div className={styles.resultsCard}>
                  <div className={styles.resultsBadge}>📋 Estimated Summary</div>
                  <div className={styles.totalVolumeValue}>
                    {totalCft} <span className={styles.cftUnit}>CFT</span>
                  </div>
                  <p className={styles.resultsLabel}>Estimated Shifting Volume</p>
                  
                  <div className={styles.resultsDivider} />
                  
                  <div className={styles.truckSuggestion}>
                    <div className={styles.truckIconWrap}>
                      <span className={styles.truckSuggestionIcon}>
                        {matchedTruck.icon === '🛻' ? '🛻' : matchedTruck.icon === '🚚' ? '🚚' : '🚛'}
                      </span>
                    </div>
                    <div>
                      <h4 className={styles.truckName}>{matchedTruck.name}</h4>
                      <p className={styles.truckDesc}>{matchedTruck.desc}</p>
                    </div>
                  </div>

                  {totalCft > 0 && (
                    <>
                      <div className={styles.resultsDivider} />
                      <div className={styles.calculatorCostGrid}>
                        <div className={styles.costRangeBox}>
                          <span className={styles.costLabel}>Est. Local Rate</span>
                          <span className={styles.costValue}>{priceEstimates.local}</span>
                        </div>
                        <div className={`${styles.costRangeBox} ${styles.costRangeBoxDomestic}`}>
                          <span className={styles.costLabel}>Est. Domestic Rate</span>
                          <span className={styles.costValue}>{priceEstimates.domestic}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {totalCft > 0 && (
                    <button 
                      type="button"
                      className={styles.resetBtn} 
                      onClick={handleResetInventory}
                    >
                      🔄 Reset Calculator
                    </button>
                  )}

                  <div className={styles.resultsDivider} />

                  <div className={styles.calcQuoteCTA}>
                    <p className={styles.ctaText}>
                      Ready for an exact, itemized quotation? Schedule a surveyor visit:
                    </p>
                    <button 
                      type="button"
                      className="btn btn-primary" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={handleOpenModal}
                      disabled={totalCft === 0}
                    >
                      🚀 Get Free Surveyor Quote
                    </button>
                  </div>
                </div>

                <p className={styles.calcDisclaimer}>
                  *Disclaimer: This is a mathematical guide. Stackability, disassembly of furniture, and packing padding may alter actual space required. Final estimates are verified during our pre-move survey.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR INQUIRY MODAL OVERLAY ───────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              type="button" 
              className={styles.modalClose} 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ✕
            </button>

            {!formSubmitted ? (
              <>
                <h3 className={styles.modalTitle}>📋 Shifting Survey Request</h3>
                <p className={styles.modalSubtitle}>
                  Please fill in your details. We have attached your shifting inventory summary to this request.
                </p>

                {/* Shifting Summary Box */}
                <div className={styles.summaryBox}>
                  <div className={styles.summaryRow}>
                    <strong>Selected Cargo:</strong>
                    <span className={styles.summaryItemsText}>
                      {INVENTORY_ITEMS.filter(item => inventory[item.id] > 0)
                        .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
                        .join(', ') || 'No items selected'}
                    </span>
                  </div>
                  <div className={styles.summaryRow} style={{ marginTop: '0.5rem' }}>
                    <strong>Matched Vehicle:</strong>
                    <span className={styles.summaryTruckHighlight}>
                      {matchedTruck.icon} {matchedTruck.name} ({totalCft} CFT)
                    </span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modal-name" className={styles.formLabel}>Full Name *</label>
                    <input 
                      type="text" 
                      id="modal-name"
                      name="name" 
                      className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`}
                      placeholder="e.g. Chetan Jhampaty"
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <span className={styles.formError}>{formErrors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-phone" className={styles.formLabel}>Phone Number *</label>
                    <input 
                      type="tel" 
                      id="modal-phone"
                      name="phone" 
                      className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ''}`}
                      placeholder="e.g. 9835168368"
                      value={formState.phone}
                      onChange={handleInputChange}
                    />
                    {formErrors.phone && <span className={styles.formError}>{formErrors.phone}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-email" className={styles.formLabel}>Email Address (Optional)</label>
                    <input 
                      type="email" 
                      id="modal-email"
                      name="email" 
                      className={styles.formInput}
                      placeholder="e.g. contact@example.com"
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-from" className={styles.formLabel}>Moving From (Origin) *</label>
                    <input 
                      type="text" 
                      id="modal-from"
                      name="from" 
                      className={styles.formInput}
                      placeholder="e.g. Dhanbad"
                      value={formState.from}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-to" className={styles.formLabel}>Moving To (Destination) *</label>
                    <input 
                      type="text" 
                      id="modal-to"
                      name="to" 
                      className={`${styles.formInput} ${formErrors.to ? styles.inputError : ''}`}
                      placeholder="e.g. Ranchi"
                      value={formState.to}
                      onChange={handleInputChange}
                    />
                    {formErrors.to && <span className={styles.formError}>{formErrors.to}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={loading}>
                    {loading ? '⏳ Registering Request...' : '🚀 Submit Surveyor Request'}
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>✔️</span>
                <h3 className={styles.successTitle}>Survey Request Received!</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formState.name}</strong>. Your inventory shifting request has been registered.
                </p>
                <div className={styles.successDetails}>
                  <p>📞 <strong>Phone:</strong> {formState.phone}</p>
                  <p>📍 <strong>Route:</strong> {formState.from} to {formState.to}</p>
                  <p>🚛 <strong>Vehicle suggested:</strong> {matchedTruck.name}</p>
                </div>
                <p className={styles.successNote}>
                  Our branch coordinator will contact you shortly to confirm your booking and schedule a physical or virtual surveyor assessment.
                </p>
                
                <a
                  href={`https://wa.me/919835168368?text=Hi%20National%20Packers,%20I%20just%20submitted%20an%20inventory%20shifting%20request.%0A%0A*Name:*%20${encodeURIComponent(formState.name)}%0A*Phone:*%20${encodeURIComponent(formState.phone)}%0A*Route:*%20${encodeURIComponent(formState.from)}%20to%20${encodeURIComponent(formState.to)}%0A*Suggested%20Truck:*%20${encodeURIComponent(matchedTruck.name)}%0A*Inventory:*%20${encodeURIComponent(
                    INVENTORY_ITEMS.filter(item => inventory[item.id] > 0)
                      .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
                      .join(', ')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
                >
                  💬 Confirm via WhatsApp
                </a>

                <button 
                  type="button" 
                  className={styles.resetBtn} 
                  onClick={handleCloseModal}
                  style={{ marginTop: '1rem' }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
