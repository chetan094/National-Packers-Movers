'use client';
import { useState } from 'react';
import styles from '@/app/testimonials/page.module.css';

export default function TestimonialsForms() {
  // Shifting Review Form state
  const [formData, setFormData] = useState({ name: '', phone: '', rating: 5, text: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Quick Enquiry Form state
  const [enquiryData, setEnquiryData] = useState({ name: '', phone: '', email: '', message: '' });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquirySending, setEnquirySending] = useState(false);

  // Review Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      setFormError('Name and review description cannot be blank.');
      return;
    }
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      setFormError('Please input a valid 10-digit phone number.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', rating: 5, text: '' });
    setFormSubmitted(false);
  };

  // Quick Enquiry Form Submit
  const buildEnquiryWAMsg = () =>
    encodeURIComponent(
      `*New Enquiry — National Packers & Movers*\n\n` +
      `*Name:* ${enquiryData.name}\n` +
      `*Phone:* ${enquiryData.phone}\n` +
      `*Email:* ${enquiryData.email || 'Not provided'}\n\n` +
      `*Message:* ${enquiryData.message}\n\n` +
      `_Source: Testimonials Page — thenationalpackersmovers.com_`
    );

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryData.name.trim() || !enquiryData.phone.trim() || !enquiryData.message.trim()) {
      return;
    }
    if (!/^\d{10}$/.test(enquiryData.phone.replace(/[^0-9]/g, ''))) {
      alert('Please input a valid 10-digit phone number.');
      return;
    }
    setEnquirySending(true);

    // Dispatch background email alert to HQ
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email,
        message: enquiryData.message,
        source: 'Testimonials Page'
      })
    }).catch(err => console.error('Error dispatching testimonials page background alert:', err));

    const waUrl = `https://wa.me/919835168368?text=${buildEnquiryWAMsg()}`;
    window.open(waUrl, '_blank');
    setTimeout(() => {
      setEnquirySending(false);
      setEnquirySubmitted(true);
    }, 700);
  };

  const resetEnquiryForm = () => {
    setEnquiryData({ name: '', phone: '', email: '', message: '' });
    setEnquirySubmitted(false);
  };

  return (
    <div className={styles.actionGrid}>
      {/* Left Column: Direct Links */}
      <div className={styles.linksCard} data-reveal="up" data-delay="100">
        <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Review Portals</span>
        <h2 className={styles.cardTitle}>Rate Us On <span>Google &amp; Justdial</span></h2>
        <p className={styles.cardDesc}>
          Help us expand <span className={styles.gold}>National Packers &amp; Movers</span> by sharing your honest shifting experience. Your reviews guide future families and corporates to relocate with complete safety and zero stress.
        </p>
        
        <div className={styles.linksWrap}>
          <a
            href="https://share.google/9BhocuLaaEBMMpu7q"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLinkGoogle}
          >
            ⭐⭐⭐⭐⭐ Review Us on Google Business Profile
          </a>
          <a
            href="https://www.justdial.com/Dhanbad/National-Packers---Movers-Kasturba-Nagar/9999PX326-X326-150314200013-V4F2_BZDET?via=scode"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLinkJD}
          >
            📞 Leave Feedback on Justdial
          </a>
        </div>
      </div>

      {/* Middle Column: Quick Enquiry Form */}
      <div className={styles.formCard} data-reveal="up" data-delay="150">
        {!enquirySubmitted ? (
          <>
            <h3 className={styles.formTitle}>🚀 Get a Free Shifting Quote</h3>
            <p className={styles.formSubtitle}>
              Fill in your details below to get an instant quote from our experts.
            </p>
            
            <form onSubmit={handleEnquirySubmit} className={styles.subForm}>
              <div className={styles.formGroup}>
                <label htmlFor="enq-name" className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  id="enq-name"
                  className={styles.formInput}
                  placeholder="Your full name"
                  value={enquiryData.name}
                  onChange={(e) => setEnquiryData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="enq-phone" className={styles.formLabel}>Phone Number *</label>
                <input
                  type="tel"
                  id="enq-phone"
                  className={styles.formInput}
                  placeholder="10-digit mobile number"
                  value={enquiryData.phone}
                  onChange={(e) => setEnquiryData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                  maxLength={10}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="enq-email" className={styles.formLabel}>Email (Optional)</label>
                <input
                  type="email"
                  id="enq-email"
                  className={styles.formInput}
                  placeholder="your@email.com"
                  value={enquiryData.email}
                  onChange={(e) => setEnquiryData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="enq-message" className={styles.formLabel}>Message *</label>
                <textarea
                  id="enq-message"
                  className={styles.formTextArea}
                  placeholder="Describe your shifting requirements (origin, destination, date, item details)..."
                  rows="3"
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={enquirySending}>
                {enquirySending ? '⏳ Sending...' : '💬 Send via WhatsApp'}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successBlock}>
            <span className={styles.successIcon}>✔️</span>
            <h3 className={styles.successTitle}>Enquiry Submitted Successfully!</h3>
            <p className={styles.successText}>
              Thank you, <strong>{enquiryData.name}</strong>! Your enquiry has been sent to our HQ. We will call you at <strong>{enquiryData.phone}</strong> within 2 hours.
            </p>
            
            <a
              href={`https://wa.me/919835168368?text=${buildEnquiryWAMsg()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
            >
              💬 Chat on WhatsApp
            </a>

            <button
              type="button"
              onClick={resetEnquiryForm}
              className={styles.resetBtn}
              style={{ marginTop: '1rem' }}
            >
              Submit Another Enquiry
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Submission Form */}
      <div className={styles.formCard} data-reveal="up" data-delay="200">
        {!formSubmitted ? (
          <>
            <h3 className={styles.formTitle}>✍️ Submit Your Shifting Experience</h3>
            <p className={styles.formSubtitle}>
              Relocated with us recently? Tell us how our crew performed.
            </p>
            
            {formError && <div className={styles.formAlert}>{formError}</div>}

            <form onSubmit={handleFormSubmit} className={styles.subForm}>
              <div className={styles.formGroup}>
                <label htmlFor="rev-name" className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  id="rev-name"
                  className={styles.formInput}
                  placeholder="e.g. Debabrata Jhampaty"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-phone" className={styles.formLabel}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="rev-phone"
                  className={styles.formInput}
                  placeholder="e.g. 9835168368"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-rating" className={styles.formLabel}>Overall Rating *</label>
                <select
                  id="rev-rating"
                  className={styles.formSelect}
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                >
                  <option value="5">5 Stars (Excellent Service)</option>
                  <option value="4">4 Stars (Good Shifting)</option>
                  <option value="3">3 Stars (Average)</option>
                  <option value="2">2 Stars (Satisfactory)</option>
                  <option value="1">1 Star (Needs Improvement)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-text" className={styles.formLabel}>Shifting Review *</label>
                <textarea
                  id="rev-text"
                  className={styles.formTextArea}
                  placeholder="Detail your move (e.g., Shifting from Dhanbad to Pune was extremely smooth...)"
                  rows="3"
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                🚀 Submit Shifting Review
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successBlock}>
            <span className={styles.successIcon}>✔️</span>
            <h3 className={styles.successTitle}>Thank You for Your Feedback!</h3>
            <p className={styles.successText}>
              Hi <strong>{formData.name}</strong>, your review has been successfully registered. We appreciate your support in helping us build and perfect our logistics empire.
            </p>
            
            <a
              href={`https://wa.me/919835168368?text=Hi%20National%20Packers,%20I%20just%20submitted%20a%20feedback.%0A%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Rating:*%20${formData.rating}%20Stars%0A*Review:*%20${encodeURIComponent(formData.text)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
            >
              💬 Share with HQ on WhatsApp
            </a>

            <button
              type="button"
              onClick={resetForm}
              className={styles.resetBtn}
              style={{ marginTop: '1rem' }}
            >
              Submit Another Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
