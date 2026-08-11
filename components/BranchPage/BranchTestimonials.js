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
          {testimonials.map((t, i) => {
            const initials = t.initials || t.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2);
            return (
              <div
                key={i}
                className={`${styles.testimonialCard} ${i === activeTestimonial ? styles.testimonialActive : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div className={styles.stars}>{"⭐".repeat(t.rating || 5)}</div>
                  {t.source === 'justdial' && (
                    <span style={{ fontSize: '0.7rem', background: '#F7B731', color: '#111', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Justdial Verified
                    </span>
                  )}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.authorRow}>
                  <div className={styles.avatar}>{initials}</div>
                  <div>
                    <strong className={styles.authorName}>{t.name}</strong>
                    <p className={styles.authorMeta}>
                      {t.source === 'justdial' ? 'Justdial Verified Reviewer' : `${cityName} Branch Client`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
