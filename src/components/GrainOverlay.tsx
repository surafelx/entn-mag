'use client';

import { useEffect, useState } from 'react';

export function GrainOverlay() {
  const [grainIntensity, setGrainIntensity] = useState(0.15);

  useEffect(() => {
    // Randomly adjust grain intensity for that raw, imperfect feel
    const interval = setInterval(() => {
      setGrainIntensity(0.1 + Math.random() * 0.1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="grain-overlay"
      style={{
        opacity: grainIntensity,
      }}
    />
  );
}
