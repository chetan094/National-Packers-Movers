'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './PsuCalloutCard.module.css';
import PsuClaimModal from '@/components/PsuClaimModal/PsuClaimModal';

export default function PsuCalloutCard({ cityName = '', isBranchPage = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  const cleanCity = cityName ? cityName.replace(/ \(hq\)/i, '').replace(/ \(virtual office\)/i, '').replace(/ \(coming soon\)/i, '') : '';

  if (isBranchPage) {
    return (
      <>
        <div className={styles.branchCard} data-reveal="up">
          <div className={styles.cardHeader}>
            <span className={styles.miniBadge}>💼 PSU REIMBURSEMENT DESK</span>
            <h3 className={styles.branchTitle}>
              Moving on PSU / Corporate Transfer {cleanCity ? `from ${cleanCity}` : ''}?
            </h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.branchText}>
              Don't risk audit rejections on your relocation allowance. We provide 100% genuine, IBA-aligned invoices, loading sheets, and money receipts accepted by <strong>Coal India, SAIL, NTPC, DVC, CMPDI, and national banks</strong>.
            </p>
            <button 
              type="button" 
              className={styles.branchCta}
              onClick={() => setModalOpen(true)}
            >
              📥 Download {cleanCity ? `${cleanCity} ` : ''}Claim Kit (PDF)
            </button>
          </div>
        </div>

        <PsuClaimModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          defaultOrigin={cleanCity}
        />
      </>
    );
  }

  // Homepage Full-Width Version
  return (
    <>
      <section className={styles.homeSection} data-reveal="up">
        <div className={`${styles.homeCard} container`}>
          <div className={styles.leftCol}>
            <span className={styles.badge}>💼 B2B &amp; Corporate Logistics Desk</span>
            <h2 className={styles.homeTitle}>
              PSU Relocation Reimbursement &amp; <span>Corporate Billing Specialists</span>
            </h2>
            <p className={styles.homeText}>
              We are India's premier movers trusted by officers of <strong>Coal India (BCCL, CCL, ECL, NCL), CMPDI, SAIL, NTPC, IOCL, DVC, Indian Railways, State Bank of India,</strong> and other major public sector undertakings. We handle 100% of your claim paperwork, providing fully compliant billings to guarantee hassle-free reimbursement.
            </p>
            <div className={styles.psuGrid}>
              <span>• Coal India</span>
              <span>• BCCL/CCL/ECL</span>
              <span>• CMPDI</span>
              <span>• NTPC</span>
              <span>• SAIL</span>
              <span>• IOCL/DVC</span>
              <span>• National Banks</span>
              <span>• Indian Railways</span>
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.ctaBox}>
              <h3 className={styles.ctaBoxTitle}>Relocating on Transfer?</h3>
              <p className={styles.ctaBoxText}>
                Get our verified Shifting Claim Approval Kit containing standard formats, bill check lists, and audit guidelines.
              </p>
              <button 
                type="button" 
                className={styles.homeCta}
                onClick={() => setModalOpen(true)}
              >
                📥 Download Shifting Claim Kit (PDF)
              </button>
              <Link 
                href="/billing-claim-kit"
                className={styles.homeExplore}
              >
                🔍 Explore Claim Kit Details
              </Link>
              <span className={styles.ctaFoot}>🔒 Free Official Resource • Immediate Download</span>
            </div>
          </div>
        </div>
      </section>

      <PsuClaimModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultOrigin={cleanCity}
      />
    </>
  );
}
