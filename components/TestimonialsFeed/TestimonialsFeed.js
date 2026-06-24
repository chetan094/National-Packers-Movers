'use client';
import { useState, useMemo } from 'react';
import styles from '@/app/testimonials/page.module.css';

export default function TestimonialsFeed({ allReviews }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter reviews based on active tab selection
  const filteredReviews = useMemo(() => {
    if (activeFilter === 'all') return allReviews;
    return allReviews.filter(r => r.category === activeFilter);
  }, [allReviews, activeFilter]);

  // Paginated reviews slice
  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  // Reset pagination count on filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <>
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
            type="button"
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
            type="button"
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="btn btn-secondary"
          >
            🔄 Show More Reviews ({filteredReviews.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
