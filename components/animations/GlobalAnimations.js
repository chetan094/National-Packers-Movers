'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * GlobalAnimations — layout-level animation engine.
 * Automatically applies to ALL pages, current and future.
 *
 * Usage in any page (no imports needed):
 *
 * SCROLL REVEAL:
 *   <div data-reveal="up">...</div>         ← slide up on scroll
 *   <div data-reveal="left">...</div>       ← slide from left
 *   <div data-reveal="right">...</div>      ← slide from right
 *   <div data-reveal="fade">...</div>       ← fade only
 *   <div data-reveal="up" data-delay="200"> ← 200ms stagger delay
 *
 * TYPEWRITER:
 *   <span data-typewriter="Your text here" data-tw-speed="42" />
 */
export default function GlobalAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runInit = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        document.querySelectorAll('[data-reveal]').forEach(el => {
          el.classList.add('reveal-visible');
        });
        document.querySelectorAll('[data-typewriter]').forEach(el => {
          el.textContent = el.dataset.typewriter || '';
        });
        return;
      }

      initScrollReveal();
      initTypewriter();
    };

    // Run immediately on path change
    runInit();

    // Create a MutationObserver to listen for newly inserted elements.
    // This solves issues where client-rendered pages mount slightly after page curtain/path change.
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewReveal = false;
      let hasNewTypewriter = false;

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          if (node.querySelector('[data-reveal]') || node.hasAttribute('data-reveal')) {
            hasNewReveal = true;
          }
          if (node.querySelector('[data-typewriter]') || node.hasAttribute('data-typewriter')) {
            hasNewTypewriter = true;
          }
        });
      });

      if (hasNewReveal) initScrollReveal();
      if (hasNewTypewriter) initTypewriter();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Staggered check-up timers just in case to capture late mounts
    const timer1 = setTimeout(runInit, 120);
    const timer2 = setTimeout(runInit, 350);

    return () => {
      mutationObserver.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  return null;
}

/* ── Scroll Reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  // Only target elements not yet observed
  const elements = document.querySelectorAll('[data-reveal]:not([data-reveal-init])');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('reveal-visible');
          el.classList.remove('reveal-hidden', 'reveal-up', 'reveal-left', 'reveal-right', 'reveal-fade');
        }, delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => {
    // Mark as initialized so re-renders don't double-animate
    el.setAttribute('data-reveal-init', 'true');
    el.classList.add('reveal-hidden', `reveal-${el.dataset.reveal || 'up'}`);
    observer.observe(el);
  });
}

/* ── Typewriter ─────────────────────────────────────────────── */
function initTypewriter() {
  const elements = document.querySelectorAll('[data-typewriter]:not([data-tw-done])');

  elements.forEach(el => {
    const text = el.dataset.typewriter;
    if (!text) return;

    el.setAttribute('data-tw-done', 'true');

    const speed      = parseInt(el.dataset.twSpeed || '42', 10);
    const startDelay = parseInt(el.dataset.twDelay || '500', 10);

    // Clear content and create cursor
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.textContent = '|';
    el.appendChild(cursor);

    let index = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        if (index < text.length) {
          cursor.insertAdjacentText('beforebegin', text[index]);
          index++;
        } else {
          clearInterval(timer);
          cursor.classList.add('tw-cursor-done');
        }
      }, speed);
    }, startDelay);
  });
}
