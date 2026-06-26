import { notFound } from 'next/navigation';
import { branchesData } from '@/data/branchesData';
import BranchPage from '@/components/BranchPage/BranchPage';
import { getCustomMetadata } from '@/lib/supabase';

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
    'haldia', 'bardhaman', 'burdwan', 'malda', 'jalpaiguri', 'cooch-behar', 'purulia', 
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
    'jaunpur', 'hapur', 'loni', 'pilkhuwa', 'coming-soon'
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
    // Programmatic fallback for unregistered cities in active states
    const formattedCity = formatCityName(city);
    defaultTitle = `Best Packers and Movers in ${formattedCity} | National Packers & Movers`;
    defaultDescription = `Reliable home shifting, office relocation, and vehicle transport services in ${formattedCity}, ${stateName}. 100% insured, secure packing, transparent rates. Get a free quote.`;
    defaultKeywords = `packers and movers ${city}, best packers movers ${city}, shifting services ${city}, house shifting ${city}, vehicle transport ${city}`;
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

  let cityData = branchesData.cities[city];
  
  // If registered and matches current state slug
  if (cityData && cityData.stateSlug === state) {
    return <BranchPage data={cityData} isCity={true} stateData={stateData} />;
  }

  // Dynamic fallback for unregistered cities
  const formattedCity = formatCityName(city);
  cityData = {
    name: formattedCity,
    stateSlug: state,
    stateName: stateName,
    title: `Best Packers and Movers in ${formattedCity} | National Packers & Movers`,
    description: `Reliable home shifting, office relocation, and vehicle transport services in ${formattedCity}, ${stateName}. 100% insured, secure packing, transparent rates. Get a free quote.`,
    keywords: `packers and movers ${city}, best packers movers ${city}, shifting services ${city}, house shifting ${city}, vehicle transport ${city}`,
    address: `Doorstep relocation service across ${formattedCity} and surrounding areas, ${stateName} — Coordinated via HQ`,
    phone: '9835168368 / 9934166164',
    tagline: `Your Trusted Shifting Partners in ${formattedCity}`,
    introText: `National Packers & Movers brings our 38+ years of logistics excellence and honest service to ${formattedCity}, ${stateName}. Specializing in household relocations, vehicle shifting, and corporate office moves, our background-verified teams coordinate complete relocations from any neighborhood in ${formattedCity} to any destination across India, backed by direct lockable container vehicles and full transit insurance.`,
    faqs: [],
    testimonials: [],
    isProgrammatic: true,
  };

  return <BranchPage data={cityData} isCity={true} stateData={stateData} />;
}

