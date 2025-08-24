'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AutoCycleContextType {
  hoveredSection: number | null;
  isAutoCycling: boolean;
  setHoveredSection: (index: number | null) => void;
  setIsAutoCycling: (cycling: boolean) => void;
}

const AutoCycleContext = createContext<AutoCycleContextType | undefined>(undefined);

export function useAutoCycle() {
  const context = useContext(AutoCycleContext);
  if (!context) {
    throw new Error('useAutoCycle must be used within AutoCycleProvider');
  }
  return context;
}

interface AutoCycleProviderProps {
  children: ReactNode;
  sections: any[];
}

export function AutoCycleProvider({ children, sections }: AutoCycleProviderProps) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [mouseIdleTimer, setMouseIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [cycleTimer, setCycleTimer] = useState<NodeJS.Timeout | null>(null);

  // Handle mouse movement detection
  useEffect(() => {
    const handleMouseMove = () => {
      // Stop auto-cycling when mouse moves
      setIsAutoCycling(false);
      setHoveredSection(null);
      
      // Clear existing timers
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      if (cycleTimer) clearTimeout(cycleTimer);
      
      // Set new idle timer
      const newIdleTimer = setTimeout(() => {
        setIsAutoCycling(true);
      }, 3000); // Start auto-cycling after 3 seconds of no mouse movement
      
      setMouseIdleTimer(newIdleTimer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Start auto-cycling after initial delay
    const initialTimer = setTimeout(() => {
      setIsAutoCycling(true);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      if (cycleTimer) clearTimeout(cycleTimer);
      clearTimeout(initialTimer);
    };
  }, [mouseIdleTimer, cycleTimer]);

  // Handle auto-cycling through sections
  useEffect(() => {
    if (isAutoCycling && sections.length > 0) {
      let currentIndex = 0;
      
      const cycle = () => {
        setHoveredSection(currentIndex);
        currentIndex = (currentIndex + 1) % sections.length;
        
        const newCycleTimer = setTimeout(cycle, 2000); // Change section every 2 seconds
        setCycleTimer(newCycleTimer);
      };
      
      // Start cycling immediately
      cycle();
      
      return () => {
        if (cycleTimer) clearTimeout(cycleTimer);
      };
    } else {
      if (cycleTimer) clearTimeout(cycleTimer);
      if (!isAutoCycling) {
        setHoveredSection(null);
      }
    }
  }, [isAutoCycling, sections.length, cycleTimer]);

  const contextValue = {
    hoveredSection,
    isAutoCycling,
    setHoveredSection: (index: number | null) => {
      if (!isAutoCycling) {
        setHoveredSection(index);
      }
    },
    setIsAutoCycling,
  };

  return (
    <AutoCycleContext.Provider value={contextValue}>
      {children}
    </AutoCycleContext.Provider>
  );
}
