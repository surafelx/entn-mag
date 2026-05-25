'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const channels = [
  {
    num: 1, name: 'DEAD AIR',
    type: 'BROADCAST', color: '#ff9900',
    content: 'signal lost 11:47pm wednesday\nbroadcast continues\ncontent: undefined\nviewer count: 1',
    subtext: 'you are the broadcast',
  },
  {
    num: 2, name: 'RAW FOOTAGE',
    type: 'FILM', color: '#ff0080',
    content: '16mm / no sound / 44min\n"found in dumpster behind post office"\nunedited. no cuts. no story.\njust what happened.',
    subtext: 'documentary of nothing',
  },
  {
    num: 3, name: 'BASEMENT SESSIONS',
    type: 'MUSIC', color: '#00ff41',
    content: 'recorded on cassette 4-track\n3 takes. 1 selected at random.\nno overdubs. no editing.\nvocals mixed too low intentionally.',
    subtext: 'audio fidelity: deliberately compromised',
  },
  {
    num: 4, name: 'PIRATE NEWS',
    type: 'BROADCAST', color: '#00ffff',
    content: 'unauthorized transmission\nfrom an unknown location\nanchors: uncredited\nsources: firsthand',
    subtext: '30 minutes. no commercial breaks. ever.',
  },
  {
    num: 5, name: 'NOISE HOUR',
    type: 'MUSIC', color: '#9966ff',
    content: 'one hour of unstructured sound\nno beginning. no end.\nperformed by: everyone\nrecorded: always',
    subtext: 'you cannot unhear this',
  },
  {
    num: 6, name: 'THE ARCHIVE',
    type: 'TEXT', color: '#ffff00',
    content: 'documents recovered:\n- 847 photocopied manifestos\n- 23 unfinished novels\n- field recordings, locations unknown\n- letters never sent',
    subtext: 'catalog: incomplete by design',
  },
  {
    num: 7, name: 'CHANNEL VOID',
    type: 'VOID', color: '#333333',
    content: '\n\n...\n\n',
    subtext: 'nothing is also content',
  },
];

export function StaticVoidSection() {
  const [chIdx, setChIdx] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const ch = channels[chIdx];

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(i);
  }, []);

  const switchChannel = (dir: number) => {
    setSwitching(true);
    setTimeout(() => {
      setChIdx(i => (i + dir + channels.length) % channels.length);
      setSwitching(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[110]">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      <motion.h1
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[140] text-3xl font-bold font-mono tracking-wider"
        style={{ color: glitch ? '#ff0080' : '#ff9900', textShadow: glitch ? '2px 0 0 #ff0080, -2px 0 0 #00ff41' : 'none' }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        STATIC<span className="text-white">VOID</span>
      </motion.h1>

      {/* Static background */}
      <motion.div className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{ opacity: switching ? 0.5 : 0.08 }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />

      {/* Scan line */}
      <motion.div className="absolute w-full h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${ch.color}30, transparent)` }}
        animate={{ y: ['15vh', '90vh'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main TV display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-2xl px-8 space-y-6">
          {/* Channel indicator */}
          <div className="flex items-center gap-4">
            <motion.div className="font-mono font-black text-7xl" style={{ color: ch.color, lineHeight: 1 }}
              animate={{ opacity: switching ? [1, 0, 1] : 1 }} transition={{ duration: 0.3 }}>
              {String(ch.num).padStart(2, '0')}
            </motion.div>
            <div>
              <div className="font-mono text-xs" style={{ color: ch.color }}>{ch.type}</div>
              <div className="font-mono text-2xl font-bold text-white">{ch.name}</div>
            </div>
            <motion.div className="ml-auto w-3 h-3 rounded-full flex-none"
              style={{ backgroundColor: ch.num === 7 ? '#333' : ch.color }}
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>

          <div className="h-px w-full" style={{ backgroundColor: `${ch.color}40` }} />

          {/* Content */}
          <AnimatePresence mode="wait">
            {!switching && (
              <motion.div key={chIdx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <pre className="font-mono text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                  {ch.content}
                </pre>
                <div className="font-mono text-xs italic" style={{ color: `${ch.color}80` }}>
                  — {ch.subtext}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-px w-full" style={{ backgroundColor: `${ch.color}20` }} />

          {/* Controls */}
          <div className="flex items-center justify-between">
            <motion.button
              className="flex items-center gap-2 font-mono text-sm text-white/60 hover:text-white transition-colors border border-white/20 px-4 py-2 hover:border-white/50"
              onClick={() => switchChannel(-1)} whileTap={{ scale: 0.95 }} data-interactive
            >
              <ChevronLeft size={16} /> PREV
            </motion.button>

            <div className="flex gap-1.5">
              {channels.map((_, i) => (
                <button key={i} className="w-2 h-2 rounded-full transition-all"
                  style={{ backgroundColor: i === chIdx ? ch.color : 'rgba(255,255,255,0.15)' }}
                  onClick={() => { setSwitching(true); setTimeout(() => { setChIdx(i); setSwitching(false); }, 300); }}
                  data-interactive
                />
              ))}
            </div>

            <motion.button
              className="flex items-center gap-2 font-mono text-sm text-white/60 hover:text-white transition-colors border border-white/20 px-4 py-2 hover:border-white/50"
              onClick={() => switchChannel(1)} whileTap={{ scale: 0.95 }} data-interactive
            >
              NEXT <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* CRT vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)' }} />

      <div className="fixed bottom-6 left-6 font-mono text-[#ff9900]/50 text-xs">
        NULL SPACE — DEAD CHANNELS — VOID.WAV
      </div>
    </div>
  );
}
