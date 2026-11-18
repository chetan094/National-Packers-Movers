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

  // ── ADDITIONAL JHARKHAND HUBS ─────────────────────────────────────────────
  'deoghar': {
    pinCodes: ['814112', '814113', '814142', '814143'],
    neighborhoods: ['Castairs Town', 'Williams Town', 'Bilasi Town', 'Satsang Nagar', 'Jasidih Road', 'Barmasia', 'Bompas Town'],
    transitMatrix: [
      { to: 'Kolkata', distance: '320 km', time: '8–10 hrs', mode: 'Express Highway Container' },
      { to: 'Patna', distance: '250 km', time: '6–8 hrs', mode: 'Dedicated Route Truck' },
      { to: 'Dhanbad', distance: '115 km', time: '3–4 hrs', mode: 'Direct Transport Fleet' },
      { to: 'Ranchi', distance: '250 km', time: '6–7 hrs', mode: 'State Highway Express' }
    ],
    landmarks: ['Deoghar Airport', 'Jasidih Junction', 'Baba Baidyanath Temple Area', 'Tower Chowk'],
    hubLocation: 'Deoghar Regional Logistics Desk, Jasidih Station Road, Deoghar',
  },
  'hazaribagh': {
    pinCodes: ['825301', '825302', '825303', '825319'],
    neighborhoods: ['Matwari', 'Korrah', 'Babu Gaon', 'Okaani', 'Hurhuru', 'Sindoor', 'Canary Hill Road'],
    transitMatrix: [
      { to: 'Ranchi', distance: '95 km', time: '2–3 hrs', mode: 'Direct Dedicated Truck' },
      { to: 'Kolkata', distance: '380 km', time: '9–11 hrs', mode: 'Express Highway Container' },
      { to: 'Patna', distance: '230 km', time: '5–7 hrs', mode: 'NH-20 Direct Corridor' }
    ],
    landmarks: ['Vinoba Bhave University', 'Hazaribagh Lake', 'Matwari Chowk', 'District Collectorate'],
    hubLocation: 'Hazaribagh Transport Office, Core NH-20 Corridor, Hazaribagh',
  },
  'giridih': {
    pinCodes: ['815301', '815302', '815316'],
    neighborhoods: ['Makhatpur', 'Pachamba', 'Buxidih', 'Barganda', 'Sirasia', 'Mahuatand'],
    transitMatrix: [
      { to: 'Dhanbad', distance: '60 km', time: '1.5–2 hrs', mode: 'Local Dedicated Fleet' },
      { to: 'Kolkata', distance: '310 km', time: '7–9 hrs', mode: 'Express Container' },
      { to: 'Patna', distance: '250 km', time: '6–8 hrs', mode: 'Direct Carrier' }
    ],
    landmarks: ['Giridih Railway Station', 'Town Hall', 'Pachamba Main Road', 'Usri Falls Gate'],
    hubLocation: 'Giridih Operations Depot, Makhatpur Main Road, Giridih',
  },
  'chas': {
    pinCodes: ['827013', '827014'],
    neighborhoods: ['Chas Bazar', 'Chira Chas', 'Kunj Behari Colony', 'Bypass Road', 'Checkpost Zone'],
    transitMatrix: [
      { to: 'Dhanbad', distance: '40 km', time: '1–1.5 hrs', mode: 'Inter-City Express' },
      { to: 'Ranchi', distance: '115 km', time: '3–4 hrs', mode: 'Highway Truck' },
      { to: 'Kolkata', distance: '300 km', time: '7–9 hrs', mode: 'Direct Closed Container' }
    ],
    landmarks: ['Chas Bypass Crossing', 'Indira Gandhi Marg', 'Subhas Chowk'],
    hubLocation: 'Chas Commercial Shifting Yard, Indira Gandhi Marg, Chas',
  },
  'medininagar': {
    pinCodes: ['822101', '822102', '822103'],
    neighborhoods: ['Shahpur', 'Hamid Ganj', 'Belwatika', 'Kundu Mohalla', 'Sudarshan Nagar', 'Station Road'],
    transitMatrix: [
      { to: 'Ranchi', distance: '165 km', time: '4–5 hrs', mode: 'Direct Container Carrier' },
      { to: 'Patna', distance: '260 km', time: '7–8 hrs', mode: 'Express Highway Truck' },
      { to: 'Varanasi', distance: '220 km', time: '5–6 hrs', mode: 'Interstate Fleet' }
    ],
    landmarks: ['Daltonganj Railway Station', 'Koel River Bridge', 'Court Compound'],
    hubLocation: 'Palamu Regional Transport Yard, Medininagar Main Road, Medininagar',
  },
  'dumka': {
    pinCodes: ['814101', '814102'],
    neighborhoods: ['SP College Area', 'Dumka Chowk', 'Rasikpur', 'Bada Bandh', 'Dudhani'],
    transitMatrix: [
      { to: 'Ranchi', distance: '270 km', time: '7–8 hrs', mode: 'State Highway Carrier' },
      { to: 'Kolkata', distance: '290 km', time: '7–9 hrs', mode: 'Direct Route Container' }
    ],
    landmarks: ['Dumka Railway Station', 'Santhal Pargana College', 'Tin Bazar'],
    hubLocation: 'Dumka Zonal Depot, SP College Road, Dumka',
  },
  'koderma': {
    pinCodes: ['825409', '825410'],
    neighborhoods: ['Jhumri Telaiya', 'Station Road', 'Bishunpur', 'Ranchi-Patna Road Area'],
    transitMatrix: [
      { to: 'Patna', distance: '160 km', time: '4–5 hrs', mode: 'NH-20 Express' },
      { to: 'Ranchi', distance: '150 km', time: '3.5–4.5 hrs', mode: 'Direct Route Truck' },
      { to: 'Kolkata', distance: '360 km', time: '8–10 hrs', mode: 'Sealed Container' }
    ],
    landmarks: ['Koderma Junction', 'Jhumri Telaiya Chowk', 'Telaiya Dam Gate'],
    hubLocation: 'Koderma Transit Terminal, Station Road Jhumri Telaiya, Koderma',
  },

  // ── ADDITIONAL WEST BENGAL HUBS ───────────────────────────────────────────
  'asansol': {
    pinCodes: ['713301', '713302', '713303', '713304', '713325'],
    neighborhoods: ['Ushagram', 'Chelidanga', 'Burnpur Road', 'Hutton Road', 'Kalyanpur Housing', 'Sen Raleigh Road', 'Court Area'],
    transitMatrix: [
      { to: 'Kolkata', distance: '210 km', time: '4–5 hrs', mode: 'Direct NH-19 Express' },
      { to: 'Dhanbad', distance: '60 km', time: '1.5–2 hrs', mode: 'Industrial Route Fleet' },
      { to: 'Delhi NCR', distance: '1,240 km', time: '30–36 hrs', mode: 'Long-Distance Sealed Container' }
    ],
    landmarks: ['Asansol Junction', 'Burnpur IISCO Steel Plant', 'Galaxy Mall', 'Court More'],
    hubLocation: 'Asansol Industrial Depot, GT Road / Ushagram, Asansol',
  },
  'howrah': {
    pinCodes: ['711101', '711102', '711104', '711106', '711204'],
    neighborhoods: ['Shibpur', 'Salkia', 'Bally', 'Liluah', 'Santragachi', 'Kadamtala', 'Mandirtala'],
    transitMatrix: [
      { to: 'Dhanbad', distance: '260 km', time: '6–7 hrs', mode: 'Express Container' },
      { to: 'Bhubaneswar', distance: '430 km', time: '9–11 hrs', mode: 'NH-16 Corridor' },
      { to: 'Delhi NCR', distance: '1,440 km', time: '36–44 hrs', mode: 'Interstate Fleet' }
    ],
    landmarks: ['Howrah Railway Station', 'Nabanna State Secretariat', 'IIEST Shibpur Campus', 'Kona Expressway Hub'],
    hubLocation: 'Howrah Terminal Logistics Yard, Kona Expressway / Santragachi, Howrah',
  },
  'kharagpur': {
    pinCodes: ['721301', '721302', '721305', '721306'],
    neighborhoods: ['IIT Campus Area', 'Gol Bazar', 'Prem Bazar', 'Indah', 'Malancha Road', 'Nimpura Industrial'],
    transitMatrix: [
      { to: 'Kolkata', distance: '130 km', time: '2.5–3.5 hrs', mode: 'NH-16 Express' },
      { to: 'Bhubaneswar', distance: '310 km', time: '6–8 hrs', mode: 'Direct Sealed Truck' },
      { to: 'Jamshedpur', distance: '120 km', time: '3–4 hrs', mode: 'Inter-City Shuttle' }
    ],
    landmarks: ['IIT Kharagpur Main Gate', 'Kharagpur Railway Junction', 'Gol Bazar Market'],
    hubLocation: 'Kharagpur Logistics Center, Nimpura Industrial Area, Kharagpur',
  },
  'haldia': {
    pinCodes: ['721602', '721604', '721605', '721607'],
    neighborhoods: ['Durgachak', 'Township Sector 1', 'Basudevpur', 'Brajarafchak', 'City Centre Haldia'],
    transitMatrix: [
      { to: 'Kolkata', distance: '125 km', time: '3–4 hrs', mode: 'NH-116 Express' },
      { to: 'Kharagpur', distance: '90 km', time: '2–2.5 hrs', mode: 'Direct Route Container' }
    ],
    landmarks: ['Haldia Port Terminal', 'Indian Oil Refinery Complex', 'City Centre Durgachak'],
    hubLocation: 'Haldia Maritime Logistics Depot, Durgachak Port Road, Haldia',
  },
  'bardhaman': {
    pinCodes: ['713101', '713102', '713103', '713104'],
    neighborhoods: ['Curzon Gate Area', 'Birhata', 'Badamtala', 'Khosbagan', 'Ullash', 'Nababhat'],
    transitMatrix: [
      { to: 'Kolkata', distance: '100 km', time: '2–2.5 hrs', mode: 'NH-19 Expressway' },
      { to: 'Durgapur', distance: '70 km', time: '1.5 hrs', mode: 'Direct Highway Shuttle' }
    ],
    landmarks: ['Bardhaman Junction', 'Curzon Gate Heritage Landmark', 'Burdwan University'],
    hubLocation: 'Bardhaman Highway Depot, Ullash More / NH-19, Bardhaman',
  },
  'malda': {
    pinCodes: ['732101', '732102', '732103'],
    neighborhoods: ['English Bazar', 'Mokdumpur', 'Jhaljhalia', 'Mangalbari', 'Singatala'],
    transitMatrix: [
      { to: 'Kolkata', distance: '330 km', time: '8–10 hrs', mode: 'NH-12 Dedicated Route' },
      { to: 'Siliguri', distance: '230 km', time: '5–6 hrs', mode: 'North Bengal Express' }
    ],
    landmarks: ['Malda Town Station', 'English Bazar Municipality', 'Rathbari More'],
    hubLocation: 'Malda Gateway Depot, Rathbari NH-12, English Bazar, Malda',
  },

  // ── ADDITIONAL BIHAR HUBS ─────────────────────────────────────────────────
  'bhagalpur': {
    pinCodes: ['812001', '812002', '812003', '812005'],
    neighborhoods: ['Tilkamanji', 'Zero Mile', 'Aliganj', 'Mirjanhat', 'Nathnagar', 'Khanjarpur', 'Barari'],
    transitMatrix: [
      { to: 'Patna', distance: '235 km', time: '6–7 hrs', mode: 'Direct Highway Carrier' },
      { to: 'Kolkata', distance: '410 km', time: '10–12 hrs', mode: 'Interstate Sealed Truck' },
      { to: 'Delhi NCR', distance: '1,220 km', time: '28–34 hrs', mode: 'Closed Container' }
    ],
    landmarks: ['Bhagalpur Junction', 'Tilka Manjhi Bhagalpur University', 'Zero Mile Chowk', 'Vikramshila Setu'],
    hubLocation: 'Bhagalpur Silk City Depot, Zero Mile Main Road, Bhagalpur',
  },
  'gaya': {
    pinCodes: ['823001', '823002', '823003', '824231'],
    neighborhoods: ['Civil Lines', 'AP Colony', 'Rampur', 'Bodhgaya Road', 'Chandauti', 'Delha'],
    transitMatrix: [
      { to: 'Patna', distance: '105 km', time: '2.5–3 hrs', mode: 'Direct Route Shuttle' },
      { to: 'Kolkata', distance: '470 km', time: '10–12 hrs', mode: 'NH-19 Expressway Fleet' },
      { to: 'Varanasi', distance: '240 km', time: '5–6 hrs', mode: 'Direct Container Carrier' }
    ],
    landmarks: ['Gaya International Airport', 'Gaya Railway Junction', 'Bodhgaya Mahabodhi Area', 'Civil Lines Gate'],
    hubLocation: 'Gaya Regional Transport Center, Dobhi NH-19 / Bodhgaya Road, Gaya',
  },
  'purnia': {
    pinCodes: ['854301', '854302', '854303'],
    neighborhoods: ['Line Bazar', 'Bhatta Bazar', 'Gulabbagh', 'Madhubani', 'Kala Bhawan Area', 'Khuskibagh'],
    transitMatrix: [
      { to: 'Patna', distance: '300 km', time: '7–8 hrs', mode: 'Seemanchal Express' },
      { to: 'Siliguri', distance: '160 km', time: '3.5–4.5 hrs', mode: 'Direct Route Container' }
    ],
    landmarks: ['Purnia Junction', 'Gulabbagh Mandi', 'Line Bazar Medical Hub'],
    hubLocation: 'Purnia East Transport Depot, Gulabbagh NH-31, Purnia',
  },
  'darbhanga': {
    pinCodes: ['846001', '846003', '846004', '846005'],
    neighborhoods: ['Laheriasarai', 'Lalbagh', 'Benta', 'Mirzapur', 'Donar', 'Kadabad'],
    transitMatrix: [
      { to: 'Patna', distance: '140 km', time: '3.5–4.5 hrs', mode: 'Direct Highway Fleet' },
      { to: 'Delhi NCR', distance: '1,120 km', time: '26–32 hrs', mode: 'Dedicated Container' }
    ],
    landmarks: ['Darbhanga Airport', 'Darbhanga Junction', 'Raj Darbhanga Fort Gate'],
    hubLocation: 'Mithila Logistics Depot, Donar Chowk / Laheriasarai, Darbhanga',
  },
  'ara': {
    pinCodes: ['802301', '802302'],
    neighborhoods: ['Nawada', 'Khanda', 'Katira', 'Pakri', 'Babu Bazar', 'Gopali Chowk'],
    transitMatrix: [
      { to: 'Patna', distance: '55 km', time: '1.5–2 hrs', mode: 'Local Dedicated Shuttle' },
      { to: 'Varanasi', distance: '200 km', time: '4–5 hrs', mode: 'Direct Route Truck' }
    ],
    landmarks: ['Ara Junction', 'Veer Kunwar Singh University', 'Katira More'],
    hubLocation: 'Bhojpur Shifting Terminal, Nawada Road, Ara',
  },

  // ── ADDITIONAL MADHYA PRADESH HUBS ────────────────────────────────────────
  'bhopal': {
    pinCodes: ['462001', '462003', '462011', '462016', '462023', '462026'],
    neighborhoods: ['Arera Colony', 'MP Nagar', 'Kolar Road', 'Hoshangabad Road', 'Habibganj', 'Ayodhya Bypass', 'Govindpura'],
    transitMatrix: [
      { to: 'Indore', distance: '190 km', time: '3.5–4.5 hrs', mode: 'Intercity Expressway' },
      { to: 'Delhi NCR', distance: '790 km', time: '16–20 hrs', mode: 'Direct Highway Container' },
      { to: 'Mumbai', distance: '770 km', time: '16–19 hrs', mode: 'Sealed Freight Truck' }
    ],
    landmarks: ['Rani Kamlapati Railway Station', 'Raja Bhoj Airport', 'DB City Mall MP Nagar', 'Govindpura Industrial Hub'],
    hubLocation: 'Bhopal Central Logistics Terminal, Ayodhya Bypass / Hoshangabad Road, Bhopal',
  },
  'jabalpur': {
    pinCodes: ['482001', '482002', '482003', '482004', '482005'],
    neighborhoods: ['Civil Lines', 'Napier Town', 'Wright Town', 'Vijay Nagar', 'Madan Mahal', 'Adhartal'],
    transitMatrix: [
      { to: 'Bhopal', distance: '300 km', time: '6–7 hrs', mode: 'NH-45 Corridor' },
      { to: 'Nagpur', distance: '280 km', time: '5–6 hrs', mode: 'Direct Route Fleet' }
    ],
    landmarks: ['Jabalpur Junction', 'Dumna Airport', 'Bhedaghat Marble Rocks Gate', 'Madan Mahal Station'],
    hubLocation: 'Mahakaushal Logistics Yard, Adhartal Industrial Estate, Jabalpur',
  },
  'gwalior': {
    pinCodes: ['474001', '474002', '474006', '474011'],
    neighborhoods: ['City Centre', 'Lashkar', 'Morar', 'Thatipur', 'Deen Dayal Nagar', 'Maharaj Bada'],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '360 km', time: '6–8 hrs', mode: 'Yamuna Expressway Transit' },
      { to: 'Agra', distance: '120 km', time: '2.5–3 hrs', mode: 'Direct Container Shuttle' }
    ],
    landmarks: ['Gwalior Fort', 'Gwalior Junction', 'Rajmata Vijaya Raje Scindia Airport', 'City Centre Square'],
    hubLocation: 'Gwalior Transport Depot, Morar / Transport Nagar, Gwalior',
  },
  'ujjain': {
    pinCodes: ['456001', '456006', '456010'],
    neighborhoods: ['Freeganj', 'Nanakheda', 'Madhav Nagar', 'Sethi Nagar', 'Dewas Road Area'],
    transitMatrix: [
      { to: 'Indore', distance: '55 km', time: '1–1.5 hrs', mode: 'Express Highway Fleet' },
      { to: 'Bhopal', distance: '190 km', time: '3.5–4.5 hrs', mode: 'Direct Route Truck' }
    ],
    landmarks: ['Mahakaleshwar Temple Gate', 'Ujjain Junction', 'Nanakheda Bus Terminal'],
    hubLocation: 'Ujjain Commercial Hub, Dewas Road / Freeganj, Ujjain',
  },

  // ── ODISHA HUBS ───────────────────────────────────────────────────────────
  'bhubaneswar': {
    pinCodes: ['751001', '751002', '751003', '751010', '751012', '751024', '751030'],
    neighborhoods: [
      'Patia', 'Nayapalli', 'Saheed Nagar', 'Khandagiri', 'Chandrasekharpur',
      'Jaydev Vihar', 'Unit 1 & 4', 'Sundarpada', 'Rasulgarh', 'Mancheswar'
    ],
    transitMatrix: [
      { to: 'Kolkata', distance: '440 km', time: '8–10 hrs', mode: 'Express NH-16 Container' },
      { to: 'Ranchi', distance: '560 km', time: '12–14 hrs', mode: 'Direct Interstate Truck' },
      { to: 'Dhanbad', distance: '460 km', time: '11–13 hrs', mode: 'Industrial Route Fleet' },
      { to: 'Visakhapatnam', distance: '440 km', time: '9–11 hrs', mode: 'Coastal Direct Carrier' },
      { to: 'Bengaluru', distance: '1,450 km', time: '3–4 Days', mode: 'South Corridor Sealed Container' }
    ],
    landmarks: ['Biju Patnaik International Airport', 'Bhubaneswar Railway Station', 'KIIT Patia Campus', 'Rasulgarh Flyover'],
    hubLocation: 'Odisha State Capital Hub, Rasulgarh / Mancheswar Industrial Estate, Bhubaneswar',
  },
  'cuttack': {
    pinCodes: ['753001', '753002', '753003', '753008', '753010'],
    neighborhoods: ['Badambadi', 'Link Road', 'CDA Sector 6 to 11', 'Chhatrabazar', 'Madhupatna', 'Jobra', 'Bidanasi'],
    transitMatrix: [
      { to: 'Bhubaneswar', distance: '28 km', time: '45 mins', mode: 'Twin-City Express Shuttle' },
      { to: 'Kolkata', distance: '410 km', time: '8–10 hrs', mode: 'Direct NH-16 Container' },
      { to: 'Ranchi', distance: '530 km', time: '12–14 hrs', mode: 'Dedicated Household Truck' }
    ],
    landmarks: ['Barabati Stadium', 'Cuttack Railway Station', 'Badambadi Bus Terminal', 'Madhupatna Flyover'],
    hubLocation: 'Cuttack Commercial Staging Depot, Madhupatna / Link Road, Cuttack',
  },
  'rourkela': {
    pinCodes: ['769001', '769004', '769011', '769012', '769015'],
    neighborhoods: ['Sector 4', 'Sector 19', 'Civil Township', 'Panposh', 'Udit Nagar', 'Chhend Colony', 'Koel Nagar'],
    transitMatrix: [
      { to: 'Ranchi', distance: '170 km', time: '4–5 hrs', mode: 'Direct Highway Container' },
      { to: 'Bhubaneswar', distance: '330 km', time: '7–9 hrs', mode: 'State Express Carrier' },
      { to: 'Kolkata', distance: '420 km', time: '9–11 hrs', mode: 'Industrial Freight Fleet' }
    ],
    landmarks: ['Rourkela Steel Plant (SAIL)', 'NIT Rourkela Campus', 'Rourkela Junction', 'Birsa Munda Hockey Stadium'],
    hubLocation: 'Steel City Shifting Terminal, Panposh Road / Civil Township, Rourkela',
  },
  'brahmapur': {
    pinCodes: ['760001', '760002', '760004', '760010'],
    neighborhoods: ['Gandhi Nagar', 'Kamapalli', 'Bhavanagar', 'Gosaninuagaon', 'Ankuli', 'Court Peta'],
    transitMatrix: [
      { to: 'Bhubaneswar', distance: '170 km', time: '3.5–4.5 hrs', mode: 'NH-16 Express' },
      { to: 'Visakhapatnam', distance: '270 km', time: '5–6 hrs', mode: 'Direct Route Container' }
    ],
    landmarks: ['Brahmapur Railway Station', 'MKCG Medical College', 'Kamapalli Chowk'],
    hubLocation: 'Southern Odisha Logistics Yard, Ankuli NH-16, Brahmapur',
  },
  'sambalpur': {
    pinCodes: ['768001', '768002', '768004', '768019'],
    neighborhoods: ['Dhanupali', 'Ainthapali', 'Budharaja', 'Fatak', 'Burla', 'Khetrajpur'],
    transitMatrix: [
      { to: 'Bhubaneswar', distance: '280 km', time: '6–7 hrs', mode: 'Biju Expressway Fleet' },
      { to: 'Raipur', distance: '260 km', time: '5–6 hrs', mode: 'Interstate Freight Carrier' }
    ],
    landmarks: ['Sambalpur Junction', 'Hirakud Dam Gate', 'VSSUT Burla Campus'],
    hubLocation: 'Western Odisha Transport Depot, Ainthapali / Dhanupali, Sambalpur',
  },
  'puri': {
    pinCodes: ['752001', '752002'],
    neighborhoods: ['VIP Road', 'Grand Road', 'Chakratirtha Road', 'Baliapanda', 'Talabania'],
    transitMatrix: [
      { to: 'Bhubaneswar', distance: '60 km', time: '1–1.5 hrs', mode: 'Direct Highway Shuttle' },
      { to: 'Kolkata', distance: '500 km', time: '10–12 hrs', mode: 'Express Container' }
    ],
    landmarks: ['Jagannath Temple Area', 'Puri Railway Station', 'Puri Sea Beach VIP Road'],
    hubLocation: 'Puri Coastal Shifting Desk, VIP Road, Puri',
  },

  // ── ADDITIONAL UTTAR PRADESH HUBS ─────────────────────────────────────────
  'kanpur': {
    pinCodes: ['208001', '208002', '208005', '208012', '208024'],
    neighborhoods: ['Civil Lines', 'Kakadeo', 'Swaroop Nagar', 'Kidwai Nagar', 'Govind Nagar', 'Kalyanpur', 'Shyam Nagar'],
    transitMatrix: [
      { to: 'Lucknow', distance: '85 km', time: '1.5–2 hrs', mode: 'Express Highway Shuttle' },
      { to: 'Delhi NCR', distance: '480 km', time: '7–9 hrs', mode: 'Direct Container Truck' },
      { to: 'Varanasi', distance: '320 km', time: '6–7 hrs', mode: 'NH-19 Corridor' }
    ],
    landmarks: ['IIT Kanpur Campus', 'Kanpur Central Railway Station', 'Z Square Mall', 'Kalyanpur Flyover'],
    hubLocation: 'Kanpur Industrial Hub, Transport Nagar / GT Road, Kanpur',
  },
  'ghaziabad': {
    pinCodes: ['201001', '201002', '201009', '201010', '201012'],
    neighborhoods: ['Indirapuram', 'Vaishali', 'Vasundhara', 'Raj Nagar Extension', 'Crossings Republik', 'Kaushambi'],
    transitMatrix: [
      { to: 'Lucknow', distance: '490 km', time: '7–8 hrs', mode: 'Agra Expressway Fleet' },
      { to: 'Ranchi', distance: '1,240 km', time: '30–38 hrs', mode: 'Sealed Locked Container' }
    ],
    landmarks: ['Ghaziabad Junction', 'Shipra Mall Indirapuram', 'Hindon Airport Area'],
    hubLocation: 'Ghaziabad Terminal Yard, Mohan Nagar / Link Road, Ghaziabad',
  },
  'varanasi': {
    pinCodes: ['221001', '221002', '221005', '221010'],
    neighborhoods: ['Sigra', 'Lanka', 'Bhelupur', 'Shivpur', 'Pandeypur', 'Mahmoorganj', 'Cantonment'],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '820 km', time: '14–18 hrs', mode: 'Purvanchal Expressway Container' },
      { to: 'Patna', distance: '250 km', time: '5–7 hrs', mode: 'Direct Highway Fleet' },
      { to: 'Kolkata', distance: '680 km', time: '14–16 hrs', mode: 'NH-19 Direct Corridor' },
      { to: 'Dhanbad', distance: '390 km', time: '8–10 hrs', mode: 'Industrial Route Fleet' }
    ],
    landmarks: ['Lal Bahadur Shastri International Airport', 'Varanasi Cantt Junction', 'BHU Lanka Gate', 'Sigra Stadium'],
    hubLocation: 'Varanasi Commercial Terminal, Shivpur / GT Road, Varanasi',
  },
  'prayagraj': {
    pinCodes: ['211001', '211002', '211003', '211008'],
    neighborhoods: ['Civil Lines', 'George Town', 'Tagore Town', 'Kareli', 'Naini', 'Dhoomanganj', 'Allahpur'],
    transitMatrix: [
      { to: 'Varanasi', distance: '125 km', time: '2.5–3 hrs', mode: 'Highway Shuttle' },
      { to: 'Lucknow', distance: '200 km', time: '4–5 hrs', mode: 'Direct Route Carrier' },
      { to: 'Delhi NCR', distance: '680 km', time: '11–13 hrs', mode: 'Sealed Container Fleet' }
    ],
    landmarks: ['Prayagraj Junction', 'High Court of Allahabad', 'Subhash Chauraha Civil Lines', 'Naini Bridge'],
    hubLocation: 'Prayagraj Regional Hub, GT Road / Naini Industrial Area, Prayagraj',
  },
  'agra': {
    pinCodes: ['282001', '282002', '282005', '282007'],
    neighborhoods: ['Sanjay Place', 'Kamla Nagar', 'Fatehabad Road', 'Dayalbagh', 'Shastripuram', 'Tajganj'],
    transitMatrix: [
      { to: 'Delhi NCR', distance: '220 km', time: '3.5–4.5 hrs', mode: 'Yamuna Expressway Fleet' },
      { to: 'Lucknow', distance: '330 km', time: '4.5–5.5 hrs', mode: 'Agra-Lucknow Expressway' }
    ],
    landmarks: ['Agra Cantt Station', 'Taj Mahal Gate', 'Sanjay Place Commercial Hub'],
    hubLocation: 'Agra Express Depot, Transport Nagar / NH-19, Agra',
  },
  'ayodhya': {
    pinCodes: ['224001', '224123'],
    neighborhoods: ['Civil Lines', 'Naka', 'Rikabganj', 'Fatehganj', 'Ram Katha Park Area', 'Devkali'],
    transitMatrix: [
      { to: 'Lucknow', distance: '135 km', time: '2.5–3 hrs', mode: 'Four-Lane Highway Fleet' },
      { to: 'Varanasi', distance: '200 km', time: '4–5 hrs', mode: 'Direct Dedicated Truck' },
      { to: 'Delhi NCR', distance: '650 km', time: '11–13 hrs', mode: 'Closed Sealed Container' }
    ],
    landmarks: ['Maharishi Valmiki International Airport', 'Ayodhya Dham Junction', 'Ram Janmabhoomi Complex Area'],
    hubLocation: 'Ayodhya Commercial Dispatch Terminal, Bypass Road / Naka, Ayodhya',
  },
};

/**
 * Helper to retrieve localized city data with safe fallbacks
 */
export function getCityLocalData(citySlug) {
  const normalized = (citySlug || '').toLowerCase().trim();
  return CITY_LOCAL_DATA[normalized] || null;
}
