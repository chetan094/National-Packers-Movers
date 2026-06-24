'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const PHOTOS = [
  // Page 1 (0-7)
  {
    src: '/photos/shifting-packing-sofa.jpg',
    alt: 'Multi-Layer Cushion Packing for Sofa Relocation',
    title: 'Premium Cushion Sofa Wrapping',
    desc: 'Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap and robust outer cardboard sheets.'
  },
  {
    src: '/photos/shifting-truck-loading.jpg',
    alt: 'Loading Cargo Safely Into Closed Container Truck',
    title: 'Safe Container Vehicle Loading',
    desc: 'Stacking cartons and wrapped household items securely inside our lockable, weather-proof container vehicles.'
  },
  {
    src: '/photos/shifting-office-move.jpg',
    alt: 'Office Relocation Desks and Computers Logistics',
    title: 'Seamless Corporate Office Shifting',
    desc: 'PSU and bank employee cabins, computer servers, and office desks carefully boxed and cataloged for transit.'
  },
  {
    src: '/photos/shifting-car-carrier.jpg',
    alt: 'Secure Vehicle Relocation onto Multi-Car Carrier',
    title: 'Safe Car Carrier Shifting',
    desc: 'Loading family cars and luxury vehicles onto specialized double-deck carrier trucks for damage-free highway transit.'
  },
  {
    src: '/photos/shifting-warehouse-racks.jpg',
    alt: 'Secure and Clean Racking Systems for Warehouse Storage',
    title: 'Palletized Storage & Warehousing',
    desc: 'Clean, insect-free storage facility at our headquarters with strict inventory tracking and 24/7 security watch.'
  },
  {
    src: '/photos/shifting-packaging-boxes.jpg',
    alt: 'Waterproof Wrap Packaged Shifting Carton Boxes',
    title: 'Waterproof Cardboard Packaging',
    desc: 'Heavy-duty shifting boxes wrapped in waterproof stretch wrap to protect valuables against highway dust and monsoon rains.'
  },
  {
    src: '/photos/shifting-kitchen-wrapping.jpg',
    alt: 'Wrapping Delicate Glassware and China Kitchenware',
    title: 'Fragile Kitchenware Wrapping',
    desc: 'Delicate kitchen glass sets and bone china plates wrapped individually in foam sheets and packed in double-wall boxes.'
  },
  {
    src: '/photos/shifting-furniture-reassembly.jpg',
    alt: 'Professional Assembly of Double Bed at Destination House',
    title: 'Destination Bed Reassembly',
    desc: 'Unpacking and placing heavy items exactly where you direct, including the safe reassembly of beds, tables, and cabinets.'
  },
  
  // Page 2 (8-15)
  {
    src: '/photos/shifting-team-loading.jpg',
    alt: 'Shifting Crew Loading Furniture',
    title: 'Team Loading Operations',
    desc: 'Professional loaders carefully handling heavy domestic appliances and furniture onto our direct shipping carriers.'
  },
  {
    src: '/photos/shifting-crew-uniform.jpg',
    alt: 'National Packers Shifting Crew Uniform',
    title: 'Uniform Packing Crew',
    desc: 'Our staff dressed in official corporate uniforms, demonstrating organization, background checks, and reliability.'
  },
  {
    src: '/photos/shifting-truck-side.jpg',
    alt: 'Closed Container Truck Side View',
    title: 'GPS-Tracked Container Fleet',
    desc: 'Our own logistics fleet consisting of lockable, closed-container trucks driving direct routes across states with zero midway transfers.'
  },
  {
    src: '/photos/shifting-heavy-furniture.jpg',
    alt: 'Heavy Wardrobe and Bed Assembly and Packing',
    title: 'Heavy Furniture Shifting',
    desc: 'Experienced crews using specialized belts and corner guards to carry heavy wooden wardrobes and double beds safely down stairs.'
  },
  {
    src: '/photos/shifting-safe-transport.jpg',
    alt: 'Goods Stained and Stacked inside Container Truck',
    title: 'Secure Cargo Stacking Layout',
    desc: 'Interlocking packing methods inside the truck container to eliminate item movements and friction during highway transit.'
  },
  {
    src: '/photos/shifting-double-packing.jpg',
    alt: 'Crews Packing Goods in Double-Layer Bubble Wrap',
    title: 'Dual-Layer Bubble Wrapping',
    desc: 'Wrapping fragile electronics, LED TVs, and delicate mirrors using thick bubble wrap followed by high-density stretch wrapping.'
  },
  {
    src: '/photos/shifting-apartment-shift.jpg',
    alt: 'Local Apartment Move Packing Layout',
    title: 'Apartment Residential Relocation',
    desc: 'Local shifting services executing complete door-to-door residential relocations in Ranchi, Dhanbad, and Patna.'
  },
  {
    src: '/photos/shifting-doorstep-delivery.jpg',
    alt: 'Doorstep Delivery and Placement Operations',
    title: 'Doorstep Unloading & Setup',
    desc: 'Our local supervisors cross-checking the item checklist during doorstep unloading and setting up large items in their designated rooms.'
  },

  // Extra Photos (16-49)
  {
    src: '/photos/bike-packing.jpg',
    alt: 'Two-Wheeler Packing and Shipping',
    title: 'Bike Relocation Packing',
    desc: 'Professional two-wheeler packing using multi-layer bubble wrapping and customized cargo carrier transit.'
  },
  {
    src: '/photos/img-20230911-wa0002.jpg',
    alt: 'National Packers & Movers Transport Vehicles',
    title: 'National Logistics Transit',
    desc: 'Our transport vehicles loaded and ready for safe highway dispatch from our branch office.'
  },
  {
    src: '/photos/img-20231005-wa0049.jpg',
    alt: 'National Packers Shifting Operations',
    title: 'National Packing Operations',
    desc: 'Experienced shifting crews wrapping domestic assets using heavy-duty stretch wraps and cartons.'
  },
  {
    src: '/photos/img-20250121-wa0024.jpg',
    alt: 'Household Shifting Packing Standards',
    title: 'Relocation Packing Standards',
    desc: 'Standardized wrapping layouts for home furniture and delicate electronics before transit loading.'
  },
  {
    src: '/photos/img-20250121-wa0031.jpg',
    alt: 'National Packers Cargo Dispatch',
    title: 'Cargo Loading & Dispatch',
    desc: 'Carefully stacking boxes inside container trucks to ensure zero movement and damage-free transit.'
  },
  {
    src: '/photos/img-20250121-wa0033.jpg',
    alt: 'Closed Container Logistics Fleet',
    title: 'Container Loading Process',
    desc: 'Locked container loading at our transit terminal ensuring maximum safety for long-distance relocations.'
  },
  {
    src: '/photos/img-20250121-wa0035.jpg',
    alt: 'Secure Packaging of Valuables',
    title: 'Multi-Layer Packing Process',
    desc: 'Wrapping fragile kitchenware, chinaware, and electronics in dynamic thick cushion rolls.'
  },
  {
    src: '/photos/img-20250121-wa0036.jpg',
    alt: 'Transit Logistics Operations',
    title: 'Goods Dispatch Transit',
    desc: 'Supervising direct interstate vehicle transit dispatch matching high-end safety guidelines.'
  },
  {
    src: '/photos/img-20250714-wa0024.jpg',
    alt: 'National Packers Team in Action',
    title: 'National Shifting Crew',
    desc: 'Uniformed, trained logistics staff handling large domestic items safely down residential floors.'
  },
  {
    src: '/photos/img-20250714-wa0025.jpg',
    alt: 'Securing Cargo for Transit',
    title: 'Secure Shifting Operations',
    desc: 'Using high-strength tie-down straps inside closed truck containers to protect furniture corners.'
  },
  {
    src: '/photos/img-20250717-wa0018.jpg',
    alt: 'Direct Shipping Container Operations',
    title: 'Direct Container Loading',
    desc: 'Stacking goods systematically with heavy items at the base and lighter boxes on top.'
  },
  {
    src: '/photos/img-20250725-wa0015.jpg',
    alt: 'National Shifting Crews Packing Cargo',
    title: 'Household Goods Packing',
    desc: 'Multi-layered bubble wrapping on electrical appliances for maximum protection during transit.'
  },
  {
    src: '/photos/img-20250806-wa0009.jpg',
    alt: 'GPS Tracked Moving Vehicles',
    title: 'Direct Route Dispatch',
    desc: 'National Packers container carrier fleet ready for immediate direct transport across states.'
  },
  {
    src: '/photos/img-20250807-wa0027.jpg',
    alt: 'Transit Operations and Safe Delivery',
    title: 'Doorstep Relocation Setup',
    desc: 'Offloading household items and setting them up in the customer\'s new home.'
  },
  {
    src: '/photos/img-20251118-wa0029.jpg',
    alt: 'National Packers Packing Materials',
    title: 'Premium Wrapping Materials',
    desc: 'Heavy-duty cardboard boxes, high-density bubble wrap, stretch films, and customized sealing tapes.'
  },
  {
    src: '/photos/img-20251231-wa0020.jpg',
    alt: 'Household Storage and Cargo Warehousing',
    title: 'Safe Warehousing Facilities',
    desc: 'Clean, secure, insect-free storage facility at our headquarters with strict inventory controls.'
  },
  {
    src: '/photos/img-20260309-wa0012.jpg',
    alt: 'Loading Cargo Safely Into Container Fleet',
    title: 'GPS Cargo Container Fleet',
    desc: 'Our proprietary container trucks dispatching directly with no transshipment or intermediate handling.'
  },
  {
    src: '/photos/img-20260309-wa0013.jpg',
    alt: 'National Packing Teams Wrapping Furniture',
    title: 'Furniture Wrapping Process',
    desc: 'Wrapping double beds, wardrobes, and cabinets with thick foam sheets and heavy outer cardboard.'
  },
  {
    src: '/photos/img-20260309-wa0018.jpg',
    alt: 'Stacking Cargo Safely for Highway Transit',
    title: 'Highway Transit Stacking',
    desc: 'Securing household items in interlocking layouts to eliminate vibrations and road bumps damage.'
  },
  {
    src: '/photos/img-20260309-wa0025.jpg',
    alt: 'Relocation Services and Delivery Operations',
    title: 'Doorstep Offloading Crew',
    desc: 'Our supervisors cross-checking items off the inventory list during unloading.'
  },
  {
    src: '/photos/img-20260309-wa0028.jpg',
    alt: 'Bubble Wrap Cushioned Shifting Box',
    title: 'Heavy Duty Box Wrapping',
    desc: 'Heavy-duty boxes wrapped with thick shrink wrap to prevent dust and water damage.'
  },
  {
    src: '/photos/img-20260309-wa0030.jpg',
    alt: 'National Shifting and Moving Services',
    title: 'National Relocation Services',
    desc: 'Comprehensive door-to-door shifting solutions tailored for families and corporate employees.'
  },
  {
    src: '/photos/img20260222143558.jpg',
    alt: 'National Packers Warehousing Facility',
    title: 'Palletized Storage System',
    desc: 'Staging areas inside our clean warehouse designed to support temporary cargo holding.'
  },
  {
    src: '/photos/img20260222144818_01.jpg',
    alt: 'Secure Storage Racks and Vaults',
    title: 'Secure Warehouse Racking',
    desc: 'Industrial heavy-duty racks holding locked inventory pallets under 24/7 security watch.'
  },
  {
    src: '/photos/img20260222160629.jpg',
    alt: 'Household Relocation Logistics Operations',
    title: 'National Cargo Operations',
    desc: 'Staging and organizing boxes inside our storage hub before direct route transit dispatch.'
  },
  {
    src: '/photos/img20260411150250.jpg',
    alt: 'Direct Loading Cargo into Container Trucks',
    title: 'Highway Container Loading',
    desc: 'Stacking cargo into our container fleets safely under supervisor verification.'
  },
  {
    src: '/photos/img20260411151841.jpg',
    alt: 'Uniform Logistics Staff dispatching Cargo',
    title: 'National Dispatch Teams',
    desc: 'Dispatch crews coordinating transits, checking transport documents, and tracking container transits.'
  },
  {
    src: '/photos/img20260411152042.jpg',
    alt: 'Transit Logistics and Relocation Operations',
    title: 'Interstate Cargo Relocation',
    desc: 'Heavy cargo containers carrying household and corporate consignments across cities.'
  },
  {
    src: '/photos/img20260428145155.jpg',
    alt: 'National Packers Shifting Truck Fleet',
    title: 'GPS Shifting Fleet',
    desc: 'Our company-owned fleet parked at our primary corporate shipping terminal.'
  },
  {
    src: '/photos/img20260428204927.jpg',
    alt: 'Direct Shifting Transit across States',
    title: 'Direct Interstate Shipping',
    desc: 'National Packers closed container fleet in route on major highways for express deliveries.'
  },
  {
    src: '/photos/img_20260322_124603.jpg',
    alt: 'National Packers Shifting Operations',
    title: 'Safe Packaging Process',
    desc: 'Using double-wall cardboard sheets and heavy-duty tape wrapping for appliances.'
  },
  {
    src: '/photos/img_9473.jpg',
    alt: 'National Logistics Crew loading goods',
    title: 'Loading Cargo Operations',
    desc: 'Systematically stacking household packages in container vehicles to prevent transit friction.'
  },
  {
    src: '/photos/whatsapp-image-2023-09-12-at-16.40.34.jpg',
    alt: 'Safe Packing for Family Vehicle',
    title: 'Secure Vehicle Carrier',
    desc: 'Specialized vehicle carrier operations loading cars damage-free with secure wheel clamps.'
  },
  {
    src: '/photos/whatsapp-image-2025-11-22-at-09.09.14_f0cbaab8.jpg',
    alt: 'Multi-layer Wrapping for Electronic Goods',
    title: 'Fragile Packing Standards',
    desc: 'Using heavy-duty bubble wrap layers followed by secure tape seals on LED TVs and monitors.'
  }
];

const ALL_VIDEOS = [
  {
    id: 'UlTW1ymxgZE',
    title: 'National Packers & Movers | Premium Packing & Loading Experience 🚚',
    desc: 'Watch our professional packing crew demonstrate our multi-layer cushioning and safe loading standards.',
    isShort: false
  },
  {
    id: '5Xx1bl4o4l4',
    title: 'BCCL CGM Mining Customer Feedback | National Packers & Movers',
    desc: 'Mr. Sudhir Kumar Jha, Chief General Manager (CGM) of Mining at BCCL, sharing his professional feedback on our corporate shifting services.',
    isShort: false
  },
  {
    id: '6L9jOLU6_n0',
    title: "India's Best Packers & Movers Annual Meet 2023",
    desc: 'Highlights and celebrations from the National Business Meet 2023 of National Packers & Movers.',
    isShort: false
  },
  {
    id: '2nxLmjmabLQ',
    title: 'Varanasi to Bangalore Relocation Transit',
    desc: 'Operational overview of our long-distance closed container transit delivering household assets from Varanasi to Bangalore.',
    isShort: false
  },
  {
    id: '_f8aCBXBSks',
    title: 'National Annual Business Meet 2023 Highlights',
    desc: 'Key insights, performance milestones, and future outlook discussions from our annual organizational meeting.',
    isShort: false
  },
  {
    id: 'nqJgNCf5g8o',
    title: 'Relocation of Sri Arjun Kumar (DG of Mine Safety Dhanbad)',
    desc: 'National Packers & Movers managing the high-profile relocation from Dhanbad to Bilaspur for the Director General of Mine Safety.',
    isShort: false
  },
  {
    id: 'cLLtUD17mhU',
    title: 'BCCL Director Review | Corporate Relocation',
    desc: 'Feedback on our corporate and executive relocation services from Mr. P.V.K.R. Mallikarjuna Rao, Director Personnel of BCCL Dhanbad.',
    isShort: false
  },
  {
    id: 'Uoaf7g_QNjQ',
    title: 'Ultimate Waterproof Packaging for Safe Shifting',
    desc: 'Watch our packing team wrap shifting cartons with heavy-duty waterproof stretch wrap for safe highway travel.',
    isShort: true
  },
  {
    id: 'jB50wiVM0Zo',
    title: 'CMPDI Director Review | Corporate Relocation',
    desc: 'Testimonial and review from the CMPDI Director regarding our premium corporate relocation services.',
    isShort: true
  },
  {
    id: '8gkUJMFlabo',
    title: 'Premium 3-Layer Packing Standards',
    desc: 'Demonstration of our premium 3-layer packaging designed for high-value domestic assets and fragile goods.',
    isShort: true
  },
  {
    id: '0kOpdtm8pdY',
    title: "India's Premium Packers & Movers | Double-Layer Safe Packing",
    desc: 'High-standard packing process trusted by officers of Coal India and Indian Oil (IOCL).',
    isShort: true
  },
  {
    id: 'qR8kvdWFgZo',
    title: 'Kolkata Relocation | Coal India Chairman Move',
    desc: 'Providing top-notch relocation services in Kolkata for the Chairman of Coal India.',
    isShort: true
  },
  {
    id: 'S6qv4NcmD0E',
    title: 'Genuine Customer Review & Feedback',
    desc: "Real and raw client feedback highlighting our team's behavior, transparency, and care during shifting.",
    isShort: true
  },
  {
    id: '17QDn-extu8',
    title: 'National Packers & Movers Overview',
    desc: 'A brief introductory look into our logistics infrastructure and premium door-to-door shifting services.',
    isShort: true
  }
];

export default function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [gridPage, setGridPage] = useState(0); 
  const [shuffledVideos, setShuffledVideos] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleShuffle = () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setShuffledVideos(shuffleArray(ALL_VIDEOS).slice(0, 4));
  };

  useEffect(() => {
    setIsMounted(true);
    handleShuffle();
  }, []);

  const totalPages = Math.ceil(PHOTOS.length / 8);

  const handleNextPage = () => {
    setGridPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setGridPage(prev => Math.max(prev - 1, 0));
  };

  const pages = Array.from({ length: totalPages }, (_, i) =>
    PHOTOS.slice(i * 8, (i + 1) * 8)
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhoto === null) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') {
        setActivePhoto(prev => (prev + 1) % PHOTOS.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhoto(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  return (
    <div className={styles.galleryPage}>
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
              Browse our comprehensive gallery of actual operational photos showcasing our professional packing standards, secure closed-container logistics, and dedicated shifting crew. Click any image to view National Packers & Movers' commitment to quality relocation services.
            </p>
          </div>

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
                          onClick={() => setActivePhoto(globalIndex)}
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

        </div>
      </section>

      {/* ── VIDEO GALLERY SECTION ────────────────────────── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Video Showcase</span>
            <h2 className="section-title">Video <span>Demonstrations</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Watch our team in action. Playable videos showing our packing benchmarks and customer reviews.
            </p>
            <button 
              type="button" 
              className={styles.shuffleBtn} 
              onClick={handleShuffle} 
              aria-label="Shuffle videos"
            >
              <svg className={styles.shuffleIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Shuffle Showcase
            </button>
          </div>

          <div className={styles.videoGrid}>
            {!isMounted ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonVideo} />
                  <div className={styles.skeletonMeta}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonDesc} />
                    <div className={styles.skeletonDescSecond} />
                  </div>
                </div>
              ))
            ) : (
              shuffledVideos.map((video, index) => (
                <div 
                  key={`${video.id}-${index}`} 
                  className={styles.videoCard}
                  data-reveal="up"
                  data-delay={index * 100}
                >
                  <div className={styles.videoWrapper}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.videoCardMeta}>
                    <h4 className={styles.videoCardTitle}>{video.title}</h4>
                    <p className={styles.videoCardDesc}>{video.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
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

      {/* ── LIGHTBOX MODAL OVERLAY ────────────────────────── */}
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
              setActivePhoto(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={PHOTOS[activePhoto].src} 
              alt={PHOTOS[activePhoto].alt} 
              className={styles.lightboxImg}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.classList.add(styles.lightboxFallback);
              }}
            />
            <div className={styles.lightboxFallbackText}>
              📸 Placeholder: {PHOTOS[activePhoto].title}
            </div>
            <div className={styles.lightboxMeta}>
              <h3 className={styles.lightboxTitle}>{PHOTOS[activePhoto].title}</h3>
              <p className={styles.lightboxDesc}>{PHOTOS[activePhoto].desc}</p>
            </div>
          </div>

          <button 
            type="button" 
            className={`${styles.arrowBtn} ${styles.rightArrow}`} 
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto(prev => (prev + 1) % PHOTOS.length);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
