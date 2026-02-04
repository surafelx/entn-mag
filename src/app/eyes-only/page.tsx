'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const visuals = [
  { title: "PIXEL DREAMS", type: "DIGITAL ART", color: '#00ffff' },
  { title: "URBAN DECAY", type: "PHOTOGRAPHY", color: '#ff0080' },
  { title: "NOISE POSTER", type: "POSTER SERIES", color: '#ffff00' },
  { title: "STATIC PORTRAITS", type: "EXPERIMENTAL", color: '#00ff41' },
  { title: "BROKEN LIGHT", type: "PHOTOGRAPHY", color: '#9966ff' },
  { title: "DATA FLOWERS", type: "GENERATIVE", color: '#ff6600' },
];

export default function EyesOnlyPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#00ffff] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Title */}
      <motion.div
        className="pt-24 pb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-bold font-mono ${glitchActive ? 'text-glitch' : ''}`}
          data-text="EYES ONLY"
          style={{
            color: glitchActive ? '#00ffff' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #ff0080' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(-1deg)',
          }}
        >
          EYES ONLY
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          VISUALS // ART // CLASSIFIED
        </motion.p>
      </motion.div>

      {/* Gallery Grid - Asymmetric Masonry */}
      <div className="px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visuals.map((visual, index) => {
            const isHovered = hoveredItem === index;
            const spans = ['col-span-2', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-2', 'col-span-1'];
            const heights = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[2/1]', 'aspect-[3/4]'];

            return (
              <motion.div
                key={visual.title}
                className={`${spans[index]} cursor-pointer relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <motion.div
                  className={`${heights[index]} w-full border-2 relative`}
                  style={{
                    borderColor: isHovered ? visual.color : 'rgba(255,255,255,0.1)',
                    backgroundColor: `${visual.color}15`,
                  }}
                >
                  {/* Placeholder visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="font-mono text-4xl md:text-6xl font-bold opacity-20"
                      style={{ color: visual.color }}
                      animate={{
                        opacity: isHovered ? 0.5 : 0.2,
                        scale: isHovered ? 1.1 : 1,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                  </div>

                  {/* Info overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
                    animate={{
                      y: isHovered ? 0 : 20,
                      opacity: isHovered ? 1 : 0.7,
                    }}
                  >
                    <span className="font-mono text-xs tracking-widest" style={{ color: visual.color }}>
                      {visual.type}
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white mt-1">
                      {visual.title}
                    </h3>
                  </motion.div>

                  {/* Glitch scanlines */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full h-px"
                          style={{
                            top: `${20 + i * 15}%`,
                            backgroundColor: visual.color,
                            opacity: 0.5,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
