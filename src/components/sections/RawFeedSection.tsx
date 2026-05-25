'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type FeedLine = { text: string; type: string };

const allLines: FeedLine[] = [
  { type: 'MUSIC', text: 'new cassette out of nairobi — no label, no barcode, 50 copies. already gone.' },
  { type: 'SIGNAL', text: 'pirate station 104.7 broadcasting from building roof. playlist: unknown. duration: indefinite.' },
  { type: 'FILM', text: 'super-8 reel recovered from demolition site. 12 minutes. content: raw.' },
  { type: 'ERROR', text: 'DISTRIBUTION.EXE has stopped working — route packets manually' },
  { type: 'TEXT', text: 'photocopied manifesto found under door. 3 pages. no author. 47 demands.' },
  { type: 'MUSIC', text: 'sound system seizure on transit line 9 — 4 minutes of unscheduled noise.' },
  { type: 'EVENT', text: 'venue address distributed by word of mouth only. capacity: unknown. start time: now.' },
  { type: 'SIGNAL', text: 'frequency drift detected on 88.3 MHz — source unregistered, signal strong' },
  { type: 'FILM', text: 'vhs tape left at 3 locations simultaneously. tape length: 2hrs. content: silent.' },
  { type: 'ERROR', text: 'PLATFORM.dll could not be loaded — continuing without platform' },
  { type: 'TEXT', text: 'underground paper issue 47 — 2000 copies. print quality: deliberately bad.' },
  { type: 'MUSIC', text: 'field recording from protest. 38 minutes. unedited. no masters. released.' },
  { type: 'EVENT', text: 'collective occupation of unused broadcast tower — signal transmitted for 6 hours.' },
  { type: 'SIGNAL', text: 'data packet intercepted: origin encrypted. contents: frequencies. destination: everywhere.' },
  { type: 'FILM', text: 'found footage screening in parking structure. projector: borrowed. license: none.' },
  { type: 'ERROR', text: 'WARNING: memory allocated for silence overflowing' },
  { type: 'MUSIC', text: 'vinyl pressing of rehearsal tape — 100 copies, mislabeled by design.' },
  { type: 'TEXT', text: 'zine distribution network spanning 14 cities. zero infrastructure. all human.' },
  { type: 'EVENT', text: 'show announced 2 hours ago — 300 people. venue: building exterior.' },
  { type: 'SIGNAL', text: 'transmission received. origin: garage. duration: ongoing. authority: none.' },
];

const typeColors: Record<string, string> = {
  MUSIC: '#00ff41',
  SIGNAL: '#00ffff',
  FILM: '#ff6600',
  ERROR: '#ff0080',
  TEXT: '#ffff00',
  EVENT: '#9966ff',
};

export function RawFeedSection() {
  const [lines, setLines] = useState<(FeedLine & { id: number })[]>([]);
  const [cursor, setCursor] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [signal, setSignal] = useState(72);
  const idxRef = useRef(0);
  const counterRef = useRef(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ci = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(ci);
  }, []);

  useEffect(() => {
    const gi = setInterval(() => {
      setGlitch(true);
      setSignal(Math.floor(40 + Math.random() * 60));
      setTimeout(() => setGlitch(false), 120);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(gi);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const line = allLines[idxRef.current % allLines.length];
      idxRef.current++;
      counterRef.current++;
      setLines(prev => {
        const next = [...prev, { ...line, id: counterRef.current }];
        return next.slice(-22);
      });
      if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col">
      {/* Header bar */}
      <div className="flex-none border-b border-[#00ffff]/20">
        <div className="h-14 flex items-center px-6 gap-4">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-white hover:text-[#00ffff] transition-colors font-mono text-sm"
              data-interactive whileHover={{ x: -5 }}
            >
              <ArrowLeft size={16} /> BACK
            </motion.button>
          </Link>

          <div className="flex-1 text-center font-mono text-xl font-bold" style={{ color: glitch ? '#ff0080' : '#00ffff' }}>
            RAW<span className="text-white">FEED</span>
          </div>

          {/* Signal strength */}
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-px h-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1.5 transition-all"
                  style={{ height: `${(i + 1) * 12.5}%`, backgroundColor: signal > i * 12 ? '#00ffff' : 'rgba(0,255,255,0.15)' }} />
              ))}
            </div>
            <span className="font-mono text-xs text-[#00ffff]">{signal}%</span>
            <motion.span className="font-mono text-xs text-[#00ff41]"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ● LIVE
            </motion.span>
          </div>
        </div>

        {/* Category legend sub-bar */}
        <div className="flex items-center gap-3 px-6 pb-2 flex-wrap">
          {Object.entries(typeColors).map(([type, color]) => (
            <span key={type} className="font-mono text-xs" style={{ color }}>[{type}]</span>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div ref={feedRef} className="flex-1 overflow-hidden px-8 py-4 space-y-2">
        {lines.map((line) => (
          <motion.div key={line.id}
            className="flex items-start gap-3 font-mono text-sm leading-relaxed"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            style={{ filter: glitch && Math.random() > 0.7 ? 'blur(1px)' : 'none' }}
          >
            <span className="flex-none text-xs pt-0.5 font-bold"
              style={{ color: typeColors[line.type] }}>[{line.type}]</span>
            <span className="text-white/80">{line.text}</span>
          </motion.div>
        ))}
        <span className="text-[#00ffff] font-mono">{cursor ? '█' : ' '}</span>
      </div>

      {/* Status bar */}
      <div className="flex-none h-9 border-t border-[#00ffff]/20 flex items-center px-8 gap-6 font-mono text-xs text-white/30">
        <span>LINES RECEIVED: {counterRef.current}</span>
        <span>FILTER: NONE</span>
        <span>ENCRYPTION: OFF</span>
        <span className="ml-auto">UNFILTERED TRANSMISSION / ENTN WIRE</span>
      </div>
    </div>
  );
}
