'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useHover } from '@/contexts/HoverContext';
import { InteractiveVideoBackground } from './InteractiveVideoBackground';
import { LoadingScreen } from './LoadingScreen';
import { AnimatePresence } from 'framer-motion';




const sections = [
  {
    name: 'glitchmouth',
    altName: 'VOID_SPEAK',
    description: 'digital decay whispers',
    altDescription: 'broken frequencies echo',
    position: { x: '15%', y: '20%' },
    rotation: -15,
    color: '#ff0080'
  },
  {
    name: 'outloud',
    altName: 'SONIC_RIOT',
    description: 'underground frequencies',
    altDescription: 'bass cathedral trembles',
    position: { x: '85%', y: '25%' },
    rotation: 12,
    color: '#00ff41'
  },
  {
    name: 'blurredmap',
    altName: 'LOST_COORDS',
    description: 'forgotten territories',
    altDescription: 'reality.exe corrupted',
    position: { x: '10%', y: '60%' },
    rotation: 8,
    color: '#ffff00'
  },
  {
    name: 'looprot',
    altName: 'VINYL_DECAY',
    description: 'analog memories spin',
    altDescription: 'needle drops eternal',
    position: { x: '75%', y: '70%' },
    rotation: -8,
    color: '#ff6600'
  },
  {
    name: 'scrapfile',
    altName: 'TORN_ARCHIVE',
    description: 'collage fragments',
    altDescription: 'memory.zip corrupted',
    position: { x: '25%', y: '80%' },
    rotation: 15,
    color: '#9900ff'
  },
  {
    name: 'textwreck',
    altName: 'WORD_CRASH',
    description: 'syntax error cascade',
    altDescription: 'language.dll failed',
    position: { x: '90%', y: '50%' },
    rotation: -12,
    color: '#ff0080'
  },
  {
    name: 'rawfeed',
    altName: 'DATA_STREAM',
    description: 'unfiltered transmission',
    altDescription: 'signal interference',
    position: { x: '5%', y: '40%' },
    rotation: 20,
    color: '#00ffff'
  },
  {
    name: 'noisebox',
    altName: 'STATIC_CHAMBER',
    description: 'white noise cathedral',
    altDescription: 'frequency modulation',
    position: { x: '60%', y: '15%' },
    rotation: -5,
    color: '#ff3366'
  },
  {
    name: 'breakcore',
    altName: 'RHYTHM_SHATTER',
    description: 'beats per nightmare',
    altDescription: 'tempo.exe crashed',
    position: { x: '40%', y: '90%' },
    rotation: 10,
    color: '#66ff00'
  },
  {
    name: 'staticvoid',
    altName: 'NULL_SPACE',
    description: 'empty frequencies',
    altDescription: 'void.wav playing',
    position: { x: '80%', y: '85%' },
    rotation: -18,
    color: '#ff9900'
  },
  {
    name: 'datacrash',
    altName: 'SYSTEM_FAULT',
    description: 'memory overflow',
    altDescription: 'stack trace infinite',
    position: { x: '30%', y: '30%' },
    rotation: 7,
    color: '#0099ff'
  },
  {
    name: 'pixeldrift',
    altName: 'SCREEN_TEAR',
    description: 'visual artifacts',
    altDescription: 'render.exe halted',
    position: { x: '65%', y: '40%' },
    rotation: -10,
    color: '#ff6699'
  },
  {
    name: 'synthwave',
    altName: 'NEON_PULSE',
    description: 'retro future dreams',
    altDescription: '80s.dll loading...',
    position: { x: '45%', y: '65%' },
    rotation: 13,
    color: '#9966ff'
  },
];

export function HomePage() {
  const { hoveredSection, setHoveredSection, setBackgroundEffect } = useHover();
  const [currentTheme, setCurrentTheme] = useState('RAW');
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle loading completion
  const handleLoadComplete = () => {
    setIsLoading(false);

    // Play audio after loading is complete
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  };

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('https://res.cloudinary.com/dnr6jc1yr/video/upload/v1756161766/nerliv_gv7lec.mp3');
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Single interval for theme changes - less frequent
  useEffect(() => {
    const themes = ['RAW', 'ጥሬ', 'خام', 'BRUTE', '生' ];
    document.title = currentTheme;
    
    const interval = setInterval(() => {
      const newTheme = themes[Math.floor(Math.random() * themes.length)];
      setCurrentTheme(newTheme);
      document.title = newTheme;
    }, 5000); // Slower: every 5 seconds

    return () => clearInterval(interval);
  }, [currentTheme]);



  const getBackgroundEffect = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    switch (section.name) {
      case 'glitchmouth':
        return {
          background: 'radial-gradient(circle at 50% 50%, rgba(255,0,128,0.4) 0%, rgba(0,0,0,0.9) 70%)',
          filter: 'contrast(1.5) saturate(2)',
          animation: 'glitchPulse 0.1s infinite'
        };
      case 'outloud':
        return {
          background: 'linear-gradient(45deg, rgba(0,255,65,0.3) 0%, rgba(255,255,0,0.2) 50%, rgba(255,0,128,0.3) 100%)',
          filter: 'blur(2px) brightness(1.2)',
          animation: 'colorWave 2s ease-in-out infinite'
        };
      case 'blurredmap':
        return {
          background: 'radial-gradient(ellipse at 30% 70%, rgba(255,255,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(0,255,255,0.2) 0%, transparent 60%)',
          filter: 'blur(40px) hue-rotate(45deg)',
          animation: 'mapShift 3s ease-in-out infinite'
        };
      case 'looprot':
        return {
          background: 'conic-gradient(from 0deg, rgba(255,102,0,0.3), rgba(153,102,255,0.2), rgba(255,102,0,0.3))',
          filter: 'blur(20px) saturate(1.5)',
          animation: 'vinylSpin 4s linear infinite'
        };
      case 'textwreck':
        return {
          background: 'repeating-linear-gradient(45deg, rgba(255,0,128,0.1) 0px, transparent 10px, rgba(0,255,65,0.1) 20px, transparent 30px)',
          filter: 'contrast(2) brightness(0.8)',
          animation: 'textChaos 0.5s ease-in-out infinite'
        };
      default:
        return {
          background: `radial-gradient(circle at 50% 50%, ${section.color}40 0%, transparent 70%)`,
          filter: 'blur(60px) saturate(1.5)',
          animation: 'defaultPulse 2s ease-in-out infinite'
        };
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {/* Interactive Background Video */}
      <InteractiveVideoBackground
        videoSrc="https://res.cloudinary.com/dnr6jc1yr/video/upload/v1756161815/random_hd9zvc.mp4"
        hoveredSection={hoveredSection !== null ? sections[hoveredSection]?.name : null}
      />

      {/* Dynamic Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: hoveredSection !== null ? 1 : 0.6,
        }}
        transition={{ duration: 0.5 }}
      >
        {hoveredSection !== null ? (
          <motion.div
            className="absolute inset-0"
            style={getBackgroundEffect(hoveredSection)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <>
            {/* Default VHS Background Effects */}
            <motion.div
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,128,0.3) 0%, transparent 70%)',
                filter: 'blur(60px)',
                left: '10%',
                top: '20%',
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -20, 40, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute w-80 h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,65,0.25) 0%, transparent 70%)',
                filter: 'blur(80px)',
                right: '15%',
                top: '30%',
              }}
              animate={{
                x: [0, -40, 60, 0],
                y: [0, 30, -50, 0],
                scale: [1, 0.7, 1.3, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <motion.div
              className="absolute w-72 h-72 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,0,0.2) 0%, transparent 70%)',
                filter: 'blur(70px)',
                left: '60%',
                bottom: '20%',
              }}
              animate={{
                x: [0, 30, -40, 0],
                y: [0, -60, 20, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </>
        )}

        {/* VHS noise overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.05) 1px,
                rgba(255,255,255,0.05) 2px
              )
            `,
            opacity: hoveredSection !== null ? 0.2 : 0.1,
          }}
          animate={{
            opacity: hoveredSection !== null ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
          }}
          transition={{ duration: hoveredSection !== null ? 0.1 : 0.2, repeat: Infinity }}
        />
      </motion.div>



      {/* Central Content with fade effect */}
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center z-[9999] pointer-events-none"
        animate={{
          opacity: hoveredSection !== null ? 0.2 : 1,
          scale: hoveredSection !== null ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Small ENTN text */}
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-mono tracking-wider font-bold"
            style={{
              color: '#ffffff',
              textShadow: '3px 3px 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)',
            }}
          >
            ENTN
          </h2>
        </div>

        {/* Main RAW title */}
        <div className="text-center">
          <h1
            className="text-9xl md:text-[12rem] font-bold tracking-wider"
            data-text={currentTheme}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              color: '#ffffff',
              textShadow: '6px 6px 12px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)',
              WebkitTextStroke: '2px rgba(0,0,0,0.8)',
            }}
          >
            {currentTheme}
          </h1>
        </div>
          <motion.p
            className="text-lg mt-6 font-mono tracking-widest font-bold px-4 py-2 inline-block"
            style={{
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,1), 0 0 10px rgba(255,255,255,0.4)',
              boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            by visualspam
          </motion.p>
      </motion.div>

      {/* Scattered Navigation Links - DEBUG */}
      {sections.map((section, index) => (
        <div
          key={section.name}
          className="fixed z-[9999] pointer-events-auto transition-all duration-300"
          style={{
            left: section.position.x,
            top: section.position.y,
            transform: `rotate(${section.rotation}deg) scale(${hoveredSection === index ? 1.2 : 1})`,
            opacity: hoveredSection !== null ? (hoveredSection === index ? 1 : 0.3) : 1,
          }}
          onMouseEnter={() => {
            setHoveredSection(index);
            setBackgroundEffect(section.name);
          }}
          onMouseLeave={() => {
            setHoveredSection(null);
            setBackgroundEffect(null);
          }}
        >
          <Link href={`/${section.name}`} data-interactive>
            <div className="group cursor-pointer relative">
              <span
                className="block text-lg md:text-xl font-mono font-bold transition-colors duration-200"
                style={{
                  color: hoveredSection === index ? section.color : '#ffffff',
                  textShadow: hoveredSection === index
                    ? `3px 3px 0px #000000, 0 0 15px ${section.color}`
                    : '3px 3px 6px rgba(0,0,0,1)',
                }}
              >
                {hoveredSection === index ? section.altName : section.name}
              </span>

              <span
                className="block text-sm font-mono mt-2 font-medium transition-colors duration-200"
                style={{
                  color: hoveredSection === index ? section.color : '#999',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                }}
              >
                {hoveredSection === index ? section.altDescription : section.description}
              </span>

              {/* Pulsing dot */}
              <div
                className="absolute -left-4 top-1/2 w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: hoveredSection === index ? section.color : '#00ff41' }}
              />
            </div>
          </Link>
        </div>
      ))}


    </div>
  );
}
