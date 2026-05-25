'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const zines = [
  {
    id: 1, issue: '#28', title: 'STATIC BODIES', tag: 'BODY / NOISE',
    year: '2019', pages: '44pp', color: '#ff0080', rotation: -8, x: 8, y: 18,
    excerpt: 'documentation of flesh as broadcast medium. risograph. screaming in a format.',
  },
  {
    id: 2, issue: '#31', title: 'DEAD FREQUENCIES', tag: 'RADIO / VOID',
    year: '2020', pages: '28pp', color: '#00ff41', rotation: 12, x: 62, y: 10,
    excerpt: 'pirate transmission logs. blank tape enclosed. nothing recorded. everything said.',
  },
  {
    id: 3, issue: '#33', title: 'RAW MATERIAL', tag: 'LABOR / DECAY',
    year: '2021', pages: '64pp', color: '#ffff00', rotation: -4, x: 32, y: 55,
    excerpt: 'factory floor interviews. xerox masters. ink bleeding through every page.',
  },
  {
    id: 4, issue: '#35', title: 'TORN SIGNAL', tag: 'PROTEST / TRANSMISSION',
    year: '2022', pages: '36pp', color: '#9900ff', rotation: 16, x: 72, y: 52,
    excerpt: 'what the algorithm wouldn\'t distribute. printed at 3am. distributed by hand.',
  },
  {
    id: 5, issue: '#37', title: 'BASEMENT TAPES', tag: 'MUSIC / MEMORY',
    year: '2023', pages: '52pp', color: '#00ffff', rotation: -14, x: 18, y: 70,
    excerpt: 'unofficial recordings of unofficial acts. liner notes for music that never existed.',
  },
  {
    id: 6, issue: '#04', title: 'RAW', tag: 'CURRENT ISSUE',
    year: '2025', pages: '32pp', color: '#ff6600', rotation: 6, x: 52, y: 72,
    excerpt: 'you are reading it. or you will be. the signal finds its receiver.',
  },
];

export function ScrapFileSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [opened, setOpened] = useState<number | null>(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(i);
  }, []);

  const openedZine = zines.find(z => z.id === opened);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#9900ff] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[140] text-center"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-mono tracking-wider"
          style={{ color: glitch ? '#ff0080' : '#9900ff', textShadow: glitch ? '2px 0 0 #ff0080, -2px 0 0 #00ff41' : 'none' }}>
          SCRAP<span className="text-white">FILE</span>
        </h1>
        <p className="font-mono text-xs text-white/30 mt-1">underground zine archive — click to read</p>
      </motion.div>

      {/* Scattered zines */}
      {zines.map((z, i) => (
        <motion.div
          key={z.id}
          className="fixed cursor-pointer"
          style={{ left: `${z.x}%`, top: `${z.y}%`, zIndex: hovered === z.id ? 90 : 50 + i }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: hovered === z.id ? 1.15 : 1, rotate: z.rotation }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          onMouseEnter={() => setHovered(z.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setOpened(z.id)}
          data-interactive
        >
          {/* Zine card */}
          <div className="w-36 shadow-2xl" style={{ boxShadow: hovered === z.id ? `0 0 30px ${z.color}60` : undefined }}>
            {/* Cover */}
            <div className="h-48 flex flex-col justify-between p-3 border-2"
              style={{ backgroundColor: `${z.color}18`, borderColor: z.color }}>
              <div>
                <div className="font-mono text-xs font-bold" style={{ color: z.color }}>{z.tag}</div>
                <div className="font-mono text-xs text-white/40 mt-1">ENTN {z.issue}</div>
              </div>
              <div>
                <div className="font-mono text-lg font-black text-white leading-tight">{z.title}</div>
              </div>
              <div className="flex justify-between font-mono text-xs text-white/30">
                <span>{z.year}</span><span>{z.pages}</span>
              </div>
            </div>
            {/* Drop shadow base */}
            <div className="h-1" style={{ backgroundColor: z.color, opacity: 0.4 }} />
          </div>

          {/* Hover excerpt */}
          <AnimatePresence>
            {hovered === z.id && (
              <motion.div
                className="absolute top-full left-0 mt-2 w-56 p-3 border font-mono text-xs text-white/80 bg-black"
                style={{ borderColor: z.color }}
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                {z.excerpt}
                <div className="mt-2 font-bold" style={{ color: z.color }}>→ click to open</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Full-screen zine view */}
      <AnimatePresence>
        {openedZine && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
          >
            <motion.div
              className="max-w-lg w-full mx-8 border-2 p-8 space-y-6"
              style={{ borderColor: openedZine.color }}
              initial={{ scale: 0.8, rotate: openedZine.rotation }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-xs mb-1" style={{ color: openedZine.color }}>{openedZine.tag} — ENTN {openedZine.issue}</div>
                  <h2 className="text-4xl font-black text-white font-mono">{openedZine.title}</h2>
                </div>
                <button onClick={() => setOpened(null)} className="text-white/40 hover:text-white font-mono text-sm" data-interactive>✕</button>
              </div>
              <div className="h-px w-full" style={{ backgroundColor: openedZine.color }} />
              <p className="font-mono text-sm text-white/70 leading-relaxed">{openedZine.excerpt}</p>
              <div className="font-mono text-xs text-white/30 space-y-1">
                <div>YEAR: {openedZine.year} / PAGES: {openedZine.pages} / PRINT: RISOGRAPH</div>
                <div>DISTRO: DIRECT / COPIES: LIMITED</div>
              </div>
              <div className="h-px w-full border-dashed border-t" style={{ borderColor: `${openedZine.color}40` }} />
              <div className="font-mono text-xs" style={{ color: openedZine.color }}>
                [archive copy — handle with static]
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed bottom-6 left-6 font-mono text-[#9900ff] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
        ARCHIVE: {zines.length} ISSUES / FORMAT: PRINT / STATUS: CIRCULATING
      </motion.div>
    </div>
  );
}
