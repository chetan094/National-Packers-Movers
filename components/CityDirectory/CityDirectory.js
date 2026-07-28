'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './CityDirectory.module.css';

const STATE_DIRECTORIES = [
  {
    name: 'Jharkhand',
    slug: 'jharkhand',
    badge: '38+ Years HQ Operations',
    cities: [
      { name: 'Dhanbad (HQ)', slug: 'dhanbad', tag: 'Central Hub' },
      { name: 'Ranchi', slug: 'ranchi', tag: 'Capital Branch' },
      { name: 'Bokaro Steel City', slug: 'bokaro', tag: 'Industrial Hub' },
      { name: 'Jamshedpur', slug: 'jamshedpur', tag: 'Tata City' },
      { name: 'Deoghar', slug: 'deoghar', tag: 'Express Terminal' },
      { name: 'Hazaribagh', slug: 'hazaribagh', tag: 'Regional Branch' },
      { name: 'Giridih', slug: 'giridih', tag: 'Branch Office' },
      { name: 'Ramgarh', slug: 'ramgarh', tag: 'Cantt Area' },
      { name: 'Medininagar (Daltonganj)', slug: 'medininagar', tag: 'Palamu Hub' },
      { name: 'Chas', slug: 'chas', tag: 'Bokaro Extension' },
      { name: 'Adityapur', slug: 'adityapur', tag: 'Industrial Estate' },
      { name: 'Dumka', slug: 'dumka', tag: 'Santhal Branch' },
      { name: 'Kodarma', slug: 'kodarma', tag: 'Mining Zone' },
      { name: 'Chaibasa', slug: 'chaibasa', tag: 'West Singhbhum' },
      { name: 'Jharia', slug: 'jharia', tag: 'Dhanbad Region' },
      { name: 'Katras', slug: 'katras', tag: 'Colliery Branch' },
    ]
  },
  {
    name: 'West Bengal',
    slug: 'west-bengal',
    badge: 'Kolkata Metro Terminal',
    cities: [
      { name: 'Kolkata', slug: 'kolkata', tag: 'Metro Terminal' },
      { name: 'Siliguri', slug: 'siliguri', tag: 'North Bengal Hub' },
      { name: 'Durgapur', slug: 'durgapur', tag: 'Steel City' },
      { name: 'Asansol', slug: 'asansol', tag: 'Industrial Zone' },
      { name: 'Howrah', slug: 'howrah', tag: 'Twin City' },
      { name: 'Kharagpur', slug: 'kharagpur', tag: 'IIT Campus Hub' },
      { name: 'Haldia', slug: 'haldia', tag: 'Port City' },
      { name: 'Bardhaman', slug: 'bardhaman', tag: 'Agricultural Hub' },
      { name: 'Malda', slug: 'malda', tag: 'Mango City' },
      { name: 'Jalpaiguri', slug: 'jalpaiguri', tag: 'Tea Hub' },
      { name: 'Purulia', slug: 'purulia', tag: 'District Hub' },
      { name: 'Bankura', slug: 'bankura', tag: 'Branch Office' },
      { name: 'Salt Lake (New Town)', slug: 'salt-lake', tag: 'IT Corridor' },
    ]
  },
  {
    name: 'Bihar',
    slug: 'bihar',
    badge: 'Patna Regional Hub',
    cities: [
      { name: 'Patna', slug: 'patna', tag: 'Capital Terminal' },
      { name: 'Muzaffarpur', slug: 'muzaffarpur', tag: 'North Bihar Hub' },
      { name: 'Bhagalpur', slug: 'bhagalpur', tag: 'Silk City' },
      { name: 'Gaya', slug: 'gaya', tag: 'Heritage Branch' },
      { name: 'Purnia', slug: 'purnia', tag: 'Seemanchal Hub' },
      { name: 'Darbhanga', slug: 'darbhanga', tag: 'Mithila Hub' },
      { name: 'Bihar Sharif', slug: 'bihar-sharif', tag: 'Nalanda Branch' },
      { name: 'Ara (Arrah)', slug: 'ara', tag: 'Bhojpur Branch' },
      { name: 'Begusarai', slug: 'begusarai', tag: 'Industrial Hub' },
      { name: 'Katihar', slug: 'katihar', tag: 'Rail Junction Hub' },
      { name: 'Munger', slug: 'munger', tag: 'Gun Factory Hub' },
      { name: 'Hajipur', slug: 'hajipur', tag: 'Vaishali Hub' },
    ]
  },
  {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    badge: 'Power & Coalfield Hub',
    cities: [
      { name: 'Singrauli (Waidhan)', slug: 'singrauli', tag: 'Power Capital' },
      { name: 'Indore', slug: 'indore', tag: 'Commercial Hub' },
      { name: 'Bhopal', slug: 'bhopal', tag: 'Capital Hub' },
      { name: 'Jabalpur', slug: 'jabalpur', tag: 'Mahakaushal Hub' },
      { name: 'Gwalior', slug: 'gwalior', tag: 'Chambal Hub' },
      { name: 'Ujjain', slug: 'ujjain', tag: 'Holy City' },
      { name: 'Sagar', slug: 'sagar', tag: 'Central MP' },
      { name: 'Rewa', slug: 'rewa', tag: 'Vindhya Region' },
      { name: 'Satna', slug: 'satna', tag: 'Cement Hub' },
      { name: 'Morwa', slug: 'morwa', tag: 'Singrauli Mining' },
    ]
  },
  {
    name: 'Odisha',
    slug: 'odisha',
    badge: 'Bhubaneswar Corridor',
    cities: [
      { name: 'Bhubaneswar', slug: 'bhubaneswar', tag: 'Capital Hub' },
      { name: 'Cuttack', slug: 'cuttack', tag: 'Silver City' },
      { name: 'Rourkela', slug: 'rourkela', tag: 'Steel City' },
      { name: 'Berhampur', slug: 'berhampur', tag: 'Silk City' },
      { name: 'Sambalpur', slug: 'sambalpur', tag: 'Western Odisha' },
      { name: 'Puri', slug: 'puri', tag: 'Coastal Branch' },
      { name: 'Jharsuguda', slug: 'jharsuguda', tag: 'Industrial Hub' },
      { name: 'Balasore', slug: 'balasore', tag: 'Northern Hub' },
    ]
  },
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    badge: 'Expressway Direct Fleet',
    cities: [
      { name: 'Lucknow', slug: 'lucknow', tag: 'Capital Terminal' },
      { name: 'Noida (Greater Noida)', slug: 'noida', tag: 'NCR Mega Hub' },
      { name: 'Kanpur', slug: 'kanpur', tag: 'Industrial City' },
      { name: 'Ghaziabad', slug: 'ghaziabad', tag: 'NCR Logistics' },
      { name: 'Prayagraj (Allahabad)', slug: 'prayagraj', tag: 'Sangam City' },
      { name: 'Varanasi', slug: 'varanasi', tag: 'Holy City' },
      { name: 'Agra', slug: 'agra', tag: 'Heritage Branch' },
      { name: 'Meerut', slug: 'meerut', tag: 'Sports Hub' },
      { name: 'Gorakhpur', slug: 'gorakhpur', tag: 'Purvanchal Hub' },
      { name: 'Jhansi', slug: 'jhansi', tag: 'Bundelkhand Hub' },
    ]
  }
];

export default function CityDirectory() {
  const [activeState, setActiveState] = useState('jharkhand');

  const selectedStateData = STATE_DIRECTORIES.find(s => s.slug === activeState) || STATE_DIRECTORIES[0];

  return (
    <div className={styles.directoryWrapper}>
      <div className={styles.directoryHeader}>
        <span className="section-tag">Logistics Network</span>
        <h2 className={styles.directoryTitle}>
          National Relocation <span>Coverage Directory</span>
        </h2>
        <p className={styles.directorySubtitle}>
          Company-owned closed container trucks and background-verified shifting crews operating across 6 states & 1,200+ cities in Eastern & Central India.
        </p>
      </div>

      {/* State Selection Tabs */}
      <div className={styles.stateTabs}>
        {STATE_DIRECTORIES.map((st) => (
          <button
            key={st.slug}
            type="button"
            className={`${styles.tabBtn} ${activeState === st.slug ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveState(st.slug)}
          >
            <span className={styles.tabName}>{st.name}</span>
            <span className={styles.tabBadge}>{st.cities.length} Cities</span>
          </button>
        ))}
      </div>

      {/* Active State Cities Grid */}
      <div className={styles.cityCardContainer}>
        <div className={styles.stateHeaderMeta}>
          <h3 className={styles.stateHeaderTitle}>
            Packers & Movers in <span>{selectedStateData.name}</span>
          </h3>
          <span className={styles.stateMetaBadge}>✨ {selectedStateData.badge}</span>
        </div>

        <div className={styles.citiesGrid}>
          {selectedStateData.cities.map((ct) => (
            <Link
              key={ct.slug}
              href={`/branches/${selectedStateData.slug}/${ct.slug}`}
              className={styles.cityCard}
            >
              <div className={styles.cityCardContent}>
                <span className={styles.pinIcon}>📍</span>
                <div>
                  <h4 className={styles.cityName}>{ct.name}</h4>
                  <span className={styles.cityTag}>{ct.tag}</span>
                </div>
              </div>
              <span className={styles.arrowIcon}>→</span>
            </Link>
          ))}
        </div>

        <div className={styles.stateFooterRow}>
          <Link href={`/branches/${selectedStateData.slug}`} className={styles.viewStateBtn}>
            Explore All Branches in {selectedStateData.name} State Directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
