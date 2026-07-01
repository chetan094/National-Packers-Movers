import Link from 'next/link';
import { routesData } from '@/data/routesData';
import styles from './page.module.css';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';

// Whitelisted static parameters for Next.js SSG pre-rendering
export async function generateStaticParams() {
  return routesData.map(route => ({
    route: `${route.origin}-to-${route.destination}`
  }));
}

// Dynamic route data helper to parse route string safely
function getRouteData(routeParam) {
  const parts = routeParam ? routeParam.split('-to-') : [];
  const origin = parts[0] || 'ranchi';
  const destination = parts[1] || 'delhi';
  
  const match = routesData.find(
    r => r.origin === origin.toLowerCase() && r.destination === destination.toLowerCase()
  );
  if (match) return match;
  
  // Fallback programmatic generator if route not whitelisted
  const cap = (s) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const originName = cap(origin);
  const destinationName = cap(destination);
  return {
    origin: origin.toLowerCase(),
    destination: destination.toLowerCase(),
    originName,
    destinationName,
    distance: 'Estimated on Booking',
    duration: '2 – 3 Days',
    route: 'Direct National Highway Transit',
    baseRate: 'On Request',
    highlight: 'Direct Shifting Fleet',
    description: `Professional door-to-door packers and movers shifting service from ${originName} to ${destinationName}. High-quality packing, transit insurance, and GPS-tracked container transport.`
  };
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const route = getRouteData(resolvedParams.route);
  return {
    title: `Packers and Movers from ${route.originName} to ${route.destinationName} | National Packers & Movers`,
    description: `Looking for reliable packers and movers from ${route.originName} to ${route.destinationName}? We offer IBA-compliant billing documents, multi-layer packing, and direct container transit.`,
    keywords: `packers and movers ${route.origin} to ${route.destination}, shifting from ${route.origin} to ${route.destination}, movers ${route.originName} to ${route.destinationName}`
  };
}

export default async function RoutePage({ params }) {
  const resolvedParams = await params;
  const route = getRouteData(resolvedParams.route);

  // Structured data schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.thenationalpackersmovers.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Routes', 'item': `https://www.thenationalpackersmovers.com/routes/${route.origin}-to-${route.destination}` },
      { '@type': 'ListItem', 'position': 3, 'name': `${route.originName} to ${route.destinationName}` }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `Shifting from ${route.originName} to ${route.destinationName}`,
    'provider': {
      '@type': 'MovingCompany',
      'name': 'National Packers & Movers',
      'logo': 'https://www.thenationalpackersmovers.com/logo.png',
      'telephone': '9835168368',
      'priceRange': '$$'
    },
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': route.originName },
      { '@type': 'AdministrativeArea', 'name': route.destinationName }
    ],
    'description': route.description
  };

  // Structured dynamic prices scaled from baseRate
  const scaledRates = (() => {
    if (route.baseRate === 'On Request') {
      return [
        { size: '1 BHK Shifting', local: 'Checked at Survey', intercity: 'Starting from ₹12,000' },
        { size: '2 BHK Shifting', local: 'Checked at Survey', intercity: 'Starting from ₹18,000' },
        { size: '3 BHK Shifting', local: 'Checked at Survey', intercity: 'Starting from ₹25,000' },
        { size: 'Bike Transport', local: 'Checked at Survey', intercity: 'Starting from ₹4,500' },
        { size: 'Car Transportation', local: 'Checked at Survey', intercity: 'Starting from ₹9,000' }
      ];
    }
    const val = parseInt(route.baseRate.replace(/[^\d]/g, ''), 10);
    return [
      { size: '1 BHK Home Shifting', local: 'Checked at Survey', intercity: `Starting from ₹${val.toLocaleString('en-IN')}` },
      { size: '2 BHK Home Shifting', local: 'Checked at Survey', intercity: `Starting from ₹${Math.round(val * 1.35).toLocaleString('en-IN')}` },
      { size: '3 BHK Home Shifting', local: 'Checked at Survey', intercity: `Starting from ₹${Math.round(val * 1.8).toLocaleString('en-IN')}` },
      { size: 'Bike Transportation', local: 'Checked at Survey', intercity: `Starting from ₹${Math.round(val * 0.25).toLocaleString('en-IN')}` },
      { size: 'Car Carriage Transport', local: 'Checked at Survey', intercity: `Starting from ₹${Math.round(val * 0.55).toLocaleString('en-IN')}` }
    ];
  })();

  const faqsList = [
    {
      q: `How long does the relocation take from ${route.originName} to ${route.destinationName}?`,
      a: `It takes approximately ${route.duration} using our direct container fleet. Transit time is dependent on weather, highway checkpoints, and route distance (${route.distance}).`
    },
    {
      q: `Do you provide IBA-compliant invoices for company/PSU reimbursement?`,
      a: `Yes, we provide 100% genuine GST-registered invoices, Lorry Receipts (LR), stamped money receipts, and itemized lists accepted by all public sector undertakings, banks, railways, and private corporate groups.`
    },
    {
      q: `What safety features protect my goods in transit?`,
      a: `We utilize our own locked container vehicles to prevent dust and water damages. Every item is packed with bubble wrap, corrugated sheets, and stretch wrap. Additionally, we provide comprehensive transit insurance to guarantee your financial safety.`
    },
    {
      q: `Can I track my shipment on the road?`,
      a: `Yes, all our long-distance container vehicles are equipped with real-time GPS tracking systems. You will receive direct transit checkpoint updates from your assigned move coordinator at every stage of the journey.`
    },
    {
      q: `Are there any hidden charges like tolls or octroi taxes on this route?`,
      a: `No, we operate on 100% transparent and clear pricing. The relocation quote includes all toll gate charges, green tax, driver allowance, and packing costs. No hidden costs are demanded post-loading.`
    },
    {
      q: `How do you handle vehicle transport (cars and bikes) on this route?`,
      a: `Vehicles are loaded into specialized closed car carriers or double-deck carrier trucks. We use custom wheel locks and heavy-duty safety belts to secure your car or bike, preventing any movement during transit.`
    }
  ];

  return (
    <div className={styles.page}>
      {/* ── JSON-LD Schemas ───────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── HERO SECTION ──────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <span className="section-tag">Transit Corridor</span>
          <h1 className={styles.heroTitle}>
            Packers &amp; Movers<br />
            <span className={styles.heroGold}>{route.originName} to {route.destinationName}</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Safe, secure, and stress-free long-distance moving solutions. Direct highway transit, GPS tracking support, and verified IBA-compliant billing formats.
          </p>

          {/* Quick Specs Bar */}
          <div className={styles.specsBar}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Distance</span>
              <span className={styles.specValue}>{route.distance}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Est. Duration</span>
              <span className={styles.specValue}>{route.duration}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Primary Route</span>
              <span className={styles.specValue} style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>{route.route}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Est. Base Rate</span>
              <span className={styles.specValue}>{route.baseRate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT SECTION ──────────────────────── */}
      <section className="container">
        <div className={styles.contentGrid}>
          
          {/* Main Left Column */}
          <div className={styles.mainCol}>
            
            {/* Shifting Overview */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                Safe Transit from <span>{route.originName} to {route.destinationName}</span>
              </h2>
              <p className={styles.introText}>{route.description}</p>
              
              <ul className={styles.uspList}>
                <li className={styles.uspItem}><span className={styles.checkIcon}>✓</span> Closed-Container Security</li>
                <li className={styles.uspItem}><span className={styles.checkIcon}>✓</span> IBA-Aligned Billing Formats</li>
                <li className={styles.uspItem}><span className={styles.checkIcon}>✓</span> Multi-Layer Bubble Packing</li>
                <li className={styles.uspItem}><span className={styles.checkIcon}>✓</span> 100% Transit Safety Insurance</li>
              </ul>
            </div>

            {/* Pricing Estimates */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Shifting <span>Rates &amp; Charges</span></h2>
              <p className={styles.introText}>
                Below are the approximate price estimates for our transport services on the {route.originName} to {route.destinationName} route. Final quotes are issued after a free home survey.
              </p>
              
              <div className={styles.tableWrap}>
                <table className={styles.ratesTable}>
                  <thead>
                    <tr>
                      <th>Shifting Service Size</th>
                      <th>Local Moving Scope</th>
                      <th>Inter-City Shifting Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaledRates.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.size}</strong></td>
                        <td>{r.local}</td>
                        <td style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{r.intercity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Right Column */}
          <div className={styles.sidebar}>
            
            {/* Quick CTA booking card */}
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaCardTitle}>Get Shifting Quote</h3>
              <p className={styles.ctaCardText}>
                Plan your move from {route.originName} to {route.destinationName} with India's trusted packers and movers. Secure your zero-obligation estimate today.
              </p>
              <Link 
                href={`/get-quote?from=${encodeURIComponent(route.originName)}&to=${encodeURIComponent(route.destinationName)}`}
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                🚀 Get Route Quote
              </Link>
            </div>

            {/* 🛡️ Verified Credentials Card */}
            <div className={styles.credentialsCard} data-reveal="up" data-delay="280">
              <h3 className={styles.credentialsTitle}>🛡️ Verified Credentials</h3>
              <div className={styles.credentialsDivider} />
              <div className={styles.credentialsGrid}>
                <div className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>📜</span>
                  <div>
                    <strong>GSTIN Tax Invoice</strong>
                    <p className={styles.credentialVal}>20AIHPJ7005R1Z6</p>
                  </div>
                </div>
                <div className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>🆔</span>
                  <div>
                    <strong>Govt. Regd. Number</strong>
                    <p className={styles.credentialVal}>Regd No. 0039</p>
                  </div>
                </div>
                <div className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>✅</span>
                  <div>
                    <strong>IBA-Approved Movers</strong>
                    <p className={styles.credentialVal}>Accepted by PSUs & Banks</p>
                  </div>
                </div>
                <div className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>🎗️</span>
                  <div>
                    <strong>Quality Standard</strong>
                    <p className={styles.credentialVal}>ISO 9001:2015 Certified</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FAQ SECTION (Full Width matching style of other pages) ── */}
      <section className="section bg-section-dark" style={{ marginTop: '5rem' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Help Desk</span>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', color: 'var(--white)', textTransform: 'uppercase' }}>Frequently Asked <span>Questions</span></h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <FaqAccordion faqs={faqsList} />
          </div>
        </div>
      </section>
    </div>
  );
}
