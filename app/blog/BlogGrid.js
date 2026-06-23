'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BlogGrid({ initialBlogs }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define unique categories based on our schema definitions + All
  const categories = ['All', 'Shifting Tips', 'Corporate Guides', 'Corporate & PSU', 'Moving Guides', 'Vehicle Transit', 'Relocation Allowance', 'How To?'];

  const filteredBlogs = selectedCategory === 'All'
    ? initialBlogs
    : initialBlogs.filter(blog => blog.category === selectedCategory);

  // Helper to calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  return (
    <div className={styles.gridSection}>
      {/* Category Tabs */}
      <div className={styles.filterTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📂</div>
          <h3>No articles published in this category yet</h3>
          <p>Check back soon or explore other categories above.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredBlogs.map((blog) => {
            const readTime = calculateReadingTime(blog.content);
            return (
              <article key={blog.id} className={styles.card}>
                <Link href={`/blog/${blog.slug}`} className={styles.cardImageLink}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.hoverOverlay}>
                      <span className={styles.readHoverText}>Read Article ➔</span>
                    </div>
                  </div>
                </Link>
                
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.categoryBadge}>{blog.category}</span>
                    <span className={styles.metaInfo}>
                      ⏱️ {readTime} min read
                    </span>
                  </div>

                  <h2 className={styles.cardTitle}>
                    <Link href={`/blog/${blog.slug}`} className={styles.titleLink}>
                      {blog.title}
                    </Link>
                  </h2>

                  <p className={styles.cardExcerpt}>{blog.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.publishDate}>
                      {new Date(blog.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <Link href={`/blog/${blog.slug}`} className={styles.readMoreBtn}>
                      Read Article <span className={styles.arrow}>➔</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
