'use client';
import { useState, useEffect } from 'react';
import styles from './PsuClaimModal.module.css';

const PSU_ORGANIZATIONS = [
  'Coal India Limited (CIL)',
  'Bharat Coking Coal Limited (BCCL)',
  'Central Coalfields Limited (CCL)',
  'Eastern Coalfields Limited (ECL)',
  'Northern Coalfields Limited (NCL)',
  'Central Mine Planning & Design Institute (CMPDI)',
  'Steel Authority of India Limited (SAIL)',
  'Indian Oil Corporation Limited (IOCL)',
  'Damodar Valley Corporation (DVC)',
  'NTPC Limited',
  'State Bank of India (SBI)',
  'Punjab National Bank (PNB)',
  'Bank of Baroda (BOB)',
  'HDFC Bank',
  'Indian Railways',
  'Other PSU Organization',
  'Other Corporate / Private'
];

export default function PsuClaimModal({ isOpen, onClose, defaultOrigin = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    organization: PSU_ORGANIZATIONS[0]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [prevDefaultOrigin, setPrevDefaultOrigin] = useState(defaultOrigin);
  if (defaultOrigin !== prevDefaultOrigin) {
    setPrevDefaultOrigin(defaultOrigin);
    if (defaultOrigin) {
      setFormData(prev => ({ ...prev, from: defaultOrigin }));
    }
  }

  if (!isOpen) return null;

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

    // Validations
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
      setError('Please enter both moving origin and destination.');
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
          moveType: 'PSU Shifting',
          source: 'PSU Relocation Claim Kit Download',
          notes: `[PSU Kit Download Request] Organization: ${formData.organization}`
        })
      });

      const resData = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Trigger file download
        const link = document.createElement('a');
        link.href = '/docs/NPM-PSU-Relocation-Claim-Kit.pdf';
        link.setAttribute('download', 'NPM-PSU-Relocation-Claim-Kit.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          from: '',
          to: '',
          organization: PSU_ORGANIZATIONS[0]
        });
      } else {
        setError(resData.error || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting PSU claim form:', err);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">✖</button>
        
        {!success ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.badge}>💼 PSU &amp; B2B Desk</span>
              <h2 className={styles.modalTitle}>Get Shifting Claim Approval Kit</h2>
              <p className={styles.modalDesc}>
                Submit details below to download your compliant relocation claims checklist and billing templates.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              {error && <div className={styles.errorAlert}>⚠️ {error}</div>}
              
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
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
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Shifting From (Origin) *</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    placeholder="e.g. Ranchi"
                    className={styles.input}
                    required
                    disabled={loading}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Shifting To (Destination) *</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="e.g. Delhi"
                    className={styles.input}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Transferring Organization *</label>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className={styles.select}
                  disabled={loading}
                >
                  {PSU_ORGANIZATIONS.map((org, index) => (
                    <option key={index} value={org}>{org}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? '⏳ Preparing Kit...' : '📥 Submit & Download PDF Kit'}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successWrapper}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Claim Kit Downloaded Successfully!</h2>
            <p className={styles.successDesc}>
              The PDF file has been downloaded to your device. Please check your downloads folder.
            </p>
            <div className={styles.successNoteBox}>
              <strong>Need priority booking?</strong><br/>
              Our corporate billing coordinators are online. Click below to chat directly with our desk on WhatsApp.
            </div>
            <div className={styles.successButtons}>
              <a 
                href={`https://wa.me/9835168368?text=Hello%20National%20Packers%20Movers%2C%20I%20just%20downloaded%20the%20PSU%20Shifting%20Claim%20Approval%20Kit%20for%20my%20relocation.%20I%20need%20a%20priority%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.successWhatsappBtn}
              >
                💬 Chat on WhatsApp
              </a>
              <button className={styles.successCloseBtn} onClick={onClose}>
                Close Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
