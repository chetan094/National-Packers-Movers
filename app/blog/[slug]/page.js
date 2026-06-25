import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogBySlug } from '@/lib/supabase';
import ReadingProgressBar from './ReadingProgressBar';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import styles from './page.module.css';

function getFallbackFaqs(category) {
  const cleanCategory = category ? category.trim() : '';
  
  const shiftingFaqs = [
    { question: 'How early should I start packing?', answer: 'We recommend starting the packing process at least 2 to 3 weeks before your moving date for household goods, and 3 to 4 weeks for larger office relocations.' },
    { question: 'What items cannot be loaded onto the moving truck?', answer: 'Flammable materials (like petrol, kerosene, gas cylinders), liquid paints, paint thinners, and high-value personal belongings (like gold jewelry, property papers, cash) cannot be loaded for security reasons.' },
    { question: 'Do you disassemble and reassemble large furniture?', answer: 'Yes, our trained crew disassembles king-size beds, wardrobes, and modular dining tables at the source, wraps them carefully, and reassembles them at your new destination.' },
    { question: 'What packing materials are used for fragile items?', answer: 'We use high-grade multi-layer bubble wrap, micro-foam sheets, protective cardboard edge guards, and crush-resistant ply cartons for all glassware, chinaware, and electronics.' },
    { question: 'Is transit insurance mandatory?', answer: 'While not legally mandatory, transit insurance is highly recommended. It covers accidental damage, highway collision, fire, or natural calamity risks during long-distance transport.' }
  ];
  
  const allowanceFaqs = [
    { question: 'What relocation bills are required for bank/corporate claims?', answer: 'To file a claim, you need the official consignment note (LR copy), itemized packing list, valid payment receipt, transit insurance copy, and vehicle transit bill.' },
    { question: 'Are GST bills mandatory for relocation reimbursement?', answer: 'Yes, bills must have a valid packers and movers GSTIN, and the GST amount must be clearly itemized for the claim to be verified.' },
    { question: 'Does the company reimburse car transport costs?', answer: 'Yes, most banks and corporations reimburse car transit charges via dynamic carriers or direct driving allowance, subject to the employee\'s grade scale limits.' },
    { question: 'How long does it take to settle relocation claims?', answer: 'Claims are usually verified and settled within 7 to 15 working days after submitting all original bills and supporting documents.' },
    { question: 'Is dynamic packing list weight required?', answer: 'Yes, most HR policies check the declared weight or truck category volume equivalents against the claim norms.' }
  ];
  
  const corporateFaqs = [
    { question: 'Do you provide shifting services for corporate transitions?', answer: 'Yes, we provide specialized B2B employee relocation, office inventory shifting, server packing, and warehouse storage for corporate clients.' },
    { question: 'Can you handle commercial equipment or machinery shifting?', answer: 'Yes, we utilize specialized loaders, hydraulic cranes, and heavy-duty trucks to relocate commercial machinery safely across India.' },
    { question: 'Are your packing services covered by company vouchers?', answer: 'Yes, we accept corporate relocation vouchers and coordinate directly with HR/Admin teams for consolidated invoicing.' },
    { question: 'What is the policy for corporate goods transit insurance?', answer: 'We provide comprehensive multi-risk transit insurance policies backed by national insurers to cover corporate cargo values.' },
    { question: 'How do you ensure zero business downtime during office moves?', answer: 'We coordinate weekend shifts or overnight loading operations to ensure your office relocates without affecting daily operations.' }
  ];
  
  const movingGuidesFaqs = [
    { question: 'How do I transfer my household items across state borders?', answer: 'We compile all national road permits, E-Way bills, and transit declarations to ensure smooth boundary crossing for interstate shifting.' },
    { question: 'Do I need to clean my items before packing?', answer: 'Yes, dusting furniture, vacuuming mattresses, and defrosting your refrigerator at least 24 hours prior to packing prevents transport dampness.' },
    { question: 'How should I pack immediate essentials?', answer: 'We recommend packing a separate essentials bag containing basic toiletries, daily medicines, property keys, chargers, and carrying it with you.' },
    { question: 'When is the best time to book movers?', answer: 'Shifting schedules book up quickly. Booking 10 to 15 days in advance guarantees your preferred shifting date and avoids last-minute premiums.' },
    { question: 'Do you charge extra for stairs packing?', answer: 'Staircase carrying charges are determined during our pre-move survey and are always pre-disclosed in our transparent quotes.' }
  ];
  
  const vehicleFaqs = [
    { question: 'How do you transport cars safely across India?', answer: 'We transport cars using specialized car carriers, closed container trailers, or open towing decks with high-tension wheel harnesses.' },
    { question: 'What documents are required for vehicle transit?', answer: 'We require a photocopy of the vehicle registration certificate (RC), valid insurance paper, and pollution clearance (PUC) certificate.' },
    { question: 'Should the car fuel tank be full during transport?', answer: 'No, we recommend keeping the fuel tank at around a quarter (1/4) full to ensure safety while driving on and off the carrier.' },
    { question: 'Are personal items allowed inside the transported vehicle?', answer: 'No, transport authorities prohibit storing personal goods inside vehicle cabins during highway trailer transit.' },
    { question: 'How long does vehicle transit take?', answer: 'Interstate vehicle transit typically takes 5 to 7 days, depending on route distances and highway rules.' }
  ];
  
  const howToFaqs = [
    { question: 'Should cushions and pillows be packed separately?', answer: 'Yes, detachable cushions, pillows, and sofa pads should be wrapped in dust-resistant plastic film and packed separately.' },
    { question: 'What wrap prevents wood moisture and leather damage?', answer: 'We wrap delicate leather and fabric furniture in breathable paper sheets first, followed by thick blankets and stretch film.' },
    { question: 'How do you pack heavy appliances?', answer: 'Appliances are wrapped in high-density foam, secured with heavy-duty straps, and loaded vertically to protect compressors.' },
    { question: 'Can I keep books in dresser drawers during the shift?', answer: 'No, dresser drawers must be empty. Keeping heavy books in drawers can damage structural joints during vehicle movement.' },
    { question: 'How do you protect electronic screens?', answer: 'We wrap LCD/LED screens in thick anti-static bubble wrap, place them between protective card panels, and pack them in specialized TV cartons.' }
  ];

  if (cleanCategory === 'Relocation Allowance' || cleanCategory === 'Corporate & PSU') {
    return allowanceFaqs;
  }
  if (cleanCategory === 'Corporate Guides') {
    return corporateFaqs;
  }
  if (cleanCategory === 'Moving Guides') {
    return movingGuidesFaqs;
  }
  if (cleanCategory === 'Vehicle Transit') {
    return vehicleFaqs;
  }
  if (cleanCategory === 'How To?') {
    return howToFaqs;
  }
  return shiftingFaqs; // Default shifting fallback
}

// Revalidate public article page every 30s
export const revalidate = 30;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return {
      title: 'Article Not Found | National Packers & Movers',
      description: 'The requested blog post could not be found.'
    };
  }
  return {
    title: `${blog.title} | National Packers & Movers`,
    description: blog.excerpt,
    keywords: `${blog.category.toLowerCase()}, packers and movers, shifting advice, ${blog.title.toLowerCase().split(' ').join(', ')}`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image_url }]
    }
  };
}

// Helper to parse blog body markdown and extract HowTo steps
function generateHowToSchema(blog) {
  if (!blog || !blog.content) return null;

  const lines = blog.content.split('\n');
  const steps = [];
  let currentStep = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Match headers starting with numbers (e.g. ## 1. Disassemble or ### Step 2: Wrap)
    const headingMatch = line.match(/^#{2,3}\s+(?:Step\s+)?(\d+)[\.\:]?\s*(.*)$/i);

    if (headingMatch) {
      if (currentStep) {
        steps.push(currentStep);
      }
      currentStep = {
        '@type': 'HowToStep',
        'name': headingMatch[2].trim() || `Step ${headingMatch[1]}`,
        'itemListElement': [
          {
            '@type': 'HowToDirection',
            'text': ''
          }
        ]
      };
    } else if (currentStep && line && !line.startsWith('#')) {
      // Append content text to step directions, stripping markdown bold/italic
      const cleanLine = line
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .trim();
      if (cleanLine) {
        const direction = currentStep.itemListElement[0];
        if (direction.text) {
          direction.text += ' ' + cleanLine;
        } else {
          direction.text = cleanLine;
        }
      }
    }
  }

  if (currentStep) {
    steps.push(currentStep);
  }

  // Fallback: Use bullet points if no numbered headings are detected
  if (steps.length === 0) {
    let stepNum = 1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const text = line.substring(2).replace(/\*\*/g, '').replace(/\*/g, '').trim();
        if (text) {
          steps.push({
            '@type': 'HowToStep',
            'name': `Step ${stepNum}`,
            'itemListElement': [
              {
                '@type': 'HowToDirection',
                'text': text
              }
            ]
          });
          stepNum++;
        }
      }
    }
  }

  // Final fallback: Use the excerpt if no list elements are found
  if (steps.length === 0) {
    steps.push({
      '@type': 'HowToStep',
      'name': 'Step 1: Follow the Shifting Guide',
      'itemListElement': [
        {
          '@type': 'HowToDirection',
          'text': blog.excerpt || 'Follow the step-by-step guidance provided in the article.'
        }
      ]
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': blog.title,
    'description': blog.excerpt,
    'image': blog.image_url,
    'step': steps
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const howToSchema = blog.category === 'How To?' ? generateHowToSchema(blog) : null;

  const faqsList = blog.faqs && blog.faqs.length > 0 ? blog.faqs : getFallbackFaqs(blog.category);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsList.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(words / wordsPerMinute));

  // Simple Markdown Parsing for public render
  const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Callout blocks - run before \n\n split
    html = html.replace(/:::info\r?\n([\s\S]*?)\r?\n:::/g, (match, p1) => {
      const cleanContent = p1.trim().replace(/\n/g, '<br />');
      return `<div class="infoCallout">${cleanContent}</div>`;
    });
    html = html.replace(/:::warning\r?\n([\s\S]*?)\r?\n:::/g, (match, p1) => {
      const cleanContent = p1.trim().replace(/\n/g, '<br />');
      return `<div class="warningCallout">${cleanContent}</div>`;
    });

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Inline elements
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<u>$1</u>');
    html = html.replace(/==(.*?)==/g, '<mark class="goldHighlight">$1</mark>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="blogLink">$1</a>');
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bullet Lists
    const lines = html.split('\n');
    let inList = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        if (!inList) {
          lines[i] = '<ul><li>' + itemText + '</li>';
          inList = true;
        } else {
          lines[i] = '<li>' + itemText + '</li>';
        }
      } else {
        if (inList) {
          lines[i] = '</ul>' + lines[i];
          inList = false;
        }
      }
    }
    if (inList) {
      lines.push('</ul>');
    }
    html = lines.join('\n');

    // Paragraphs
    html = html.split('\n\n').map(p => {
      const trimmed = p.trim();
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<block') ||
        trimmed.startsWith('</ul') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('</div')
      ) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br />')}</p>`;
    }).join('\n');

    return html;
  };

  return (
    <div className={styles.articlePage}>
      {/* ── SEO JSON-LD HowTo Schema ────────────────────────── */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* ── SEO JSON-LD FAQPage Schema ────────────────────────── */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Scroll indicator bar at the top */}
      <ReadingProgressBar />

      <div className={`${styles.articleContainer} container`}>
        {/* Navigation Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/blog" className={styles.backBtn}>
            <span>←</span> Back to Articles
          </Link>
        </div>

        {/* HERO CANVAS */}
        <header className={styles.articleHeader}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{blog.category}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaText}>⏱️ {readTime} min read</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaText}>
              📅 {new Date(blog.created_at).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          <h1 className={styles.articleTitle}>{blog.title}</h1>
          <p className={styles.articleExcerpt}>{blog.excerpt}</p>

          <div className={styles.coverImageWrapper}>
            <img src={blog.image_url} alt={blog.title} className={styles.coverImage} />
          </div>
        </header>

        {/* ARTICLE BODY */}
        <section className={styles.articleBody}>
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
          />
        </section>

        {/* CRAWLER-FRIENDLY ACCORDION FAQs */}
        <section className={styles.faqSection} id="faq-section">
          <h2 className={styles.faqSectionTitle}>Frequently Asked Questions (FAQs)</h2>
          <div className={styles.faqAccordionContainer}>
            <FaqAccordion faqs={faqsList.map(f => ({ q: f.question, a: f.answer }))} />
          </div>
        </section>

        {/* DYNAMIC B2B/B2C LEAD CTA */}
        <footer className={styles.articleFooter}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaTextContainer}>
              <h3 className={styles.ctaTitle}>Moving Soon?</h3>
              <p className={styles.ctaText}>
                Get an instant B2B or household relocation quote for free.
              </p>
            </div>
            <Link href="/get-quote" className={styles.ctaBtn}>
              Request Free Quote ➔
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
