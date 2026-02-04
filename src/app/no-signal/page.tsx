'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    title: "WAREHOUSE RAVE",
    date: "FEB 15",
    location: "LOCATION TBA",
    description: "Bring water. Bring vibes. Address drops at midnight. Three floors, six DJs, one unforgettable night.",
    color: '#ff6600',
    status: 'UPCOMING',
    time: '11PM - 6AM'
  },
  {
    title: "GALLERY TAKEOVER",
    date: "FEB 22",
    location: "ABANDONED MALL",
    description: "Art that the institutions won't show. BYOB. Projections, installations, live painting.",
    color: '#00ff41',
    status: 'TICKETS LIVE',
    time: '7PM - 2AM'
  },
  {
    title: "POP-UP MARKET",
    date: "MAR 1",
    location: "PARKING LOT C",
    description: "Local artists, weird finds, cash only. 40+ vendors, live performances, food trucks.",
    color: '#ff0080',
    status: 'FREE ENTRY',
    time: '12PM - 8PM'
  },
  {
    title: "LISTENING SESSION",
    date: "MAR 8",
    location: "THE BUNKER",
    description: "Unreleased tracks in complete darkness. Immersive audio experience. Limited to 50 people.",
    color: '#9966ff',
    status: 'LIMITED',
    time: '9PM - 12AM'
  },
  {
    title: "FILM SCREENING",
    date: "MAR 15",
    location: "ROOFTOP UNKNOWN",
    description: "Underground cinema under the stars. Weather permitting. Bring blankets.",
    color: '#00ffff',
    status: 'RSVP OPEN',
    time: '8PM'
  },
];

const pastEvents = [
  { name: "BASEMENT SHOW 001", attendees: 127, color: '#ff6600' },
  { name: "ZINE RELEASE", attendees: 89, color: '#00ff41' },
  { name: "RECORD SWAP", attendees: 234, color: '#ff0080' },
  { name: "ART AUCTION", attendees: 56, color: '#9966ff' },
];

export default function NoSignalPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [staticNoise, setStaticNoise] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const nextEvent = () => setActiveEvent((prev) => (prev + 1) % events.length);
  const prevEvent = () => setActiveEvent((prev) => (prev - 1 + events.length) % events.length);

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

        {/* Hero Section */}
        <motion.div
          className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 py-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="font-mono text-sm tracking-[0.3em] text-[#ff6600] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            EVENTS // UNDERGROUND // EPHEMERAL
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[10rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="NO SIGNAL"
            style={{
              color: glitchActive ? '#ff6600' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #00ff41, -2px -2px 0px #ff0080' 
                : '4px 4px 0px rgba(255,102,0,0.3)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            NO SIGNAL
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The events they don't want you to find. Locations whispered, not advertised. 
            If you know, you know. If you don't, start asking around.
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

        {/* Featured Event Carousel */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41]">FEATURED</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">UPCOMING</h2>
          </div>

          <div className="relative px-8 md:px-16">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                {events.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveEvent(i)}
                    className={`w-8 h-1 transition-all ${i === activeEvent ? 'bg-[#ff6600]' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevEvent} className="p-2 border border-white/20 hover:border-[#ff6600] transition-colors">
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button onClick={nextEvent} className="p-2 border border-white/20 hover:border-[#ff6600] transition-colors">
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Event content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                className="grid md:grid-cols-2 gap-8 items-stretch"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {/* Event flyer */}
                <div 
                  className="aspect-[3/4] md:aspect-auto w-full relative overflow-hidden border-4"
                  style={{ 
                    borderColor: events[activeEvent].color,
                    backgroundColor: `${events[activeEvent].color}10`,
                  }}
                >
                  {/* Status badge */}
                  <motion.span
                    className="absolute top-4 right-4 font-mono text-xs font-bold px-3 py-1 z-10"
                    style={{ backgroundColor: events[activeEvent].color, color: '#000' }}
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {events[activeEvent].status}
                  </motion.span>

                  {/* Date big */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="font-mono text-8xl md:text-[10rem] font-bold opacity-20"
                      style={{ color: events[activeEvent].color }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {events[activeEvent].date}
                    </motion.span>
                  </div>

                  {/* Corner marks */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: events[activeEvent].color }} />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: events[activeEvent].color }} />
                </div>

                {/* Event details */}
                <div className="flex flex-col justify-center">
                  <span 
                    className="font-mono text-6xl font-bold"
                    style={{ color: events[activeEvent].color }}
                  >
                    {events[activeEvent].date}
                  </span>
                  
                  <h3 className="text-3xl md:text-5xl font-bold font-mono text-white mt-4">
                    {events[activeEvent].title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2" style={{ color: events[activeEvent].color }}>
                      <MapPin size={16} />
                      <span className="font-mono text-sm">{events[activeEvent].location}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: events[activeEvent].color }}>
                      <Calendar size={16} />
                      <span className="font-mono text-sm">{events[activeEvent].time}</span>
                    </div>
                  </div>

                  <p className="text-white/70 font-mono text-sm mt-6 leading-relaxed">
                    {events[activeEvent].description}
                  </p>

                  <motion.button
                    className="mt-8 font-mono text-sm px-6 py-3 border transition-colors self-start"
                    style={{ borderColor: events[activeEvent].color, color: events[activeEvent].color }}
                    whileHover={{ backgroundColor: events[activeEvent].color, color: '#000' }}
                  >
                    GET NOTIFIED
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Past Events Scroll */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#9966ff]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">PAST EVENTS</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.name}
                className="flex-shrink-0 w-64 h-40 relative border-2 group cursor-pointer"
                style={{ 
                  borderColor: event.color,
                  backgroundColor: `${event.color}10`,
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <span className="font-mono text-xs text-white/50">ARCHIVED</span>
                  <div>
                    <h4 className="font-mono text-lg font-bold text-white">{event.name}</h4>
                    <span className="font-mono text-xs" style={{ color: event.color }}>
                      {event.attendees} ATTENDED
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
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
              &ldquo;The best events are the ones you had to find yourself.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#ff6600]">- LOCATION: UNKNOWN</span>
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
