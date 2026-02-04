'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Clock, ArrowRight, Bell, BellOff } from 'lucide-react';

const happenings = [
  {
    title: "ALBUM JUST DROPPED",
    time: "2 HOURS AGO",
    description: "New release from VOID COLLECTIVE hitting speakers everywhere. 12 tracks of pure chaos.",
    color: '#ff3366',
    urgent: true,
    category: "MUSIC"
  },
  {
    title: "GALLERY OPENING",
    time: "HAPPENING NOW",
    description: "First Friday takeover at the old factory space. Live painting, projections, free entry.",
    color: '#00ff41',
    urgent: true,
    category: "ART"
  },
  {
    title: "ZINE LAUNCH",
    time: "YESTERDAY",
    description: "Issue 04 printed and shipping to those who pre-ordered. Limited copies still available.",
    color: '#ffff00',
    urgent: false,
    category: "PRINT"
  },
  {
    title: "COLLABORATION ANNOUNCED",
    time: "3 DAYS AGO",
    description: "Two collectives merging for a limited run project. Details dropping next week.",
    color: '#9966ff',
    urgent: false,
    category: "NEWS"
  },
  {
    title: "POP-UP ENDED",
    time: "LAST WEEK",
    description: "Thanks to everyone who came through. Sold out everything. See you at the next one.",
    color: '#ff6600',
    urgent: false,
    category: "EVENTS"
  },
  {
    title: "NEW PODCAST EPISODE",
    time: "2 DAYS AGO",
    description: "Deep dive into underground fashion with three local designers. 2 hours of real talk.",
    color: '#00ffff',
    urgent: false,
    category: "AUDIO"
  },
];

const categories = ['ALL', 'MUSIC', 'ART', 'PRINT', 'NEWS', 'EVENTS', 'AUDIO'];

export default function RightNowPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [notifications, setNotifications] = useState(true);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const filteredHappenings = selectedCategory === 'ALL' 
    ? happenings 
    : happenings.filter(h => h.category === selectedCategory);

  return (
    <Layout>
      <div className="w-full min-h-screen relative overflow-x-hidden">
        {/* Hero Section with Live Clock */}
        <motion.div
          className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 py-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="font-mono text-sm tracking-[0.3em] text-[#ff3366] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            HAPPENINGS // TIME-SENSITIVE // CULTURE
          </motion.span>
          
          <div className="flex items-end gap-6 flex-wrap">
            <motion.h1
              className={`text-7xl md:text-[10rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
              data-text="RIGHT NOW"
              style={{
                color: glitchActive ? '#ff3366' : '#ffffff',
                textShadow: glitchActive 
                  ? '4px 4px 0px #00ff41, -2px -2px 0px #ffff00' 
                  : '4px 4px 0px rgba(255,51,102,0.3)',
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              RIGHT NOW
            </motion.h1>
          </div>

          {/* Live Clock */}
          <motion.div
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Clock size={24} className="text-[#ff3366]" />
            <motion.span
              className="font-mono text-4xl md:text-6xl text-[#ff3366]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentTime}
            </motion.span>
          </motion.div>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The pulse of what's happening. Updated constantly. Miss it and it's gone.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-xs text-white/30 tracking-widest">SCROLL TO EXPLORE</span>
          </motion.div>
        </motion.div>

        {/* Filter & Controls */}
        <section className="py-8 px-8 md:px-16 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs px-3 py-1 border transition-all ${
                    selectedCategory === cat 
                      ? 'border-[#ff3366] text-[#ff3366] bg-[#ff3366]/10' 
                      : 'border-white/20 text-white/50 hover:border-white/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Notification toggle */}
            <button
              onClick={() => setNotifications(!notifications)}
              className={`flex items-center gap-2 font-mono text-xs px-3 py-1 border transition-all ${
                notifications ? 'border-[#00ff41] text-[#00ff41]' : 'border-white/20 text-white/50'
              }`}
            >
              {notifications ? <Bell size={14} /> : <BellOff size={14} />}
              {notifications ? 'NOTIFICATIONS ON' : 'NOTIFICATIONS OFF'}
            </button>
          </div>
        </section>

        {/* Timeline Feed */}
        <section className="py-8 px-8 md:px-16">
          <AnimatePresence mode="popLayout">
            {filteredHappenings.map((item, index) => (
              <motion.div
                key={item.title}
                className="mb-6 cursor-pointer relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {/* Timeline line */}
                {index < filteredHappenings.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-white/10" />
                )}
                
                <motion.div
                  className="flex gap-6"
                  whileHover={{ x: 10 }}
                  onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    animate={{
                      scale: item.urgent ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: item.urgent ? Infinity : 0 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: item.color,
                        backgroundColor: item.urgent ? `${item.color}30` : 'black',
                      }}
                    >
                      <Clock size={18} style={{ color: item.color }} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <motion.span
                        className="font-mono text-xs tracking-widest"
                        style={{ color: item.color }}
                        animate={{
                          opacity: item.urgent ? [0.7, 1, 0.7] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: item.urgent ? Infinity : 0 }}
                      >
                        {item.time}
                      </motion.span>
                      {item.urgent && (
                        <span className="px-2 py-0.5 bg-[#ff3366] text-black text-[10px] font-mono font-bold animate-pulse">
                          LIVE
                        </span>
                      )}
                      <span className="font-mono text-xs text-white/30">{item.category}</span>
                    </div>

                    <motion.h3
                      className="font-mono text-xl md:text-2xl font-bold mt-2 text-white"
                      whileHover={{ color: item.color }}
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      className="font-mono text-sm text-white/60 mt-2 max-w-2xl"
                    >
                      {item.description}
                    </motion.p>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {expandedItem === index && (
                        <motion.div
                          className="mt-4 pt-4 border-t border-white/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex gap-4">
                            <motion.button
                              className="flex items-center gap-2 font-mono text-xs px-4 py-2 border transition-colors"
                              style={{ borderColor: item.color, color: item.color }}
                              whileHover={{ backgroundColor: item.color, color: '#000' }}
                            >
                              LEARN MORE <ArrowRight size={14} />
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-2 font-mono text-xs px-4 py-2 border border-white/20 text-white/50"
                              whileHover={{ borderColor: 'white', color: 'white' }}
                            >
                              SHARE
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredHappenings.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-mono text-white/30">No happenings in this category right now.</p>
            </motion.div>
          )}
        </section>

        {/* Quote */}
        <section className="py-24 px-8 md:px-16 border-t border-white/10">
          <motion.blockquote
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-5xl font-mono text-white leading-tight">
              &ldquo;If you're reading this, you're already behind.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#ff3366]">- THE FEED</span>
            </footer>
          </motion.blockquote>
        </section>

        {/* Footer hint */}
        <motion.div
          className="py-12 px-8 md:px-16 border-t border-white/10 text-center"
        >
          <span className="font-mono text-xs text-white/30 tracking-widest">
            USE ARROW KEYS TO NAVIGATE SECTIONS
          </span>
        </motion.div>
      </div>
    </Layout>
  );
}
