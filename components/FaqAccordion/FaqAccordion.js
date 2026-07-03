'use client';

import { useState, useRef, useEffect } from 'react';

export default function FaqAccordion({
  faqs,
  itemClass = 'centralFaqItem',
  questionClass = 'centralFaqQuestion',
  iconClass = 'centralFaqToggleIcon',
  answerClass = 'centralFaqAnswer',
  renderSchema = true
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const detailsRefs = useRef([]);
  const contentRefs = useRef([]);

  // Adjust open element maxHeight on window resize to remain responsive
  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== null && contentRefs.current[activeIndex]) {
        contentRefs.current[activeIndex].style.maxHeight = 'none';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  const handleToggle = (e, index) => {
    e.preventDefault(); // Prevent standard instant browser details toggle

    const detailsEl = detailsRefs.current[index];
    const contentEl = contentRefs.current[index];
    if (!detailsEl || !contentEl) return;

    const isOpen = detailsEl.hasAttribute('open');

    if (isOpen) {
      // ── CLOSE CURRENT ITEM ──
      // 1. Set current scroll height as starting point
      contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
      contentEl.offsetHeight; // Force DOM reflow
      
      // 2. Set to 0px to trigger the transition
      contentEl.style.maxHeight = '0px';

      const onTransitionEnd = () => {
        detailsEl.removeAttribute('open');
        contentEl.removeEventListener('transitionend', onTransitionEnd);
      };
      contentEl.addEventListener('transitionend', onTransitionEnd);
      setActiveIndex(null);
    } else {
      // ── OPEN CLICKED ITEM ──
      
      // First, collapse any currently active sibling FAQ item
      if (activeIndex !== null && activeIndex !== index) {
        const prevDetailsEl = detailsRefs.current[activeIndex];
        const prevContentEl = contentRefs.current[activeIndex];
        if (prevDetailsEl && prevContentEl) {
          prevContentEl.style.maxHeight = `${prevContentEl.scrollHeight}px`;
          prevContentEl.offsetHeight; // Force reflow
          prevContentEl.style.maxHeight = '0px';

          const onTransitionEndPrev = () => {
            prevDetailsEl.removeAttribute('open');
            prevContentEl.removeEventListener('transitionend', onTransitionEndPrev);
          };
          prevContentEl.addEventListener('transitionend', onTransitionEndPrev);
        }
      }

      // Open the new FAQ item
      detailsEl.setAttribute('open', '');
      contentEl.style.maxHeight = '0px';
      contentEl.offsetHeight; // Force reflow
      contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;

      const onTransitionEnd = () => {
        // Set to none to make it responsive on font-size changes / window resizing
        contentEl.style.maxHeight = 'none';
        contentEl.removeEventListener('transitionend', onTransitionEnd);
      };
      contentEl.addEventListener('transitionend', onTransitionEnd);
      setActiveIndex(index);
    }
  };

  const faqSchema = renderSchema && faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  } : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {faqs.map((faq, i) => {
        return (
          <details
            key={i}
            ref={(el) => (detailsRefs.current[i] = el)}
            className={itemClass}
          >
            <summary
              className={questionClass}
              onClick={(e) => handleToggle(e, i)}
            >
              <span>{faq.q}</span>
              <span className={iconClass}></span>
            </summary>
            <div
              ref={(el) => (contentRefs.current[i] = el)}
              className={answerClass}
              style={{
                maxHeight: '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out'
              }}
            >
              <p>{faq.a}</p>
            </div>
          </details>
        );
      })}
    </>
  );
}
