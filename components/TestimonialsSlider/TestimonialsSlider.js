'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/page.module.css';

const testimonials = [
  {
    name: 'Vinod Ram',
    city: 'Dhanbad to Singrauli (Interstate)',
    service: 'Household Shifting',
    rating: 5,
    text: 'Amazing service by National Packers and Movers. They provided fast loading, safe packing and transit for me. I shifted from Dhanbad to Singrauli. I strongly recommend this packers for safe relocation across states.',
    initials: 'VR',
  },
  {
    name: 'Aniket Kumar',
    city: 'Patna to Delhi (National Shifting)',
    service: 'Household Relocation',
    rating: 5,
    text: 'I recently used National Packers & Movers for my relocation from Patna to Delhi, and I couldn\'t be more impressed! Their team was punctual, professional, and handled my belongings with utmost care. Best packers and movers in Patna.',
    initials: 'AK',
  },
  {
    name: 'Harman',
    city: 'Kolkata to Chennai (South Transit)',
    service: 'Household Relocation',
    rating: 5,
    text: 'I recently used National Packers & Movers for my relocation from Salt Lake, Kolkata to Chennai, and I couldn\'t be happier! Exceptional response, transparent billing, and stress-free transit.',
    initials: 'H',
  },
];

export default function TestimonialsSlider() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.testimonialsSliderContainer}>
        <button 
          type="button" 
          className={`${styles.sliderArrow} ${styles.prevArrow}`} 
          onClick={handlePrevTestimonial}
          aria-label="Previous review"
        >
          ‹
        </button>

        <div className={styles.testimonialsCarousel}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`${styles.testimonialCard} ${i === activeTestimonial ? styles.testimonialActive : ''}`}
            >
              <div className={styles.testimonialStars}>
                {'⭐'.repeat(t.rating)}
              </div>
              <p className={styles.testimonialText}>&quot;{t.text}&quot;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialMeta}>{t.city} — {t.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          type="button" 
          className={`${styles.sliderArrow} ${styles.nextArrow}`} 
          onClick={handleNextTestimonial}
          aria-label="Next review"
        >
          ›
        </button>
      </div>
      
      <div className={styles.testimonialDots}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ''}`}
            onClick={() => setActiveTestimonial(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
