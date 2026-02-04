'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const sections = [
  '/',
  '/glitch',
  '/skin',
  '/mouthfeel',
  '/no-signal',
  '/louder',
  '/eyes-only',
  '/right-now',
  '/brain-dump',
  '/humans',
  '/merch',
  '/donate',
];

export function KeyboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.indexOf(pathname);
      
      // Prevent default behavior for navigation keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          // Navigate to previous section
          if (currentIndex > 0) {
            router.push(sections[currentIndex - 1]);
          } else {
            router.push(sections[sections.length - 1]);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          // Navigate to next section
          if (currentIndex < sections.length - 1) {
            router.push(sections[currentIndex + 1]);
          } else {
            router.push(sections[0]);
          }
          break;
        case 'Escape':
          // Return to home
          router.push('/');
          break;
        case ' ':
          // Space bar for special interactions
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('space-action'));
          break;
        case '?':
          // Show keyboard hints
          setShowHint(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname]);

  // Show hint briefly on mount
  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
