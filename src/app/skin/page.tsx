'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const looks = [
  {
    title: "STREETWEAR DECAY",
    subtitle: "Shot on iPhone at 3AM",
    description: "Oversized silhouettes meeting urban grime",
    color: '#00ff41'
  },
  {
    title: "TEXTURE STUDY",
    subtitle: "Designer Interview",
    description: "When fabric becomes architecture",
    color: '#ff0080'
  },
  {
    title: "THRIFT FLIP",
    subtitle: "DIY Culture",
    description: "Your grandma's closet is a goldmine",
    color: '#ffff00'
  },
  {
    title: "ANTI-FASHION",
    subtitle: "Movement Documentation",
    description: "Wearing ugly as a statement",
    color: '#9966ff'
  },
];

export default function SkinPage() {
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
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#00ff41] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
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
          className={`text-6xl md:text-8xl font-bold font-mono ${glitchActive ? 'text-glitch' : ''}`}
          data-text="SK!N"
          style={{
            color: glitchActive ? '#00ff41' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #ff0080' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(1deg)',
          }}
        >
          SK!N
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          FASHION // TEXTURE // IDENTITY
        </motion.p>
      </motion.div>

      {/* Lookbook Grid - Overlapping Collage Style */}
      <div className="relative px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {looks.map((look, index) => {
            const isHovered = hoveredItem === index;
            const rotations = [-5, 3, -2, 4];
            
            return (
              <motion.div
                key={look.title}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50, rotate: rotations[index] * 2 }}
                animate={{ opacity: 1, y: 0, rotate: rotations[index] }}
                transition={{ delay: index * 0.15 }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              >
                {/* Image placeholder */}
                <motion.div
                  className="aspect-[3/4] w-full relative overflow-hidden border-4"
                  style={{
                    borderColor: isHovered ? look.color : 'rgba(255,255,255,0.2)',
                    backgroundColor: `${look.color}20`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-6xl font-bold opacity-20" style={{ color: look.color }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Overlay info */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent"
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0.8 }}
                  >
                    <motion.span
                      className="font-mono text-xs tracking-widest block mb-2"
                      style={{ color: look.color }}
                    >
                      {look.subtitle}
                    </motion.span>
                    <h3 className="font-mono text-2xl font-bold text-white">
                      {look.title}
                    </h3>
                    <p className="font-mono text-sm text-white/70 mt-2">
                      {look.description}
                    </p>
                  </motion.div>

                  {/* Glitch overlay */}
                  {glitchActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none mix-blend-screen"
                      style={{ backgroundColor: look.color, opacity: 0.3 }}
                    />
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
