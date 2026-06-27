import styles from './page.module.css';
import TrackerWidget from '@/components/ShipmentTracker/TrackerWidget';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/track-shipment';
  const custom = await getCustomMetadata(path);
  return {
    title: custom?.meta_title || 'Live Consignment & Shipment Tracker | National Packers & Movers',
    description: custom?.meta_description || 'Track your household, corporate, or vehicle shipment in real-time. Enter your Consignment Note (CN) number to view live transit progress milestones.',
    keywords: custom?.meta_keywords || 'track shipment, consignment tracker, awb tracking, national packers movers tracking, shifting progress'
  };
}

export default function TrackShipmentPage() {
  return (
    <main className={styles.page}>
      {/* ── BREADCRUMB / HERO HEADER ────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid} />
        
        <div className={`${styles.heroContent} container`}>
          <span className={styles.badge}>🛰️ LIVE GPS TRANSIT DESK</span>
          <h1 className={styles.title}>Track Your <span>Shipment</span></h1>
          <p className={styles.subtitle}>
            Enter your Consignment Note (CN) or Booking Number below to track your cargo's live packing, loading, dispatch, and highway transit progress.
          </p>
        </div>
      </section>

      {/* ── INTERACTIVE TRACKER WIDGET ───────────────────────── */}
      <section className={`${styles.trackerSection} section`}>
        <div className="container">
          <TrackerWidget />
        </div>
      </section>

      {/* ── HELP DESK SECTION ───────────────────────────────── */}
      <section className={styles.supportSection}>
        <div className={`${styles.supportCard} container`}>
          <div className={styles.supportGrid}>
            <div className={styles.supportLeft}>
              <h3>Having trouble tracking your consignment?</h3>
              <p>
                Consignment tracking status updates may take up to 2-3 hours to reflect in our systems after departure from intermediate hubs. For priority assistance, please contact our logistics coordinator desk.
              </p>
            </div>
            <div className={styles.supportRight}>
              <a href="tel:9835168368" className={styles.callBtn}>📞 Call Dispatch Desk</a>
              <a 
                href="https://wa.me/9835168368?text=Hello%20National%20Packers%20Movers%2C%20I%20need%20assistance%20tracking%20my%20shipment." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.waBtn}
              >
                💬 WhatsApp Query
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
