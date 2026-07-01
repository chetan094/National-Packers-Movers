import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import { getRoutesForCity } from '@/data/routesData';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Active Domestic Shifting Routes | National Packers & Movers',
  description: 'Explore our direct transit corridors connecting Jharkhand, West Bengal, Bihar, UP, MP, and Odisha to major national destinations. View estimated durations and pricing.',
  keywords: 'shifting routes, packers movers routes, household relocation corridors, interstate shifting rates'
};

export default function RoutesIndexPage() {
  const statesList = Object.entries(branchesData.states).map(([slug, data]) => ({
    slug,
    name: data.name,
    cities: data.cities || []
  }));

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <span className="section-tag">Transit Network</span>
          <h1 className={styles.heroTitle}>
            Our Shifting &amp; <span className={styles.heroGold}>Transit Routes</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Direct closed-container shipping lanes connecting your regional branches to major destinations across India. Select your origin city to view pricing, distances, and duration details.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="container">
        <div className={styles.directoryContainer}>
          <div className={styles.directoryLayout}>
            
            {/* Left sticky nav */}
            <aside className={styles.sidebarNav}>
              <h3 className={styles.sidebarTitle}>States Covered</h3>
              <nav className={styles.navLinks}>
                {statesList.map(state => (
                  <a key={state.slug} href={`#state-${state.slug}`} className={styles.navLink}>
                    📍 {state.name}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Right content list */}
            <div className={styles.mainContent}>
              {statesList.map(state => (
                <section key={state.slug} id={`state-${state.slug}`} className={styles.stateSection}>
                  <div className={styles.stateHeader}>
                    <h2 className={styles.stateName}>{state.name}</h2>
                    <p className={styles.stateSubtitle}>Direct dispatches and door-to-door shifting originating from {state.name}</p>
                  </div>

                  <div className={styles.citiesGrid}>
                    {state.cities.length > 0 && state.cities[0] !== 'coming-soon' && state.cities[0] !== 'virtual-office' ? (
                      state.cities.map(cityKey => {
                        const cityName = cityKey
                          .split('-')
                          .map(word => {
                            if (word === 'hq') return '(HQ)';
                            if (word === 'bsl') return 'BSL';
                            if (word === 'psu') return 'PSU';
                            return word.charAt(0).toUpperCase() + word.slice(1);
                          })
                          .join(' ');

                        const routes = getRoutesForCity(cityKey, cityName);

                        return (
                          <div key={cityKey} className={styles.cityBlock}>
                            <h3 className={styles.cityName}>{cityName} Branch</h3>
                            <div className={styles.routesGrid}>
                              {routes.map((r, idx) => (
                                <Link 
                                  key={idx} 
                                  href={`/routes/${r.origin}-to-${r.destination}`} 
                                  className={styles.routeBadge}
                                >
                                  <span>📍 To {r.destinationName}</span>
                                  <span className={styles.routeArrow}>View Rates ➔</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
                        {state.cities[0] === 'virtual-office'
                          ? 'We offer virtual logistics coordination in this state. All operations are run from our main HQ.'
                          : 'Physical branches and direct lanes are coming soon. Inter-state trucks are active daily.'}
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
