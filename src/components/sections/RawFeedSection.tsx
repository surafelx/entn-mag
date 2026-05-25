'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const feedLines = [
  '> SIGNAL DETECTED FROM SECTOR 7G',
  '> TRANSMISSION ORIGIN: UNKNOWN',
  '> [RAW] underground frequency rising — 3.2khz static wall',
  '> ERROR: context.dll not found',
  '> [NOISE] bootleg tape surfaces in eastern bloc',
  '> WARNING: memory buffer overflow at 0xFF',
  '> [FEED] artist collective dismantles surveillance node',
  '> PING: 999ms — packet loss 47%',
  '> [RAW] sound system seizure — unscheduled broadcast',
  '> KERNEL PANIC: too much signal, not enough channel',
  '> [DATA] city grid powers off — people dance anyway',
  '> ALERT: digital decay spreading to sector 4',
  '> [WIRE] zine distribution network goes dark momentarily',
  '> STATUS: ALIVE / BROADCASTING / UNFILTERED',
  '> [RAW] voice memo found: "they cant stop the signal"',
  '> TRACE COMPLETE: destination = void',
  '> [FEED] collective memory corrupted — regenerating',
  '> WARNING: beautiful interference on all channels',
  '> [NOISE] frequency jam detected — source: everywhere',
  '> END OF TRANSMISSION... or is it',
];

export function RawFeedSection() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const lineIndex = useRef(0);

  useEffect(() => {
    const cursorInterval = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const addLine = setInterval(() => {
      const line = feedLines[lineIndex.current % feedLines.length];
      lineIndex.current += 1;
      setVisibleLines(prev => [...prev.slice(-30), line]);
      if (feedRef.current) {
        feedRef.current.scrollTop = feedRef.current.scrollHeight;
      }
    }, 800);
    return () => clearInterval(addLine);
  }, []);

  const getLineColor = (line: string) => {
    if (line.startsWith('> ERROR') || line.startsWith('> KERNEL') || line.startsWith('> ALERT')) return '#ff0080';
    if (line.startsWith('> WARNING')) return '#ffff00';
    if (line.startsWith('> [RAW]')) return '#00ffff';
    if (line.startsWith('> [NOISE]')) return '#ff6600';
    if (line.startsWith('> STATUS')) return '#00ff41';
    return '#cccccc';
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#00ffff] transition-colors font-mono text-sm"
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
            color: glitch ? '#ff0080' : '#00ffff',
            textShadow: glitch ? '3px 0px 0px #ff0080, -3px 0px 0px #00ff41' : 'none',
          }}
        >
          RAW<span className="text-white">FEED</span>
        </h1>
      </motion.div>

      {/* Signal strength bars */}
      <div className="absolute top-6 right-6 flex items-end gap-1 z-40">
        {[3, 6, 9, 12, 8, 4, 10, 7].map((h, i) => (
          <motion.div
            key={i}
            className="w-2 bg-[#00ffff]"
            style={{ height: h * 2 }}
            animate={{ height: [h * 2, h * 2 * (0.5 + Math.random()), h * 2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>

      {/* Terminal feed */}
      <div className="absolute inset-0 pt-20 pb-16 px-8">
        <div
          ref={feedRef}
          className="h-full overflow-hidden font-mono text-sm leading-7"
          style={{ filter: glitch ? 'blur(1px)' : 'none' }}
        >
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ color: getLineColor(line) }}
            >
              {line}
            </motion.div>
          ))}
          <span style={{ color: '#00ffff' }}>{cursor ? '█' : ' '}</span>
        </div>
      </div>

      {/* CRT scan line */}
      <motion.div
        className="absolute w-full h-px pointer-events-none"
        style={{ background: 'rgba(0,255,255,0.15)' }}
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-[#00ffff]/30 flex items-center px-8 gap-8">
        <motion.span
          className="font-mono text-xs text-[#00ff41]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ● LIVE
        </motion.span>
        <span className="font-mono text-xs text-[#00ffff]/60">UNFILTERED TRANSMISSION</span>
        <span className="font-mono text-xs text-white/30 ml-auto">LINES: {visibleLines.length}</span>
      </div>
    </div>
  );
}
