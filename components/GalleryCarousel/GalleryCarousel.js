'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './GalleryCarousel.module.css';

const GALLERY_PHOTOS = [
  { id: 'img-premium-cushion-sofa-wrapping',       src: '/photos/premium-cushion-sofa-wrapping.jpg',       alt: 'Multi-Layer Cushion Packing for Sofa Relocation',            caption: 'Premium Cushion Sofa Wrapping' },
  { id: 'img-safe-container-vehicle-loading',      src: '/photos/safe-container-vehicle-loading.jpg',      alt: 'Loading Cargo Safely Into Closed Container Truck',           caption: 'Safe Container Vehicle Loading' },
  { id: 'img-seamless-corporate-office-shifting',  src: '/photos/seamless-corporate-office-shifting.jpg',  alt: 'Office Relocation Desks and Computers Logistics',            caption: 'Seamless Corporate Office Shifting' },
  { id: 'img-safe-car-carrier-shifting',           src: '/photos/safe-car-carrier-shifting.jpg',           alt: 'Secure Vehicle Relocation onto Multi-Car Carrier',           caption: 'Safe Car Carrier Shifting' },
  { id: 'img-palletized-storage-warehousing',      src: '/photos/palletized-storage-warehousing.jpg',      alt: 'Secure and Clean Racking Systems for Warehouse Storage',     caption: 'Palletized Storage & Warehousing' },
  { id: 'img-waterproof-cardboard-packaging',      src: '/photos/waterproof-cardboard-packaging.jpg',      alt: 'Waterproof Wrap Packaged Shifting Carton Boxes',             caption: 'Waterproof Cardboard Packaging' },
  { id: 'img-fragile-kitchenware-wrapping',        src: '/photos/fragile-kitchenware-wrapping.jpg',        alt: 'Wrapping Delicate Glassware and China Kitchenware',          caption: 'Fragile Kitchenware Wrapping' },
  { id: 'img-destination-bed-reassembly',          src: '/photos/destination-bed-reassembly.jpg',          alt: 'Professional Assembly of Double Bed at Destination House',   caption: 'Destination Bed Reassembly' },
  { id: 'img-team-loading-operations',             src: '/photos/team-loading-operations.jpg',             alt: 'Shifting Crew Loading Furniture',                            caption: 'Team Loading Operations' },
  { id: 'img-uniform-packing-crew',                src: '/photos/uniform-packing-crew.jpg',                alt: 'National Packers Shifting Crew Uniform',                    caption: 'Uniform Packing Crew' },
  { id: 'img-gps-tracked-container-fleet',         src: '/photos/gps-tracked-container-fleet.jpg',         alt: 'Closed Container Truck Side View',                          caption: 'GPS-Tracked Container Fleet' },
  { id: 'img-heavy-furniture-shifting',            src: '/photos/heavy-furniture-shifting.jpg',            alt: 'Heavy Wardrobe and Bed Assembly and Packing',               caption: 'Heavy Furniture Shifting' },
  { id: 'img-secure-cargo-stacking-layout',        src: '/photos/secure-cargo-stacking-layout.jpg',        alt: 'Goods Stacked Securely inside Container Truck',             caption: 'Secure Cargo Stacking Layout' },
  { id: 'img-dual-layer-bubble-wrapping',          src: '/photos/dual-layer-bubble-wrapping.jpg',          alt: 'Crews Packing Goods in Double-Layer Bubble Wrap',           caption: 'Dual-Layer Bubble Wrapping' },
  { id: 'img-apartment-residential-relocation',    src: '/photos/apartment-residential-relocation.jpg',    alt: 'Local Apartment Move Packing Layout',                       caption: 'Apartment Relocation' },
  { id: 'img-doorstep-unloading-setup',            src: '/photos/doorstep-unloading-setup.jpg',            alt: 'Doorstep Delivery and Placement Operations',                caption: 'Doorstep Unloading & Setup' },
  { id: 'img-bike-relocation-packing',             src: '/photos/bike-relocation-packing.jpg',             alt: 'Two-Wheeler Packing and Shipping',                          caption: 'Bike Relocation Packing' },
  { id: 'img-national-logistics-transit',          src: '/photos/national-logistics-transit.jpg',          alt: 'National Packers & Movers Transport Vehicles',              caption: 'National Logistics Transit' },
  { id: 'img-national-packing-operations',         src: '/photos/national-packing-operations.jpg',         alt: 'National Packers Shifting Operations',                      caption: 'National Packing Operations' },
  { id: 'img-relocation-packing-standards',        src: '/photos/relocation-packing-standards.jpg',        alt: 'Household Shifting Packing Standards',                      caption: 'Relocation Packing Standards' },
  { id: 'img-cargo-loading-dispatch',              src: '/photos/cargo-loading-dispatch.jpg',              alt: 'National Packers Cargo Dispatch',                           caption: 'Cargo Loading & Dispatch' },
  { id: 'img-container-loading-process',           src: '/photos/container-loading-process.jpg',           alt: 'Closed Container Logistics Fleet',                          caption: 'Container Loading Process' },
  { id: 'img-multi-layer-packing-process',         src: '/photos/multi-layer-packing-process.jpg',         alt: 'Secure Packaging of Valuables',                             caption: 'Multi-Layer Packing Process' },
  { id: 'img-goods-dispatch-transit',              src: '/photos/goods-dispatch-transit.jpg',              alt: 'Transit Logistics Operations',                              caption: 'Goods Dispatch Transit' },
  { id: 'img-national-shifting-crew',              src: '/photos/national-shifting-crew.jpg',              alt: 'National Packers Team in Action',                           caption: 'National Shifting Crew' },
  { id: 'img-secure-shifting-operations',          src: '/photos/secure-shifting-operations.jpg',          alt: 'Securing Cargo for Transit',                                caption: 'Secure Shifting Operations' },
  { id: 'img-direct-container-loading',            src: '/photos/direct-container-loading.jpg',            alt: 'Direct Shipping Container Operations',                      caption: 'Direct Container Loading' },
  { id: 'img-household-goods-packing',             src: '/photos/household-goods-packing.jpg',             alt: 'National Shifting Crews Packing Cargo',                     caption: 'Household Goods Packing' },
  { id: 'img-direct-route-dispatch',               src: '/photos/direct-route-dispatch.jpg',               alt: 'GPS Tracked Moving Vehicles',                               caption: 'Direct Route Dispatch' },
  { id: 'img-doorstep-relocation-setup',           src: '/photos/doorstep-relocation-setup.jpg',           alt: 'Transit Operations and Safe Delivery',                      caption: 'Doorstep Relocation Setup' },
  { id: 'img-premium-wrapping-materials',          src: '/photos/premium-wrapping-materials.jpg',          alt: 'National Packers Packing Materials',                        caption: 'Premium Wrapping Materials' },
  { id: 'img-safe-warehousing-facilities',         src: '/photos/safe-warehousing-facilities.jpg',         alt: 'Household Storage and Cargo Warehousing',                   caption: 'Safe Warehousing Facilities' },
  { id: 'img-gps-cargo-container-fleet',           src: '/photos/gps-cargo-container-fleet.jpg',           alt: 'Loading Cargo Safely Into Container Fleet',                 caption: 'GPS Cargo Container Fleet' },
  { id: 'img-furniture-wrapping-process',          src: '/photos/furniture-wrapping-process.jpg',          alt: 'National Packing Teams Wrapping Furniture',                 caption: 'Furniture Wrapping Process' },
  { id: 'img-highway-transit-stacking',            src: '/photos/highway-transit-stacking.jpg',            alt: 'Stacking Cargo Safely for Highway Transit',                 caption: 'Highway Transit Stacking' },
  { id: 'img-doorstep-offloading-crew',            src: '/photos/doorstep-offloading-crew.jpg',            alt: 'Relocation Services and Delivery Operations',               caption: 'Doorstep Offloading Crew' },
  { id: 'img-heavy-duty-box-wrapping',             src: '/photos/heavy-duty-box-wrapping.jpg',             alt: 'Bubble Wrap Cushioned Shifting Box',                        caption: 'Heavy Duty Box Wrapping' },
  { id: 'img-palletized-storage-system',           src: '/photos/palletized-storage-system.jpg',           alt: 'National Packers Warehousing Facility',                     caption: 'Palletized Storage System' },
  { id: 'img-secure-warehouse-racking',            src: '/photos/secure-warehouse-racking.jpg',            alt: 'Secure Storage Racks and Vaults',                           caption: 'Secure Warehouse Racking' },
  { id: 'img-national-cargo-operations',           src: '/photos/national-cargo-operations.jpg',           alt: 'Household Relocation Logistics Operations',                 caption: 'National Cargo Operations' },
  { id: 'img-highway-container-loading',           src: '/photos/highway-container-loading.jpg',           alt: 'Direct Loading Cargo into Container Trucks',                caption: 'Highway Container Loading' },
  { id: 'img-national-dispatch-teams',             src: '/photos/national-dispatch-teams.jpg',             alt: 'Uniform Logistics Staff dispatching Cargo',                 caption: 'National Dispatch Teams' },
  { id: 'img-interstate-cargo-relocation',         src: '/photos/interstate-cargo-relocation.jpg',         alt: 'Transit Logistics and Relocation Operations',               caption: 'Interstate Cargo Relocation' },
  { id: 'img-gps-shifting-fleet',                  src: '/photos/gps-shifting-fleet.jpg',                  alt: 'National Packers Shifting Truck Fleet',                     caption: 'GPS Shifting Fleet' },
  { id: 'img-direct-interstate-shipping',          src: '/photos/direct-interstate-shipping.jpg',          alt: 'Direct Shifting Transit across States',                     caption: 'Direct Interstate Shipping' },
  { id: 'img-safe-packaging-process',              src: '/photos/safe-packaging-process.jpg',              alt: 'National Packers Shifting Operations',                      caption: 'Safe Packaging Process' },
  { id: 'img-loading-cargo-operations',            src: '/photos/loading-cargo-operations.jpg',            alt: 'National Logistics Crew loading goods',                     caption: 'Loading Cargo Operations' },
  { id: 'img-secure-vehicle-carrier',              src: '/photos/secure-vehicle-carrier.jpg',              alt: 'Safe Packing for Family Vehicle',                           caption: 'Secure Vehicle Carrier' },
  { id: 'img-fragile-packing-standards',           src: '/photos/fragile-packing-standards.jpg',           alt: 'Multi-layer Wrapping for Electronic Goods',                 caption: 'Fragile Packing Standards' },
];

export default function GalleryCarousel({ photos = [] }) {
  const photosToRender = photos.length > 0 ? photos.map((p, idx) => ({
    id: p.id || p.uuid || `img-car-${idx}`,
    src: p.src,
    alt: p.alt || p.caption || 'National Packers & Movers',
    caption: p.caption || p.title || ''
  })) : GALLERY_PHOTOS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, photosToRender.length - itemsPerView);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const getVisibleDotIndices = () => {
    const maxDots = 5;
    const half = Math.floor(maxDots / 2);
    let start = Math.max(0, currentIndex - half);
    let end = Math.min(maxIndex, start + maxDots - 1);
    if (end - start + 1 < maxDots) {
      start = Math.max(0, end - maxDots + 1);
    }
    const indices = [];
    for (let i = start; i <= end; i++) {
      indices.push(i);
    }
    return indices;
  };

  const slideWidth = 100 / itemsPerView;

  return (
    <section className={`section ${styles.gallerySection}`}>
      <div className="container">
        <div className="section-header" data-reveal="up">
          <span className="section-tag">Media Gallery</span>
          <h2 className="section-title">Our Work <span>In Action</span></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Real pictures of our premium packing, direct transit logistics, vehicle relocation, and secure warehousing operations.
          </p>
        </div>

        <div className={styles.carouselContainer} data-reveal="up" data-delay="100">
          <button type="button" className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous photos">‹</button>

          <div className={styles.slidesViewport}>
            <div className={styles.slidesTrack} style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
              {photosToRender.map((photo) => (
                <div key={photo.id} className={styles.slideItem} style={{ width: `${slideWidth}%` }}>
                  <div className={styles.imageCard}>
                    <img src={photo.src} alt={photo.alt} className={styles.slideImg} loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.classList.add(styles.imgFallback); }}
                    />
                    <div className={styles.fallbackLabel}>📸 {photo.caption}</div>
                    <div className={styles.imageOverlay}>
                      <span className={styles.imageTag}>National Packers & Movers</span>
                      <h4 className={styles.imageTitle}>{photo.caption}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="button" className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} disabled={currentIndex >= maxIndex} aria-label="Next photos">›</button>
        </div>

        <div className={styles.desktopIndicators}>
          {photosToRender.length <= 12 ? (
            <div className={styles.indicators}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button key={idx} type="button" className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`} onClick={() => setCurrentIndex(idx)} aria-label={`Go to slide group ${idx + 1}`} />
              ))}
            </div>
          ) : (
            <div className={styles.textIndicator}>
              <div className={styles.progressLineContainer}>
                <div className={styles.progressLineBar} style={{ width: `${((currentIndex + itemsPerView) / photosToRender.length) * 100}%` }} />
              </div>
              <span className={styles.indicatorText}>
                Viewing {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, photosToRender.length)} of {photosToRender.length} Photos
              </span>
            </div>
          )}
        </div>

        <div className={styles.mobileNavContainer}>
          <button type="button" className={styles.mobileArrowBtn} onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous photos">‹</button>
          <div className={styles.mobileDots}>
            {getVisibleDotIndices().map((idx) => (
              <button key={idx} type="button" className={`${styles.mobileDot} ${idx === currentIndex ? styles.mobileDotActive : ''}`} onClick={() => setCurrentIndex(idx)} aria-label={`Go to photo ${idx + 1}`} />
            ))}
          </div>
          <button type="button" className={styles.mobileArrowBtn} onClick={handleNext} disabled={currentIndex >= maxIndex} aria-label="Next photos">›</button>
        </div>

        <div className={styles.galleryCTA} data-reveal="up" data-delay="150">
          <Link href="/gallery" className="btn btn-secondary">
            🖼️ View Full Photo &amp; Video Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
