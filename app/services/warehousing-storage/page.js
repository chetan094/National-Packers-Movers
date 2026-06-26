import ServicePage from '@/components/ServicePage/ServicePage';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/services/warehousing-storage';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Warehousing & Storage Services | National Packers & Movers | Secure Storage India';
  const description = custom?.meta_description || 'Safe, secure warehousing and storage services across Jharkhand, West Bengal, Bihar & MP. Short-term and long-term storage for household and corporate goods. Call 9835168368.';
  const keywords = custom?.meta_keywords || 'warehousing services jharkhand, storage solutions india, secure storage dhanbad, warehouse packers movers, short term storage, long term storage india';
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
  slug: 'warehousing-storage',
  name: 'Warehousing & Storage',
  tag: 'Secure Storage Solutions',
  icon: '🏪',
  heroTitle: 'Secure <span>Warehousing & Storage</span><br/>Your Goods, Safely Stored.',
  heroSubtitle: 'Short-term or long-term — our secure, CCTV-monitored storage facilities keep your household or corporate goods safe until you need them.',
  stats: [
    { number: 5, suffix: '+', label: 'Storage Locations' },
    { number: 38, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'CCTV Monitored' },
    { number: 1000, suffix: '+', label: 'Items Stored Safely' },
  ],
  included: [
    { title: 'Short-Term Storage (Daily/Weekly)', desc: 'Flexible short-term storage — from a single day to several weeks — on affordable rates.' },
    { title: 'Long-Term Storage (Monthly+)', desc: 'Secure long-term storage facilities for goods needing storage for months or years.' },
    { title: 'Household Goods Storage', desc: 'Furniture, appliances, electronics, and personal belongings stored safely with inventory.' },
    { title: 'Corporate & Office Storage', desc: 'Files, equipment, office furniture — stored securely for businesses during transitions.' },
    { title: 'CCTV 24/7 Monitoring', desc: 'All facilities monitored round the clock with CCTV surveillance — complete security.' },
    { title: 'Inventory Management', desc: 'Itemized inventory of all stored goods maintained — know exactly what\'s stored and where.' },
    { title: 'Pest & Moisture Control', desc: 'Facilities treated for pests and moisture — your goods remain in the same condition as stored.' },
    { title: 'Pickup & Delivery', desc: 'We pick up goods from your location and deliver them back when you need — complete convenience.' },
  ],
  whyUs: [
    { icon: '📹', title: '24/7 CCTV Surveillance', desc: 'All storage facilities are monitored around the clock with CCTV cameras — your goods are always watched.' },
    { icon: '🔒', title: 'Secure Access Control', desc: 'Restricted access with authorized entry only. Your goods can only be released to you.' },
    { icon: '📋', title: 'Itemized Inventory', desc: 'We maintain a detailed record of every item stored — you always know exactly what is in storage.' },
    { icon: '🌡️', title: 'Protected Storage Conditions', desc: 'Facilities treated for pests, moisture, and temperature fluctuations to protect your goods.' },
    { icon: '💰', title: 'Flexible, Affordable Plans', desc: 'Pay only for the space and time you use. No long lock-in periods. Cancel anytime.' },
    { icon: '🚛', title: 'Integrated with Moving Services', desc: 'Combine storage with our relocation services — move in, store, move out — one company handles it all.' },
  ],
  testimonials: [
    {
      name: 'Ravi Shankar',
      city: 'Asansol',
      service: 'Household Storage',
      initials: 'RS',
      text: 'Stored our household goods for 3 months during home renovation. Everything came back in perfect condition. CCTV monitoring gave us complete peace of mind. Very reasonable rates too.',
    },
    {
      name: 'Logistics Manager, Manufacturing Co.',
      city: 'Dhanbad',
      service: 'Corporate Storage',
      initials: 'LM',
      text: 'We use their warehouse for seasonal inventory storage. Professional management, proper inventory tracking, and excellent security. Reliable long-term partner for us.',
    },
  ],
  faqs: [
    {
      q: 'How is my stored goods protected from damage?',
      a: 'All items are properly packed before storage. Facilities are monitored 24/7 with CCTV, treated for pests and moisture, and maintained at safe temperatures. An itemized inventory is maintained.',
    },
    {
      q: 'What is the minimum storage period?',
      a: 'We offer flexible storage starting from a minimum of 7 days. You can extend on a weekly or monthly basis as needed — no forced long-term commitments.',
    },
    {
      q: 'Can I access my stored goods anytime?',
      a: 'Yes. You can access your stored goods during our working hours with prior notice. We will also arrange delivery of specific items if you need something urgently.',
    },
    {
      q: 'Do you provide insurance for stored goods?',
      a: 'Yes. Storage insurance is available for your stored goods. We recommend insuring high-value items — our team will guide you through the process.',
    },
    {
      q: 'Do you store both household and commercial goods?',
      a: 'Yes. We store household goods (furniture, appliances, personal items), office equipment, corporate inventory, and other goods. Contact us with your specific requirements.',
    },
  ],
  related: [
    { slug: 'household-relocation', icon: '🏠', name: 'Household Relocation', desc: 'Move your home with storage combined into one service.' },
    { slug: 'corporate-relocation', icon: '🏢', name: 'Corporate Relocation', desc: 'Storage during office transitions — seamlessly integrated.' },
    { slug: 'loading-unloading', icon: '📦', name: 'Loading & Unloading', desc: 'Labour support for loading goods into storage.' },
  ],
};

export default function WarehousingStoragePage() {
  return <ServicePage service={service} />;
}
