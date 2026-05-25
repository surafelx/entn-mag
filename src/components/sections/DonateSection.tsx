'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

const manifestoLines = [
  'we broadcast because silence is compliance_',
  'this zine runs on borrowed bandwidth and ramen_',
  'every signal costs something_',
  'underground culture is not free to produce_',
  'your support keeps the frequency alive_',
  'or don\'t. the static will continue either way_',
];

const amounts = [
  { label: '€3', desc: 'one blank tape' },
  { label: '€7', desc: 'a round of ramen' },
  { label: '€15', desc: 'one print run page' },
  { label: '∞', desc: 'you decide' },
];

export function DonateSection() {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [sent, setSent] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    const lines: string[] = [];

    const type = setInterval(() => {
      if (lineIdx >= manifestoLines.length) { clearInterval(type); return; }
      const currentLine = manifestoLines[lineIdx];
      if (charIdx <= currentLine.length) {
        lines[lineIdx] = currentLine.slice(0, charIdx);
        setTypedLines([...lines]);
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
      }
    }, 40);
    return () => clearInterval(type);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const hbInterval = setInterval(() => {
      setHeartbeat(true);
      setTimeout(() => setHeartbeat(false), 150);
    }, 1200);
    return () => clearInterval(hbInterval);
  }, []);

  const handleSend = () => {
    if (!selectedAmount && !customAmount) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black overflow-y-auto">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/20"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      <div className="min-h-full flex flex-col items-center justify-center py-24 px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: heartbeat ? 1.3 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <Heart
              size={48}
              style={{ color: '#ff0080', fill: heartbeat ? '#ff0080' : 'transparent' }}
            />
          </motion.div>
          <h1
            className="text-5xl font-bold font-mono tracking-wider"
            style={{
              color: glitch ? '#00ff41' : '#ff0080',
              textShadow: glitch ? '3px 0 0 #ffff00, -3px 0 0 #ff0080' : 'none',
            }}
          >
            SEND<span className="text-white">SIGNAL</span>
          </h1>
        </motion.div>

        {/* Manifesto */}
        <div className="max-w-xl w-full mb-10 font-mono text-sm text-white/70 space-y-2 border-l-2 border-[#ff0080]/40 pl-4">
          {typedLines.map((line, i) => (
            <div key={i}>{line}{i === typedLines.length - 1 && <span className="animate-pulse">█</span>}</div>
          ))}
        </div>

        {/* Amount selection */}
        <div className="max-w-xl w-full space-y-6">
          <div className="grid grid-cols-4 gap-3">
            {amounts.map(a => (
              <motion.button
                key={a.label}
                className="flex flex-col items-center justify-center py-4 border-2 font-mono transition-all"
                style={{
                  borderColor: selectedAmount === a.label ? '#ff0080' : 'rgba(255,255,255,0.2)',
                  color: selectedAmount === a.label ? '#ff0080' : '#ffffff',
                  backgroundColor: selectedAmount === a.label ? 'rgba(255,0,128,0.1)' : 'transparent',
                }}
                onClick={() => { setSelectedAmount(a.label); setCustomAmount(''); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive
              >
                <span className="text-xl font-bold">{a.label}</span>
                <span className="text-xs opacity-60 mt-1">{a.desc}</span>
              </motion.button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="flex items-center gap-3 border border-white/20 px-4 py-3 focus-within:border-[#ff0080]/60">
            <span className="font-mono text-white/40">€</span>
            <input
              className="flex-1 bg-transparent font-mono text-white outline-none placeholder-white/20"
              placeholder="other amount..."
              value={customAmount}
              onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
            />
          </div>

          <motion.button
            className="w-full py-4 border-2 font-mono font-bold text-lg transition-all"
            style={{
              borderColor: sent ? '#00ff41' : '#ff0080',
              color: sent ? '#00ff41' : '#ff0080',
              boxShadow: sent ? '0 0 20px rgba(0,255,65,0.3)' : '0 0 20px rgba(255,0,128,0.2)',
            }}
            onClick={handleSend}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-interactive
          >
            {sent ? '✓ SIGNAL RECEIVED' : 'SEND SIGNAL ▶'}
          </motion.button>

          <p className="font-mono text-xs text-white/20 text-center">
            all donations go directly to zine production and server costs.<br />
            no receipt. just signal.
          </p>
        </div>
      </div>
    </div>
  );
}
