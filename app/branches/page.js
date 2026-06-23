import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Branches — All India Relocation Network | National Packers & Movers',
  description: 'Find a National Packers & Movers branch near you. Serving Jharkhand, West Bengal, Bihar, MP, UP, and Odisha. 100% safe household & corporate shifting.',
  keywords: 'packers movers branches, packers movers jharkhand, packers movers west bengal, movers bihar, packers movers singrauli',
};

export default function BranchesIndexPage() {
  const states = Object.entries(branchesData.states);

  return (
    <div className={styles.page}>
      
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag" data-reveal="up" data-delay="100">National Network</span>
          <h1 className={styles.heroTitle} data-reveal="up" data-delay="200">Our Shifting <span>Branches</span></h1>
          <p className={styles.heroSubtitle} data-reveal="up" data-delay="300">
            With headquarters in Dhanbad and dedicated coordinators across 6 states, we run a seamless relocation network across India. Find your local division below.
          </p>
        </div>
      </section>

      {/* ── DIRECTORY GRID ────────────────────────────────── */}
      <section className="section bg-section-darker">
        <div className="container">
          <div className={styles.statesGrid}>
            {states.map(([stateSlug, state], i) => {
              const isVirtual = state.cities[0] === 'virtual-office';
              const isComingSoon = state.cities[0] === 'coming-soon';
              
              return (
                <div key={stateSlug} className={styles.stateCard} data-reveal="up" data-delay={i * 80}>
                  <div className={styles.cardHeader}>
                    <span className={styles.pin}>📍</span>
                    <h2 className={styles.stateName}>{state.name}</h2>
                    {isVirtual && <span className={styles.badgeVirtual}>Virtual</span>}
                    {isComingSoon && <span className={styles.badgeSoon}>Coming Soon</span>}
                  </div>
                  
                  <p className={styles.stateDesc}>{state.description}</p>
                  
                  <div className={styles.citiesWrapper}>
                    <h4 className={styles.citiesLabel}>Active Cities:</h4>
                    <div className={styles.citiesGrid}>
                      {!isVirtual && !isComingSoon ? (
                        state.cities.map((citySlug) => {
                          // Format city slug nicely
                          const cityName = citySlug === 'dhanbad' 
                            ? 'Dhanbad (HQ)' 
                            : citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
                            
                          return (
                            <Link 
                              key={citySlug} 
                              href={`/branches/${stateSlug}/${citySlug}`}
                              className={styles.cityLink}
                            >
                              🏙️ {cityName}
                            </Link>
                          );
                        })
                      ) : (
                        <p className={styles.noticeText}>
                          {isVirtual 
                            ? 'Services coordinated remotely. Contact HQ for full coverage.' 
                            : 'Establishing physical hubs. Currently handling inter-state transport.'
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <Link href={`/branches/${stateSlug}`} className={styles.statePageLink}>
                    View State Division Page →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK QUOTE CTA ───────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`} data-reveal="up">
          <h2 className={styles.ctaTitle}>Ready to Move Anywhere in India?</h2>
          <p className={styles.ctaSubtitle}>
            Whether your city has a physical office or is serviced by our long-distance fleet, we guarantee the same premium packing and 100% insured delivery.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              🚀 Get Shifting Quotation
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 Contact HQ Support
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
