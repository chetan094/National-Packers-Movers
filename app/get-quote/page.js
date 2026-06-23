'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const STEPS = ['Move Details', 'Move Type', 'Contact Info', 'Confirm & Send'];

// Comprehensive city list — customer can also type any city
const allCities = [
  // NPM Branch Cities
  'Dhanbad', 'Ranchi', 'Bokaro', 'Deoghar',
  'Kolkata', 'Durgapur', 'Asansol',
  'Patna', 'Bhagalpur',
  'Singrauli',
  // Major Indian Cities
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

const moveTypes = [
  { id: 'household', icon: '🏠', label: 'Household Relocation', desc: 'Complete home shifting' },
  { id: 'corporate', icon: '🏢', label: 'Corporate Relocation', desc: 'Office & employee moves' },
  { id: 'industrial', icon: '🏭', label: 'Industrial Relocation', desc: 'Machinery & equipment' },
  { id: 'vehicle', icon: '🚗', label: 'Vehicle Relocation', desc: 'Car, bike, any vehicle' },
  { id: 'storage', icon: '📦', label: 'Storage / Warehousing', desc: 'Short or long-term storage' },
  { id: 'loading', icon: '💪', label: 'Loading & Unloading', desc: 'Labour only service' },
];

/* ── City Autocomplete Component ─────────────────────────── */
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
              ✏️ Use "{query}" as city name
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function GetQuotePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    from: '', to: '', moveType: '',
    date: '', name: '', phone: '', email: '', notes: '',
  });

  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const buildWhatsAppMessage = () => {
    const moveLabel = moveTypes.find(m => m.id === form.moveType)?.label || form.moveType;
    const msg =
      `*New Quote Request*\n` +
      `*National Packers & Movers*\n` +
      `----------------------------\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || 'Not provided'}\n\n` +
      `*From:* ${form.from}\n` +
      `*To:* ${form.to}\n` +
      `*Move Type:* ${moveLabel}\n` +
      `*Date:* ${form.date}\n` +
      `*Notes:* ${form.notes || 'None'}\n\n` +
      `_Source: thenationalpackersmovers.com_`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // 1️⃣ Dispatch automatic background email alert to HQ
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        from: form.from,
        to: form.to,
        date: form.date,
        moveType: form.moveType,
        notes: form.notes,
        source: 'Quote Wizard'
      })
    }).catch(err => console.error('Error dispatching quote wizard background alert:', err));

    // 2️⃣ Open WhatsApp with full lead details (instant delivery to your phone)
    const waUrl = `https://wa.me/919835168368?text=${buildWhatsAppMessage()}`;
    window.open(waUrl, '_blank');

    // 3️⃣ Show success screen
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
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
            <div className={styles.successRow}><span>Type</span><strong>{moveTypes.find(m => m.id === form.moveType)?.label}</strong></div>
            <div className={styles.successRow}><span>Date</span><strong>{form.date}</strong></div>
            <div className={styles.successRow}><span>Your Phone</span><strong>{form.phone}</strong></div>
          </div>
          <div className={styles.successActions}>
            <a href="tel:9835168368" className="btn btn-primary btn-lg">📞 Call Us — 9835168368</a>
            <Link href="/" className="btn btn-secondary">← Back to Home</Link>
          </div>
          <p className={styles.successNote}>
            Didn't see WhatsApp open?{' '}
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
    <div className={styles.quotePage}>
      {/* Hero */}
      <div className={styles.quoteHero}>
        <div className={styles.quoteHeroBg} />
        <div className={`${styles.quoteHeroContent} container`}>
          <span className="section-tag">100% Free</span>
          <h1 className={styles.quoteTitle}>Get Your <span>Free Quote</span></h1>
          <p className={styles.quoteSubtitle}>
            Fill in the details below — our team will call you within 2 hours with a transparent, no-obligation quote.
          </p>
          <div className={styles.quoteContacts}>
            <a href="tel:9835168368" className={styles.quotePhone}>📞 9835168368</a>
            <span style={{ color: 'var(--gray-700)' }}>|</span>
            <a href="tel:9934166164" className={styles.quotePhone}>📞 9934166164</a>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className={`section ${styles.formSection}`}>
        <div className={`${styles.formContainer} container`}>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            {STEPS.map((label, i) => (
              <div key={i} className={`${styles.stepItem} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepCurrent : ''}`}>
                <div className={styles.stepCircle}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={styles.stepLabel}>{label}</span>
                {i < STEPS.length - 1 && (
                  <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.quoteForm}>

            {/* ── Step 0: From / To ── */}
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

            {/* ── Step 1: Move Type ── */}
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

            {/* ── Step 2: Contact ── */}
            {step === 2 && (
              <div className={styles.formStep}>
                <h2 className={styles.stepTitle}>When & how to reach you?</h2>
                <p className={styles.stepHint}>We'll call you at this number within 2 hours.</p>
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
                      onChange={e => update('phone', e.target.value.replace(/\D/,''))}
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
                  <button type="button" className="btn btn-secondary" onClick={prev} id="step2-prev">← Back</button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={next}
                    disabled={!form.date || !form.name || !form.phone || form.phone.length < 10}
                    id="step2-next"
                  >
                    Review & Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
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
                  <button type="button" className="btn btn-secondary" onClick={prev} id="step3-prev">← Edit</button>
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
            <div className={styles.leadInfo}>
              <div className={styles.leadInfoIcon}>📲</div>
              <h4>How you get leads</h4>
              <p>Every quote request is sent directly to your <strong>WhatsApp (+91 9835168368)</strong> with the customer's full details — instantly, no delay.</p>
            </div>
            <div className={styles.infoContact}>
              <p>Customer prefers to call?</p>
              <a href="tel:9835168368" className="btn btn-primary" id="quote-call-btn">📞 9835168368</a>
              <a href="tel:9934166164" className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>📞 9934166164</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
