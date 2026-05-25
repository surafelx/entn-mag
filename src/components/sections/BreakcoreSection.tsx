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
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [glitch, setGlitch] = useState(false);
  const stepRef = useRef(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 6000 + Math.random() * 3000);
    return () => clearInterval(interval);
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

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#66ff00] transition-colors font-mono text-sm"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="text-4xl font-bold tracking-wider font-mono"
          style={{
            color: glitch ? '#ff0080' : '#66ff00',
            textShadow: glitch ? '3px 0px 0px #ff0080, -3px 0px 0px #ffff00' : 'none',
          }}
        >
          BREAK<span className="text-white">CORE</span>
        </h1>
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pt-16">
        {/* BPM display */}
        <div className="flex items-center gap-4">
          <motion.span
            className="font-mono text-5xl font-bold"
            style={{ color: '#66ff00' }}
            animate={{ scale: playing ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 60 / bpm, repeat: Infinity }}
          >
            {bpm}
          </motion.span>
          <span className="font-mono text-sm text-white/50">BPM</span>
          <input
            type="range"
            min={80}
            max={300}
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className="w-32 accent-[#66ff00]"
            data-interactive
          />
        </div>

        {/* Step grid */}
        <div className="flex flex-col gap-2">
          {grid.map((row, r) => (
            <div key={r} className="flex items-center gap-2">
              <span
                className="font-mono text-xs w-12 text-right"
                style={{ color: COLORS[r] }}
              >
                {ROW_LABELS[r]}
              </span>
              <div className="flex gap-1">
                {row.map((active, c) => {
                  const isCurrentStep = c === step;
                  return (
                    <motion.button
                      key={c}
                      className="w-8 h-8 border transition-none"
                      style={{
                        backgroundColor: active
                          ? isCurrentStep ? '#ffffff' : COLORS[r]
                          : isCurrentStep ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                        borderColor: active ? COLORS[r] : 'rgba(255,255,255,0.15)',
                        boxShadow: active && isCurrentStep ? `0 0 12px ${COLORS[r]}` : 'none',
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
        <div className="flex gap-4">
          <motion.button
            className="px-8 py-3 border-2 font-mono text-sm font-bold transition-colors"
            style={{
              borderColor: playing ? '#ff0080' : '#66ff00',
              color: playing ? '#ff0080' : '#66ff00',
              boxShadow: playing ? '0 0 20px rgba(255,0,128,0.3)' : '0 0 20px rgba(102,255,0,0.3)',
            }}
            onClick={() => setPlaying(p => !p)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-interactive
          >
            {playing ? '■ STOP' : '▶ SHATTER'}
          </motion.button>

          <motion.button
            className="px-6 py-3 border border-white/30 font-mono text-xs text-white/60 hover:text-white hover:border-white/60"
            onClick={() => setGrid(makeGrid())}
            whileTap={{ scale: 0.95 }}
            data-interactive
          >
            RANDOMIZE
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[#66ff00] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 60 / bpm, repeat: Infinity }}
      >
        {playing ? `RHYTHM SHATTERING @ ${bpm}BPM` : 'TEMPO.EXE PAUSED'}
      </motion.div>
    </div>
  );
}
