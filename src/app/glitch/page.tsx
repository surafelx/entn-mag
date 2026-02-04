'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const content = [
  {
    title: "AI CLUB FLYERS",
    description: "Machine-generated promotional chaos for parties that may or may not exist",
    longDescription: "Prompt engineering as an art form. We fed neural networks the vibes of a thousand underground raves and this is what came out - distorted faces, impossible geometry, text that almost makes sense.",
    tags: ["ai", "generated", "chaos"],
    color: '#ff0080'
  },
  {
    title: "INTERNET SUBCULTURES",
    description: "Deep dives into the weird corners of the web you pretend not to visit",
    longDescription: "From cursed Discord servers to Telegram art collectives to forums that haven't been updated since 2008 but are still thriving. The internet is layers, and we're going spelunking.",
    tags: ["subculture", "weird", "online"],
    color: '#00ff41'
  },
  {
    title: "EXPERIMENTAL WEB",
    description: "Breaking the browser in beautiful ways - sites that shouldn't work but do",
    longDescription: "WebGL nightmares. CSS crimes. JavaScript sorcery. These are the portfolio sites and art projects that make your laptop fan spin up in fear.",
    tags: ["web", "experimental", "broken"],
    color: '#ffff00'
  },
  {
    title: "DIGITAL DECAY",
    description: "When pixels rot and data corrupts - aesthetic destruction",
    longDescription: "Datamoshing tutorials. Corrupted JPEGs as fine art. The beauty of broken compression. This is entropy as aesthetic.",
    tags: ["glitch", "decay", "aesthetic"],
    color: '#9966ff'
  },
  {
    title: "CODE AS ART",
    description: "Scripts that paint, algorithms that dream, bugs that create",
    longDescription: "Generative art that questions what creation even means. When the machine makes something beautiful, who is the artist?",
    tags: ["code", "art", "creative"],
    color: '#00ffff'
  },
];

const webProjects = [
  { name: "VOID.GALLERY", type: "Interactive", color: '#ff0080' },
  { name: "DATAMOSH.EXE", type: "Tool", color: '#00ff41' },
  { name: "CURSOR.HELL", type: "Experience", color: '#ffff00' },
  { name: "PIXEL.ROT", type: "Archive", color: '#9966ff' },
  { name: "NOISE.FM", type: "Audio", color: '#00ffff' },
  { name: "GLITCH.CSS", type: "Framework", color: '#ff6600' },
];

export default function GlitchPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % content.length);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + content.length) % content.length);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
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
            className="font-mono text-sm tracking-[0.3em] text-[#ff0080] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            DIGITAL // BROKEN // BEAUTIFUL
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[12rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="GL!TCH"
            style={{
              color: glitchActive ? '#ff0080' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #00ff41, -4px -4px 0px #ff0080' 
                : '4px 4px 0px rgba(255,0,128,0.3)',
              transform: 'rotate(-2deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            GL!TCH
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Where broken meets beautiful. The digital realm fractures here, creating new possibilities 
            from corrupted data streams and pixelated dreams.
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

        {/* Featured Carousel */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41]">FEATURED</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">DEEP DIVES</h2>
          </div>

          <div className="relative px-8 md:px-16">
            {/* Carousel navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                {content.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-8 h-1 transition-all ${
                      i === carouselIndex ? 'bg-[#ff0080]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevSlide} className="p-2 border border-white/20 hover:border-[#ff0080] transition-colors">
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button onClick={nextSlide} className="p-2 border border-white/20 hover:border-[#ff0080] transition-colors">
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Carousel content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                className="grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image placeholder */}
                <div 
                  className="aspect-video w-full relative overflow-hidden border-2"
                  style={{ 
                    borderColor: content[carouselIndex].color,
                    backgroundColor: `${content[carouselIndex].color}15`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${content[carouselIndex].color}10 10px, ${content[carouselIndex].color}10 20px)`,
                    }}
                  >
                    <span 
                      className="font-mono text-8xl font-bold opacity-20"
                      style={{ color: content[carouselIndex].color }}
                    >
                      {String(carouselIndex + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex gap-2 mb-4">
                    {content[carouselIndex].tags.map(tag => (
                      <span 
                        key={tag}
                        className="font-mono text-xs px-2 py-1 border"
                        style={{ borderColor: content[carouselIndex].color, color: content[carouselIndex].color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 
                    className="text-3xl md:text-5xl font-bold font-mono mb-4"
                    style={{ color: content[carouselIndex].color }}
                  >
                    {content[carouselIndex].title}
                  </h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-6">
                    {content[carouselIndex].longDescription}
                  </p>
                  <motion.button
                    className="font-mono text-sm px-6 py-3 border transition-colors"
                    style={{ 
                      borderColor: content[carouselIndex].color,
                      color: content[carouselIndex].color,
                    }}
                    whileHover={{ 
                      backgroundColor: content[carouselIndex].color,
                      color: '#000',
                    }}
                  >
                    EXPLORE MORE
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Horizontal Scroll Web Projects */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ffff00]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">WEB PROJECTS</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {webProjects.map((project, index) => (
              <motion.div
                key={project.name}
                className="flex-shrink-0 w-64 h-64 relative border-2 group cursor-pointer"
                style={{ 
                  borderColor: project.color,
                  backgroundColor: `${project.color}10`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <span 
                    className="font-mono text-xs tracking-wider"
                    style={{ color: project.color }}
                  >
                    {project.type.toUpperCase()}
                  </span>
                  <div>
                    <h3 className="font-mono text-xl font-bold text-white">{project.name}</h3>
                    <motion.div 
                      className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: project.color }}
                    >
                      <span className="font-mono text-xs">LAUNCH</span>
                      <ExternalLink size={12} />
                    </motion.div>
                  </div>
                </div>

                {/* Glitch overlay on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.color}20 2px, ${project.color}20 4px)`,
                  }}
                />
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 px-8 md:px-16 border-t border-white/10">
          <motion.blockquote
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-5xl font-mono text-white leading-tight">
              &ldquo;The glitch is not an error. It's a revelation.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#ff0080]">- CORRUPTED_FILE.TXT</span>
            </footer>
          </motion.blockquote>
        </section>

        {/* Footer hint */}
        <motion.div
          className="py-12 px-8 md:px-16 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
