import Link from 'next/link';
import styles from './ServicePage.module.css';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';

/* ── Universal 6-Step Process ─────────────────────────────── */
const PROCESS_STEPS = [
  {
    icon: '🔍',
    title: 'Pre-Move Survey',
    desc: 'Our expert visits your location to assess volume, special requirements, and plan the most efficient, safe move tailored for you.',
  },
  {
    icon: '📦',
    title: 'Professional Packing',
    desc: 'Every item packed with right-grade materials — bubble wrap, foam padding, corrugated boxes — carefully selected per item type.',
  },
  {
    icon: '🚛',
    title: 'Loading on Trucks',
    desc: 'Goods are loaded onto our dedicated vehicles using proper equipment and secured tightly to prevent any movement in transit.',
  },
  {
    icon: '🗺️',
    title: 'Transit to Destination',
    desc: 'Your belongings are transported safely via our own fleet. Status updates are provided at key milestones throughout the journey.',
  },
  {
    icon: '📤',
    title: 'Unloading',
    desc: 'Every item is unloaded with the same care and precision used during loading. Nothing is rushed, nothing is compromised.',
  },
  {
    icon: '🔧',
    title: 'Fitting of All Goods',
    desc: 'Furniture reassembled, appliances reconnected, items placed as per your instructions. We leave only when you are fully satisfied.',
  },
];

export default function ServicePage({ service }) {
  return (
    <div className={styles.page}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">{service.tag}</span>
          <div className={styles.heroIcon}>{service.icon}</div>
          <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: service.heroTitle }} />
          <p className={styles.heroSubtitle}>{service.heroSubtitle}</p>
          <div className={styles.heroCtas}>
            <Link href="/get-quote" className="btn btn-primary btn-lg" id={`${service.slug}-hero-quote`}>
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg" id={`${service.slug}-hero-call`}>
              📞 Call — 9835168368
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className={styles.statsBar}>
        <div className={`${styles.statsGrid} container`}>
          {service.stats.map((stat, i) => (
            <div key={i} className={styles.statItem} data-reveal="up" data-delay={i * 100}>
              <div className={styles.statNumber}>
                {stat.number}{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────── */}
      <section className={`section bg-section-dark`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What You Get</span>
            <h2 className="section-title">What&apos;s <span>Included</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Everything you need for a stress-free {service.name.toLowerCase()} — handled end-to-end by trained professionals.
            </p>
          </div>
          <div className={styles.includedGrid}>
            {service.included.map((item, i) => (
              <div key={i} className={styles.includedItem} data-reveal="up" data-delay={i * 70}>
                <span className={styles.includedCheck}>✓</span>
                <div>
                  <strong className={styles.includedTitle}>{item.title}</strong>
                  <p className={styles.includedDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ───────────────────────────────────── */}
      <section className={`section ${styles.processSection}`}>
        <div className={styles.processBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our <span>Step-by-Step</span> Process</h2>
            <div className="divider" />
            <p className="section-subtitle">
              A proven, systematic approach refined over 38 years of moving excellence — zero guesswork, zero surprises.
            </p>
          </div>
          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className={styles.processCard} data-reveal="up" data-delay={i * 90}>
                <div className={styles.processStep}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE & SAFETY ────────────────────────────── */}
      <section className={`section bg-section-dark`}>
        <div className="container">
          <div className={styles.safetyGrid} data-reveal="up">
            <div className={styles.safetyContent}>
              <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Your Protection</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Every Move is <span>100% Insured</span>
              </h2>
              <div className="divider divider-left" />
              <p style={{ marginBottom: '1.5rem', fontSize: '0.97rem' }}>
                Trust is built through accountability. Every item we handle is covered under comprehensive transit insurance —
                giving you complete peace of mind throughout the entire relocation process.
              </p>
              <div className={styles.safetyPoints}>
                {[
                  { icon: '🛡️', text: 'Full transit insurance on all goods' },
                  { icon: '✅', text: 'Verified, trained & background-checked staff' },
                  { icon: '📋', text: 'Itemized inventory recorded before loading' },
                  { icon: '🔒', text: 'Tamper-proof packing with seal verification' },
                  { icon: '📞', text: '24/7 support throughout the move' },
                ].map((p, i) => (
                  <div key={i} className={styles.safetyPoint}>
                    <span>{p.icon}</span> {p.text}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.safetyStats}>
              {[
                { num: '0%',   label: 'Damage Rate' },
                { num: '100%', label: 'Insured Moves' },
                { num: '38+',  label: 'Years of Safe Deliveries' },
                { num: '50K+', label: 'Items Moved Safely' },
              ].map((s, i) => (
                <div key={i} className={styles.safetyStatCard}>
                  <div className={styles.safetyStatNum}>{s.num}</div>
                  <div className={styles.safetyStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US FOR THIS SERVICE ───────────────────────── */}
      <section className={`section ${styles.whySection}`}>
        <div className={styles.whyBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">
              Why US for <span>{service.name}</span>
            </h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {service.whyUs.map((item, i) => (
              <div key={i} className="card" data-reveal="up" data-delay={i * 90}>
                <div className="icon-box" style={{ marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className={`section bg-section-dark`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Real Experiences</span>
            <h2 className="section-title">What Our <span>Clients Say</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.testimonialGrid}>
            {service.testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard} data-reveal="up" data-delay={i * 120}>
                <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialMeta}>{t.city} — {t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Common Questions</span>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.faqList}>
            <FaqAccordion
              faqs={service.faqs}
            />
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────── */}
      <section className={`section bg-section-dark`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore More</span>
            <h2 className="section-title">Related <span>Services</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.relatedGrid}>
            {service.related.map((r, i) => (
              <Link
                key={i}
                href={`/services/${r.slug}`}
                className={styles.relatedCard}
                data-reveal="up"
                data-delay={i * 110}
              >
                <span className={styles.relatedIcon}>{r.icon}</span>
                <h4 className={styles.relatedTitle}>{r.name}</h4>
                <p className={styles.relatedDesc}>{r.desc}</p>
                <span className={styles.relatedArrow}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>Ready for a Stress-Free {service.name}?</h2>
          <p className={styles.ctaSubtitle}>
            Free quote in minutes. Our team is available 7 days a week, 8AM–8PM.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg" id={`${service.slug}-cta-quote`}>
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 9835168368
            </a>
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

      {/* ── STICKY MOBILE CTA ─────────────────────────────── */}
      <div className={styles.stickyMobileCta}>
        <a href="tel:9835168368" className={styles.stickyBtn} id={`${service.slug}-sticky-call`}>
          <span>📞</span>Call Now
        </a>
        <a
          href="https://wa.me/919835168368"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.stickyBtn} ${styles.stickyBtnWhatsapp}`}
          id={`${service.slug}-sticky-wa`}
        >
          <span>💬</span>WhatsApp
        </a>
        <Link
          href="/get-quote"
          className={`${styles.stickyBtn} ${styles.stickyBtnQuote}`}
          id={`${service.slug}-sticky-quote`}
        >
          <span>🚀</span>Get Quote
        </Link>
      </div>

    </div>
  );
}
