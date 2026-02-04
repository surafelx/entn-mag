'use client';

import { Layout } from '@/components/Layout';
import Link from 'next/link';
import { ArrowLeft, Play, Share2, ExternalLink } from 'lucide-react';
import { use } from 'react';

// Content database
const contentDB: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  creator: string;
  date: string;
  color: string;
  content: React.ReactNode;
  relatedMedia?: { type: string; label: string }[];
}> = {
  'neural-nightmares': {
    title: 'NEURAL NIGHTMARES',
    subtitle: 'AI-generated club flyers for parties that may or may not exist',
    category: 'visuals',
    creator: 'VOID.COLLECTIVE',
    date: '2026.02.01',
    color: '#ff0080',
    relatedMedia: [
      { type: 'gallery', label: 'VIEW GALLERY' },
      { type: 'download', label: 'DOWNLOAD PACK' },
    ],
    content: (
      <div className="space-y-6">
        <p>What happens when you feed a neural network the combined visual DNA of 10,000 rave flyers, brutalist architecture, and fever dreams? NEURAL NIGHTMARES happened.</p>
        <p>This collection represents six months of prompt engineering, model fine-tuning, and digital serendipity. Each image was generated for a fictional event — parties that exist only in latent space, venues that defy physics, lineups featuring artists who may or may not be human.</p>
        <p>The aesthetic is intentionally unsettling. Faces that almost resolve. Text that almost makes sense. Colors that feel like they are vibrating at frequencies your screen was not designed to display.</p>
        <blockquote className="border-l-2 border-[#ff0080] pl-4 my-8 text-white/70 italic">
          &ldquo;I do not know if these are promotional materials or warnings.&rdquo;
          <br />— Anonymous viewer
        </blockquote>
        <p>Available as high-resolution downloads. Use them. Remix them. Print them and wheat-paste them on surfaces that consent to being decorated. Just remember: the party might not be real, but the art is.</p>
      </div>
    ),
  },
  'subculture-deep-dive': {
    title: 'DEEP WEB CULTURES',
    subtitle: 'A documentary series exploring the strangest corners of the internet',
    category: 'video',
    creator: 'ANON_FILMMAKER',
    date: '2026.01.28',
    color: '#00ff41',
    relatedMedia: [
      { type: 'video', label: 'WATCH EP.1' },
      { type: 'video', label: 'FULL SERIES' },
    ],
    content: (
      <div className="space-y-6">
        <p>Five episodes. Five communities. Zero judgment.</p>
        <p>DEEP WEB CULTURES is a documentary series that goes beyond the surface-level coverage of internet subcultures. No sensationalism. No clickbait framing. Just genuine attempts to understand why people gather in the digital spaces they do.</p>
        <div className="my-8 p-4 bg-white/5 border border-white/10">
          <h4 className="font-mono text-sm text-[#00ff41] mb-3">EPISODE GUIDE</h4>
          <ul className="space-y-2 font-mono text-sm text-white/60">
            <li>01. THE LIMINAL ARCHIVE — Communities preserving abandoned digital spaces</li>
            <li>02. CURSOR CULTS — Groups that worship specific UI elements</li>
            <li>03. TIME CAPSULE FORUMS — Boards that have not changed since 2004</li>
            <li>04. SYNTHETIC IDENTITIES — People who only exist online</li>
            <li>05. THE GREAT FORGETTING — Communities dedicated to erasing their own history</li>
          </ul>
        </div>
        <p>Each episode runs approximately 45 minutes and features original interviews conducted over encrypted channels. Faces are obscured. Voices are processed. Identities are protected.</p>
      </div>
    ),
  },
  'datamosh-tutorial': {
    title: 'DATAMOSH.EXE',
    subtitle: 'Open-source glitch art toolkit for the modern digital vandal',
    category: 'software',
    creator: 'CORRUPT_DEV',
    date: '2026.01.25',
    color: '#9966ff',
    relatedMedia: [
      { type: 'download', label: 'DOWNLOAD v2.3' },
      { type: 'docs', label: 'DOCUMENTATION' },
      { type: 'source', label: 'VIEW SOURCE' },
    ],
    content: (
      <div className="space-y-6">
        <p>DATAMOSH.EXE is a command-line toolkit for creating glitch art from video and image files. It is designed to be both powerful and accessible.</p>
        <div className="my-8 p-4 bg-black border border-[#9966ff] font-mono text-sm">
          <code className="text-[#9966ff]">$ datamosh --input video.mp4 --mode bloom --intensity 0.8</code>
        </div>
        <p>Features include: pixel sorting, channel shifting, data corruption, frame blending, and a dozen other ways to make your media look like it is having a beautiful breakdown.</p>
        <p>The toolkit is fully open-source under MIT license. Fork it. Break it. Make it do things we never intended. That is the spirit of glitch art.</p>
        <div className="my-8 grid grid-cols-2 gap-4">
          <div className="p-4 border border-white/10">
            <span className="font-mono text-xs text-white/40">VERSION</span>
            <p className="font-mono text-xl text-white mt-1">2.3.1</p>
          </div>
          <div className="p-4 border border-white/10">
            <span className="font-mono text-xs text-white/40">DOWNLOADS</span>
            <p className="font-mono text-xl text-white mt-1">47,832</p>
          </div>
        </div>
      </div>
    ),
  },
  'digital-decay-essay': {
    title: 'ON DIGITAL DECAY',
    subtitle: 'An essay on entropy, aesthetics, and the beauty of broken data',
    category: 'articles',
    creator: 'ENTROPY_WRITER',
    date: '2026.01.22',
    color: '#ffff00',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-white/80">Everything digital is slowly dying. And that might be beautiful.</p>
        <p>We built the internet on the promise of permanence. Digital files, we were told, would last forever. No degradation. No fading. Perfect copies of perfect copies, into infinity.</p>
        <p>We were lied to.</p>
        <p>Hard drives fail. Formats become obsolete. Links rot. Servers go dark. The average lifespan of a webpage is 100 days. The digital world is not a monument — it is a sandcastle at high tide.</p>
        <blockquote className="border-l-2 border-[#ffff00] pl-4 my-8 text-white/70 italic">
          &ldquo;The glitch is not an error. It is a reminder that nothing lasts.&rdquo;
        </blockquote>
        <p>But there is beauty in this decay. When a JPEG corrupts, it does not just break — it transforms. Colors bleed. Shapes smear. The rigid grid of pixels becomes fluid, organic, alive in its dying.</p>
        <p>This essay is an argument for embracing digital entropy. Not fighting it. Not fearing it. Finding the art in the artifacts.</p>
      </div>
    ),
  },
  'noise-frequencies': {
    title: 'NOISE FREQUENCIES',
    subtitle: 'A podcast exploring experimental sound design and audio art',
    category: 'audio',
    creator: 'STATIC_SOUNDS',
    date: '2026.01.20',
    color: '#00ffff',
    relatedMedia: [
      { type: 'audio', label: 'LATEST EPISODE' },
      { type: 'archive', label: 'FULL ARCHIVE' },
    ],
    content: (
      <div className="space-y-6">
        <p>NOISE FREQUENCIES is a bi-weekly podcast dedicated to the edges of audio: field recordings, generative compositions, contact microphones, feedback loops, and everything in between.</p>
        <p>Each episode features a different artist discussing their process, followed by an exclusive audio piece created specifically for the show.</p>
        <div className="my-8 p-6 bg-gradient-to-r from-[#00ffff]/10 to-transparent border-l-2 border-[#00ffff]">
          <span className="font-mono text-xs text-[#00ffff]">LATEST EPISODE</span>
          <h4 className="font-mono text-lg text-white mt-2">EP.47: THE SOUND OF DYING ELECTRONICS</h4>
          <p className="font-mono text-sm text-white/50 mt-2">with guest CIRCUIT_BENDER exploring the audio signatures of hardware failure</p>
        </div>
        <p>Subscribe via RSS, or stream directly. Available on most podcast platforms, though we recommend downloading for the highest audio quality — compression is the enemy of noise.</p>
      </div>
    ),
  },
};

// Default content for items not in database
const defaultContent = {
  title: 'CONTENT',
  subtitle: 'Digital artifact from the void',
  category: 'misc',
  creator: 'UNKNOWN',
  date: '2026.01.01',
  color: '#ffffff',
  content: (
    <div className="space-y-6">
      <p>This content is being retrieved from the void. Check back soon.</p>
    </div>
  ),
};

export default function GlitchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = contentDB[slug] || { ...defaultContent, title: slug.toUpperCase().replace(/-/g, ' ') };

  return (
    <Layout>
      <div className="w-full min-h-screen page-enter">
        {/* Navigation */}
        <nav className="px-8 md:px-16 py-6 border-b border-white/10">
          <Link 
            href="/glitch" 
            className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-[#ff0080] transition-colors"
          >
            <ArrowLeft size={16} />
            BACK TO GL!TCH
          </Link>
        </nav>

        {/* Hero */}
        <header className="px-8 md:px-16 py-16 border-b border-white/10">
          <div className="max-w-4xl">
            <div 
              className="inline-block px-3 py-1 mb-6 font-mono text-xs tracking-wider"
              style={{ 
                color: item.color,
                backgroundColor: `${item.color}20`,
              }}
            >
              {item.category.toUpperCase()}
            </div>

            <h1 
              className="text-4xl md:text-7xl font-bold font-mono mb-4"
              style={{ color: item.color }}
            >
              {item.title}
            </h1>

            <p className="text-xl text-white/60 font-mono mb-8">
              {item.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-white/40">
              <span>by {item.creator}</span>
              <span>{item.date}</span>
              <button className="inline-flex items-center gap-1 hover:text-white transition-colors">
                <Share2 size={14} />
                SHARE
              </button>
            </div>
          </div>
        </header>

        {/* Media Actions */}
        {item.relatedMedia && (
          <section className="px-8 md:px-16 py-8 border-b border-white/10 bg-white/[0.02]">
            <div className="flex flex-wrap gap-4">
              {item.relatedMedia.map((media, i) => (
                <button
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-3 border font-mono text-sm transition-all hover:translate-x-1"
                  style={{ 
                    borderColor: item.color,
                    color: item.color,
                  }}
                >
                  {media.type === 'video' && <Play size={14} />}
                  {media.type === 'download' && <ExternalLink size={14} />}
                  {media.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Content */}
        <article className="px-8 md:px-16 py-16">
          <div className="max-w-2xl font-mono text-white/70 leading-relaxed">
            {item.content}
          </div>
        </article>

        {/* Footer */}
        <footer className="px-8 md:px-16 py-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <Link 
              href="/glitch" 
              className="font-mono text-sm text-white/30 hover:text-white transition-colors"
            >
              MORE FROM GL!TCH
            </Link>
            <span className="font-mono text-xs text-white/20">
              ENTN.MAG // 2026
            </span>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
