'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/get-quote/page.module.css';
import calcStyles from '@/components/BranchPage/BranchPage.module.css';
import { trackEvent } from '@/lib/analytics';
import { routesData } from '@/data/routesData';

const moveTypes = [
  { id: 'household', icon: '🏠', label: 'Household Relocation', desc: 'Complete home shifting' },
  { id: 'corporate', icon: '🏢', label: 'Corporate Relocation', desc: 'Office & employee moves' },
  { id: 'industrial', icon: '🏭', label: 'Industrial Relocation', desc: 'Machinery & equipment' },
  { id: 'vehicle', icon: '🚗', label: 'Vehicle Relocation', desc: 'Car, bike, any vehicle' },
  { id: 'storage', icon: '📦', label: 'Storage / Warehousing', desc: 'Short or long-term storage' },
  { id: 'loading', icon: '💪', label: 'Loading & Unloading', desc: 'Labour only service' },
];

const allCities = [
  'Dhanbad', 'Ranchi', 'Bokaro', 'Deoghar',
  'Kolkata', 'Durgapur', 'Asansol',
  'Patna', 'Bhagalpur',
  'Singrauli',
  'Delhi', 'New Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Bangalore', 'Bengaluru',
  'Chennai', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Bhopal', 'Indore', 'Nagpur',
  'Visakhapatnam', 'Vijayawada', 'Bhubaneswar', 'Cuttack', 'Rourkela',
  'Guwahati', 'Siliguri', 'Howrah', 'Durgapur', 'Bardhaman',
  'Varanasi', 'Agra', 'Kanpur', 'Allahabad', 'Prayagraj', 'Noida', 'Ghaziabad',
  'Gurgaon', 'Faridabad', 'Chandigarh', 'Amritsar', 'Ludhiana',
  'Surat', 'Rajkot', 'Vadodara', 'Aurangabad', 'Nashik',
  'Jamshedpur', 'Hazaribagh', 'Giridih', 'Dumka',
  'Muzaffarpur', 'Gaya', 'Darbhanga',
  'Raipur', 'Bilaspur', 'Jabalpur',
];

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

const getCityState = (city) => {
  const c = (city || '').toLowerCase().trim();
  if (['dhanbad', 'ranchi', 'bokaro', 'deoghar', 'jamshedpur', 'hazaribagh', 'giridih', 'ramgarh', 'medininagar', 'daltonganj', 'chas', 'adityapur', 'dumka', 'jharia', 'katras', 'sindri'].includes(c)) return 'Jharkhand';
  if (['kolkata', 'durgapur', 'asansol', 'siliguri', 'howrah', 'darjeeling', 'kharagpur', 'haldia', 'bardhaman', 'malda', 'jalpaiguri', 'cooch-behar', 'purulia', 'bankura', 'midnapore', 'medinipur'].includes(c)) return 'West Bengal';
  if (['patna', 'bhagalpur', 'gaya', 'muzaffarpur', 'purnia', 'darbhanga', 'bihar-sharif', 'begusarai', 'katihar', 'munger', 'chhapra'].includes(c)) return 'Bihar';
  if (['singrauli', 'waidhan', 'bhopal', 'indore', 'jabalpur', 'gwalior', 'ujjain', 'sagar', 'dewas', 'satna'].includes(c)) return 'Madhya Pradesh';
  if (['bhubaneswar', 'cuttack', 'rourkela', 'puri', 'sambalpur'].includes(c)) return 'Odisha';
  if (['lucknow', 'kanpur', 'ghaziabad', 'agra', 'meerut', 'varanasi', 'prayagraj', 'allahabad', 'noida', 'greater-noida', 'ayodhya'].includes(c)) return 'Uttar Pradesh';
  return 'Other';
};

const STATE_DISTANCES = {
  'Jharkhand': { 'Jharkhand': 150, 'West Bengal': 350, 'Bihar': 350, 'Uttar Pradesh': 700, 'Madhya Pradesh': 800, 'Odisha': 450, 'Other': 1000 },
  'West Bengal': { 'Jharkhand': 350, 'West Bengal': 200, 'Bihar': 600, 'Uttar Pradesh': 900, 'Madhya Pradesh': 1200, 'Odisha': 500, 'Other': 1200 },
  'Bihar': { 'Jharkhand': 350, 'West Bengal': 600, 'Bihar': 150, 'Uttar Pradesh': 500, 'Madhya Pradesh': 900, 'Odisha': 750, 'Other': 1100 },
  'Uttar Pradesh': { 'Jharkhand': 700, 'West Bengal': 900, 'Bihar': 500, 'Uttar Pradesh': 250, 'Madhya Pradesh': 600, 'Odisha': 950, 'Other': 1000 },
  'Madhya Pradesh': { 'Jharkhand': 800, 'West Bengal': 1200, 'Bihar': 900, 'Uttar Pradesh': 600, 'Madhya Pradesh': 250, 'Odisha': 700, 'Other': 900 },
  'Odisha': { 'Jharkhand': 450, 'West Bengal': 500, 'Bihar': 750, 'Uttar Pradesh': 950, 'Madhya Pradesh': 700, 'Odisha': 200, 'Other': 1100 },
  'Other': { 'Jharkhand': 1000, 'West Bengal': 1200, 'Bihar': 1100, 'Uttar Pradesh': 1000, 'Madhya Pradesh': 900, 'Odisha': 1100, 'Other': 1200 }
};

const estimateDistance = (fromCity, toCity) => {
  const from = (fromCity || '').toLowerCase().trim();
  const to = (toCity || '').toLowerCase().trim();
  
  if (from === to) return 0;
  
  // 1. Direct route lookup
  const directRoute = routesData.find(
    r => (r.origin.toLowerCase() === from && r.destination.toLowerCase() === to) ||
         (r.origin.toLowerCase() === to && r.destination.toLowerCase() === from)
  );
  
  if (directRoute && directRoute.distance) {
    const parsed = parseInt(directRoute.distance.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed)) return parsed;
  }

  // Special route overrides
  if ((from.includes('kolkata') && to.includes('visakhapatnam')) || 
      (from.includes('visakhapatnam') && to.includes('kolkata')) ||
      (from.includes('kolkata') && to.includes('vizag')) ||
      (from.includes('vizag') && to.includes('kolkata'))) {
    return 880;
  }
  
  // 2. State fallback
  const fromState = getCityState(from);
  const toState = getCityState(to);
  
  const fromMap = STATE_DISTANCES[fromState] || STATE_DISTANCES['Other'];
  return fromMap[toState] || fromMap['Other'] || 900;
};

function CityInput({ label, value, onChange, placeholder, id }) {
  const [query, setQuery] = useState(value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);

  const filtered = query.length >= 1
    ? allCities.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (city) => {
    setQuery(city);
    onChange(city);
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="form-group" ref={wrapRef} style={{ position: 'relative' }}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className={`form-input ${styles.cityInput} ${focused ? styles.cityInputFocused : ''}`}
        value={query}
        onChange={handleChange}
        onFocus={() => { setFocused(true); setShowSuggestions(true); }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
      {showSuggestions && filtered.length > 0 && (
        <div className={styles.suggestions}>
          {filtered.map(city => (
            <button
              key={city}
              type="button"
              className={styles.suggestionItem}
              onMouseDown={() => select(city)}
            >
              📍 {city}
            </button>
          ))}
          {query.length > 1 && !allCities.some(c => c.toLowerCase() === query.toLowerCase()) && (
            <button
              type="button"
              className={`${styles.suggestionItem} ${styles.suggestionCustom}`}
              onMouseDown={() => select(query)}
            >
              ✏️ Use &quot;{query}&quot; as city name
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    from: '', to: '', moveType: '',
    date: '', name: '', phone: '', email: '', notes: '',
  });

  const [inventory, setInventory] = useState({
    doubleBed: 0, singleBed: 0, wardrobe: 0, sofa3: 0, sofa1: 0, diningTable: 0, studyTable: 0, shoeRack: 0,
    fridge: 0, washer: 0, ac: 0, tv: 0, microwave: 0, waterPurifier: 0, geyser: 0,
    box: 0, bag: 0, cooler: 0, flowerPot: 0,
    bicycle: 0, bike: 0
  });

  const getSteps = () => {
    if (form.moveType === 'household') {
      return ['Move Details', 'Move Type', 'Inventory List', 'Contact Info', 'Confirm & Send'];
    }
    return ['Move Details', 'Move Type', 'Contact Info', 'Confirm & Send'];
  };

  const activeSteps = getSteps();

  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }));
  const next = () => setStep(s => Math.min(s + 1, activeSteps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleItemChange = (id, delta) => {
    setInventory(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const totalCFT = INVENTORY_ITEMS.reduce((sum, item) => sum + (inventory[item.id] || 0) * item.volume, 0);

  const priceEstimates = (() => {
    if (totalCFT === 0) return { local: '—', domestic: '—' };
    let localMin = 0, localMax = 0;
    if (totalCFT <= 200) {
      localMin = 3000; localMax = 6000;
    } else if (totalCFT <= 350) {
      localMin = 4500; localMax = 8500;
    } else if (totalCFT <= 600) {
      localMin = 6500; localMax = 11500;
    } else if (totalCFT <= 1000) {
      localMin = 9000; localMax = 16000;
    } else {
      localMin = 15000; localMax = 25000;
    }

    const dist = estimateDistance(form.from, form.to);
    if (dist === 0) {
      return {
        local: `₹${localMin.toLocaleString('en-IN')} - ₹${localMax.toLocaleString('en-IN')}`,
        domestic: 'Local Shifting'
      };
    }

    let domesticMin = 0, domesticMax = 0;
    if (totalCFT <= 200) {
      domesticMin = 5500 + (dist * 15);
      domesticMax = 7500 + (dist * 20);
    } else if (totalCFT <= 350) {
      domesticMin = 7000 + (dist * 21);
      domesticMax = 9500 + (dist * 25);
    } else if (totalCFT <= 600) {
      domesticMin = 12000 + (dist * 30);
      domesticMax = 18000 + (dist * 37);
    } else if (totalCFT <= 1000) {
      domesticMin = 16000 + (dist * 38);
      domesticMax = 19000 + (dist * 46);
    } else {
      domesticMin = 22000 + (dist * 48);
      domesticMax = 30000 + (dist * 56);
    }

    domesticMin = Math.round(domesticMin / 500) * 500;
    domesticMax = Math.round(domesticMax / 500) * 500;

    return {
      local: `₹${localMin.toLocaleString('en-IN')} - ₹${localMax.toLocaleString('en-IN')}`,
      domestic: `₹${domesticMin.toLocaleString('en-IN')} - ₹${domesticMax.toLocaleString('en-IN')}`
    };
  })();

  const matchedTruck = (() => {
    const cft = totalCFT;
    if (cft === 0) return { name: 'No Items Selected', desc: 'Select items below to estimate cargo volume and matched truck.', icon: '📋' };
    if (cft <= 200) return { name: 'Tata Ace (Chota Hathi)', desc: 'Ideal for single-room luggage shifts, bike transit, or micro-moves (Max 850kg capacity).', icon: '🚚' };
    if (cft <= 350) return { name: 'Mahindra Bolero Pickup', desc: 'Best fit for 1 BHK local apartment relocations or partial shifting loads (Max 1.5 Tons capacity).', icon: '🛻' };
    if (cft <= 600) return { name: '14-Foot Closed Container Truck', desc: 'Secure weather-proof container for 1.5 BHK or standard 2 BHK moves (Max 3.5 Tons capacity).', icon: '🚛' };
    if (cft <= 1000) return { name: '17-Foot / 19-Foot Container Truck', desc: 'Heavy-duty closed container perfect for standard 3 BHK residential shifts (Max 5 Tons capacity).', icon: '🚛' };
    return { name: '20-Foot / 24-Foot Large Container or Multiple Trips', desc: 'Required for large bungalow shifting, corporate offices, or massive cargo loads.', icon: '🚚' };
  })();

  const selectedItemsList = INVENTORY_ITEMS
    .filter(item => inventory[item.id] > 0)
    .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
    .join(', ');

  const buildWhatsAppMessage = () => {
    const moveLabel = moveTypes.find(m => m.id === form.moveType)?.label || form.moveType;
    let msg =
      `*New Quote Request*\n` +
      `*National Packers & Movers*\n` +
      `----------------------------\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || 'Not provided'}\n\n` +
      `*From:* ${form.from}\n` +
      `*To:* ${form.to}\n` +
      `*Move Type:* ${moveLabel}\n` +
      `*Date:* ${form.date}\n`;
      
    if (form.moveType === 'household' && selectedItemsList) {
      msg += `\n*Selected Inventory:* ${selectedItemsList}\n` +
             `*Total Volume:* ${totalCFT} CFT\n` +
             `*Suggested Truck:* ${matchedTruck.name}\n`;
    }
    
    msg += `\n*Notes:* ${form.notes || 'None'}\n\n` +
           `_Source: thenationalpackersmovers.com_`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    trackEvent('click', 'quote_submit');

    const enquiryBody = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      from: form.from,
      to: form.to,
      date: form.date,
      moveType: form.moveType,
      notes: form.notes,
      source: 'Quote Wizard'
    };

    if (form.moveType === 'household' && selectedItemsList) {
      enquiryBody.inventory = selectedItemsList;
      enquiryBody.matchedVehicle = matchedTruck.name;
      enquiryBody.totalCft = totalCFT;
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryBody)
      });
      if (!res.ok) {
        console.error('Enquiry API returned non-OK status');
      }
    } catch (err) {
      console.error('Error dispatching quote wizard backend alert:', err);
    }

    const waUrl = `https://wa.me/919835168368?text=${buildWhatsAppMessage()}`;
    window.open(waUrl, '_blank');

    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    const moveLabel = moveTypes.find(m => m.id === form.moveType)?.label || form.moveType;
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✅</div>
          <h1 className={styles.successTitle}>Quote Request Sent!</h1>
          <p className={styles.successText}>
            Thank you, <strong>{form.name}</strong>! Your quote request has been sent directly to our team on WhatsApp.
            We will call you at <strong>{form.phone}</strong> within 2 hours with a free, transparent quote.
          </p>
          <div className={styles.successDetails}>
            <div className={styles.successRow}><span>From</span><strong>{form.from}</strong></div>
            <div className={styles.successRow}><span>To</span><strong>{form.to}</strong></div>
            <div className={styles.successRow}><span>Type</span><strong>{moveLabel}</strong></div>
            <div className={styles.successRow}><span>Date</span><strong>{form.date}</strong></div>
            <div className={styles.successRow}><span>Your Phone</span><strong>{form.phone}</strong></div>
            {form.moveType === 'household' && selectedItemsList && (
              <div className={styles.successRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                <span>Inventory Selected</span>
                <strong style={{ fontSize: '0.85rem', lineHeight: '1.4', marginTop: '0.2rem' }}>{selectedItemsList}</strong>
              </div>
            )}
          </div>
          <div className={styles.successActions}>
            <a href="tel:9835168368" className="btn btn-primary btn-lg">📞 Call Us — 9835168368</a>
            <Link href="/" className="btn btn-secondary">← Back to Home</Link>
          </div>
          <p className={styles.successNote}>
            Didn&apos;t see WhatsApp open?{' '}
            <a
              href={`https://wa.me/919835168368?text=${buildWhatsAppMessage()}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--gold)', fontWeight: 600 }}
            >
              Click here to send on WhatsApp ↗
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.formContainer} container`}>
      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
        {activeSteps.map((label, i) => (
          <div key={i} className={`${styles.stepItem} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepCurrent : ''}`}>
            <div className={styles.stepCircle}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={styles.stepLabel}>{label}</span>
            {i < activeSteps.length - 1 && (
              <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.quoteForm}>
        {/* Step 0: From / To */}
        {step === 0 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Where are you moving?</h2>
            <p className={styles.stepHint}>Type a city name or select from the suggestions below.</p>
            <div className={styles.formRow}>
              <CityInput
                label="Moving From *"
                value={form.from}
                onChange={v => update('from', v)}
                placeholder="e.g. Dhanbad, Kolkata, Delhi..."
                id="from-city"
              />
              <div className={styles.swapIcon}>⇄</div>
              <CityInput
                label="Moving To *"
                value={form.to}
                onChange={v => update('to', v)}
                placeholder="e.g. Mumbai, Ranchi, Patna..."
                id="to-city"
              />
            </div>
            <button
              type="button"
              className={`btn btn-primary btn-lg ${styles.nextBtn}`}
              onClick={next}
              disabled={!form.from.trim() || !form.to.trim()}
              id="step0-next"
            >
              Next Step →
            </button>
          </div>
        )}

        {/* Step 1: Move Type */}
        {step === 1 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>What are you moving?</h2>
            <p className={styles.stepHint}>Select the category that best describes your move.</p>
            <div className={styles.moveTypeGrid}>
              {moveTypes.map(type => (
                <button
                  type="button"
                  key={type.id}
                  className={`${styles.moveTypeCard} ${form.moveType === type.id ? styles.moveTypeSelected : ''}`}
                  onClick={() => update('moveType', type.id)}
                  id={`move-type-${type.id}`}
                >
                  <span className={styles.moveTypeIcon}>{type.icon}</span>
                  <span className={styles.moveTypeLabel}>{type.label}</span>
                  <span className={styles.moveTypeDesc}>{type.desc}</span>
                </button>
              ))}
            </div>
            <div className={styles.stepBtns}>
              <button type="button" className="btn btn-secondary" onClick={prev} id="step1-prev">← Back</button>
              <button type="button" className="btn btn-primary btn-lg" onClick={next} disabled={!form.moveType} id="step1-next">
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 (Household Shifting only): Inventory List */}
        {form.moveType === 'household' && step === 2 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Select Shifting Items</h2>
            <p className={styles.stepHint}>Add items to estimate cargo volume and choose the matched truck size.</p>
            
            <div className={calcStyles.calcCard} style={{ background: 'transparent', border: 'none', padding: 0, boxShadow: 'none' }}>
              <div className={calcStyles.calcGrid} style={{ gap: '2rem' }}>
                {/* Left Pane: Categories list */}
                <div className={calcStyles.calcInputs} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {['Furniture', 'Appliances', 'Boxes & Bags', 'Vehicles'].map((cat) => (
                    <div key={cat} className={calcStyles.calcCategoryGroup}>
                      <h4 className={calcStyles.calcCategoryTitle} style={{ color: 'var(--gold)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                        {cat}
                      </h4>
                      <div className={calcStyles.calcItemsList}>
                        {INVENTORY_ITEMS.filter(item => item.category === cat).map((item) => (
                          <div key={item.id} className={calcStyles.calcItemRow}>
                            <div className={calcStyles.calcItemMeta}>
                              <span className={calcStyles.calcItemIcon}>{item.icon}</span>
                              <div>
                                <span className={calcStyles.calcItemName}>{item.name}</span>
                                <span className={calcStyles.calcItemVolume}>{item.volume} CFT</span>
                              </div>
                            </div>
                            <div className={calcStyles.calcControls}>
                              <button 
                                type="button"
                                className={calcStyles.calcControlBtn} 
                                onClick={() => handleItemChange(item.id, -1)}
                                disabled={inventory[item.id] === 0}
                              >
                                −
                              </button>
                              <span className={calcStyles.calcItemCount} style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{inventory[item.id]}</span>
                              <button 
                                type="button"
                                className={calcStyles.calcControlBtn} 
                                onClick={() => handleItemChange(item.id, 1)}
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

                {/* Right Pane: Live Volume Summary Box */}
                <div className={calcStyles.calcResults}>
                  <div className={calcStyles.resultsCard} style={{ position: 'sticky', top: '20px' }}>
                    <div className={calcStyles.resultsBadge}>📋 Shifting Summary</div>
                    <div className={calcStyles.totalVolumeValue}>
                      {totalCFT} <span className={calcStyles.cftUnit}>CFT</span>
                    </div>
                    <p className={calcStyles.resultsLabel}>Estimated Shifting Volume</p>
                    
                    <div className={calcStyles.resultsDivider} />
                    
                    <div className={calcStyles.truckSuggestion}>
                      <div className={calcStyles.truckIconWrap}>
                        <span className={calcStyles.truckSuggestionIcon}>
                          {matchedTruck.name.includes('Bolero') ? '🛻' : matchedTruck.name.includes('Tata Ace') ? '🚚' : '🚛'}
                        </span>
                      </div>
                      <div>
                        <h4 className={calcStyles.truckName}>{matchedTruck.name}</h4>
                        <p className={calcStyles.truckDesc}>{matchedTruck.desc}</p>
                      </div>
                    </div>

                    {totalCFT > 0 && (
                      <>
                        <div className={calcStyles.resultsDivider} />
                        <div className={calcStyles.calculatorCostGrid}>
                          <div className={calcStyles.costRangeBox}>
                            <span className={calcStyles.costLabel}>Local Price</span>
                            <span className={calcStyles.costValue}>{priceEstimates.local}</span>
                          </div>
                          <div className={`${calcStyles.costRangeBox} ${calcStyles.costRangeBoxDomestic}`}>
                            <span className={calcStyles.costLabel}>Domestic Price</span>
                            <span className={calcStyles.costValue}>{priceEstimates.domestic}</span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          className={calcStyles.resetBtn} 
                          onClick={() => setInventory({
                            doubleBed: 0, singleBed: 0, wardrobe: 0, sofa3: 0, sofa1: 0, diningTable: 0, studyTable: 0, shoeRack: 0,
                            fridge: 0, washer: 0, ac: 0, tv: 0, microwave: 0, waterPurifier: 0, geyser: 0,
                            box: 0, bag: 0, cooler: 0, flowerPot: 0,
                            bicycle: 0, bike: 0
                          })}
                        >
                          🔄 Reset Items
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.stepBtns} style={{ marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={prev} id="calc-step-prev">← Back</button>
              <button type="button" className="btn btn-primary btn-lg" onClick={next} id="calc-step-next">
                Continue Shifting Details →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 (Non-Household) or Step 3 (Household): Contact Details */}
        {((form.moveType !== 'household' && step === 2) || (form.moveType === 'household' && step === 3)) && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>When & how to reach you?</h2>
            <p className={styles.stepHint}>We&apos;ll call you at this number within 2 hours.</p>
            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label" htmlFor="moving-date">Preferred Moving Date *</label>
                <input
                  type="date"
                  id="moving-date"
                  className="form-input"
                  value={form.date}
                  onChange={e => update('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="contact-phone"
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value.replace(/\D/g,''))}
                  maxLength={10}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email (optional)</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label" htmlFor="contact-notes">Special Instructions (optional)</label>
              <textarea
                id="contact-notes"
                className="form-input"
                rows={3}
                placeholder="e.g. Have a piano, AC unit, fragile antiques, heavy machinery..."
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className={styles.stepBtns}>
              <button type="button" className="btn btn-secondary" onClick={prev} id="contact-step-prev">← Back</button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={next}
                disabled={!form.date || !form.name || !form.phone || form.phone.length < 10}
                id="contact-step-next"
              >
                Review & Confirm →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 (Non-Household) or Step 4 (Household): Confirm & Submit */}
        {((form.moveType !== 'household' && step === 3) || (form.moveType === 'household' && step === 4)) && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Review & Submit</h2>
            <p className={styles.stepHint}>Confirm your details. On submit, your request will be sent directly to our team via WhatsApp.</p>
            <div className={styles.reviewCard}>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Moving From</span><strong className={styles.reviewValue}>{form.from}</strong></div>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Moving To</span><strong className={styles.reviewValue}>{form.to}</strong></div>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Move Type</span><strong className={styles.reviewValue}>{moveTypes.find(m => m.id === form.moveType)?.label}</strong></div>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Date</span><strong className={styles.reviewValue}>{form.date}</strong></div>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Your Name</span><strong className={styles.reviewValue}>{form.name}</strong></div>
              <div className={styles.reviewRow}><span className={styles.reviewLabel}>Phone</span><strong className={styles.reviewValue}>{form.phone}</strong></div>
              {form.email && <div className={styles.reviewRow}><span className={styles.reviewLabel}>Email</span><strong className={styles.reviewValue}>{form.email}</strong></div>}
              {form.moveType === 'household' && selectedItemsList && (
                <div className={styles.reviewRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                  <span className={styles.reviewLabel}>Inventory Items</span>
                  <strong className={styles.reviewValue} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{selectedItemsList}</strong>
                </div>
              )}
              {form.notes && <div className={styles.reviewRow}><span className={styles.reviewLabel}>Notes</span><strong className={styles.reviewValue}>{form.notes}</strong></div>}
            </div>
            <div className={styles.whatsappNotice}>
              <span>💬</span>
              <div>
                <strong>How will you receive this lead?</strong>
                <p>This form will open WhatsApp and send all details directly to <strong>+91 9835168368</strong>.</p>
              </div>
            </div>
            <div className={styles.stepBtns}>
              <button type="button" className="btn btn-secondary" onClick={prev} id="review-step-prev">← Edit</button>
              <button type="submit" className={`btn btn-primary btn-lg ${sending ? styles.sending : ''}`} id="submit-quote" disabled={sending}>
                {sending ? '⏳ Sending...' : '🚀 Submit via WhatsApp'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Side Info */}
      <div className={styles.quoteInfo}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Why Choose Us?</h3>
          <ul className={styles.infoList}>
            <li>✅ Free, no-obligation quote</li>
            <li>✅ Response within 2 hours</li>
            <li>✅ Transparent pricing — no hidden charges</li>
            <li>✅ Fully insured moves</li>
            <li>✅ Trained professional team</li>
            <li>✅ Serving PSUs & top corporations</li>
            <li>✅ Trusted since 1987 — 38+ years</li>
          </ul>
        </div>

        <div className={styles.infoContact}>
          <p>Customer prefers to call?</p>
          <a href="tel:9835168368" className="btn btn-primary" id="quote-call-btn">📞 9835168368</a>
          <a href="tel:9934166164" className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>📞 9934166164</a>
        </div>
      </div>
    </div>
  );
}
