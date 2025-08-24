'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks = [
    {
      title: "DIGITAL DECAY",
      artist: "VOID PROPHET",
      duration: "3:47",
      color: "#ff0080"
    },
    {
      title: "NEON PULSE",
      artist: "STATIC DREAMS",
      duration: "4:23",
      color: "#00ff41"
    },
    {
      title: "GLITCH RITUAL",
      artist: "CYBER SHAMAN",
      duration: "5:12",
      color: "#ffff00"
    },
    {
      title: "BROKEN FREQUENCIES",
      artist: "DATA CRASH",
      duration: "2:58",
      color: "#9966ff"
    }
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

  const currentTrackData = tracks[currentTrack];

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      {/* Simple track display */}
      <motion.div
        className="cursor-pointer font-mono"
        onClick={() => setIsExpanded(!isExpanded)}
        data-interactive
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-sm font-bold"
          style={{ color: currentTrackData.color }}
          animate={{
            opacity: isPlaying ? [1, 0.7, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
        >
          {currentTrackData.title}
        </motion.div>
        <div className="text-xs text-gray-400">
          by {currentTrackData.artist}
        </div>
      </motion.div>

      {/* Expanded player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-full mb-4 bg-black/95 border-2 border-white/30 backdrop-blur-md font-mono p-4 w-80"
            style={{
              boxShadow: `0 0 30px ${currentTrackData.color}40`,
            }}
          >
            {/* Track info */}
            <div className="mb-4">
              <motion.div
                className="text-lg font-bold"
                style={{ color: currentTrackData.color }}
                animate={{
                  opacity: isPlaying ? [1, 0.7, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
              >
                {currentTrackData.title}
              </motion.div>
              <div className="text-sm text-gray-400">
                {currentTrackData.artist} • {currentTrackData.duration}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.button
                onClick={prevTrack}
                className="text-white hover:text-[#ff0080] transition-colors"
                data-interactive
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={20} />
              </motion.button>

              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:border-[#ff0080] hover:text-[#ff0080] transition-colors"
                data-interactive
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  borderColor: isPlaying ? currentTrackData.color : '#ffffff',
                  boxShadow: isPlaying ? `0 0 15px ${currentTrackData.color}60` : 'none',
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              <motion.button
                onClick={nextTrack}
                className="text-white hover:text-[#ff0080] transition-colors"
                data-interactive
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={20} />
              </motion.button>

              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-[#00ff41] transition-colors"
                data-interactive
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
                <motion.div
                  className="h-full rounded"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: currentTrackData.color,
                  }}
                  animate={{
                    boxShadow: isPlaying ? `0 0 8px ${currentTrackData.color}` : 'none',
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{Math.floor(progress * 0.05)}:{Math.floor((progress * 0.05 % 1) * 60).toString().padStart(2, '0')}</span>
                <span>{currentTrackData.duration}</span>
              </div>
            </div>

            {/* Visualizer bars */}
            <div className="flex items-end justify-center gap-1 h-8">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-gray-600 to-white rounded-full"
                  animate={{
                    height: isPlaying ? `${Math.random() * 100}%` : '20%',
                    backgroundColor: isPlaying ? currentTrackData.color : '#666666',
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.03,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
