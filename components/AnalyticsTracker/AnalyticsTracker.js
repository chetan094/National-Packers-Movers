'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, trackTimeSpent } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const prevPathRef = useRef('');
  const entryTimeRef = useRef(0);

  useEffect(() => {
    const currentUrl = pathname + (typeof window !== 'undefined' ? window.location.search : '');
    
    // If there is a previous path, calculate and report the duration spent on it
    if (prevPathRef.current && prevPathRef.current !== currentUrl) {
      const duration = Math.round((Date.now() - entryTimeRef.current) / 1000);
      if (duration > 0 && duration < 3600) { // Max 1 hour tracking limit (ignores suspended tabs)
        trackTimeSpent(prevPathRef.current, duration);
      }
    }

    // Track the new page view event
    trackEvent('page_view');
    
    // Reset page metrics
    entryTimeRef.current = Date.now();
    prevPathRef.current = currentUrl;
  }, [pathname]);

  // Track page exit on visibility switch (tab minimize, hide, close, or focus shifts)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const currentPath = prevPathRef.current || (pathname + window.location.search);
      if (document.visibilityState === 'hidden') {
        const duration = Math.round((Date.now() - entryTimeRef.current) / 1000);
        if (duration > 0 && duration < 3600) {
          trackTimeSpent(currentPath, duration);
        }
      } else {
        // Reset focus entry baseline
        entryTimeRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
