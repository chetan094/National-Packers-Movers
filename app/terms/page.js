import styles from './page.module.css';

export const metadata = {
  title: 'Terms of Service — National Packers & Movers | Relocation Contract',
  description: 'Read the terms of service of National Packers & Movers. Learn about our booking terms, transit insurance rules, excluded items, and legal jurisdictions.',
  keywords: 'terms of service packers movers, shifting contract terms, national packers movers rules, moving terms and conditions',
};

export default function TermsOfServicePage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroBg}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroGrid} />
      </div>

      <div className={`${styles.container} container`}>
        <span className="section-tag">Legal Documents</span>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>Last Updated: June 22, 2026</p>
        
        <div className={styles.card}>
          <p className={styles.intro}>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before booking a relocation with National Packers &amp; Movers. By accessing our website, using our volume calculator, requesting quotes, or signing our Consignment Note (Lorry Receipt), you agree to be bound by these Terms.
          </p>

          <div className={styles.section}>
            <h2>1. Definition of Services</h2>
            <p>
              National Packers &amp; Movers provides packing, loading, direct container transportation, unloading, and reassembly services for household goods, corporate offices, vehicles, and industrial cargo across India.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Booking, Quotes, and Final Pricing</h2>
            <ul>
              <li><strong>Surveys &amp; Estimates:</strong> Estimates generated online via our CFT calculator are approximate. Final guaranteed quotes are provided after a physical or virtual survey by our coordinator.</li>
              <li><strong>Price Variables:</strong> The final quote is based on distance, cargo volume, floor levels at origin/destination, lift availability, custom packaging requests, toll taxes, and packing material tiers.</li>
              <li><strong>Unforeseen Labor:</strong> Extra labor charges apply if goods must be manually carried via stairs beyond the 3rd floor at either destination or origin when lift access is unavailable or denied.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Excluded Items (Dangerous &amp; High-Value Goods)</h2>
            <p>We strictly prohibit the carriage of the following items. Customers must manage and carry these personally:</p>
            <ul>
              <li><strong>Valuables:</strong> Gold, cash, silver, precious jewelry, corporate bonds, high-value securities, and property deeds.</li>
              <li><strong>Hazardous Items:</strong> LPG cylinders, fuel containers, acid, explosives, fireworks, paint, and flammable chemicals.</li>
              <li><strong>Contraband:</strong> Illegal drugs, weapons, or any material prohibited under the Indian Carriage by Road Act (2007).</li>
              <li><strong>Perishables:</strong> Liquid food items or dairy products that may spoil in transit.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Transit Insurance &amp; Claims Settlement</h2>
            <ul>
              <li><strong>Mandatory Coverage:</strong> To safeguard your assets, transit insurance is mandatory for all long-distance and inter-state movements.</li>
              <li><strong>Valuation:</strong> The customer must declare the actual value of cargo before packing begins.</li>
              <li><strong>Claim Settlement:</strong> In the event of a highway accident or accidental transit damage, claims will be processed directly via the third-party insurance underwriter. National Packers &amp; Movers does not settle claims directly.</li>
              <li><strong>Mechanical Exclusions:</strong> We are not liable for internal mechanical or electrical failure of appliances (ACs, TVs, Fridges) if no external physical damage is visible on the item or its carton box.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>5. Rescheduling and Cancellation Tiers</h2>
            <ul>
              <li><strong>Notice Window:</strong> Relocations can be rescheduled or cancelled without fee up to 24 hours before the scheduled moving time.</li>
              <li><strong>Late Cancellation:</strong> Rescheduling or cancelling with less than 24 hours notice may attract a mobilization fee (<strong>₹1,500 - ₹5,000</strong> depending on location) to cover packing crew bookings and vehicle reservation costs.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>6. Legal Jurisdiction</h2>
            <p>
              These Terms and all operational contracts are governed under the laws of India. All legal claims, disputes, or actions arising from our services are subject strictly to the courts of <strong>Dhanbad, Jharkhand</strong> (Corporate HQ) and no other jurisdictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
