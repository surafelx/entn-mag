'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GRID_LINES = 12;
const VERT_LINES = 16;

export function SynthwaveSection() {
  const [glitch, setGlitch] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [stars] = useState(() =>
    Array.from({ length: 60 }, () => ({ x: Math.random() * 100, y: Math.random() * 55, size: Math.random() * 2 + 1 }))
  );

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#9966ff] transition-colors font-mono text-sm"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Gradient sky to horizon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #000022 0%, #1a0033 40%, #3d0066 58%, #ff0080 62%, #000000 64%)',
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: '46%' }}
        animate={{ filter: glitch ? 'hue-rotate(90deg) saturate(3)' : 'none' }}
      >
        <div
          className="w-40 h-20 rounded-t-full overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #ffff00, #ff6600, #ff0080)',
            boxShadow: '0 0 60px rgba(255,153,0,0.6), 0 0 120px rgba(255,0,128,0.3)',
          }}
        >
          {/* Sun stripes */}
          {[35, 50, 65, 78, 88].map((y, i) => (
            <div key={i} className="absolute w-full h-px bg-black/30" style={{ top: `${y}%` }} />
          ))}
        </div>
      </motion.div>

      {/* Perspective grid */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '38%', perspective: '600px' }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: 'rotateX(65deg)', transformOrigin: 'top center' }}
        >
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Horizontal lines */}
            {Array.from({ length: GRID_LINES }).map((_, i) => {
              const y = (i / GRID_LINES) * 100;
              return (
                <line
                  key={`h${i}`}
                  x1="0%" y1={`${y}%`}
                  x2="100%" y2={`${y}%`}
                  stroke="#9966ff"
                  strokeWidth="1"
                  strokeOpacity={0.7 - (i / GRID_LINES) * 0.5}
                />
              );
            })}
            {/* Vertical lines */}
            {Array.from({ length: VERT_LINES + 1 }).map((_, i) => {
              const x = (i / VERT_LINES) * 100;
              return (
                <line
                  key={`v${i}`}
                  x1={`${x}%`} y1="0%"
                  x2={`${x}%`} y2="100%"
                  stroke="#ff0080"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
              );
            })}
          </svg>
        </div>
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #000000 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pb-24 z-10 pointer-events-none"
        style={{ filter: glitch ? 'blur(2px)' : 'none' }}
      >
        <motion.h1
          className="font-mono font-bold tracking-widest text-center"
          style={{
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            color: '#ffffff',
            textShadow: `0 0 20px #9966ff, 0 0 40px #ff0080, 3px 3px 0px #ff0080`,
          }}
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SYNTH
          <span style={{ color: '#ff0080', textShadow: '0 0 20px #ff0080, 0 0 40px #ffff00' }}>WAVE</span>
        </motion.h1>

        <motion.p
          className="font-mono text-sm mt-4 tracking-widest"
          style={{ color: '#9966ff' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          80s.dll loading...
        </motion.p>
      </motion.div>

      {/* CRT flicker */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)' }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[#9966ff] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        NEON_PULSE — RETRO FUTURE DREAMS
      </motion.div>
    </div>
  );
}
