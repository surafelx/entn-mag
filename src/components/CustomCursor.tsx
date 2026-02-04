'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth 60fps updates
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const scale = isHoveringRef.current ? 1.3 : 1;
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
        cursor.style.transform = `scale(${scale})`;
      });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      cursor.style.transform = 'scale(1.3)';
    };
    
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      cursor.style.transform = 'scale(1)';
    };

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', updateMousePosition);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: '#ff0080',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0,
        left: 0,
      }}
    />
  );
}
