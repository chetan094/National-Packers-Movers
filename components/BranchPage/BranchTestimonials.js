'use client';
import { useState, useEffect } from 'react';
import styles from './BranchPage.module.css';

export default function BranchTestimonials({ testimonials, cityName }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    setActiveTestimonial(0);
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

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
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.authorRow}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <strong className={styles.authorName}>{t.name}</strong>
                  <p className={styles.authorMeta}>{cityName} Branch Client</p>
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

      {testimonials.length > 1 && (
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
      )}
    </>
  );
}
