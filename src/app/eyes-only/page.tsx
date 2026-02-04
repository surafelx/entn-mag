'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { X, ZoomIn, Download } from 'lucide-react';

const visuals = [
  { 
    title: "PIXEL DREAMS", 
    type: "DIGITAL ART", 
    color: '#00ffff',
    description: "When sleep deprivation meets Photoshop. Created between 2-5am.",
    artist: "VOID_ARTIST"
  },
  { 
    title: "URBAN DECAY", 
    type: "PHOTOGRAPHY", 
    color: '#ff0080',
    description: "The beauty in broken things. Shot on expired film.",
    artist: "GHOST_LENS"
  },
  { 
    title: "NOISE POSTER", 
    type: "POSTER SERIES", 
    color: '#ffff00',
    description: "Typography as texture. Words as visual chaos.",
    artist: "TYPE_WRECK"
  },
  { 
    title: "STATIC PORTRAITS", 
    type: "EXPERIMENTAL", 
    color: '#00ff41',
    description: "Faces dissolving into white noise.",
    artist: "DATA_FACE"
  },
  { 
    title: "BROKEN LIGHT", 
    type: "PHOTOGRAPHY", 
    color: '#9966ff',
    description: "Long exposure in abandoned spaces.",
    artist: "GHOST_LENS"
  },
  { 
    title: "DATA FLOWERS", 
    type: "GENERATIVE", 
    color: '#ff6600',
    description: "Algorithms growing digital gardens.",
    artist: "CODE_BLOOM"
  },
  { 
    title: "SCREEN BURN", 
    type: "DIGITAL ART", 
    color: '#ff3366',
    description: "CRT memories and phosphor ghosts.",
    artist: "VOID_ARTIST"
  },
  { 
    title: "CONCRETE DREAMS", 
    type: "PHOTOGRAPHY", 
    color: '#00ffff',
    description: "Architecture as abstraction.",
    artist: "GHOST_LENS"
  },
];

export default function EyesOnlyPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000 + Math.random() * 2000);
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
            className="font-mono text-sm tracking-[0.3em] text-[#00ffff] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            VISUALS // ART // CLASSIFIED
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[10rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="EYES ONLY"
            style={{
              color: glitchActive ? '#00ffff' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #ff0080, -2px -2px 0px #00ff41' 
                : '4px 4px 0px rgba(0,255,255,0.3)',
              transform: 'rotate(-1deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            EYES ONLY
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Visual documentation for those who see differently. Art that exists in the spaces between 
            gallery walls and dumpsters. Click to enter the archive.
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

        {/* Featured Gallery - Horizontal Scroll */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ff0080]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">GALLERY</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {visuals.map((visual, index) => {
              const isHovered = hoveredItem === index;
              const heights = ['h-80', 'h-96', 'h-72', 'h-88', 'h-80', 'h-96', 'h-72', 'h-88'];

              return (
                <motion.div
                  key={visual.title}
                  className={`flex-shrink-0 w-64 md:w-80 ${heights[index % heights.length]} cursor-pointer relative overflow-hidden border-2 group`}
                  style={{ 
                    borderColor: visual.color,
                    backgroundColor: `${visual.color}10`,
                    transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                >
                  {/* Placeholder visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="font-mono text-6xl md:text-8xl font-bold opacity-20"
                      style={{ color: visual.color }}
                      animate={{ opacity: isHovered ? 0.4 : 0.15, scale: isHovered ? 1.1 : 1 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                  </div>

                  {/* Zoom icon on hover */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: visual.color }}
                  >
                    <ZoomIn size={20} />
                  </motion.div>

                  {/* Info overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
                    animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
                  >
                    <span className="font-mono text-xs tracking-widest" style={{ color: visual.color }}>
                      {visual.type}
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white mt-1">
                      {visual.title}
                    </h3>
                    <span className="font-mono text-xs text-white/50">by {visual.artist}</span>
                  </motion.div>

                  {/* Glitch scanlines on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full h-px"
                          style={{ top: `${20 + i * 15}%`, backgroundColor: visual.color, opacity: 0.5 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
        </section>

        {/* Grid Gallery */}
        <section className="py-16 px-8 md:px-16 border-t border-white/10">
          <div className="mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ffff00]">CLICK TO EXPAND</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">ARCHIVE</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visuals.map((visual, index) => (
              <motion.div
                key={`grid-${visual.title}`}
                className="aspect-square cursor-pointer relative overflow-hidden border group"
                style={{ 
                  borderColor: 'rgba(255,255,255,0.1)',
                  backgroundColor: `${visual.color}10`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05, zIndex: 10, borderColor: visual.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="font-mono text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ color: visual.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn size={24} style={{ color: visual.color }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                className="absolute top-8 right-8 text-white/50 hover:text-white z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </motion.button>

              <motion.div
                className="max-w-4xl w-full relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image placeholder */}
                <div 
                  className="aspect-video w-full border-4 relative overflow-hidden"
                  style={{ 
                    borderColor: visuals[selectedImage].color,
                    backgroundColor: `${visuals[selectedImage].color}15`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="font-mono text-9xl font-bold opacity-30"
                      style={{ color: visuals[selectedImage].color }}
                    >
                      {String(selectedImage + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <span 
                      className="font-mono text-xs tracking-widest"
                      style={{ color: visuals[selectedImage].color }}
                    >
                      {visuals[selectedImage].type} / {visuals[selectedImage].artist}
                    </span>
                    <h3 className="font-mono text-3xl font-bold text-white mt-2">
                      {visuals[selectedImage].title}
                    </h3>
                    <p className="font-mono text-sm text-white/60 mt-2 max-w-lg">
                      {visuals[selectedImage].description}
                    </p>
                  </div>
                  <motion.button
                    className="flex items-center gap-2 font-mono text-sm px-4 py-2 border"
                    style={{ borderColor: visuals[selectedImage].color, color: visuals[selectedImage].color }}
                    whileHover={{ backgroundColor: visuals[selectedImage].color, color: '#000' }}
                  >
                    <Download size={16} />
                    SAVE
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
              &ldquo;Art doesn't need permission. Neither do we.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#00ffff]">- THE ARCHIVE</span>
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
