'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  
  const phrases = [
    'INITIALIZING',
    'LOADING VOID',
    'CORRUPTING',
    'GLITCHING',
    'BREAKING',
    'ENTERING'
  ];

  useEffect(() => {
    // Single interval for progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12 + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        // Update phrase based on progress
        setPhase(Math.floor((next / 100) * phrases.length));
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoadComplete, phrases.length]);

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
      style={{ animation: progress >= 100 ? 'fadeOut 0.5s forwards' : undefined }}
    >
      {/* Static noise background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      <div className="text-center z-10 px-8">
        {/* Logo - static, no animation */}
        <div className="mb-12">
          <img
            src="/entn-logo.png"
            alt="ENTN"
            className="h-24 w-auto mx-auto"
            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
          />
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <span 
            className="font-mono text-xl tracking-[0.3em]"
            style={{ 
              color: '#ff0080',
              textShadow: '0 0 20px rgba(255,0,128,0.5)',
            }}
          >
            {phrases[Math.min(phase, phrases.length - 1)]}
          </span>
        </div>

        {/* Progress bar - simple CSS */}
        <div className="w-64 mx-auto">
          <div className="h-px bg-white/20 relative overflow-hidden">
            <div 
              className="h-full bg-[#ff0080] transition-all duration-100"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-xs text-white/40 tracking-widest">
            {Math.floor(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff0080]/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
