'use client';
import { useState, useEffect } from 'react';
import styles from './Typewriter.module.css';

/**
 * Typewriter — types text character by character, then blinks cursor briefly before fading it.
 * Props:
 *   text: string to type
 *   speed: ms per character (default 42)
 *   startDelay: ms before typing begins (default 600)
 *   className: class for the outer span
 */
export default function Typewriter({ text, speed = 42, startDelay = 600, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let typingTimer;

    const startTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(typingTimer);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(typingTimer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={`${styles.typewriter} ${className}`}>
      {displayed}
      <span className={`${styles.cursor} ${done ? styles.cursorDone : ''}`}>|</span>
    </span>
  );
}
