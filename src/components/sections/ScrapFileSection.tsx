'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const scraps = [
  { id: 1, text: 'CUT HERE', color: '#9900ff', rotation: -12, x: 10, y: 15, size: 'text-2xl' },
  { id: 2, text: 'PASTE OVER REALITY', color: '#ff0080', rotation: 7, x: 55, y: 8, size: 'text-sm' },
  { id: 3, text: '★★★★', color: '#ffff00', rotation: -3, x: 30, y: 35, size: 'text-4xl' },
  { id: 4, text: 'TORN ARCHIVE VOL. 7', color: '#ffffff', rotation: 15, x: 65, y: 30, size: 'text-xs' },
  { id: 5, text: 'DO NOT FOLD', color: '#00ff41', rotation: -20, x: 5, y: 55, size: 'text-lg' },
  { id: 6, text: '░░░░░░░', color: '#9900ff', rotation: 5, x: 40, y: 60, size: 'text-3xl' },
  { id: 7, text: 'MEMORY.ZIP', color: '#ff6600', rotation: -8, x: 75, y: 55, size: 'text-sm' },
  { id: 8, text: 'FRAGMENTED', color: '#00ffff', rotation: 12, x: 20, y: 75, size: 'text-xl' },
  { id: 9, text: '— clipped from nowhere', color: '#ffffff', rotation: -5, x: 50, y: 80, size: 'text-xs' },
  { id: 10, text: '▓▒░ CORRUPTED ░▒▓', color: '#ff0080', rotation: 18, x: 80, y: 75, size: 'text-sm' },
];

export function ScrapFileSection() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredScrap, setHoveredScrap] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#9900ff] transition-colors font-mono text-sm"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="text-4xl font-bold tracking-wider font-mono"
          style={{
            color: glitchActive ? '#ff0080' : '#9900ff',
            textShadow: glitchActive ? '2px 2px 0px #00ff41, -2px -2px 0px #ffff00' : 'none',
          }}
        >
          SCRAP<span className="text-white">FILE</span>
        </h1>
      </motion.div>

      {/* Torn paper background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(153,0,255,0.3) 29px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(153,0,255,0.1) 29px)`,
        }}
      />

      {/* Scattered scraps */}
      {scraps.map((scrap) => (
        <motion.div
          key={scrap.id}
          className={`absolute font-mono font-bold cursor-pointer ${scrap.size}`}
          style={{
            left: `${scrap.x}%`,
            top: `${scrap.y}%`,
            color: scrap.color,
            rotate: scrap.rotation,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: hoveredScrap === scrap.id ? 1 : 0.7,
            scale: hoveredScrap === scrap.id ? 1.2 : 1,
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            y: { duration: 3 + scrap.id * 0.3, repeat: Infinity, ease: 'easeInOut', delay: scrap.id * 0.2 },
          }}
          whileTap={{ scale: 0.9, rotate: scrap.rotation + 20 }}
          onMouseEnter={() => setHoveredScrap(scrap.id)}
          onMouseLeave={() => setHoveredScrap(null)}
          data-interactive
        >
          <span
            style={{
              textShadow: hoveredScrap === scrap.id
                ? `2px 2px 0px rgba(0,0,0,0.8), 0 0 12px ${scrap.color}`
                : '1px 1px 0px rgba(0,0,0,0.8)',
              textDecoration: scrap.id % 3 === 0 ? 'line-through' : 'none',
            }}
          >
            {scrap.text}
          </span>
        </motion.div>
      ))}

      {/* Central tape strip */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-8 bg-[#9900ff]/20 border border-[#9900ff]/40 flex items-center justify-center"
        style={{ rotate: -3 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="font-mono text-xs text-[#9900ff] tracking-widest">■ COLLAGE FRAGMENTS ■</span>
      </motion.div>

      {/* Glitch scan lines */}
      {glitchActive && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-[#9900ff]"
              style={{ top: `${20 + i * 20}%`, mixBlendMode: 'screen' }}
              animate={{ x: ['-100%', '100%'], opacity: [0, 1, 0] }}
              transition={{ duration: 0.08, delay: i * 0.02 }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[#9900ff] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ARCHIVE: TORN / FORMAT: UNKNOWN / INTEGRITY: 12%
      </motion.div>
    </div>
  );
}
