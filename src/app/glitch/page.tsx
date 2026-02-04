'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const content = [
  {
    title: "AI CLUB FLYERS",
    description: "Machine-generated promotional chaos for parties that may or may not exist",
    tags: ["ai", "generated", "chaos"],
    color: '#ff0080'
  },
  {
    title: "INTERNET SUBCULTURES",
    description: "Deep dives into the weird corners of the web you pretend not to visit",
    tags: ["subculture", "weird", "online"],
    color: '#00ff41'
  },
  {
    title: "EXPERIMENTAL WEB",
    description: "Breaking the browser in beautiful ways - sites that shouldn't work but do",
    tags: ["web", "experimental", "broken"],
    color: '#ffff00'
  },
  {
    title: "DIGITAL DECAY",
    description: "When pixels rot and data corrupts - aesthetic destruction",
    tags: ["glitch", "decay", "aesthetic"],
    color: '#9966ff'
  },
  {
    title: "CODE AS ART",
    description: "Scripts that paint, algorithms that dream, bugs that create",
    tags: ["code", "art", "creative"],
    color: '#00ffff'
  },
];

export default function GlitchPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      {/* Back button */}
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Title Section */}
      <motion.div
        className="pt-24 pb-12 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className={`text-6xl md:text-8xl font-bold font-mono tracking-wider ${glitchActive ? 'text-glitch' : ''}`}
          data-text="GL!TCH"
          style={{
            color: glitchActive ? '#ff0080' : '#ffffff',
            textShadow: glitchActive
              ? '4px 4px 0px #00ff41, -4px -4px 0px #ff0080'
              : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: `rotate(-2deg)`,
          }}
        >
          GL!TCH
        </motion.h1>
        <motion.p
          className="text-white/50 font-mono text-sm mt-4 tracking-widest"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          DIGITAL // BROKEN // BEAUTIFUL
        </motion.p>
      </motion.div>

      {/* Content Grid - Scattered Chaos Layout */}
      <div className="relative px-8 pb-24">
        {content.map((item, index) => {
          const isHovered = hoveredItem === index;
          const offsets = [
            { x: '0%', rotate: -3 },
            { x: '30%', rotate: 5 },
            { x: '5%', rotate: -2 },
            { x: '40%', rotate: 4 },
            { x: '15%', rotate: -5 },
          ];
          const offset = offsets[index % offsets.length];

          return (
            <motion.div
              key={item.title}
              className="mb-16 cursor-pointer"
              style={{ marginLeft: offset.x }}
              initial={{ opacity: 0, y: 50, rotate: offset.rotate * 2 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: offset.rotate,
              }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedItem(selectedItem === index ? null : index)}
            >
              <motion.div
                className="relative max-w-2xl"
                whileHover={{ scale: 1.02, x: 10 }}
                animate={{
                  borderColor: isHovered ? item.color : 'rgba(255,255,255,0.1)',
                }}
              >
                {/* Number marker */}
                <motion.span
                  className="absolute -left-8 top-0 font-mono text-6xl font-bold opacity-20"
                  style={{ color: item.color }}
                  animate={{
                    opacity: isHovered ? 0.5 : 0.2,
                    x: isHovered ? [0, 2, -2, 0] : 0,
                  }}
                  transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                <motion.h2
                  className="text-3xl md:text-5xl font-bold font-mono tracking-wider"
                  style={{
                    color: isHovered ? item.color : '#ffffff',
                    textShadow: isHovered
                      ? `2px 2px 0px #000, 0 0 20px ${item.color}`
                      : '2px 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  {item.title}
                </motion.h2>

                <motion.p
                  className="text-white/70 font-mono text-sm mt-4 leading-relaxed max-w-xl"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  {item.description}
                </motion.p>

                <div className="flex gap-2 mt-4">
                  {item.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 border"
                      style={{
                        borderColor: isHovered ? item.color : 'rgba(255,255,255,0.2)',
                        color: isHovered ? item.color : '#ffffff',
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {selectedItem === index && (
                    <motion.div
                      className="mt-6 p-6 border"
                      style={{ borderColor: item.color, backgroundColor: `${item.color}10` }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="font-mono text-sm text-white/80 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. The digital realm fractures here, 
                        creating new possibilities from broken pixels and corrupted data streams.
                      </p>
                      <motion.button
                        className="mt-4 font-mono text-sm px-4 py-2"
                        style={{ backgroundColor: item.color, color: '#000' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        EXPLORE MORE
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative glitch lines */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        animate={{ opacity: glitchActive ? 0.3 : 0.05 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-[#ff0080]"
            style={{ top: `${30 + i * 20}%` }}
            animate={{
              x: glitchActive ? ['-100%', '100%'] : 0,
              opacity: glitchActive ? [0, 1, 0] : 0.1,
            }}
            transition={{ duration: 0.1, delay: i * 0.02 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
