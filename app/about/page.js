import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us — National Packers & Movers | Trusted Since 1987',
  description: 'Learn the story of National Packers & Movers — founded in 1987 by Debabrata Jhampaty. 38+ years of safe, reliable, and affordable relocation services across India. Household, Corporate, Industrial & Vehicle relocation.',
  keywords: 'about national packers movers, packers movers history, debabrata jhampaty, trusted movers india, relocation company since 1987',
};

const milestones = [
  {
    year: '1987',
    title: 'The Beginning',
    desc: 'National Packers & Movers was founded by Debabrata Jhampaty in Dhanbad, Jharkhand — with a single van, a small team, and a powerful belief that every family deserves a mover they can trust completely.',
    icon: '🏁',
  },
  {
    year: '1997',
    title: 'Officially Registered',
    desc: 'After a decade of building an unshakeable reputation entirely through word-of-mouth, the company was officially registered as a licensed transport and relocation firm — formalising what customers already knew: this is a company that delivers.',
    icon: '📋',
  },
  {
    year: '2005',
    title: 'Major Multi-State Expansion',
    desc: 'A landmark year of growth. Operations spread simultaneously into Bihar (Patna, Bhagalpur) and the entire West Bengal corridor — Kolkata, Asansol, Durgapur and several surrounding districts. This marked the company\'s transformation from a regional mover into a serious multi-state logistics operation.',
    icon: '🗺️',
  },
  {
    year: '2012',
    title: 'Corporate & PSU Era Begins',
    desc: 'National Packers & Movers formally entered the corporate and public sector space — securing contracts for large-scale employee relocations, office transfers, and industrial moves across multiple states. Leading PSUs, energy companies, mining corporations, and industrial organisations began trusting us for their most critical moves.',
    icon: '🏛️',
  },
  {
    year: '2020',
    title: 'Warehousing & Storage Launch',
    desc: 'Responded to growing customer demand by launching dedicated warehousing and storage services — offering secure short-term and long-term storage facilities across key locations. This added a vital dimension to the company\'s service portfolio, enabling complete end-to-end relocation solutions under one roof.',
    icon: '📦',
  },
  {
    year: '2025–26',
    title: 'Rapid Growth & the Road Ahead',
    desc: 'National Packers & Movers is in its strongest phase of growth yet — expanding its network, adopting digital tools for booking and tracking, and actively training the next generation of logistics professionals. With a clear vision to serve every state in India, the company is building the foundation for its next 38 years.',
    icon: '🚀',
  },
];

const values = [
  {
    icon: '🤝',
    title: 'Honesty First',
    desc: 'Honesty is not our policy, but our Principle. Transparent pricing with no hidden charges — what we quote is what you pay.',
  },
  {
    icon: '🛡️',
    title: 'Safety Above All',
    desc: 'Every item is treated as irreplaceable. Multi-layer packing, trained handlers, and full transit insurance ensure zero-damage delivery.',
  },
  {
    icon: '⏱️',
    title: 'Time is Trust',
    desc: 'We commit to timelines and we deliver. A delayed move costs families and businesses — and that\'s a cost we never allow.',
  },
  {
    icon: '💰',
    title: 'Affordable Excellence',
    desc: 'Premium service quality at prices that respect your budget. We believe reliable relocation should be accessible to every Indian family.',
  },
  {
    icon: '👨‍🔧',
    title: 'Trained Professionals',
    desc: 'Every team member is trained in systematic packing, careful handling, and courteous communication. Your home is in expert hands.',
  },
  {
    icon: '🗺️',
    title: 'National Reach, Local Care',
    desc: 'With offices in 6 states and 15+ cities, we combine the reach of a national company with the attentiveness of a local service.',
  },
];

const stats = [
  { number: '38+', label: 'Years in Service' },
  { number: '30,000+', label: 'Successful Relocations' },
  { number: '6', label: 'States Covered' },
  { number: '15+', label: 'Branch Offices' },
  { number: '500+', label: 'Corporate Moves' },
  { number: '100%', label: 'Commitment to Quality' },
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">Our Story</span>
          <h1 className={styles.heroTitle}>
            Built on <span>Trust.</span><br />
            Driven by <span>Principle.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Since 1987, National Packers & Movers has been moving India's families, businesses,
            and industries with care, integrity, and professionalism that stands the test of time.
          </p>
          <div className={styles.heroTagline}>
            <span className={styles.heroTaglineText}>
              &ldquo;Honesty is not our policy, but our Principle.&rdquo;
            </span>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent} data-reveal="left">
              <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Who We Are</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                A Legacy of <span>38 Years</span> in<br />Relocation Excellence
              </h2>
              <div className="divider divider-left" />
              <p className={styles.storyText}>
                National Packers & Movers was founded in <strong>1987 by Debabrata Jhampaty</strong> in Dhanbad, Jharkhand,
                with a simple but powerful belief — that every family, every business, and every organization
                deserves a relocation partner they can trust completely.
              </p>
              <p className={styles.storyText}>
                What started as a small, local operation has grown into a <strong>multi-state logistics network
                spanning 6 states and 15+ cities</strong> across India. Through nearly four decades, one thing has
                remained constant — our unwavering commitment to honesty, safety, and customer satisfaction.
              </p>
              <p className={styles.storyText}>
                Today, National Packers & Movers serves households, corporate offices, industrial facilities,
                and government organizations — including leading public sector units. Our growth has been
                entirely organic, built on referrals and repeat customers who trust us with their most
                valuable possessions.
              </p>
              <p className={styles.storyText}>
                We don't just move belongings. <strong>We move lives — safely, affordably, and on time.</strong>
              </p>
            </div>
            <div className={styles.storyImageSide} data-reveal="right">
              <div className={styles.storyCard}>
                <div className={styles.storyCardIcon}>🏆</div>
                <div className={styles.storyCardNum}>1987</div>
                <div className={styles.storyCardLabel}>Year of Establishment</div>
              </div>
              <div className={styles.storyCard}>
                <div className={styles.storyCardIcon}>📋</div>
                <div className={styles.storyCardNum}>1997</div>
                <div className={styles.storyCardLabel}>Officially Registered</div>
              </div>
              <div className={styles.storyCard}>
                <div className={styles.storyCardIcon}>🗺️</div>
                <div className={styles.storyCardNum}>6</div>
                <div className={styles.storyCardLabel}>States Covered</div>
              </div>
              <div className={styles.storyCard}>
                <div className={styles.storyCardIcon}>🚛</div>
                <div className={styles.storyCardNum}>30K+</div>
                <div className={styles.storyCardLabel}>Moves Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className={`section bg-section-dark ${styles.visionSection}`}>
        <div className="container">
          <div className={styles.vmGrid}>
            <div className={styles.vmCard}>
              <div className={styles.vmIcon}>🔭</div>
              <h3 className={styles.vmTitle}>Our Vision</h3>
              <div className="divider divider-left" style={{ margin: '0.75rem 0' }} />
              <p className={styles.vmText}>
                To establish National Packers & Movers as India's most trusted and accessible
                relocation company — delivering premium, safe, and reliable services at affordable
                costs across every state in the nation. We envision a future where no family or
                business has to worry about the safety of their belongings during a move.
              </p>
            </div>
            <div className={styles.vmCard}>
              <div className={styles.vmIcon}>🎯</div>
              <h3 className={styles.vmTitle}>Our Mission</h3>
              <div className="divider divider-left" style={{ margin: '0.75rem 0' }} />
              <p className={styles.vmText}>
                To provide end-to-end relocation solutions that combine the highest standards
                of quality with fair, transparent pricing. We are committed to treating every
                customer's belongings as our own — with trained professionals, modern packing
                materials, insured transit, and a service promise backed by 38 years of trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className={`section ${styles.founderSection}`}>
        <div className={styles.founderBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">The Man Behind <span>The Mission</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.founderCard} data-reveal="up">
            <div className={styles.founderAvatar}>
              <span>DJ</span>
            </div>
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>Debabrata Jhampaty</h3>
              <p className={styles.founderRole}>Founder & Managing Director</p>
              <div className="divider divider-left" style={{ margin: '0.75rem 0', width: '40px' }} />
              <p className={styles.founderBio}>
                With a vision that began in 1987, Debabrata Jhampaty set out to build more than a
                business — he set out to build a name that families and organizations across India
                could trust with their most valuable possessions.
              </p>
              <p className={styles.founderBio}>
                Under his leadership, National Packers & Movers has grown from a single office in
                Dhanbad to a multi-state operation serving households, corporate offices, and
                public sector organizations. His philosophy is rooted in a simple principle:
              </p>
              <blockquote className={styles.founderQuote}>
                "Provide the best possible service at fair prices, and customers will come to you
                for a lifetime. Honesty is not a policy — it is the foundation of everything we build."
              </blockquote>
              <p className={styles.founderBio}>
                His vision is to make National Packers & Movers a truly national company — catering to
                the whole of India with premium, safe, and reliable services that remain affordable
                without ever compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className={`section bg-section-dark ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What Guides Us</span>
            <h2 className="section-title">Our Core <span>Values</span></h2>
            <div className="divider" />
            <p className="section-subtitle">The principles that have guided every move for 38 years.</p>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={i} className="card" data-reveal="up" data-delay={i * 80}>
                <div className="icon-box" style={{ marginBottom: '1rem' }}>{v.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{v.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES TIMELINE ── */}
      <section className={`section ${styles.timelineSection}`}>
        <div className={styles.timelineBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">38 Years of <span>Milestones</span></h2>
            <div className="divider" />
          </div>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight} ${i === milestones.length - 1 ? styles.timelineCurrent : ''}`}
                data-reveal={i % 2 === 0 ? 'left' : 'right'}
                data-delay={i * 80}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineIconWrap}>{m.icon}</div>
                  <span className={styles.timelineYear}>{m.year}</span>
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>{m.title}</h4>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
                <div className={styles.timelineSpacer} />
              </div>
            ))}
            <div className={styles.timelineLine} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className={`section bg-section-dark ${styles.statsSection}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statCard} data-reveal="fade" data-delay={i * 70}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>
            Ready to Experience the<br />National Packers Difference?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join 30,000+ families and businesses who trusted us with their move.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              Call Us — 9835168368
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
