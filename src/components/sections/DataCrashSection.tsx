'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const errorLines = [
  'KERNEL PANIC — not syncing: VFS: Unable to mount root fs on unknown-block(0,0)',
  'MEMORY CORRUPTION DETECTED at 0xDEADBEEF',
  'Segmentation fault (core dumped)',
  'FATAL: Module reality.ko not found.',
  'Error: Cannot read property "existence" of undefined',
  'Stack trace: at void (universe.js:1)',
  '*** buffer overflow detected ***: terminated',
  'IRQL_NOT_LESS_OR_EQUAL — stop code: 0x0000000A',
  'BAD_POOL_HEADER — your data is corrupted',
  'System has experienced a fatal error and will now restart.',
];

export function DataCrashSection() {
  const [phase, setPhase] = useState<'crash' | 'bsod' | 'rebooting'>('crash');
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);

  useEffect(() => {
    // Show crash errors one by one
    let i = 0;
    const interval = setInterval(() => {
      if (i < errorLines.length) {
        setVisibleErrors(prev => [...prev, errorLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setScreenFlash(true);
          setTimeout(() => { setScreenFlash(false); setPhase('bsod'); }, 300);
        }, 800);
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== 'bsod') return;
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(glitchInterval);
  }, [phase]);

  const handleReboot = () => {
    setPhase('rebooting');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('crash');
            setVisibleErrors([]);
            setProgress(0);
            // Restart the whole thing
            let i = 0;
            const crashInterval = setInterval(() => {
              if (i < errorLines.length) {
                setVisibleErrors(prev => [...prev, errorLines[i]]);
                i++;
              } else {
                clearInterval(crashInterval);
                setTimeout(() => {
                  setScreenFlash(true);
                  setTimeout(() => { setScreenFlash(false); setPhase('bsod'); }, 300);
                }, 800);
              }
            }, 350);
          }, 500);
          return 100;
        }
        return p + 1.5;
      });
    }, 60);
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden font-mono"
      style={{ backgroundColor: phase === 'bsod' ? '#0000AA' : '#000000' }}
    >
      {/* Screen flash */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            className="absolute inset-0 bg-white z-[999]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
          style={{ color: phase === 'bsod' ? '#ffffff' : '#0099ff' }}
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* CRASH PHASE */}
      {phase === 'crash' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 overflow-hidden">
          <div className="text-[#0099ff] text-xs space-y-1">
            {visibleErrors.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: i === visibleErrors.length - 1 ? '#ff0000' : '#0099ff' }}
              >
                {line}
              </motion.div>
            ))}
            {visibleErrors.length < errorLines.length && (
              <motion.span
                className="text-white"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >█</motion.span>
            )}
          </div>
        </div>
      )}

      {/* BSOD PHASE */}
      {phase === 'bsod' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            className="max-w-2xl w-full space-y-8"
            style={{ filter: glitch ? 'blur(2px)' : 'none' }}
          >
            <div className="text-8xl">:(</div>
            <div className="text-2xl font-bold">Your zine ran into a problem.</div>
            <div className="text-sm opacity-80 leading-relaxed">
              We&apos;re collecting some error info, and then we&apos;ll restart for you.
              <br />
              <br />
              For more information about this issue and possible fixes, visit
              <br />
              <span className="opacity-60">https://entn.mag/crash — MEMORY_OVERFLOW</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-sm opacity-70">100% complete</span>
            </div>
            <div className="text-xs opacity-50">
              Stop code: DIGITAL_DECAY_SPREADING
            </div>

            <motion.button
              className="mt-4 px-6 py-2 border-2 border-white text-white text-sm hover:bg-white hover:text-[#0000AA] transition-colors"
              onClick={handleReboot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive
            >
              REBOOT SYSTEM
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* REBOOTING PHASE */}
      {phase === 'rebooting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <div className="text-[#0099ff] text-2xl">SYSTEM REBOOTING...</div>
          <div className="w-64 h-2 bg-white/20 border border-[#0099ff]/40">
            <motion.div className="h-full bg-[#0099ff]" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-[#0099ff] text-sm">{Math.round(progress)}%</div>
        </div>
      )}
    </div>
  );
}
