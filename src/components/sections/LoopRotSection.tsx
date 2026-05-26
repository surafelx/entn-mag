'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export function LoopRotSection() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const tracks = [
    {
      title: "BROKEN FREQUENCIES",
      artist: "STATIC PROPHET",
      album: "DIGITAL DECAY",
      duration: "4:23",
      color: "#ff0080",
      waveform: Array.from({ length: 64 }, () => Math.random() * 100),
    },
    {
      title: "NEON PULSE",
      artist: "VOID DANCER",
      album: "ELECTRIC DREAMS",
      duration: "3:47",
      color: "#00ff41",
      waveform: Array.from({ length: 64 }, () => Math.random() * 100),
    },
    {
      title: "GLITCH RITUAL",
      artist: "CYBER SHAMAN",
      album: "MACHINE SPIRITS",
      duration: "5:12",
      color: "#ffff00",
      waveform: Array.from({ length: 64 }, () => Math.random() * 100),
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentTrack((track) => (track + 1) % tracks.length);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, tracks.length]);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[110]">
      {/* Back button */}
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[150] flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/20"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Section title */}
      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-wider text-white font-mono">
          LOOP<span className="text-[#ff0080]">ROT</span>
        </h1>
      </motion.div>

      <div className="absolute inset-0 pt-20 flex items-center justify-center">
        <div className="flex items-center gap-16">
          {/* Vinyl Record */}
          <motion.div
            className="relative w-80 h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Record */}
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black border-4 border-gray-700 relative"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ 
                duration: 3, 
                repeat: isPlaying ? Infinity : 0, 
                ease: "linear" 
              }}
              style={{
                background: `conic-gradient(from 0deg, ${tracks[currentTrack].color}20, black, ${tracks[currentTrack].color}20)`,
              }}
            >
              {/* Grooves */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-gray-600/30"
                  style={{
                    width: `${90 - i * 10}%`,
                    height: `${90 - i * 10}%`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-black font-mono text-xs font-bold text-center"
                  style={{ backgroundColor: tracks[currentTrack].color }}
                >
                  <div>
                    <div>ENTN</div>
                    <div>REC</div>
                  </div>
                </div>
              </div>
              
              {/* Needle */}
              <motion.div
                className="absolute w-1 h-32 bg-gray-400 origin-bottom"
                style={{
                  top: '10%',
                  right: '20%',
                  transformOrigin: 'bottom center',
                  transform: 'rotate(-25deg)',
                }}
                animate={{
                  rotate: isPlaying ? [-25, -23, -25] : -25,
                }}
                transition={{
                  duration: 2,
                  repeat: isPlaying ? Infinity : 0,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Track Info & Controls */}
          <motion.div
            className="w-96 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Current track info */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white font-mono">
                {tracks[currentTrack].title}
              </h2>
              <p className="text-xl text-gray-300 font-mono">
                {tracks[currentTrack].artist}
              </p>
              <p className="text-lg text-gray-500 font-mono">
                {tracks[currentTrack].album}
              </p>
            </div>

            {/* Waveform visualization */}
            <div className="h-24 flex items-end justify-center gap-1 bg-black/40 p-4 border border-white/20">
              {tracks[currentTrack].waveform.map((height, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-gray-600 to-white"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: i < (progress / 100) * 64 ? tracks[currentTrack].color : '#666',
                  }}
                  animate={{
                    height: isPlaying ? [`${height}%`, `${height * 1.2}%`, `${height}%`] : `${height}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.02,
                    repeat: isPlaying ? Infinity : 0,
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="w-full h-1 bg-gray-700 rounded">
                <motion.div
                  className="h-full rounded"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: tracks[currentTrack].color,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm font-mono text-gray-400">
                <span>{Math.floor(progress * 0.05)}:{Math.floor((progress * 0.05 % 1) * 60).toString().padStart(2, '0')}</span>
                <span>{tracks[currentTrack].duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevTrack}
                className="text-white hover:text-[#ff0080] transition-colors"
                data-interactive
              >
                <SkipBack size={24} />
              </button>
              
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:border-[#ff0080] hover:text-[#ff0080] transition-colors"
                data-interactive
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
              
              <button
                onClick={nextTrack}
                className="text-white hover:text-[#ff0080] transition-colors"
                data-interactive
              >
                <SkipForward size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background waveform */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="flex items-center justify-center h-full">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 mx-1 bg-white"
              animate={{
                height: isPlaying ? `${Math.random() * 100}%` : '10%',
              }}
              transition={{
                duration: 0.1,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.01,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
