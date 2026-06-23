import ServicePage from '@/components/ServicePage/ServicePage';

export const metadata = {
  title: 'Industrial Relocation Services | National Packers & Movers | Heavy Machinery Transport',
  description: 'Expert industrial relocation — heavy machinery, factory equipment, industrial plants moved safely across India. Specialized handling, safety compliance. Call 9835168368.',
  keywords: 'industrial relocation india, heavy machinery transport, factory relocation jharkhand, industrial equipment movers, plant relocation services india',
};

const service = {
  slug: 'industrial-relocation',
  name: 'Industrial Relocation',
  tag: 'Heavy Machinery & Factory Shifting',
  icon: '🏭',
  heroTitle: 'Industrial Relocation <span>Done Safely.</span><br/>Heavy Machinery, Zero Compromise.',
  heroSubtitle: 'Specialized industrial relocation for factories, plants, and heavy equipment. Experienced in handling the most complex machinery moves across multiple states with full safety compliance.',
  stats: [
    { number: 200, suffix: '+', label: 'Industrial Moves' },
    { number: 38, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Safety Compliant' },
    { number: 6, suffix: '', label: 'States Covered' },
  ],
  included: [
    { title: 'Heavy Machinery Transport', desc: 'CNC machines, lathes, presses, generators — moved with specialized equipment and rigging.' },
    { title: 'Factory & Plant Relocation', desc: 'Complete factory shifting including production lines, conveyor systems, and plant infrastructure.' },
    { title: 'Electrical Equipment Handling', desc: 'Transformers, control panels, switchgear — handled by technically trained personnel.' },
    { title: 'Rigging & Crane Services', desc: 'Overhead crane, forklift, and rigging support for loading and unloading heavy equipment.' },
    { title: 'Safety Compliance', desc: 'All moves planned and executed with strict industrial safety standards and regulatory compliance.' },
    { title: 'Custom Crating & Packaging', desc: 'Heavy-duty wooden crating, foam lining, and custom packaging for sensitive industrial parts.' },
    { title: 'Disassembly & Reassembly', desc: 'Industrial machinery professionally disassembled, transported, and reassembled by trained engineers.' },
    { title: 'Multi-Trip Coordination', desc: 'Large factory relocations handled with coordinated multi-truck, multi-trip planning.' },
  ],
  whyUs: [
    { icon: '⚙️', title: 'Specialized Equipment', desc: 'Cranes, forklifts, and rigging gear available for loading and unloading your heaviest machinery.' },
    { icon: '🔐', title: 'Safety First Approach', desc: 'Every industrial move is planned with full safety risk assessment — zero shortcuts, zero compromise.' },
    { icon: '👷', title: 'Technically Trained Staff', desc: 'Our team includes personnel experienced in handling electrical and mechanical industrial equipment.' },
    { icon: '📦', title: 'Heavy-Duty Packing', desc: 'Customized wooden crating and industrial-grade packaging materials for maximum protection.' },
    { icon: '🕐', title: 'Minimal Production Loss', desc: 'We plan the move timeline to minimize downtime and get your factory operational again as fast as possible.' },
    { icon: '🗺️', title: 'Multi-State Coverage', desc: 'Industrial relocations across Jharkhand, West Bengal, Bihar, MP, and all connected states.' },
  ],
  testimonials: [
    {
      name: 'Sayan Gorai',
      city: 'Dhanbad',
      service: 'Industrial Relocation',
      initials: 'SG',
      text: 'Best packers and Movers for transportation of industrial goods as well as household goods. They provided me with a closed, fully secure container. Their highly skilled staff packed my goods perfectly to prevent any damage during transit.',
    },
    {
      name: 'Gora Chand Bose',
      city: 'Bokaro',
      service: 'Industrial Relocation',
      initials: 'GB',
      text: 'I had a wonderful experience with National Packers & Movers. Everyone is very courteous and understanding. I highly recommend this company for everyone who is in need of a hassle-free service through and through.',
    },
  ],
  faqs: [
    {
      q: 'Can you handle very heavy machinery (10+ tonnes)?',
      a: 'Yes. We have crane and rigging capabilities for extremely heavy machinery. Our team assesses each piece of equipment and plans the appropriate lifting and loading method.',
    },
    {
      q: 'Do you disassemble and reassemble industrial equipment?',
      a: 'Yes. Our team includes technically trained personnel for disassembly and reassembly of industrial machines. We can also coordinate with your in-house engineers for specialized equipment.',
    },
    {
      q: 'How do you ensure safety during industrial moves?',
      a: 'We conduct a full site survey and risk assessment before every industrial move. All operations comply with industrial safety standards, and our team uses proper PPE and safety equipment.',
    },
    {
      q: 'Can you move electrical equipment like transformers and control panels?',
      a: 'Yes. Transformers, switchgear, control panels, and other electrical equipment are handled by trained personnel using appropriate safety protocols and insulated packaging.',
    },
    {
      q: 'How long does an industrial relocation take?',
      a: 'It depends on the scale. Small machinery moves can be completed in 1–2 days. Full factory relocations are planned over 1–4 weeks. We provide a detailed timeline after the initial site survey.',
    },
  ],
  related: [
    { slug: 'corporate-relocation', icon: '🏢', name: 'Corporate Relocation', desc: 'Office and employee relocations with zero downtime.' },
    { slug: 'warehousing-storage', icon: '🏪', name: 'Warehousing & Storage', desc: 'Secure storage for equipment during factory transition.' },
    { slug: 'loading-unloading', icon: '📦', name: 'Loading & Unloading', desc: 'Trained labour for industrial loading and unloading.' },
  ],
};

export default function IndustrialRelocationPage() {
  return <ServicePage service={service} />;
}
