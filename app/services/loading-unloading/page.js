import ServicePage from '@/components/ServicePage/ServicePage';

export const metadata = {
  title: 'Loading & Unloading Services | National Packers & Movers | Labour Service India',
  description: 'Professional loading and unloading services — trained labour for all types of goods. Household, corporate, industrial. Available across Jharkhand, West Bengal, Bihar & more. Call 9835168368.',
  keywords: 'loading unloading services india, labour service packers movers, loading service jharkhand, unloading labour dhanbad, goods loading service india',
};

const service = {
  slug: 'loading-unloading',
  name: 'Loading & Unloading',
  tag: 'Professional Labour Service',
  icon: '📦',
  heroTitle: 'Professional <span>Loading & Unloading</span><br/>The Right Labour, The Right Way.',
  heroSubtitle: 'Trained, reliable manpower for all your loading and unloading needs. Whether household goods, office equipment, or industrial cargo — we handle it safely, efficiently, and with full accountability.',
  stats: [
    { number: 50000, suffix: '+', label: 'Loads Handled' },
    { number: 38, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Trained Staff' },
    { number: 6, suffix: '', label: 'States Covered' },
  ],
  included: [
    { title: 'Household Goods Loading', desc: 'Furniture, appliances, boxes — carefully loaded onto trucks using proper techniques and equipment.' },
    { title: 'Office & Corporate Loading', desc: 'Office furniture, IT equipment, files — loaded with labelling and systematic organization.' },
    { title: 'Industrial & Heavy Goods', desc: 'Machinery, equipment, industrial cargo — loaded with specialized equipment and rigging.' },
    { title: 'Unloading at Destination', desc: 'Professional unloading with the same care — nothing thrown, nothing rushed.' },
    { title: 'Floor-Wise Placement', desc: 'Goods placed to the correct floor and room — not just left at the building entrance.' },
    { title: 'Equipment Assistance', desc: 'Trolleys, dollies, and hand trucks used for efficient movement of heavy items.' },
    { title: 'Staircase Handling', desc: 'Experienced team for navigating narrow staircases and high-rise apartments.' },
    { title: 'Flexible Booking', desc: 'Book by the hour or for the full job — flexible pricing based on scope of work.' },
  ],
  whyUs: [
    { icon: '💪', title: 'Physically Trained Team', desc: 'Our loading crew is physically trained for the demands of the job — efficient, capable, and careful.' },
    { icon: '🧠', title: 'Intelligent Loading', desc: 'We do not just stack boxes — heavy items at the bottom, fragile on top, weight balanced across the truck.' },
    { icon: '⚙️', title: 'Proper Equipment', desc: 'Trolleys, straps, dollies, and hoisting equipment — we bring the right tools for every job.' },
    { icon: '🚫', title: 'No Breakage Policy', desc: 'Our team takes full responsibility. Any item damaged during loading/unloading by our staff is our liability.' },
    { icon: '⏱️', title: 'Time Efficient', desc: 'Experienced team works efficiently without rushing. Fast loading means lower truck hire time for you.' },
    { icon: '📋', title: 'Fully Accountable', desc: 'Itemized checklist maintained during loading — full accountability from the first item to the last.' },
  ],
  testimonials: [
    {
      name: 'Deepak Sharma',
      city: 'Durgapur',
      service: 'Loading & Unloading',
      initials: 'DS',
      text: 'Used their loading team for a 3BHK home. 8 men, worked like a coordinated unit. Everything loaded in 3 hours without a single scratch. Very impressive — and very affordable.',
    },
    {
      name: 'Warehouse Supervisor',
      city: 'Singrauli',
      service: 'Industrial Loading',
      initials: 'WS',
      text: 'Needed a reliable loading crew for our warehouse operations. National Packers team was professional, fast, and followed proper safety procedures throughout. Will book again.',
    },
  ],
  faqs: [
    {
      q: 'Is this a labour-only service or do you provide transport too?',
      a: 'We offer both. Loading & Unloading is available as a standalone labour service (you arrange transport), or combined with our full relocation service including transport.',
    },
    {
      q: 'How many workers do you send?',
      a: 'The team size depends on the volume of goods. Typically 4–8 workers for a household move, 2–4 for smaller jobs. We assess and confirm the team size when you book.',
    },
    {
      q: 'Can you handle high-rise apartments?',
      a: 'Yes. Our team is experienced with multi-floor handling — lifts, staircases, and narrow corridors. We bring appropriate equipment for high-rise loading and unloading.',
    },
    {
      q: 'What if something breaks during loading or unloading?',
      a: 'Our team takes full responsibility. Any damage caused by our workers during loading or unloading is our liability — we will replace or compensate for the item.',
    },
    {
      q: 'Can I book loading only, or unloading only?',
      a: 'Yes. You can book loading only at source, unloading only at destination, or both. We are flexible — book exactly what you need.',
    },
  ],
  related: [
    { slug: 'household-relocation', icon: '🏠', name: 'Household Relocation', desc: 'Complete home shifting with loading, transport, and more.' },
    { slug: 'warehousing-storage', icon: '🏪', name: 'Warehousing & Storage', desc: 'Loading into secure storage facilities.' },
    { slug: 'industrial-relocation', icon: '🏭', name: 'Industrial Relocation', desc: 'Industrial-grade loading for heavy machinery.' },
  ],
};

export default function LoadingUnloadingPage() {
  return <ServicePage service={service} />;
}
