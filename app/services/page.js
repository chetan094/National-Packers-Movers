import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Services | National Packers & Movers | Household, Corporate & Industrial Relocation',
  description: 'Complete relocation services by National Packers & Movers — household shifting, corporate relocation, industrial transport, vehicle relocation, warehousing and transit insurance across India.',
  keywords: 'packers movers services india, relocation services jharkhand, household shifting, corporate relocation, vehicle transport, warehousing india',
};

const services = [
  {
    slug: 'household-relocation',
    icon: '🏠',
    name: 'Household Relocation',
    desc: 'Complete home shifting — packing, transport, unpacking, furniture assembly. Your memories, moved safely.',
    highlights: ['Full Packing & Unpacking', 'Furniture Disassembly', 'Fragile Item Care', 'Transit Insurance'],
    color: '#F7B731',
  },
  {
    slug: 'corporate-relocation',
    icon: '🏢',
    name: 'Corporate Relocation',
    desc: 'Trusted by PSUs and top corporations. Seamless office and employee relocations with zero downtime.',
    highlights: ['PSU & Corporate Clients', 'Dedicated Coordinator', 'IT Equipment Handling', 'Weekend Moves'],
    color: '#C1121F',
  },
  {
    slug: 'industrial-relocation',
    icon: '🏭',
    name: 'Industrial Relocation',
    desc: 'Heavy machinery, factory equipment — moved safely with specialized rigging, cranes and compliance.',
    highlights: ['Heavy Machinery', 'Crane & Rigging', 'Safety Compliant', 'Factory Shifting'],
    color: '#3A86FF',
  },
  {
    slug: 'vehicle-relocation',
    icon: '🚗',
    name: 'Vehicle Relocation',
    desc: 'Car, bike, or any vehicle — transported safely across India. GPS tracked, insured, zero damage.',
    highlights: ['All Vehicle Types', 'Enclosed Carrier', 'GPS Tracked', 'Door-to-Door'],
    color: '#2D9A60',
  },
  {
    slug: 'warehousing-storage',
    icon: '🏪',
    name: 'Warehousing & Storage',
    desc: 'Secure short-term and long-term storage for household and corporate goods. CCTV monitored.',
    highlights: ['CCTV 24/7', 'Flexible Plans', 'Inventory Managed', 'Climate Safe'],
    color: '#F7B731',
  },
  {
    slug: 'transit-insurance',
    icon: '🛡️',
    name: 'Transit Insurance',
    desc: 'Comprehensive insurance coverage for all your goods during the entire relocation journey.',
    highlights: ['100% Coverage', 'All Item Types', 'Quick Claims', 'Transparent Terms'],
    color: '#C1121F',
  },
  {
    slug: 'loading-unloading',
    icon: '📦',
    name: 'Loading & Unloading',
    desc: 'Trained professional labour for all loading and unloading needs — household, corporate, industrial.',
    highlights: ['Trained Labour', 'Proper Equipment', 'High-Rise Capable', 'Labour Only Option'],
    color: '#3A86FF',
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">What We Offer</span>
          <h1 className={styles.heroTitle}>
            Complete <span>Relocation Services</span><br />
            Across India
          </h1>
          <p className={styles.heroSubtitle}>
            From a single household shift to a large-scale factory relocation — National Packers & Movers
            provides end-to-end relocation solutions trusted by thousands since 1987.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/get-quote" className="btn btn-primary btn-lg" id="services-hero-quote">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 9835168368
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">All Services</span>
            <h2 className="section-title">Choose Your <span>Relocation Service</span></h2>
            <div className="divider" />
            <p className="section-subtitle">Select the service that matches your need — every service comes with our 38-year trust guarantee.</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.serviceCard}
                data-reveal="up"
                data-delay={i * 80}
                id={`service-card-${s.slug}`}
              >
                <div className={styles.serviceIconWrap} style={{ '--accent': s.color }}>
                  <span className={styles.serviceIcon}>{s.icon}</span>
                </div>
                <h3 className={styles.serviceName}>{s.name}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <ul className={styles.highlights}>
                  {s.highlights.map((h, j) => (
                    <li key={j} className={styles.highlightItem}>
                      <span className={styles.highlightDot} />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className={styles.serviceArrow}>Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className={styles.trustBar}>
        <div className={`${styles.trustGrid} container`}>
          {[
            { icon: '🏆', text: 'Trusted Since 1987 — 38+ Years' },
            { icon: '🛡️', text: '100% Insured Moves' },
            { icon: '🗺️', text: '6 States, 15+ Cities' },
            { icon: '📞', text: 'Available 7 Days a Week' },
          ].map((t, i) => (
            <div key={i} className={styles.trustItem} data-reveal="up" data-delay={i * 100}>
              <span className={styles.trustIcon}>{t.icon}</span>
              <span className={styles.trustText}>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>Not Sure Which Service You Need?</h2>
          <p className={styles.ctaSubtitle}>
            Call us or send a WhatsApp message — our team will guide you to the right service and give you a free quote.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg" id="services-cta-quote">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">📞 9835168368</a>
            <a
              href="https://wa.me/919835168368"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
