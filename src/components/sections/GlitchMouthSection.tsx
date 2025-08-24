'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

export function GlitchMouthSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Mock video data - replace with real video URLs
  const videos = [
    {
      id: 1,
      title: "DIGITAL DECAY",
      description: "Raw interaction with the machine consciousness",
      duration: "2:34",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%23ff0080'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='white' font-family='monospace' font-size='14'%3EVIDEO 01%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      tags: ["glitch", "digital", "decay"]
    },
    {
      id: 2,
      title: "STATIC WHISPERS",
      description: "Conversations lost in transmission",
      duration: "1:47",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%2300ff41'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='black' font-family='monospace' font-size='14'%3EVIDEO 02%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      tags: ["static", "voice", "transmission"]
    },
    {
      id: 3,
      title: "BROKEN FREQUENCIES",
      description: "When communication fails beautifully",
      duration: "3:12",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%23ffff00'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='black' font-family='monospace' font-size='14'%3EVIDEO 03%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      tags: ["frequency", "broken", "communication"]
    },
    {
      id: 4,
      title: "VOID SPEAK",
      description: "Echoes from the digital abyss",
      duration: "2:58",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%239966ff'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='white' font-family='monospace' font-size='14'%3EVIDEO 04%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      tags: ["void", "speak", "abyss"]
    },
    {
      id: 5,
      title: "PIXEL TEARS",
      description: "Emotional data corruption",
      duration: "1:23",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%23ff6600'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='white' font-family='monospace' font-size='14'%3EVIDEO 05%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      tags: ["pixel", "emotion", "corruption"]
    },
    {
      id: 6,
      title: "SIGNAL LOST",
      description: "The moment connection dies",
      duration: "4:01",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%2300ffff'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='black' font-family='monospace' font-size='14'%3EVIDEO 06%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      tags: ["signal", "lost", "connection"]
    },
    {
      id: 7,
      title: "NOISE PORTRAIT",
      description: "Identity through interference",
      duration: "2:15",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%23ff3366'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='white' font-family='monospace' font-size='14'%3EVIDEO 07%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      tags: ["noise", "portrait", "identity"]
    },
    {
      id: 8,
      title: "DATA GHOST",
      description: "Haunted by deleted memories",
      duration: "3:44",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%2366ff00'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='black' font-family='monospace' font-size='14'%3EVIDEO 08%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      tags: ["data", "ghost", "memory"]
    },
    {
      id: 9,
      title: "SYSTEM CRASH",
      description: "Beautiful destruction in real-time",
      duration: "1:56",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='180' height='320' fill='%23ff9900'/%3E%3Ctext x='90' y='160' text-anchor='middle' fill='black' font-family='monospace' font-size='14'%3EVIDEO 09%3C/text%3E%3C/svg%3E",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      tags: ["system", "crash", "destruction"]
    }
  ];

  useEffect(() => {
    // Activate glitch effect randomly
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const selectedVideoData = selectedVideo ? videos.find(v => v.id === selectedVideo) : null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">

      {/* Back button */}
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Section title */}
      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[60]"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: selectedVideo ? 0 : 1,
          y: selectedVideo ? -20 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className={`text-4xl font-bold font-mono tracking-wider ${
            glitchActive ? 'text-glitch' : 'text-white'
          }`}
          data-text="GLITCHMOUTH"
          style={{
            textShadow: glitchActive ? '2px 2px 0px #00ff41, -2px -2px 0px #ff0080' : 'none',
          }}
        >
          GLITCHMOUTH
        </h1>
      </motion.div>

      {/* Video Grid - Only 3 videos centered and floating */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[999]"
        animate={{
          opacity: selectedVideo ? 0 : 1,
          scale: selectedVideo ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-16">
          {videos.slice(0, 3).map((video, index) => (
            <motion.div
              key={video.id}
              className="relative cursor-pointer group"
              data-interactive
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotateY: 0,
              }}
              transition={{
                delay: index * 0.3,
                duration: 0.8,
                y: {
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 5,
                z: 50,
                boxShadow: `0 20px 40px rgba(${index === 0 ? '255,0,128' : index === 1 ? '0,255,65' : '255,255,0'}, 0.3)`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedVideo(video.id)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Video thumbnail */}
              <div className="relative aspect-[9/16] w-80 border-4 overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: index === 0 ? '#ff0080' : index === 1 ? '#00ff41' : '#ffff00',
                  borderColor: index === 0 ? '#ff0080' : index === 1 ? '#00ff41' : '#ffff00',
                  boxShadow: `0 15px 40px rgba(${index === 0 ? '255,0,128' : index === 1 ? '0,255,65' : '255,255,0'}, 0.6)`
                }}
              >
                {/* Video placeholder with title */}
                <div className="w-full h-full flex items-center justify-center bg-black/30">
                  <div className="text-center">
                    <div className="text-white font-mono text-3xl font-bold mb-4 drop-shadow-lg">
                      VIDEO {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-white font-mono text-xl drop-shadow-lg">
                      {video.duration}
                    </div>
                    <div className="text-white/90 font-mono text-lg mt-2 drop-shadow-lg">
                      {video.title}
                    </div>
                  </div>
                </div>

                {/* Glitch overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"
                  animate={{
                    opacity: glitchActive ? [0.6, 1, 0.6] : 0.6,
                  }}
                  transition={{ duration: 0.1 }}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </div>

                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-white font-mono text-sm font-bold mb-2 truncate">
                    {video.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-xs">
                      {video.duration}
                    </span>
                    <div className="flex gap-1">
                      {video.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="font-mono text-xs bg-black/60 px-2 py-1 border border-white/20"
                          style={{
                            color: index === 0 ? '#ff0080' : index === 1 ? '#00ff41' : '#ffff00'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Centered Video Player */}
      <AnimatePresence>
        {selectedVideo && selectedVideoData && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-[#ff0080] transition-colors z-[1000]"
              onClick={() => {
                setSelectedVideo(null);
                setIsPlaying(false);
              }}
              data-interactive
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <div className="flex items-center justify-center gap-12 max-w-7xl mx-auto px-8">
              {/* Video Player */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative aspect-[9/16] w-80 bg-black border-2 border-[#ff0080] overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    src={selectedVideoData.videoUrl}
                    autoPlay={isPlaying}
                    muted={isMuted}
                    loop
                    style={{
                      filter: glitchActive ? 'contrast(150%) saturate(200%) hue-rotate(90deg)' : 'contrast(110%)',
                    }}
                  />

                  {/* Video controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-[#ff0080] transition-colors"
                        data-interactive
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-[#00ff41] transition-colors"
                        data-interactive
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Glitch effect overlay */}
                  {glitchActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 0.1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-full h-px bg-[#ff0080]"
                          style={{
                            top: `${Math.random() * 100}%`,
                            mixBlendMode: 'screen',
                          }}
                          animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 0.05,
                            delay: i * 0.01,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Video Info Text */}
              <motion.div
                className="flex-1 max-w-md"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h2
                  className={`text-4xl font-bold font-mono mb-4 ${
                    glitchActive ? 'text-glitch' : 'text-white'
                  }`}
                  data-text={selectedVideoData.title}
                  style={{
                    textShadow: glitchActive ? '2px 2px 0px #00ff41, -2px -2px 0px #ff0080' : 'none',
                  }}
                >
                  {selectedVideoData.title}
                </motion.h2>

                <motion.p
                  className="text-gray-300 font-mono text-lg leading-relaxed mb-6"
                  animate={{
                    opacity: glitchActive ? [1, 0.7, 1] : 1,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  {selectedVideoData.description}
                </motion.p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#00ff41] font-mono text-sm">DURATION:</span>
                    <span className="text-white font-mono text-sm">{selectedVideoData.duration}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[#00ff41] font-mono text-sm">TAGS:</span>
                    <div className="flex gap-2">
                      {selectedVideoData.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-white font-mono text-sm bg-white/10 px-2 py-1 border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flickering cursor */}
                <motion.span
                  className="inline-block w-2 h-6 bg-[#00ff41] ml-2 mt-4"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glitch effects */}
      {glitchActive && !selectedVideo && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 bg-[#ff0080]"
              style={{
                top: `${Math.random() * 100}%`,
                mixBlendMode: 'screen',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.1,
                delay: i * 0.02,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
