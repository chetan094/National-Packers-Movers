'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const branches = [
  { state: 'Jharkhand', slug: 'jharkhand', cities: ['Dhanbad','Ranchi','Bokaro','Deoghar'] },
  { state: 'West Bengal', slug: 'west-bengal', cities: ['Kolkata','Durgapur','Asansol'] },
  { state: 'Bihar', slug: 'bihar', cities: ['Patna','Bhagalpur'] },
  { state: 'Madhya Pradesh', slug: 'madhya-pradesh', cities: ['Singrauli'] },
  { state: 'Odisha', slug: 'odisha', cities: [] },
  { state: 'Uttar Pradesh', slug: 'uttar-pradesh', cities: [] },
];

const services = [
  { name: 'Household Relocation', slug: 'household-relocation' },
  { name: 'Corporate Relocation', slug: 'corporate-relocation' },
  { name: 'Industrial Relocation', slug: 'industrial-relocation' },
  { name: 'Vehicle Relocation', slug: 'vehicle-relocation' },
  { name: 'Warehousing & Storage', slug: 'warehousing-storage' },
  { name: 'Transit Insurance', slug: 'transit-insurance' },
  { name: 'Loading & Unloading', slug: 'loading-unloading' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={`${styles.footerGrid} container`}>

          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo}>
              <img src="/logo.png" alt="National Packers & Movers" width={60} height={60} />
              <div>
                <p className={styles.footerBrandName}>National Packers & Movers</p>
                <p className={styles.footerBrandSub}>Trusted Since 1987</p>
              </div>
            </Link>
            <p className={styles.footerTagline}>
              "Honesty is not our policy, but our Principle."
            </p>
            <div className={styles.footerContact}>
              <a href="tel:9835168368" className={styles.footerPhone}>📞 9835168368</a>
              <a href="tel:9934166164" className={styles.footerPhone}>📞 9934166164</a>
              <a href="mailto:npmdhanbad11@gmail.com" className={styles.footerEmail} id="footer-email-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                npmdhanbad11@gmail.com
              </a>
              <p className={styles.footerAddress}>
                📍 Kasturba Nagar, Near Dhanbad Thana,<br />
                Dhanbad, Jharkhand — 826001
              </p>
            </div>
            <div className={styles.footerSocial}>
              <a href="https://www.youtube.com/@NationalPackersandMovers11" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/national.packers.and.movers/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/people/National-Packers-Movers/100077275401485/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.threads.com/@national.packers.and.movers" target="_blank" rel="noopener noreferrer" aria-label="Threads" className={styles.socialBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.355-.012 5.15-.33 5.15-4.083V16.5h-3.93v-1.65h5.58v2.86c0 2.2-.657 3.845-1.952 4.89-1.197.974-2.884 1.388-5.848 1.4z"/></svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Services</h4>
            <ul className={styles.colLinks}>
              {services.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={styles.footerLink}>
                    → {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches Column */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Branches</h4>
            {branches.map(b => (
              <div key={b.slug} className={styles.branchGroup}>
                <Link href={`/branches/${b.slug}`} className={styles.stateLink}>
                  {b.state}
                </Link>
                <div className={styles.cityLinks}>
                  {b.cities.map(city => (
                    <Link
                      key={city}
                      href={`/branches/${b.slug}/${city.toLowerCase().replace(/ /g,'-')}`}
                      className={styles.cityLink}
                    >
                      {city}
                    </Link>
                  ))}
                  {b.cities.length === 0 && (
                    <span className={styles.virtualText}>Virtual Office</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/" className={styles.footerLink}>→ Home</Link></li>
              <li><Link href="/about" className={styles.footerLink}>→ About Us</Link></li>
              <li><Link href="/get-quote" className={styles.footerLink}>→ Get Free Quote</Link></li>
              <li><Link href="/track-shipment" className={styles.footerLink}>→ Track Shipment</Link></li>
              <li><Link href="/gallery" className={styles.footerLink}>→ Gallery</Link></li>
              <li><Link href="/testimonials" className={styles.footerLink}>→ Testimonials</Link></li>
              <li><Link href="/blog" className={styles.footerLink}>→ Blog</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>→ Contact</Link></li>
            </ul>
            <div className={styles.ctaBox}>
              <p>Ready to move?</p>
              <Link href="/get-quote" className="btn btn-primary btn-sm">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={`${styles.footerBottomInner} container`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} National Packers & Movers. All rights reserved.
            Established 1987 | Registered since 1997.
          </p>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy-policy" className={styles.bottomLink}>Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
            <span>|</span>
            <Link href="/sitemap.xml" className={styles.bottomLink}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
