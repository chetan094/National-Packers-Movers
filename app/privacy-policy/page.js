import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy — National Packers & Movers | Relocation Security',
  description: 'Read the privacy policy of National Packers & Movers. Learn how we collect, protect, and process data for home, office, and vehicle relocation services.',
  keywords: 'privacy policy packers movers, data protection, national packers movers privacy, shifting information security',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroBg}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroGrid} />
      </div>

      <div className={`${styles.container} container`}>
        <span className="section-tag">Legal Documents</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>Last Updated: June 22, 2026</p>
        
        <div className={styles.card}>
          <p className={styles.intro}>
            National Packers &amp; Movers (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is committed to protecting the privacy of our customers, website visitors, and corporate clients. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website (thenationalpackersmovers.com), submit shifting calculator inventories, request quotes, or coordinate relocations through our branch network.
          </p>

          <div className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>To plan and execute your relocation and optimize our digital portal, we collect the following categories of information:</p>
            <ul>
              <li><strong>Contact Details:</strong> Name, phone numbers, and email address.</li>
              <li><strong>Relocation Details:</strong> Moving Origin address, Destination address, and requested shifting date.</li>
              <li><strong>Inventory Data:</strong> Itemized list of household or corporate items, estimated volume (Cubic Feet / CFT), and recommended transport vehicle.</li>
              <li><strong>First-Party Analytics &amp; Metadata:</strong> To maintain site speed and security, we log user interactions in the background (such as page paths visited, buttons clicked, duration spent on pages, and media interactions) along with technical indicators including device classification (Mobile/Desktop/Tablet), client IP address, and general location (City/State) resolved via standard network routing headers. We do not prompt you for GPS device permissions or share this data.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information strictly to coordinate transport logistics and optimize our services:</p>
            <ul>
              <li><strong>Quote Generation:</strong> Creating accurate shifting estimates via our sales coordinators.</li>
              <li><strong>Service Execution:</strong> Providing loading sheets and consignment notes to our packing crews and supervisors.</li>
              <li><strong>Transit Communications:</strong> Dispatching real-time updates and notifications via WhatsApp, email, or telephone.</li>
              <li><strong>Transit Insurance:</strong> Processing insurance coverage for your goods with verified national underwriting firms (e.g., National Insurance, HDFC Ergo).</li>
              <li><strong>Compliance &amp; Safety:</strong> Fulfilling tax (GST) and transport registry guidelines.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Data Sharing &amp; Third-Party Disclosure</h2>
            <p>We do not sell, rent, or trade your personal data. Your information is shared strictly under the following operational guidelines:</p>
            <ul>
              <li><strong>Transport Crew:</strong> Local supervisors receive addresses and item lists to execute loading and unloading operations.</li>
              <li><strong>Insurance Underwriters:</strong> We share name and cargo valuation to issue transit insurance policies.</li>
              <li><strong>Law Enforcement:</strong> If required under the Indian Information Technology Act (2000) or other statutory legal regulations.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Data Security &amp; Storage</h2>
            <p>
              Your data is stored securely in encrypted cloud databases. We implement standard security procedures to prevent unauthorized access, alteration, or disclosure of your shifting records.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Your Legal Rights</h2>
            <p>Under the Indian Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request corrections to inaccurate address or contact details.</li>
              <li>Request deletion of your shifting records from our databases.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>6. Changes to this Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy. Any updates will be published immediately on this page with an updated &ldquo;Last Updated&rdquo; date.
            </p>
            <p>
              For questions or data access requests, please contact our Zonal Compliance Coordinator at <strong>npmdhanbad11@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
