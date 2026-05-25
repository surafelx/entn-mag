'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const voidMessages = [
  'null',
  'undefined',
  '...',
  '',
  'nothing here',
  'void.wav',
  '0x00000000',
  'signal lost',
  '',
  'frequency: 0hz',
  'empty',
  '░',
];

export function StaticVoidSection() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setMessageIndex(i => (i + 1) % voidMessages.length);
        setShowMessage(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 7000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.id > Date.now() - 4000);
        if (Math.random() > 0.6) {
          return [...filtered, { x: Math.random() * 100, y: Math.random() * 100, id: Date.now() }];
        }
        return filtered;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors font-mono text-sm"
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
            color: glitch ? '#ff0080' : '#ff9900',
            textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #00ff41' : 'none',
          }}
        >
          STATIC<span className="text-white">VOID</span>
        </h1>
      </motion.div>

      {/* Drifting particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-[#ff9900]/40"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: -60 }}
          transition={{ duration: 4, ease: 'easeOut' }}
        />
      ))}

      {/* Center void message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              key={messageIndex}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="font-mono text-6xl"
                style={{ color: '#ff9900' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {voidMessages[messageIndex] || ' '}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Concentric rings */}
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: i * 120,
              height: i * 120,
              borderColor: `rgba(255,153,0,${0.15 / i})`,
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Slow horizontal scan */}
      <motion.div
        className="absolute w-full pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,153,0,0.2), transparent)' }}
        animate={{ y: ['10vh', '90vh'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[#ff9900]/40 text-xs text-center"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        NULL SPACE — EMPTY FREQUENCIES — VOID.WAV PLAYING
      </motion.div>
    </div>
  );
}
