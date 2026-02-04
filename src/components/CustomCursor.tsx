'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use direct DOM manipulation for smooth cursor - no React re-renders
    const updateMousePosition = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0) scale(${isHovering ? 1.5 : 1})`;
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      cursor.style.transform = cursor.style.transform.replace(/scale\([^)]+\)/, 'scale(1.5)');
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      cursor.style.transform = cursor.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
    };

    // Use MutationObserver to handle dynamically added elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-interactive]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    const elements = addListeners();
    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: 'var(--accent)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        willChange: 'transform',
        transition: 'transform 0.05s ease-out',
        top: 0,
        left: 0,
      }}
    />
  );
}
