'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const people = [
  {
    name: "MAYA VOID",
    role: "VISUAL ARTIST",
    quote: "I make things that shouldn't exist. That's the whole point.",
    color: '#ff9900'
  },
  {
    name: "ECHO",
    role: "SOUND DESIGNER",
    quote: "Silence is just noise you haven't learned to hear yet.",
    color: '#00ff41'
  },
  {
    name: "TERRA NULL",
    role: "ZINE MAKER",
    quote: "Print is dead? Good. I like making things for ghosts.",
    color: '#ff0080'
  },
  {
    name: "STATIC",
    role: "PHOTOGRAPHER",
    quote: "I shoot what nobody wants to see. That's where the truth lives.",
    color: '#00ffff'
  },
  {
    name: "BINARY",
    role: "CODE ARTIST",
    quote: "Every bug is a feature in the right context.",
    color: '#ffff00'
  },
  {
    name: "DRIFT",
    role: "COMMUNITY BUILDER",
    quote: "Scenes don't build themselves. Someone has to care enough to start.",
    color: '#9966ff'
  },
];

export default function HumansPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);

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
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
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
          data-text="HUMANS"
          style={{
            color: glitchActive ? '#ff9900' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #00ff41' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(-1deg)',
          }}
        >
          HUMANS
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          PEOPLE // PROFILES // COMMUNITY
        </motion.p>
      </motion.div>

      {/* People Grid - Portrait Style */}
      <div className="px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {people.map((person, index) => {
            const isHovered = hoveredPerson === index;
            const rotations = [3, -2, 4, -3, 2, -4];

            return (
              <motion.div
                key={person.name}
                className="cursor-pointer"
                initial={{ opacity: 0, y: 50, rotate: rotations[index] }}
                animate={{ opacity: 1, y: 0, rotate: rotations[index] }}
                transition={{ delay: index * 0.12 }}
                onMouseEnter={() => setHoveredPerson(index)}
                onMouseLeave={() => setHoveredPerson(null)}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              >
                <motion.div
                  className="relative"
                  style={{
                    border: `3px solid ${isHovered ? person.color : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {/* Portrait placeholder */}
                  <div
                    className="aspect-[3/4] w-full relative overflow-hidden"
                    style={{ backgroundColor: `${person.color}15` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="font-mono text-8xl font-bold"
                        style={{ color: person.color, opacity: isHovered ? 0.4 : 0.15 }}
                      >
                        {person.name.charAt(0)}
                      </motion.span>
                    </div>

                    {/* Quote overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black via-black/60 to-transparent"
                      animate={{
                        opacity: isHovered ? 1 : 0.8,
                      }}
                    >
                      <div>
                        <motion.p
                          className="font-mono text-sm italic text-white/80 leading-relaxed mb-4"
                          animate={{
                            opacity: isHovered ? 1 : 0.6,
                            y: isHovered ? 0 : 10,
                          }}
                        >
                          &quot;{person.quote}&quot;
                        </motion.p>

                        <div>
                          <h3
                            className="font-mono text-lg font-bold"
                            style={{ color: isHovered ? person.color : '#ffffff' }}
                          >
                            {person.name}
                          </h3>
                          <span
                            className="font-mono text-xs tracking-widest"
                            style={{ color: person.color }}
                          >
                            {person.role}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Glitch effect on hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 0.15, repeat: Infinity }}
                      >
                        <div
                          className="absolute w-full h-1/3 top-0"
                          style={{ backgroundColor: person.color, mixBlendMode: 'overlay' }}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Name tag - like a polaroid */}
                  <div className="bg-white p-3">
                    <span className="font-mono text-xs text-black tracking-wider">
                      {person.name} // {person.role}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
