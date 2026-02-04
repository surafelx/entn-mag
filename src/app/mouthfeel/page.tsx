'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const foodStories = [
  {
    title: "3AM RAMEN RITUAL",
    subtitle: "Late Night Chronicles",
    description: "The fluorescent lights flicker. The broth steams. This is your church.",
    longDescription: "There's a ramen shop three blocks from here that stays open until 4am. The owner never smiles, the chairs are uncomfortable, and the broth has been simmering for twenty years. This is sacred ground.",
    color: '#ffff00',
  },
  {
    title: "FOOD AS ARMOR",
    subtitle: "Identity Essays",
    description: "What you eat when no one's watching says everything about who you are.",
    longDescription: "Your comfort food is a mirror. The midnight snacks, the guilty pleasures, the meals you cook when you're homesick. They reveal what you can't say out loud.",
    color: '#ff0080',
  },
  {
    title: "MESSY IS THE POINT",
    subtitle: "Visual Documentation",
    description: "Dripping sauce, crumbs everywhere, hands dirty. Perfect.",
    longDescription: "We've been lied to about how food should look. Real food is chaos. Real food stains your shirt. Real food doesn't care about your Instagram aesthetic.",
    color: '#00ff41',
  },
  {
    title: "COMFORT CRIMES",
    subtitle: "Confessional",
    description: "Hot sauce on ice cream? Chips in your sandwich? We don't judge here.",
    longDescription: "This is a safe space for your food crimes. The combinations that would horrify a chef but make perfect sense at 2am. The textures that shouldn't work but do.",
    color: '#ff6600',
  },
  {
    title: "GRANDMA'S RECIPE",
    subtitle: "Heritage",
    description: "The handwritten card, the unmeasured pinch, the taste of memory.",
    longDescription: "Some recipes can't be written down. They exist in muscle memory, in pinches and dashes, in 'cook until it looks right.' These are the recipes that matter most.",
    color: '#9966ff',
  },
];

const recipes = [
  { name: "MIDNIGHT EGGS", time: "5min", difficulty: "EASY", color: '#ffff00' },
  { name: "EMERGENCY PASTA", time: "15min", difficulty: "MEDIUM", color: '#ff0080' },
  { name: "BROKE RAMEN UPGRADE", time: "10min", difficulty: "EASY", color: '#00ff41' },
  { name: "HANGOVER CURE", time: "20min", difficulty: "HARD", color: '#ff6600' },
  { name: "INSTANT COMFORT", time: "3min", difficulty: "EASY", color: '#9966ff' },
];

export default function MouthfeelPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
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

  const nextStory = () => setActiveStory((prev) => (prev + 1) % foodStories.length);
  const prevStory = () => setActiveStory((prev) => (prev - 1 + foodStories.length) % foodStories.length);

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
            className="font-mono text-sm tracking-[0.3em] text-[#ffff00] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            FOOD // RITUAL // IDENTITY
          </motion.span>
          
          <motion.h1
            className={`text-6xl md:text-[10rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="MOUTHFEEL"
            style={{
              color: glitchActive ? '#ffff00' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #ff0080, -2px -2px 0px #00ff41' 
                : '4px 4px 0px rgba(255,255,0,0.3)',
              transform: 'rotate(-1deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            MOUTHFEEL
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Food is memory. Food is rebellion. Food is the 3am meal you eat standing over the sink because 
            you're too hungry to find a plate. This is that energy.
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

        {/* Featured Story Carousel */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ff0080]">FEATURED</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">FOOD STORIES</h2>
          </div>

          <div className="relative px-8 md:px-16">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                {foodStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStory(i)}
                    className={`w-8 h-1 transition-all ${i === activeStory ? 'bg-[#ffff00]' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevStory} className="p-2 border border-white/20 hover:border-[#ffff00] transition-colors">
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button onClick={nextStory} className="p-2 border border-white/20 hover:border-[#ffff00] transition-colors">
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Story content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                className="grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {/* Visual */}
                <div 
                  className="aspect-square w-full relative overflow-hidden border-2"
                  style={{ 
                    borderColor: foodStories[activeStory].color,
                    backgroundColor: `${foodStories[activeStory].color}10`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, -1, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <span 
                      className="font-mono text-9xl font-bold opacity-10"
                      style={{ color: foodStories[activeStory].color }}
                    >
                      {String(activeStory + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <span 
                    className="font-mono text-xs tracking-widest"
                    style={{ color: foodStories[activeStory].color }}
                  >
                    {foodStories[activeStory].subtitle.toUpperCase()}
                  </span>
                  <h3 
                    className="text-3xl md:text-5xl font-bold font-mono mt-2 mb-4"
                    style={{ color: foodStories[activeStory].color }}
                  >
                    {foodStories[activeStory].title}
                  </h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                    {foodStories[activeStory].longDescription}
                  </p>
                  <motion.button
                    className="font-mono text-sm px-6 py-3 border transition-colors"
                    style={{ borderColor: foodStories[activeStory].color, color: foodStories[activeStory].color }}
                    whileHover={{ backgroundColor: foodStories[activeStory].color, color: '#000' }}
                  >
                    READ FULL STORY
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Quick Recipes Horizontal Scroll */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">QUICK RECIPES</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.name}
                className="flex-shrink-0 w-72 h-48 relative border-2 group cursor-pointer"
                style={{ 
                  borderColor: recipe.color,
                  backgroundColor: `${recipe.color}10`,
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs" style={{ color: recipe.color }}>{recipe.difficulty}</span>
                    <span className="font-mono text-xs text-white/50">{recipe.time}</span>
                  </div>
                  <h3 className="font-mono text-xl font-bold text-white">{recipe.name}</h3>
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
              &ldquo;The best meals are the ones you eat standing up, straight from the pot, at 2am.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#ffff00]">- KITCHEN CONFESSIONS</span>
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
