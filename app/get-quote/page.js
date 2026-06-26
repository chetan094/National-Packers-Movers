import styles from './page.module.css';
import QuoteWizard from '@/components/QuoteWizard/QuoteWizard';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/get-quote';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Get Free Shifting Quote — Shifting Charges | National Packers & Movers';
  const description = custom?.meta_description || 'Request a free, transparent shifting quote from National Packers & Movers. High-quality packing, safe loading, and IBA-approved corporate billing. Response within 2 hours.';
  const keywords = custom?.meta_keywords || 'packers movers quote, packers movers calculator, shifting cost estimator, national packers rates';
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

export default function GetQuotePage() {
  return (
    <div className={styles.quotePage}>
      {/* Hero */}
      <div className={styles.quoteHero}>
        <div className={styles.quoteHeroBg} />
        <div className={`${styles.quoteHeroContent} container`}>
          <span className="section-tag">100% Free</span>
          <h1 className={styles.quoteTitle}>Get Your <span>Free Quote</span></h1>
          <p className={styles.quoteSubtitle}>
            Fill in the details below — our team will call you within 2 hours with a transparent, no-obligation quote.
          </p>
          <div className={styles.quoteContacts}>
            <a href="tel:9835168368" className={styles.quotePhone}>📞 9835168368</a>
            <span style={{ color: 'var(--gray-700)' }}>|</span>
            <a href="tel:9934166164" className={styles.quotePhone}>📞 9934166164</a>
          </div>
        </div>
      </div>

      {/* Form Section rendering the client QuoteWizard */}
      <section className={`section ${styles.formSection}`}>
        <QuoteWizard />
      </section>
    </div>
  );
}
