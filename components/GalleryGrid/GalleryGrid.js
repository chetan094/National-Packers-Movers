'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/gallery/page.module.css';
import { trackEvent } from '@/lib/analytics';

const PHOTOS = [
  // Page 1 (0-7)
  { src: '/photos/premium-cushion-sofa-wrapping.jpg',      alt: 'Multi-Layer Cushion Packing for Sofa Relocation',          title: 'Premium Cushion Sofa Wrapping',       desc: 'Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap and robust outer cardboard sheets.' },
  { src: '/photos/safe-container-vehicle-loading.jpg',     alt: 'Loading Cargo Safely Into Closed Container Truck',         title: 'Safe Container Vehicle Loading',      desc: 'Stacking cartons and wrapped household items securely inside our lockable, weather-proof container vehicles.' },
  { src: '/photos/seamless-corporate-office-shifting.jpg', alt: 'Office Relocation Desks and Computers Logistics',          title: 'Seamless Corporate Office Shifting',  desc: 'PSU and bank employee cabins, computer servers, and office desks carefully boxed and cataloged for transit.' },
  { src: '/photos/safe-car-carrier-shifting.jpg',          alt: 'Secure Vehicle Relocation onto Multi-Car Carrier',         title: 'Safe Car Carrier Shifting',           desc: 'Loading family cars and luxury vehicles onto specialized double-deck carrier trucks for damage-free highway transit.' },
  { src: '/photos/palletized-storage-warehousing.jpg',     alt: 'Secure and Clean Racking Systems for Warehouse Storage',   title: 'Palletized Storage & Warehousing',    desc: 'Clean, insect-free storage facility at our headquarters with strict inventory tracking and 24/7 security watch.' },
  { src: '/photos/waterproof-cardboard-packaging.jpg',     alt: 'Waterproof Wrap Packaged Shifting Carton Boxes',           title: 'Waterproof Cardboard Packaging',      desc: 'Heavy-duty shifting boxes wrapped in waterproof stretch wrap to protect valuables against highway dust and monsoon rains.' },
  { src: '/photos/fragile-kitchenware-wrapping.jpg',       alt: 'Wrapping Delicate Glassware and China Kitchenware',        title: 'Fragile Kitchenware Wrapping',        desc: 'Delicate kitchen glass sets and bone china plates wrapped individually in foam sheets and packed in double-wall boxes.' },
  { src: '/photos/destination-bed-reassembly.jpg',         alt: 'Professional Assembly of Double Bed at Destination House', title: 'Destination Bed Reassembly',          desc: 'Unpacking and placing heavy items exactly where you direct, including the safe reassembly of beds, tables, and cabinets.' },

  // Page 2 (8-15)
  { src: '/photos/team-loading-operations.jpg',            alt: 'Shifting Crew Loading Furniture',                          title: 'Team Loading Operations',             desc: 'Professional loaders carefully handling heavy domestic appliances and furniture onto our direct shipping carriers.' },
  { src: '/photos/uniform-packing-crew.jpg',               alt: 'National Packers Shifting Crew Uniform',                  title: 'Uniform Packing Crew',                desc: 'Our staff dressed in official corporate uniforms, demonstrating organization, background checks, and reliability.' },
  { src: '/photos/gps-tracked-container-fleet.jpg',        alt: 'Closed Container Truck Side View',                        title: 'GPS-Tracked Container Fleet',         desc: 'Our own logistics fleet consisting of lockable, closed-container trucks driving direct routes across states with zero midway transfers.' },
  { src: '/photos/heavy-furniture-shifting.jpg',           alt: 'Heavy Wardrobe and Bed Assembly and Packing',             title: 'Heavy Furniture Shifting',            desc: 'Experienced crews using specialized belts and corner guards to carry heavy wooden wardrobes and double beds safely down stairs.' },
  { src: '/photos/secure-cargo-stacking-layout.jpg',       alt: 'Goods Stacked Securely inside Container Truck',           title: 'Secure Cargo Stacking Layout',        desc: 'Interlocking packing methods inside the truck container to eliminate item movements and friction during highway transit.' },
  { src: '/photos/dual-layer-bubble-wrapping.jpg',         alt: 'Crews Packing Goods in Double-Layer Bubble Wrap',         title: 'Dual-Layer Bubble Wrapping',          desc: 'Wrapping fragile electronics, LED TVs, and delicate mirrors using thick bubble wrap followed by high-density stretch wrapping.' },
  { src: '/photos/apartment-residential-relocation.jpg',   alt: 'Local Apartment Move Packing Layout',                     title: 'Apartment Residential Relocation',    desc: 'Local shifting services executing complete door-to-door residential relocations in Ranchi, Dhanbad, and Patna.' },
  { src: '/photos/doorstep-unloading-setup.jpg',           alt: 'Doorstep Delivery and Placement Operations',              title: 'Doorstep Unloading & Setup',          desc: 'Our local supervisors cross-checking the item checklist during doorstep unloading and setting up large items in their designated rooms.' },

  // Page 3+ (16-47)
  { src: '/photos/bike-relocation-packing.jpg',            alt: 'Two-Wheeler Packing and Shipping',                        title: 'Bike Relocation Packing',             desc: 'Professional two-wheeler packing using multi-layer bubble wrapping and customized cargo carrier transit.' },
  { src: '/photos/national-logistics-transit.jpg',         alt: 'National Packers & Movers Transport Vehicles',            title: 'National Logistics Transit',          desc: 'Our transport vehicles loaded and ready for safe highway dispatch from our branch office.' },
  { src: '/photos/national-packing-operations.jpg',        alt: 'National Packers Shifting Operations',                    title: 'National Packing Operations',         desc: 'Experienced shifting crews wrapping domestic assets using heavy-duty stretch wraps and cartons.' },
  { src: '/photos/relocation-packing-standards.jpg',       alt: 'Household Shifting Packing Standards',                    title: 'Relocation Packing Standards',        desc: 'Standardized wrapping layouts for home furniture and delicate electronics before transit loading.' },
  { src: '/photos/cargo-loading-dispatch.jpg',             alt: 'National Packers Cargo Dispatch',                         title: 'Cargo Loading & Dispatch',            desc: 'Carefully stacking boxes inside container trucks to ensure zero movement and damage-free transit.' },
  { src: '/photos/container-loading-process.jpg',          alt: 'Closed Container Logistics Fleet',                        title: 'Container Loading Process',           desc: 'Locked container loading at our transit terminal ensuring maximum safety for long-distance relocations.' },
  { src: '/photos/multi-layer-packing-process.jpg',        alt: 'Secure Packaging of Valuables',                           title: 'Multi-Layer Packing Process',         desc: 'Wrapping fragile kitchenware, chinaware, and electronics in dynamic thick cushion rolls.' },
  { src: '/photos/goods-dispatch-transit.jpg',             alt: 'Transit Logistics Operations',                            title: 'Goods Dispatch Transit',              desc: 'Supervising direct interstate vehicle transit dispatch matching high-end safety guidelines.' },
  { src: '/photos/national-shifting-crew.jpg',             alt: 'National Packers Team in Action',                         title: 'National Shifting Crew',              desc: 'Uniformed, trained logistics staff handling large domestic items safely down residential floors.' },
  { src: '/photos/secure-shifting-operations.jpg',         alt: 'Securing Cargo for Transit',                              title: 'Secure Shifting Operations',          desc: 'Using high-strength tie-down straps inside closed truck containers to protect furniture corners.' },
  { src: '/photos/direct-container-loading.jpg',           alt: 'Direct Shipping Container Operations',                    title: 'Direct Container Loading',            desc: 'Stacking goods systematically with heavy items at the base and lighter boxes on top.' },
  { src: '/photos/household-goods-packing.jpg',            alt: 'National Shifting Crews Packing Cargo',                   title: 'Household Goods Packing',             desc: 'Multi-layered bubble wrapping on electrical appliances for maximum protection during transit.' },
  { src: '/photos/direct-route-dispatch.jpg',              alt: 'GPS Tracked Moving Vehicles',                             title: 'Direct Route Dispatch',               desc: 'National Packers container carrier fleet ready for immediate direct transport across states.' },
  { src: '/photos/doorstep-relocation-setup.jpg',          alt: 'Transit Operations and Safe Delivery',                    title: 'Doorstep Relocation Setup',           desc: 'Offloading household items and setting them up in the customer\'s new home.' },
  { src: '/photos/premium-wrapping-materials.jpg',         alt: 'National Packers Packing Materials',                      title: 'Premium Wrapping Materials',          desc: 'Heavy-duty cardboard boxes, high-density bubble wrap, stretch films, and customized sealing tapes.' },
  { src: '/photos/safe-warehousing-facilities.jpg',        alt: 'Household Storage and Cargo Warehousing',                 title: 'Safe Warehousing Facilities',         desc: 'Clean, secure, insect-free storage facility at our headquarters with strict inventory controls.' },
  { src: '/photos/gps-cargo-container-fleet.jpg',          alt: 'Loading Cargo Safely Into Container Fleet',               title: 'GPS Cargo Container Fleet',           desc: 'Our proprietary container trucks dispatching directly with no transshipment or intermediate handling.' },
  { src: '/photos/furniture-wrapping-process.jpg',         alt: 'National Packing Teams Wrapping Furniture',               title: 'Furniture Wrapping Process',          desc: 'Wrapping double beds, wardrobes, and cabinets with thick foam sheets and heavy outer cardboard.' },
  { src: '/photos/highway-transit-stacking.jpg',           alt: 'Stacking Cargo Safely for Highway Transit',               title: 'Highway Transit Stacking',            desc: 'Securing household items in interlocking layouts to eliminate vibrations and road bumps damage.' },
  { src: '/photos/doorstep-offloading-crew.jpg',           alt: 'Relocation Services and Delivery Operations',             title: 'Doorstep Offloading Crew',            desc: 'Our supervisors cross-checking items off the inventory list during unloading.' },
  { src: '/photos/heavy-duty-box-wrapping.jpg',            alt: 'Bubble Wrap Cushioned Shifting Box',                      title: 'Heavy Duty Box Wrapping',             desc: 'Heavy-duty boxes wrapped with thick shrink wrap to prevent dust and water damage.' },
  { src: '/photos/palletized-storage-system.jpg',          alt: 'National Packers Warehousing Facility',                   title: 'Palletized Storage System',           desc: 'Staging areas inside our clean warehouse designed to support temporary cargo holding.' },
  { src: '/photos/secure-warehouse-racking.jpg',           alt: 'Secure Storage Racks and Vaults',                         title: 'Secure Warehouse Racking',            desc: 'Industrial heavy-duty racks holding locked inventory pallets under 24/7 security watch.' },
  { src: '/photos/national-cargo-operations.jpg',          alt: 'Household Relocation Logistics Operations',               title: 'National Cargo Operations',           desc: 'Staging and organizing boxes inside our storage hub before direct route transit dispatch.' },
  { src: '/photos/highway-container-loading.jpg',          alt: 'Direct Loading Cargo into Container Trucks',              title: 'Highway Container Loading',           desc: 'Stacking cargo into our container fleets safely under supervisor verification.' },
  { src: '/photos/national-dispatch-teams.jpg',            alt: 'Uniform Logistics Staff dispatching Cargo',               title: 'National Dispatch Teams',             desc: 'Dispatch crews coordinating transits, checking transport documents, and tracking container transits.' },
  { src: '/photos/interstate-cargo-relocation.jpg',        alt: 'Transit Logistics and Relocation Operations',             title: 'Interstate Cargo Relocation',         desc: 'Heavy cargo containers carrying household and corporate consignments across cities.' },
  { src: '/photos/gps-shifting-fleet.jpg',                 alt: 'National Packers Shifting Truck Fleet',                   title: 'GPS Shifting Fleet',                  desc: 'Our company-owned fleet parked at our primary corporate shipping terminal.' },
  { src: '/photos/direct-interstate-shipping.jpg',         alt: 'Direct Shifting Transit across States',                   title: 'Direct Interstate Shipping',          desc: 'National Packers closed container fleet in route on major highways for express deliveries.' },
  { src: '/photos/safe-packaging-process.jpg',             alt: 'National Packers Shifting Operations',                    title: 'Safe Packaging Process',              desc: 'Using double-wall cardboard sheets and heavy-duty tape wrapping for appliances.' },
  { src: '/photos/loading-cargo-operations.jpg',           alt: 'National Logistics Crew loading goods',                   title: 'Loading Cargo Operations',            desc: 'Systematically stacking household packages in container vehicles to prevent transit friction.' },
  { src: '/photos/secure-vehicle-carrier.jpg',             alt: 'Safe Packing for Family Vehicle',                         title: 'Secure Vehicle Carrier',              desc: 'Specialized vehicle carrier operations loading cars damage-free with secure wheel clamps.' },
  { src: '/photos/fragile-packing-standards.jpg',          alt: 'Multi-layer Wrapping for Electronic Goods',               title: 'Fragile Packing Standards',           desc: 'Using heavy-duty bubble wrap layers followed by secure tape seals on LED TVs and monitors.' },
];

export default function GalleryGrid({ photos = [] }) {
  const photosToRender = photos.length > 0 ? photos.map(p => ({
    src: p.src,
    alt: p.alt,
    title: p.title || p.caption || '',
    desc: p.description || p.desc || ''
  })) : PHOTOS;

  const [activePhoto, setActivePhoto] = useState(null);
  const [gridPage, setGridPage] = useState(0);

  const totalPages = Math.ceil(photosToRender.length / 8);

  const handleNextPage = () => {
    setGridPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setGridPage(prev => Math.max(prev - 1, 0));
  };

  const pages = Array.from({ length: totalPages }, (_, i) =>
    photosToRender.slice(i * 8, (i + 1) * 8)
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhoto === null) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') {
        setActivePhoto(prev => (prev + 1) % photosToRender.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhoto(prev => (prev - 1 + photosToRender.length) % photosToRender.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, photosToRender.length]);

  return (
    <>
      {/* Paginated Grid Viewport */}
      <div className={styles.gridViewport} data-reveal="up" data-delay="100">
        {/* Left Page Navigation Arrow */}
        <button
          type="button"
          className={`${styles.gridArrowBtn} ${styles.gridLeftArrow}`}
          onClick={handlePrevPage}
          disabled={gridPage === 0}
          aria-label="Previous photos page"
        >
          ‹
        </button>

        <div
          className={styles.gridTrack}
          style={{ transform: `translateX(-${gridPage * 100}%)` }}
        >
          {pages.map((pagePhotos, pageIdx) => (
            <div key={pageIdx} className={styles.gridPage}>
              <div className={styles.photoGrid}>
                {pagePhotos.map((photo, index) => {
                  const globalIndex = pageIdx * 8 + index;
                  return (
                    <div
                      key={globalIndex}
                      className={styles.photoCard}
                      onClick={() => {
                        setActivePhoto(globalIndex);
                        trackEvent('image_view', photo.title || photo.alt);
                      }}
                    >
                      <div className={styles.imageWrap}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className={styles.gridImg}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.classList.add(styles.imgFallback);
                          }}
                        />
                        <div className={styles.fallbackLabel}>
                          📸 {photo.title}
                        </div>
                        <div className={styles.hoverOverlay}>
                          <span className={styles.zoomIcon}>🔍 Zoom Photo</span>
                        </div>
                      </div>
                      <div className={styles.photoCardMeta}>
                        <h4 className={styles.photoCardTitle}>{photo.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Page Navigation Arrow */}
        <button
          type="button"
          className={`${styles.gridArrowBtn} ${styles.gridRightArrow}`}
          onClick={handleNextPage}
          disabled={gridPage === totalPages - 1}
          aria-label="Next photos page"
        >
          ›
        </button>
      </div>

      {/* Grid Indicators (Dots with Adjacent Arrows) */}
      <div className={styles.gridIndicatorsContainer}>
        <button
          type="button"
          className={`${styles.indicatorArrowBtn} ${styles.leftIndicatorArrow}`}
          onClick={handlePrevPage}
          disabled={gridPage === 0}
          aria-label="Previous page"
        >
          ‹
        </button>
        <div className={styles.gridIndicators}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.gridDot} ${gridPage === idx ? styles.gridDotActive : ''}`}
              onClick={() => setGridPage(idx)}
              aria-label={`Photos page ${idx + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className={`${styles.indicatorArrowBtn} ${styles.rightIndicatorArrow}`}
          onClick={handleNextPage}
          disabled={gridPage === totalPages - 1}
          aria-label="Next page"
        >
          ›
        </button>
      </div>

      {/* ── LIGHTBOX MODAL OVERLAY ─────────────────────────── */}
      {activePhoto !== null && (
        <div className={styles.lightbox} onClick={() => setActivePhoto(null)}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setActivePhoto(null)}
            aria-label="Close photo preview"
          >
            ✕
          </button>

          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.leftArrow}`}
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto(prev => (prev - 1 + photosToRender.length) % photosToRender.length);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={photosToRender[activePhoto].src}
              alt={photosToRender[activePhoto].alt}
              className={styles.lightboxImg}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.classList.add(styles.lightboxFallback);
              }}
            />
            <div className={styles.lightboxFallbackText}>
              📸 Placeholder: {photosToRender[activePhoto].title}
            </div>
            <div className={styles.lightboxMeta}>
              <h3 className={styles.lightboxTitle}>{photosToRender[activePhoto].title}</h3>
              <p className={styles.lightboxDesc}>{photosToRender[activePhoto].desc}</p>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.rightArrow}`}
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto(prev => (prev + 1) % photosToRender.length);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
