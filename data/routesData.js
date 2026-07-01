export const routesData = [
  {
    origin: 'ranchi',
    destination: 'delhi',
    originName: 'Ranchi',
    destinationName: 'Delhi (NCR)',
    distance: '1,220 km',
    duration: '36 – 48 Hours',
    route: 'NH-19 & NH-44',
    baseRate: '₹35,000',
    highlight: 'Direct Highway Container',
    description: 'Direct logistics transport from Ranchi (Jharkhand) to Delhi NCR using closed container vehicles, bypassing multi-hub unloading risks.'
  },
  {
    origin: 'dhanbad',
    destination: 'kolkata',
    originName: 'Dhanbad',
    destinationName: 'Kolkata',
    distance: '270 km',
    duration: '6 – 8 Hours',
    route: 'NH-19 (G.T. Road)',
    baseRate: '₹12,000',
    highlight: 'Same Day Shifting',
    description: 'Fast local-hub shifting connecting Dhanbad HQ to Kolkata. Loaded in the morning, unpacked at your new Kolkata home by evening.'
  },
  {
    origin: 'singrauli',
    destination: 'delhi',
    originName: 'Singrauli',
    destinationName: 'Delhi (NCR)',
    distance: '880 km',
    duration: '24 – 30 Hours',
    route: 'NH-30 & NH-19',
    baseRate: '₹32,000',
    highlight: 'PSU Shifting Specially Insured',
    description: 'Corporate-approved shipping lane for Coal India, NTPC, and mining PSU officer relocations from Singrauli to New Delhi.'
  },
  {
    origin: 'patna',
    destination: 'delhi',
    originName: 'Patna',
    destinationName: 'Delhi (NCR)',
    distance: '1,010 km',
    duration: '24 – 36 Hours',
    route: 'NH-19',
    baseRate: '₹30,000',
    highlight: 'GPS-Tracked Transit',
    description: 'Safe house moving connecting Bihar\'s capital Patna to New Delhi. Complete loading, packing, and direct transit.'
  },
  {
    origin: 'kolkata',
    destination: 'bangalore',
    originName: 'Kolkata',
    destinationName: 'Bangalore',
    distance: '1,890 km',
    duration: '4 – 5 Days',
    route: 'NH-16 (East Coast Corridor)',
    baseRate: '₹45,000',
    highlight: 'Weatherproof Double Containers',
    description: 'Long-distance interstate logistics corridor transporting household assets and vehicles safely from West Bengal to Karnataka.'
  },
  {
    origin: 'bokaro',
    destination: 'pune',
    originName: 'Bokaro',
    destinationName: 'Pune',
    distance: '1,650 km',
    duration: '3 – 4 Days',
    route: 'NH-53 & NH-44',
    baseRate: '₹42,000',
    highlight: 'Full Carrier Insurance',
    description: 'Reliable shifting solutions for industrial and residential assets moving from Bokaro Steel City to Pune IT hubs.'
  },
  {
    origin: 'dhanbad',
    destination: 'patna',
    originName: 'Dhanbad',
    destinationName: 'Patna',
    distance: '320 km',
    duration: '8 – 10 Hours',
    route: 'NH-20',
    baseRate: '₹15,000',
    highlight: 'Door-to-Door Delivery',
    description: 'Direct moving corridor connecting the coal capital Dhanbad to Patna. Multi-layer bubble wrapping included.'
  },
  {
    origin: 'ranchi',
    destination: 'kolkata',
    originName: 'Ranchi',
    destinationName: 'Kolkata',
    distance: '400 km',
    duration: '10 – 12 Hours',
    route: 'NH-43 & NH-19',
    baseRate: '₹18,000',
    highlight: 'Dedicated Shifting Crew',
    description: 'Prompt moving services between Ranchi and Kolkata. Professional packing and placement at destination.'
  }
];

export function getRoutesForCity(cityKey, cityName) {
  // 1. Get explicit manual routes first
  const explicit = routesData.filter(r => r.origin === cityKey.toLowerCase());
  
  // 2. Generate fallback routes to top destinations to ensure every city has at least 5 routes
  const topDestinations = [
    { key: 'delhi', name: 'Delhi (NCR)', distance: '850 - 1,200 km', duration: '24 - 48 Hours', route: 'National Highway Transit', baseRate: '₹32,000' },
    { key: 'bangalore', name: 'Bangalore', distance: '1,500 - 1,900 km', duration: '3 - 5 Days', route: 'East Coast Corridor', baseRate: '₹45,000' },
    { key: 'mumbai', name: 'Mumbai', distance: '1,400 - 1,800 km', duration: '3 - 4 Days', route: 'Western Highway Route', baseRate: '₹42,000' },
    { key: 'kolkata', name: 'Kolkata', distance: '250 - 450 km', duration: '8 - 12 Hours', route: 'NH-19 Corridor', baseRate: '₹15,000' },
    { key: 'pune', name: 'Pune', distance: '1,300 - 1,700 km', duration: '3 - 4 Days', route: 'Central Transit Highway', baseRate: '₹40,000' }
  ];

  const list = [...explicit];

  // Fill up to 5 routes
  topDestinations.forEach(dest => {
    if (list.length >= 5) return;
    if (dest.key === cityKey.toLowerCase()) return;
    // Avoid duplicates
    if (list.some(r => r.destination === dest.key)) return;

    list.push({
      origin: cityKey.toLowerCase(),
      destination: dest.key,
      originName: cityName,
      destinationName: dest.name,
      distance: dest.distance,
      duration: dest.duration,
      route: dest.route,
      baseRate: dest.baseRate,
      highlight: 'Direct Moving Container',
      description: `Seamless household shifting and vehicle relocation services from ${cityName} to ${dest.name}.`
    });
  });

  return list;
}

export function getRoutesForState(stateSlug, stateCities = []) {
  const lowerCities = stateCities.map(c => c.toLowerCase());
  let explicit = routesData.filter(r => lowerCities.includes(r.origin));
  
  const majorCitiesMap = {
    'jharkhand': ['Ranchi', 'Dhanbad', 'Bokaro'],
    'west-bengal': ['Kolkata', 'Durgapur', 'Asansol'],
    'bihar': ['Patna', 'Bhagalpur', 'Gaya'],
    'madhya-pradesh': ['Singrauli', 'Bhopal', 'Indore'],
    'odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
    'uttar-pradesh': ['Lucknow', 'Noida', 'Kanpur']
  };

  const majorCities = majorCitiesMap[stateSlug.toLowerCase()] || [];
  const list = [...explicit];
  
  majorCities.forEach(city => {
    const cityKey = city.toLowerCase().replace(/ /g, '-');
    const cityRoutes = getRoutesForCity(cityKey, city);
    cityRoutes.forEach(r => {
      if (list.length >= 8) return; // Limit to max 8 routes per state
      if (!list.some(existing => existing.origin === r.origin && existing.destination === r.destination)) {
        list.push(r);
      }
    });
  });

  return list;
}

