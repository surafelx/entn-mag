'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const events = [
  {
    title: "WAREHOUSE RAVE",
    date: "FEB 15",
    location: "LOCATION TBA",
    description: "Bring water. Bring vibes. Address drops at midnight.",
    color: '#ff6600',
    status: 'UPCOMING'
  },
  {
    title: "GALLERY TAKEOVER",
    date: "FEB 22",
    location: "ABANDONED MALL",
    description: "Art that the institutions won't show. BYOB.",
    color: '#00ff41',
    status: 'TICKETS LIVE'
  },
  {
    title: "POP-UP MARKET",
    date: "MAR 1",
    location: "PARKING LOT C",
    description: "Local artists, weird finds, cash only.",
    color: '#ff0080',
    status: 'FREE ENTRY'
  },
  {
    title: "LISTENING SESSION",
    date: "MAR 8",
    location: "THE BUNKER",
    description: "Unreleased tracks in complete darkness.",
    color: '#9966ff',
    status: 'LIMITED'
  },
];

export default function NoSignalPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [staticNoise, setStaticNoise] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2000 + Math.random() * 3000);

    const staticInterval = setInterval(() => {
      setStaticNoise(true);
      setTimeout(() => setStaticNoise(false), 50);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(staticInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      {/* Static noise overlay */}
      {staticNoise && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.1 }}
        />
      )}

      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff6600] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
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
          data-text="NO SIGNAL"
          style={{
            color: glitchActive ? '#ff6600' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #00ff41' : '3px 3px 0px rgba(0,0,0,0.8)',
          }}
        >
          NO SIGNAL
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          EVENTS // UNDERGROUND // EPHEMERAL
        </motion.p>
      </motion.div>

      {/* Event Flyers - Scattered Like Posters */}
      <div className="relative px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {events.map((event, index) => {
            const isHovered = hoveredItem === index;
            const rotations = [5, -3, 4, -5];
            
            return (
              <motion.div
                key={event.title}
                className="relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, rotate: rotations[index] * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: rotations[index] }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
              >
                <motion.div
                  className="relative p-8 border-4"
                  style={{
                    borderColor: event.color,
                    backgroundColor: isHovered ? `${event.color}15` : 'black',
                    boxShadow: isHovered ? `0 0 30px ${event.color}40` : 'none',
                  }}
                >
                  {/* Status badge */}
                  <motion.span
                    className="absolute -top-3 -right-3 font-mono text-xs font-bold px-2 py-1"
                    style={{ backgroundColor: event.color, color: '#000' }}
                    animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                  >
                    {event.status}
                  </motion.span>

                  <motion.span
                    className="font-mono text-6xl font-bold block"
                    style={{ color: event.color }}
                  >
                    {event.date}
                  </motion.span>

                  <h3 className="font-mono text-2xl md:text-3xl font-bold text-white mt-4">
                    {event.title}
                  </h3>

                  <p className="font-mono text-xs text-white/50 mt-2 tracking-widest">
                    {event.location}
                  </p>

                  <p className="font-mono text-sm text-white/70 mt-4">
                    {event.description}
                  </p>

                  {/* Decorative corner marks */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: event.color }} />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: event.color }} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
