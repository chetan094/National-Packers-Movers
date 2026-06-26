import ServicePage from '@/components/ServicePage/ServicePage';
import { getCustomMetadata } from '@/lib/supabase';

export async function generateMetadata() {
  const path = '/services/corporate-relocation';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Corporate Relocation Services | National Packers & Movers | PSU & Office Shifting';
  const description = custom?.meta_description || 'Trusted corporate relocation services for PSUs, government offices & private corporations. 500+ corporate moves across 6 states. National Packers & Movers — call 9835168368.';
  const keywords = custom?.meta_keywords || 'corporate relocation india, office shifting services, PSU relocation, employee relocation jharkhand, corporate movers dhanbad, office movers india';
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
  slug: 'corporate-relocation',
  name: 'Corporate Relocation',
  tag: 'Office & Employee Shifting',
  icon: '🏢',
  heroTitle: 'Corporate Relocation <span>Built for Business</span><br/>Trusted by India\'s Top PSUs',
  heroSubtitle: 'Seamless office and employee relocations with zero downtime. Trusted by leading public sector units, energy companies, mining corporations, and industrial organisations across India.',
  stats: [
    { number: 500, suffix: '+', label: 'Corporate Moves' },
    { number: 50, suffix: '+', label: 'PSU Clients Served' },
    { number: 38, suffix: '+', label: 'Years of Experience' },
    { number: 100, suffix: '%', label: 'On-Time Delivery' },
  ],
  included: [
    { title: 'Office Furniture & Equipment', desc: 'Desks, chairs, cabinets, workstations — systematically packed, labelled, and reassembled at destination.' },
    { title: 'IT Equipment & Servers', desc: 'Computers, printers, servers handled with anti-static packaging and specialist care.' },
    { title: 'Employee Household Relocation', desc: 'Complete home shifting for relocated employees — coordinated, insured, and on schedule.' },
    { title: 'Sensitive Documents', desc: 'Confidential files packed in sealed, numbered boxes with strict inventory control.' },
    { title: 'Industrial & Lab Equipment', desc: 'Specialized handling of scientific, industrial, and laboratory instruments.' },
    { title: 'Dedicated Move Coordinator', desc: 'One point of contact for your entire corporate move — updates at every stage.' },
    { title: 'Minimal Operational Downtime', desc: 'We plan and execute moves to minimize impact on your business operations — including weekend shifts.' },
    { title: 'Post-Move Setup', desc: 'Furniture arranged, IT systems placed, offices ready for operations at the new location.' },
  ],
  whyUs: [
    { icon: '🏛️', title: 'Proven PSU Experience', desc: 'We have handled hundreds of relocations for leading public sector organizations — IOCL, Coal India, mining companies, energy firms.' },
    { icon: '🤝', title: 'Dedicated Move Coordinator', desc: 'A single point of contact manages your entire corporate move — no confusion, no coordination headaches.' },
    { icon: '🔒', title: 'Confidentiality Guaranteed', desc: 'Documents, data, and sensitive assets handled with strict confidentiality protocols and sealed inventory.' },
    { icon: '📅', title: 'Weekend & Off-Hour Moves', desc: 'We can execute moves on weekends and off-hours to ensure your business operations are not disrupted.' },
    { icon: '🛡️', title: 'Fully Insured Operations', desc: 'Every item — from the first workstation to the last server rack — is covered under comprehensive transit insurance.' },
    { icon: '🗺️', title: 'Multi-City Capability', desc: 'Relocating teams across multiple cities? We coordinate simultaneous multi-location moves across all 6 states we operate in.' },
  ],
  testimonials: [
    {
      name: 'Senior Manager, PSU Energy Company',
      city: 'Dhanbad',
      service: 'Corporate Relocation',
      initials: 'SM',
      text: 'National Packers & Movers relocated our entire office including IT infrastructure in just 3 days. Zero downtime, no damage, and absolute professionalism from start to finish. Highly recommended.',
    },
    {
      name: 'HR Head, Mining Corporation',
      city: 'Bokaro',
      service: 'Employee Relocation',
      initials: 'HR',
      text: 'We have used their employee relocation services for over 6 years. They handle every transfer — from Jharkhand to any state — with complete reliability. Our employees trust them.',
    },
  ],
  faqs: [
    {
      q: 'How far in advance should we plan a corporate move?',
      a: 'For smooth coordination, we recommend booking 2–4 weeks in advance. For large-scale office moves, 4–6 weeks allows our team to plan the move thoroughly and minimize downtime.',
    },
    {
      q: 'Can you relocate IT equipment and servers safely?',
      a: 'Yes. We use anti-static packaging, custom crating, and specialist handling for all IT equipment including servers, networking gear, and sensitive electronics.',
    },
    {
      q: 'Do you handle employee household relocations as part of corporate contracts?',
      a: 'Absolutely. We provide complete employee relocation packages — coordinating both office moves and individual household relocations simultaneously for transferred employees.',
    },
    {
      q: 'Can you execute the move on weekends or after office hours?',
      a: 'Yes. We regularly perform weekend and night moves for corporate clients to ensure zero disruption to weekday operations. Just inform us of your preference.',
    },
    {
      q: 'Do you provide a dedicated coordinator for large corporate moves?',
      a: 'Yes. Every corporate move gets a dedicated move coordinator who is your single point of contact from survey to post-move setup.',
    },
  ],
  related: [
    { slug: 'household-relocation', icon: '🏠', name: 'Household Relocation', desc: 'Complete home shifting for employees being relocated.' },
    { slug: 'industrial-relocation', icon: '🏭', name: 'Industrial Relocation', desc: 'Heavy machinery and factory equipment moved safely.' },
    { slug: 'warehousing-storage', icon: '🏪', name: 'Warehousing & Storage', desc: 'Secure interim storage during office transitions.' },
  ],
};

export default function CorporateRelocationPage() {
  return <ServicePage service={service} />;
}
