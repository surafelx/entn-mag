'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HoverContextType {
  hoveredSection: number | null;
  setHoveredSection: (index: number | null) => void;
  backgroundEffect: string | null;
  setBackgroundEffect: (effect: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [backgroundEffect, setBackgroundEffect] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{
      hoveredSection,
      setHoveredSection,
      backgroundEffect,
      setBackgroundEffect,
    }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);
  if (context === undefined) {
    // Return default values if used outside provider
    return {
      hoveredSection: null,
      setHoveredSection: () => {},
      backgroundEffect: null,
      setBackgroundEffect: () => {},
    };
  }
  return context;
}
