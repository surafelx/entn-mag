'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import { Play, Headphones, Code, FileText, Video, Image as ImageIcon } from 'lucide-react';

// Content categories for the digital section
const categories = [
  { id: 'all', name: 'ALL', color: '#ffffff' },
  { id: 'articles', name: 'ARTICLES', color: '#ff0080' },
  { id: 'video', name: 'VIDEO', color: '#00ff41' },
  { id: 'audio', name: 'AUDIO', color: '#ffff00' },
  { id: 'software', name: 'SOFTWARE', color: '#9966ff' },
  { id: 'visuals', name: 'VISUALS', color: '#00ffff' },
];

// Sample content - each item links to its own page
const content = [
  {
    id: 'neural-nightmares',
    title: 'NEURAL NIGHTMARES',
    subtitle: 'AI-generated club flyers for parties that may not exist',
    category: 'visuals',
    creator: 'VOID.COLLECTIVE',
    date: '2026.02.01',
    type: 'gallery',
    color: '#ff0080',
    featured: true,
  },
  {
    id: 'subculture-deep-dive',
    title: 'DEEP WEB CULTURES',
    subtitle: 'A documentary series on internet subcultures',
    category: 'video',
    creator: 'ANON_FILMMAKER',
    date: '2026.01.28',
    type: 'series',
    color: '#00ff41',
    featured: true,
  },
  {
    id: 'datamosh-tutorial',
    title: 'DATAMOSH.EXE',
    subtitle: 'Open-source glitch art toolkit',
    category: 'software',
    creator: 'CORRUPT_DEV',
    date: '2026.01.25',
    type: 'tool',
    color: '#9966ff',
  },
  {
    id: 'digital-decay-essay',
    title: 'ON DIGITAL DECAY',
    subtitle: 'When pixels rot and data corrupts',
    category: 'articles',
    creator: 'ENTROPY_WRITER',
    date: '2026.01.22',
    type: 'essay',
    color: '#ffff00',
  },
  {
    id: 'noise-frequencies',
    title: 'NOISE FREQUENCIES',
    subtitle: 'Experimental sound design sessions',
    category: 'audio',
    creator: 'STATIC_SOUNDS',
    date: '2026.01.20',
    type: 'podcast',
    color: '#00ffff',
  },
  {
    id: 'broken-interfaces',
    title: 'BROKEN INTERFACES',
    subtitle: 'A collection of anti-design web experiments',
    category: 'software',
    creator: 'CRASH_COLLECTIVE',
    date: '2026.01.18',
    type: 'collection',
    color: '#ff6600',
  },
  {
    id: 'pixel-archaeology',
    title: 'PIXEL ARCHAEOLOGY',
    subtitle: 'Recovering art from corrupted game files',
    category: 'articles',
    creator: 'RETRO_HUNTER',
    date: '2026.01.15',
    type: 'feature',
    color: '#ff0080',
  },
  {
    id: 'void-gallery',
    title: 'VOID.GALLERY',
    subtitle: 'Interactive 3D space for digital art',
    category: 'visuals',
    creator: 'DIMENSION_X',
    date: '2026.01.12',
    type: 'experience',
    color: '#00ff41',
  },
  {
    id: 'algorithm-dreams',
    title: 'ALGORITHM DREAMS',
    subtitle: 'Generative music from neural networks',
    category: 'audio',
    creator: 'AI_COMPOSER',
    date: '2026.01.10',
    type: 'album',
    color: '#9966ff',
  },
];

const getIcon = (category: string) => {
  switch (category) {
    case 'articles': return <FileText size={14} />;
    case 'video': return <Video size={14} />;
    case 'audio': return <Headphones size={14} />;
    case 'software': return <Code size={14} />;
    case 'visuals': return <ImageIcon size={14} />;
    default: return <Play size={14} />;
  }
};

export default function GlitchPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredContent = activeCategory === 'all' 
    ? content 
    : content.filter(item => item.category === activeCategory);

  const featuredContent = content.filter(item => item.featured);

  return (
    <Layout>
      <div className="w-full min-h-screen page-enter">
        {/* Hero */}
        <section className="min-h-[50vh] flex flex-col justify-center px-8 md:px-16 py-20 relative">
          <span className="font-mono text-xs tracking-[0.4em] text-[#ff0080] mb-4">
            DIGITAL // BROKEN // BEAUTIFUL
          </span>
          
          <h1
            className="text-6xl md:text-[10rem] font-bold font-mono leading-none"
            style={{
              color: '#ffffff',
              textShadow: '4px 4px 0px rgba(255,0,128,0.4)',
              transform: 'rotate(-1deg)',
            }}
          >
            GL!TCH
          </h1>

          <p className="max-w-md text-white/50 font-mono text-sm mt-6 leading-relaxed">
            Articles, videos, audio, software, and visual experiments 
            from the edges of digital culture.
          </p>
        </section>

        {/* Featured Section */}
        <section className="px-8 md:px-16 py-12 border-t border-white/10">
          <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41] mb-6 block">
            FEATURED
          </span>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredContent.map((item) => (
              <Link 
                key={item.id} 
                href={`/glitch/${item.id}`}
                className="block group"
              >
                <article 
                  className="relative border-2 p-6 transition-all duration-300 hover:translate-x-1 hover:-translate-y-1"
                  style={{ 
                    borderColor: hoveredItem === item.id ? item.color : 'rgba(255,255,255,0.1)',
                    backgroundColor: hoveredItem === item.id ? `${item.color}10` : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Category badge */}
                  <div 
                    className="inline-flex items-center gap-2 px-2 py-1 mb-4 font-mono text-xs"
                    style={{ 
                      color: item.color,
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    {getIcon(item.category)}
                    {item.type.toUpperCase()}
                  </div>

                  <h3 
                    className="text-2xl md:text-3xl font-bold font-mono mb-2 transition-colors"
                    style={{ color: hoveredItem === item.id ? item.color : '#ffffff' }}
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-white/50 font-mono text-sm mb-4">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/30">
                      {item.creator}
                    </span>
                    <span className="font-mono text-xs text-white/30">
                      {item.date}
                    </span>
                  </div>

                  {/* Hover indicator */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                    style={{ 
                      width: hoveredItem === item.id ? '100%' : '0%',
                      backgroundColor: item.color,
                    }}
                  />
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-8 md:px-16 py-8 border-t border-white/10 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-mono text-xs tracking-wider px-4 py-2 border transition-all duration-200"
                style={{
                  borderColor: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.2)',
                  color: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.5)',
                  backgroundColor: activeCategory === cat.id ? `${cat.color}15` : 'transparent',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <section className="px-8 md:px-16 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContent.map((item, index) => (
              <Link 
                key={item.id} 
                href={`/glitch/${item.id}`}
                className="block group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <article 
                  className="relative border p-5 transition-all duration-200 hover:border-opacity-100"
                  style={{ 
                    borderColor: hoveredItem === item.id ? item.color : 'rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="flex items-center gap-1.5 font-mono text-xs"
                      style={{ color: item.color }}
                    >
                      {getIcon(item.category)}
                      <span>{item.type.toUpperCase()}</span>
                    </div>
                    <span className="font-mono text-xs text-white/30">{item.date}</span>
                  </div>

                  <h3 
                    className="text-lg font-bold font-mono mb-1 transition-colors"
                    style={{ color: hoveredItem === item.id ? item.color : '#ffffff' }}
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-white/40 font-mono text-xs line-clamp-2">
                    {item.subtitle}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/5">
                    <span className="font-mono text-xs text-white/20">
                      by {item.creator}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="px-8 md:px-16 py-12 border-t border-white/10">
          <div className="text-center">
            <p className="font-mono text-xs text-white/30 tracking-widest">
              ARROW KEYS TO NAVIGATE
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
