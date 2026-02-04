'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const thoughts = [
  {
    title: "ON BEING UNCOMFORTABLE",
    type: "ESSAY",
    content: "Growth lives in the places you don't want to go. The discomfort is the point. Stop avoiding it.",
    color: '#66ff00',
    rotation: -2
  },
  {
    title: "WHY I QUIT",
    type: "RANT",
    content: "The industry wants content. I wanted to make art. These things are not compatible anymore.",
    color: '#ff0080',
    rotation: 3
  },
  {
    title: "NOTES FROM 3AM",
    type: "FRAGMENT",
    content: "The city sounds different when everyone's asleep. Like it's breathing. Like it's waiting.",
    color: '#00ffff',
    rotation: -1
  },
  {
    title: "UNFINISHED THOUGHT #47",
    type: "DRAFT",
    content: "What if we just... didn't? What if the resistance itself was the art? What if—",
    color: '#ffff00',
    rotation: 4
  },
  {
    title: "A LETTER I'LL NEVER SEND",
    type: "PERSONAL",
    content: "You changed everything by leaving. I don't know if I should thank you or hate you for it.",
    color: '#9966ff',
    rotation: -3
  },
  {
    title: "THE ALGORITHM PROBLEM",
    type: "ANALYSIS",
    content: "We're all performing for machines now. The humans stopped mattering years ago.",
    color: '#ff6600',
    rotation: 2
  },
];

export default function BrainDumpPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#66ff00] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
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
          data-text="BRAIN DUMP"
          style={{
            color: glitchActive ? '#66ff00' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #ff0080' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(1deg)',
          }}
        >
          BRAIN DUMP
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          THOUGHTS // RAW // UNFILTERED
        </motion.p>
      </motion.div>

      {/* Scattered Notes - Like Papers on a Wall */}
      <div className="px-8 pb-24 relative">
        {thoughts.map((thought, index) => {
          const isHovered = hoveredItem === index;
          const isExpanded = expandedItem === index;
          const offsets = ['5%', '40%', '15%', '55%', '0%', '35%'];

          return (
            <motion.div
              key={thought.title}
              className="mb-16 cursor-pointer"
              style={{ marginLeft: offsets[index] }}
              initial={{ opacity: 0, y: 50, rotate: thought.rotation * 2 }}
              animate={{ opacity: 1, y: 0, rotate: thought.rotation }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setExpandedItem(isExpanded ? null : index)}
            >
              <motion.div
                className="max-w-md relative p-6"
                style={{
                  backgroundColor: isExpanded ? `${thought.color}15` : 'transparent',
                  border: isHovered || isExpanded ? `2px solid ${thought.color}` : '2px solid transparent',
                }}
                whileHover={{ scale: 1.02, rotate: 0 }}
              >
                {/* Type label */}
                <motion.span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: thought.color }}
                >
                  [{thought.type}]
                </motion.span>

                {/* Title */}
                <motion.h2
                  className="font-mono text-xl md:text-2xl font-bold mt-2"
                  style={{
                    color: isHovered ? thought.color : '#ffffff',
                    textShadow: isHovered ? `1px 1px 0px #000, 0 0 10px ${thought.color}` : 'none',
                  }}
                >
                  {thought.title}
                </motion.h2>

                {/* Content preview / full content */}
                <motion.p
                  className="font-mono text-sm text-white/70 mt-4 leading-relaxed"
                  animate={{
                    opacity: isHovered || isExpanded ? 1 : 0.7,
                  }}
                >
                  {thought.content}
                </motion.p>

                {/* Expand indicator */}
                <motion.span
                  className="font-mono text-xs mt-4 inline-block"
                  style={{ color: thought.color }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                >
                  {isExpanded ? '[ COLLAPSE ]' : '[ EXPAND ]'}
                </motion.span>

                {/* Expanded content */}
                {isExpanded && (
                  <motion.div
                    className="mt-6 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <p className="font-mono text-sm text-white/60 leading-relaxed">
                      This is where the full thought would continue. Raw, unedited, 
                      stream of consciousness. The kind of writing that happens at 3am 
                      when you can't sleep and the world feels both too big and too small 
                      at the same time.
                    </p>
                  </motion.div>
                )}

                {/* Decorative corner */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4"
                  style={{ backgroundColor: thought.color }}
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
