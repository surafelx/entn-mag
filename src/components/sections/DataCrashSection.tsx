'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const crashLines = [
  { text: 'KERNEL PANIC — not syncing: VFS: Unable to mount root fs on unknown-block(0,0)', delay: 0 },
  { text: 'MEMORY CORRUPTION DETECTED at 0xDEADBEEF — dumping core', delay: 350 },
  { text: '[  2.847291] Oops: general protection fault, probably for non-canonical address', delay: 700 },
  { text: 'Segmentation fault (core dumped)', delay: 1050 },
  { text: 'FATAL: Module reality.ko not found in directory', delay: 1400 },
  { text: 'Error: Cannot read property "meaning" of undefined at void (universe.js:1:1)', delay: 1750 },
  { text: '*** buffer overflow detected ***: program terminated', delay: 2100 },
  { text: 'IRQL_NOT_LESS_OR_EQUAL — stop: 0x0000000A — critical_process_died', delay: 2450 },
  { text: 'BAD_POOL_HEADER — your data is corrupted. all of it.', delay: 2800 },
  { text: 'System has encountered a fatal error and will restart.', delay: 3150 },
];

type Phase = 'crash' | 'bsod' | 'rebooting';

export function DataCrashSection() {
  const [phase, setPhase] = useState<Phase>('crash');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [flash, setFlash] = useState(false);

  const startCrash = () => {
    setPhase('crash');
    setVisibleLines([]);
    setProgress(0);

    crashLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === crashLines.length - 1) {
          setTimeout(() => {
            setFlash(true);
            setTimeout(() => { setFlash(false); setPhase('bsod'); }, 350);
          }, 600);
        }
      }, line.delay);
    });
  };

  useEffect(() => { startCrash(); }, []);

  useEffect(() => {
    if (phase !== 'bsod') return;
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(i);
  }, [phase]);

  const reboot = () => {
    setPhase('rebooting');
    setProgress(0);
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(i); setTimeout(startCrash, 400); return 100; }
        return p + 2;
      });
    }, 50);
  };

  return (
    <div className="fixed inset-0 overflow-hidden font-mono z-[110]"
      style={{ backgroundColor: phase === 'bsod' ? '#0000AA' : '#000000' }}>

      <AnimatePresence>
        {flash && (
          <motion.div className="fixed inset-0 bg-white z-[999]"
            initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.35 }} />
        )}
      </AnimatePresence>

      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 transition-colors text-sm px-3 py-2 border"
          style={{ color: phase === 'bsod' ? '#ffffff' : '#0099ff', borderColor: phase === 'bsod' ? 'rgba(255,255,255,0.3)' : 'rgba(0,153,255,0.3)' }}
          data-interactive whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>
      </Link>

      {/* CRASH PHASE */}
      {phase === 'crash' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 overflow-hidden space-y-1">
          {crashLines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                  className="text-xs leading-6"
                  style={{ color: i === crashLines.length - 1 ? '#ff0000' : i > crashLines.length - 3 ? '#ff6600' : '#0099ff' }}
                >
                  {line.text}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          {visibleLines.length < crashLines.length && (
            <motion.span className="text-white text-xs" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>█</motion.span>
          )}
        </div>
      )}

      {/* BSOD PHASE */}
      {phase === 'bsod' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-white"
          style={{ filter: glitch ? 'blur(1.5px)' : 'none' }}>
          <div className="max-w-xl w-full space-y-6">
            <div className="text-8xl font-bold">:(</div>
            <div className="text-2xl font-bold leading-snug">
              Your digital zine ran into a problem<br />and needs to restart.
            </div>
            <div className="text-sm opacity-80 leading-relaxed">
              We&apos;re collecting some error info, and then we&apos;ll restart for you.
              <br /><br />
              <span className="opacity-50">
                For more information visit:<br />
                https://entn.mag/crash?code=DIGITAL_DECAY_SPREADING
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-sm opacity-60">100% complete — awaiting signal</span>
            </div>
            <div className="text-xs opacity-40">
              Stop code: MEMORY_OVERFLOW<br />
              What failed: REALITY.EXE
            </div>
            <motion.button
              className="mt-2 px-6 py-2 border-2 border-white text-sm hover:bg-white hover:text-[#0000AA] transition-colors"
              onClick={reboot} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-interactive
            >
              REBOOT SYSTEM
            </motion.button>
          </div>
        </div>
      )}

      {/* REBOOTING PHASE */}
      {phase === 'rebooting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <div className="text-[#0099ff] text-2xl">SYSTEM REBOOTING...</div>
          <div className="w-64 h-2 bg-white/10 border border-[#0099ff]/40">
            <motion.div className="h-full bg-[#0099ff]" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-[#0099ff] text-sm opacity-60">{Math.round(progress)}%</div>
        </div>
      )}
    </div>
  );
}
