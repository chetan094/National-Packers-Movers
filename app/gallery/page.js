import Link from 'next/link';
import styles from './page.module.css';
import GalleryGrid from '@/components/GalleryGrid/GalleryGrid';
import VideoShowcase from '@/components/VideoShowcase/VideoShowcase';
import { getCustomMetadata, getGalleryImages } from '@/lib/supabase';

const BASE_URL = 'https://www.thenationalpackersmovers.com';

// Static photo list — same source of truth as GalleryGrid
// Used for: JSON-LD schema, OG image, and static crawler HTML
const STATIC_PHOTOS = [
  { src: '/photos/premium-cushion-sofa-wrapping.jpg',      title: 'Premium Cushion Sofa Wrapping',      desc: 'Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap and robust outer cardboard sheets.' },
  { src: '/photos/safe-container-vehicle-loading.jpg',     title: 'Safe Container Vehicle Loading',      desc: 'Stacking cartons and wrapped household items securely inside our lockable, weather-proof container vehicles.' },
  { src: '/photos/seamless-corporate-office-shifting.jpg', title: 'Seamless Corporate Office Shifting',  desc: 'PSU and bank employee cabins, computer servers, and office desks carefully boxed and cataloged for transit.' },
  { src: '/photos/safe-car-carrier-shifting.jpg',          title: 'Safe Car Carrier Shifting',           desc: 'Loading family cars and luxury vehicles onto specialized double-deck carrier trucks for damage-free highway transit.' },
  { src: '/photos/palletized-storage-warehousing.jpg',     title: 'Palletized Storage & Warehousing',    desc: 'Clean, insect-free storage facility at our headquarters with strict inventory tracking and 24/7 security watch.' },
  { src: '/photos/waterproof-cardboard-packaging.jpg',     title: 'Waterproof Cardboard Packaging',      desc: 'Heavy-duty shifting boxes wrapped in waterproof stretch wrap against highway dust and monsoon rains.' },
  { src: '/photos/fragile-kitchenware-wrapping.jpg',       title: 'Fragile Kitchenware Wrapping',        desc: 'Delicate kitchen glass sets and bone china plates wrapped individually in foam sheets and double-wall boxes.' },
  { src: '/photos/destination-bed-reassembly.jpg',         title: 'Destination Bed Reassembly',          desc: 'Unpacking and placing heavy items, including the safe reassembly of beds, tables, and cabinets.' },
  { src: '/photos/team-loading-operations.jpg',            title: 'Team Loading Operations',             desc: 'Professional loaders carefully handling heavy domestic appliances and furniture onto direct shipping carriers.' },
  { src: '/photos/uniform-packing-crew.jpg',               title: 'Uniform Packing Crew',                desc: 'Our staff dressed in official corporate uniforms, demonstrating organization and reliability.' },
  { src: '/photos/gps-tracked-container-fleet.jpg',        title: 'GPS-Tracked Container Fleet',         desc: 'Our lockable, closed-container trucks driving direct routes across states with zero midway transfers.' },
  { src: '/photos/heavy-furniture-shifting.jpg',           title: 'Heavy Furniture Shifting',            desc: 'Experienced crews using specialized belts and corner guards to carry heavy wardrobes and double beds safely.' },
  { src: '/photos/secure-cargo-stacking-layout.jpg',       title: 'Secure Cargo Stacking Layout',        desc: 'Interlocking packing methods inside the truck container to eliminate item movements during highway transit.' },
  { src: '/photos/dual-layer-bubble-wrapping.jpg',         title: 'Dual-Layer Bubble Wrapping',          desc: 'Wrapping fragile electronics, LED TVs, and mirrors using thick bubble wrap and high-density stretch wrapping.' },
  { src: '/photos/apartment-residential-relocation.jpg',   title: 'Apartment Residential Relocation',    desc: 'Local shifting services for complete door-to-door residential relocations in Ranchi, Dhanbad, and Patna.' },
  { src: '/photos/doorstep-unloading-setup.jpg',           title: 'Doorstep Unloading & Setup',          desc: 'Supervisors cross-checking the item checklist during doorstep unloading and setting up large items.' },
  { src: '/photos/bike-relocation-packing.jpg',            title: 'Bike Relocation Packing',             desc: 'Professional two-wheeler packing using multi-layer bubble wrapping and customized cargo carrier transit.' },
  { src: '/photos/national-logistics-transit.jpg',         title: 'National Logistics Transit',          desc: 'Our transport vehicles loaded and ready for safe highway dispatch from our branch office.' },
  { src: '/photos/national-packing-operations.jpg',        title: 'National Packing Operations',         desc: 'Experienced shifting crews wrapping domestic assets using heavy-duty stretch wraps and cartons.' },
  { src: '/photos/relocation-packing-standards.jpg',       title: 'Relocation Packing Standards',        desc: 'Standardized wrapping layouts for home furniture and delicate electronics before transit loading.' },
  { src: '/photos/cargo-loading-dispatch.jpg',             title: 'Cargo Loading & Dispatch',            desc: 'Carefully stacking boxes inside container trucks to ensure zero movement and damage-free transit.' },
  { src: '/photos/container-loading-process.jpg',          title: 'Container Loading Process',           desc: 'Locked container loading at our transit terminal ensuring maximum safety for long-distance relocations.' },
  { src: '/photos/multi-layer-packing-process.jpg',        title: 'Multi-Layer Packing Process',         desc: 'Wrapping fragile kitchenware, chinaware, and electronics in dynamic thick cushion rolls.' },
  { src: '/photos/goods-dispatch-transit.jpg',             title: 'Goods Dispatch Transit',              desc: 'Supervising direct interstate vehicle transit dispatch matching high-end safety guidelines.' },
  { src: '/photos/national-shifting-crew.jpg',             title: 'National Shifting Crew',              desc: 'Uniformed, trained logistics staff handling large domestic items safely down residential floors.' },
  { src: '/photos/secure-shifting-operations.jpg',         title: 'Secure Shifting Operations',          desc: 'Using high-strength tie-down straps inside closed truck containers to protect furniture corners.' },
  { src: '/photos/direct-container-loading.jpg',           title: 'Direct Container Loading',            desc: 'Stacking goods systematically with heavy items at the base and lighter boxes on top.' },
  { src: '/photos/household-goods-packing.jpg',            title: 'Household Goods Packing',             desc: 'Multi-layered bubble wrapping on electrical appliances for maximum protection during transit.' },
  { src: '/photos/direct-route-dispatch.jpg',              title: 'Direct Route Dispatch',               desc: 'National Packers container carrier fleet ready for immediate direct transport across states.' },
  { src: '/photos/doorstep-relocation-setup.jpg',          title: 'Doorstep Relocation Setup',           desc: 'Offloading household items and setting them up in the customer\'s new home.' },
  { src: '/photos/premium-wrapping-materials.jpg',         title: 'Premium Wrapping Materials',          desc: 'Heavy-duty cardboard boxes, high-density bubble wrap, stretch films, and customized sealing tapes.' },
  { src: '/photos/safe-warehousing-facilities.jpg',        title: 'Safe Warehousing Facilities',         desc: 'Clean, secure, insect-free storage facility at our headquarters with strict inventory controls.' },
  { src: '/photos/gps-cargo-container-fleet.jpg',          title: 'GPS Cargo Container Fleet',           desc: 'Our container trucks dispatching directly with no transshipment or intermediate handling.' },
  { src: '/photos/furniture-wrapping-process.jpg',         title: 'Furniture Wrapping Process',          desc: 'Wrapping double beds, wardrobes, and cabinets with thick foam sheets and heavy outer cardboard.' },
  { src: '/photos/highway-transit-stacking.jpg',           title: 'Highway Transit Stacking',            desc: 'Securing household items in interlocking layouts to eliminate vibrations and road bumps damage.' },
  { src: '/photos/doorstep-offloading-crew.jpg',           title: 'Doorstep Offloading Crew',            desc: 'Our supervisors cross-checking items off the inventory list during unloading.' },
  { src: '/photos/heavy-duty-box-wrapping.jpg',            title: 'Heavy Duty Box Wrapping',             desc: 'Heavy-duty boxes wrapped with thick shrink wrap to prevent dust and water damage.' },
  { src: '/photos/palletized-storage-system.jpg',          title: 'Palletized Storage System',           desc: 'Staging areas inside our clean warehouse designed to support temporary cargo holding.' },
  { src: '/photos/secure-warehouse-racking.jpg',           title: 'Secure Warehouse Racking',            desc: 'Industrial heavy-duty racks holding locked inventory pallets under 24/7 security watch.' },
  { src: '/photos/national-cargo-operations.jpg',          title: 'National Cargo Operations',           desc: 'Staging and organizing boxes inside our storage hub before direct route transit dispatch.' },
  { src: '/photos/highway-container-loading.jpg',          title: 'Highway Container Loading',           desc: 'Stacking cargo into our container fleets safely under supervisor verification.' },
  { src: '/photos/national-dispatch-teams.jpg',            title: 'National Dispatch Teams',             desc: 'Dispatch crews coordinating transits, checking transport documents, and tracking containers.' },
  { src: '/photos/interstate-cargo-relocation.jpg',        title: 'Interstate Cargo Relocation',         desc: 'Heavy cargo containers carrying household and corporate consignments across cities.' },
  { src: '/photos/gps-shifting-fleet.jpg',                 title: 'GPS Shifting Fleet',                  desc: 'Our company-owned fleet parked at our primary corporate shipping terminal.' },
  { src: '/photos/direct-interstate-shipping.jpg',         title: 'Direct Interstate Shipping',          desc: 'National Packers closed container fleet on major highways for express deliveries.' },
  { src: '/photos/safe-packaging-process.jpg',             title: 'Safe Packaging Process',              desc: 'Using double-wall cardboard sheets and heavy-duty tape wrapping for appliances.' },
  { src: '/photos/loading-cargo-operations.jpg',           title: 'Loading Cargo Operations',            desc: 'Systematically stacking household packages in container vehicles to prevent transit friction.' },
  { src: '/photos/secure-vehicle-carrier.jpg',             title: 'Secure Vehicle Carrier',              desc: 'Specialized vehicle carrier operations loading cars damage-free with secure wheel clamps.' },
  { src: '/photos/fragile-packing-standards.jpg',          title: 'Fragile Packing Standards',           desc: 'Using heavy-duty bubble wrap layers followed by secure tape seals on LED TVs and monitors.' },
];

export async function generateMetadata() {
  const path = '/gallery';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Gallery — Shifting Videos & Operations Photos | National Packers & Movers';
  const description = custom?.meta_description || 'View real operational photos and customer video testimonials of National Packers & Movers. High-quality bubble wrapping, container trucks, and office moving guides.';
  const keywords = custom?.meta_keywords || 'packers movers photos, packers movers videos, shifting pictures, national packers gallery';
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
      canonical: `${BASE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}${path}`,
      // Primary gallery photo for social sharing + Google Discover
      images: [
        {
          url: `${BASE_URL}/photos/safe-container-vehicle-loading.jpg`,
          width: 1200,
          height: 800,
          alt: 'National Packers & Movers — Safe Container Vehicle Loading',
        },
      ],
    },
  };
}

export default async function GalleryPage() {
  const galleryPhotos = await getGalleryImages();

  // Decide which photos to use for schema + crawler HTML:
  // If Supabase has real photos → use those (they are the LIVE gallery)
  // If empty → fall back to the static /public/photos/ list
  const photosForSEO = galleryPhotos && galleryPhotos.length > 0
    ? galleryPhotos.map(p => ({
        src: p.src,                         // Full Supabase CDN URL
        title: p.alt || p.title || 'National Packers & Movers Gallery',
        desc: p.description || p.desc || 'Professional relocation services — National Packers & Movers',
      }))
    : STATIC_PHOTOS.map(p => ({
        src: `${BASE_URL}${p.src}`,
        title: p.title,
        desc: p.desc,
      }));

  // Build JSON-LD ImageGallery schema
  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    'name': 'National Packers & Movers — Operational Photo Gallery',
    'description': 'Real operational photos showcasing our professional packing standards, secure closed-container logistics, and dedicated shifting crew.',
    'url': `${BASE_URL}/gallery`,
    'author': {
      '@type': 'Organization',
      'name': 'National Packers & Movers',
      'url': BASE_URL,
    },
    'image': photosForSEO.map(photo => ({
      '@type': 'ImageObject',
      'name': photo.title,
      'description': photo.desc,
      'contentUrl': photo.src,
      'url': `${BASE_URL}/gallery`,
      'acquireLicensePage': `${BASE_URL}/terms`,
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
    <div className={styles.galleryPage}>
      {/* ── JSON-LD ImageGallery Schema for Google ─────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      {/* ── STATIC IMAGE LIST FOR GOOGLEBOT ─────────────────
          Invisible to users (sr-only), but present in initial
          server-rendered HTML so Google can discover all images
          without waiting for JavaScript to execute.
      ──────────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        {photosForSEO.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt={`${photo.title} — National Packers & Movers`}
            width="800"
            height="600"
          />
        ))}
      </div>

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">Media Hub</span>
          <h1 className={styles.heroTitle}>
            National <span>Gallery</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Browse actual operational photos and watch video showcases of our packing, transit, and unpacking services.
          </p>
        </div>
      </section>

      {/* ── PHOTO GALLERY SECTION ────────────────────────── */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Photo Showcase</span>
            <h2 className="section-title">Operations <span>Photos</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Browse our comprehensive gallery of actual operational photos showcasing our professional packing standards, secure closed-container logistics, and dedicated shifting crew. Click any image to view National Packers & Movers&apos; commitment to quality relocation services.
            </p>
          </div>

          <GalleryGrid photos={galleryPhotos} />
        </div>
      </section>

      {/* ── VIDEO GALLERY SECTION ────────────────────────── */}
      <section className="section bg-section-dark">
        <div className="container">
          <VideoShowcase />
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`} data-reveal="up">
          <h2 className={styles.ctaTitle}>Ready to Book Your Relocation?</h2>
          <p className={styles.ctaSubtitle}>
            Our surveyor can visit your home physically or coordinate a video call assessment for a direct quote.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 Call HQ — 9835168368
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
