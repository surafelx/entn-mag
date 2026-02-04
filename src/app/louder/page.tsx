'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const tracks = [
  {
    artist: "VOID COLLECTIVE",
    track: "STATIC DREAMS",
    album: "FREQUENCY VOL. 1",
    lyrics: "In the noise / we find ourselves / broken signals / reaching out",
    duration: "4:23",
    color: '#ff0080'
  },
  {
    artist: "NEURAL DECAY",
    track: "FREQUENCY",
    album: "SYSTEM ERROR",
    lyrics: "Turn it up / until it hurts / this is how / we communicate",
    duration: "3:45",
    color: '#00ff41'
  },
  {
    artist: "CONCRETE ECHO",
    track: "BASEMENT HYMNS",
    album: "UNDERGROUND",
    lyrics: "Underground / where sound is free / where we are / who we need to be",
    duration: "5:12",
    color: '#ffff00'
  },
  {
    artist: "DIGITAL FLESH",
    track: "PULSE",
    album: "ALIVE",
    lyrics: "Feel the bass / in your chest / alive inside / this beautiful mess",
    duration: "4:01",
    color: '#9966ff'
  },
  {
    artist: "GHOST PROTOCOL",
    track: "SIGNAL LOST",
    album: "TRANSMISSION",
    lyrics: "We are the static / between stations / the space between / your expectations",
    duration: "3:58",
    color: '#00ffff'
  },
];

const playlists = [
  { name: "3AM COMMUTE", tracks: 47, mood: "melancholic drive", color: '#ff6600' },
  { name: "RAGE THERAPY", tracks: 23, mood: "break everything", color: '#ff0080' },
  { name: "SOFT DESTRUCTION", tracks: 31, mood: "gentle chaos", color: '#9966ff' },
  { name: "BASEMENT ENERGY", tracks: 56, mood: "underground vibes", color: '#00ff41' },
  { name: "STATIC COMFORT", tracks: 18, mood: "white noise lullaby", color: '#00ffff' },
];

export default function LouderPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Fake playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeTrack !== null) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack]);

  const togglePlay = (index: number) => {
    if (activeTrack === index) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(index);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = scrollLeft - (e.pageX - scrollRef.current.offsetLeft - startX) * 2;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <Layout>
      <div className="w-full min-h-screen relative overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 py-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="font-mono text-sm tracking-[0.3em] text-[#9966ff] mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            MUSIC // NOISE // CATHARSIS
          </motion.span>
          
          <motion.h1
            className={`text-7xl md:text-[12rem] font-bold font-mono leading-none ${glitchActive ? 'text-glitch' : ''}`}
            data-text="LOUDER"
            style={{
              color: glitchActive ? '#9966ff' : '#ffffff',
              textShadow: glitchActive 
                ? '4px 4px 0px #00ff41, -4px -4px 0px #ff0080' 
                : '4px 4px 0px rgba(153,102,255,0.3)',
              transform: 'rotate(2deg)',
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            LOUDER
          </motion.h1>

          <motion.p
            className="max-w-xl text-white/60 font-mono text-sm mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sound as rebellion. Volume as therapy. The frequencies that shake your chest and 
            rearrange your molecules. This is what it sounds like when we refuse to be quiet.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-xs text-white/30 tracking-widest">SCROLL TO EXPLORE</span>
          </motion.div>
        </motion.div>

        {/* Now Playing / Track List */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ff0080]">NOW PLAYING</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">ARTIST SPOTLIGHT</h2>
          </div>

          <div className="px-8 md:px-16">
            {/* Mini player if track is active */}
            <AnimatePresence>
              {activeTrack !== null && (
                <motion.div
                  className="mb-8 p-6 border-2 backdrop-blur-md"
                  style={{ 
                    borderColor: tracks[activeTrack].color,
                    backgroundColor: `${tracks[activeTrack].color}15`,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-xs" style={{ color: tracks[activeTrack].color }}>
                        {tracks[activeTrack].artist}
                      </span>
                      <h3 className="font-mono text-2xl font-bold text-white">
                        {tracks[activeTrack].track}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-white/50 hover:text-white">
                        <SkipBack size={20} />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tracks[activeTrack].color }}
                      >
                        {isPlaying ? <Pause size={20} className="text-black" /> : <Play size={20} className="text-black ml-1" />}
                      </button>
                      <button className="text-white/50 hover:text-white">
                        <SkipForward size={20} />
                      </button>
                      <Volume2 size={20} className="text-white/50 ml-4" />
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: tracks[activeTrack].color,
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Track list */}
            <div className="space-y-4">
              {tracks.map((track, index) => {
                const isActive = activeTrack === index;
                const isCurrentlyPlaying = isActive && isPlaying;

                return (
                  <motion.div
                    key={track.track}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => togglePlay(index)}
                  >
                    <div 
                      className="p-6 border transition-all"
                      style={{ 
                        borderColor: isActive ? track.color : 'rgba(255,255,255,0.1)',
                        backgroundColor: isActive ? `${track.color}10` : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-6">
                        {/* Play indicator */}
                        <motion.div
                          className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all"
                          style={{ 
                            borderColor: track.color,
                            backgroundColor: isCurrentlyPlaying ? track.color : 'transparent',
                          }}
                          animate={isCurrentlyPlaying ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5, repeat: isCurrentlyPlaying ? Infinity : 0 }}
                        >
                          {isCurrentlyPlaying ? (
                            <Pause size={16} className="text-black" />
                          ) : (
                            <Play size={16} style={{ color: track.color }} className="ml-1" />
                          )}
                        </motion.div>

                        {/* Track info */}
                        <div className="flex-1">
                          <span className="font-mono text-xs tracking-wider" style={{ color: track.color }}>
                            {track.artist}
                          </span>
                          <h3 className="font-mono text-xl font-bold text-white">{track.track}</h3>
                          <span className="font-mono text-xs text-white/40">{track.album}</span>
                        </div>

                        {/* Duration */}
                        <span className="font-mono text-sm text-white/50">{track.duration}</span>
                      </div>

                      {/* Lyrics preview on hover/active */}
                      <motion.div
                        className="mt-4 pl-18 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p 
                          className="font-mono text-lg italic leading-loose pl-18"
                          style={{ color: track.color, whiteSpace: 'pre-line' }}
                        >
                          {track.lyrics.split(' / ').join('\n')}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Playlists Horizontal Scroll */}
        <section className="py-16 border-t border-white/10">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ff41]">DRAG TO EXPLORE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mt-2">PLAYLIST DROPS</h2>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing px-8 md:px-16 pb-8 scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.name}
                className="flex-shrink-0 w-80 h-48 relative border-2 group cursor-pointer overflow-hidden"
                style={{ 
                  borderColor: playlist.color,
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                {/* Background gradient */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${playlist.color}30 0%, transparent 70%)`,
                  }}
                />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono text-2xl font-bold text-white">{playlist.name}</h3>
                    <span className="font-mono text-xs text-white/50">{playlist.tracks} TRACKS</span>
                  </div>
                  <p className="font-mono text-sm" style={{ color: playlist.color }}>
                    {playlist.mood}
                  </p>
                </div>

                {/* Play overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: playlist.color }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={24} className="text-black ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <span className="font-mono text-xs text-white/20 tracking-widest rotate-90">END</span>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-24 px-8 md:px-16 border-t border-white/10">
          <motion.blockquote
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-5xl font-mono text-white leading-tight">
              &ldquo;If it's too loud, you're too old. If it's not loud enough, you're not alive.&rdquo;
            </p>
            <footer className="mt-8">
              <span className="font-mono text-sm text-[#9966ff]">- BASEMENT MANIFESTO</span>
            </footer>
          </motion.blockquote>
        </section>

        {/* Footer hint */}
        <motion.div
          className="py-12 px-8 md:px-16 border-t border-white/10 text-center"
        >
          <span className="font-mono text-xs text-white/30 tracking-widest">
            USE ARROW KEYS TO NAVIGATE SECTIONS
          </span>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Layout>
  );
}
