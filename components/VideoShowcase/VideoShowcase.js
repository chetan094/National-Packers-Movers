'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/gallery/page.module.css';

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

export default function VideoShowcase() {
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

  return (
    <>
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
    </>
  );
}
