import ServicePage from '@/components/ServicePage/ServicePage';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/services/transit-insurance';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Transit Insurance Services | National Packers & Movers | Goods Insurance India';
  const description = custom?.meta_description || 'Comprehensive transit insurance for all your goods during relocation. Full coverage, quick claim settlement. National Packers & Movers — protecting your belongings since 1987. Call 9835168368.';
  const keywords = custom?.meta_keywords || 'transit insurance india, goods insurance relocation, moving insurance jharkhand, insurance packers movers, goods protection transit, relocation insurance india';
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
  slug: 'transit-insurance',
  name: 'Transit Insurance',
  tag: 'Complete Protection During Transit',
  icon: '🛡️',
  heroTitle: '<span>Transit Insurance</span> for<br/>Complete Peace of Mind.',
  heroSubtitle: 'Your belongings are priceless. Our comprehensive transit insurance ensures that every item is protected throughout the entire relocation — from pickup to delivery.',
  stats: [
    { number: 100, suffix: '%', label: 'Coverage on All Goods' },
    { number: 30000, suffix: '+', label: 'Insured Shipments' },
    { number: 38, suffix: '+', label: 'Years of Trust' },
    { number: 0, suffix: '%', label: 'Uncovered Claims' },
  ],
  included: [
    { title: 'All Household Goods Coverage', desc: 'Furniture, appliances, electronics, crockery, clothing — all covered under one policy.' },
    { title: 'Fragile Items Protection', desc: 'Glassware, artwork, antiques, and fragile valuables — specially covered with full compensation.' },
    { title: 'Electronics & Appliances', desc: 'TVs, computers, ACs, refrigerators — electronic goods covered for damage or loss.' },
    { title: 'Vehicle Transit Insurance', desc: 'Additional insurance coverage available specifically for cars and two-wheelers in transport.' },
    { title: 'Corporate Goods Coverage', desc: 'Office equipment, IT assets, documents — covered under corporate transit insurance policies.' },
    { title: 'Door-to-Door Coverage', desc: 'Coverage begins from the moment we pick up your goods and ends when delivered safely.' },
    { title: 'Quick Claim Settlement', desc: 'In case of damage, our team initiates and supports the claim process for fast settlement.' },
    { title: 'Transparent Policy Terms', desc: 'No fine print surprises. We explain your policy terms clearly before the move begins.' },
  ],
  whyUs: [
    { icon: '📋', title: 'Clear Policy Terms', desc: 'No hidden clauses. You will fully understand what is covered and the claim process before we start.' },
    { icon: '⚡', title: 'Fast Claim Support', desc: 'Our team actively supports you through the claim process — from documentation to settlement.' },
    { icon: '💯', title: 'Complete Coverage', desc: 'All categories of goods — household, electronics, vehicles, corporate — covered under one umbrella.' },
    { icon: '🤝', title: '38 Years of Accountability', desc: 'Our insurance commitment is backed by 38 years of standing behind our promises to customers.' },
    { icon: '🔍', title: 'Pre-Move Documentation', desc: 'Detailed inventory and condition photos before transit — ensures fair, dispute-free claim settlement.' },
    { icon: '📞', title: 'Claim Assistance', desc: 'Dedicated support for claim filing — you will not navigate the process alone.' },
  ],
  testimonials: [
    {
      name: 'Manoj Kumar Prasad',
      city: 'Ranchi',
      service: 'Transit Insurance',
      initials: 'MK',
      text: 'When one item was damaged during transit, National Packers & Movers immediately initiated the insurance claim. The settlement was fast, fair, and handled professionally. That\'s accountability.',
    },
    {
      name: 'Corporate Finance Manager',
      city: 'Kolkata',
      service: 'Corporate Transit Insurance',
      initials: 'CF',
      text: 'We insured our entire office equipment worth lakhs. The coverage was comprehensive, the documentation was thorough, and the peace of mind was priceless. Highly professional.',
    },
  ],
  faqs: [
    {
      q: 'Is transit insurance mandatory when I book with National Packers & Movers?',
      a: 'All our standard moves include basic transit insurance. We strongly recommend comprehensive coverage for high-value or fragile items — it is optional but highly advisable.',
    },
    {
      q: 'What is the claims process if an item is damaged?',
      a: 'You report the damage at delivery with our team present. We document it immediately, file the insurance claim with supporting evidence (pre-move photos), and support you through settlement.',
    },
    {
      q: 'Are electronics like TVs and computers covered?',
      a: 'Yes. Electronics are covered under our transit insurance. We also use specialized packing for all electronics — the combination of proper packing and insurance gives double protection.',
    },
    {
      q: 'Can I insure high-value items separately?',
      a: 'Yes. For items of particularly high value — artwork, antiques, jewelry, luxury items — we can arrange additional coverage beyond our standard policy.',
    },
    {
      q: 'Does insurance cover loss of goods, or only damage?',
      a: 'Our comprehensive transit insurance covers both damage and loss of goods during transit — giving complete protection for every item on your inventory.',
    },
  ],
  related: [
    { slug: 'household-relocation', icon: '🏠', name: 'Household Relocation', desc: 'Complete home shifting with insurance included.' },
    { slug: 'vehicle-relocation', icon: '🚗', name: 'Vehicle Relocation', desc: 'Additional vehicle insurance during transport.' },
    { slug: 'warehousing-storage', icon: '🏪', name: 'Warehousing & Storage', desc: 'Insurance coverage available for stored goods too.' },
  ],
};

export default function TransitInsurancePage() {
  return <ServicePage service={service} />;
}
