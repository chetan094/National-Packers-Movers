'use client';
import { useEffect, useRef } from 'react';
import styles from './Reveal.module.css';

/**
 * Scroll Reveal wrapper — fades + slides children into view when they enter the viewport.
 * Props:
 *   direction: 'up' | 'left' | 'right' | 'fade'  (default: 'up')
 *   delay: milliseconds before animation starts after element is in view  (default: 0)
 *   className: extra class to pass to wrapper
 */
export default function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(styles.visible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add(styles.visible), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${styles[direction] || styles.up} ${className}`}
    >
      {children}
    </div>
  );
}
