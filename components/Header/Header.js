'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import styles from './Header.module.css';

const branches = [
  {
    state: 'Jharkhand',
    slug: 'jharkhand',
    cities: [
      { name: 'Dhanbad (HQ)', slug: 'dhanbad' },
      { name: 'Ranchi', slug: 'ranchi' },
      { name: 'Bokaro', slug: 'bokaro' },
      { name: 'Deoghar', slug: 'deoghar' },
      { name: 'Hazaribagh', slug: 'hazaribagh' },
      { name: 'Jamshedpur', slug: 'jamshedpur' },
      { name: 'Giridih', slug: 'giridih' },
      { name: 'Chas', slug: 'chas' },
      { name: 'Dumka', slug: 'dumka' },
      { name: 'Koderma', slug: 'koderma' },
      { name: 'Sahibganj', slug: 'sahibganj' },
      { name: 'Katras', slug: 'katras' },
      { name: 'Jharia', slug: 'jharia' },
      { name: 'Govindpur', slug: 'govindpur' },
      { name: 'Dhansar', slug: 'dhansar' },
      { name: 'Chirkunda', slug: 'chirkunda' },
      { name: 'Sindri', slug: 'sindri' },
      { name: 'Jasidih', slug: 'jasidih' }
    ],
  },
  {
    state: 'West Bengal',
    slug: 'west-bengal',
    cities: [
      { name: 'Kolkata', slug: 'kolkata' },
      { name: 'Durgapur', slug: 'durgapur' },
      { name: 'Asansol', slug: 'asansol' },
      { name: 'Siliguri', slug: 'siliguri' },
      { name: 'Howrah', slug: 'howrah' },
      { name: 'Kharagpur', slug: 'kharagpur' },
      { name: 'Haldia', slug: 'haldia' },
      { name: 'Bardhaman', slug: 'bardhaman' },
      { name: 'Malda', slug: 'malda' },
      { name: 'Bankura', slug: 'bankura' },
      { name: 'Barasat', slug: 'barasat' },
      { name: 'Barrackpore', slug: 'barrackpore' },
      { name: 'Raniganj', slug: 'raniganj' },
      { name: 'Salt Lake', slug: 'salt-lake' },
      { name: 'Newtown', slug: 'newtown' },
      { name: 'Rajarhat', slug: 'rajarhat' }
    ],
  },
  {
    state: 'Bihar',
    slug: 'bihar',
    cities: [
      { name: 'Patna', slug: 'patna' },
      { name: 'Bhagalpur', slug: 'bhagalpur' },
      { name: 'Gaya', slug: 'gaya' },
      { name: 'Muzaffarpur', slug: 'muzaffarpur' },
      { name: 'Purnia', slug: 'purnia' },
      { name: 'Darbhanga', slug: 'darbhanga' },
      { name: 'Ara', slug: 'ara' },
      { name: 'Begusarai', slug: 'begusarai' },
      { name: 'Katihar', slug: 'katihar' },
      { name: 'Chhapra', slug: 'chhapra' },
      { name: 'Sasaram', slug: 'sasaram' },
      { name: 'Motihari', slug: 'motihari' },
      { name: 'Gopalganj', slug: 'gopalganj' }
    ],
  },
  {
    state: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    cities: [
      { name: 'Singrauli', slug: 'singrauli' },
      { name: 'Indore', slug: 'indore' },
      { name: 'Bhopal', slug: 'bhopal' },
      { name: 'Ujjain', slug: 'ujjain' }
    ],
  },
  {
    state: 'Odisha',
    slug: 'odisha',
    cities: [
      { name: 'Bhubaneswar', slug: 'bhubaneswar' },
      { name: 'Rourkela', slug: 'rourkela' },
      { name: 'Sambalpur', slug: 'sambalpur' },
      { name: 'Puri', slug: 'puri' }
    ],
  },
  {
    state: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    cities: [
      { name: 'Lucknow', slug: 'lucknow' },
      { name: 'Kanpur', slug: 'kanpur' },
      { name: 'Ghaziabad', slug: 'ghaziabad' },
      { name: 'Prayagraj', slug: 'prayagraj' },
      { name: 'Moradabad', slug: 'moradabad' },
      { name: 'Gorakhpur', slug: 'gorakhpur' },
      { name: 'Noida', slug: 'noida' },
      { name: 'Greater Noida', slug: 'greater-noida' },
      { name: 'Faizabad', slug: 'faizabad' }
    ],
  },
];

const services = [
  { name: 'Household Relocation', slug: 'household-relocation', icon: '🏠' },
  { name: 'Corporate Relocation', slug: 'corporate-relocation', icon: '🏢' },
  { name: 'Industrial Relocation', slug: 'industrial-relocation', icon: '🏭' },
  { name: 'Vehicle Relocation', slug: 'vehicle-relocation', icon: '🚗' },
  { name: 'Warehousing & Storage', slug: 'warehousing-storage', icon: '🏪' },
  { name: 'Transit Insurance', slug: 'transit-insurance', icon: '🛡️' },
  { name: 'Loading & Unloading', slug: 'loading-unloading', icon: '📦' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setActiveState(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const startClose = (extraFn) => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
      if (extraFn) extraFn();
    }, 200);
  };

  const toggleMobile = (key) => {
    setMobileExpanded(prev => prev === key ? null : key);
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topContact}>
            <a href="tel:9835168368" className={styles.topLink} onClick={() => trackEvent('click', 'call_click')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px',color:'var(--gold)'}}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              9835168368
            </a>
            <span className={styles.topDivider} />
            <a href="tel:9934166164" className={styles.topLink} onClick={() => trackEvent('click', 'call_click')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px',color:'var(--gold)'}}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              9934166164
            </a>
            <span className={styles.topDivider} />
            <a href="mailto:npmdhanbad11@gmail.com" className={styles.topLink} id="header-email-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{display:'inline',verticalAlign:'middle',marginRight:'4px',color:'var(--gold)'}}>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              npmdhanbad11@gmail.com
            </a>
            <span className={styles.topDivider} />
            <span className={styles.topText}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px',color:'var(--gold)'}}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              All India Service
            </span>
            <span className={styles.topDivider} />
            <span className={styles.topText}>
              [Corporate HQ- Dhanbad, HQ(zonal)- Kolkata]
            </span>
          </div>
          <div className={styles.topSocial}>
            <a href="https://www.youtube.com/@NationalPackersandMovers11" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.instagram.com/national.packers.and.movers/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/people/National-Packers-Movers/100077275401485/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.threads.com/@national.packers.and.movers" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Threads">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.355-.012 5.15-.33 5.15-4.083V16.5h-3.93v-1.65h5.58v2.86c0 2.2-.657 3.845-1.952 4.89-1.197.974-2.884 1.388-5.848 1.4z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImg}>
            <img
              src="/logo.png"
              alt="National Packers & Movers Logo"
              width={52}
              height={52}
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <div className={styles.logoFallback} style={{display:'none'}}>NPM</div>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>National Packers <span className={styles.logoAnd}>&amp;</span> Movers</span>
            <span className={styles.logoTagline}>Trusted Since 1987 &nbsp;|&nbsp; All India Service</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/" className={styles.navLink}>Home</Link></li>
          {/* About Dropdown */}
          <li
            className={styles.hasDropdown}
            onMouseEnter={() => { cancelClose(); setActiveDropdown('about'); }}
            onMouseLeave={() => startClose()}
          >
            <span className={`${styles.navLink} ${styles.hasArrow} ${activeDropdown === 'about' ? styles.navLinkActive : ''}`}>
              About
              <svg className={`${styles.arrow} ${activeDropdown === 'about' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className={`${styles.dropdown} ${activeDropdown === 'about' ? styles.dropdownOpen : ''}`}>
              <div className={styles.dropdownInner}>
                <Link href="/about" className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>ℹ️</span>
                  <span>About Us</span>
                </Link>
                <Link href="/gallery" className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>🖼️</span>
                  <span>Media Gallery</span>
                </Link>
                <Link href="/testimonials" className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>⭐</span>
                  <span>Testimonials</span>
                </Link>
                <Link href="/faqs" className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>❓</span>
                  <span>FAQs</span>
                </Link>
                <Link href="/billing-claim-kit" className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>📋</span>
                  <span>Claim Kit</span>
                </Link>
              </div>
            </div>
          </li>

          {/* Services Dropdown */}
          <li
            className={styles.hasDropdown}
            onMouseEnter={() => { cancelClose(); setActiveDropdown('services'); }}
            onMouseLeave={() => startClose()}
          >
            <span className={`${styles.navLink} ${styles.hasArrow} ${activeDropdown === 'services' ? styles.navLinkActive : ''}`}>
              Services
              <svg className={`${styles.arrow} ${activeDropdown === 'services' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className={`${styles.dropdown} ${activeDropdown === 'services' ? styles.dropdownOpen : ''}`}>
              <div className={styles.dropdownInner}>
                {services.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={styles.dropdownItem}>
                    <span className={styles.dropdownIcon}>{s.icon}</span>
                    <span>{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* Branches Mega-Menu */}
          <li
            className={styles.hasDropdown}
            onMouseEnter={() => { cancelClose(); setActiveDropdown('branches'); }}
            onMouseLeave={() => startClose(() => setActiveState(null))}
          >
            <span className={`${styles.navLink} ${styles.hasArrow} ${activeDropdown === 'branches' ? styles.navLinkActive : ''}`}>
              Branches
              <svg className={`${styles.arrow} ${activeDropdown === 'branches' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className={`${styles.megaMenu} ${activeDropdown === 'branches' ? styles.dropdownOpen : ''}`}>
              <div className={styles.megaMenuInner}>
                {/* States Column */}
                <div className={styles.statesList}>
                  <p className={styles.megaLabel}>Select State</p>
                  {branches.map(branch => (
                    <div
                      key={branch.slug}
                      className={`${styles.stateItem} ${activeState === branch.slug ? styles.stateActive : ''}`}
                      onMouseEnter={() => setActiveState(branch.slug)}
                    >
                      <Link href={`/branches/${branch.slug}`} className={styles.stateName}>
                        📍 {branch.state}
                        {branch.cities.length === 0 && <span className={styles.virtualBadge}>Virtual</span>}
                      </Link>
                      {branch.cities.length > 0 && (
                        <svg viewBox="0 0 6 10" fill="none" width="6" height="10">
                          <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cities Column */}
                <div className={styles.citiesList}>
                  {activeState ? (
                    <>
                      <p className={styles.megaLabel}>
                        {branches.find(b => b.slug === activeState)?.state} — Cities
                      </p>
                      {branches.find(b => b.slug === activeState)?.cities.length > 0 ? (
                        branches.find(b => b.slug === activeState).cities.map(city => (
                          <Link
                            key={city.slug}
                            href={`/branches/${activeState}/${city.slug}`}
                            className={styles.cityItem}
                          >
                            🏙️ {city.name}
                          </Link>
                        ))
                      ) : (
                        <div className={styles.cityItem}>
                          <span style={{color:'var(--gray-300)', fontSize:'0.85rem'}}>
                            Virtual Office — All enquiries<br/>handled through HQ
                          </span>
                        </div>
                      )}
                      <Link href={`/branches/${activeState}`} className={styles.viewAllState}>
                        View full {branches.find(b => b.slug === activeState)?.state} page →
                      </Link>
                    </>
                  ) : (
                    <div className={styles.citiesPlaceholder}>
                      <span>👆 Hover a state to see cities</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>

          <li><Link href="/track-shipment" className={styles.navLink}>Track Shipment</Link></li>
          <li><Link href="/blog" className={styles.navLink}>Blog</Link></li>
          <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
        </ul>

        {/* CTA Button */}
        <Link href="/get-quote" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
          Get Free Quote
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
          {/* Mobile About Accordion */}
          <div className={styles.mobileAccordion}>
            <button className={styles.mobileAccordionBtn} onClick={() => toggleMobile('about')}>
              About
              <svg className={`${styles.arrow} ${mobileExpanded === 'about' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileExpanded === 'about' && (
              <div className={styles.mobileAccordionContent}>
                <Link href="/about" className={styles.mobileSubLink} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}>
                  ℹ️ About Us
                </Link>
                <Link href="/gallery" className={styles.mobileSubLink} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}>
                  🖼️ Media Gallery
                </Link>
                <Link href="/testimonials" className={styles.mobileSubLink} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}>
                  ⭐ Testimonials
                </Link>
                <Link href="/faqs" className={styles.mobileSubLink} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}>
                  ❓ FAQs
                </Link>
                <Link href="/billing-claim-kit" className={styles.mobileSubLink} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}>
                  📋 Claim Kit
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Services Accordion */}
          <div className={styles.mobileAccordion}>
            <button className={styles.mobileAccordionBtn} onClick={() => toggleMobile('services')}>
              Services
              <svg className={`${styles.arrow} ${mobileExpanded === 'services' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileExpanded === 'services' && (
              <div className={styles.mobileAccordionContent}>
                {services.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>
                    {s.icon} {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Branches Accordion */}
          <div className={styles.mobileAccordion}>
            <button className={styles.mobileAccordionBtn} onClick={() => toggleMobile('branches')}>
              Branches
              <svg className={`${styles.arrow} ${mobileExpanded === 'branches' ? styles.arrowOpen : ''}`} viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileExpanded === 'branches' && (
              <div className={styles.mobileAccordionContent}>
                {branches.map(branch => (
                  <div key={branch.slug}>
                    <Link href={`/branches/${branch.slug}`} className={styles.mobileStateLink} onClick={() => setMobileOpen(false)}>
                      📍 {branch.state}
                    </Link>
                    {branch.cities.map(city => (
                      <Link key={city.slug} href={`/branches/${branch.slug}/${city.slug}`} className={styles.mobileCityLink} onClick={() => setMobileOpen(false)}>
                        — {city.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/track-shipment" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Track Shipment</Link>
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/get-quote" className={`btn btn-primary ${styles.mobileCtaBtn}`} onClick={() => setMobileOpen(false)}>
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
