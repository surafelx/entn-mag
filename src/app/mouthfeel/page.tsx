'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const foodStories = [
  {
    title: "3AM RAMEN RITUAL",
    subtitle: "Late Night Chronicles",
    description: "The fluorescent lights flicker. The broth steams. This is your church.",
    color: '#ffff00',
    rotation: -3
  },
  {
    title: "FOOD AS ARMOR",
    subtitle: "Identity Essays",
    description: "What you eat when no one's watching says everything about who you are.",
    color: '#ff0080',
    rotation: 4
  },
  {
    title: "MESSY IS THE POINT",
    subtitle: "Visual Documentation",
    description: "Dripping sauce, crumbs everywhere, hands dirty. Perfect.",
    color: '#00ff41',
    rotation: -2
  },
  {
    title: "COMFORT CRIMES",
    subtitle: "Confessional",
    description: "Hot sauce on ice cream? Chips in your sandwich? We don't judge here.",
    color: '#ff6600',
    rotation: 5
  },
  {
    title: "GRANDMA'S RECIPE",
    subtitle: "Heritage",
    description: "The handwritten card, the unmeasured pinch, the taste of memory.",
    color: '#9966ff',
    rotation: -4
  },
];

export default function MouthfeelPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ffff00] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Title - Extra Chaotic */}
      <motion.div
        className="pt-24 pb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-bold font-mono ${glitchActive ? 'text-glitch' : ''}`}
          data-text="MOUTHFEEL"
          style={{
            color: glitchActive ? '#ffff00' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #ff0080, -2px -2px 0px #00ff41' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(-1deg)',
          }}
        >
          MOUTHFEEL
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          FOOD // RITUAL // IDENTITY
        </motion.p>
      </motion.div>

      {/* Scattered Food Stories */}
      <div className="relative px-8 pb-24">
        {foodStories.map((story, index) => {
          const isHovered = hoveredItem === index;
          const marginOffsets = ['0%', '25%', '10%', '35%', '5%'];

          return (
            <motion.div
              key={story.title}
              className="mb-20 cursor-pointer"
              style={{ marginLeft: marginOffsets[index] }}
              initial={{ opacity: 0, y: 80, rotate: story.rotation * 2 }}
              animate={{ opacity: 1, y: 0, rotate: story.rotation }}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.03, rotate: 0 }}
            >
              <motion.div
                className="relative max-w-xl p-6 border-l-4"
                style={{
                  borderColor: story.color,
                  backgroundColor: isHovered ? `${story.color}10` : 'transparent',
                }}
              >
                <motion.span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: story.color }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {story.subtitle}
                </motion.span>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-mono mt-2"
                  style={{
                    color: isHovered ? story.color : '#ffffff',
                    textShadow: isHovered ? `2px 2px 0px #000, 0 0 15px ${story.color}` : 'none',
                  }}
                >
                  {story.title}
                </motion.h2>

                <motion.p
                  className="font-mono text-sm text-white/70 mt-4 leading-relaxed"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  {story.description}
                </motion.p>

                {/* Decorative element */}
                <motion.div
                  className="absolute -right-4 top-1/2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: story.color, opacity: 0.3 }}
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                  }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
