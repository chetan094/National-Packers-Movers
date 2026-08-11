'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './PageCurtain.module.css';

/**
 * PageCurtain — cinematic gold/navy wipe transition between pages.
 * A full-screen overlay slides in from the left, briefly covers the screen
 * while the new page loads, then sweeps out to the right.
 * Mounted globally in layout.js so it fires on every navigation.
 */
export default function PageCurtain() {
  const pathname = usePathname();
  return <div key={pathname} className={styles.curtain} aria-hidden="true" />;
}
