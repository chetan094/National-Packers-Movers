import styles from './ClientMarquee.module.css';

// ── Custom Monochromatic SVG Logos ───────────────────────────────────

const CoalIndiaLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 2v20M2 12h20M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z" />
    <rect x="10" y="10" width="4" height="4" fill="currentColor" rx="0.5" />
  </svg>
);

const BcclLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <path d="M4 20L18 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M14 3a10 10 0 0 1 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M17 7l-2-2" stroke="currentColor" strokeWidth="2.2" />
    <path d="M5 14l2-3 4 1 2-2 3 3-5 4-6-3z" fill="currentColor" opacity="0.3" />
  </svg>
);

const CmpdiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <path d="M12 2L3 8.5l9 6.5 9-6.5-9-6.5zM3 8.5v7l9 6.5 9-6.5v-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 8.5v13" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="2" r="1.5" fill="currentColor" />
    <circle cx="3" cy="8.5" r="1.5" fill="currentColor" />
    <circle cx="21" cy="8.5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const NtpcLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M13 5L7 13h5v6l6-8h-5V5z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const SailLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <polygon points="12,22 4,8 20,8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M2 8h20" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CclLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <path d="M3 14h14l4-4v4h1M2 17h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="4" y="6" width="11" height="8" stroke="currentColor" strokeWidth="1.8" rx="1" fill="currentColor" opacity="0.2" />
    <circle cx="6" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EclLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <path d="M4 22l6-18h4l6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 9h4M8 15h8M6 20h12" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
  </svg>
);

const SbiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <circle cx="12" cy="11" r="8" stroke="currentColor" strokeWidth="2.5" />
    <rect x="11.2" y="14.5" width="1.6" height="6.5" fill="currentColor" />
    <circle cx="12" cy="11" r="2" fill="currentColor" />
  </svg>
);

const PnbLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <rect x="8" y="8" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const BobLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HdfcLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8" y="8" width="8" height="8" fill="currentColor" opacity="0.15" />
  </svg>
);

const LtLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 7v9h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 7h6M16 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IoclLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="2.2" />
    <ellipse cx="12" cy="12" rx="6" ry="4.5" stroke="currentColor" strokeWidth="1" />
    <rect x="4" y="10.5" width="16" height="3" fill="currentColor" rx="0.5" />
  </svg>
);

const DvcLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
    <path d="M2 18c3-2 5 0 8 0s5-2 8 0 4-1 4-1M2 14c3-2 5 0 8 0s5-2 8 0 4-1 4-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2L8 9h8L12 2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Registry List with SVG mappings ──────────────────────────────────

const clientList = [
  { name: 'Coal India Limited', sub: 'HQ Kolkata', logo: <CoalIndiaLogo /> },
  { name: 'BCCL', sub: 'Coal India Group', logo: <BcclLogo /> },
  { name: 'CMPDI Ranchi', sub: 'Mining Research', logo: <CmpdiLogo /> },
  { name: 'NTPC Limited', sub: 'Energy Sector', logo: <NtpcLogo /> },
  { name: 'SAIL', sub: 'Steel Authority', logo: <SailLogo /> },
  { name: 'CCL Ranchi', sub: 'Central Coalfields', logo: <CclLogo /> },
  { name: 'ECL Asansol', sub: 'Eastern Coalfields', logo: <EclLogo /> },
  { name: 'State Bank of India', sub: 'PSU Banking Sector', logo: <SbiLogo /> },
  { name: 'Punjab National Bank', sub: 'PSU Banking Sector', logo: <PnbLogo /> },
  { name: 'Bank of Baroda', sub: 'Officer Relocation', logo: <BobLogo /> },
  { name: 'HDFC Bank', sub: 'Corporate Transfers', logo: <HdfcLogo /> },
  { name: 'Larsen & Toubro', sub: 'Heavy Infrastructure', logo: <LtLogo /> },
  { name: 'Indian Oil', sub: 'Petroleum Logistics', logo: <IoclLogo /> },
  { name: 'DVC Maithon', sub: 'Damodar Valley Corp', logo: <DvcLogo /> },
];

export default function ClientMarquee() {
  // Duplicate list to ensure seamless infinite looping scroll
  const marqueeItems = [...clientList, ...clientList];

  return (
    <section className={styles.marqueeSection} aria-label="Our PSU & Corporate Relocation Footprint">
      <div className={styles.sectionHeading}>
        <span className={styles.headingBadge}>B2B & PSU Credentials</span>
        <h2 className={styles.headingTitle}>
          Trusted by Officers & Departments of
        </h2>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((item, idx) => (
            <div key={idx} className={styles.clientBadge} id={`client-badge-${idx}`}>
              <div className={styles.badgeLogoWrap}>
                {item.logo}
              </div>
              <div className={styles.badgeTextWrap}>
                <div className={styles.badgeName}>{item.name}</div>
                <div className={styles.badgeSub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className={styles.marqueeDisclaimer}>
        * Representing organizations where National Packers & Movers has successfully relocated officers, staff, or department equipment.
      </p>
    </section>
  );
}
