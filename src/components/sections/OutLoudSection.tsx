'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2 } from 'lucide-react';

export function OutLoudSection() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const events = [
    {
      title: "BASS CATHEDRAL",
      artist: "VOID COLLECTIVE",
      date: "FRI 25.08",
      time: "23:00",
      venue: "UNDERGROUND STATION",
      color: "#ff0080",
      description: "Subterranean frequencies that shake the concrete foundations of reality",
    },
    {
      title: "DIGITAL SCREAM",
      artist: "NEON PROPHETS",
      date: "SAT 26.08", 
      time: "22:30",
      venue: "ABANDONED WAREHOUSE",
      color: "#00ff41",
      description: "Harsh noise and broken beats in a post-industrial wasteland",
    },
    {
      title: "STATIC RITUAL",
      artist: "GLITCH MONKS",
      date: "SUN 27.08",
      time: "20:00", 
      venue: "ROOFTOP CHAOS",
      color: "#ffff00",
      description: "Experimental soundscapes under the dying light of civilization",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[110] flex flex-col">
      {/* Header */}
      <div className="flex-none h-14 border-b border-white/10 flex items-center px-6 gap-4 z-40">
        <Link href="/">
          <motion.button
            className="flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm"
            data-interactive
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={16} />
            BACK
          </motion.button>
        </Link>
        <motion.h1
          className="flex-1 text-center text-2xl font-bold tracking-wider text-white font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OUT<span className="text-[#ff0080]">LOUD</span>
        </motion.h1>
        <div className="w-16" />
      </div>

      {/* Audio visualizer mockup */}
      <motion.div
        className="absolute top-20 right-6 w-64 h-32 border border-white/30 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-end justify-center h-full p-4 bg-black/60">
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 mx-px bg-gradient-to-t from-[#ff0080] to-[#00ff41]"
              animate={{
                height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
              }}
              transition={{
                duration: 0.1,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.02,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-2 right-2 text-white hover:text-[#ff0080] transition-colors"
          data-interactive
        >
          <Volume2 size={16} />
        </button>
      </motion.div>

      {/* Main event display */}
      <div className="flex-1 relative px-12 pb-8 overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <motion.div
            key={activeEvent}
            className="text-center max-w-4xl"
            initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Event poster style */}
            <motion.div
              className="relative p-12 border-4 border-white"
              style={{
                backgroundColor: events[activeEvent].color,
                transform: 'rotate(-2deg)',
              }}
              whileHover={{ 
                rotate: 0,
                scale: 1.05,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/20" />
              
              <motion.h2
                className="text-6xl md:text-8xl font-black text-black mb-4"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                  transform: 'scaleY(1.2)',
                }}
                animate={{
                  textShadow: [
                    '4px 4px 0px rgba(0,0,0,0.3)',
                    '6px 6px 0px rgba(0,0,0,0.5)',
                    '4px 4px 0px rgba(0,0,0,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {events[activeEvent].title}
              </motion.h2>

              <div className="text-black font-mono text-xl mb-6 font-bold">
                {events[activeEvent].artist}
              </div>

              <div className="flex justify-between items-center text-black font-mono text-lg font-bold">
                <div>{events[activeEvent].date}</div>
                <div>{events[activeEvent].time}</div>
              </div>

              <div className="mt-4 text-black font-mono text-base font-bold">
                @ {events[activeEvent].venue}
              </div>

              {/* Torn paper effect */}
              <div 
                className="absolute -bottom-2 left-0 w-full h-4 bg-white"
                style={{
                  clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0, 100% 100%, 0 100%)',
                }}
              />
            </motion.div>

            {/* Event description */}
            <motion.p
              className="mt-8 text-white font-mono text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {events[activeEvent].description}
            </motion.p>
          </motion.div>
        </div>

        {/* Event navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveEvent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeEvent ? 'bg-white' : 'bg-white/30'
              }`}
              data-interactive
            />
          ))}
        </div>
      </div>

      {/* Background noise pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-[105]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                ${events[activeEvent].color} 2px,
                ${events[activeEvent].color} 4px
              )
            `,
          }}
        />
      </div>
    </div>
  );
}
