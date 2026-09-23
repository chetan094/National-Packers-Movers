'use client';

import { useState } from 'react';
import styles from './ReviewModal.module.css';
import { trackEvent } from '@/lib/analytics';
import { ALL_STATES_MAP } from '@/data/allCitiesData';


const RATING_DESCRIPTIONS = {
  5: '5 Stars — Outstanding & Stress-Free',
  4: '4 Stars — Very Good Service',
  3: '3 Stars — Average Experience',
  2: '2 Stars — Satisfactory',
  1: '1 Star — Needs Improvement'
};

export default function ReviewModal({
  isOpen,
  onClose,
  stateSlug = 'jharkhand',
  stateName = 'Jharkhand',
  citySlug = 'dhanbad',
  cityName = 'Dhanbad (HQ)',
  allowLocationSelect = false,
  onReviewSubmitted
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Dynamic location states if allowLocationSelect is true
  const [currStateSlug, setCurrStateSlug] = useState(stateSlug);
  const [currStateName, setCurrStateName] = useState(stateName);
  const [currCitySlug, setCurrCitySlug] = useState(citySlug);
  const [currCityName, setCurrCityName] = useState(cityName);

  if (!isOpen) return null;

  const handleStateChange = (e) => {
    const sSlug = e.target.value;
    const sObj = ALL_STATES_MAP[sSlug] || ALL_STATES_MAP['jharkhand'];
    const firstCity = sObj.cities[0] || { slug: 'dhanbad', name: 'Dhanbad' };
    setCurrStateSlug(sSlug);
    setCurrStateName(sObj.name);
    setCurrCitySlug(firstCity.slug);
    setCurrCityName(firstCity.name);
  };

  const handleCityChange = (e) => {
    const cSlug = e.target.value;
    const sObj = ALL_STATES_MAP[currStateSlug] || ALL_STATES_MAP['jharkhand'];
    const cObj = sObj.cities.find(c => c.slug === cSlug) || { slug: cSlug, name: cSlug };
    setCurrCitySlug(cSlug);
    setCurrCityName(cObj.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMsg('Please write your relocation feedback.');
      return;
    }
    if (phone.trim() && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);
    trackEvent('click', 'branch_review_submit');

    const effectiveStateSlug = allowLocationSelect ? currStateSlug : stateSlug;
    const effectiveStateName = allowLocationSelect ? currStateName : stateName;
    const effectiveCitySlug = allowLocationSelect ? currCitySlug : citySlug;
    const effectiveCityName = allowLocationSelect ? currCityName : cityName;

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null,
        state_slug: effectiveStateSlug,
        state_name: effectiveStateName,
        city_slug: effectiveCitySlug,
        city_name: effectiveCityName,
        rating,
        review_text: reviewText.trim()
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFeedbackMsg(data.message || 'Thank you! Your review has been submitted.');
        if (onReviewSubmitted && data.review) {
          onReviewSubmitted(data.review);
        }
      } else {
        setErrorMsg(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or share on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setReviewText('');
    setRating(5);
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  const activeStar = hoverRating || rating;
  const displayCity = allowLocationSelect ? currCityName : cityName;
  const displayState = allowLocationSelect ? currStateName : stateName;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalCard}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close review modal"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className={styles.header}>
              <div className={styles.badge}>
                {allowLocationSelect ? '⭐ Client Feedback' : '📍 Verified Branch Review'}
              </div>
              <h2 className={styles.title}>
                {allowLocationSelect ? (
                  <>Share Your Relocation <span>Experience</span></>
                ) : (
                  <>Rate Your Move in <span>{cityName}</span></>
                )}
              </h2>
              <p className={styles.subtitle}>
                {allowLocationSelect ? (
                  'Helped by National Packers & Movers? Share your review to guide families and businesses across India.'
                ) : (
                  `Relocated with our ${cityName} team? Help future families and businesses by sharing your honest experience.`
                )}
              </p>
            </div>

            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              {allowLocationSelect ? (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Relocation Branch / Operational Zone *
                  </label>
                  <div className={styles.selectGrid}>
                    <div>
                      <select
                        className={styles.select}
                        value={currStateSlug}
                        onChange={handleStateChange}
                        aria-label="Select State"
                      >
                        {Object.entries(ALL_STATES_MAP).map(([sKey, sVal]) => (
                          <option key={sKey} value={sKey}>
                            {sVal.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className={styles.select}
                        value={currCitySlug}
                        onChange={handleCityChange}
                        aria-label="Select City"
                      >
                        {(ALL_STATES_MAP[currStateSlug]?.cities || []).map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Service Branch
                  </label>
                  <div className={styles.locationPill}>
                    <span className={styles.locationIcon}>🏢</span>
                    <strong>{cityName}, {stateName} Branch (National Packers &amp; Movers)</strong>
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Overall Experience Rating *
                </label>
                <div className={styles.starRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={styles.starBtn}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`${star} Star Rating`}
                    >
                      {star <= activeStar ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className={styles.ratingLabel}>
                    {RATING_DESCRIPTIONS[activeStar]}
                  </span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-modal-name" className={styles.label}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="rev-modal-name"
                  className={styles.input}
                  placeholder="e.g. Debabrata Jhampaty"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-modal-phone" className={styles.label}>
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  id="rev-modal-phone"
                  className={styles.input}
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rev-modal-text" className={styles.label}>
                  Your Shifting Experience *
                </label>
                <textarea
                  id="rev-modal-text"
                  className={styles.textarea}
                  rows="4"
                  placeholder={`Describe your shifting experience with National Packers & Movers in ${displayCity} (packing quality, punctuality, handling of delicate items)...`}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? '⏳ Publishing Review...' : `🚀 Submit Review for ${displayCity}`}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successCard}>
            <span className={styles.successIcon}>🎉</span>
            <h2 className={styles.successTitle}>Review Submitted!</h2>
            <p className={styles.successText}>
              Thank you, <strong>{name}</strong>! Your review for our <strong>{displayCity}, {displayState}</strong> branch has been recorded.
            </p>
            <p className={styles.successText} style={{ color: '#F7B731', fontWeight: '600' }}>
              {feedbackMsg}
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={handleReset}
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
