'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * SlotCounter — slot-machine style number animation.
 * Rapidly spins through random numbers then settles on the final value.
 * Props:
 *   end: final number to display
 *   suffix: string appended after number (e.g. '+', '%')
 *   duration: total animation time in ms (default 2400)
 *   locale: whether to use Indian number formatting (default true)
 */
export default function SlotCounter({ end, suffix = '', duration = 2400, locale = true }) {
  const [display, setDisplay] = useState(end);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const spinDuration = duration * 0.58;  // 58% rapid spin
    const settleDuration = duration * 0.42; // 42% smooth settle

    let spinTimer;
    let settleTimer;
    let done = false;

    // Phase 1: Rapid random spin — feels like a slot machine
    spinTimer = setInterval(() => {
      setDisplay(Math.floor(Math.random() * (end * 1.3)));
    }, 55);

    // Phase 2: Smooth settle to final value using easeOutCubic
    setTimeout(() => {
      clearInterval(spinTimer);
      if (done) return;

      const startVal = Math.floor(Math.random() * (end * 0.4));
      const startTime = performance.now();

      settleTimer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / settleDuration, 1);
        // easeOutCubic: decelerates as it approaches target
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (end - startVal) * eased);
        setDisplay(current);

        if (progress >= 1) {
          setDisplay(end);
          done = true;
          clearInterval(settleTimer);
        }
      }, 16);
    }, spinDuration);

    return () => {
      clearInterval(spinTimer);
      clearInterval(settleTimer);
    };
  }, [started, end, duration]);

  const formatted = locale
    ? display.toLocaleString('en-IN')
    : display.toString();

  return <span ref={ref}>{formatted}{suffix}</span>;
}
