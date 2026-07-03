import Link from 'next/link';
import styles from './page.module.css';
import BillingClaimForm from '@/components/BillingClaimForm/BillingClaimForm';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/billing-claim-kit';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'PSU & Corporate Relocation Bill Claim Kit | National Packers & Movers';
  const description = custom?.meta_description || 'Get certified billing claim formats & templates for corporate and PSU employees. Download IBA-compliant money receipts, consignment notes (LR), shifting quotations, and packing lists.';
  const keywords = custom?.meta_keywords || 'relocation bill claim kit, packers movers bill for claim, corporate shifting invoice format, psu relocation reimbursement bill, consignment note packers movers';
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

export default function BillingClaimKitPage() {
  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`${styles.heroContent} container`}>
          <span className="section-tag">Reimbursement Specialists</span>
          <h1 className={styles.heroTitle}>
            PSU & Corporate <span>Billing Claim Kit</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Relocating due to a company transfer? Get a 100% audit-approved document kit matching the relocation policies of leading PSUs, Government departments, Banks, and Corporates.
          </p>
        </div>
      </section>

      {/* ── EXPLANATION SECTION ── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.contentCol}>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Hassle-Free Relocation <span>Claims</span>
              </h2>
              <p style={{ color: 'var(--gray-300)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                As an IBA-compliant logistics service provider with registrations spanning Jharkhand, West Bengal, Bihar, MP, UP, and AP, we specialize in providing flawless document sets for employee transfers. HR audits can be extremely strict—minor mistakes in addresses, vehicle numbering, or missing consignment stamp endorsements will delay your payouts.
              </p>
              
              <div className={styles.featureBox}>
                <h4>📋 Guaranteed Audit Clearance</h4>
                <p>We configure your shifting documents (GST Tax Invoices, Consignment Notes, Money Receipts) to strictly align with internal HR claim mandates of Coal India, Indian Railways, SBI, LIC, ONGC, SAIL, HDFC, TCS, and more.</p>
              </div>

              <div className={styles.featureBox} style={{ marginTop: '1.5rem' }}>
                <h4>🏛️ Compliant Regulatory Standards</h4>
                <p>Our invoices use standard HSN Code 9965 (GTA services) and clear breakdowns of 5% or 18% GST options depending on your corporate expense policy guidelines.</p>
              </div>
            </div>

            <div className={styles.formCol}>
              <BillingClaimForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE 6 COMPULSORY DOCUMENTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Compliance Checklist</span>
            <h2 className="section-title">The 6 Shifting <span>Claim Documents</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Ensure you have all six documents before submitting your reimbursement application to your company's accounts department:
            </p>
          </div>

          <div className={styles.docsGrid}>
            {[
              { num: '01', title: 'Official Shifting Quotation', desc: 'An initial estimate issued on our red-accented company letterhead, detailing the scope of packing, loading, transport, and delivery charges.' },
              { num: '02', title: 'GST Tax Invoice / Bill', desc: 'Itemized final bill showing CGST/SGST/IGST breakdowns, HSN codes, and our registered business credentials (GSTIN: 20AIHPJ7005R1Z6).' },
              { num: '03', title: 'Lorry Receipt (LR) / Consignment Note', desc: 'The most critical document showing the transport vehicle number, driver details, date of dispatch, and origin/destination address approvals.' },
              { num: '04', title: 'Itemized Packing List', desc: 'An exhaustive check-off inventory list of all household goods loaded. Highly scrutinized by corporate insurers and audit offices.' },
              { num: '05', title: 'Stamped Money Receipt', desc: 'A payment confirmation receipt stamped and signed with a revenue stamp, acknowledging receipt of shifting fees.' },
              { num: '06', title: 'Car Shifting Delivery Challan', desc: 'If relocating a personal vehicle (car/bike), a dedicated transport challan showing tyre condition, car details, and hand-over signatures.' }
            ].map((d, idx) => (
              <div key={idx} className={styles.docCard}>
                <div className={styles.docNumber}>{d.num}</div>
                <h3 className={styles.docTitle}>{d.title}</h3>
                <p className={styles.docDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="section bg-section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Common Shifting <span>Claim Queries</span></h2>
            <div className="divider" />
          </div>

          <div className={styles.faqList}>
            {[
              {
                q: 'What is a Lorry Receipt (LR) and why is it mandatory for claims?',
                a: 'A Lorry Receipt (or Consignment Note) is proof that goods were handed over to a logistics transporter. It records the transport vehicle number (like JH-10-CD-XXXX) and HSN Code 9965. Audit departments require this to prove actual physical transport occurred.'
              },
              {
                q: 'Can I get a claim document kit if I shift across states?',
                a: 'Yes! We issue inter-state IGST invoices for transport routes between West Bengal, Jharkhand, Bihar, Madhya Pradesh, Uttar Pradesh, and all other Indian states.'
              },
              {
                q: 'What GST percentage is required for PSU employee claims?',
                a: 'For Goods Transport Agency (GTA) services, GST can be applied at 5% (without Input Tax Credit claims) or 18% (full packing & logistics). We customize the invoice formatting to match whatever rate is sanctioned by your employer\'s policy.'
              },
              {
                q: 'Is an IBA approved bill mandatory for Bank and Railway employee transfers?',
                a: 'Most Public Sector Banks (like SBI, PNB) and Government bodies (like Railways, Coal India) mandate packing and movers bills that follow Indian Banks\' Association (IBA) guidelines. We ensure all print formats are fully compliant.'
              }
            ].map((f, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>❓ {f.q}</h3>
                <p className={styles.faqAnswer}>{f.a}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              📞 Talk to a Billing Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
