'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BANDS = [
  { label: 'SUB', hz: '20hz', color: '#ff3366' },
  { label: 'BASS', hz: '80hz', color: '#ff6600' },
  { label: 'LOW', hz: '250hz', color: '#ffff00' },
  { label: 'MID', hz: '1khz', color: '#00ff41' },
  { label: 'HIGH', hz: '4khz', color: '#00ffff' },
  { label: 'AIR', hz: '16khz', color: '#9966ff' },
];

export function NoiseBoxSection() {
  const [levels, setLevels] = useState(BANDS.map(() => 0.5));
  const [masterVol, setMasterVol] = useState(0.7);
  const [active, setActive] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(48).fill(0));
  const animRef = useRef<number>(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (active) {
        setBars(prev => prev.map((_, i) => {
          const band = Math.floor(i / (48 / BANDS.length));
          const bandLevel = levels[Math.min(band, levels.length - 1)];
          return Math.max(0, Math.min(1, bandLevel * (0.4 + Math.random() * 0.6))) * masterVol;
        }));
      } else {
        setBars(prev => prev.map(b => Math.max(0, b - 0.05)));
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, levels, masterVol]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff3366] transition-colors font-mono text-sm"
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
            color: glitch ? '#ffff00' : '#ff3366',
            textShadow: glitch ? '3px 0px 0px #ff3366, -3px 0px 0px #00ff41' : 'none',
          }}
        >
          NOISE<span className="text-white">BOX</span>
        </h1>
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 pt-16">
        {/* Spectrum visualizer */}
        <div className="flex items-end gap-px h-40 w-full max-w-2xl px-8">
          {bars.map((bar, i) => {
            const band = Math.floor(i / (48 / BANDS.length));
            const color = BANDS[Math.min(band, BANDS.length - 1)].color;
            return (
              <div
                key={i}
                className="flex-1 transition-none"
                style={{
                  height: `${bar * 100}%`,
                  backgroundColor: color,
                  filter: `brightness(${0.5 + bar * 0.8})`,
                }}
              />
            );
          })}
        </div>

        {/* Band sliders */}
        <div className="flex gap-8 items-end">
          {BANDS.map((band, i) => (
            <div key={band.label} className="flex flex-col items-center gap-3">
              <div
                className="relative h-32 w-8 bg-white/10 border border-white/20 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = 1 - (e.clientY - rect.top) / rect.height;
                  setLevels(prev => { const next = [...prev]; next[i] = Math.max(0, Math.min(1, y)); return next; });
                }}
                data-interactive
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: `${levels[i] * 100}%`, backgroundColor: band.color }}
                  animate={{ opacity: active ? [0.7, 1, 0.7] : 0.5 }}
                  transition={{ duration: 0.3, repeat: active ? Infinity : 0 }}
                />
                {/* Thumb */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-2 bg-white border border-white/50"
                  style={{ bottom: `${levels[i] * 100}%` }}
                />
              </div>
              <span className="font-mono text-xs" style={{ color: band.color }}>{band.label}</span>
              <span className="font-mono text-xs text-white/40">{band.hz}</span>
            </div>
          ))}
        </div>

        {/* Master + power */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-white/60">MASTER</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={masterVol}
              onChange={e => setMasterVol(Number(e.target.value))}
              className="w-32 accent-[#ff3366]"
              data-interactive
            />
            <span className="font-mono text-xs text-[#ff3366]">{Math.round(masterVol * 100)}%</span>
          </div>

          <motion.button
            className="w-16 h-16 rounded-full border-2 font-mono text-xs font-bold transition-colors"
            style={{
              borderColor: active ? '#ff3366' : '#ffffff40',
              color: active ? '#ff3366' : '#ffffff60',
              boxShadow: active ? '0 0 20px rgba(255,51,102,0.5)' : 'none',
            }}
            onClick={() => setActive(a => !a)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-interactive
          >
            {active ? 'KILL' : 'RUN'}
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[#ff3366] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {active ? 'BROADCASTING NOISE' : 'STATIC CHAMBER IDLE'}
      </motion.div>
    </div>
  );
}
