'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ChevronDown, ChevronUp, Bookmark, Share2 } from 'lucide-react';

const thoughts = [
  {
    title: "ON BEING UNCOMFORTABLE",
    type: "ESSAY",
    content: "Growth lives in the places you don't want to go. The discomfort is the point. Stop avoiding it.",
    fullContent: "Growth lives in the places you don't want to go. The discomfort is the point. Stop avoiding it. We've been conditioned to optimize for comfort, to smooth every edge, to avoid friction at all costs. But friction is where transformation happens. The muscle tears to grow stronger. The caterpillar destroys itself to become something new. Your comfort zone is a beautiful prison with invisible walls.",
    color: '#66ff00',
    date: "FEB 2"
  },
  {
    title: "WHY I QUIT",
    type: "RANT",
    content: "The industry wants content. I wanted to make art. These things are not compatible anymore.",
    fullContent: "The industry wants content. I wanted to make art. These things are not compatible anymore. Content is a conveyor belt. Content is optimized, A/B tested, algorithimically approved. Art is a scream in the dark. Art doesn't care if you like it. Art exists because it has to, not because it performs well. I spent three years making content. I'm done. Back to screaming.",
    color: '#ff0080',
    date: "JAN 28"
  },
  {
    title: "NOTES FROM 3AM",
    type: "FRAGMENT",
    content: "The city sounds different when everyone's asleep. Like it's breathing. Like it's waiting.",
    fullContent: "The city sounds different when everyone's asleep. Like it's breathing. Like it's waiting. For what? I don't know. Maybe for morning. Maybe for us to finally listen. The hum of distant traffic becomes a heartbeat. The flickering streetlight becomes morse code from the universe. At 3am, everything means something. Or nothing. It's hard to tell the difference when you're this tired and this awake.",
    color: '#00ffff',
    date: "JAN 20"
  },
  {
    title: "UNFINISHED THOUGHT #47",
    type: "DRAFT",
    content: "What if we just... didn't? What if the resistance itself was the art? What if—",
    fullContent: "What if we just... didn't? What if the resistance itself was the art? What if not participating was the most radical act? What if silence was louder than all our noise? What if we stopped performing productivity and just existed? What if—I don't know where this thought goes. Maybe that's the point. Not every thought needs a conclusion. Some just need to exist.",
    color: '#ffff00',
    date: "JAN 15"
  },
  {
    title: "A LETTER I'LL NEVER SEND",
    type: "PERSONAL",
    content: "You changed everything by leaving. I don't know if I should thank you or hate you for it.",
    fullContent: "You changed everything by leaving. I don't know if I should thank you or hate you for it. The space you left behind became a room I had to learn to live in. At first it was unbearable. Then it became familiar. Then it became mine. You gave me the gift of absence and I've built something beautiful in that void. But sometimes I still hate you for making me do this alone.",
    color: '#9966ff',
    date: "JAN 10"
  },
  {
    title: "THE ALGORITHM PROBLEM",
    type: "ANALYSIS",
    content: "We're all performing for machines now. The humans stopped mattering years ago.",
    fullContent: "We're all performing for machines now. The humans stopped mattering years ago. We write captions for algorithms, design for engagement metrics, create for the feed. The actual humans who see our work are just a side effect of pleasing the machine. We've become content farmers, harvesting attention for platforms that don't care about us. The revolution won't be monetized. At least, I hope not.",
    color: '#ff6600',
    date: "JAN 5"
  },
];

const types = ['ALL', 'ESSAY', 'RANT', 'FRAGMENT', 'DRAFT', 'PERSONAL', 'ANALYSIS'];

export default function BrainDumpPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState('ALL');
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredThoughts = selectedType === 'ALL' 
    ? thoughts 
    : thoughts.filter(t => t.type === selectedType);

  const toggleSaved = (index: number) => {
    setSavedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

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
            className="font-mono text-sm tracking-[0.3em] text-[#66ff00] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            THOUGHTS // RAW // UNFILTERED
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[10rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="BRAIN DUMP"
            style={{
              color: glitchActive ? '#66ff00' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #ff0080, -2px -2px 0px #00ffff' 
                : '4px 4px 0px rgba(102,255,0,0.3)',
              transform: 'rotate(1deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            BRAIN DUMP
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Unfiltered thoughts. Half-formed ideas. 3am revelations. This is the space where thinking 
            happens out loud. Some of it's good. Some of it's garbage. All of it's real.
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

        {/* Filter bar */}
        <section className="py-8 px-8 md:px-16 border-t border-white/10 sticky top-0 bg-black/90 backdrop-blur-md z-50">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`font-mono text-xs px-3 py-1 border transition-all ${
                  selectedType === type 
                    ? 'border-[#66ff00] text-[#66ff00] bg-[#66ff00]/10' 
                    : 'border-white/20 text-white/50 hover:border-white/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Thoughts List */}
        <section className="py-8 px-8 md:px-16">
          <AnimatePresence mode="popLayout">
            {filteredThoughts.map((thought, index) => {
              const isExpanded = expandedItem === index;
              const isSaved = savedItems.includes(index);
              const offsets = ['0%', '15%', '5%', '20%', '10%', '25%'];

              return (
                <motion.article
                  key={thought.title}
                  className="mb-12"
                  style={{ marginLeft: offsets[index % offsets.length] }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <motion.div
                    className="max-w-2xl relative p-6 cursor-pointer"
                    style={{
                      border: isExpanded ? `2px solid ${thought.color}` : '2px solid transparent',
                      backgroundColor: isExpanded ? `${thought.color}10` : 'transparent',
                    }}
                    onClick={() => setExpandedItem(isExpanded ? null : index)}
                    whileHover={{ x: 10 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span 
                          className="font-mono text-xs tracking-widest"
                          style={{ color: thought.color }}
                        >
                          [{thought.type}] / {thought.date}
                        </span>
                        <h2 
                          className="font-mono text-xl md:text-2xl font-bold mt-2"
                          style={{ color: isExpanded ? thought.color : '#ffffff' }}
                        >
                          {thought.title}
                        </h2>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        style={{ color: thought.color }}
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div className="mt-4">
                      <p className="font-mono text-sm text-white/70 leading-relaxed">
                        {isExpanded ? thought.fullContent : thought.content}
                      </p>
                    </motion.div>

                    {/* Actions */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSaved(index); }}
                            className={`flex items-center gap-2 font-mono text-xs px-3 py-1 border transition-all ${
                              isSaved 
                                ? 'border-[#66ff00] text-[#66ff00]' 
                                : 'border-white/20 text-white/50'
                            }`}
                          >
                            <Bookmark size={14} fill={isSaved ? '#66ff00' : 'none'} />
                            {isSaved ? 'SAVED' : 'SAVE'}
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 font-mono text-xs px-3 py-1 border border-white/20 text-white/50 hover:border-white/40"
                          >
                            <Share2 size={14} />
                            SHARE
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Decorative corner */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4"
                      style={{ backgroundColor: thought.color }}
                      animate={{ scale: isExpanded ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: isExpanded ? Infinity : 0 }}
                    />
                  </motion.div>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {filteredThoughts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-mono text-white/30">No thoughts in this category. Yet.</p>
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
              &ldquo;Not every thought needs to be finished. Some just need to exist.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#66ff00]">- UNFINISHED THOUGHT #47</span>
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
