'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './GalleryCarousel.module.css';

const GALLERY_PHOTOS = [
  // Labeled 1-8
  {
    src: '/photos/shifting-packing-sofa.jpg',
    alt: 'Multi-Layer Cushion Packing for Sofa Relocation',
    caption: 'Premium Cushion Sofa Wrapping'
  },
  {
    src: '/photos/shifting-truck-loading.jpg',
    alt: 'Loading Cargo Safely Into Closed Container Truck',
    caption: 'Safe Container Vehicle Loading'
  },
  {
    src: '/photos/shifting-office-move.jpg',
    alt: 'Office Relocation Desks and Computers Logistics',
    caption: 'Seamless Corporate Office Shifting'
  },
  {
    src: '/photos/shifting-car-carrier.jpg',
    alt: 'Secure Vehicle Relocation onto Multi-Car Carrier',
    caption: 'Safe Car Carrier Shifting'
  },
  {
    src: '/photos/shifting-warehouse-racks.jpg',
    alt: 'Secure and Clean Racking Systems for Warehouse Storage',
    caption: 'Palletized Storage & Warehousing'
  },
  {
    src: '/photos/shifting-packaging-boxes.jpg',
    alt: 'Waterproof Wrap Packaged Shifting Carton Boxes',
    caption: 'Waterproof Cardboard Packaging'
  },
  {
    src: '/photos/shifting-kitchen-wrapping.jpg',
    alt: 'Wrapping Delicate Glassware and China Kitchenware',
    caption: 'Fragile Kitchenware Wrapping'
  },
  {
    src: '/photos/shifting-furniture-reassembly.jpg',
    alt: 'Professional Assembly of Double Bed at Destination House',
    caption: 'Destination Bed Reassembly'
  },

  // Mapped/Labeled 9-16
  {
    src: '/photos/shifting-team-loading.jpg',
    alt: 'Shifting Crew Loading Furniture',
    caption: 'Team Loading Operations'
  },
  {
    src: '/photos/shifting-crew-uniform.jpg',
    alt: 'National Packers Shifting Crew Uniform',
    caption: 'Uniform Packing Crew'
  },
  {
    src: '/photos/shifting-truck-side.jpg',
    alt: 'Closed Container Truck Side View',
    caption: 'GPS-Tracked Container Fleet'
  },
  {
    src: '/photos/shifting-heavy-furniture.jpg',
    alt: 'Heavy Wardrobe and Bed Assembly and Packing',
    caption: 'Heavy Furniture Shifting'
  },
  {
    src: '/photos/shifting-safe-transport.jpg',
    alt: 'Goods Stained and Stacked inside Container Truck',
    caption: 'Secure Cargo Stacking Layout'
  },
  {
    src: '/photos/shifting-double-packing.jpg',
    alt: 'Crews Packing Goods in Double-Layer Bubble Wrap',
    caption: 'Dual-Layer Bubble Wrapping'
  },
  {
    src: '/photos/shifting-apartment-shift.jpg',
    alt: 'Local Apartment Move Packing Layout',
    caption: 'Apartment Relocation'
  },
  {
    src: '/photos/shifting-doorstep-delivery.jpg',
    alt: 'Doorstep Delivery and Placement Operations',
    caption: 'Doorstep Unloading & Setup'
  },

  // Compressed raw photos (unlabeled/default)
  {
    src: '/photos/bike-packing.jpg',
    alt: 'Two-Wheeler Packing and Shipping',
    caption: 'Bike Relocation Packing'
  },
  {
    src: '/photos/img-20230911-wa0002.jpg',
    alt: 'National Packers & Movers Transport Vehicles',
    caption: 'National Logistics Transit'
  },
  {
    src: '/photos/img-20231005-wa0049.jpg',
    alt: 'National Packers Shifting Operations',
    caption: 'National Packing Operations'
  },
  {
    src: '/photos/img-20250121-wa0024.jpg',
    alt: 'Household Shifting Packing Standards',
    caption: 'Relocation Packing Standards'
  },
  {
    src: '/photos/img-20250121-wa0031.jpg',
    alt: 'National Packers Cargo Dispatch',
    caption: 'Cargo Loading & Dispatch'
  },
  {
    src: '/photos/img-20250121-wa0033.jpg',
    alt: 'Closed Container Logistics Fleet',
    caption: 'Container Loading Process'
  },
  {
    src: '/photos/img-20250121-wa0035.jpg',
    alt: 'Secure Packaging of Valuables',
    caption: 'Multi-Layer Packing Process'
  },
  {
    src: '/photos/img-20250121-wa0036.jpg',
    alt: 'Transit Logistics Operations',
    caption: 'Goods Dispatch Transit'
  },
  {
    src: '/photos/img-20250714-wa0024.jpg',
    alt: 'National Packers Team in Action',
    caption: 'National Shifting Crew'
  },
  {
    src: '/photos/img-20250714-wa0025.jpg',
    alt: 'Securing Cargo for Transit',
    caption: 'Secure Shifting Operations'
  },
  {
    src: '/photos/img-20250717-wa0018.jpg',
    alt: 'Direct Shipping Container Operations',
    caption: 'Direct Container Loading'
  },
  {
    src: '/photos/img-20250725-wa0015.jpg',
    alt: 'National Shifting Crews Packing Cargo',
    caption: 'Household Goods Packing'
  },
  {
    src: '/photos/img-20250806-wa0009.jpg',
    alt: 'GPS Tracked Moving Vehicles',
    caption: 'Direct Route Dispatch'
  },
  {
    src: '/photos/img-20250807-wa0027.jpg',
    alt: 'Transit Operations and Safe Delivery',
    caption: 'Doorstep Relocation Setup'
  },
  {
    src: '/photos/img-20251118-wa0029.jpg',
    alt: 'National Packers Packing Materials',
    caption: 'Premium Wrapping Materials'
  },
  {
    src: '/photos/img-20251231-wa0020.jpg',
    alt: 'Household Storage and Cargo Warehousing',
    caption: 'Safe Warehousing Facilities'
  },
  {
    src: '/photos/img-20260309-wa0012.jpg',
    alt: 'Loading Cargo Safely Into Container Fleet',
    caption: 'GPS Cargo Container Fleet'
  },
  {
    src: '/photos/img-20260309-wa0013.jpg',
    alt: 'National Packing Teams Wrapping Furniture',
    caption: 'Furniture Wrapping Process'
  },
  {
    src: '/photos/img-20260309-wa0018.jpg',
    alt: 'Stacking Cargo Safely for Highway Transit',
    caption: 'Highway Transit Stacking'
  },
  {
    src: '/photos/img-20260309-wa0025.jpg',
    alt: 'Relocation Services and Delivery Operations',
    caption: 'Doorstep Offloading Crew'
  },
  {
    src: '/photos/img-20260309-wa0028.jpg',
    alt: 'Bubble Wrap Cushioned Shifting Box',
    caption: 'Heavy Duty Box Wrapping'
  },
  {
    src: '/photos/img-20260309-wa0030.jpg',
    alt: 'National Shifting and Moving Services',
    caption: 'National Relocation Services'
  },
  {
    src: '/photos/img20260222143558.jpg',
    alt: 'National Packers Warehousing Facility',
    caption: 'Palletized Storage System'
  },
  {
    src: '/photos/img20260222144818_01.jpg',
    alt: 'Secure Storage Racks and Vaults',
    caption: 'Secure Warehouse Racking'
  },
  {
    src: '/photos/img20260222160629.jpg',
    alt: 'Household Relocation Logistics Operations',
    caption: 'National Cargo Operations'
  },
  {
    src: '/photos/img20260411150250.jpg',
    alt: 'Direct Loading Cargo into Container Trucks',
    caption: 'Highway Container Loading'
  },
  {
    src: '/photos/img20260411151841.jpg',
    alt: 'Uniform Logistics Staff dispatching Cargo',
    caption: 'National Dispatch Teams'
  },
  {
    src: '/photos/img20260411152042.jpg',
    alt: 'Transit Logistics and Relocation Operations',
    caption: 'Interstate Cargo Relocation'
  },
  {
    src: '/photos/img20260428145155.jpg',
    alt: 'National Packers Shifting Truck Fleet',
    caption: 'GPS Shifting Fleet'
  },
  {
    src: '/photos/img20260428204927.jpg',
    alt: 'Direct Shifting Transit across States',
    caption: 'Direct Interstate Shipping'
  },
  {
    src: '/photos/img_20260322_124603.jpg',
    alt: 'National Packers Shifting Operations',
    caption: 'Safe Packaging Process'
  },
  {
    src: '/photos/img_9473.jpg',
    alt: 'National Logistics Crew loading goods',
    caption: 'Loading Cargo Operations'
  },
  {
    src: '/photos/whatsapp-image-2023-09-12-at-16.40.34.jpg',
    alt: 'Safe Packing for Family Vehicle',
    caption: 'Secure Vehicle Carrier'
  },
  {
    src: '/photos/whatsapp-image-2025-11-22-at-09.09.14_f0cbaab8.jpg',
    alt: 'Multi-layer Wrapping for Electronic Goods',
    caption: 'Fragile Packing Standards'
  }
];

export default function GalleryCarousel() {
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

  const maxIndex = GALLERY_PHOTOS.length - itemsPerView;

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
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
          {/* Previous Arrow */}
          <button 
            type="button" 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous photos"
          >
            ‹
          </button>

          {/* Slides Viewport */}
          <div className={styles.slidesViewport}>
            <div 
              className={styles.slidesTrack} 
              style={{ 
                transform: `translateX(-${currentIndex * slideWidth}%)` 
              }}
            >
              {GALLERY_PHOTOS.map((photo, index) => (
                <div 
                  key={index} 
                  className={styles.slideItem}
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className={styles.imageCard}>
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className={styles.slideImg}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback background text in case user has not dropped files yet
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add(styles.imgFallback);
                      }}
                    />
                    {/* Placeholder Text shown ONLY if image fails to load */}
                    <div className={styles.fallbackLabel}>
                      📸 {photo.caption}
                    </div>
                    <div className={styles.imageOverlay}>
                      <span className={styles.imageTag}>National Packers & Movers</span>
                      <h4 className={styles.imageTitle}>{photo.caption}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button 
            type="button" 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next photos"
          >
            ›
          </button>
        </div>

        {/* Carousel Indicators (Dots or Text Progress Bar) */}
        {GALLERY_PHOTOS.length <= 12 ? (
          <div className={styles.indicators}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            ))}
          </div>
        ) : (
          <div className={styles.textIndicator}>
            <div className={styles.progressLineContainer}>
              <div 
                className={styles.progressLineBar} 
                style={{ width: `${((currentIndex + itemsPerView) / GALLERY_PHOTOS.length) * 100}%` }}
              />
            </div>
            <span className={styles.indicatorText}>
              Viewing {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, GALLERY_PHOTOS.length)} of {GALLERY_PHOTOS.length} Photos
            </span>
          </div>
        )}


        {/* View Gallery Link */}
        <div className={styles.galleryCTA} data-reveal="up" data-delay="150">
          <Link href="/gallery" className="btn btn-secondary">
            🖼️ View Full Photo &amp; Video Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
