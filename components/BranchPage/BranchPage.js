import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import { ratesData } from '@/data/ratesData';
import { routesData, getRoutesForCity, getRoutesForState } from '@/data/routesData';
import styles from './BranchPage.module.css';
import SlotCounter from '@/components/animations/SlotCounter';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';
import BranchImage from './BranchImage';
import CalculatorModal from './CalculatorModal';
import BranchTestimonials from './BranchTestimonials';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import LocalOperationsShowcase from './LocalOperationsShowcase';
import { getGalleryImages } from '@/lib/supabase';
import PsuCalloutCard from '@/components/PsuCalloutCard/PsuCalloutCard';



const RELOCATION_SERVICES = [
  { slug: 'household-relocation', name: 'Household Relocation', icon: '🏠', desc: 'Secure home shifting with multi-layer packing.', color: '#F7B731' },
  { slug: 'corporate-relocation', name: 'Corporate Shifting', icon: '🏢', desc: 'Minimal downtime office shifting for companies and PSUs.', color: '#C1121F' },
  { slug: 'industrial-relocation', name: 'Industrial Transport', icon: '🏭', desc: 'Heavy machinery and factory logistics handled safely.', color: '#F7B731' },
  { slug: 'vehicle-relocation', name: 'Vehicle Relocation', icon: '🚗', desc: 'Safe transport of cars and bikes in specialized carriers.', color: '#C1121F' },
];

const WHAT_YOU_GET = [
  { title: 'Multi-Layer Premium Packing', desc: 'Bubble wrap, foam sheet padding, double-wall boxes, and waterproof stretch wraps.' },
  { title: 'IBA-Compliant Reimbursement Billing', desc: 'GST-registered tax invoices, LR consignment notes, and packing list formats accepted by all PSUs and banks.' },
  { title: '100% Transit Insurance Protection', desc: 'Full safety backup covering all household and commercial goods against any highway accidental damage.' },
  { title: 'Owned GPS-Tracked Containers', desc: 'Direct transport in our own lockable container trucks to eliminate intermediate unloading risks.' },
  { title: 'Trained Professional Crew', desc: 'Dedicated packing staff trained to handle heavy furniture, electronics, and delicate kitchenware.' },
  { title: 'Destination Reassembly & Setup', desc: 'Unpacking and placing all large items, beds, and appliances exactly where you instruct.' },
];

const PROCESS_STEPS = [
  { icon: '🔍', title: '01. Pre-Move Survey', desc: 'Assessing volume, road accessibility, and fragile items to provide a guaranteed, transparent quote.' },
  { icon: '📦', title: '02. Premium Packing', desc: 'Wrapping every item securely using proper bubble wrap and cardboard cartons on moving day.' },
  { icon: '🚛', title: '03. Safe Loading', desc: 'Loading and securing goods into our closed-container vehicle using specialized handling gear.' },
  { icon: '🗺️', title: '04. Direct Highway Transit', desc: 'Safe transport via our own direct fleet from your origin to destination with zero mid-way transfer.' },
  { icon: '📤', title: '05. Careful Unloading', desc: 'Unstacking and unloading every container with care, under the supervisor\'s watch.' },
  { icon: '🔧', title: '06. Placement & Assembly', desc: 'Reassembling beds, wardrobes, and setting up large appliances exactly where you specify.' },
];

const WHY_CHOOSE_US = [
  { icon: '🏆', title: '38+ Years Legacy', desc: 'Serving honest logistics in Eastern India since 1987, founded by Debabrata Jhampaty.' },
  { icon: '🛡️', title: 'Insured Shipments', desc: 'Complete transit insurance backing so your capital assets are 100% protected.' },
  { icon: '🤝', title: 'Honest & Fixed Pricing', desc: 'We stand by our survey quote. Zero hidden costs, zero extortion at loading time.' },
  { icon: '👨‍🔧', title: 'In-House Specialists', desc: 'Background-verified packing crews—no third-party temporary loaders.' },
  { icon: '🚛', title: 'Direct Fleet Logistics', desc: 'Lockable closed containers ensure weatherproofing and dust protection during transit.' },
  { icon: '🏢', title: 'PSU/Corporate Trust', desc: 'The preferred choice for bank, railway, coal field, and corporate relocations.' },
];

const GLOBAL_BRANCH_FAQS = [
  {
    q: 'Are you IBA-approved and do you provide invoices for PSU reimbursement in [Location]?',
    a: 'Yes, National Packers & Movers is highly trusted by bank, railway, NTPC, NCL, and public sector employees in [Location]. We provide 100% genuine GST tax invoices, itemized loading lists, money receipts, and LR consignment notes that comply fully with corporate claim rules.'
  },
  {
    q: 'What are the average packers and movers charges in [Location]?',
    a: 'Shifting charges depend on distance and cargo volume. Local shifts start from ₹4,000 for a 1BHK. Inter-state shifts start from ₹12,000. We recommend booking a free pre-move survey in [Location] for a precise, guaranteed quote.'
  },
  {
    q: 'Do you offer transit insurance for household goods in [Location]?',
    a: 'Yes, we issue comprehensive transit insurance for all moves starting from [Location]. This protects your furniture, appliances, and valuables against any accidental damage during transit.'
  },
  {
    q: 'Which cities do you cover in and around [Location]?',
    a: 'cover-query'
  },
  {
    q: 'What shifting services are available in [Location]?',
    a: 'services-query'
  },
  {
    q: 'How long does it take to shift goods from [Location] to another state?',
    a: 'Local moves are completed on the same day. Interstate transport to neighboring states (Bengal, Bihar, Jharkhand) takes 1-3 days. Southern and Western states take 5-7 days in our direct container trucks.'
  },
  {
    q: 'Do you unpack and reassemble furniture at the destination?',
    a: 'Yes, our service includes unloading, unpacking, and placing items in your new rooms. We reassemble double beds, dining tables, and large wardrobes so you can settle in comfortably.'
  },
  {
    q: 'Can I transport my car or bike along with my house shift in [Location]?',
    a: 'Yes, we relocate cars and bikes safely. Vehicles are packed with multi-layer bubble wrap and transported in specialized car carriers or secure containers from [Location].'
  },
  {
    q: 'How do I book a free home shifting survey in [Location]?',
    a: 'You can schedule a free pre-move survey instantly. Simply click the "Get Free Quote" button, call us at 9835168368, or chat with our coordinator on WhatsApp.'
  }
];

const DETAILED_SERVICES_TEMPLATE = [
  {
    slug: 'household-relocation',
    icon: '🏠',
    title: 'Household Shifting',
    text: 'Secure home shifting in [Location] handled by background-verified packing experts. We utilize multi-layer premium packing (high-grade bubble wrap, heavy-duty cartons, stretch wrap padding) to shield all electronics, glassware, and furniture. Complete door-to-door transit is executed in secure closed containers with destination unpacking and reassembly.',
    highlights: ['Bubble & Foam Wraps', 'Closed-Container Transit', 'Bed & Wardrobe Setup'],
    color: '#F7B731'
  },
  {
    slug: 'corporate-relocation',
    icon: '🏢',
    title: 'Corporate Shifting',
    text: 'Business-aligned office shifting and employee transfer services in [Location]. We are the preferred logistics partner for corporate sectors, banks, railways, and PSU companies (like Coal India, NTPC, SBI). Features customized weekend shifting packages to ensure near-zero operational downtime, secure data server packing in specialized anti-static crates, and full billing documentation.',
    highlights: ['Zero Shifting Downtime', 'IBA-Compliant Billing', 'Anti-Static Server Crates'],
    color: '#C1121F'
  },
  {
    slug: 'vehicle-relocation',
    icon: '🚗',
    title: 'Car & Bike Transport',
    text: 'Secure door-to-door car and bike transport services from [Location] to anywhere in India. Motorcycles are padded and packed in multi-layer wraps to prevent highway scratches, while cars are loaded in heavy-duty, double-deck enclosed car carriers. Includes full transit insurance coverage, transparent condition reports, and real-time GPS coordinates updates.',
    highlights: ['Enclosed Car Carriers', 'Scratch-Proof Wrapping', 'Transit GPS Tracking'],
    color: '#F7B731'
  },
  {
    slug: 'industrial-relocation',
    icon: '🏭',
    title: 'Industrial Transport',
    text: 'Heavy machinery relocation, warehouse logistics, and Over-Dimensional Cargo (ODC) shipping services active in [Location]. Our industrial logistics division coordinates heavy crane loading, custom wooden crating for precision factory gear, and secure highway lashing. Fully compliant with national permit standards, transit safety protocols, and commercial clearances.',
    highlights: ['Heavy Crane Loading', 'Industrial Wooden Crates', 'National Permits & Clearance'],
    color: '#C1121F'
  }
];

const LOCALITY_MAP = {
  dhanbad: ['Kasturba Nagar', 'Saraidhela', 'Jharia', 'Katras', 'Govindpur', 'Dhansar', 'Chirkunda', 'Sindri'],
  ranchi: ['Lalpur', 'Kanke', 'Bariatu', 'Morabadi', 'Hinoo', 'Doranda', 'Namkum', 'Hatia'],
  bokaro: ['Sector 4', 'Sector 9', 'Sector 12', 'Chas', 'Cooperative Colony', 'Naya More', 'Bokaro Thermal'],
  deoghar: ['Jasidih', 'Madhupur', 'Castairs Town', 'Williams Town', 'Bilasi Town', 'Satsang Nagar'],
  kolkata: ['Salt Lake', 'Newtown', 'Rajarhat', 'Tollygunge', 'Behala', 'Howrah', 'Garia', 'Dum Dum'],
  durgapur: ['City Centre', 'Benachity', 'Bidhannagar', 'Mamra', 'Steel Township', 'DPL Colony'],
  asansol: ['Chelidanga', 'Ushagram', 'Hutton Road', 'Burnpur', 'Sen Raleigh Road', 'Kalyanpur'],
  patna: ['Boring Road', 'Kankarbagh', 'Bailey Road', 'Patliputra Colony', 'Danapur', 'Rajendra Nagar'],
  bhagalpur: ['Zero Mile', 'Aliganj', 'Tilkamanji', 'Mirjanhat', 'Nathnagar', 'Khanjarpur'],
  singrauli: ['Waidhan', 'Vindhyanagar', 'Jayant', 'Dudhichua', 'Morwa', 'Shaktinagar']
};

const STATE_CITIES = {
  'jharkhand': [
    'dhanbad', 'ranchi', 'bokaro', 'deoghar', 'jamshedpur', 'hazaribagh', 'giridih', 
    'ramgarh', 'medininagar', 'daltonganj', 'chas', 'adityapur', 'dumka', 'chatra', 
    'gumla', 'kodarma', 'koderma', 'pakur', 'sahibganj', 'sahebganj', 'simdega', 
    'latehar', 'khunti', 'saraikela', 'garhwa', 'lohardaga', 'ghatsila', 'phusro', 
    'katras', 'jharia', 'govindpur', 'dhansar', 'chirkunda', 'sindri', 'jasidih', 'madhupur'
  ],
  'west-bengal': [
    'kolkata', 'durgapur', 'asansol', 'siliguri', 'howrah', 'darjeeling', 'kharagpur', 
    'haldia', 'bardhaman', 'malda', 'jalpaiguri', 'cooch-behar', 'purulia', 
    'bankura', 'midnapore', 'medinipur', 'krishnanagar', 'barasat', 'barrackpore', 
    'serampore', 'chinsurah', 'shantiniketan', 'bolpur', 'raniganj', 'burnpur', 'salt-lake', 'newtown', 'rajarhat'
  ],
  'bihar': [
    'patna', 'bhagalpur', 'gaya', 'muzaffarpur', 'purnia', 'darbhanga', 'bihar-sharif', 
    'ara', 'arrah', 'begusarai', 'katihar', 'munger', 'chhapra', 'danapur', 'bettiah', 
    'saharsa', 'hajipur', 'sasaram', 'motihari', 'siwan', 'madhubani', 'buxar', 'jehanabad', 
    'aurangabad', 'nawada', 'jamui', 'kishanganj', 'samastipur', 'lakhisarai', 'gopalganj'
  ],
  'madhya-pradesh': [
    'singrauli', 'waidhan', 'bhopal', 'indore', 'jabalpur', 'gwalior', 'ujjain', 'sagar', 
    'dewas', 'satna', 'ratlam', 'rewa', 'katni', 'morwa', 'vindhyanagar', 'jayant', 'dudhichua'
  ],
  'odisha': [
    'bhubaneswar', 'cuttack', 'rourkela', 'brahmapur', 'berhampur', 'sambalpur', 'puri', 
    'balasore', 'bhadrak', 'baripada', 'jharsuguda', 'jeypore', 'rayagada', 'angul', 'balangir'
  ],
  'uttar-pradesh': [
    'lucknow', 'kanpur', 'ghaziabad', 'agra', 'meerut', 'varanasi', 'prayagraj', 'allahabad', 
    'bareilly', 'aligarh', 'moradabad', 'saharanpur', 'gorakhpur', 'noida', 'greater-noida', 
    'jhansi', 'muzaffarnagar', 'mathura', 'ayodhya', 'faizabad', 'firozabad', 'mirzapur', 
    'jaunpur', 'hapur', 'loni', 'pilkhuwa'
  ]
};

const COORDINATES_MAP = {
  'jharkhand': { lat: 23.6102, lon: 85.2799 },
  'west-bengal': { lat: 22.9868, lon: 87.8550 },
  'bihar': { lat: 25.0961, lon: 85.3131 },
  'madhya-pradesh': { lat: 22.9734, lon: 78.6569 },
  'odisha': { lat: 20.9517, lon: 85.0985 },
  'uttar-pradesh': { lat: 26.8467, lon: 80.9462 },
  dhanbad: { lat: 23.7957, lon: 86.4304 },
  ranchi: { lat: 23.3441, lon: 85.3096 },
  bokaro: { lat: 23.6693, lon: 86.1511 },
  deoghar: { lat: 24.4820, lon: 86.7001 },
  jamshedpur: { lat: 22.8046, lon: 86.2029 },
  kolkata: { lat: 22.5726, lon: 88.3639 },
  durgapur: { lat: 23.5204, lon: 87.3119 },
  asansol: { lat: 23.6739, lon: 86.9524 },
  siliguri: { lat: 26.7271, lon: 88.3953 },
  patna: { lat: 25.5941, lon: 85.1376 },
  bhagalpur: { lat: 25.2425, lon: 87.0135 },
  gaya: { lat: 24.7914, lon: 85.0002 },
  muzaffarpur: { lat: 26.1197, lon: 85.3909 },
  singrauli: { lat: 24.1956, lon: 82.6675 },
  waidhan: { lat: 24.0682, lon: 82.5804 },
  bhubaneswar: { lat: 20.2961, lon: 85.8245 },
  cuttack: { lat: 20.4625, lon: 85.8830 },
  lucknow: { lat: 26.8467, lon: 80.9462 },
  kanpur: { lat: 26.4499, lon: 80.3319 },
  ghaziabad: { lat: 28.6692, lon: 77.4538 },
  noida: { lat: 28.5355, lon: 77.3910 },
  hazaribagh: { lat: 24.006557, lon: 85.348945 },
  giridih: { lat: 24.1916, lon: 86.3028 },
  chas: { lat: 23.6337, lon: 86.1770 },
  dumka: { lat: 24.2690, lon: 87.2505 },
  koderma: { lat: 24.4692, lon: 85.5947 },
  sahibganj: { lat: 25.2442, lon: 87.6436 },
  katras: { lat: 23.8043, lon: 86.2818 },
  jharia: { lat: 23.7431, lon: 86.4116 },
  govindpur: { lat: 23.8378, lon: 86.5186 },
  dhansar: { lat: 23.7845, lon: 86.4172 },
  chirkunda: { lat: 23.7381, lon: 86.7972 },
  sindri: { lat: 23.6496, lon: 86.5050 },
  jasidih: { lat: 24.5204, lon: 86.6430 },
  howrah: { lat: 22.5958, lon: 88.2636 },
  kharagpur: { lat: 22.3460, lon: 87.2300 },
  haldia: { lat: 22.0250, lon: 88.0583 },
  bardhaman: { lat: 23.2324, lon: 87.8630 },
  malda: { lat: 25.0108, lon: 88.1411 },
  bankura: { lat: 23.2324, lon: 87.0785 },
  barasat: { lat: 22.7230, lon: 88.4873 },
  barrackpore: { lat: 22.7597, lon: 88.3703 },
  raniganj: { lat: 23.6133, lon: 87.1235 },
  'salt-lake': { lat: 22.5804, lon: 88.4378 },
  newtown: { lat: 22.5878, lon: 88.4682 },
  rajarhat: { lat: 22.6178, lon: 88.5028 },
  purnia: { lat: 25.7771, lon: 87.4753 },
  darbhanga: { lat: 26.1542, lon: 85.8918 },
  ara: { lat: 25.5564, lon: 84.6603 },
  begusarai: { lat: 25.4182, lon: 86.1272 },
  katihar: { lat: 25.5459, lon: 87.5686 },
  chhapra: { lat: 25.7811, lon: 84.7277 },
  sasaram: { lat: 24.9490, lon: 84.0089 },
  motihari: { lat: 26.6522, lon: 84.9082 },
  gopalganj: { lat: 26.4687, lon: 84.4398 },
  indore: { lat: 22.7196, lon: 75.8577 },
  bhopal: { lat: 23.2599, lon: 77.4126 },
  ujjain: { lat: 23.1760, lon: 75.7885 },
  rourkela: { lat: 22.2604, lon: 84.8536 },
  sambalpur: { lat: 21.4669, lon: 83.9812 },
  puri: { lat: 19.8134, lon: 85.8312 },
  prayagraj: { lat: 25.4358, lon: 81.8463 },
  moradabad: { lat: 28.8386, lon: 78.7733 },
  gorakhpur: { lat: 26.7606, lon: 83.3731 },
  'greater-noida': { lat: 28.4744, lon: 77.5030 },
  faizabad: { lat: 26.7797, lon: 82.1400 }
};

export default async function BranchPage({ data, isCity = false, stateData = null }) {
  const galleryPhotos = await getGalleryImages();
  const stateSlug = isCity ? data.stateSlug : data.name.toLowerCase().replace(' ', '-');
  const stateName = isCity ? data.stateName : data.name;
  const cityKey = isCity ? data.name.toLowerCase().replace(/ \(hq\)/i, '').replace(/ /g, '-') : null;
  const cleanCityName = data.name.replace(/ \(hq\)/i, '').replace(/ \(virtual office\)/i, '').replace(/ \(coming soon\)/i, '');
  const activeRoutes = isCity && cityKey ? getRoutesForCity(cityKey, data.name.replace(/ \(hq\)/i, '').replace(/ \(virtual office\)/i, '').replace(/ \(coming soon\)/i, '')) : [];

  const geoCoords = isCity
    ? (COORDINATES_MAP[cityKey] || COORDINATES_MAP[stateSlug])
    : COORDINATES_MAP[stateSlug];

  // Cover image with fallback system
  const initialImage = isCity 
    ? `/images/branches/${stateSlug}-${cityKey}.jpg`
    : `/images/branches/${stateSlug}.jpg`;

  // Aggregate and dynamically localize testimonials (Min 4, Max 6)
  const displayTestimonials = (() => {
    let list = [...(data.testimonials || [])];
    const targetCount = 5; // Aim for 5 reviews for visual layout balance
    
    if (list.length < targetCount) {
      const addedNames = new Set(list.map(t => t.name));
      if (isCity && stateData && stateData.testimonials) {
        stateData.testimonials.forEach(t => {
          if (list.length < targetCount && !addedNames.has(t.name)) {
            list.push(t);
            addedNames.add(t.name);
          }
        });
      }
      if (isCity && stateData && stateData.cities) {
        stateData.cities.forEach(siblingSlug => {
          if (siblingSlug !== cityKey) {
            const siblingData = branchesData.cities[siblingSlug];
            if (siblingData && siblingData.testimonials) {
              siblingData.testimonials.forEach(t => {
                if (list.length < targetCount && !addedNames.has(t.name)) {
                  list.push(t);
                  addedNames.add(t.name);
                }
              });
            }
          }
        });
      }
      if (list.length < targetCount) {
        Object.values(branchesData.states).forEach(st => {
          if (st.testimonials) {
            st.testimonials.forEach(t => {
              if (list.length < targetCount && !addedNames.has(t.name)) {
                list.push(t);
                addedNames.add(t.name);
              }
            });
          }
        });
      }
      if (list.length < targetCount) {
        Object.values(branchesData.cities).forEach(ct => {
          if (ct.testimonials) {
            ct.testimonials.forEach(t => {
              if (list.length < targetCount && !addedNames.has(t.name)) {
                list.push(t);
                addedNames.add(t.name);
              }
            });
          }
        });
      }
    }

    // Limit displayed reviews to min 4 and max 6
    const finalCount = Math.max(4, Math.min(6, list.length));
    const slicedList = list.slice(0, finalCount).map(t => ({ ...t }));

    // Dynamically replace Dhanbad location references on non-Dhanbad/non-Jharkhand views to optimize SEO relevance
    const shouldFilterDhanbad = (isCity && cityKey !== 'dhanbad') || (!isCity && stateSlug !== 'jharkhand');

    return slicedList.map(t => {
      if (t.text && shouldFilterDhanbad) {
        // Global case-insensitive replacement of "Dhanbad"
        t.text = t.text.replace(/Dhanbad/gi, cleanCityName);
        
        if (t.city) {
          t.city = t.city.replace(/Dhanbad/gi, cleanCityName);
        }
      }
      return t;
    });
  })();

  const localitiesList = (() => {
    if (isCity) {
      if (cityKey && LOCALITY_MAP[cityKey]) {
        return LOCALITY_MAP[cityKey];
      }
      const cityName = data.name.replace(/ \(hq\)/i, '');
      return [
        `${cityName} Town`,
        `Station Road Area`,
        `Civil Lines`,
        `Bypass Highway Zone`,
        `Industrial Area`,
        `Sadar Bazar`,
        `New Colony`,
        `Suburban Belt`
      ];
    }
    return [];
  })();

  // Determine active city list (for State pages) or sibling cities (for City pages)
  const citiesList = (() => {
    if (isCity) {
      return stateData ? stateData.cities : [];
    }
    return STATE_CITIES[stateSlug] || data.cities || [];
  })();

  // Merge local FAQs with Global FAQs
  const allFaqs = (() => {
    const localFaqs = data.faqs || [];
    const processedGlobalFaqs = GLOBAL_BRANCH_FAQS.map(faq => {
      let resolvedQ = faq.q.replace(/\[Location\]/g, data.name);
      let resolvedA = faq.a;
      
      if (faq.a === 'cover-query') {
        if (!isCity) {
          const stateCities = data.cities || [];
          if (stateCities.includes('virtual-office')) {
            resolvedA = `We provide seamless virtual logistics coordination and direct transit dispatches to Bhubaneswar, Cuttack, Rourkela, and all other cities in ${data.name}, running operations securely from our central HQ. As a trusted national brand, we coordinate door-to-door relocations from any address in ${data.name} to all states and cities across India.`;
          } else if (stateCities.includes('coming-soon')) {
            resolvedA = `While we are expanding our physical branch footprint in ${data.name} soon, we currently manage daily direct inter-state shifts to Lucknow, Noida, Kanpur, Varanasi, and all major cities across ${data.name}. Our nationwide network covers relocations from any address in ${data.name} to any destination in India.`;
          } else {
            const formattedCities = stateCities.map(c => {
              if (c === 'dhanbad') return 'Dhanbad (HQ)';
              return c.charAt(0).toUpperCase() + c.slice(1);
            }).join(', ');
            resolvedA = `We cover all major hubs across ${data.name}. We coordinate direct door-to-door relocations in ${formattedCities}, and service the entire state of ${data.name} with our own direct container vehicles. As a leading national brand, we handle long-distance moves from any location in ${data.name} to all states and cities across India.`;
          }
        } else {
          const siblingCities = stateData?.cities || [];
          const otherCities = siblingCities
            .filter(c => c !== data.name.toLowerCase().replace(/ \(hq\)/i, ''))
            .map(c => {
              if (c === 'dhanbad') return 'Dhanbad (HQ)';
              return c.charAt(0).toUpperCase() + c.slice(1);
            });
          const otherCitiesText = otherCities.length > 0 
            ? ` (including ${otherCities.join(', ')})`
            : '';
          resolvedA = `Our team coordinates shifting services locally in and around ${data.name}, connects transit routes to other key hubs in ${stateName}${otherCitiesText}. As a premier national brand, we cater to all of India, handling relocations from ${data.name} to any city, state, or destination nationwide with door-to-door coverage.`;
        }
      } else if (faq.a === 'services-query') {
        resolvedA = `We offer Household Relocation, Corporate Office Shifting, Industrial Heavy Transport, and Vehicle Carrier Shifting (Cars/Bikes) in ${data.name}. Click 'View All Services' to explore our storage and warehousing options.`;
      } else {
        resolvedA = resolvedA.replace(/\[Location\]/g, data.name);
      }
      
      return { q: resolvedQ, a: resolvedA };
    });

    const list = [...localFaqs];
    processedGlobalFaqs.forEach(g => {
      if (!list.some(l => l.q.toLowerCase() === g.q.toLowerCase())) {
        list.push(g);
      }
    });
    return list;
  })();

  // Prepare FAQ JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': allFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  // Prepare MovingCompany and reviews rating JSON-LD Schema
  const movingCompanySchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    'name': `National Packers & Movers - ${data.name}`,
    'description': data.introText || data.tagline || `Professional home and office shifting services in ${data.name} by National Packers & Movers.`,
    'telephone': isCity ? (data.phone ? data.phone.split('/')[0].trim() : '9835168368') : '9835168368',
    'priceRange': '$$',
    'image': 'https://www.thenationalpackersmovers.com/photos/packed-goods.jpg',
    'url': `https://www.thenationalpackersmovers.com/branches/${stateSlug}${isCity ? '/' + cityKey : ''}`,
    'logo': 'https://www.thenationalpackersmovers.com/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': isCity ? (data.address || 'Central HQ Address') : `Serving ${data.name} Statewide`,
      'addressLocality': isCity ? data.name.replace(/ \(hq\)/i, '') : data.name,
      'addressRegion': stateName,
      'addressCountry': 'IN'
    },
    'geo': geoCoords ? {
      '@type': 'GeoCoordinates',
      'latitude': geoCoords.lat,
      'longitude': geoCoords.lon
    } : undefined,
    'areaServed': isCity 
      ? (localitiesList.length > 0 ? localitiesList : undefined)
      : (citiesList.length > 0 ? citiesList.map(c => c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')) : undefined),
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    },
    'sameAs': [
      'https://www.facebook.com/thenationalpackersmovers/',
      'https://twitter.com/natpackers',
      'https://www.youtube.com/@nationalpackersmovers',
      ...(data.justdial ? [data.justdial] : [])
    ],
    'parentOrganization': {
      '@type': 'MovingCompany',
      'name': 'National Packers & Movers',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Corporate Headquarters',
        ...(stateSlug === 'jharkhand' ? {
          'addressLocality': 'Dhanbad',
          'addressRegion': 'Jharkhand'
        } : {}),
        'addressCountry': 'IN'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': data.justdialRating ? String(data.justdialRating) : '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'reviewCount': data.justdialReviewCount ? String(data.justdialReviewCount) : String(displayTestimonials.length)
    },
    'review': displayTestimonials.map(t => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': t.name
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': String(t.rating || 5),
        'bestRating': '5',
        'worstRating': '1'
      },
      'reviewBody': t.text
    }))
  };

  // Prepare BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.thenationalpackersmovers.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Branches',
        'item': 'https://www.thenationalpackersmovers.com#branches'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': stateName,
        'item': `https://www.thenationalpackersmovers.com/branches/${stateSlug}`
      },
      ...(isCity ? [{
        '@type': 'ListItem',
        'position': 4,
        'name': data.name.replace(/ \(hq\)/i, ''),
        'item': `https://www.thenationalpackersmovers.com/branches/${stateSlug}/${cityKey}`
      }] : [])
    ]
  };

  return (
    <div className={styles.page} key={data.name}>
      {/* ── SEO JSON-LD Schemas ───────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompanySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`${styles.heroContent} container`}>
          <div className={styles.heroTagWrap}>
            <span className="section-tag">📍 {isCity ? `${data.name}, ${stateName}` : `${stateName} Division`}</span>
          </div>
          <h1 className={styles.heroTitle}>
            Packers &amp; Movers<br />
            <span className={styles.heroGold}>in {data.name}</span><br />
            <span className={styles.heroRed}>Trusted Since 1987</span>
          </h1>
          <p className={styles.heroSubtitle}>
            {isCity 
              ? `Professional home, office, and vehicle relocation services in ${data.name}, ${stateName}. 100% insured, secure packing, and direct transit.`
              : `Leading packers and movers across ${stateName}. Direct transit lines, own container fleet, and IBA-compliant corporate relocation.`
            }
          </p>
          <div className={styles.heroCtas}>
            <Link href="/get-quote" className="btn btn-primary btn-lg">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 Call HQ — 9835168368
            </a>
          </div>
        </div>
        <div className={styles.heroImageSide}>
          <div className={styles.heroPhotoWrapper}>
            <BranchImage
              stateSlug={stateSlug}
              cityKey={cityKey}
              isCity={isCity}
              initialImage={initialImage}
              alt={`National Packers & Movers — Best relocation and shifting services in ${data.name}`}
            />
            <div className={styles.heroPhotoOverlay} />
            <div className={styles.heroBadgeFloat}>
              <span className={styles.heroBadgeNum}>38+</span>
              <span className={styles.heroBadgeTxt}>Years of<br/>Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ─────────────────────────────────── */}
      <section className={styles.statsBar}>
        <div className={`${styles.statsGrid} container`}>
          {(data.stats || stateData?.stats || [
            { number: 120000, suffix: '+', label: 'Moves Completed' },
            { number: 38, suffix: '+', label: 'Years Legacy' },
            { number: 6, suffix: '', label: 'States Served' },
            { number: 100, suffix: '%', label: 'Insured Goods' }
          ]).map((stat, i) => (
            <div key={i} className={styles.statItem} data-reveal="up" data-delay={i * 100}>
              <div className={styles.statNumber}>
                <SlotCounter end={stat.number} suffix={stat.suffix} duration={2000} />
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFICE DETAILS / DIRECTORY LAYOUT ─────────────── */}
      <section className={`section ${styles.detailsSection}`}>
        <div className="container">
          <div className={styles.detailsGrid}>
            
            {/* Left Content Column */}
            <div className={styles.detailsContent} data-reveal="up" data-delay="100">
              <span className="section-tag" style={{ textAlign: 'left', paddingLeft: 0 }}>Company Legacy</span>
              <h2 className={styles.sectionTitleLeft}>
                {data.introTitle || data.tagline || `About Our ${data.name} Operations`}
              </h2>
              <div className="divider divider-left" />
              <p className={styles.introParagraph}>{data.introText}</p>
              
              <div className={styles.uspPoints}>
                <div className={styles.uspPoint}>
                  <span className={styles.uspIcon}>🏆</span>
                  <div>
                    <strong>38+ Years of Honesty</strong>
                    <p>Founded in 1987 by Debabrata Jhampaty, operating on principles, not just policies.</p>
                  </div>
                </div>
                <div className={styles.uspPoint}>
                  <span className={styles.uspIcon}>🛡️</span>
                  <div>
                    <strong>100% Insured Shifting</strong>
                    <p>Complete peace of mind with transit insurance covering all household & commercial items.</p>
                  </div>
                </div>
                <div className={styles.uspPoint}>
                  <span className={styles.uspIcon}>🚛</span>
                  <div>
                    <strong>Owned Container Vehicles</strong>
                    <p>We use our own GPS-tracked container trucks to eliminate intermediate reloading risks.</p>
                  </div>
                </div>
              </div>

              {/* Local Operations & Fleet in Action interactive showcase */}
              <LocalOperationsShowcase cityName={data.name} styles={styles} />

              {/* Localized PSU Shifting Claim Approval Kit B2B Callout */}
              <PsuCalloutCard cityName={data.name} isBranchPage={true} />

              {/* Detailed Shifting & Logistics Services */}
              <div className={styles.detailedServicesSection} data-reveal="up" data-delay="150">
                <h3 className={styles.detailedServicesMainTitle}>
                  Shifting &amp; Logistics Services in <span>{cleanCityName}</span>
                </h3>
                <div className={styles.detailedServicesList}>
                  {DETAILED_SERVICES_TEMPLATE.map((service) => {
                    const textSpun = service.text.replace(/\[Location\]/g, cleanCityName);
                    return (
                      <div key={service.slug} className={styles.detailedServiceCard} style={{ '--accent': service.color }}>
                        <h4 className={styles.detailedServiceTitle}>
                          <span className={styles.detailedServiceIcon}>{service.icon}</span>
                          {service.title} in {cleanCityName}
                        </h4>
                        <p className={styles.detailedServiceText}>{textSpun}</p>
                        <div className={styles.detailedServiceHighlights}>
                          {service.highlights.map((highlight, hIdx) => (
                            <span key={hIdx} className={styles.detailedHighlightTag}>
                              <span className={styles.detailedHighlightCheck}>✓</span> {highlight}
                            </span>
                          ))}
                        </div>
                        <Link href={`/services/${service.slug}`} className={styles.detailedServiceLink}>
                          Learn More ➔
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


            {/* Right Contact Card / Navigation Column */}
            <div className={styles.sidebar}>
              {isCity ? (
                <>
                  {/* Contact Details Card for City */}
                  <div className={styles.sidebarCard} data-reveal="up" data-delay="200">
                    <h3 className={styles.sidebarTitle}>📍 Branch Address</h3>
                    <div className={styles.sidebarDivider} />
                    <p className={styles.branchAddress}>{data.address}</p>
                    
                    <div className={styles.mapEmbedContainer}>
                      <iframe 
                        src={data.mapEmbed || `https://maps.google.com/maps?q=${encodeURIComponent(data.name.includes('Coming Soon') ? data.stateName : `${data.name.replace(/ \(hq\)/i, '')}, ${data.stateName}`)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                        width="100%" 
                        height="200" 
                        style={{ border: 0, borderRadius: '6px', marginTop: '1rem', display: 'block' }} 
                        allowFullScreen="" 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${data.name} Location Map`}
                      />
                    </div>
                    
                    <h3 className={styles.sidebarTitle} style={{ marginTop: '1.5rem' }}>📞 Phone Numbers</h3>
                    <div className={styles.sidebarDivider} />
                    <div className={styles.sidebarPhones}>
                      <a href={`tel:${data.phone.split('/')[0].trim()}`} className={styles.phoneLink}>
                        ☎️ {data.phone.split('/')[0].trim()}
                      </a>
                      {data.phone.split('/')[1] && (
                        <a href={`tel:${data.phone.split('/')[1].trim()}`} className={styles.phoneLink}>
                          ☎️ {data.phone.split('/')[1].trim()}
                        </a>
                      )}
                    </div>
                    
                    <h3 className={styles.sidebarTitle} style={{ marginTop: '1.5rem' }}>✉️ Corporate Email</h3>
                    <div className={styles.sidebarDivider} />
                    <a href="mailto:npmdhanbad11@gmail.com" className={styles.emailLink}>
                      npmdhanbad11@gmail.com
                    </a>

                    <div className={styles.sidebarSurveyCTA}>
                      <p>Need a quick surveyor visit?</p>
                      <Link href="/get-quote" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                        🚀 Schedule Free Survey
                      </Link>
                    </div>
                  </div>

                  {/* Justdial Verified Rating Badge */}
                  {isCity && data.justdial && (
                    <div className={styles.sidebarCard} style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #1C2B40 0%, #0F1A2A 100%)', borderColor: 'rgba(247, 183, 49, 0.25)' }} data-reveal="up" data-delay="210">
                      <h3 className={styles.sidebarTitle} style={{ color: 'var(--gold)' }}>🌟 Justdial Verified</h3>
                      <div className={styles.sidebarDivider} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                        <span style={{ fontSize: '2.2rem', color: '#F7B731', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                          {data.justdialRating ? Number(data.justdialRating).toFixed(1) : '4.7'}
                        </span>
                        <div>
                          <div style={{ color: '#F7B731', fontSize: '1.1rem', letterSpacing: '1px' }}>
                            {"★".repeat(Math.round(data.justdialRating || 4.7)) + "☆".repeat(5 - Math.round(data.justdialRating || 4.7))}
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--gray-300)', margin: 0 }}>
                            {data.justdialReviewCount ? `${data.justdialReviewCount}+` : '490+'} Customer Ratings
                          </p>
                        </div>
                      </div>
                      <a 
                        href={data.justdial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', borderColor: '#F7B731', color: 'var(--white)' }}
                      >
                        View Justdial Profile ➔
                      </a>
                    </div>
                  )}

                  {/* Areas Served Card (City Pages Only) */}
                  {isCity && localitiesList.length > 0 && (
                    <div className={styles.localitiesCard} data-reveal="up" data-delay="250">
                      <h3 className={styles.sidebarTitle}>📍 Areas Served in {data.name.replace(/ \(hq\)/i, '')}</h3>
                      <div className={styles.sidebarDivider} />
                      <p className={styles.localitiesIntro}>
                        We offer doorstep packing and shifting services across all major localities in {data.name.replace(/ \(hq\)/i, '')}:
                      </p>
                      <div className={styles.localitiesGrid}>
                        {localitiesList.map((locality, idx) => (
                          <span key={idx} className={styles.localityBadge}>
                            {locality}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Routes Card (City Pages Only) */}
                  {isCity && activeRoutes.length > 0 && (
                    <div className={styles.sidebarCard} data-reveal="up" data-delay="260">
                      <h3 className={styles.sidebarTitle}>🚚 Popular Transit Lanes</h3>
                      <div className={styles.sidebarDivider} />
                      <p className={styles.localitiesIntro}>
                        Direct container transport and packers services connecting {data.name.replace(/ \(hq\)/i, '')} to major national destinations:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                        {activeRoutes.map((r, idx) => (
                          <Link 
                            key={idx} 
                            href={`/routes/${r.origin}-to-${r.destination}`} 
                            className={styles.routeLink}
                          >
                            <span>📍 {r.originName} to {r.destinationName}</span>
                            <span className={styles.routeLinkArrow}>View Rates ➔</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Cities List for State */}
                  <div className={styles.sidebarCard} data-reveal="up" data-delay="200">
                    <h3 className={styles.sidebarTitle}>🏙️ Cities Covered in {data.name}</h3>
                    <div className={styles.sidebarDivider} />
                    <div className={styles.stateCitiesGrid}>
                      {citiesList.length > 0 && citiesList[0] !== 'coming-soon' && citiesList[0] !== 'virtual-office' ? (
                        citiesList.map((citySlug) => {
                          const cityName = citySlug
                            .split('-')
                            .map(word => {
                              if (word === 'hq') return '(HQ)';
                              if (word === 'bsl') return 'BSL';
                              if (word === 'psu') return 'PSU';
                              return word.charAt(0).toUpperCase() + word.slice(1);
                            })
                            .join(' ');
                          return (
                            <Link key={citySlug} href={`/branches/${stateSlug}/${citySlug}`} className={styles.cityBadge}>
                              📍 {cityName}
                            </Link>
                          );
                        })
                      ) : (
                        <p className={styles.sidebarNotice}>
                          {citiesList[0] === 'virtual-office' 
                            ? 'We offer virtual logistics coordination in Odisha. All operations are run from our main HQ.'
                            : 'Physical branches are coming soon to major cities. Inter-state trucks are active daily.'
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Territory Map for State */}
                  <div className={styles.sidebarCard} style={{ marginTop: '1.5rem' }} data-reveal="up" data-delay="210">
                    <h3 className={styles.sidebarTitle}>🗺️ {data.name} Territory Map</h3>
                    <div className={styles.sidebarDivider} />
                    <div className={styles.mapEmbedContainer}>
                      <iframe 
                        src={data.mapEmbed || `https://maps.google.com/maps?q=${encodeURIComponent(data.name)}&t=&z=8&ie=UTF8&iwloc=&output=embed`}
                        width="100%" 
                        height="200" 
                        style={{ border: 0, borderRadius: '6px', marginTop: '1rem', display: 'block' }} 
                        allowFullScreen="" 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${data.name} Service Map`}
                      />
                    </div>
                  </div>

                  {/* Popular State Routes Card (State Pages Only) */}
                  {!isCity && stateSlug && (
                    <div className={styles.sidebarCard} style={{ marginTop: '1.5rem' }} data-reveal="up" data-delay="220">
                      <h3 className={styles.sidebarTitle}>🚚 Popular Transit Lanes</h3>
                      <div className={styles.sidebarDivider} />
                      <p className={styles.localitiesIntro}>
                        Explore direct container shifting rates connecting {data.name} to major national hubs:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                        {getRoutesForState(stateSlug, citiesList).map((r, idx) => (
                          <Link 
                            key={idx} 
                            href={`/routes/${r.origin}-to-${r.destination}`} 
                            className={styles.routeLink}
                          >
                            <span>📍 {r.originName} to {r.destinationName}</span>
                            <span className={styles.routeLinkArrow}>View Rates ➔</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 🛡️ Verified Credentials Card */}
              <div className={styles.credentialsCard} data-reveal="up" data-delay="280">
                <h3 className={styles.sidebarTitle}>🛡️ Verified Credentials</h3>
                <div className={styles.sidebarDivider} />
                <div className={styles.credentialsGrid}>
                  <div className={styles.credentialItem}>
                    <span className={styles.credentialIcon}>📜</span>
                    <div>
                      <strong>GSTIN Tax Invoice</strong>
                      <p className={styles.credentialVal}>20AIHPJ7005R1Z6</p>
                    </div>
                  </div>
                  <div className={styles.credentialItem}>
                    <span className={styles.credentialIcon}>🆔</span>
                    <div>
                      <strong>Govt. Regd. Number</strong>
                      <p className={styles.credentialVal}>Regd No. 0039</p>
                    </div>
                  </div>
                  <div className={styles.credentialItem}>
                    <span className={styles.credentialIcon}>✅</span>
                    <div>
                      <strong>IBA-Approved Movers</strong>
                      <p className={styles.credentialVal}>Accepted by PSUs & Banks</p>
                    </div>
                  </div>
                  <div className={styles.credentialItem}>
                    <span className={styles.credentialIcon}>🎗️</span>
                    <div>
                      <strong>Quality Standard</strong>
                      <p className={styles.credentialVal}>ISO 9001:2015 Certified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📋 PSU Shifting Reimbursement Kit Card */}
              <div className={styles.reimbursementCard} data-reveal="up" data-delay="290">
                <h3 className={styles.sidebarTitle}>📋 PSU Claim Documents</h3>
                <div className={styles.sidebarDivider} />
                <p className={styles.reimbursementIntro}>
                  We provide 100% compliant documentation kit to guarantee seamless relocation allowance claims for PSU, Bank, and Railway transfers in {data.name}:
                </p>
                <ul className={styles.reimbursementList}>
                  <li><span>✓</span> GST-Registered Tax Invoice (SAC 9965)</li>
                  <li><span>✓</span> Consignment Note (Lorry Receipt / LR Copy)</li>
                  <li><span>✓</span> Stamped Money Receipt / Payment Voucher</li>
                  <li><span>✓</span> Official Itemized Packing Checklist</li>
                  <li><span>✓</span> IBA-Aligned Transport Bill Formats</li>
                </ul>
              </div>

              {/* Sibling Branch Navigation Box for SEO Internal Linking */}
              <div className={styles.sidebarNav} data-reveal="up" data-delay="300">
                <h4 className={styles.sidebarNavTitle}>Our Active Network</h4>
                <div className={styles.networkLinks}>
                  <Link href="/branches/jharkhand" className={styles.networkLink}>Jharkhand (HQ)</Link>
                  <Link href="/branches/west-bengal" className={styles.networkLink}>West Bengal</Link>
                  <Link href="/branches/bihar" className={styles.networkLink}>Bihar</Link>
                  <Link href="/branches/madhya-pradesh" className={styles.networkLink}>Madhya Pradesh</Link>
                  <Link href="/branches/odisha" className={styles.networkLink}>Odisha</Link>
                  <Link href="/branches/uttar-pradesh" className={styles.networkLink}>Uttar Pradesh</Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────── */}
      <section className={`section bg-section-dark`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">What You Get</span>
            <h2 className="section-title">Relocation <span>Benefits</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Everything you need for a stress-free move in {data.name} — handled end-to-end by trained professionals.
            </p>
          </div>
          <div className={styles.includedGrid}>
            {WHAT_YOU_GET.map((item, i) => (
              <div key={i} className={styles.includedItem} data-reveal="up" data-delay={i * 70}>
                <span className={styles.includedCheck}>✓</span>
                <div>
                  <strong className={styles.includedTitle}>{item.title}</strong>
                  <p className={styles.includedDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTIMATOR SECTION (Volume Calculator client leaf) ── */}
      <CalculatorModal cityName={data.name} />

      {/* ── RATES SECTION ─────────────────────────────────── */}
      <section className={`section ${styles.ratesSection}`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Pricing Guide</span>
            <h2 className="section-title">Estimated Shifting <span>Rates in {data.name}</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Get an approximate estimate of our shifting charges in {data.name} for local and domestic relocations.
            </p>
          </div>
          <div className={styles.ratesTableCard} data-reveal="up" data-delay="100">
            <div className={styles.tableWrap}>
              <table className={styles.ratesTable}>
                <thead>
                  <tr>
                    <th>Shifting Service</th>
                    <th>Local Shifting (Within 15km)</th>
                    <th>Domestic Shifting (Inter-State)</th>
                  </tr>
                </thead>
            <tbody>
              {ratesData.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.service}</strong></td>
                  <td>{row.local}</td>
                  <td>{row.domestic}</td>
                </tr>
              ))}
            </tbody>
              </table>
            </div>
            <p className={styles.ratesDisclaimer}>
              💡 <strong>Important Disclaimer:</strong> These are estimated price ranges based on average moves. The actual cost of relocation in {data.name} depends on the exact volume of goods, type of packing material, building floor level (lift availability), total distance, chosen service type, and whether a standard or premium relocation package is selected. Final shifting quotes are provided after a free, zero-obligation pre-move survey.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────── */}
      <section className={`section ${styles.processSection}`}>
        <div className={styles.processBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" data-reveal="up">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our <span>Step-by-Step</span> Process</h2>
            <div className="divider" />
            <p className="section-subtitle">
              A proven, systematic approach refined over 38 years of moving excellence in {data.name} — zero guesswork, zero surprises.
            </p>
          </div>
          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className={styles.processCard} data-reveal="up" data-delay={i * 80}>
                <div className={styles.processStep}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className={`section bg-section-dark ${styles.whySection}`}>
        <div className={styles.whyBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Why Choose National <span>in {data.name}</span></h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="card" data-reveal="up" data-delay={i * 80}>
                <div className="icon-box" style={{ marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL SERVICES GRID ─────────────────────────────── */}
      <section className={`section`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Relocation Services</span>
            <h2 className="section-title">Services Available in <span>{data.name}</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              We offer comprehensive logistics &amp; moving support in {data.name}. Click on any service to read details.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {RELOCATION_SERVICES.map((service, i) => (
              <Link 
                key={service.slug} 
                href={`/services/${service.slug}`} 
                className={styles.serviceCard} 
                style={{ '--accent': service.color }}
                data-reveal="up" 
                data-delay={i * 80}
              >
                <div className={styles.serviceIconWrap}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <span className={styles.serviceArrow}>Learn More →</span>
              </Link>
            ))}
          </div>
          <div className={styles.allServicesLink} data-reveal="up">
            <Link href="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION (BranchTestimonials client leaf) ── */}
      {displayTestimonials && displayTestimonials.length > 0 && (
        <section className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <div className="section-header" data-reveal="up">
              <span className="section-tag">Reviews</span>
              <h2 className="section-title">What {data.name} <span>Clients Say</span></h2>
              <div className="divider" />
            </div>
            <BranchTestimonials testimonials={displayTestimonials} cityName={data.name} />
          </div>
        </section>
      )}

      {/* ── GALLERY SECTION ────────────────────────────────── */}
      <GalleryCarousel photos={galleryPhotos} />

      {/* ── FAQ SECTION (Native details/summary tags) ── */}
      {allFaqs && allFaqs.length > 0 && (
        <section className={`section bg-section-dark`}>
          <div className="container">
            <div className="section-header" data-reveal="up">
              <span className="section-tag">Help Desk</span>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
              <div className="divider" />
            </div>
            <div className={styles.faqList}>
              <FaqAccordion
                faqs={allFaqs}
                renderSchema={false}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER SECTION ────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={`${styles.ctaContent} container`} data-reveal="up">
          <h2 className={styles.ctaTitle}>Ready for a Stress-Free Relocation from {data.name}?</h2>
          <p className={styles.ctaSubtitle}>
            Get a precise, fully customized shifting quotation in under 2 hours. Our team is active 7 days a week.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/get-quote" className="btn btn-white btn-lg">
              🚀 Get Free Quote
            </Link>
            <a href="tel:9835168368" className="btn btn-secondary btn-lg">
              📞 9835168368
            </a>
            <a
              href="https://wa.me/919835168368"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA BAR ─────────────────────────── */}
      <div className={styles.stickyMobileCta}>
        <a href="tel:9835168368" className={styles.stickyBtn}>
          <span>📞</span> Call HQ
        </a>
        <a 
          href="https://wa.me/919835168368" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.stickyBtn} ${styles.stickyBtnWhatsapp}`}
        >
          <span>💬</span> WhatsApp
        </a>
        <Link href="/get-quote" className={`${styles.stickyBtn} ${styles.stickyBtnQuote}`}>
          <span>🚀</span> Get Quote
        </Link>
      </div>

    </div>
  );
}
