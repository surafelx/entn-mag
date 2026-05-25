'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const artworks = [
  {
    id: 1, title: 'SIGNAL LOSS #7', medium: 'DIGITAL PRINT / CORRUPTED', year: '2023',
    color: '#ff6699', artist: 'ANON_4829',
    description: 'screenshot from a corrupted broadcast. timestamp unknown. location: everywhere.',
    pixels: [
      '████░░░░████████░░░░████',
      '███░░░░░░░░░░░░░░░░░░███',
      '░░░░░░████░░░░████░░░░░░',
      '░░░░░░████░░░░████░░░░░░',
      '███░░░░░░░░░░░░░░░░░░░███',
      '████░░░░████████░░░░████',
    ],
  },
  {
    id: 2, title: 'VOID PORTRAIT', medium: 'VHS CAPTURE / DEGRADED', year: '2022',
    color: '#00ffff', artist: 'STATIC_GHOST',
    description: 'face recorded on vhs. tape played 847 times. this is what remains.',
    pixels: [
      '░░░░████████████████░░░░',
      '░░████░░░░░░░░░░░░████░░',
      '░███░░░░████░░████░░░███',
      '░███░░░░░░░░░░░░░░░░░███',
      '░░████░░░░░░░░░░░░████░░',
      '░░░░████████████████░░░░',
    ],
  },
  {
    id: 3, title: 'CONCRETE FREQUENCY', medium: 'FIELD RECORDING / VISUALIZED', year: '2024',
    color: '#ffff00', artist: 'RAW_MATERIAL',
    description: 'audio waveform of city noise. 3am. captured without permission.',
    pixels: [
      '░░░░░░░░█░░░█░░░█░░░░░░░',
      '░░░░░░███░███░███░░░░░░░',
      '░░░░░█████████████░░░░░░',
      '░░░░░█████████████░░░░░░',
      '░░░░░░███░███░███░░░░░░░',
      '░░░░░░░░█░░░█░░░█░░░░░░░',
    ],
  },
  {
    id: 4, title: 'DATA BODY', medium: 'GENERATIVE / CORRUPTED OUTPUT', year: '2024',
    color: '#9900ff', artist: 'NUL_PTR',
    description: 'body as data structure. fields: undefined. type: raw. validation: off.',
    pixels: [
      '░░░░░░░░░░████░░░░░░░░░░',
      '░░░░░░░████████░░░░░░░░░',
      '░░░░░███░░░░░░███░░░░░░░',
      '░░░░░███████████░░░░░░░░',
      '░░░░░░░███░░███░░░░░░░░░',
      '░░░░░░░███░░███░░░░░░░░░',
    ],
  },
];

export function PixelDriftSection() {
  const [idx, setIdx] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [driftedPixels, setDriftedPixels] = useState<string[][]>([]);
  const art = artworks[idx];

  useEffect(() => {
    const base = art.pixels.map(row => row.split(''));
    setDriftedPixels(base);
    const interval = setInterval(() => {
      setDriftedPixels(prev => prev.map(row => row.map(px => {
        if (Math.random() > 0.97) return px === '█' ? '░' : '█';
        return px;
      })));
    }, 200);
    return () => clearInterval(interval);
  }, [idx, art.pixels]);

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#ff6699] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      <motion.h1
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[140] text-3xl font-bold font-mono tracking-wider"
        style={{ color: glitch ? '#ffff00' : '#ff6699', textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #00ffff' : 'none' }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        PIXEL<span className="text-white">DRIFT</span>
      </motion.h1>

      <div className="w-full max-w-2xl px-8 space-y-8">
        {/* Artwork display */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="border-2 p-6"
            style={{ borderColor: art.color, boxShadow: `0 0 40px ${art.color}30` }}
          >
            {/* Pixel art */}
            <div className="flex flex-col items-center mb-6"
              style={{ filter: glitch ? 'blur(1px) saturate(3)' : 'none' }}>
              {driftedPixels.map((row, ri) => (
                <div key={ri} className="flex">
                  {row.map((px, ci) => (
                    <div key={ci} className="w-4 h-4 md:w-6 md:h-6"
                      style={{ backgroundColor: px === '█' ? art.color : `${art.color}15` }} />
                  ))}
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-xl font-bold text-white">{art.title}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: art.color }}>{art.medium} — {art.year}</div>
                </div>
                <div className="font-mono text-xs text-white/30 text-right">
                  by {art.artist}<br />{idx + 1} / {artworks.length}
                </div>
              </div>
              <div className="h-px w-full" style={{ backgroundColor: `${art.color}30` }} />
              <p className="font-mono text-sm text-white/60">{art.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            className="flex items-center gap-2 font-mono text-sm border border-white/20 px-4 py-2 text-white/50 hover:text-white hover:border-white/50 transition-all"
            onClick={() => setIdx(i => (i - 1 + artworks.length) % artworks.length)}
            whileTap={{ scale: 0.95 }} data-interactive
          >
            <ChevronLeft size={16} /> PREV
          </motion.button>

          <div className="flex gap-2">
            {artworks.map((_, i) => (
              <button key={i} className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: i === idx ? art.color : 'rgba(255,255,255,0.2)' }}
                onClick={() => setIdx(i)} data-interactive />
            ))}
          </div>

          <motion.button
            className="flex items-center gap-2 font-mono text-sm border border-white/20 px-4 py-2 text-white/50 hover:text-white hover:border-white/50 transition-all"
            onClick={() => setIdx(i => (i + 1) % artworks.length)}
            whileTap={{ scale: 0.95 }} data-interactive
          >
            NEXT <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 font-mono text-[#ff6699] text-xs">
        RAW GALLERY — VISUAL ARTIFACTS — SCREEN TEAR ACTIVE
      </div>
    </div>
  );
}
