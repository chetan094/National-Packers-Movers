'use client';
import { useState } from 'react';
import styles from './BlogSidebarQuote.module.css';

export default function BlogSidebarQuote({ blogTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Form validation
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }
    if (!formData.from.trim() || !formData.to.trim()) {
      setError('Please fill in both shifting origin and destination.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanPhone,
          from: formData.from.trim(),
          to: formData.to.trim(),
          date: formData.date || null,
          moveType: 'Household Shifting',
          source: `Blog Quick Quote: ${blogTitle}`,
          notes: `[Blog Quick Lead] Shifting request submitted from article: "${blogTitle}"`
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', from: '', to: '', date: '' });
      } else {
        setError(data.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting blog sidebar quote form:', err);
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.quoteCard}>
      <div className={styles.header}>
        <span className={styles.badge}>🚀 Instant Quote</span>
        <h4 className={styles.title}>Shifting Price Estimator</h4>
        <p className={styles.subtitle}>Get compliant packers and movers estimates in 2 minutes.</p>
      </div>

      {success ? (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h5 className={styles.successTitle}>Request Submitted!</h5>
          <p className={styles.successText}>
            Our logistics support executive will contact you on WhatsApp shortly with customized quotes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorAlert}>⚠️ {error}</div>}
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>WhatsApp Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit mobile"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Shifting From *</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Origin city"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Shifting To *</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Destination"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Moving Date (Optional)</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={styles.input}
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Processing Estimations...' : '⚡ Get Shifting Price'}
          </button>
        </form>
      )}
    </div>
  );
}
