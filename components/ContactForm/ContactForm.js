'use client';
import { useState } from 'react';
import styles from '@/app/contact/page.module.css';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const buildWAMsg = () =>
    encodeURIComponent(
      `*New Enquiry — National Packers & Movers*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || 'Not provided'}\n\n` +
      `*Message:* ${form.message}\n\n` +
      `_Source: Contact Page — thenationalpackersmovers.com_`
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    trackEvent('click', 'contact_submit');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          source: 'Contact Page'
        })
      });
      if (!res.ok) {
        console.error('Contact API returned non-OK status');
      }
    } catch (err) {
      console.error('Error dispatching contact page background alert:', err);
    }

    const waUrl = `https://wa.me/919835168368?text=${buildWAMsg()}`;
    window.open(waUrl, '_blank');

    setSending(false);
    setSent(true);
  };

  return (
    <div className={styles.formWrap} data-reveal="left">
      <h2 className={styles.formTitle}>Send Us a <span>Message</span></h2>
      <div className="divider divider-left" style={{ marginBottom: '1.5rem' }} />

      {sent ? (
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✅</div>
          <h3>Message Sent!</h3>
          <p>
            Thank you, <strong>{form.name}</strong>! Your message has been sent to our WhatsApp.
            Our team will call you at <strong>{form.phone}</strong> within 2 hours.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => { setForm({ name: '', phone: '', email: '', message: '' }); setSent(false); }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Full Name *</label>
            <input
              id="contact-name"
              type="text"
              className="form-input"
              placeholder="Your full name"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-mobile">Phone Number *</label>
            <input
              id="contact-mobile"
              type="tel"
              className="form-input"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={e => update('phone', e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email-field">Email (optional)</label>
            <input
              id="contact-email-field"
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message *</label>
            <textarea
              id="contact-message"
              className="form-input"
              rows={4}
              placeholder="Tell us about your move — where from, where to, when..."
              value={form.message}
              onChange={e => update('message', e.target.value)}
              style={{ resize: 'vertical' }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={sending || !form.name || !form.phone || !form.message}
            id="contact-submit"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {sending ? '⏳ Sending...' : '💬 Send via WhatsApp'}
          </button>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '0.75rem' }}>
            Your message goes directly to our team on WhatsApp — instant delivery, no delays.
          </p>
        </form>
      )}
    </div>
  );
}
