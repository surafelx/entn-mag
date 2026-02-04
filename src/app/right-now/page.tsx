'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

const happenings = [
  {
    title: "ALBUM JUST DROPPED",
    time: "2 HOURS AGO",
    description: "New release from VOID COLLECTIVE hitting speakers everywhere",
    color: '#ff3366',
    urgent: true
  },
  {
    title: "GALLERY OPENING",
    time: "HAPPENING NOW",
    description: "First Friday takeover at the old factory space",
    color: '#00ff41',
    urgent: true
  },
  {
    title: "ZINE LAUNCH",
    time: "YESTERDAY",
    description: "Issue 04 printed and shipping to those who pre-ordered",
    color: '#ffff00',
    urgent: false
  },
  {
    title: "COLLABORATION ANNOUNCED",
    time: "3 DAYS AGO",
    description: "Two collectives merging for a limited run project",
    color: '#9966ff',
    urgent: false
  },
  {
    title: "POP-UP ENDED",
    time: "LAST WEEK",
    description: "Thanks to everyone who came through. Sold out everything.",
    color: '#ff6600',
    urgent: false
  },
];

export default function RightNowPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff3366] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Title with live clock */}
      <motion.div
        className="pt-24 pb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-end gap-6 flex-wrap">
          <motion.h1
            className={`text-5xl md:text-7xl font-bold font-mono ${glitchActive ? 'text-glitch' : ''}`}
            data-text="RIGHT NOW"
            style={{
              color: glitchActive ? '#ff3366' : '#ffffff',
              textShadow: glitchActive ? '4px 4px 0px #00ff41' : '3px 3px 0px rgba(0,0,0,0.8)',
            }}
          >
            RIGHT NOW
          </motion.h1>
          <motion.span
            className="font-mono text-2xl md:text-4xl text-[#ff3366] mb-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {currentTime}
          </motion.span>
        </div>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          HAPPENINGS // TIME-SENSITIVE // CULTURE
        </motion.p>
      </motion.div>

      {/* Timeline Feed */}
      <div className="px-8 pb-24">
        {happenings.map((item, index) => {
          const isHovered = hoveredItem === index;

          return (
            <motion.div
              key={item.title}
              className="mb-8 cursor-pointer relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Timeline line */}
              <div className="absolute left-6 top-12 bottom-0 w-px bg-white/10" />
              
              <motion.div
                className="flex gap-6"
                whileHover={{ x: 10 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  animate={{
                    scale: item.urgent && !isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: item.urgent ? Infinity : 0 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: item.color,
                      backgroundColor: isHovered ? `${item.color}30` : 'black',
                    }}
                  >
                    <Clock size={18} style={{ color: item.color }} />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <motion.span
                    className="font-mono text-xs tracking-widest inline-flex items-center gap-2"
                    style={{ color: item.color }}
                    animate={{
                      opacity: item.urgent ? [0.7, 1, 0.7] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: item.urgent ? Infinity : 0 }}
                  >
                    {item.time}
                    {item.urgent && (
                      <span className="px-2 py-0.5 bg-white/10 text-white text-[10px]">
                        LIVE
                      </span>
                    )}
                  </motion.span>

                  <motion.h3
                    className="font-mono text-xl md:text-2xl font-bold mt-2"
                    style={{
                      color: isHovered ? item.color : '#ffffff',
                      textShadow: isHovered ? `2px 2px 0px #000, 0 0 10px ${item.color}` : 'none',
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    className="font-mono text-sm text-white/60 mt-2 max-w-lg"
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
