'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const stations = [
  { freq: '87.9', name: 'SIGNAL VOID', genre: 'NOISE / DRONE', now: 'untitled transmission #44 — anonymous', color: '#ff0080' },
  { freq: '91.3', name: 'RAW BASEMENT', genre: 'HARDCORE / PUNK', now: 'live recording: warehouse show, undisclosed location', color: '#ff6600' },
  { freq: '94.7', name: 'STATIC DREAMS', genre: 'AMBIENT / EXPERIMENTAL', now: '4 hours of tape hiss — side b', color: '#9966ff' },
  { freq: '98.1', name: 'PIRATE SIGNAL', genre: 'HIP-HOP / UNDERGROUND', now: 'mixtape vol.3 — no features, no label', color: '#00ff41' },
  { freq: '101.5', name: 'DEAD CHANNEL', genre: 'INDUSTRIAL / EBM', now: 'machine worship — 160bpm sequence', color: '#00ffff' },
  { freq: '104.3', name: 'TORN WIRE', genre: 'JAZZ / FREE IMPROV', now: 'session #12 — unedited, unmastered', color: '#ffff00' },
  { freq: '107.7', name: 'BURN FM', genre: 'BREAKCORE / JUNGLE', now: 'ENTN broadcast — live from nowhere', color: '#ff3366' },
  { freq: '---', name: 'DEAD AIR', genre: 'SILENCE', now: '...', color: '#333333' },
];

export function NoiseBoxSection() {
  const [stationIdx, setStationIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [staticLevel, setStaticLevel] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(40).fill(0));
  const [glitch, setGlitch] = useState(false);
  const station = stations[stationIdx];

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 6000 + Math.random() * 5000);
    return () => clearInterval(i);
  }, []);

  // Animate spectrum bars
  useEffect(() => {
    const i = setInterval(() => {
      if (scanning || station.freq === '---') {
        setBars(prev => prev.map(() => Math.random() * 0.3));
      } else {
        setBars(prev => prev.map((_, idx) => {
          const center = 20;
          const spread = 15 + stationIdx * 2;
          const dist = Math.abs(idx - center);
          const base = Math.max(0, 1 - dist / spread);
          return base * (0.4 + Math.random() * 0.6);
        }));
      }
    }, 80);
    return () => clearInterval(i);
  }, [scanning, station.freq, stationIdx]);

  const scan = (dir: number) => {
    setScanning(true);
    setStaticLevel(1);
    setTimeout(() => {
      setStationIdx(i => (i + dir + stations.length) % stations.length);
      setStaticLevel(0.3);
      setTimeout(() => { setScanning(false); setStaticLevel(0); }, 400);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#ff3366] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      <motion.h1
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[140] text-3xl font-bold font-mono tracking-wider"
        style={{ color: glitch ? '#ffff00' : '#ff3366', textShadow: glitch ? '2px 0 0 #ff0080, -2px 0 0 #00ff41' : 'none' }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        NOISE<span className="text-white">BOX</span>
      </motion.h1>

      {/* Static overlay */}
      {staticLevel > 0 && (
        <div className="absolute inset-0 pointer-events-none z-30"
          style={{
            opacity: staticLevel,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '150px',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-8">
        {/* Spectrum display */}
        <div className="w-full h-28 bg-black border border-white/10 flex items-end px-2 gap-px">
          {bars.map((bar, i) => (
            <div key={i} className="flex-1 transition-none"
              style={{ height: `${bar * 100}%`, backgroundColor: station.color, opacity: 0.8 }} />
          ))}
        </div>

        {/* Frequency dial */}
        <div className="flex items-center gap-8 w-full justify-center">
          <motion.button
            className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-white/70 hover:text-white transition-all"
            onClick={() => scan(-1)} whileTap={{ scale: 0.9 }} data-interactive
          >
            <ChevronLeft size={24} />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div key={stationIdx} className="text-center min-w-[200px]"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-mono text-6xl font-black tracking-widest"
                style={{ color: station.color, textShadow: `0 0 20px ${station.color}60` }}>
                {station.freq}
              </div>
              <div className="font-mono text-xs text-white/40 mt-1">FM MHz</div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-white/70 hover:text-white transition-all"
            onClick={() => scan(1)} whileTap={{ scale: 0.9 }} data-interactive
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Station info */}
        <AnimatePresence mode="wait">
          <motion.div key={stationIdx} className="w-full border p-6 space-y-3"
            style={{ borderColor: `${station.color}60` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-xl font-bold text-white">{station.name}</div>
                <div className="font-mono text-xs mt-1" style={{ color: station.color }}>{station.genre}</div>
              </div>
              <motion.div className="w-3 h-3 rounded-full"
                style={{ backgroundColor: station.freq === '---' ? '#333' : station.color }}
                animate={{ opacity: station.freq === '---' ? 0.3 : [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            <div className="h-px bg-white/10" />
            <div className="font-mono text-sm text-white/60">
              <span className="text-white/30">NOW PLAYING: </span>{station.now}
            </div>
            <div className="font-mono text-xs text-white/20">
              UNLICENSED BROADCAST / NO PLAYLIST / NO REPEAT
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Station dots */}
        <div className="flex gap-2">
          {stations.map((_, i) => (
            <button key={i} className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === stationIdx ? station.color : 'rgba(255,255,255,0.2)' }}
              onClick={() => { setStationIdx(i); }}
              data-interactive
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 left-6 font-mono text-[#ff3366] text-xs">
        PIRATE RADIO — WHITE NOISE CATHEDRAL — STATIC CHAMBER
      </div>
    </div>
  );
}
