import ServicePage from '@/components/ServicePage/ServicePage';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/services/household-relocation';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Household Relocation Services | National Packers & Movers | Trusted Since 1987';
  const description = custom?.meta_description || 'Professional household relocation services by National Packers & Movers. Serving Jharkhand, West Bengal, Bihar, MP & all India. Safe packing, insured transport, expert team. Call 9835168368.';
  const keywords = custom?.meta_keywords || 'household relocation, home shifting services, packers movers dhanbad, house shifting jharkhand, home relocation india, trusted packers movers 1987';
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
  slug: 'household-relocation',
  name: 'Household Relocation',
  tag: 'Home Shifting',
  icon: '🏠',
  heroTitle: 'Professional <span>Household Relocation</span><br/>You Can Trust Completely',
  heroSubtitle: 'From the first box packed to the last item placed — we handle your entire home shift with the care, precision, and honesty that 38 years of experience delivers.',
  stats: [
    { number: 90000, suffix: '+', label: 'Homes Shifted' },
    { number: 38, suffix: '+', label: 'Years of Experience' },
    { number: 100, suffix: '%', label: 'Transit Insurance' },
    { number: 6, suffix: '', label: 'States Covered' },
  ],
  included: [
    { title: 'Full Household Packing', desc: 'Every item — from kitchen utensils to bedroom furniture — packed with appropriate materials.' },
    { title: 'Furniture Disassembly & Assembly', desc: 'Wardrobes, beds, shelves dismantled safely and reassembled at destination.' },
    { title: 'Appliance Handling', desc: 'Refrigerators, washing machines, ACs — wrapped and secured with specialized protection.' },
    { title: 'Fragile & Antique Items', desc: 'Extra-care packing for glassware, artwork, antiques and irreplaceable valuables.' },
    { title: 'Loading & Unloading', desc: 'Trained manpower using proper equipment for safe loading and careful unloading.' },
    { title: 'Transit Insurance Coverage', desc: 'Complete insurance coverage on all goods throughout the entire journey.' },
    { title: 'Unpacking & Arrangement', desc: 'We unpack and help you arrange items at your new home — no extra stress for you.' },
    { title: 'Doorstep-to-Doorstep Service', desc: 'Complete end-to-end service from your current home to your new destination.' },
  ],
  whyUs: [
    { icon: '📦', title: 'Multi-Layer Packing', desc: 'We use bubble wrap, foam sheets, corrugated boxes, and stretch film — the right material for every item type.' },
    { icon: '🚛', title: 'Own Fleet of Vehicles', desc: 'No third-party trucks. Our dedicated, GPS-tracked vehicles ensure your goods are under our watch the entire time.' },
    { icon: '💰', title: 'No Hidden Charges', desc: 'The quote we give is what you pay. Transparent pricing is our commitment — always has been since 1987.' },
    { icon: '👨‍🔧', title: 'Trained Packing Crew', desc: 'Every team member is trained in systematic, damage-free packing techniques for household items.' },
    { icon: '🛡️', title: 'Full Transit Insurance', desc: 'Every shipment is fully insured. In the rare event of damage, we have you completely covered.' },
    { icon: '⏱️', title: 'On-Time Commitment', desc: 'We commit to your moving date and deliver on time. Your schedule is our priority.' },
  ],
  testimonials: [
    {
      name: 'Raju Upadhyay',
      city: 'Ranchi',
      service: 'Household Relocation',
      initials: 'RU',
      text: 'Their service is very good, I got all my household stuff shifted from Ranchi. Brought it very properly and safely. Packed all the household items and kept them safe. Very good service at the cheapest rate.',
    },
    {
      name: 'Simran',
      city: 'Dhanbad',
      service: 'Household Relocation',
      initials: 'S',
      text: 'I had a great experience with National Packers & Movers! Their team was very quick and helped me move my things without any delay. They were friendly and worked fast. I felt safe knowing my items were in good hands. Excellent service and quick assistance made everything easy for me.',
    },
  ],
  faqs: [
    {
      q: 'How much does household relocation cost?',
      a: 'Costs depend on the quantity of goods, distance, and services required. We provide a free, transparent, no-obligation quote after a pre-move survey. Call us at 9835168368 for an estimate.',
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 7–10 days in advance for a planned move. However, we also handle urgent moves — contact us and we will do our best to accommodate you.',
    },
    {
      q: 'Do you pack fragile and antique items?',
      a: 'Yes. Fragile items like glassware, artwork, and antiques receive special multi-layer packing — bubble wrap, foam padding, custom boxes — handled only by our trained packers.',
    },
    {
      q: 'Is my furniture covered if damaged in transit?',
      a: 'Yes. All moves come with full transit insurance. In the extremely rare case of damage, the claim process is handled by our team — you are completely protected.',
    },
    {
      q: 'Do you also unpack and arrange items at the new home?',
      a: 'Yes, unpacking and basic arrangement at destination is included in our full service package. We leave only after you are satisfied with the placement.',
    },
  ],
  related: [
    { slug: 'corporate-relocation', icon: '🏢', name: 'Corporate Relocation', desc: 'Office and employee relocations handled with minimal downtime.' },
    { slug: 'transit-insurance', icon: '🛡️', name: 'Transit Insurance', desc: 'Comprehensive coverage for all your goods during the move.' },
    { slug: 'loading-unloading', icon: '📦', name: 'Loading & Unloading', desc: 'Trained labour for efficient loading and unloading only.' },
  ],
};

export default function HouseholdRelocationPage() {
  return <ServicePage service={service} />;
}
