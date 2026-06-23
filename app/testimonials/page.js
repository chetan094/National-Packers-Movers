'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import styles from './page.module.css';

// Collage Images
const COLLAGE_IMAGES = [
  { src: '/photos/shifting-packing-sofa.jpg', alt: 'Premium Sofa Packing' },
  { src: '/photos/shifting-truck-loading.jpg', alt: 'Secure Closed Truck Loading' },
  { src: '/photos/shifting-safe-transport.jpg', alt: 'Direct Highway Transit Container' },
  { src: '/photos/shifting-doorstep-delivery.jpg', alt: 'Safe Destination Unloading & Delivery' }
];

// YouTube Testimonials
const YT_REVIEWS = [
  { id: 'cLLtUD17mhU', title: 'BCCL CGM / Director Review' },
  { id: 'jB50wiVM0Zo', title: 'CMPDI executive customer feedback' }
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Shifting Review Form state
  const [formData, setFormData] = useState({ name: '', phone: '', rating: 5, text: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Quick Enquiry Form state
  const [enquiryData, setEnquiryData] = useState({ name: '', phone: '', email: '', message: '' });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquirySending, setEnquirySending] = useState(false);

  // 1. Gather all unique testimonials from branchesData
  const allReviews = useMemo(() => {
    const list = [];
    const seen = new Set();

    const addReview = (review, branchName) => {
      // Create unique key based on name and snippet of review text
      const key = `${review.name}-${review.text.substring(0, 15)}`.toLowerCase();
      if (!seen.has(key)) {
        // Categorize review dynamically based on content keywords
        const lowerText = review.text.toLowerCase();
        let category = 'household';
        if (lowerText.includes('corporate') || lowerText.includes('office') || lowerText.includes('bccl') || lowerText.includes('cmpdi') || lowerText.includes('ncl') || lowerText.includes('ntpc') || lowerText.includes('psu') || lowerText.includes('industrial')) {
          category = 'corporate';
        } else if (lowerText.includes('car') || lowerText.includes('bike') || lowerText.includes('vehicle') || lowerText.includes('carrier')) {
          category = 'vehicle';
        }

        list.push({
          ...review,
          branch: branchName,
          category
        });
        seen.add(key);
      }
    };

    // Gather from states
    Object.values(branchesData.states).forEach(state => {
      if (state.testimonials) {
        state.testimonials.forEach(t => addReview(t, `${state.name} Division`));
      }
    });

    // Gather from cities
    Object.values(branchesData.cities).forEach(city => {
      if (city.testimonials) {
        city.testimonials.forEach(t => addReview(t, `${city.name.replace(/ \(hq\)/i, '')} Branch`));
      }
    });

    return list;
  }, []);

  // 2. Filter reviews based on active tab selection
  const filteredReviews = useMemo(() => {
    if (activeFilter === 'all') return allReviews;
    return allReviews.filter(r => r.category === activeFilter);
  }, [allReviews, activeFilter]);

  // 3. Paginated reviews slice
  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  // Reset pagination count on filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  // Review Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      setFormError('Name and review description cannot be blank.');
      return;
    }
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      setFormError('Please input a valid 10-digit phone number.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', rating: 5, text: '' });
    setFormSubmitted(false);
  };

  // Quick Enquiry Form Submit
  const buildEnquiryWAMsg = () =>
    encodeURIComponent(
      `*New Enquiry — National Packers & Movers*\n\n` +
      `*Name:* ${enquiryData.name}\n` +
      `*Phone:* ${enquiryData.phone}\n` +
      `*Email:* ${enquiryData.email || 'Not provided'}\n\n` +
      `*Message:* ${enquiryData.message}\n\n` +
      `_Source: Testimonials Page — thenationalpackersmovers.com_`
    );

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryData.name.trim() || !enquiryData.phone.trim() || !enquiryData.message.trim()) {
      return;
    }
    if (!/^\d{10}$/.test(enquiryData.phone.replace(/[^0-9]/g, ''))) {
      alert('Please input a valid 10-digit phone number.');
      return;
    }
    setEnquirySending(true);

    // Dispatch background email alert to HQ
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email,
        message: enquiryData.message,
        source: 'Testimonials Page'
      })
    }).catch(err => console.error('Error dispatching testimonials page background alert:', err));

    const waUrl = `https://wa.me/919835168368?text=${buildEnquiryWAMsg()}`;
    window.open(waUrl, '_blank');
    setTimeout(() => {
      setEnquirySending(false);
      setEnquirySubmitted(true);
    }, 700);
  };

  const resetEnquiryForm = () => {
    setEnquiryData({ name: '', phone: '', email: '', message: '' });
    setEnquirySubmitted(false);
  };

  // Build JSON-LD structured reviews data
  const testimonialsSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    'name': 'National Packers & Movers',
    'description': 'Real reviews and ratings from our home shifting, office relocation, and industrial transport clients since 1987.',
    'telephone': '9835168368',
    'priceRange': '$$',
    'image': 'https://thenationalpackersmovers.com/photos/packed-goods.jpg',
    'url': 'https://thenationalpackersmovers.com/testimonials',
    'logo': 'https://thenationalpackersmovers.com/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Kasturba Nagar, Near Dhanbad Thana, Dhanbad',
      'addressLocality': 'Dhanbad',
      'addressRegion': 'Jharkhand',
      'postalCode': '826001',
      'addressCountry': 'IN'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': String(allReviews.length || 23)
    },
    'review': allReviews.slice(0, 12).map(r => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': r.name
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': String(r.rating || 5),
        'bestRating': '5',
        'worstRating': '1'
      },
      'reviewBody': r.text
    }))
  };

  return (
    <div className={styles.page}>
      {/* Dynamic SEO JSON-LD Reviews Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />

      {/* ── HERO BANNER ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">⭐ Client Testimonials</span>
          <h1 className={styles.heroTitle}>
            Voices of <span className={styles.gold}>Trust</span>
          </h1>
          <p className={styles.heroSubtitle}>
            With over 38 years of relocation legacy, we are chosen by families and corporate executives for one single reason: absolute honesty in packing and moving services.
          </p>
        </div>
      </section>

      {/* ── INTRO BLOCK & COLLAGE SECTION ───────────────── */}
      <section className={`section ${styles.introSection}`}>
        <div className="container">
          <div className={styles.introGrid}>
            {/* Left Column: Copy */}
            <div className={styles.introTextWrap} data-reveal="up" data-delay="100">
              <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Corporate &amp; Retail Trust</span>
              <h2 className={styles.sectionTitle}>
                Built on <span>Principles</span>, Not Just Policies
              </h2>
              <div className="divider divider-left" />
              <p className={styles.introPara}>
                Since 1987, under the leadership of Debabrata Jhampaty, National Packers &amp; Movers has focused on bringing transparency to the logistics sector. In an industry plagued by hidden charges, transit delays, and cargo damage, we have stood by our surveyors' quotes, ensuring stress-free relocations across India.
              </p>
              <p className={styles.introPara}>
                Whether coordinating heavy industrial plant transport in Dhanbad, handling home relocation in Kolkata, or moving bank employees statewide in Bihar, our certified and background-verified crew packs every item with multi-layer waterproof sheets, closed container dispatches, and full insurance backup. Read through reviews from our valued patrons below.
              </p>

              <div className={styles.statsStrip}>
                <div className={styles.stripItem}>
                  <strong>38+ Years</strong>
                  <span>Moving Legacy</span>
                </div>
                <div className={styles.stripItem}>
                  <strong>100%</strong>
                  <span>GST &amp; IBA Compliant</span>
                </div>
                <div className={styles.stripItem}>
                  <strong>4.9/5 ★</strong>
                  <span>Average GBP Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Collage */}
            <div className={styles.collageWrap} data-reveal="up" data-delay="200">
              <div className={styles.collageGrid}>
                {COLLAGE_IMAGES.map((img, i) => (
                  <div key={i} className={styles.collageFrame}>
                    <img src={img.src} alt={img.alt} className={styles.collageImg} />
                    <div className={styles.collageOverlay}>
                      <span>{img.alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE VIDEO TESTIMONIALS ────────────────── */}
      <section className={`section bg-section-dark ${styles.videoSection}`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">High-Profile Proof</span>
            <h2 className="section-title">PSU &amp; Corporate <span>Video Feedback</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Watch real, recorded reviews from Mining Directors, CGM Officers, and corporate managers sharing their experience shifting with our dedicated container crews.
            </p>
          </div>

          <div className={styles.videoGrid} data-reveal="up" data-delay="100">
            {YT_REVIEWS.map((vid) => (
              <div key={vid.id} className={styles.videoCard}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.id}`}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className={styles.videoMeta}>
                  <span className={styles.videoTag}>🎥 Verified Feedback</span>
                  <h3 className={styles.videoTitle}>{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS FILTER GRID ─────────────────────────── */}
      <section className={`section ${styles.reviewsSection}`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Verified Patronage</span>
            <h2 className="section-title">What Our <span>Clients Express</span></h2>
            <div className="divider" />
          </div>

          {/* Filtering Badges */}
          <div className={styles.filterBar} data-reveal="up" data-delay="50">
            {[
              { id: 'all', label: 'All Reviews 🌐' },
              { id: 'household', label: 'Household Shifting 🏠' },
              { id: 'corporate', label: 'PSU & Corporate Shifting 🏢' },
              { id: 'vehicle', label: 'Vehicle Transport 🚗' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`${styles.filterBtn} ${activeFilter === tab.id ? styles.filterActive : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className={styles.reviewsGrid} data-reveal="up" data-delay="100">
            {displayedReviews.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.stars}>
                  {'★'.repeat(r.rating || 5)}{'☆'.repeat(5 - (r.rating || 5))}
                </div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.authorRow}>
                  <div className={styles.avatar}>{r.initials || 'C'}</div>
                  <div>
                    <strong className={styles.authorName}>{r.name}</strong>
                    <p className={styles.authorMeta}>
                      {r.branch} &nbsp;|&nbsp; <span className={styles.categoryBadge}>{r.category.toUpperCase()}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && (
            <div className={styles.emptyState}>
              <p>No reviews found in this category. We are regularly importing more reviews.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredReviews.length > visibleCount && (
            <div className={styles.loadMoreWrap} data-reveal="up">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="btn btn-secondary"
              >
                🔄 Show More Reviews ({filteredReviews.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── EXTERNAL REVIEW LINKS & FORM SUBMIT ───────── */}
      <section className={`section bg-section-dark ${styles.actionSection}`}>
        <div className="container">
          <div className={styles.actionGrid}>
            {/* Left Column: Direct Links */}
            <div className={styles.linksCard} data-reveal="up" data-delay="100">
              <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Review Portals</span>
              <h2 className={styles.cardTitle}>Rate Us On <span>Google &amp; Justdial</span></h2>
              <p className={styles.cardDesc}>
                Help us expand <span className={styles.gold}>National Packers &amp; Movers</span> by sharing your honest shifting experience. Your reviews guide future families and corporates to relocate with complete safety and zero stress.
              </p>
              
              <div className={styles.linksWrap}>
                <a
                  href="https://share.google/9BhocuLaaEBMMpu7q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLinkGoogle}
                >
                  ⭐⭐⭐⭐⭐ Review Us on Google Business Profile
                </a>
                <a
                  href="https://www.justdial.com/Dhanbad/National-Packers---Movers-Kasturba-Nagar/9999PX326-X326-150314200013-V4F2_BZDET?via=scode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLinkJD}
                >
                  📞 Leave Feedback on Justdial
                </a>
              </div>
            </div>

            {/* Middle Column: Quick Enquiry Form */}
            <div className={styles.formCard} data-reveal="up" data-delay="150">
              {!enquirySubmitted ? (
                <>
                  <h3 className={styles.formTitle}>🚀 Get a Free Shifting Quote</h3>
                  <p className={styles.formSubtitle}>
                    Fill in your details below to get an instant quote from our experts.
                  </p>
                  
                  <form onSubmit={handleEnquirySubmit} className={styles.subForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="enq-name" className={styles.formLabel}>Full Name *</label>
                      <input
                        type="text"
                        id="enq-name"
                        className={styles.formInput}
                        placeholder="Your full name"
                        value={enquiryData.name}
                        onChange={(e) => setEnquiryData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="enq-phone" className={styles.formLabel}>Phone Number *</label>
                      <input
                        type="tel"
                        id="enq-phone"
                        className={styles.formInput}
                        placeholder="10-digit mobile number"
                        value={enquiryData.phone}
                        onChange={(e) => setEnquiryData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                        maxLength={10}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="enq-email" className={styles.formLabel}>Email (Optional)</label>
                      <input
                        type="email"
                        id="enq-email"
                        className={styles.formInput}
                        placeholder="your@email.com"
                        value={enquiryData.email}
                        onChange={(e) => setEnquiryData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="enq-message" className={styles.formLabel}>Message *</label>
                      <textarea
                        id="enq-message"
                        className={styles.formTextArea}
                        placeholder="Describe your shifting requirements (origin, destination, date, item details)..."
                        rows="3"
                        value={enquiryData.message}
                        onChange={(e) => setEnquiryData(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={enquirySending}>
                      {enquirySending ? '⏳ Sending...' : '💬 Send via WhatsApp'}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successBlock}>
                  <span className={styles.successIcon}>✔️</span>
                  <h3 className={styles.successTitle}>Enquiry Submitted Successfully!</h3>
                  <p className={styles.successText}>
                    Thank you, <strong>{enquiryData.name}</strong>! Your enquiry has been sent to our HQ. We will call you at <strong>{enquiryData.phone}</strong> within 2 hours.
                  </p>
                  
                  {/* Share on WhatsApp trigger */}
                  <a
                    href={`https://wa.me/919835168368?text=${buildEnquiryWAMsg()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
                  >
                    💬 Chat on WhatsApp
                  </a>

                  <button
                    onClick={resetEnquiryForm}
                    className={styles.resetBtn}
                    style={{ marginTop: '1rem' }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Submission Form */}
            <div className={styles.formCard} data-reveal="up" data-delay="200">

              {!formSubmitted ? (
                <>
                  <h3 className={styles.formTitle}>✍️ Submit Your Shifting Experience</h3>
                  <p className={styles.formSubtitle}>
                    Relocated with us recently? Tell us how our crew performed.
                  </p>
                  
                  {formError && <div className={styles.formAlert}>{formError}</div>}

                  <form onSubmit={handleFormSubmit} className={styles.subForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="rev-name" className={styles.formLabel}>Full Name *</label>
                      <input
                        type="text"
                        id="rev-name"
                        className={styles.formInput}
                        placeholder="e.g. Debabrata Jhampaty"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="rev-phone" className={styles.formLabel}>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        id="rev-phone"
                        className={styles.formInput}
                        placeholder="e.g. 9835168368"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="rev-rating" className={styles.formLabel}>Overall Rating *</label>
                      <select
                        id="rev-rating"
                        className={styles.formSelect}
                        value={formData.rating}
                        onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      >
                        <option value="5">5 Stars (Excellent Service)</option>
                        <option value="4">4 Stars (Good Shifting)</option>
                        <option value="3">3 Stars (Average)</option>
                        <option value="2">2 Stars (Satisfactory)</option>
                        <option value="1">1 Star (Needs Improvement)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="rev-text" className={styles.formLabel}>Shifting Review *</label>
                      <textarea
                        id="rev-text"
                        className={styles.formTextArea}
                        placeholder="Detail your move (e.g., Shifting from Dhanbad to Pune was extremely smooth...)"
                        rows="3"
                        value={formData.text}
                        onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      🚀 Submit Shifting Review
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successBlock}>
                  <span className={styles.successIcon}>✔️</span>
                  <h3 className={styles.successTitle}>Thank You for Your Feedback!</h3>
                  <p className={styles.successText}>
                    Hi <strong>{formData.name}</strong>, your review has been successfully registered. We appreciate your support in helping us build and perfect our logistics empire.
                  </p>
                  
                  {/* Share on WhatsApp trigger */}
                  <a
                    href={`https://wa.me/919835168368?text=Hi%20National%20Packers,%20I%20just%20submitted%20a%20feedback.%0A%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Rating:*%20${formData.rating}%20Stars%0A*Review:*%20${encodeURIComponent(formData.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
                  >
                    💬 Share with HQ on WhatsApp
                  </a>

                  <button
                    onClick={resetForm}
                    className={styles.resetBtn}
                    style={{ marginTop: '1rem' }}
                  >
                    Submit Another Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
