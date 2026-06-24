import Link from 'next/link';
import styles from './page.module.css';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';
import ClientMarquee from '@/components/ClientMarquee/ClientMarquee';
import TrustStats from '@/components/TrustStats/TrustStats';
import HeroSlideshow from '@/components/HeroSlideshow/HeroSlideshow';
import TestimonialsSlider from '@/components/TestimonialsSlider/TestimonialsSlider';

export const metadata = {
  title: 'National Packers & Movers — Trusted Since 1987 | All India Service',
  description: 'National Packers & Movers — India\'s trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.',
  keywords: 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand',
};

const serviceCategories = [
  {
    icon: '🏠',
    title: 'Household Relocation',
    desc: 'Complete home shifting — packing, transport, unpacking. Your memories, our responsibility.',
    slug: 'household-relocation',
    color: '#F7B731',
  },
  {
    icon: '🏢',
    title: 'Corporate Relocation',
    desc: 'Trusted by PSUs & top corporations for seamless office and employee relocations.',
    slug: 'corporate-relocation',
    color: '#C1121F',
  },
  {
    icon: '🏭',
    title: 'Industrial Relocation',
    desc: 'Heavy machinery, factory equipment — moved safely with specialized handling.',
    slug: 'industrial-relocation',
    color: '#3A86FF',
  },
  {
    icon: '🚗',
    title: 'Vehicle Relocation',
    desc: 'Car, bike, or any vehicle transported safely to any destination across India.',
    slug: 'vehicle-relocation',
    color: '#2D9A60',
  },
];

const whyUs = [
  { icon: '🏆', title: 'Trusted Since 1987', desc: '38+ years of proven excellence in logistics and relocation across India.' },
  { icon: '🛡️', title: 'Fully Insured Moves', desc: 'Every shipment is covered. Zero compromise on the safety of your belongings.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We commit to timelines and deliver. No delays, no excuses.' },
  { icon: '👨‍🔧', title: 'Trained Professionals', desc: 'Expert packing crew trained to handle fragile, delicate, and heavy items.' },
  { icon: '🗺️', title: 'All-India Network', desc: '6 states, 15+ cities, tie-ups across India for seamless end-to-end service.' },
  { icon: '🤝', title: 'PSU & Corporate Trusted', desc: 'Serving leading public sector companies and corporate organizations.' },
];

const howItWorks = [
  { step: '01', title: 'Request a Quote', desc: 'Call us or fill our online form. Get a free, transparent quote within 2 hours.' },
  { step: '02', title: 'Expert Packing', desc: 'Our trained team arrives and packs every item with the right material.' },
  { step: '03', title: 'Safe Transport', desc: 'Your goods are loaded, secured, and transported with GPS-tracked vehicles.' },
  { step: '04', title: 'Safe Delivery', desc: 'We deliver, unpack, and arrange everything at your new destination.' },
];

const branches = [
  { state: 'Jharkhand', cities: ['Dhanbad (HQ)', 'Ranchi', 'Bokaro', 'Deoghar'], slug: 'jharkhand' },
  { state: 'West Bengal', cities: ['Kolkata', 'Durgapur', 'Asansol'], slug: 'west-bengal' },
  { state: 'Bihar', cities: ['Patna', 'Bhagalpur'], slug: 'bihar' },
  { state: 'Madhya Pradesh', cities: ['Singrauli'], slug: 'madhya-pradesh' },
  { state: 'Odisha', cities: ['Virtual Office'], slug: 'odisha' },
  { state: 'Uttar Pradesh', cities: ['Coming Soon'], slug: 'uttar-pradesh' },
];

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`${styles.heroContent} container`}>
          <div className={styles.heroBadge}>
            <span>🏆</span> Trusted Since 1987 — 38+ Years of Excellence
          </div>
          <h1 className={styles.heroTitle}>
            India's Trusted<br />
            <span className={styles.heroGold}>Packers & Movers</span><br />
            <span className={styles.heroRed}>Since 1987</span>
          </h1>
          <p className={styles.heroSubtitle}>
            From Dhanbad to Delhi, Kolkata to Kolhapur — we move your world safely.
            Household, Corporate, Industrial & Vehicle Relocation across India.
          </p>
          <div className={styles.heroTagline}>
            <span
              data-typewriter='"Honesty is not our policy, but our Principle."'
              data-tw-delay="950"
              data-tw-speed="38"
            />
          </div>
          <div className={styles.heroCtas}>
            <Link href="/get-quote" className="btn btn-primary btn-lg">
              🚀 Get Free Quote
            </Link>
            <Link href="/track-shipment" className="btn btn-secondary btn-lg">
              📦 Track Shipment
            </Link>
          </div>
          <div className={styles.heroContacts}>
            <a href="tel:9835168368" className={styles.heroPhone}>📞 9835168368</a>
            <span className={styles.heroDivider}>|</span>
            <a href="tel:9934166164" className={styles.heroPhone}>📞 9934166164</a>
          </div>
        </div>
        <HeroSlideshow />
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <TrustStats />

      {/* ── B2B / PSU CLIENT MARQUEE ──────────────────────── */}
      <ClientMarquee />

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section className={`section bg-section-dark ${styles.servicesSection}`} id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our <span>Relocation Services</span></h2>
            <div className="divider" />
            <p className="section-subtitle">Complete relocation solutions tailored to every need — household, corporate, industrial, or vehicle.</p>
          </div>
          <div className={styles.servicesGrid}>
            {serviceCategories.map((service, i) => (
              <Link
                key={i}
                href={`/services/${service.slug}`}
                className={styles.serviceCard}
                data-reveal="up"
                data-delay={i * 120}
              >
                <div className={styles.serviceIconWrap} style={{ '--accent': service.color }}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <span className={styles.serviceArrow}>Learn More →</span>
              </Link>
            ))}
          </div>
          <div className={styles.allServicesLink}>
            <Link href="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className={`section ${styles.whySection}`} id="why-us">
        <div className={styles.whyBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">Why National Packers & Movers</span>
            <h2 className="section-title">Why Thousands <span>Trust Us</span></h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {whyUs.map((item, i) => (
              <div key={i} className="card" data-reveal="up" data-delay={i * 90}>
                <div className="icon-box" style={{ marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className={`section bg-section-dark ${styles.howSection}`} id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Process</span>
            <h2 className="section-title">How It <span>Works</span></h2>
            <div className="divider" />
            <p className="section-subtitle">4 simple steps from your call to safe delivery at your new home.</p>
          </div>
          <div className={styles.stepsGrid}>
            {howItWorks.map((step, i) => (
              <div key={i} className={styles.stepCard} data-reveal="up" data-delay={i * 130}>
                <div className={styles.stepNumber}>{step.step}</div>
                {i < howItWorks.length - 1 && <div className={styles.stepConnector} />}
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE CLIENTS ─────────────────────────────── */}
      <section className={`section ${styles.corporateSection}`} id="corporate">
        <div className={styles.corporateBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">Corporate Trust</span>
            <h2 className="section-title">Trusted by <span>India's Leading</span> Organizations</h2>
            <div className="divider" />
            <p className="section-subtitle">Public sector units, government organizations, and top corporations trust National Packers & Movers for their critical relocations.</p>
          </div>
          <div className={styles.corporateGrid}>
            <div className={styles.corporateStat} data-reveal="up" data-delay="0">
              <div className="stat-number">500+</div>
              <div className="stat-label">Corporate Moves</div>
            </div>
            <div className={styles.corporateStat} data-reveal="up" data-delay="120">
              <div className="stat-number">50+</div>
              <div className="stat-label">PSU Clients</div>
            </div>
            <div className={styles.corporateStat} data-reveal="up" data-delay="240">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
          <div className={styles.corporateBadges}>
            <div className={styles.psuBadge}>🏛️ Public Sector Units</div>
            <div className={styles.psuBadge}>⚡ Energy Companies</div>
            <div className={styles.psuBadge}>⛏️ Mining Organizations</div>
            <div className={styles.psuBadge}>🏗️ Industrial Corporations</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/services/corporate-relocation" className="btn btn-primary btn-lg">
              Learn About Corporate Relocation
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANCHES MAP ──────────────────────────────────── */}
      <section className={`section bg-section-dark ${styles.branchSection}`} id="branches">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Network</span>
            <h2 className="section-title">Offices Across <span>India</span></h2>
            <div className="divider" />
            <p className="section-subtitle">6 states, 15+ cities — and growing. National presence, local expertise.</p>
          </div>
          <div className={styles.branchGrid}>
            {branches.map((branch, i) => (
              <Link
                key={i}
                href={`/branches/${branch.slug}`}
                className={styles.branchCard}
                data-reveal="up"
                data-delay={i * 80}
              >
                <div className={styles.branchState}>
                  <span className={styles.branchPin}>📍</span>
                  {branch.state}
                </div>
                <div className={styles.branchCities}>
                  {branch.cities.map((city, j) => (
                    <span key={j} className={styles.branchCity}>{city}</span>
                  ))}
                </div>
                <span className={styles.branchLink}>View Branch →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ────────────────────────────────── */}
      <GalleryCarousel />

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className={`section ${styles.testimonialsSection}`} id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Happy Customers</span>
            <h2 className="section-title">What Our <span>Clients Say</span></h2>
            <div className="divider" />
          </div>
          <TestimonialsSlider />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/testimonials" className="btn btn-secondary">View All Reviews</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className={styles.ctaSection} id="cta">
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>Ready to Move?</h2>
          <p className={styles.ctaSubtitle}>
            Get a free, no-obligation quote in minutes. Our team is available 7 days a week.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              🚀 Get Free Quote Now
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 Call Us Now
            </a>
          </div>
          <p className={styles.ctaNote}>
            🕐 Available Mon–Sun, 8AM–8PM &nbsp;|&nbsp; 📍 All India Service
          </p>
        </div>
      </section>
    </div>
  );
}
