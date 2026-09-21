import { notFound } from 'next/navigation';
import { branchesData } from '@/data/branchesData';
import BranchPage from '@/components/BranchPage/BranchPage';
import { getCustomMetadata, getCustomerReviews } from '@/lib/supabase';

const ALLOWED_STATES = {
  'jharkhand': 'Jharkhand',
  'west-bengal': 'West Bengal',
  'bihar': 'Bihar',
  'madhya-pradesh': 'Madhya Pradesh',
  'odisha': 'Odisha',
  'uttar-pradesh': 'Uttar Pradesh'
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

function formatCityName(slug) {
  return slug
    .split('-')
    .map(word => {
      if (word === 'hq') return '(HQ)';
      if (word === 'bsl') return 'BSL';
      if (word === 'psu') return 'PSU';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function getDeterministicIndex(str, count) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % count;
}

function getSpunContent(city, stateName) {
  const formattedCity = formatCityName(city);
  const idx = getDeterministicIndex(city.toLowerCase(), 3);

  const titles = [
    `Best Packers and Movers in ${formattedCity} | National Packers & Movers`,
    `Professional Shifting & Packers Movers in ${formattedCity} | NPM`,
    `Trusted Packers and Movers ${formattedCity} | Safe Home Shifting`
  ];

  const taglines = [
    `Your Trusted Shifting Partners in ${formattedCity}`,
    `38+ Years of Honest Packing & Shifting in ${formattedCity}`,
    `Zero-Hassle Household & Vehicle Relocations in ${formattedCity}`
  ];

  const descriptions = [
    `Reliable home shifting, office relocation, and vehicle transport services in ${formattedCity}, ${stateName}. 100% insured, secure packing, transparent rates. Get a free quote.`,
    `Looking for top packers and movers in ${formattedCity}, ${stateName}? Get IBA-compliant bills, secure container shipping, and damage-free moving. Call today for a free quote!`,
    `Trusted house shifting and logistics services in ${formattedCity}, ${stateName}. National Packers & Movers offers background-verified crews and locked containers. Secure your shift!`
  ];

  const intros = [
    `National Packers & Movers brings our 38+ years of logistics excellence and honest service to ${formattedCity}, ${stateName}. Specializing in household relocations, vehicle shifting, and corporate office moves, our background-verified teams coordinate complete relocations from any neighborhood in ${formattedCity} to any destination across India, backed by direct lockable container vehicles and full transit insurance.`,
    `Established in 1987, National Packers & Movers provides premium, stress-free shifting solutions in ${formattedCity}, ${stateName}. We specialize in high-end household relocation and secure vehicle carriage using our own closed-container trucks. Our trained and verified packing staff manages the entire move from your doorstep in ${formattedCity} to any city in India, offering full transit insurance coverage and genuine billing.`,
    `Secure your home or office shift in ${formattedCity}, ${stateName} with National Packers & Movers. Bringing nearly four decades of transport experience, we deliver fully insured household relocation, bike transport, and office shifting services. Coordinated securely via our central operations hubs, our teams ensure honest rates with no hidden fees and provide PSU-compliant reimbursement bills.`
  ];

  const keywordsList = [
    `packers and movers ${city}, best packers movers ${city}, shifting services ${city}, house shifting ${city}, vehicle transport ${city}`,
    `packers and movers in ${city}, household shifting ${city}, home relocation ${city} ${stateName.toLowerCase()}, vehicle transport ${city}`,
    `best shifting company ${city}, packers movers ${city} ${stateName.toLowerCase()}, house moving ${city}, packers and movers near me`
  ];

  return {
    title: titles[idx],
    tagline: taglines[idx],
    description: descriptions[idx],
    introText: intros[idx],
    keywords: keywordsList[idx]
  };
}

// Enable static generation for all pre-defined active city routes at build time
export async function generateStaticParams() {
  const params = [];
  
  Object.entries(branchesData.states).forEach(([stateSlug, stateData]) => {
    stateData.cities.forEach((citySlug) => {
      // Exclude structural/placeholder states (like coming-soon or virtual-office)
      if (citySlug !== 'coming-soon' && citySlug !== 'virtual-office') {
        params.push({
          state: stateSlug,
          city: citySlug,
        });
      }
    });
  });

  return params;
}

// Generate dynamic SEO metadata per city (with catch-all support)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { state, city } = resolvedParams;
  
  const stateName = ALLOWED_STATES[state];
  if (!stateName) {
    return {
      title: 'Branch Not Found | National Packers & Movers',
      description: 'The requested state branch directory could not be located.',
    };
  }

  // Validate if city belongs to the state (registered or known fallback city)
  const isValidCityForState = 
    (branchesData.cities[city] && branchesData.cities[city].stateSlug === state) ||
    (STATE_CITIES[state] && STATE_CITIES[state].includes(city.toLowerCase()));

  if (!isValidCityForState) {
    return {
      title: 'City Not Found | National Packers & Movers',
      description: 'The requested city relocation branch could not be located.',
    };
  }

  const path = `/branches/${state}/${city}`;
  const custom = await getCustomMetadata(path);

  const cityData = branchesData.cities[city];
  let defaultTitle = '';
  let defaultDescription = '';
  let defaultKeywords = '';

  // If registered and belongs to the correct state
  if (cityData && cityData.stateSlug === state) {
    defaultTitle = cityData.title;
    defaultDescription = cityData.description;
    defaultKeywords = cityData.keywords;
  } else {
    // Programmatic fallback with deterministic template spinning for SEO optimization
    const spun = getSpunContent(city, stateName);
    defaultTitle = spun.title;
    defaultDescription = spun.description;
    defaultKeywords = spun.keywords;
  }

  const title = custom?.meta_title || defaultTitle;
  const description = custom?.meta_description || defaultDescription;
  const keywords = custom?.meta_keywords || defaultKeywords;
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

export default async function CityBranchPage({ params }) {
  const resolvedParams = await params;
  const { state, city } = resolvedParams;

  const stateName = ALLOWED_STATES[state];
  const stateData = branchesData.states[state];

  // If state is not in our allowed whitelist, return 404
  if (!stateName || !stateData) {
    notFound();
  }

  // Validate if city belongs to this state
  const isValidCityForState = 
    (branchesData.cities[city] && branchesData.cities[city].stateSlug === state) ||
    (STATE_CITIES[state] && STATE_CITIES[state].includes(city.toLowerCase()));

  if (!isValidCityForState) {
    notFound();
  }

  // Fetch live customer reviews for this specific city
  const liveReviews = await getCustomerReviews({ city_slug: city, status: 'approved', limit: 20 });

  let cityData = branchesData.cities[city];
  
  // If registered and matches current state slug
  if (cityData && cityData.stateSlug === state) {
    return <BranchPage data={cityData} isCity={true} stateData={stateData} liveReviews={liveReviews} />;
  }

  // Dynamic fallback for unregistered cities with deterministic template spinning for SEO optimization
  const formattedCity = formatCityName(city);
  const spun = getSpunContent(city, stateName);
  cityData = {
    name: formattedCity,
    stateSlug: state,
    stateName: stateName,
    title: spun.title,
    description: spun.description,
    keywords: spun.keywords,
    address: `Doorstep relocation service across ${formattedCity} and surrounding areas, ${stateName} — Coordinated via HQ`,
    phone: '9835168368 / 9934166164',
    tagline: spun.tagline,
    introText: spun.introText,
    faqs: [],
    testimonials: [],
    isProgrammatic: true,
  };

  return <BranchPage data={cityData} isCity={true} stateData={stateData} liveReviews={liveReviews} />;
}

