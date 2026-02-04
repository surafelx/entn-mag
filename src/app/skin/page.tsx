'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Clothing items for dress-up
const clothingItems = {
  tops: [
    { id: 'top1', name: 'OVERSIZED TEE', color: '#1a1a1a', price: '$45' },
    { id: 'top2', name: 'MESH LAYER', color: '#333', price: '$60' },
    { id: 'top3', name: 'CROPPED HOODIE', color: '#2d2d2d', price: '$85' },
    { id: 'top4', name: 'VINTAGE BAND TEE', color: '#1f1f1f', price: '$35' },
  ],
  bottoms: [
    { id: 'bottom1', name: 'WIDE CARGO', color: '#2a2a2a', price: '$90' },
    { id: 'bottom2', name: 'DISTRESSED DENIM', color: '#3a3a5a', price: '$75' },
    { id: 'bottom3', name: 'PLEATED SKIRT', color: '#1e1e1e', price: '$65' },
    { id: 'bottom4', name: 'TRACK PANTS', color: '#252525', price: '$55' },
  ],
  accessories: [
    { id: 'acc1', name: 'CHAIN BELT', color: '#silver', price: '$40' },
    { id: 'acc2', name: 'BUCKET HAT', color: '#222', price: '$30' },
    { id: 'acc3', name: 'PLATFORM BOOTS', color: '#111', price: '$120' },
    { id: 'acc4', name: 'TOTE BAG', color: '#1a1a1a', price: '$50' },
  ],
};

// Model silhouettes for the carousel
const models = [
  { id: 1, name: 'MIKA', pose: 'standing', height: 'tall' },
  { id: 2, name: 'ZARA', pose: 'leaning', height: 'medium' },
  { id: 3, name: 'KAI', pose: 'walking', height: 'tall' },
  { id: 4, name: 'NOVA', pose: 'sitting', height: 'short' },
  { id: 5, name: 'REMI', pose: 'standing', height: 'medium' },
];

// Lookbook items for horizontal scroll
const lookbookItems = [
  {
    id: 1,
    title: "STREETWEAR DECAY",
    subtitle: "Shot on iPhone at 3AM",
    description: "Oversized silhouettes meeting urban grime. Layer everything. Nothing matches.",
    color: '#00ff41',
    tag: 'LOOKBOOK'
  },
  {
    id: 2,
    title: "TEXTURE STUDY",
    subtitle: "Designer Interview",
    description: "When fabric becomes architecture. Corduroy, mesh, leather, repeat.",
    color: '#ff0080',
    tag: 'INTERVIEW'
  },
  {
    id: 3,
    title: "THRIFT FLIP",
    subtitle: "DIY Culture",
    description: "Your grandma's closet is a goldmine. Cut, sew, destroy, rebuild.",
    color: '#ffff00',
    tag: 'DIY'
  },
  {
    id: 4,
    title: "ANTI-FASHION",
    subtitle: "Movement Documentation",
    description: "Wearing ugly as a statement. Beauty is overrated anyway.",
    color: '#9966ff',
    tag: 'EDITORIAL'
  },
  {
    id: 5,
    title: "BASEMENT RUNWAY",
    subtitle: "Underground Shows",
    description: "Fashion week is dead. The real shows happen in parking garages.",
    color: '#ff6600',
    tag: 'EVENTS'
  },
  {
    id: 6,
    title: "FOUND OBJECTS",
    subtitle: "Accessory Feature",
    description: "Hardware store jewelry. Safety pins are the new diamonds.",
    color: '#00ffff',
    tag: 'ACCESSORIES'
  },
];

export default function SkinPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [modelOutfits, setModelOutfits] = useState<Record<number, { top?: string; bottom?: string; accessory?: string }>>({});
  const [activeCategory, setActiveCategory] = useState<'tops' | 'bottoms' | 'accessories'>('tops');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const lookbookRef = useRef<HTMLDivElement>(null);
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

  const handleModelClick = (modelId: number) => {
    setSelectedModel(modelId);
  };

  const handleClothingSelect = (itemId: string, category: 'tops' | 'bottoms' | 'accessories') => {
    if (selectedModel === null) return;
    
    setModelOutfits(prev => ({
      ...prev,
      [selectedModel]: {
        ...prev[selectedModel],
        [category === 'tops' ? 'top' : category === 'bottoms' ? 'bottom' : 'accessory']: itemId,
      }
    }));
  };

  const nextCarousel = () => {
    setCarouselIndex(prev => (prev + 1) % models.length);
  };

  const prevCarousel = () => {
    setCarouselIndex(prev => (prev - 1 + models.length) % models.length);
  };

  // Mouse drag for lookbook
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!lookbookRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - lookbookRef.current.offsetLeft);
    setScrollLeft(lookbookRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !lookbookRef.current) return;
    e.preventDefault();
    const x = e.pageX - lookbookRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    lookbookRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
            className="font-mono text-sm tracking-[0.3em] text-[#00ff41] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            FASHION // TEXTURE // IDENTITY
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[12rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="SK!N"
            style={{
              color: glitchActive ? '#00ff41' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #ff0080, -2px -2px 0px #00ffff' 
                : '4px 4px 0px rgba(0,255,65,0.3)',
              transform: 'rotate(-2deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SK!N
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            What you wear is who you are. Or who you want to be. Or who you're pretending not to be. 
            Fashion as armor. Fashion as protest. Fashion as accident.
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

        {/* Interactive Dress-Up Section */}
        <section className="py-16 px-8 md:px-16 border-t border-white/10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-[#ff0080]">INTERACTIVE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">
              DRESS THEM UP
            </h2>
            <p className="text-white/50 font-mono text-sm mt-4 max-w-lg">
              Click on a model, then select clothing items to create your look. Mix, match, destroy conventions.
            </p>
          </motion.div>

          {/* Model Carousel */}
          <div className="relative mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8 overflow-hidden py-8">
              <button 
                onClick={prevCarousel}
                className="absolute left-0 z-10 bg-black/80 p-2 border border-white/20 hover:border-[#00ff41] transition-colors"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              {models.map((model, index) => {
                const offset = index - carouselIndex;
                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 2;
                const outfit = modelOutfits[model.id] || {};

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={model.id}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedModel === model.id ? 'ring-2 ring-[#00ff41]' : ''
                    }`}
                    style={{
                      transform: `translateX(${offset * 20}%) scale(${isCenter ? 1 : 0.7})`,
                      opacity: isCenter ? 1 : 0.5,
                      zIndex: isCenter ? 10 : 1,
                    }}
                    onClick={() => handleModelClick(model.id)}
                    whileHover={{ scale: isCenter ? 1.05 : 0.75 }}
                  >
                    {/* Model Silhouette */}
                    <div 
                      className="w-32 md:w-48 h-64 md:h-96 relative bg-gradient-to-b from-white/5 to-transparent border border-white/10"
                      style={{
                        clipPath: model.pose === 'standing' 
                          ? 'polygon(30% 0%, 70% 0%, 80% 30%, 75% 60%, 90% 100%, 10% 100%, 25% 60%, 20% 30%)'
                          : model.pose === 'leaning'
                          ? 'polygon(20% 0%, 60% 0%, 85% 30%, 80% 60%, 95% 100%, 5% 100%, 20% 60%, 15% 30%)'
                          : 'polygon(25% 0%, 75% 0%, 85% 25%, 70% 55%, 85% 100%, 15% 100%, 30% 55%, 15% 25%)'
                      }}
                    >
                      {/* Clothing layers */}
                      {outfit.top && (
                        <motion.div
                          className="absolute top-[20%] left-[15%] right-[15%] h-[25%] rounded"
                          style={{ 
                            backgroundColor: clothingItems.tops.find(t => t.id === outfit.top)?.color || '#333'
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.9, scale: 1 }}
                        />
                      )}
                      {outfit.bottom && (
                        <motion.div
                          className="absolute top-[45%] left-[20%] right-[20%] h-[35%] rounded"
                          style={{ 
                            backgroundColor: clothingItems.bottoms.find(b => b.id === outfit.bottom)?.color || '#333'
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.9, scale: 1 }}
                        />
                      )}
                      {outfit.accessory && (
                        <motion.div
                          className="absolute top-[5%] left-[30%] right-[30%] h-[10%] rounded-full"
                          style={{ 
                            backgroundColor: '#444',
                            border: '2px solid #666'
                          }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        />
                      )}
                    </div>

                    {/* Model name */}
                    <motion.span
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-wider"
                      style={{ color: selectedModel === model.id ? '#00ff41' : '#666' }}
                    >
                      {model.name}
                    </motion.span>
                  </motion.div>
                );
              })}

              <button 
                onClick={nextCarousel}
                className="absolute right-0 z-10 bg-black/80 p-2 border border-white/20 hover:border-[#00ff41] transition-colors"
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </div>
          </div>

          {/* Clothing Selection Panel */}
          <AnimatePresence>
            {selectedModel !== null && (
              <motion.div
                className="bg-black/60 backdrop-blur-md border border-white/10 p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-lg text-white">
                    DRESSING: <span className="text-[#00ff41]">{models.find(m => m.id === selectedModel)?.name}</span>
                  </h3>
                  <button 
                    onClick={() => setSelectedModel(null)}
                    className="text-white/50 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Category tabs */}
                <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
                  {(['tops', 'bottoms', 'accessories'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`font-mono text-sm uppercase tracking-wider transition-colors ${
                        activeCategory === cat ? 'text-[#00ff41]' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Clothing items grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {clothingItems[activeCategory].map((item, index) => {
                    const outfit = modelOutfits[selectedModel] || {};
                    const isSelected = 
                      (activeCategory === 'tops' && outfit.top === item.id) ||
                      (activeCategory === 'bottoms' && outfit.bottom === item.id) ||
                      (activeCategory === 'accessories' && outfit.accessory === item.id);

                    return (
                      <motion.button
                        key={item.id}
                        className={`p-4 border transition-all text-left ${
                          isSelected 
                            ? 'border-[#00ff41] bg-[#00ff41]/10' 
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        onClick={() => handleClothingSelect(item.id, activeCategory)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="w-full aspect-square mb-3"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-mono text-xs text-white block">{item.name}</span>
                        <span className="font-mono text-xs text-[#00ff41]">{item.price}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Horizontal Scrolling Lookbook */}
        <section className="py-16 border-t border-white/10">
          <motion.div
            className="px-8 md:px-16 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-[#ffff00]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">
              LOOKBOOK
            </h2>
          </motion.div>

          {/* Horizontal scroll container */}
          <div
            ref={lookbookRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {lookbookItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] relative group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 2}deg)` }}
              >
                {/* Card */}
                <div 
                  className="aspect-[3/4] w-full relative overflow-hidden border-2 transition-all duration-300 group-hover:border-opacity-100"
                  style={{ 
                    borderColor: item.color,
                    borderOpacity: 0.3,
                    backgroundColor: `${item.color}10`,
                  }}
                >
                  {/* Issue number */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="font-mono text-6xl md:text-8xl font-bold opacity-10"
                      style={{ color: item.color }}
                    >
                      {String(item.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Tag */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 border"
                    style={{ borderColor: item.color, color: item.color }}
                  >
                    <span className="font-mono text-xs tracking-wider">{item.tag}</span>
                  </motion.div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <motion.span
                      className="font-mono text-xs tracking-widest block mb-2"
                      style={{ color: item.color }}
                    >
                      {item.subtitle}
                    </motion.span>
                    <h3 className="font-mono text-2xl md:text-3xl font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-sm text-white/60 mt-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Read more */}
                    <motion.button
                      className="mt-4 font-mono text-xs tracking-wider border-b pb-1 transition-colors"
                      style={{ color: item.color, borderColor: item.color }}
                      whileHover={{ x: 5 }}
                    >
                      READ MORE
                    </motion.button>
                  </div>

                  {/* Hover glitch effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"
                    style={{
                      background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${item.color}20 2px, ${item.color}20 4px)`,
                    }}
                  />
                </div>
              </motion.article>
            ))}

            {/* End marker */}
            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
        </section>

        {/* Editorial Quote Section */}
        <section className="py-24 px-8 md:px-16 border-t border-white/10">
          <motion.blockquote
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-5xl font-mono text-white leading-tight">
              &ldquo;The clothes make the statement. The person wearing them just has to show up.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#00ff41]">- ANONYMOUS THRIFTER, 2AM</span>
            </footer>
          </motion.blockquote>
        </section>

        {/* Footer navigation hint */}
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
}
