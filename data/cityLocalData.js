/**
 * Comprehensive hyper-localized dataset for key cities served by National Packers & Movers.
 * Used to enrich city landing pages with local neighborhoods, postal codes, transit matrices,
 * landmarks, and structured FAQs to eliminate duplicate content penalties and maximize Local SEO rankings.
 */

export const CITY_LOCAL_DATA = {
  // ── JHARKHAND ─────────────────────────────────────────────────────────────
  'ranchi': {
    pinCodes: ['834001', '834002', '834003', '834004', '834005', '834006', '834008', '834009', '834010', '834012'],
    neighborhoods: [
      'Lalpur', 'Kanke Road', 'Doranda', 'Harmu Housing Colony', 'Namkum',
      'Morabadi', 'Bariatu', 'Hinoo', 'Ratu Road', 'Ashok Nagar',
      'Dhurwa', 'Kokar', 'Tantisilwai', 'Khelgaon', 'Piska Nagri'
    ],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '1,280 km', time: '36–48 hrs', mode: 'Direct Sealed Container' },
      { to: 'Kolkata', distance: '410 km', time: '10–14 hrs', mode: 'Express Container' },
      { to: 'Patna', distance: '330 km', time: '8–10 hrs', mode: 'Dedicated Container Truck' },
      { to: 'Bengaluru', distance: '1,820 km', time: '4–5 Days', mode: 'Interstate Household Transport' },
      { to: 'Mumbai', distance: '1,690 km', time: '4–5 Days', mode: 'Direct Carrier Vehicle' },
      { to: 'Bhubaneswar', distance: '560 km', time: '14–18 hrs', mode: 'Express Logistics' }
    ],
    landmarks: ['Birsa Munda Airport', 'Ranchi Railway Station', 'Raj Bhavan', 'CCL Headquarters', 'HEC Complex Dhurwa'],
    hubLocation: 'Main Corporate Terminal, Ring Road / Namkum Hub, Ranchi',
  },
  'dhanbad': {
    pinCodes: ['826001', '826004', '828109', '828111', '828122', '828106'],
    neighborhoods: [
      'Bank More', 'Hirapur', 'Saraidhela', 'Govindpur', 'Katras',
      'Jharia', 'Dhansar', 'Chirkunda', 'Sindri', 'Chasnala',
      'Memco More', 'Koyla Nagar', 'Bartand', 'Steel Gate', 'Jagjivan Nagar'
    ],
    transitMatrix: [
      { to: 'Kolkata', distance: '270 km', time: '6–8 hrs', mode: 'Express Highway Transit' },
      { to: 'Delhi NCR', distance: '1,190 km', time: '30–36 hrs', mode: 'Direct Locked Container' },
      { to: 'Ranchi', distance: '150 km', time: '3–4 hrs', mode: 'Same-Day Dedicated Delivery' },
      { to: 'Patna', distance: '310 km', time: '8–10 hrs', mode: 'Dedicated Route Truck' },
      { to: 'Bhubaneswar', distance: '460 km', time: '12–14 hrs', mode: 'Regional Transport' }
    ],
    landmarks: ['IIT (ISM) Dhanbad', 'BCCL Headquarters Koyla Nagar', 'Dhanbad Junction', 'Golf Ground', 'Saraidhela Flyover'],
    hubLocation: 'Corporate HQ & Primary Logistics Terminal, Govindpur GT Road, Dhanbad',
  },
  'bokaro': {
    pinCodes: ['827001', '827003', '827004', '827006', '827009', '827010', '827012', '827013'],
    neighborhoods: [
      'Sector 4', 'Sector 1', 'Sector 9', 'Chas', 'Chira Chas',
      'Sector 6', 'Sector 12', 'Bokaro Thermal', 'Kurpania', 'Bari Co-operative'
    ],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '1,220 km', time: '32–40 hrs', mode: 'Sealed Container' },
      { to: 'Kolkata', distance: '310 km', time: '8–10 hrs', mode: 'Express Container' },
      { to: 'Ranchi', distance: '110 km', time: '2.5–3.5 hrs', mode: 'Same-Day Express' },
      { to: 'Dhanbad', distance: '45 km', time: '1–1.5 hrs', mode: 'Local Direct Shifting' }
    ],
    landmarks: ['SAIL Bokaro Steel Plant', 'City Park Sector 3', 'Bokaro General Hospital', 'Chas Bus Stand'],
    hubLocation: 'Bokaro Logistics Staging Terminal, Chas Main Road, Bokaro Steel City',
  },
  'jamshedpur': {
    pinCodes: ['831001', '831002', '831003', '831004', '831005', '831009', '831011', '831013'],
    neighborhoods: [
      'Bistupur', 'Sakchi', 'Kadma', 'Sonari', 'Telco Colony',
      'Adityapur', 'Mango', 'Golmuri', 'Baridih', 'Barsi', 'Gamharia'
    ],
    transitMatrix: [
      { to: 'Kolkata', distance: '250 km', time: '6–7 hrs', mode: 'Express Highway Shipping' },
      { to: 'Bhubaneswar', distance: '340 km', time: '8–10 hrs', mode: 'Regional Container' },
      { to: 'Ranchi', distance: '130 km', time: '3–4 hrs', mode: 'Direct Route Carrier' },
      { to: 'Delhi NCR', distance: '1,350 km', time: '36–44 hrs', mode: 'Interstate Sealed Container' }
    ],
    landmarks: ['Tata Steel Plant Bistupur', 'Tatanagar Junction', 'Jubilee Park', 'XLRI Campus', 'Adityapur Industrial Area'],
    hubLocation: 'Tata-Kolkata Highway Logistics Staging Yard, Mango / Adityapur, Jamshedpur',
  },

  // ── WEST BENGAL ───────────────────────────────────────────────────────────
  'kolkata': {
    pinCodes: ['700001', '700019', '700027', '700053', '700091', '700135', '700156'],
    neighborhoods: [
      'Salt Lake (Bidhannagar)', 'New Town Rajarhat', 'Ballygunge', 'Alipore', 'Behala',
      'Howrah', 'Dum Dum', 'Garia', 'Jadavpur', 'Tollygunge', 'Kasba', 'Park Street'
    ],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '1,450 km', time: '36–48 hrs', mode: 'Dedicated Container' },
      { to: 'Bengaluru', distance: '1,870 km', time: '4–5 Days', mode: 'Interstate Carrier' },
      { to: 'Dhanbad', distance: '270 km', time: '6–8 hrs', mode: 'Express Daily Fleet' },
      { to: 'Ranchi', distance: '410 km', time: '10–14 hrs', mode: 'Direct Transit Container' },
      { to: 'Siliguri', distance: '560 km', time: '14–16 hrs', mode: 'North Bengal Express' }
    ],
    landmarks: ['Howrah Bridge & Junction', 'Netaji Subhash Chandra Bose Airport', 'IT Sector V Salt Lake', 'Eco Park New Town'],
    hubLocation: 'Kolkata Metro Terminal, Kona Expressway / Dankuni Hub, Kolkata',
  },
  'siliguri': {
    pinCodes: ['734001', '734003', '734004', '734005', '734006', '734010'],
    neighborhoods: [
      'Sevoke Road', 'Pradhan Nagar', 'Hakim Para', 'Matigara', 'Subhash Pally',
      'Deshbandhu Para', 'Champasari', 'Khalpara', 'Salugara', 'Bagdogra'
    ],
    transitMatrix: [
      { to: 'Kolkata', distance: '560 km', time: '14–16 hrs', mode: 'Direct NH12 Container' },
      { to: 'Guwahati', distance: '470 km', time: '12–14 hrs', mode: 'North East Corridor Carrier' },
      { to: 'Delhi NCR', distance: '1,420 km', time: '40–48 hrs', mode: 'Long-Distance Express' },
      { to: 'Patna', distance: '460 km', time: '12–14 hrs', mode: 'Dedicated Inter-State Truck' }
    ],
    landmarks: ['New Jalpaiguri (NJP) Station', 'Bagdogra International Airport', 'City Centre Matigara', 'Sevoke More'],
    hubLocation: 'North Bengal Logistics Terminal, Fulbari NH31 / Matigara, Siliguri',
  },
  'durgapur': {
    pinCodes: ['713201', '713203', '713204', '713205', '713206', '713212', '713216'],
    neighborhoods: [
      'City Centre', 'Benachity', 'Bidhannagar', 'Steel Township', 'Fuljhore',
      'Amrai', 'Mamra Market', 'Muchipara', 'DSP Township', 'ASP Colony'
    ],
    transitMatrix: [
      { to: 'Kolkata', distance: '170 km', time: '3.5–4.5 hrs', mode: 'Direct NH19 Express' },
      { to: 'Dhanbad', distance: '100 km', time: '2–3 hrs', mode: 'Industrial Route Fleet' },
      { to: 'Delhi NCR', distance: '1,280 km', time: '32–38 hrs', mode: 'Closed Container Truck' }
    ],
    landmarks: ['Durgapur Steel Plant (DSP)', 'Junction Mall City Centre', 'Durgapur Railway Station', 'NIT Durgapur'],
    hubLocation: 'NH19 Industrial Shifting Terminal, Muchipara / City Centre, Durgapur',
  },

  // ── BIHAR ─────────────────────────────────────────────────────────────────
  'patna': {
    pinCodes: ['800001', '800003', '800005', '800013', '800014', '800020', '800024', '800025'],
    neighborhoods: [
      'Boring Road', 'Kankarbagh', 'Bailey Road', 'Patliputra Colony', 'Rajendra Nagar',
      'Danapur', 'Anisabad', 'Kumhrar', 'Ashiana Nagar', 'Saguna More', 'Digha'
    ],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '1,050 km', time: '24–30 hrs', mode: 'Express Closed Container' },
      { to: 'Ranchi', distance: '330 km', time: '8–10 hrs', mode: 'Direct Container Truck' },
      { to: 'Kolkata', distance: '580 km', time: '14–16 hrs', mode: 'Interstate Transport' },
      { to: 'Varanasi', distance: '250 km', time: '6–8 hrs', mode: 'Dedicated Route Truck' },
      { to: 'Muzaffarpur', distance: '75 km', time: '2–3 hrs', mode: 'Same-Day Express' }
    ],
    landmarks: ['Jayprakash Narayan Airport', 'Patna Junction', 'AIIMS Patna Danapur', 'Gandhi Maidan', 'Saguna More Flyover'],
    hubLocation: 'Patna Regional Logistics Centre, Bypass Road / Anisabad, Patna',
  },
  'muzaffarpur': {
    pinCodes: ['842001', '842002', '842003', '842004', '842005'],
    neighborhoods: [
      'Mithanpura', 'Kazi Mohammadpur', 'Damuchak', 'Brahampura', 'Bairgania',
      'Sutapatti', 'Bhagwanpur', 'Ahiyapur', 'Gobarsahi', 'Jawaharlal Road'
    ],
    transitMatrix: [
      { to: 'Patna', distance: '75 km', time: '2–3 hrs', mode: 'Daily Express Shuttle' },
      { to: 'Delhi NCR', distance: '1,080 km', time: '26–32 hrs', mode: 'Direct Sealed Container' },
      { to: 'Kolkata', distance: '620 km', time: '16–18 hrs', mode: 'Interstate Carrier' }
    ],
    landmarks: ['Muzaffarpur Junction', 'SKMCH Medical College', 'Bhagwanpur Chowk', 'Mithanpura Market'],
    hubLocation: 'North Bihar Logistics Terminal, Bhagwanpur NH28, Muzaffarpur',
  },

  // ── MADHYA PRADESH ────────────────────────────────────────────────────────
  'singrauli': {
    pinCodes: ['486886', '486887', '486888', '486889', '486890'],
    neighborhoods: [
      'Waidhan', 'Morwa', 'Vindhyanagar', 'Jayant', 'Dudhichua',
      'Nigahi', 'Gorbi', 'Jhingurdah', 'Bargawan', 'Baithan'
    ],
    transitMatrix: [
      { to: 'Varanasi', distance: '210 km', time: '5–7 hrs', mode: 'Express Container Truck' },
      { to: 'Delhi NCR', distance: '890 km', time: '22–26 hrs', mode: 'Direct Route Carrier' },
      { to: 'Bhopal', distance: '630 km', time: '14–16 hrs', mode: 'MP State Corridor' },
      { to: 'Ranchi', distance: '450 km', time: '11–13 hrs', mode: 'Coalfield Route Fleet' }
    ],
    landmarks: ['NTPC Vindhyachal Thermal Power', 'NCL Headquarters Waidhan', 'Singrauli Railway Station', 'Morwa Market'],
    hubLocation: 'Singrauli Power & Industrial Logistics Hub, Main Road Waidhan, Singrauli',
  },
  'indore': {
    pinCodes: ['452001', '452002', '452003', '452005', '452010', '452011', '452012', '452016'],
    neighborhoods: [
      'Vijay Nagar', 'Palasia', 'Saket Nagar', 'Bhawarkuan', 'Rau',
      'Super Corridor', 'Mahalaxmi Nagar', 'Bengali Square', 'Annapurna', 'Nipania'
    ],
    transitMatrix: [
      { to: 'Mumbai', distance: '580 km', time: '12–14 hrs', mode: 'Direct NH52 Express' },
      { to: 'Delhi NCR', distance: '830 km', time: '18–22 hrs', mode: 'Express Container Fleet' },
      { to: 'Bhopal', distance: '190 km', time: '3.5–4.5 hrs', mode: 'Intercity Express' },
      { to: 'Pune', distance: '600 km', time: '13–15 hrs', mode: 'Dedicated Container Truck' }
    ],
    landmarks: ['Devi Ahilya Bai Holkar Airport', 'Indore Junction', 'Rajwada Palace', 'Vijay Nagar Square', 'Super Corridor IT Park'],
    hubLocation: 'Malwa Logistics Terminal, Dewas Naka / Bypass Road, Indore',
  },

  // ── UTTAR PRADESH ─────────────────────────────────────────────────────────
  'lucknow': {
    pinCodes: ['226001', '226002', '226003', '226010', '226012', '226016', '226024', '226028'],
    neighborhoods: [
      'Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Mahanagar',
      'Rajajipuram', 'Ashiyana', 'Vrindavan Yojana', 'Jankipuram', 'Transport Nagar'
    ],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '530 km', time: '8–10 hrs', mode: 'Agra Expressway Fleet' },
      { to: 'Varanasi', distance: '310 km', time: '6–7 hrs', mode: 'Direct Route Container' },
      { to: 'Patna', distance: '530 km', time: '10–12 hrs', mode: 'East UP Express' },
      { to: 'Kolkata', distance: '1,010 km', time: '22–26 hrs', mode: 'Interstate Transport' }
    ],
    landmarks: ['Chaudhary Charan Singh Airport', 'Lucknow Charbagh Railway Station', 'Gomti Nagar Extension', 'Transport Nagar Hub'],
    hubLocation: 'Lucknow Central Logistics Hub, Kanpur Road / Transport Nagar, Lucknow',
  },
  'noida': {
    pinCodes: ['201301', '201303', '201304', '201305', '201306', '201307', '201309', '201313'],
    neighborhoods: [
      'Sector 62', 'Sector 18', 'Sector 137', 'Greater Noida West (Noida Ext)',
      'Sector 50', 'Sector 76', 'Sector 128', 'Alpha 1 Greater Noida', 'Pari Chowk'
    ],
    transitMatrix: [
      { to: 'Lucknow', distance: '500 km', time: '7–9 hrs', mode: 'Expressway Direct Fleet' },
      { to: 'Ranchi', distance: '1,260 km', time: '32–40 hrs', mode: 'Sealed Container Truck' },
      { to: 'Dhanbad', distance: '1,170 km', time: '28–34 hrs', mode: 'Direct Industrial Carrier' },
      { to: 'Bengaluru', distance: '2,150 km', time: '5–6 Days', mode: 'Interstate Household Transit' }
    ],
    landmarks: ['Noida City Centre', 'Sector 18 Market', 'Botanical Garden Metro', 'Pari Chowk Greater Noida', 'Noida-Greater Noida Expressway'],
    hubLocation: 'NCR Mega Transport Staging Yard, Phase 2 Industrial Area / Greater Noida West, Noida',
  },
};

/**
 * Helper to retrieve localized city data with safe fallbacks
 */
export function getCityLocalData(citySlug) {
  const normalized = (citySlug || '').toLowerCase().trim();
  return CITY_LOCAL_DATA[normalized] || null;
}
