'use client';
import SlotCounter from '@/components/animations/SlotCounter';
import styles from '@/app/page.module.css';

const trustStats = [
  { number: 38, suffix: '+', label: 'Years of Trust' },
  { number: 30000, suffix: '+', label: 'Successful Moves' },
  { number: 6, suffix: '', label: 'States Covered' },
  { number: 15, suffix: '+', label: 'Cities Served' },
];

export default function TrustStats() {
  return (
    <section className={styles.trustBar}>
      <div className={`${styles.trustGrid} container`}>
        {trustStats.map((stat, i) => (
          <div key={i} className={styles.trustItem} data-reveal="up" data-delay={i * 110}>
            <div className={styles.trustNumber}>
              <SlotCounter end={stat.number} suffix={stat.suffix} duration={2200} />
            </div>
            <div className={styles.trustLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
