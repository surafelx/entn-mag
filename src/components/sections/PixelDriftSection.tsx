'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GRID_W = 40;
const GRID_H = 28;
const PALETTE = ['#ff6699', '#ff0080', '#ffff00', '#00ff41', '#9966ff', '#00ffff', '#000000', '#ffffff'];

type Pixel = { color: string; glitching: boolean };

function randomColor() { return PALETTE[Math.floor(Math.random() * PALETTE.length)]; }

function makeGrid(): Pixel[][] {
  return Array.from({ length: GRID_H }, () =>
    Array.from({ length: GRID_W }, () => ({ color: randomColor(), glitching: false }))
  );
}

export function PixelDriftSection() {
  const [grid, setGrid] = useState<Pixel[][]>(makeGrid);
  const [painting, setPainting] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ff6699');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      // Corrupt a random column
      setGrid(prev => prev.map(row => row.map((cell, ci) => {
        if (ci === Math.floor(Math.random() * GRID_W)) {
          return { ...cell, color: randomColor(), glitching: true };
        }
        return { ...cell, glitching: false };
      })));
      setTimeout(() => setGlitch(false), 200);
    }, 2500 + Math.random() * 2000);

    // Drift: random pixels slowly change color
    const driftInterval = setInterval(() => {
      setGrid(prev => {
        const next = prev.map(row => [...row.map(c => ({ ...c }))]);
        const r = Math.floor(Math.random() * GRID_H);
        const c = Math.floor(Math.random() * GRID_W);
        next[r][c].color = randomColor();
        return next;
      });
    }, 80);

    return () => { clearInterval(glitchInterval); clearInterval(driftInterval); };
  }, []);

  const paintPixel = (r: number, c: number) => {
    if (!painting) return;
    setGrid(prev => {
      const next = prev.map(row => [...row.map(p => ({ ...p }))]);
      next[r][c].color = selectedColor;
      return next;
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff6699] transition-colors font-mono text-sm"
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
            color: glitch ? '#ffff00' : '#ff6699',
            textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #00ffff' : 'none',
          }}
        >
          PIXEL<span className="text-white">DRIFT</span>
        </h1>
      </motion.div>

      {/* Pixel grid */}
      <div
        className="absolute inset-0 flex items-center justify-center pt-16 pb-16"
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseLeave={() => setPainting(false)}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
            gap: 1,
            width: 'min(80vw, 90vh * 1.4)',
            filter: glitch ? 'blur(1px) saturate(3)' : 'none',
          }}
        >
          {grid.map((row, r) =>
            row.map((pixel, c) => (
              <div
                key={`${r}-${c}`}
                style={{ backgroundColor: pixel.color, aspectRatio: '1', cursor: 'crosshair' }}
                onMouseEnter={() => paintPixel(r, c)}
                onMouseDown={() => { setPainting(true); paintPixel(r, c); }}
              />
            ))
          )}
        </div>
      </div>

      {/* Color palette */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {PALETTE.slice(0, -1).map(color => (
          <button
            key={color}
            className="w-8 h-8 border-2 transition-transform"
            style={{
              backgroundColor: color,
              borderColor: selectedColor === color ? '#ffffff' : 'transparent',
              transform: selectedColor === color ? 'scale(1.3)' : 'scale(1)',
            }}
            onClick={() => setSelectedColor(color)}
            data-interactive
          />
        ))}
        <span className="font-mono text-xs text-white/40 ml-2">PAINT</span>
      </div>

      <motion.div
        className="absolute top-6 right-6 font-mono text-[#ff6699] text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCREEN TEAR ACTIVE
      </motion.div>
    </div>
  );
}
