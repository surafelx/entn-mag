'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const tracks = [
  { n: '01', title: 'NEON PULSE', dur: '5:23', bpm: '120', label: 'VOID REC' },
  { n: '02', title: 'FUTURE PAST', dur: '4:47', bpm: '118', label: 'VOID REC' },
  { n: '03', title: 'CHROME DREAMS', dur: '6:12', bpm: '125', label: 'VOID REC' },
  { n: '04', title: 'RETRO STATIC', dur: '3:55', bpm: '122', label: 'UNLICENSED' },
  { n: '05', title: 'SIGNAL 1988', dur: '7:01', bpm: '115', label: 'VOID REC' },
];

const VERT = 18;
const HORIZ = 10;

export function SynthwaveSection() {
  const [glitch, setGlitch] = useState(false);
  const [activeTrack, setActiveTrack] = useState(2);
  const [stars] = useState(() =>
    Array.from({ length: 80 }, () => ({ x: Math.random() * 100, y: Math.random() * 52, r: Math.random() * 1.5 + 0.5, d: 1 + Math.random() * 3 }))
  );

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 110);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[110]">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#9966ff] transition-colors font-mono text-sm bg-black/90 px-3 py-2 border border-white/20"
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      {/* Sky gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #000011 0%, #1a0033 38%, #3d0066 55%, #ff0080 60%, #000000 63%)' }} />

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.d, repeat: Infinity, delay: Math.random() * 2 }} />
      ))}

      {/* Sun */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ top: '43%' }}>
        <div className="w-44 h-22 rounded-t-full overflow-hidden relative"
          style={{
            background: 'linear-gradient(to bottom, #ffff44, #ff8800, #ff0080)',
            boxShadow: '0 0 80px rgba(255,100,0,0.7), 0 0 150px rgba(255,0,128,0.4)',
            height: '88px',
          }}>
          {[30, 45, 58, 70, 80, 89].map((y, i) => (
            <div key={i} className="absolute w-full h-px bg-black/25" style={{ top: `${y}%` }} />
          ))}
        </div>
      </div>

      {/* Perspective grid */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '40%', perspective: '500px' }}>
        <div className="absolute inset-0" style={{ transform: 'rotateX(65deg)', transformOrigin: 'top center' }}>
          <svg className="w-full h-full" preserveAspectRatio="none">
            {Array.from({ length: HORIZ }).map((_, i) => {
              const y = ((i + 1) / HORIZ) * 100;
              return <line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke="#9966ff" strokeWidth="1" strokeOpacity={0.8 - (i / HORIZ) * 0.5} />;
            })}
            {Array.from({ length: VERT + 1 }).map((_, i) => {
              const x = (i / VERT) * 100;
              return <line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                stroke="#ff0080" strokeWidth="1" strokeOpacity="0.7" />;
            })}
          </svg>
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 50%)' }} />
      </div>

      {/* Title */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{ top: '10%', filter: glitch ? 'blur(2px)' : 'none' }}
      >
        <motion.h1 className="font-mono font-black tracking-widest"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            color: '#ffffff',
            textShadow: '0 0 20px #9966ff, 0 0 50px #ff0080, 4px 4px 0 #ff0080',
          }}
          animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity }}
        >
          SYNTH<span style={{ color: '#ff0080', textShadow: '0 0 20px #ff0080, 0 0 50px #ffff00' }}>WAVE</span>
        </motion.h1>
        <motion.p className="font-mono text-xs tracking-widest mt-2"
          style={{ color: '#9966ff' }}
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}
        >
          NEON PULSE — RETRO FUTURE ARCHIVE
        </motion.p>
      </motion.div>

      {/* Track listing */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: '37%' }}>
        <div className="h-full flex items-end">
          <div className="w-full pb-6 px-8 md:px-16 space-y-1">
            {tracks.map((t, i) => (
              <motion.div key={t.n}
                className="flex items-center gap-4 py-1.5 px-3 font-mono text-sm cursor-pointer transition-all border border-transparent"
                style={{
                  color: activeTrack === i ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  backgroundColor: activeTrack === i ? 'rgba(153,102,255,0.15)' : 'transparent',
                  borderColor: activeTrack === i ? 'rgba(153,102,255,0.4)' : 'transparent',
                }}
                onClick={() => setActiveTrack(i)}
                whileHover={{ x: 4 }}
                data-interactive
              >
                <span className="text-[#9966ff] w-6">{t.n}</span>
                <span className="flex-1">{t.title}</span>
                <span className="text-xs opacity-50">{t.bpm} BPM</span>
                <span className="text-xs" style={{ color: activeTrack === i ? '#ff0080' : 'rgba(255,255,255,0.2)' }}>{t.dur}</span>
                {activeTrack === i && (
                  <motion.span className="text-xs text-[#00ff41]"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }}>
                    ▶ PLAYING
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />

      {/* Bottom info */}
      <div className="fixed bottom-2 right-6 font-mono text-[#9966ff]/40 text-xs">
        80s.dll loading... / VOID RECORDS
      </div>
    </div>
  );
}
