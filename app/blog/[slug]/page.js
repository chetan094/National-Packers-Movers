import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogBySlug } from '@/lib/supabase';
import ReadingProgressBar from './ReadingProgressBar';
import styles from './page.module.css';

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
