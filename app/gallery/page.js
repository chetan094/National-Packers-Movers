import Link from 'next/link';
import styles from './page.module.css';
import GalleryGrid from '@/components/GalleryGrid/GalleryGrid';
import VideoShowcase from '@/components/VideoShowcase/VideoShowcase';

export const metadata = {
  title: 'Gallery — Shifting Videos & Operations Photos | National Packers & Movers',
  description: 'View real operational photos and customer video testimonials of National Packers & Movers. High-quality bubble wrapping, container trucks, and office moving guides.',
  keywords: 'packers movers photos, packers movers videos, shifting pictures, national packers gallery',
};

export default function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">Media Hub</span>
          <h1 className={styles.heroTitle}>
            National <span>Gallery</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Browse actual operational photos and watch video showcases of our packing, transit, and unpacking services.
          </p>
        </div>
      </section>

      {/* ── PHOTO GALLERY SECTION ────────────────────────── */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Photo Showcase</span>
            <h2 className="section-title">Operations <span>Photos</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Browse our comprehensive gallery of actual operational photos showcasing our professional packing standards, secure closed-container logistics, and dedicated shifting crew. Click any image to view National Packers & Movers' commitment to quality relocation services.
            </p>
          </div>

          <GalleryGrid />
        </div>
      </section>

      {/* ── VIDEO GALLERY SECTION ────────────────────────── */}
      <section className="section bg-section-dark">
        <div className="container">
          <VideoShowcase />
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`} data-reveal="up">
          <h2 className={styles.ctaTitle}>Ready to Book Your Relocation?</h2>
          <p className={styles.ctaSubtitle}>
            Our surveyor can visit your home physically or coordinate a video call assessment for a direct quote.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 Call HQ — 9835168368
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
