import ServicePage from '@/components/ServicePage/ServicePage';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/services/vehicle-relocation';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Vehicle Relocation Services | Car & Bike Transport | National Packers & Movers';
  const description = custom?.meta_description || 'Safe car, bike and vehicle transport across India. GPS tracked, fully insured, enclosed carrier available. National Packers & Movers — trusted vehicle relocation since 1987. Call 9835168368.';
  const keywords = custom?.meta_keywords || 'vehicle relocation india, car transport jharkhand, bike transport service, car shifting dhanbad, vehicle transport kolkata, car carrier service india';
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

const service = {
  slug: 'vehicle-relocation',
  name: 'Vehicle Relocation',
  tag: 'Car & Bike Transport',
  icon: '🚗',
  heroTitle: 'Safe <span>Vehicle Relocation</span><br/>Delivered Without a Scratch.',
  heroSubtitle: 'Your car, bike, or any vehicle — transported safely across India. GPS-tracked carriers, full insurance, zero-damage commitment. Trusted by thousands since 1987.',
  stats: [
    { number: 5000, suffix: '+', label: 'Vehicles Transported' },
    { number: 38, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Insured Transport' },
    { number: 0, suffix: '%', label: 'Damage Rate' },
  ],
  included: [
    { title: 'Car Transport (All Types)', desc: 'Hatchback, sedan, SUV, MUV — transported safely on dedicated carriers with full protection.' },
    { title: 'Two-Wheeler Transport', desc: 'Motorcycles, scooters, and bicycles packed and transported without a scratch.' },
    { title: 'Enclosed Carrier Option', desc: 'Fully enclosed carrier available for premium, luxury, and vintage vehicles.' },
    { title: 'Pre-Transport Inspection', desc: 'Full vehicle inspection documented before pickup — ensuring transparent, dispute-free delivery.' },
    { title: 'GPS-Tracked Transport', desc: 'Your vehicle\'s location can be tracked throughout the transit journey.' },
    { title: 'Door-to-Door Service', desc: 'Pickup from your home or office, delivered to the destination address.' },
    { title: 'Fuel & Battery Check', desc: 'Vehicles are checked for fuel level and battery before transport — delivered ready to drive.' },
    { title: 'Transit Insurance', desc: 'Comprehensive insurance coverage on all vehicles throughout the journey.' },
  ],
  whyUs: [
    { icon: '🔒', title: 'Enclosed Carrier Available', desc: 'For premium, vintage, or luxury vehicles — fully enclosed carrier protects from dust, rain, and road debris.' },
    { icon: '📍', title: 'GPS Tracked Vehicles', desc: 'Know exactly where your car is throughout the journey. Real-time tracking for your peace of mind.' },
    { icon: '🛡️', title: 'Zero Damage Commitment', desc: '38 years of vehicle transport with an unmatched safety record. Your vehicle arrives exactly as it left.' },
    { icon: '📋', title: 'Pre & Post Inspection', desc: 'Detailed vehicle condition documented before pickup and verified at delivery — full transparency.' },
    { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed quotes with no hidden charges. Know the exact cost before we pick up your vehicle.' },
    { icon: '⏱️', title: 'On-Time Delivery', desc: 'We commit to a delivery window and honour it. No vague timelines, no excuses.' },
  ],
  testimonials: [
    {
      name: 'Pramjit Singh',
      city: 'Nabinagar to Jhajjar',
      service: 'Vehicle Shifting',
      initials: 'PS',
      text: 'Mr. Uttam from National Packers & Movers provided me with good service. His behavior was very friendly. I shifted from Nabinagar to Jhajjar without any pain. Thank you Uttam ji & National Packers!',
    },
    {
      name: 'Mukesh',
      city: 'Singrauli to Delhi',
      service: 'Car & Household Transport',
      initials: 'M',
      text: 'Best packers and movers for household relocation service. I strongly recommend National Packers & Movers. They relocated my goods from Singrauli to Delhi, provided with a closed container truck at a very appealing cost, and gave a premium service.',
    },
  ],
  faqs: [
    {
      q: 'How is my car protected during transport?',
      a: 'Your car is loaded onto a specialized car carrier, secured with wheel clamps and tie-downs, and protected with cover sheets. We also offer fully enclosed carriers for premium vehicles.',
    },
    {
      q: 'Is my vehicle insured during transport?',
      a: 'Yes. All vehicles are covered under comprehensive transit insurance from the moment of pickup until delivery. The vehicle is also inspected and documented before transport.',
    },
    {
      q: 'How long does vehicle transport take?',
      a: 'Transit time depends on the source and destination. Short routes (within a state or neighboring state) take 2–4 days. Longer cross-country routes take 5–8 days. We provide an estimated delivery window at booking.',
    },
    {
      q: 'Do you transport luxury or vintage cars?',
      a: 'Yes. We provide enclosed carrier transport specifically for luxury, vintage, and high-value vehicles — fully protected from weather and road conditions.',
    },
    {
      q: 'Can you pick up from my home or office?',
      a: 'Yes. We offer doorstep pickup and delivery. Just provide your address and we will schedule a convenient pickup time.',
    },
  ],
  related: [
    { slug: 'household-relocation', icon: '🏠', name: 'Household Relocation', desc: 'Move your home along with your vehicle — one company for everything.' },
    { slug: 'transit-insurance', icon: '🛡️', name: 'Transit Insurance', desc: 'Additional insurance coverage for high-value vehicles.' },
    { slug: 'loading-unloading', icon: '📦', name: 'Loading & Unloading', desc: 'Labour support for additional items alongside your vehicle.' },
  ],
};

export default function VehicleRelocationPage() {
  return <ServicePage service={service} />;
}
