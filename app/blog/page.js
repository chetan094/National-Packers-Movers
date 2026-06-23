import { getBlogs } from '@/lib/supabase';
import BlogGrid from './BlogGrid';
import styles from './page.module.css';

// Revalidate public blog index listing page every 30s
export const revalidate = 30;

export const metadata = {
  title: 'Logistics Insights & Relocation Guides | National Packers & Movers',
  description: 'Expert advice on corporate and household shifting, vehicle transit, and claiming relocation allowance in India from the leaders in logistics since 1987.',
  keywords: 'packers and movers blog, relocation tips, home shifting guide, office moving allowance, packing tips',
};

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <div className={styles.pageWrapper}>
      {/* Blog Hero Banner */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroInner} container`}>
          <span className={styles.heroLabel}>Expert Insights</span>
          <h1 className={styles.heroTitle}>National Packers & Movers Blog</h1>
          <p className={styles.heroSubtitle}>
            Proven shifting tips, packing blueprints, allowance guides, and B2B logistics strategies from our decades of experience.
          </p>
          <div className={styles.heroDivider}></div>
        </div>
      </section>

      {/* Grid Container */}
      <section className={`${styles.gridContainer} container`}>
        <BlogGrid initialBlogs={blogs} />
      </section>
    </div>
  );
}
