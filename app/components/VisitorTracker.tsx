'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: fullUrl,
            referrer: document.referrer || 'Direct',
          }),
          keepalive: true,
        });
      } catch (error) {
        console.error('Telemetry failed:', error);
      }
    };

    trackVisit();
  }, [pathname, searchParams]);

  return null;
}