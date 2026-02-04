'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';

const tracks = [
  {
    artist: "VOID COLLECTIVE",
    track: "STATIC DREAMS",
    lyrics: "In the noise / we find ourselves / broken signals / reaching out",
    color: '#ff0080'
  },
  {
    artist: "NEURAL DECAY",
    track: "FREQUENCY",
    lyrics: "Turn it up / until it hurts / this is how / we communicate",
    color: '#00ff41'
  },
  {
    artist: "CONCRETE ECHO",
    track: "BASEMENT HYMNS",
    lyrics: "Underground / where sound is free / where we are / who we need to be",
    color: '#ffff00'
  },
  {
    artist: "DIGITAL FLESH",
    track: "PULSE",
    lyrics: "Feel the bass / in your chest / alive inside / this beautiful mess",
    color: '#9966ff'
  },
];

const playlists = [
  { name: "3AM COMMUTE", tracks: 47, color: '#ff6600' },
  { name: "RAGE THERAPY", tracks: 23, color: '#00ffff' },
  { name: "SOFT DESTRUCTION", tracks: 31, color: '#ff3366' },
];

export default function LouderPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#9966ff] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Title */}
      <motion.div
        className="pt-24 pb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          className={`text-6xl md:text-8xl font-bold font-mono ${glitchActive ? 'text-glitch' : ''}`}
          data-text="LOUDER"
          style={{
            color: glitchActive ? '#9966ff' : '#ffffff',
            textShadow: glitchActive ? '4px 4px 0px #00ff41, -4px -4px 0px #ff0080' : '3px 3px 0px rgba(0,0,0,0.8)',
            transform: 'rotate(2deg)',
          }}
        >
          LOUDER
        </motion.h1>
        <motion.p className="text-white/50 font-mono text-sm mt-4 tracking-widest">
          MUSIC // NOISE // CATHARSIS
        </motion.p>
      </motion.div>

      {/* Featured Tracks with Lyrics */}
      <div className="px-8 pb-12">
        <motion.h2
          className="font-mono text-sm text-white/50 mb-8 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          // ARTIST SPOTLIGHT
        </motion.h2>

        {tracks.map((track, index) => {
          const isHovered = hoveredTrack === index;
          const isActive = activeTrack === index;
          const offsets = ['0%', '20%', '5%', '30%'];

          return (
            <motion.div
              key={track.track}
              className="mb-12 cursor-pointer"
              style={{ marginLeft: offsets[index] }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              onMouseEnter={() => setHoveredTrack(index)}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => setActiveTrack(isActive ? null : index)}
            >
              <motion.div
                className="max-w-2xl relative"
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isActive ? track.color : 'transparent',
                      border: `2px solid ${track.color}`,
                    }}
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                  >
                    <Play size={16} style={{ color: isActive ? '#000' : track.color }} />
                  </motion.div>
                  
                  <div>
                    <span className="font-mono text-xs tracking-widest" style={{ color: track.color }}>
                      {track.artist}
                    </span>
                    <h3
                      className="font-mono text-2xl md:text-3xl font-bold"
                      style={{
                        color: isHovered ? track.color : '#ffffff',
                        textShadow: isHovered ? `2px 2px 0px #000, 0 0 15px ${track.color}` : 'none',
                      }}
                    >
                      {track.track}
                    </h3>
                  </div>
                </div>

                {/* Lyrics as visual element */}
                <motion.div
                  className="mt-4 pl-14"
                  animate={{
                    opacity: isHovered || isActive ? 1 : 0.3,
                    x: isHovered ? 10 : 0,
                  }}
                >
                  <p
                    className="font-mono text-lg italic leading-loose"
                    style={{
                      color: isHovered ? track.color : '#666',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {track.lyrics.split(' / ').join('\n')}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Playlists */}
      <div className="px-8 pb-24">
        <motion.h2
          className="font-mono text-sm text-white/50 mb-8 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          // PLAYLIST DROPS
        </motion.h2>

        <div className="flex flex-wrap gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.name}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 3 : -3 }}
            >
              <div
                className="px-6 py-4 border-2 font-mono"
                style={{ borderColor: playlist.color }}
              >
                <span className="text-lg font-bold" style={{ color: playlist.color }}>
                  {playlist.name}
                </span>
                <span className="text-xs text-white/50 block mt-1">
                  {playlist.tracks} TRACKS
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
