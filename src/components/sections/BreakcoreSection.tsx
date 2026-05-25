'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ROWS = 4;
const COLS = 16;
const COLORS = ['#66ff00', '#ff0080', '#ffff00', '#00ffff'];
const ROW_LABELS = ['KICK', 'SNARE', 'HH', 'BASS'];

function makeGrid() {
  return Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => {
      if (r === 0) return c % 4 === 0;
      if (r === 1) return c % 8 === 4;
      if (r === 2) return c % 2 === 1;
      return c % 6 === 0 || c % 6 === 3;
    })
  );
}

export function BreakcoreSection() {
  const [grid, setGrid] = useState(makeGrid());
  const [bpm, setBpm] = useState(180);
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(-1);
  const [glitch, setGlitch] = useState(false);
  const stepRef = useRef(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 6000 + Math.random() * 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!playing) { setStep(-1); stepRef.current = -1; return; }
    const ms = (60 / bpm / 4) * 1000;
    timerRef.current = setInterval(() => {
      stepRef.current = (stepRef.current + 1) % COLS;
      setStep(stepRef.current);
    }, ms);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, bpm]);

  const toggleCell = (r: number, c: number) => {
    setGrid(prev => prev.map((row, ri) => row.map((cell, ci) => ri === r && ci === c ? !cell : cell)));
  };

  const randomize = () => {
    setGrid(Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => Math.random() > 0.6)
    ));
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#66ff00] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      <motion.h1
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[140] text-3xl font-bold font-mono tracking-wider"
        style={{ color: glitch ? '#ff0080' : '#66ff00', textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #ffff00' : 'none' }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        BREAK<span className="text-white">CORE</span>
      </motion.h1>

      <div className="flex flex-col items-center gap-8 w-full px-8">
        {/* BPM + beat indicator */}
        <div className="flex items-center gap-6">
          <motion.div className="font-mono font-black"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#66ff00', lineHeight: 1 }}
            animate={{ scale: playing && step % 4 === 0 ? [1, 1.06, 1] : 1 }}
            transition={{ duration: 0.1 }}
          >
            {bpm}
          </motion.div>
          <div className="space-y-1">
            <div className="font-mono text-xs text-white/40">BPM</div>
            <input type="range" min={80} max={300} value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-28 accent-[#66ff00]" data-interactive />
          </div>

          {/* Beat lights */}
          <div className="flex gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div key={i} className="w-4 h-4 rounded-full border border-[#66ff00]/40"
                animate={{ backgroundColor: playing && Math.floor(step / 4) === i ? '#66ff00' : 'transparent' }}
                transition={{ duration: 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Step grid */}
        <div className="flex flex-col gap-2">
          {grid.map((row, r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="font-mono text-xs w-14 text-right" style={{ color: COLORS[r] }}>
                {ROW_LABELS[r]}
              </span>
              <div className="flex gap-1">
                {row.map((active, c) => {
                  const isStep = c === step;
                  const isBar = c % 4 === 0;
                  return (
                    <motion.button key={c}
                      className="w-8 h-8 border transition-none"
                      style={{
                        backgroundColor: active ? (isStep ? '#ffffff' : COLORS[r]) : isStep ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                        borderColor: isBar ? `${COLORS[r]}60` : 'rgba(255,255,255,0.1)',
                        boxShadow: active && isStep ? `0 0 10px ${COLORS[r]}` : 'none',
                      }}
                      onClick={() => toggleCell(r, c)}
                      whileTap={{ scale: 0.85 }}
                      data-interactive
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <motion.button
            className="px-8 py-3 border-2 font-mono text-sm font-bold"
            style={{
              borderColor: playing ? '#ff0080' : '#66ff00',
              color: playing ? '#ff0080' : '#66ff00',
              boxShadow: playing ? '0 0 20px rgba(255,0,128,0.2)' : '0 0 20px rgba(102,255,0,0.2)',
            }}
            onClick={() => setPlaying(p => !p)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-interactive
          >
            {playing ? '■ KILL' : '▶ SHATTER'}
          </motion.button>
          <motion.button
            className="px-5 py-3 border border-white/20 font-mono text-xs text-white/50 hover:text-white hover:border-white/50"
            onClick={randomize} whileTap={{ scale: 0.95 }} data-interactive
          >
            RANDOMIZE
          </motion.button>
          <motion.button
            className="px-5 py-3 border border-white/20 font-mono text-xs text-white/50 hover:text-white hover:border-white/50"
            onClick={() => setGrid(makeGrid())} whileTap={{ scale: 0.95 }} data-interactive
          >
            RESET
          </motion.button>
        </div>
      </div>

      <motion.div className="fixed bottom-6 left-6 font-mono text-[#66ff00] text-xs"
        animate={{ opacity: playing ? [0.4, 1, 0.4] : 0.4 }}
        transition={{ duration: 60 / bpm, repeat: Infinity }}
      >
        {playing ? `RHYTHM SHATTERING @ ${bpm} BPM` : 'TEMPO.EXE PAUSED — CLICK SHATTER'}
      </motion.div>
    </div>
  );
}
