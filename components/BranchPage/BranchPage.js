'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { branchesData } from '@/data/branchesData';
import styles from './BranchPage.module.css';
import SlotCounter from '@/components/animations/SlotCounter';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';

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

const INVENTORY_ITEMS = [
  { id: 'doubleBed', name: 'Double Bed (with Mattress)', volume: 60, icon: '🛏️', category: 'Furniture' },
  { id: 'singleBed', name: 'Single Bed (with Mattress)', volume: 30, icon: '🛏️', category: 'Furniture' },
  { id: 'wardrobe', name: 'Large Wardrobe', volume: 50, icon: '🚪', category: 'Furniture' },
  { id: 'sofaSet', name: 'Sofa Set (3-Seater)', volume: 35, icon: '🛋️', category: 'Furniture' },
  { id: 'diningTable', name: 'Dining Table (4 Chairs)', volume: 40, icon: '🪑', category: 'Furniture' },
  { id: 'studyTable', name: 'Study / Center Table', volume: 12, icon: '📝', category: 'Furniture' },
  { id: 'fridge', name: 'Refrigerator', volume: 30, icon: '❄️', category: 'Appliances' },
  { id: 'washer', name: 'Washing Machine', volume: 20, icon: '🧼', category: 'Appliances' },
  { id: 'ac', name: 'Air Conditioner (AC)', volume: 15, icon: '💨', category: 'Appliances' },
  { id: 'tv', name: 'LED TV with Stand', volume: 15, icon: '📺', category: 'Appliances' },
  { id: 'microwave', name: 'Microwave Oven', volume: 5, icon: '⚡', category: 'Appliances' },
  { id: 'box', name: 'Shifting Carton (Standard)', volume: 3, icon: '📦', category: 'Boxes & Bags' },
  { id: 'bag', name: 'Suitcase / Travel Bag', volume: 4, icon: '💼', category: 'Boxes & Bags' }
];

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
    'haldia', 'bardhaman', 'burdwan', 'malda', 'jaljaiguri', 'cooch-behar', 'purulia', 
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
    'balasore', 'bhadrak', 'baripada', 'jharsuguda', 'jeypore', 'rayagada', 'angul', 'balangir', 'virtual-office'
  ],
  'uttar-pradesh': [
    'lucknow', 'kanpur', 'ghaziabad', 'agra', 'meerut', 'varanasi', 'prayagraj', 'allahabad', 
    'bareilly', 'aligarh', 'moradabad', 'saharanpur', 'gorakhpur', 'noida', 'greater-noida', 
    'jhansi', 'muzaffarnagar', 'mathura', 'ayodhya', 'faizabad', 'firozabad', 'mirzapur', 
    'jaunpur', 'hapur', 'loni', 'pilkhuwa', 'coming-soon'
  ]
};

export default function BranchPage({ data, isCity = false, stateData = null }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stateSlug = isCity ? data.stateSlug : data.name.toLowerCase().replace(' ', '-');
  const stateName = isCity ? data.stateName : data.name;
  const cityKey = isCity ? data.name.toLowerCase().replace(/ \(hq\)/i, '').replace(/ /g, '-') : null;

  // Cover image with fallback system
  const initialImage = isCity 
    ? `/images/branches/${stateSlug}-${cityKey}.jpg`
    : `/images/branches/${stateSlug}.jpg`;

  const [imageSrc, setImageSrc] = useState(initialImage);

  useEffect(() => {
    setImageSrc(initialImage);
  }, [stateSlug, cityKey, isCity, initialImage]);

  const handleImageError = () => {
    if (imageSrc === `/images/branches/${stateSlug}-${cityKey}.jpg`) {
      setImageSrc(`/images/branches/${stateSlug}.jpg`);
    } else if (imageSrc === `/images/branches/${stateSlug}.jpg`) {
      setImageSrc(`/images/branches/default.jpg`);
    }
  };

  const displayTestimonials = useMemo(() => {
    let list = [...(data.testimonials || [])];
    
    // Ensure we have at least 5 testimonials for SEO/display dynamically
    if (list.length < 5) {
      const addedNames = new Set(list.map(t => t.name));
      
      // 1. If city page, try to pull from state testimonials
      if (isCity && stateData && stateData.testimonials) {
        stateData.testimonials.forEach(t => {
          if (list.length < 5 && !addedNames.has(t.name)) {
            list.push(t);
            addedNames.add(t.name);
          }
        });
      }
      
      // 2. Try to pull from sibling cities in the same state
      if (isCity && stateData && stateData.cities) {
        stateData.cities.forEach(siblingSlug => {
          if (siblingSlug !== cityKey) {
            const siblingData = branchesData.cities[siblingSlug];
            if (siblingData && siblingData.testimonials) {
              siblingData.testimonials.forEach(t => {
                if (list.length < 5 && !addedNames.has(t.name)) {
                  list.push(t);
                  addedNames.add(t.name);
                }
              });
            }
          }
        });
      }

      // 3. Try to pull from other states' testimonials
      if (list.length < 5) {
        Object.values(branchesData.states).forEach(st => {
          if (st.testimonials) {
            st.testimonials.forEach(t => {
              if (list.length < 5 && !addedNames.has(t.name)) {
                list.push(t);
                addedNames.add(t.name);
              }
            });
          }
        });
      }

      // 4. Try to pull from other cities' testimonials
      if (list.length < 5) {
        Object.values(branchesData.cities).forEach(ct => {
          if (ct.testimonials) {
            ct.testimonials.forEach(t => {
              if (list.length < 5 && !addedNames.has(t.name)) {
                list.push(t);
                addedNames.add(t.name);
              }
            });
          }
        });
      }
    }
    
    return list;
  }, [data.testimonials, isCity, stateData, cityKey]);

  useEffect(() => {
    if (!displayTestimonials || displayTestimonials.length <= 1) return;
    setActiveTestimonial(0);
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % displayTestimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [displayTestimonials]);
  const [inventory, setInventory] = useState({
    doubleBed: 0,
    singleBed: 0,
    wardrobe: 0,
    sofaSet: 0,
    diningTable: 0,
    studyTable: 0,
    fridge: 0,
    washer: 0,
    ac: 0,
    tv: 0,
    microwave: 0,
    box: 0,
    bag: 0
  });

  const handleItemChange = (id, delta) => {
    setInventory(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const handleResetInventory = () => {
    setInventory({
      doubleBed: 0, singleBed: 0, wardrobe: 0, sofaSet: 0, diningTable: 0, studyTable: 0,
      fridge: 0, washer: 0, ac: 0, tv: 0, microwave: 0, box: 0, bag: 0
    });
  };

  const totalCft = INVENTORY_ITEMS.reduce((sum, item) => sum + (inventory[item.id] || 0) * item.volume, 0);

  const localitiesList = useMemo(() => {
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
  }, [isCity, cityKey, data.name]);

  const priceEstimates = useMemo(() => {
    if (totalCft === 0) return { local: '—', domestic: '—' };
    
    let localMin = 0, localMax = 0, domesticMin = 0, domesticMax = 0;
    
    if (totalCft <= 80) {
      localMin = 3000; localMax = 5000;
      domesticMin = 8000; domesticMax = 14000;
    } else if (totalCft <= 220) {
      localMin = 4500; localMax = 7500;
      domesticMin = 12000; domesticMax = 20000;
    } else if (totalCft <= 450) {
      localMin = 6500; localMax = 11500;
      domesticMin = 16000; domesticMax = 28000;
    } else if (totalCft <= 850) {
      localMin = 9000; localMax = 16000;
      domesticMin = 22000; domesticMax = 38000;
    } else {
      localMin = 15000; localMax = 25000;
      domesticMin = 35000; domesticMax = 60000;
    }
    
    return {
      local: `₹${localMin.toLocaleString('en-IN')} - ₹${localMax.toLocaleString('en-IN')}`,
      domestic: `₹${domesticMin.toLocaleString('en-IN')} - ₹${domesticMax.toLocaleString('en-IN')}`
    };
  }, [totalCft]);

  const getTruckMatch = (cft) => {
    if (cft === 0) return { name: 'No Items Selected', desc: 'Select items below to estimate cargo volume and matched truck.', icon: '📋' };
    if (cft <= 80) return { name: 'Tata Ace (Chota Hathi)', desc: 'Ideal for single-room luggage shifts, bike transit, or micro-moves (Max 850kg capacity).', icon: '🚚' };
    if (cft <= 220) return { name: 'Mahindra Bolero Pickup', desc: 'Best fit for 1 BHK local apartment relocations or partial shifting loads (Max 1.5 Tons capacity).', icon: '🛻' };
    if (cft <= 450) return { name: '14-Foot Closed Container Truck', desc: 'Secure weather-proof container for 1.5 BHK or standard 2 BHK moves (Max 3.5 Tons capacity).', icon: '🚛' };
    if (cft <= 850) return { name: '17-Foot / 19-Foot Container Truck', desc: 'Heavy-duty closed container perfect for standard 3 BHK residential shifts (Max 5 Tons capacity).', icon: '🚛' };
    return { name: '20-Foot / 24-Foot Large Container or Multiple Trips', desc: 'Required for large bungalow shifting, corporate offices, or massive cargo loads.', icon: '🚚' };
  };

  const matchedTruck = getTruckMatch(totalCft);

  const toggleFaq = (i) => setOpenFaq(prev => (prev === i ? null : i));

  // Shifting volume calculator quote modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', from: '', to: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset modal when closing
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormState({ name: '', phone: '', email: '', from: '', to: '' });
    setFormErrors({});
    setFormSubmitted(false);
  };

  // Open modal and pre-fill "From" field
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormState(prev => ({
      ...prev,
      from: data.name.replace(/ \(hq\)/i, '')
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form and submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Full Name is required';
    if (!formState.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formState.to.trim()) errors.to = 'Destination (To where) is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success! Log the lead details internally
    const selectedItems = INVENTORY_ITEMS
      .filter(item => inventory[item.id] > 0)
      .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
      .join(', ');

    console.log('--- Shifting Inventory Lead ---');
    console.log('Customer:', formState.name);
    console.log('Phone:', formState.phone);
    console.log('Email:', formState.email || 'N/A');
    console.log('From:', formState.from);
    console.log('To:', formState.to);
    console.log('Inventory:', selectedItems);
    console.log('Truck Suggestion:', matchedTruck.name);
    console.log('CFT Volume:', totalCft);
    console.log('--------------------------------');

    // Dispatch automatic background email alert to HQ
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        from: formState.from,
        to: formState.to,
        inventory: selectedItems,
        matchedVehicle: matchedTruck.name,
        totalCft: totalCft,
        source: 'Calculator Modal'
      })
    }).catch(err => console.error('Error dispatching enquiry background alert:', err));

    setFormSubmitted(true);
  };

  // Determine active city list (for State pages) or sibling cities (for City pages)
  const citiesList = useMemo(() => {
    if (isCity) {
      return stateData ? stateData.cities : [];
    }
    return STATE_CITIES[stateSlug] || data.cities || [];
  }, [isCity, stateData, stateSlug, data.cities]);

  // Merge local FAQs with Global FAQs
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

  const allFaqs = [...localFaqs];
  processedGlobalFaqs.forEach(g => {
    if (!allFaqs.some(l => l.q.toLowerCase() === g.q.toLowerCase())) {
      allFaqs.push(g);
    }
  });

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
    'image': 'https://thenationalpackersmovers.com/photos/packed-goods.jpg',
    'url': `https://thenationalpackersmovers.com/branches/${stateSlug}${isCity ? '/' + cityKey : ''}`,
    'logo': 'https://thenationalpackersmovers.com/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': isCity ? (data.address || 'Central HQ Address') : `Serving ${data.name} Statewide`,
      'addressLocality': isCity ? data.name.replace(/ \(hq\)/i, '') : data.name,
      'addressRegion': stateName,
      'addressCountry': 'IN'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'reviewCount': String(displayTestimonials.length)
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
        'item': 'https://thenationalpackersmovers.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Branches',
        'item': 'https://thenationalpackersmovers.com#branches'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': stateName,
        'item': `https://thenationalpackersmovers.com/branches/${stateSlug}`
      },
      ...(isCity ? [{
        '@type': 'ListItem',
        'position': 4,
        'name': data.name.replace(/ \(hq\)/i, ''),
        'item': `https://thenationalpackersmovers.com/branches/${stateSlug}/${cityKey}`
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
          <div className={styles.heroContacts}>
            <span>📞 9835168368</span>
            <span className={styles.heroDivider}>|</span>
            <span>📞 9934166164</span>
          </div>
        </div>
        <div className={styles.heroImageSide}>
          <div className={styles.heroPhotoWrapper}>
            <img
              src={imageSrc}
              alt={`National Packers & Movers — Best relocation and shifting services in ${data.name}`}
              className={styles.heroPhoto}
              onError={handleImageError}
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
            { number: 30000, suffix: '+', label: 'Moves Completed' },
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
                </>
              ) : (
                // Cities List for State
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

      {/* ── ESTIMATOR SECTION ─────────────────────────────── */}
      <section className={`section`}>
        <div className="container">
          <div className="section-header" data-reveal="up">
            <span className="section-tag">Volume Estimator</span>
            <h2 className="section-title">Shifting Volume &amp; <span>Truck Calculator</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Select your household items below to calculate total volume in Cubic Feet (CFT) and discover the matched truck for {data.name} relocations.
            </p>
          </div>
          
          <div className={styles.calcCard} data-reveal="up" data-delay="100">
            <div className={styles.calcGrid}>
              
              {/* Left Column: Input Categories */}
              <div className={styles.calcInputs}>
                {['Furniture', 'Appliances', 'Boxes & Bags'].map((cat) => (
                  <div key={cat} className={styles.calcCategoryGroup}>
                    <h4 className={styles.calcCategoryTitle}>{cat}</h4>
                    <div className={styles.calcItemsList}>
                      {INVENTORY_ITEMS.filter(item => item.category === cat).map((item) => (
                        <div key={item.id} className={styles.calcItemRow}>
                          <div className={styles.calcItemMeta}>
                            <span className={styles.calcItemIcon}>{item.icon}</span>
                            <div>
                              <span className={styles.calcItemName}>{item.name}</span>
                              <span className={styles.calcItemVolume}>{item.volume} CFT</span>
                            </div>
                          </div>
                          <div className={styles.calcControls}>
                            <button 
                              type="button"
                              className={styles.calcControlBtn} 
                              onClick={() => handleItemChange(item.id, -1)}
                              disabled={inventory[item.id] === 0}
                              aria-label={`Decrease ${item.name}`}
                            >
                              −
                            </button>
                            <span className={styles.calcItemCount}>{inventory[item.id]}</span>
                            <button 
                              type="button"
                              className={styles.calcControlBtn} 
                              onClick={() => handleItemChange(item.id, 1)}
                              aria-label={`Increase ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Matched Results Banner */}
              <div className={styles.calcResults}>
                <div className={styles.resultsCard}>
                  <div className={styles.resultsBadge}>📋 Estimated Summary</div>
                  <div className={styles.totalVolumeValue}>
                    {totalCft} <span className={styles.cftUnit}>CFT</span>
                  </div>
                  <p className={styles.resultsLabel}>Estimated Shifting Volume</p>
                  
                  <div className={styles.resultsDivider} />
                  
                  <div className={styles.truckSuggestion}>
                    <div className={styles.truckIconWrap}>
                      <span className={styles.truckSuggestionIcon}>
                        {matchedTruck.icon === '🛻' ? '🛻' : matchedTruck.icon === '🚚' ? '🚚' : '🚛'}
                      </span>
                    </div>
                    <div>
                      <h4 className={styles.truckName}>{matchedTruck.name}</h4>
                      <p className={styles.truckDesc}>{matchedTruck.desc}</p>
                    </div>
                  </div>

                  {totalCft > 0 && (
                    <>
                      <div className={styles.resultsDivider} />
                      <div className={styles.calculatorCostGrid}>
                        <div className={styles.costRangeBox}>
                          <span className={styles.costLabel}>Est. Local Rate</span>
                          <span className={styles.costValue}>{priceEstimates.local}</span>
                        </div>
                        <div className={`${styles.costRangeBox} ${styles.costRangeBoxDomestic}`}>
                          <span className={styles.costLabel}>Est. Domestic Rate</span>
                          <span className={styles.costValue}>{priceEstimates.domestic}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {totalCft > 0 && (
                    <button 
                      type="button"
                      className={styles.resetBtn} 
                      onClick={handleResetInventory}
                    >
                      🔄 Reset Calculator
                    </button>
                  )}

                  <div className={styles.resultsDivider} />

                  <div className={styles.calcQuoteCTA}>
                    <p className={styles.ctaText}>
                      Ready for an exact, itemized quotation? Schedule a surveyor visit:
                    </p>
                    <button 
                      type="button"
                      className="btn btn-primary" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={handleOpenModal}
                      disabled={totalCft === 0}
                    >
                      🚀 Get Free Surveyor Quote
                    </button>
                  </div>
                </div>

                <p className={styles.calcDisclaimer}>
                  *Disclaimer: This is a mathematical guide. Stackability, disassembly of furniture, and packing padding may alter actual space required. Final estimates are verified during our pre-move survey.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

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
                  <tr>
                    <td><strong>1 BHK Home Shifting</strong></td>
                    <td>₹4,000 – ₹7,000</td>
                    <td>₹12,000 – ₹20,000</td>
                  </tr>
                  <tr>
                    <td><strong>2 BHK Home Shifting</strong></td>
                    <td>₹6,500 – ₹11,000</td>
                    <td>₹16,000 – ₹28,000</td>
                  </tr>
                  <tr>
                    <td><strong>3 BHK Home Shifting</strong></td>
                    <td>₹9,000 – ₹15,000</td>
                    <td>₹22,000 – ₹40,000</td>
                  </tr>
                  <tr>
                    <td><strong>Bike Transport</strong></td>
                    <td>₹2,000 – ₹4,000</td>
                    <td>₹3,500 – ₹7,500</td>
                  </tr>
                  <tr>
                    <td><strong>Car Transportation</strong></td>
                    <td>₹5,000 – ₹9,000</td>
                    <td>₹9,000 – ₹18,000</td>
                  </tr>
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

      {/* ── TESTIMONIALS SECTION ──────────────────────────── */}
      {displayTestimonials && displayTestimonials.length > 0 && (
        <section className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <div className="section-header" data-reveal="up">
              <span className="section-tag">Reviews</span>
              <h2 className="section-title">What {data.name} <span>Clients Say</span></h2>
              <div className="divider" />
            </div>
            <div className={styles.testimonialsCarousel} data-reveal="up">
              {displayTestimonials.map((t, i) => (
                <div 
                  key={i} 
                  className={`${styles.testimonialCard} ${i === activeTestimonial ? styles.testimonialActive : ''}`} 
                >
                  <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                  <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                  <div className={styles.authorRow}>
                    <div className={styles.avatar}>{t.initials}</div>
                    <div>
                      <strong className={styles.authorName}>{t.name}</strong>
                      <p className={styles.authorMeta}>{data.name} Branch Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayTestimonials.length > 1 && (
              <div className={styles.testimonialDots}>
                {displayTestimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}


      {/* ── GALLERY SECTION ────────────────────────────────── */}
      <GalleryCarousel />

      {/* ── FAQ SECTION ───────────────────────────────────── */}
      {allFaqs && allFaqs.length > 0 && (
        <section className={`section bg-section-dark`}>
          <div className="container">
            <div className="section-header" data-reveal="up">
              <span className="section-tag">Help Desk</span>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
              <div className="divider" />
            </div>
            <div className={styles.faqList}>
              {allFaqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                  data-reveal="up"
                  data-delay={i * 60}
                >
                  <button 
                    className={styles.faqQuestion} 
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqToggleIcon}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Open ── */}

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

      {/* ── CALCULATOR INQUIRY MODAL OVERLAY ───────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} data-reveal="fade">
            <button 
              type="button" 
              className={styles.modalClose} 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ✕
            </button>

            {!formSubmitted ? (
              <>
                <h3 className={styles.modalTitle}>📋 Shifting Survey Request</h3>
                <p className={styles.modalSubtitle}>
                  Please fill in your details. We have attached your shifting inventory summary to this request.
                </p>

                {/* Shifting Summary Box */}
                <div className={styles.summaryBox}>
                  <div className={styles.summaryRow}>
                    <strong>Selected Cargo:</strong>
                    <span className={styles.summaryItemsText}>
                      {INVENTORY_ITEMS.filter(item => inventory[item.id] > 0)
                        .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
                        .join(', ') || 'No items selected'}
                    </span>
                  </div>
                  <div className={styles.summaryRow} style={{ marginTop: '0.5rem' }}>
                    <strong>Matched Vehicle:</strong>
                    <span className={styles.summaryTruckHighlight}>
                      {matchedTruck.icon} {matchedTruck.name} ({totalCft} CFT)
                    </span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modal-name" className={styles.formLabel}>Full Name *</label>
                    <input 
                      type="text" 
                      id="modal-name"
                      name="name" 
                      className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`}
                      placeholder="e.g. Chetan Jhampaty"
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <span className={styles.formError}>{formErrors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-phone" className={styles.formLabel}>Phone Number *</label>
                    <input 
                      type="tel" 
                      id="modal-phone"
                      name="phone" 
                      className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ''}`}
                      placeholder="e.g. 9835168368"
                      value={formState.phone}
                      onChange={handleInputChange}
                    />
                    {formErrors.phone && <span className={styles.formError}>{formErrors.phone}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-email" className={styles.formLabel}>Email Address (Optional)</label>
                    <input 
                      type="email" 
                      id="modal-email"
                      name="email" 
                      className={styles.formInput}
                      placeholder="e.g. contact@example.com"
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-from" className={styles.formLabel}>Moving From (Origin) *</label>
                    <input 
                      type="text" 
                      id="modal-from"
                      name="from" 
                      className={styles.formInput}
                      placeholder="e.g. Dhanbad"
                      value={formState.from}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-to" className={styles.formLabel}>Moving To (Destination) *</label>
                    <input 
                      type="text" 
                      id="modal-to"
                      name="to" 
                      className={`${styles.formInput} ${formErrors.to ? styles.inputError : ''}`}
                      placeholder="e.g. Ranchi"
                      value={formState.to}
                      onChange={handleInputChange}
                    />
                    {formErrors.to && <span className={styles.formError}>{formErrors.to}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                    🚀 Submit Surveyor Request
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>✔️</span>
                <h3 className={styles.successTitle}>Survey Request Received!</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formState.name}</strong>. Your inventory shifting request has been registered.
                </p>
                <div className={styles.successDetails}>
                  <p>📞 <strong>Phone:</strong> {formState.phone}</p>
                  <p>📍 <strong>Route:</strong> {formState.from} to {formState.to}</p>
                  <p>🚛 <strong>Vehicle suggested:</strong> {matchedTruck.name}</p>
                </div>
                <p className={styles.successNote}>
                  Our branch coordinator will contact you shortly to confirm your booking and schedule a physical or virtual surveyor assessment.
                </p>
                
                {/* Option to send formatted details directly to WhatsApp */}
                <a
                  href={`https://wa.me/919835168368?text=Hi%20National%20Packers,%20I%20just%20submitted%20an%20inventory%20shifting%20request.%0A%0A*Name:*%20${encodeURIComponent(formState.name)}%0A*Phone:*%20${encodeURIComponent(formState.phone)}%0A*Route:*%20${encodeURIComponent(formState.from)}%20to%20${encodeURIComponent(formState.to)}%0A*Suggested%20Truck:*%20${encodeURIComponent(matchedTruck.name)}%0A*Inventory:*%20${encodeURIComponent(
                    INVENTORY_ITEMS.filter(item => inventory[item.id] > 0)
                      .map(item => `${inventory[item.id]}x ${item.name.replace(/ \(with mattress\)/i, '')}`)
                      .join(', ')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', background: '#25D366', border: 'none', boxShadow: 'none' }}
                >
                  💬 Confirm via WhatsApp
                </a>

                <button 
                  type="button" 
                  className={styles.resetBtn} 
                  onClick={handleCloseModal}
                  style={{ marginTop: '1rem' }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
