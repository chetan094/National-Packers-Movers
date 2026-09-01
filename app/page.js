import Link from 'next/link';
import styles from './page.module.css';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';
import ClientMarquee from '@/components/ClientMarquee/ClientMarquee';
import TrustStats from '@/components/TrustStats/TrustStats';
import HeroSlideshow from '@/components/HeroSlideshow/HeroSlideshow';
import TestimonialsSlider from '@/components/TestimonialsSlider/TestimonialsSlider';
import { getCustomMetadata, getGalleryImages } from '@/lib/supabase';
import PsuCalloutCard from '@/components/PsuCalloutCard/PsuCalloutCard';
import CityDirectory from '@/components/CityDirectory/CityDirectory';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';

const HOMEPAGE_FAQS = [
  {
    q: 'Are National Packers & Movers IBA-approved for corporate and PSU claim reimbursements?',
    a: 'Yes! National Packers & Movers provides 100% genuine GST tax invoices, consignment notes (LR), itemized packing lists, and official money receipts accepted by Coal India, SAIL, NTPC, SBI, Railways, and all central/state government departments.'
  },
  {
    q: 'How are house shifting charges calculated by National Packers & Movers?',
    a: 'Relocation rates depend on cargo volume (BHK size), total transit distance, packing material grade, and vehicle type. Local shifts start from ₹4,000 for 1BHK, while inter-state shifting starts from ₹12,000. Contact us for a free, transparent pre-move survey.'
  },
  {
    q: 'Do you provide full transit insurance for household items and vehicles?',
    a: 'Yes! We offer 100% transit insurance protection covering all your furniture, electronics, kitchenware, cars, and bikes against highway damage during inter-state or local transport.'
  },
  {
    q: 'What makes National Packers & Movers different from local transport brokers?',
    a: 'Established in 1987 by Debabrata Jhampaty, we operate our own company-owned lockable container fleet with background-verified permanent packing staff—zero transshipment, zero hidden fees, and zero third-party brokers.'
  },
  {
    q: 'How many days before moving should I book my relocation?',
    a: 'We recommend booking 2 to 4 days in advance for inter-state moves to secure direct container allocation. Same-day emergency bookings are also accommodated based on fleet availability.'
  }
];


export async function generateMetadata() {
  const path = '/';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'National Packers & Movers — Trusted Since 1987 | All India Service';
  const description = custom?.meta_description || "National Packers & Movers — India's trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.";
  const keywords = custom?.meta_keywords || 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand';
  const isNoindex = custom?.is_noindex ?? false;

  return {
    title,
    description,
    keywords,
    robots: {
      index: !isNoindex,
      follow: !isNoindex,
    },
    alternates: {
      canonical: 'https://www.thenationalpackersmovers.com',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://www.thenationalpackersmovers.com',
    },
  };
}

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
  { icon: '🗺️', title: 'All-India Network', desc: '6 states, 1200+ cities, tie-ups across India for seamless end-to-end service.' },
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
  { state: 'Odisha', cities: ['Bhubaneswar', 'Rourkela', 'Cuttack'], slug: 'odisha' },
  { state: 'Uttar Pradesh', cities: ['Lucknow', 'Noida', 'Kanpur'], slug: 'uttar-pradesh' },
];

const STATIC_HOMEPAGE_PHOTOS = [
  { id: 'img-premium-cushion-sofa-wrapping',      src: '/photos/premium-cushion-sofa-wrapping.jpg',      title: 'Premium Cushion Sofa Wrapping',      desc: 'Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap and robust outer cardboard sheets.' },
  { id: 'img-safe-container-vehicle-loading',     src: '/photos/safe-container-vehicle-loading.jpg',     title: 'Safe Container Vehicle Loading',      desc: 'Stacking cartons and wrapped household items securely inside our lockable, weather-proof container vehicles.' },
  { id: 'img-seamless-corporate-office-shifting', src: '/photos/seamless-corporate-office-shifting.jpg', title: 'Seamless Corporate Office Shifting',  desc: 'PSU and bank employee cabins, computer servers, and office desks carefully boxed and cataloged for transit.' },
  { id: 'img-safe-car-carrier-shifting',          src: '/photos/safe-car-carrier-shifting.jpg',          title: 'Safe Car Carrier Shifting',           desc: 'Loading family cars and luxury vehicles onto specialized double-deck carrier trucks for damage-free highway transit.' },
  { id: 'img-palletized-storage-warehousing',     src: '/photos/palletized-storage-warehousing.jpg',     title: 'Palletized Storage & Warehousing',    desc: 'Clean, insect-free storage facility at our headquarters with strict inventory tracking and 24/7 security watch.' },
  { id: 'img-waterproof-cardboard-packaging',     src: '/photos/waterproof-cardboard-packaging.jpg',     title: 'Waterproof Cardboard Packaging',      desc: 'Heavy-duty shifting boxes wrapped in waterproof stretch wrap against highway dust and monsoon rains.' },
  { id: 'img-fragile-kitchenware-wrapping',       src: '/photos/fragile-kitchenware-wrapping.jpg',       title: 'Fragile Kitchenware Wrapping',        desc: 'Delicate kitchen glass sets and bone china plates wrapped individually in foam sheets and double-wall boxes.' },
  { id: 'img-destination-bed-reassembly',         src: '/photos/destination-bed-reassembly.jpg',         title: 'Destination Bed Reassembly',          desc: 'Unpacking and placing heavy items, including the safe reassembly of beds, tables, and cabinets.' },
  { id: 'img-team-loading-operations',            src: '/photos/team-loading-operations.jpg',            title: 'Team Loading Operations',             desc: 'Professional loaders carefully handling heavy domestic appliances and furniture onto direct shipping carriers.' },
  { id: 'img-uniform-packing-crew',               src: '/photos/uniform-packing-crew.jpg',               title: 'Uniform Packing Crew',                desc: 'Our staff dressed in official corporate uniforms, demonstrating organization and reliability.' },
  { id: 'img-gps-tracked-container-fleet',        src: '/photos/gps-tracked-container-fleet.jpg',        title: 'GPS-Tracked Container Fleet',         desc: 'Our lockable, closed-container trucks driving direct routes across states with zero midway transfers.' },
  { id: 'img-heavy-furniture-shifting',           src: '/photos/heavy-furniture-shifting.jpg',           title: 'Heavy Furniture Shifting',            desc: 'Experienced crews using specialized belts and corner guards to carry heavy wardrobes and double beds safely.' },
  { id: 'img-secure-cargo-stacking-layout',       src: '/photos/secure-cargo-stacking-layout.jpg',       title: 'Secure Cargo Stacking Layout',        desc: 'Interlocking packing methods inside the truck container to eliminate item movements during highway transit.' },
  { id: 'img-dual-layer-bubble-wrapping',         src: '/photos/dual-layer-bubble-wrapping.jpg',         title: 'Dual-Layer Bubble Wrapping',          desc: 'Wrapping fragile electronics, LED TVs, and mirrors using thick bubble wrap and high-density stretch wrapping.' },
  { id: 'img-apartment-residential-relocation',   src: '/photos/apartment-residential-relocation.jpg',   title: 'Apartment Residential Relocation',    desc: 'Local shifting services for complete door-to-door residential relocations in Ranchi, Dhanbad, and Patna.' },
  { id: 'img-doorstep-unloading-setup',           src: '/photos/doorstep-unloading-setup.jpg',           title: 'Doorstep Unloading & Setup',          desc: 'Supervisors cross-checking the item checklist during doorstep unloading and setting up large items.' },
  { id: 'img-bike-relocation-packing',            src: '/photos/bike-relocation-packing.jpg',            title: 'Bike Relocation Packing',             desc: 'Professional two-wheeler packing using multi-layer bubble wrapping and customized cargo carrier transit.' },
  { id: 'img-national-logistics-transit',         src: '/photos/national-logistics-transit.jpg',         title: 'National Logistics Transit',          desc: 'Our transport vehicles loaded and ready for safe highway dispatch from our branch office.' },
  { id: 'img-national-packing-operations',        src: '/photos/national-packing-operations.jpg',        title: 'National Packing Operations',         desc: 'Experienced shifting crews wrapping domestic assets using heavy-duty stretch wraps and cartons.' },
  { id: 'img-relocation-packing-standards',       src: '/photos/relocation-packing-standards.jpg',       title: 'Relocation Packing Standards',        desc: 'Standardized wrapping layouts for home furniture and delicate electronics before transit loading.' },
  { id: 'img-cargo-loading-dispatch',             src: '/photos/cargo-loading-dispatch.jpg',             title: 'Cargo Loading & Dispatch',            desc: 'Carefully stacking boxes inside container trucks to ensure zero movement and damage-free transit.' },
  { id: 'img-container-loading-process',          src: '/photos/container-loading-process.jpg',          title: 'Container Loading Process',           desc: 'Locked container loading at our transit terminal ensuring maximum safety for long-distance relocations.' },
  { id: 'img-multi-layer-packing-process',        src: '/photos/multi-layer-packing-process.jpg',        title: 'Multi-Layer Packing Process',         desc: 'Wrapping fragile kitchenware, chinaware, and electronics in dynamic thick cushion rolls.' },
  { id: 'img-goods-dispatch-transit',             src: '/photos/goods-dispatch-transit.jpg',             title: 'Goods Dispatch Transit',              desc: 'Supervising direct interstate vehicle transit dispatch matching high-end safety guidelines.' },
  { id: 'img-national-shifting-crew',             src: '/photos/national-shifting-crew.jpg',             title: 'National Shifting Crew',              desc: 'Uniformed, trained logistics staff handling large domestic items safely down residential floors.' },
  { id: 'img-secure-shifting-operations',         src: '/photos/secure-shifting-operations.jpg',         title: 'Secure Shifting Operations',          desc: 'Using high-strength tie-down straps inside closed truck containers to protect furniture corners.' },
  { id: 'img-direct-container-loading',           src: '/photos/direct-container-loading.jpg',           title: 'Direct Container Loading',            desc: 'Stacking goods systematically with heavy items at the base and lighter boxes on top.' },
  { id: 'img-household-goods-packing',            src: '/photos/household-goods-packing.jpg',            title: 'Household Goods Packing',             desc: 'Multi-layered bubble wrapping on electrical appliances for maximum protection during transit.' },
  { id: 'img-direct-route-dispatch',              src: '/photos/direct-route-dispatch.jpg',              title: 'Direct Route Dispatch',               desc: 'National Packers container carrier fleet ready for immediate direct transport across states.' },
  { id: 'img-doorstep-relocation-setup',          src: '/photos/doorstep-relocation-setup.jpg',          title: 'Doorstep Relocation Setup',           desc: 'Offloading household items and setting them up in the customer\'s new home.' },
  { id: 'img-premium-wrapping-materials',         src: '/photos/premium-wrapping-materials.jpg',         title: 'Premium Wrapping Materials',          desc: 'Heavy-duty cardboard boxes, high-density bubble wrap, stretch films, and customized sealing tapes.' },
  { id: 'img-safe-warehousing-facilities',        src: '/photos/safe-warehousing-facilities.jpg',        title: 'Safe Warehousing Facilities',         desc: 'Clean, secure, insect-free storage facility at our headquarters with strict inventory controls.' },
  { id: 'img-gps-cargo-container-fleet',          src: '/photos/gps-cargo-container-fleet.jpg',          title: 'GPS Cargo Container Fleet',           desc: 'Our container trucks dispatching directly with no transshipment or intermediate handling.' },
  { id: 'img-furniture-wrapping-process',         src: '/photos/furniture-wrapping-process.jpg',         title: 'Furniture Wrapping Process',          desc: 'Wrapping double beds, wardrobes, and cabinets with thick foam sheets and heavy outer cardboard.' },
  { id: 'img-highway-transit-stacking',           src: '/photos/highway-transit-stacking.jpg',           title: 'Highway Transit Stacking',            desc: 'Securing household items in interlocking layouts to eliminate vibrations and road bumps damage.' },
  { id: 'img-doorstep-offloading-crew',           src: '/photos/doorstep-offloading-crew.jpg',           title: 'Doorstep Offloading Crew',            desc: 'Our supervisors cross-checking items off the inventory list during unloading.' },
  { id: 'img-heavy-duty-box-wrapping',            src: '/photos/heavy-duty-box-wrapping.jpg',            title: 'Heavy Duty Box Wrapping',             desc: 'Heavy-duty boxes wrapped with thick shrink wrap to prevent dust and water damage.' },
  { id: 'img-palletized-storage-system',          src: '/photos/palletized-storage-system.jpg',          title: 'Palletized Storage System',           desc: 'Staging areas inside our clean warehouse designed to support temporary cargo holding.' },
  { id: 'img-secure-warehouse-racking',           src: '/photos/secure-warehouse-racking.jpg',           title: 'Secure Warehouse Racking',            desc: 'Industrial heavy-duty racks holding locked inventory pallets under 24/7 security watch.' },
  { id: 'img-national-cargo-operations',          src: '/photos/national-cargo-operations.jpg',          title: 'National Cargo Operations',           desc: 'Staging and organizing boxes inside our storage hub before direct route transit dispatch.' },
  { id: 'img-highway-container-loading',          src: '/photos/highway-container-loading.jpg',          title: 'Highway Container Loading',           desc: 'Stacking cargo into our container fleets safely under supervisor verification.' },
  { id: 'img-national-dispatch-teams',            src: '/photos/national-dispatch-teams.jpg',            title: 'National Dispatch Teams',             desc: 'Dispatch crews coordinating transits, checking transport documents, and tracking containers.' },
  { id: 'img-interstate-cargo-relocation',        src: '/photos/interstate-cargo-relocation.jpg',        title: 'Interstate Cargo Relocation',         desc: 'Heavy cargo containers carrying household and corporate consignments across cities.' },
  { id: 'img-gps-shifting-fleet',                 src: '/photos/gps-shifting-fleet.jpg',                 title: 'GPS Shifting Fleet',                  desc: 'Our company-owned fleet parked at our primary corporate shipping terminal.' },
  { id: 'img-direct-interstate-shipping',         src: '/photos/direct-interstate-shipping.jpg',         title: 'Direct Interstate Shipping',          desc: 'National Packers closed container fleet on major highways for express deliveries.' },
  { id: 'img-safe-packaging-process',             src: '/photos/safe-packaging-process.jpg',             title: 'Safe Packaging Process',              desc: 'Using double-wall cardboard sheets and heavy-duty tape wrapping for appliances.' },
  { id: 'img-loading-cargo-operations',           src: '/photos/loading-cargo-operations.jpg',           title: 'Loading Cargo Operations',            desc: 'Systematically stacking household packages in container vehicles to prevent transit friction.' },
  { id: 'img-secure-vehicle-carrier',             src: '/photos/secure-vehicle-carrier.jpg',             title: 'Secure Vehicle Carrier',              desc: 'Specialized vehicle carrier operations loading cars damage-free with secure wheel clamps.' },
  { id: 'img-fragile-packing-standards',          src: '/photos/fragile-packing-standards.jpg',          title: 'Fragile Packing Standards',           desc: 'Using heavy-duty bubble wrap layers followed by secure tape seals on LED TVs and monitors.' },
];

export default async function HomePage() {
  const galleryPhotos = await getGalleryImages();
  const BASE_URL = 'https://www.thenationalpackersmovers.com';

  const photosForSEO = galleryPhotos && galleryPhotos.length > 0
    ? galleryPhotos.map((p, idx) => ({
        id: p.id || p.uuid || `img-dyn-${idx}`,
        src: p.src.startsWith('http') ? p.src : `${BASE_URL}${p.src}`,
        title: p.alt || p.title || 'National Packers & Movers Gallery',
        desc: p.description || p.desc || 'Professional relocation services — National Packers & Movers',
      }))
    : STATIC_HOMEPAGE_PHOTOS.map(p => ({
        id: p.id,
        src: p.src.startsWith('http') ? p.src : `${BASE_URL}${p.src}`,
        title: p.title,
        desc: p.desc,
      }));

  const homeImageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    'name': 'National Packers & Movers — Operations Photo Gallery',
    'description': 'Operational photos of packing, container loading, and vehicle transport by National Packers & Movers.',
    'url': BASE_URL,
    'image': photosForSEO.map(photo => ({
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/photos/${photo.id}`,
      'name': photo.title,
      'description': photo.desc,
      'contentUrl': photo.src,
      'url': BASE_URL,
      'acquireLicensePage': `${BASE_URL}/contact`,
      'copyrightNotice': '© 2026 National Packers & Movers. All rights reserved.',
      'creditText': 'National Packers & Movers',
      'license': `${BASE_URL}/terms`,
      'creator': {
        '@type': 'Organization',
        'name': 'National Packers & Movers',
        'url': BASE_URL,
      },
      'author': {
        '@type': 'Organization',
        'name': 'National Packers & Movers',
        'url': BASE_URL,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeImageSchema) }}
      />

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
            <a href="tel:9835168368" className={styles.heroPhone}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', color: 'var(--gold)' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              9835168368
            </a>
            <span className={styles.heroDivider} />
            <a href="tel:9934166164" className={styles.heroPhone}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', color: 'var(--gold)' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              9934166164
            </a>
          </div>
        </div>
        <HeroSlideshow />
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <TrustStats />

      {/* ── B2B / PSU CLIENT MARQUEE ──────────────────────── */}
      <ClientMarquee />

      {/* ── PSU CLAIM REIMBURSEMENT KIT CALLOUT ────────────── */}
      <PsuCalloutCard />


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
            <p className="section-subtitle">6 states, 1200+ cities — and growing. National presence, local expertise.</p>
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
      <GalleryCarousel photos={galleryPhotos} />

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

      {/* ── FREQUENTLY ASKED QUESTIONS ──────────────────────── */}
      <section className="section bg-section-dark" id="faqs">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <div className="divider" />
            <p className="section-subtitle">Clear answers about our relocation pricing, IBA claim documentation, and safety guarantees.</p>
          </div>
          <div style={{ maxWidth: '840px', margin: '2.5rem auto 0' }}>
            <FaqAccordion faqs={HOMEPAGE_FAQS} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/faqs" className="btn btn-secondary">View All FAQs →</Link>
          </div>
        </div>
      </section>

      {/* ── CITY & STATE LOGISTICS DIRECTORY ──────────────── */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #091729 0%, #050d18 100%)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }} id="directory">
        <div className="container">
          <CityDirectory />
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
