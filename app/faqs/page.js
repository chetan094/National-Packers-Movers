import Link from 'next/link';
import { getCustomMetadata } from '@/lib/supabase';
import styles from './faqs.module.css';

// Dynamic SEO metadata
export async function generateMetadata() {
  const path = '/faqs';
  const custom = await getCustomMetadata(path);

  const title = custom?.meta_title || 'Frequently Asked Questions (FAQs) | National Packers & Movers';
  const description = custom?.meta_description || 'Get answers to your shifting queries. Learn about household shifting charges, packing quality, insurance policies, and PSU relocation reimbursement bills.';
  const keywords = custom?.meta_keywords || 'packers and movers charges, movers and packers faqs, shifting cost calculator, house shifting process, original agarwal packers, best movers india';
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
      canonical: 'https://www.thenationalpackersmovers.com/faqs',
    },
  };
}

const FAQ_DATA = [
  {
    category: 'Shifting Charges',
    icon: '💰',
    items: [
      {
        q: 'How much do packers and movers charge for shifting?',
        a: 'Packers and movers charges depend on three primary factors: the volume of goods, the packing material quality, and the distance. For local house shifting (within 15km), charges typically range from ₹3,000 to ₹6,000 for a 1 BHK, ₹6,000 to ₹10,000 for a 2 BHK, and ₹10,000 to ₹16,000 for a 3 BHK. For long-distance inter-state relocations, rates vary depending on distance and vehicle type (shared carrier vs. dedicated closed truck).'
      },
      {
        q: 'Are there any hidden costs in shifting estimates?',
        a: 'At National Packers & Movers, honesty is our principle. Our pre-move survey quote is final. We do not charge hidden fees. The quote includes all labor, transport, toll taxes, and standard packing materials. Any optional services like transit insurance or unpacking assembly are clearly itemized beforehand.'
      },
      {
        q: 'Does it cost extra for high-floor apartments or non-lift buildings?',
        a: 'Yes, if your apartment is on a high floor (typically 3rd floor or above) and there is no service lift available, a minor additional labor fee is added. This is because the loading crew has to manually carry heavy furniture and appliances down/up the stairs, which takes significantly more time and physical effort.'
      },
      {
        q: 'What factors cause packers and movers rates to increase?',
        a: 'Rates increase during weekends, month-ends, and peak summer relocation seasons due to high demand. Other factors include the need for special packing (wooden crates for delicate glass, marble, or pianos), difficult loading conditions (parking vehicle >50 meters from building gate), and complex dismantling requirements.'
      },
      {
        q: 'Is it cheaper to hire local loaders and a truck separately?',
        a: 'While it might seem cheaper initially, it is highly risky. Local loaders lack professional training to pack fragile items (electronics, glass) and carry heavy loads up stairs without damage. In case of breakage, you have no insurance cover or liability protection. National Packers & Movers handles everything end-to-end with professional risk coverage.'
      },
      {
        q: 'Do you offer a free pre-move survey, and is it binding?',
        a: 'Yes, we provide 100% free pre-move surveys, both online via video call and physically at your doorstep. Our survey officer assesses the volume of goods, packing requirements, and vehicle access. The quotation we submit after the survey is locked and binding, with no surprises on shifting day.'
      }
    ]
  },
  {
    category: 'Moving Process',
    icon: '📦',
    items: [
      {
        q: 'What is packers and movers and how do they work?',
        a: 'Packers and movers are professional logistics service providers that manage end-to-end relocation. The process works in five steps: 1) Pre-move survey to estimate volume, 2) Multi-layer packing on moving day, 3) Secure loading into closed container trucks, 4) Direct highway transit to destination, and 5) Unloading and reassembly setup at your new home.'
      },
      {
        q: 'What items are not allowed to be loaded in the shifting truck?',
        a: 'For safety regulations, we do not transport hazardous materials, inflammable liquids (petrol, gas cylinders), explosives, acids, agricultural chemicals, aerosol sprays, or perishable food items. We also strongly recommend that clients personally carry high-value items like cash, jewelry, original land deeds, and personal laptops.'
      },
      {
        q: 'Do you disassemble and reassemble furniture like beds and wardrobes?',
        a: 'Yes, our trained crew carries standard tools to disassemble large items like double beds, dining tables, and modular wardrobes for safe transit. Upon reaching the destination, we unpack and reassemble them exactly where you specify. This service is included in our standard shifting quotation.'
      },
      {
        q: 'How many days in advance should I book my move?',
        a: 'For local shifts, booking 3 to 5 days in advance is sufficient. For inter-state relocations, we recommend booking at least 7 to 10 days in advance. This allows us to secure a dedicated container truck and coordinate the packing crew schedules during peak seasons.'
      },
      {
        q: 'How long does it take to pack and load a standard house?',
        a: 'Packing and loading a 1 BHK takes roughly 3-4 hours; a 2 BHK takes 5-6 hours; and a 3 BHK or large independent house takes 7-9 hours. Our crew works systematically, packing room-by-room to keep your inventory organized.'
      }
    ]
  },
  {
    category: 'Trust & Authenticity',
    icon: '🛡️',
    items: [
      {
        q: 'Which is the original Agarwal Packers and Movers?',
        a: 'Agarwal Packers and Movers (associated with the DRS Group) is a well-known logistics brand in India. However, due to its popularity, hundreds of fake and copycat operators use similar names, causing confusion. To ensure you do not get scammed by copycats, choose a fully independent, legally registered, and verified brand. National Packers & Movers (established in 1987 by Debabrata Jhampaty) has physical offices in Jharkhand (Dhanbad, Ranchi, Bokaro, Deoghar), West Bengal, Bihar, and MP, and operates with its own fleet and 100% transparent GST billing.'
      },
      {
        q: 'Which is the best movers and packers in India?',
        a: 'The best movers and packers are those that provide: 1) ISO 9001:2015 registration, 2) GST-registered bills, 3) 100% transit insurance backing, 4) in-house trained packing crew (no temporary loaders), and 5) positive verified customer reviews. National Packers & Movers excels in all these parameters, making it the most trusted shifting brand in Eastern and Central India.'
      },
      {
        q: 'How can I verify if a packers and movers company is genuine or fake?',
        a: 'Verify five parameters: 1) Active physical office address (visit if possible), 2) Valid GST registration (GSTIN matching company name), 3) Company-owned transport fleet, 4) Real reviews on Google & Justdial with historical data (beware of newly created listings with fake 5-star reviews), and 5) IBA (Indian Banks\' Association) approval status.'
      },
      {
        q: 'Is National Packers & Movers registered and certified?',
        a: 'Yes. National Packers & Movers was established in 1987 by Debabrata Jhampaty and is fully registered since 1997. We are an ISO 9001:2015 certified company with valid GST registration, owned logistics networks, and verified offices in UP, West Bengal, Jharkhand, Bihar, MP, and AP.'
      }
    ]
  },
  {
    category: 'Insurance & Safety',
    icon: '✅',
    items: [
      {
        q: 'Is transit insurance mandatory for home shifting?',
        a: 'Yes, we strongly recommend transit insurance for all inter-city moves. Transit insurance covers your household goods against unforeseen highway risks, accidents, or weather damage during long-distance travel. The standard premium is 3% of the declared value of your goods, and we handle all documentation and claim processing directly.'
      },
      {
        q: 'What materials do you use for packing items?',
        a: 'We use high-grade multi-layer packaging: heavy-duty corrugated cartons for kitchenware, bubble wrap for electronics and glass objects, foam sheet padding for polished wooden furniture, and waterproof stretch wraps to safeguard against dust and rain during highway transit.'
      },
      {
        q: 'What is the difference between Declared Value and Shifting Insurance?',
        a: 'Declared Value is the worth you assign to your goods for transit documents. Shifting Insurance is the risk coverage policy based on that value. We offer all-inclusive transit risk coverage (usually 3% of declared value) that reimburses you for accidental damages, water damage, or loss of items during highway transit.'
      },
      {
        q: 'How do you pack and transport fragile items and glassware?',
        a: 'Fragile items like kitchen crockery, crystal vases, and mirrors are wrapped individually in bubble wrap, layered with soft craft paper, and packed into thick, double-walled corrugated boxes with foam fillings to absorb vibrations. Boxes are labeled "Fragile - Handle with Care" and loaded on top of heavy furniture items.'
      },
      {
        q: 'Can I pack my own belongings to save money?',
        a: 'You may pack non-fragile personal belongings like clothes, books, and bedsheets. However, to qualify for transit insurance coverage, professional electronics, heavy furniture, and glass items must be packed by our trained crew. Insurance providers do not cover items packed by owners ("PBO").'
      }
    ]
  },
  {
    category: 'PSU & Corporate Claims',
    icon: '📋',
    items: [
      {
        q: 'Do you provide bills for PSU relocation reimbursement claims?',
        a: 'Yes, we specialize in corporate and PSU relocations (Railways, Coal India/BCCL/NCL, Banks, and Govt. Departments). We provide a complete, 100% compliant reimbursement document kit. This includes GST Tax Invoices (SAC 9965), Consignment Notes (Lorry Receipt / LR Copy), itemized packing checklists, and stamped money receipts aligned with IBA standards.'
      },
      {
        q: 'What documents are required to claim shifting allowance?',
        a: 'Generally, you will need: 1) GST Invoice, 2) LR (Consignment Note), 3) Itemized Packing List, and 4) Money Receipt. We provide all these documents bearing our official company stamp and GSTIN, ensuring a seamless claim process for your corporate allowance.'
      },
      {
        q: 'Do your bills contain a valid IBA approval stamp?',
        a: 'Yes, we provide IBA-aligned Consignment Notes (LR copies) and invoices which are universally accepted by nationalized banks, CIL (Coal India), SAIL, NTPC, railways, and other public/government institutions across India for employee transit reimbursement.'
      },
      {
        q: 'Can you provide a car/bike transport receipt for corporate claims?',
        a: 'Yes, we provide vehicle consignment notes containing engine/chassis numbers, pre-car checkup checklists, and official tax invoices detailing vehicle relocation charges to ensure your vehicle transport allowance is processed smoothly.'
      },
      {
        q: 'What is the GST rate applicable for packers and movers services?',
        a: 'Shifting services attract GST at two rates: 18% for full-service relocation (packing, loading, transport, unloading) and 5% for transport-only logistics. For corporate and PSU reimbursement claims, a full 18% GST invoice is usually required to document complete service integration.'
      }
    ]
  }
];

export default async function FaqPage() {
  // Consolidate all Q&As for JSON-LD Schema
  const allSchemaItems = FAQ_DATA.flatMap(cat => cat.items);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': allSchemaItems.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  return (
    <>
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <header className={styles.faqHero}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroGridBg} />
        <div className="container text_center" style={{ position: 'relative', zIndex: 3 }}>
          <span className={styles.heroTag}>Help Center</span>
          <h1 className={styles.faqHeroTitle}>Frequently Asked <span>Questions</span></h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSubtitle}>
            Got questions about home shifting, rates, or PSU claims? Find honest, direct answers here.
          </p>
        </div>
      </header>

      {/* Main content grid */}
      <main className={`section ${styles.faqMain}`}>
        <div className="container">
          <div className={styles.faqGrid}>
            
            {/* Sidebar links index */}
            <aside className={styles.faqSidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                <div className={styles.sidebarDivider} />
                <nav className={styles.sidebarNav}>
                  {FAQ_DATA.map((cat, idx) => (
                    <a
                      key={idx}
                      href={`#${cat.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className={styles.sidebarLink}
                    >
                      <span className={styles.sidebarIcon}>{cat.icon}</span>
                      {cat.category}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Q&A sections layout */}
            <section className={styles.faqContent}>
              {FAQ_DATA.map((cat, catIdx) => {
                const sectionId = cat.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <div key={catIdx} id={sectionId} className={styles.faqSection}>
                    <h2 className={styles.sectionTitle}>
                      <span className={styles.sectionIcon}>{cat.icon}</span>
                      {cat.category}
                    </h2>
                    <div className={styles.accordionContainer}>
                      {cat.items.map((item, itemIdx) => (
                        <details
                          key={itemIdx}
                          className={styles.accordionItem}
                        >
                          <summary className={styles.accordionSummary}>
                            <h3>{item.q}</h3>
                            <span className={styles.accordionArrow}>+</span>
                          </summary>
                          <div className={styles.accordionBody}>
                            <p>{item.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>

          </div>
        </div>
      </main>

      {/* Call to Action bottom panel */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container text_center">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Still Have Shifting Questions?</h2>
            <p className={styles.ctaText}>
              Can\'t find the answer you are looking for? Our relocation experts are available 24/7 to clear your doubts or schedule a free pre-move survey.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/get-quote" className="btn btn-primary btn-lg">
                🚀 Calculate Shifting Cost
              </Link>
              <a
                href="https://wa.me/919835168368?text=Hello!%20I%20have%20some%20questions%20regarding%20shifting%20with%20National%20Packers%20%26%20Movers."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
