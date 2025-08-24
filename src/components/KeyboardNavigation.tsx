'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function KeyboardNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for navigation keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
          // Navigate to previous page/section
          window.dispatchEvent(new CustomEvent('navigate', { detail: { direction: 'left' } }));
          break;
        case 'ArrowRight':
          // Navigate to next page/section
          window.dispatchEvent(new CustomEvent('navigate', { detail: { direction: 'right' } }));
          break;
        case 'ArrowUp':
          // Navigate up within section
          window.dispatchEvent(new CustomEvent('navigate', { detail: { direction: 'up' } }));
          break;
        case 'ArrowDown':
          // Navigate down within section
          window.dispatchEvent(new CustomEvent('navigate', { detail: { direction: 'down' } }));
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null; // This component doesn't render anything visible
}
