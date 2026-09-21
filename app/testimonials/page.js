import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import styles from './page.module.css';
import TestimonialsFeed from '@/components/TestimonialsFeed/TestimonialsFeed';
import TestimonialsForms from '@/components/TestimonialsForms/TestimonialsForms';
import YouTubePlayer from '@/components/YouTubePlayer/YouTubePlayer';
import { getCustomMetadata, getCustomerReviews } from '@/lib/supabase';

// Collage Images
const COLLAGE_IMAGES = [
  { src: '/photos/premium-cushion-sofa-wrapping.jpg', alt: 'Premium Sofa Packing' },
  { src: '/photos/safe-container-vehicle-loading.jpg', alt: 'Secure Closed Truck Loading' },
  { src: '/photos/secure-cargo-stacking-layout.jpg', alt: 'Direct Highway Transit Container' },
  { src: '/photos/doorstep-unloading-setup.jpg', alt: 'Safe Destination Unloading & Delivery' }
];

// YouTube Testimonials
const YT_REVIEWS = [
  { id: 'cLLtUD17mhU', title: 'BCCL CGM / Director Review' },
  { id: 'jB50wiVM0Zo', title: 'CMPDI executive customer feedback' }
];

export async function generateMetadata() {
  const path = '/testimonials';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Client Testimonials — Shifting Reviews & Ratings | National Packers & Movers';
  const description = custom?.meta_description || 'Real reviews and ratings from our home shifting, office relocation, and industrial transport clients. Certified by BCCL, CMPDI, and bank managers since 1987.';
  const keywords = custom?.meta_keywords || 'packers movers reviews, national packers ratings, customer shifting feedback, IBA approved reviews';
  const isNoindex = custom?.is_noindex ?? false;

  return {
    title,
    description,
    keywords,
    robots: {
      index: !isNoindex,
      follow: !isNoindex,
    },
    alternates: {
      canonical: `https://www.thenationalpackersmovers.com${path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.thenationalpackersmovers.com${path}`,
    },
  };
}

export default async function TestimonialsPage() {
  // Fetch live customer reviews submitted via the website
  const dbReviews = await getCustomerReviews({ status: 'approved', limit: 100 });

  // 1. Gather all unique testimonials from branchesData and live database
  const allReviews = (() => {
    const list = [];
    const seen = new Set();

    // Add live reviews from Supabase first
    if (dbReviews && dbReviews.length > 0) {
      dbReviews.forEach(r => {
        const key = `${r.name}-${r.review_text.substring(0, 15)}`.toLowerCase();
        if (!seen.has(key)) {
          const lowerText = r.review_text.toLowerCase();
          let category = 'household';
          if (
            lowerText.includes('corporate') || 
            lowerText.includes('office') || 
            lowerText.includes('bccl') || 
            lowerText.includes('cmpdi') || 
            lowerText.includes('ncl') || 
            lowerText.includes('ntpc') || 
            lowerText.includes('psu') || 
            lowerText.includes('industrial')
          ) {
            category = 'corporate';
          } else if (
            lowerText.includes('car') || 
            lowerText.includes('bike') || 
            lowerText.includes('vehicle') || 
            lowerText.includes('carrier')
          ) {
            category = 'vehicle';
          }

          list.push({
            name: r.name,
            text: r.review_text,
            rating: r.rating,
            branch: `${r.city_name} Branch`,
            source: 'website',
            date: r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Verified Client',
            category
          });
          seen.add(key);
        }
      });
    }

    const addReview = (review, branchName) => {
      const key = `${review.name}-${review.text.substring(0, 15)}`.toLowerCase();
      if (!seen.has(key)) {
        const lowerText = review.text.toLowerCase();
        let category = 'household';
        if (
          lowerText.includes('corporate') || 
          lowerText.includes('office') || 
          lowerText.includes('bccl') || 
          lowerText.includes('cmpdi') || 
          lowerText.includes('ncl') || 
          lowerText.includes('ntpc') || 
          lowerText.includes('psu') || 
          lowerText.includes('industrial')
        ) {
          category = 'corporate';
        } else if (
          lowerText.includes('car') || 
          lowerText.includes('bike') || 
          lowerText.includes('vehicle') || 
          lowerText.includes('carrier')
        ) {
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
  })();

  // Build JSON-LD structured reviews data
  const testimonialsSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    'name': 'National Packers & Movers',
    'description': 'Real reviews and ratings from our home shifting, office relocation, and industrial transport clients since 1987.',
    'telephone': '9835168368',
    'priceRange': '$$',
    'image': 'https://www.thenationalpackersmovers.com/photos/relocation-packing-standards.jpg',
    'url': 'https://www.thenationalpackersmovers.com/testimonials',
    'logo': 'https://www.thenationalpackersmovers.com/logo.png',
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
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#post-review" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
              ✍️ Write a Shifting Review
            </a>
            <a
              href="https://share.google/9BhocuLaaEBMMpu7q"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
            >
              ⭐ Rate on Google
            </a>
          </div>
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
                  <YouTubePlayer videoId={vid.id} title={vid.title} />
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

      {/* ── REVIEWS FILTER GRID (TestimonialsFeed client leaf) ── */}
      <section className={`section ${styles.reviewsSection}`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Verified Patronage</span>
            <h2 className="section-title">What Our <span>Clients Express</span></h2>
            <div className="divider" />
          </div>

          <TestimonialsFeed allReviews={allReviews} />
        </div>
      </section>

      {/* ── EXTERNAL REVIEW LINKS & FORM SUBMIT (TestimonialsForms client leaf) ── */}
      <section className={`section bg-section-dark ${styles.actionSection}`}>
        <div className="container">
          <TestimonialsForms />
        </div>
      </section>
    </div>
  );
}
