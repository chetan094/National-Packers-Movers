'use client';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

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

export default function BillingClaimForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    organization: PSU_ORGANIZATIONS[0]
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    trackEvent('click', 'reimbursement_kit_download');

    // Validations
    if (!form.name.trim()) {
      setError('Please enter your full name.');
      setSending(false);
      return;
    }
    const cleanPhone = form.phone.trim().replace(/\s+/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.');
      setSending(false);
      return;
    }
    if (!form.from.trim() || !form.to.trim()) {
      setError('Please enter both origin and destination cities.');
      setSending(false);
      return;
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: cleanPhone,
          from: form.from.trim(),
          to: form.to.trim(),
          moveType: 'PSU Shifting',
          source: 'PSU Relocation Claim Kit Download',
          notes: `[PSU Kit Download Request] Organization: ${form.organization}`
        })
      });

      if (response.ok) {
        setSent(true);
        
        // Trigger automatic file download
        const link = document.createElement('a');
        link.href = '/docs/NPM-PSU-Relocation-Claim-Kit.pdf';
        link.setAttribute('download', 'NPM-PSU-Relocation-Claim-Kit.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset form
        setForm({
          name: '',
          phone: '',
          from: '',
          to: '',
          organization: PSU_ORGANIZATIONS[0]
        });
      } else {
        const resData = await response.json();
        setError(resData.error || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting claim form:', err);
      setError('Network error occurred. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, #070b12, #0d1624)',
      borderRadius: 'var(--radius-md)',
      padding: '1.75rem',
      border: '1px solid rgba(247, 183, 49, 0.25)',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span style={{ display: 'inline-block', background: 'rgba(247, 183, 49, 0.08)', color: 'var(--gold)', border: '1px solid rgba(247, 183, 49, 0.15)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
          💼 PSU &amp; B2B Desk
        </span>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--white)', margin: '0 0 0.25rem 0' }}>
          Get Shifting Claim Approval Kit
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', margin: 0 }}>
          Submit details below to download your compliant relocation claims checklist and billing templates.
        </p>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--white)', marginBottom: '0.5rem' }}>Claim Kit Downloaded!</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-300)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
            The PDF file has been downloaded to your device. Please check your downloads folder.
          </p>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '6px', padding: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--gray-300)', textAlign: 'left', lineHeight: '1.5' }}>
            <strong>Need booking help?</strong> Our coordinators are online to format custom invoices matching your department's exact audit rules.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a 
              href={`https://wa.me/9835168368?text=Hello%20National%20Packers%20Movers%2C%20I%20just%20downloaded%20the%20PSU%20Shifting%20Claim%20Approval%20Kit%20for%20my%20relocation.%20I%20need%20a%20priority%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '0.65rem' }}
            >
              💬 Chat on WhatsApp
            </a>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSent(false)}
              style={{ padding: '0.65rem' }}
            >
              Back to Form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {error && <div style={{ background: 'rgba(193, 18, 31, 0.1)', border: '1px solid rgba(193, 18, 31, 0.2)', padding: '0.75rem', borderRadius: '6px', color: '#ffb3b3', fontSize: '0.85rem' }}>⚠️ {error}</div>}

          <div className="form-row-2col">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                required
                disabled={sending}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>WhatsApp Number *</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="10-digit mobile"
                value={form.phone}
                onChange={e => update('phone', e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                required
                disabled={sending}
              />
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Shifting From (Origin) *</label>
              <input
                type="text"
                name="from"
                className="form-input"
                placeholder="e.g. Ranchi"
                value={form.from}
                onChange={e => update('from', e.target.value)}
                required
                disabled={sending}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Shifting To (Destination) *</label>
              <input
                type="text"
                name="to"
                className="form-input"
                placeholder="e.g. Delhi"
                value={form.to}
                onChange={e => update('to', e.target.value)}
                required
                disabled={sending}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Transferring Organization *</label>
            <select
              name="organization"
              value={form.organization}
              onChange={e => update('organization', e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(247,183,49,0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.2rem',
                color: 'var(--white)',
                fontSize: '1rem',
                outline: 'none',
                width: '100%'
              }}
              disabled={sending}
            >
              {PSU_ORGANIZATIONS.map((org, index) => (
                <option key={index} value={org} style={{ background: '#131A26', color: '#fff' }}>{org}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={sending || !form.name || !form.phone || !form.from || !form.to}
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '0.5rem',
              padding: '0.85rem',
              background: 'var(--grad-cta)',
              boxShadow: '0 4px 12px rgba(193, 18, 31, 0.25)',
              fontWeight: '700',
              fontFamily: 'var(--font-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {sending ? '⏳ Preparing Kit...' : '📥 Submit & Download PDF Kit'}
          </button>
          
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textAlign: 'center', opacity: 0.8 }}>
            🔒 Free Official Resource • Immediate Download
          </span>
        </form>
      )}
    </div>
  );
}
