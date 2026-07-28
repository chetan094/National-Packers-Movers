'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/page.module.css';

const heroSlides = [
  { src: '/images/hero-ops-1.png', alt: 'National Packers & Movers — Professional Packing Shifting' },
  { src: '/images/hero-ops-2.png', alt: 'National Packers & Movers — Closed Container Truck Loading' },
  { src: '/images/hero-ops-3.png', alt: 'National Packers & Movers — Secure Car Carrier Transit' },
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className={styles.heroImageSide}>
      <div className={styles.heroPhotoWrapper}>
        {heroSlides.map((slide, idx) => (
          <Image
            key={idx}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              opacity: idx === activeSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}
        <div className={styles.heroPhotoOverlay} />
        <div className={styles.heroBadgeFloat}>
          <span className={styles.heroBadgeNum}>38+</span>
          <span className={styles.heroBadgeTxt}>Years of<br/>Trust</span>
        </div>
      </div>
    </div>
  );
}

