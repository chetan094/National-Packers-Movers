'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const branches = [
  {
    state: 'Jharkhand (HQ)',
    icon: '⭐',
    isHQ: true,
    cities: [
      { name: 'Dhanbad — HQ', address: 'Kasturba Nagar, Near Dhanbad Thana, Dhanbad — 826001', phone: '9835168368' },
      { name: 'Ranchi', address: 'Ranchi, Jharkhand', phone: '9835168368' },
      { name: 'Bokaro', address: 'Bokaro Steel City, Jharkhand', phone: '9835168368' },
      { name: 'Deoghar', address: 'Deoghar, Jharkhand', phone: '9835168368' },
    ],
  },
  {
    state: 'West Bengal',
    icon: '📍',
    cities: [
      { name: 'Kolkata', address: 'Kolkata, West Bengal', phone: '9835168368' },
      { name: 'Durgapur', address: 'Durgapur, West Bengal', phone: '9835168368' },
      { name: 'Asansol', address: 'Asansol, West Bengal', phone: '9835168368' },
    ],
  },
  {
    state: 'Bihar',
    icon: '📍',
    cities: [
      { name: 'Patna', address: 'Patna, Bihar', phone: '9835168368' },
      { name: 'Bhagalpur', address: 'Bhagalpur, Bihar', phone: '9835168368' },
    ],
  },
  {
    state: 'Madhya Pradesh',
    icon: '📍',
    cities: [
      { name: 'Singrauli', address: 'Singrauli, Madhya Pradesh', phone: '9835168368' },
    ],
  },
  {
    state: 'Odisha',
    icon: '📍',
    cities: [{ name: 'Virtual Office', address: 'Enquiries via HQ Dhanbad', phone: '9835168368' }],
  },
  {
    state: 'Uttar Pradesh',
    icon: '📍',
    cities: [{ name: 'Coming Soon', address: 'Enquiries via HQ Dhanbad', phone: '9835168368' }],
  },
];

export default function ContactPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Dispatch automatic background email alert to HQ
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        source: 'Contact Page'
      })
    }).catch(err => console.error('Error dispatching contact page background alert:', err));

    const waUrl = `https://wa.me/919835168368?text=${buildWAMsg()}`;
    window.open(waUrl, '_blank');
    setTimeout(() => { setSending(false); setSent(true); }, 700);
  };

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">Contact Us</span>
          <h1 className={styles.heroTitle}>
            Get In <span>Touch</span> With Us
          </h1>
          <p className={styles.heroSubtitle}>
            Have a question, need a quote, or want to discuss your move? We are available 7 days a week — 
            call, WhatsApp, or email us anytime.
          </p>
        </div>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className={styles.contactMethodsGrid}>

            <a href="tel:9835168368" className={styles.contactMethod} id="contact-phone-1" data-reveal="up" data-delay="0">
              <div className={styles.methodIcon}>📞</div>
              <div className={styles.methodLabel}>Call HQ</div>
              <div className={styles.methodValue}>9835168368</div>
              <div className={styles.methodSub}>Mon–Sun, 8AM–8PM</div>
            </a>

            <a href="tel:9934166164" className={styles.contactMethod} id="contact-phone-2" data-reveal="up" data-delay="80">
              <div className={styles.methodIcon}>📞</div>
              <div className={styles.methodLabel}>Alternate Line</div>
              <div className={styles.methodValue}>9934166164</div>
              <div className={styles.methodSub}>Mon–Sun, 8AM–8PM</div>
            </a>

            <a
              href="https://wa.me/919835168368"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactMethod} ${styles.contactMethodWA}`}
              id="contact-whatsapp"
              data-reveal="up"
              data-delay="160"
            >
              <div className={styles.methodIcon}>💬</div>
              <div className={styles.methodLabel}>WhatsApp</div>
              <div className={styles.methodValue}>+91 9835168368</div>
              <div className={styles.methodSub}>Instant Response</div>
            </a>

            <a
              href="mailto:npmdhanbad11@gmail.com"
              className={`${styles.contactMethod} ${styles.contactMethodEmail}`}
              id="contact-email"
              data-reveal="up"
              data-delay="240"
            >
              <div className={styles.methodIcon}>✉️</div>
              <div className={styles.methodLabel}>Email Us</div>
              <div className={styles.methodValue}>npmdhanbad11@gmail.com</div>
              <div className={styles.methodSub}>Reply within 24 hours</div>
            </a>

          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + MAP ── */}
      <section className="section">
        <div className="container">
          <div className={styles.formMapGrid}>

            {/* Contact Form */}
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
                      onChange={e => update('phone', e.target.value.replace(/\D/, ''))}
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

            {/* HQ Info + Map */}
            <div className={styles.mapWrap} data-reveal="right">
              <div className={styles.hqCard}>
                <h3 className={styles.hqTitle}>🏢 Headquarters</h3>
                <div className={styles.hqDetail}>
                  <span>📍</span>
                  <span>Kasturba Nagar, Near Dhanbad Thana,<br />Dhanbad, Jharkhand — 826001</span>
                </div>
                <div className={styles.hqDetail}>
                  <span>📞</span>
                  <div>
                    <a href="tel:9835168368" className={styles.hqPhone}>9835168368</a>
                    <a href="tel:9934166164" className={styles.hqPhone}>9934166164</a>
                  </div>
                </div>
                <div className={styles.hqDetail}>
                  <span>✉️</span>
                  <a href="mailto:npmdhanbad11@gmail.com" className={styles.hqEmail}>
                    npmdhanbad11@gmail.com
                  </a>
                </div>
                <div className={styles.hqDetail}>
                  <span>🕐</span>
                  <span>Monday – Sunday, 8:00 AM – 8:00 PM</span>
                </div>
              </div>
              {/* Google Map Embed */}
              <div className={styles.mapEmbed}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.6791234!2d86.4333!3d23.7957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6e4af4e4e4e4e%3A0x0!2sDhanbad%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1686000000000!5m2!1sen!2sin"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 'var(--radius-md)', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="National Packers & Movers HQ — Dhanbad"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BRANCH DIRECTORY ── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">All Branches</span>
            <h2 className="section-title">Our Branch <span>Network</span></h2>
            <div className="divider" />
            <p className="section-subtitle">Find your nearest National Packers & Movers office — 6 states, 15+ cities across India.</p>
          </div>
          <div className={styles.branchGrid}>
            {branches.map((b, i) => (
              <div
                key={i}
                className={`${styles.branchCard} ${b.isHQ ? styles.branchCardHQ : ''}`}
                data-reveal="up"
                data-delay={i * 80}
              >
                <div className={styles.branchStateHeader}>
                  <span>{b.icon}</span>
                  <h4 className={styles.branchState}>{b.state}</h4>
                  {b.isHQ && <span className={styles.hqBadge}>HQ</span>}
                </div>
                <div className={styles.branchCities}>
                  {b.cities.map((c, j) => (
                    <div key={j} className={styles.branchCity}>
                      <div className={styles.branchCityName}>{c.name}</div>
                      <a href={`tel:${c.phone}`} className={styles.branchPhone}>📞 {c.phone}</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL LINKS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Follow Us</span>
            <h2 className="section-title">Connect on <span>Social Media</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.socialGrid}>
            {[
              { name: 'YouTube', url: 'https://www.youtube.com/@NationalPackersandMovers11', desc: 'Watch our work — customer testimonials and packing videos', color: '#FF0000', icon: '▶' },
              { name: 'Instagram', url: 'https://www.instagram.com/national.packers.and.movers/', desc: 'Follow for moving tips, behind-the-scenes and updates', color: '#E1306C', icon: '📸' },
              { name: 'Facebook', url: 'https://www.facebook.com/people/National-Packers-Movers/100077275401485/', desc: 'Like our page for news, promotions and customer reviews', color: '#1877F2', icon: 'f' },
              { name: 'Threads', url: 'https://www.threads.com/@national.packers.and.movers', desc: 'Join the conversation on Threads — tips and updates daily', color: '#000000', icon: '⊗' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                data-reveal="up"
                data-delay={i * 90}
                id={`contact-social-${s.name.toLowerCase()}`}
              >
                <div className={styles.socialIcon} style={{ background: s.color }}>{s.icon}</div>
                <h4 className={styles.socialName}>{s.name}</h4>
                <p className={styles.socialDesc}>{s.desc}</p>
                <span className={styles.socialArrow}>Visit →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
