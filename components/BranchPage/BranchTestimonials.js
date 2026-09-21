'use client';
import { useState, useEffect } from 'react';
import styles from './BranchPage.module.css';
import ReviewModal from './ReviewModal';

export default function BranchTestimonials({
  testimonials: initialTestimonials,
  cityName,
  stateName = 'Jharkhand',
  stateSlug = 'jharkhand',
  citySlug = 'dhanbad'
}) {
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    setTestimonials(initialTestimonials || []);
  }, [initialTestimonials]);

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

  const handleReviewSubmitted = (newReview) => {
    const formatted = {
      name: newReview.name,
      text: newReview.review_text,
      rating: newReview.rating,
      source: 'website',
      initials: newReview.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setTestimonials(prev => [formatted, ...prev]);
    setActiveTestimonial(0);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setReviewModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.6rem',
            fontSize: '0.98rem',
            boxShadow: '0 4px 20px rgba(247, 183, 49, 0.3)'
          }}
        >
          ⭐ Write a Review for {cityName} Branch
        </button>
      </div>

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
                  {t.source === 'website' && (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(247, 183, 49, 0.2)', color: '#F7B731', border: '1px solid rgba(247, 183, 49, 0.4)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Verified Client
                    </span>
                  )}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.authorRow}>
                  <div className={styles.avatar}>{initials}</div>
                  <div>
                    <strong className={styles.authorName}>{t.name}</strong>
                    <p className={styles.authorMeta}>
                      {t.source === 'justdial' 
                        ? 'Justdial Verified Reviewer' 
                        : t.source === 'website' 
                          ? `${cityName} Client (Website Review)` 
                          : `${cityName} Branch Client`}
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

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        cityName={cityName}
        stateName={stateName}
        stateSlug={stateSlug}
        citySlug={citySlug}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
}

