'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

const people = [
  {
    name: "MAYA VOID",
    role: "VISUAL ARTIST",
    quote: "I make things that shouldn't exist. That's the whole point.",
    bio: "Maya has been breaking digital art conventions since 2019. Her work explores the intersection of glitch aesthetics and emotional vulnerability. Based in Berlin, she runs workshops on creative destruction.",
    color: '#ff9900',
    links: { instagram: '@mayavoid', website: 'mayavoid.xyz' }
  },
  {
    name: "ECHO",
    role: "SOUND DESIGNER",
    quote: "Silence is just noise you haven't learned to hear yet.",
    bio: "Echo creates soundscapes that exist between music and noise. Their work has been featured in underground clubs across three continents. They believe every space has its own frequency.",
    color: '#00ff41',
    links: { soundcloud: 'echo_void', bandcamp: 'echovoid' }
  },
  {
    name: "TERRA NULL",
    role: "ZINE MAKER",
    quote: "Print is dead? Good. I like making things for ghosts.",
    bio: "Terra has self-published over 40 zines in the past five years. Each one is hand-printed, hand-bound, and hand-destroyed after the initial run. Nothing is precious.",
    color: '#ff0080',
    links: { shop: 'terranull.bigcartel', email: 'terra@null.zone' }
  },
  {
    name: "STATIC",
    role: "PHOTOGRAPHER",
    quote: "I shoot what nobody wants to see. That's where the truth lives.",
    bio: "Static documents the spaces between moments. Their photography has appeared in underground publications and on walls that were never supposed to be galleries.",
    color: '#00ffff',
    links: { portfolio: 'static.photos', instagram: '@static_lens' }
  },
  {
    name: "BINARY",
    role: "CODE ARTIST",
    quote: "Every bug is a feature in the right context.",
    bio: "Binary writes code that breaks on purpose. Their generative art explores what happens when systems fail beautifully. Current obsession: corrupted neural networks.",
    color: '#ffff00',
    links: { github: 'binary_void', website: 'binary.codes' }
  },
  {
    name: "DRIFT",
    role: "COMMUNITY BUILDER",
    quote: "Scenes don't build themselves. Someone has to care enough to start.",
    bio: "Drift has organized over 100 underground events. They believe in creating spaces where weird things can happen. No sponsors, no brands, just people and ideas.",
    color: '#9966ff',
    links: { events: 'drift.events', signal: '@drift' }
  },
];

export default function HumansPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = scrollLeft - (e.pageX - scrollRef.current.offsetLeft - startX) * 2;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <Layout>
      <div className="w-full min-h-screen relative overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 py-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="font-mono text-sm tracking-[0.3em] text-[#ff9900] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            PEOPLE // PROFILES // COMMUNITY
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[12rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="HUMANS"
            style={{
              color: glitchActive ? '#ff9900' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #00ff41, -2px -2px 0px #ff0080' 
                : '4px 4px 0px rgba(255,153,0,0.3)',
              transform: 'rotate(-1deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            HUMANS
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The people who make this possible. Artists, makers, organizers, troublemakers. 
            They don't fit in boxes. That's why we love them.
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

        {/* People Carousel - Horizontal Scroll */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">THE COLLECTIVE</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {people.map((person, index) => {
              const isHovered = hoveredPerson === index;
              const rotations = [3, -2, 4, -3, 2, -4];

              return (
                <motion.div
                  key={person.name}
                  className="flex-shrink-0 w-72 cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotate: rotations[index] }}
                  whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPerson(index)}
                  onMouseLeave={() => setHoveredPerson(null)}
                  onClick={() => setSelectedPerson(index)}
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
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                      >
                        <div>
                          <motion.p
                            className="font-mono text-sm italic text-white/80 leading-relaxed mb-4"
                            animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 10 }}
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

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
        </section>

        {/* Grid View */}
        <section className="py-16 px-8 md:px-16 border-t border-white/10">
          <div className="mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ff0080]">CLICK TO READ MORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">PROFILES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person, index) => (
              <motion.div
                key={`grid-${person.name}`}
                className="p-6 border border-white/10 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPerson(index)}
                whileHover={{ borderColor: person.color, backgroundColor: `${person.color}10` }}
              >
                <span className="font-mono text-xs tracking-widest" style={{ color: person.color }}>
                  {person.role}
                </span>
                <h3 className="font-mono text-xl font-bold text-white mt-2 group-hover:text-[inherit]" style={{ '--tw-text-opacity': 1 } as React.CSSProperties}>
                  {person.name}
                </h3>
                <p className="font-mono text-sm text-white/60 mt-3 line-clamp-2">
                  {person.quote}
                </p>
                <motion.span
                  className="font-mono text-xs mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: person.color }}
                >
                  READ FULL PROFILE
                </motion.span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full Profile Modal */}
        <AnimatePresence>
          {selectedPerson !== null && (
            <motion.div
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-8 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
            >
              <motion.button
                className="absolute top-8 right-8 text-white/50 hover:text-white z-10"
                onClick={() => setSelectedPerson(null)}
              >
                <X size={32} />
              </motion.button>

              <motion.div
                className="max-w-4xl w-full grid md:grid-cols-2 gap-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Portrait */}
                <div 
                  className="aspect-[3/4] w-full border-4 relative overflow-hidden"
                  style={{ 
                    borderColor: people[selectedPerson].color,
                    backgroundColor: `${people[selectedPerson].color}15`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="font-mono text-[12rem] font-bold opacity-30"
                      style={{ color: people[selectedPerson].color }}
                    >
                      {people[selectedPerson].name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <span 
                    className="font-mono text-xs tracking-widest"
                    style={{ color: people[selectedPerson].color }}
                  >
                    {people[selectedPerson].role}
                  </span>
                  <h3 className="font-mono text-4xl font-bold text-white mt-2">
                    {people[selectedPerson].name}
                  </h3>
                  
                  <blockquote 
                    className="font-mono text-lg italic mt-6 pl-4 border-l-2"
                    style={{ borderColor: people[selectedPerson].color, color: people[selectedPerson].color }}
                  >
                    &quot;{people[selectedPerson].quote}&quot;
                  </blockquote>

                  <p className="font-mono text-sm text-white/70 mt-6 leading-relaxed">
                    {people[selectedPerson].bio}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    {Object.entries(people[selectedPerson].links).map(([platform, handle]) => (
                      <motion.a
                        key={platform}
                        href="#"
                        className="flex items-center gap-2 font-mono text-xs px-3 py-2 border"
                        style={{ borderColor: people[selectedPerson].color, color: people[selectedPerson].color }}
                        whileHover={{ backgroundColor: people[selectedPerson].color, color: '#000' }}
                      >
                        <ExternalLink size={12} />
                        {handle}
                      </motion.a>
                    ))}
                  </div>

                  <motion.button
                    className="flex items-center gap-2 font-mono text-sm px-4 py-2 border mt-6 self-start"
                    style={{ borderColor: people[selectedPerson].color, color: people[selectedPerson].color }}
                    whileHover={{ backgroundColor: people[selectedPerson].color, color: '#000' }}
                  >
                    <MessageSquare size={16} />
                    GET IN TOUCH
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote */}
        <section className="py-24 px-8 md:px-16 border-t border-white/10">
          <motion.blockquote
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-5xl font-mono text-white leading-tight">
              &ldquo;Community is the art form no one credits.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#ff9900]">- DRIFT, COMMUNITY BUILDER</span>
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

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Layout>
  );
}
