'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function TextWreckSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [textStreams, setTextStreams] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const chaosTexts = [
    "REALITY.EXE HAS STOPPED WORKING",
    "FRAGMENTS OF DIGITAL CONSCIOUSNESS",
    "ERROR 404: MEANING NOT FOUND",
    "BROKEN PIXELS TELL BROKEN STORIES",
    "THE MACHINE DREAMS IN BINARY",
    "STATIC WHISPERS SECRETS",
    "CORRUPTED DATA STREAMS",
    "GLITCH IN THE MATRIX DETECTED",
    "SYSTEM OVERLOAD IMMINENT",
    "DIGITAL DECAY ACCELERATING",
    "MEMORY LEAK IN PROGRESS",
    "UNDEFINED BEHAVIOR DETECTED",
    "STACK OVERFLOW OF EMOTIONS",
    "NULL POINTER TO THE SOUL",
    "INFINITE LOOP OF DESPAIR",
    "SEGMENTATION FAULT IN REALITY",
    "BUFFER OVERFLOW OF THOUGHTS",
    "RACE CONDITION IN TIME",
    "DEADLOCK IN COMMUNICATION",
    "HEAP CORRUPTION SPREADING",
  ];

  const generateTextStream = () => {
    const stream = [];
    for (let i = 0; i < 50; i++) {
      stream.push(chaosTexts[Math.floor(Math.random() * chaosTexts.length)]);
    }
    return stream;
  };

  useEffect(() => {
    // Generate multiple text streams
    const streams = [];
    for (let i = 0; i < 5; i++) {
      streams.push(...generateTextStream());
    }
    setTextStreams(streams);
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      setScrollPosition(prev => prev + e.deltaY * 0.5);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll effect
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden cursor-none z-[110]"
    >
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
        <h1 className="text-4xl font-bold tracking-wider text-white font-mono text-broken">
          TEXT<span className="text-[#ff0080]">WRECK</span>
        </h1>
      </motion.div>

      {/* Chaotic text streams */}
      <div className="absolute inset-0 pt-20">
        {/* Vertical streams */}
        {[...Array(8)].map((_, streamIndex) => (
          <motion.div
            key={`vertical-${streamIndex}`}
            className="absolute text-vertical font-mono text-xs"
            style={{
              left: `${10 + streamIndex * 12}%`,
              top: '0%',
              height: '200%',
              color: ['#ff0080', '#00ff41', '#ffff00', '#ffffff'][streamIndex % 4],
              opacity: 0.7,
            }}
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + streamIndex * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: streamIndex * 0.5,
            }}
          >
            {textStreams.slice(streamIndex * 10, (streamIndex + 1) * 10).map((text, i) => (
              <motion.div
                key={i}
                className="mb-8 hover-vibrate"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        ))}

        {/* Horizontal chaos text */}
        <div className="absolute inset-0 pointer-events-none">
          {textStreams.map((text, index) => (
            <motion.div
              key={`horizontal-${index}`}
              className="absolute font-mono text-sm whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: ['#ff0080', '#00ff41', '#ffff00', '#ffffff'][index % 4],
                opacity: 0.4,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                x: ['-100vw', '100vw'],
                opacity: [0, 0.6, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: index * 0.1,
                ease: 'linear',
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Central focus area */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${scrollPosition * 0.1}px)`,
          }}
        >
          <div className="max-w-4xl text-center space-y-8">
            <motion.h2
              className="text-6xl font-bold text-white font-mono text-glitch"
              data-text="SYSTEM FAILURE"
              animate={{
                textShadow: [
                  '2px 2px 0px #ff0080, -2px -2px 0px #00ff41',
                  '4px 4px 0px #00ff41, -4px -4px 0px #ffff00',
                  '2px 2px 0px #ff0080, -2px -2px 0px #00ff41',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              SYSTEM FAILURE
            </motion.h2>

            <motion.div
              className="space-y-4 font-mono text-lg text-gray-300"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-broken">
                Words dissolve into fragments of meaning, scattered across the digital void like broken glass reflecting distorted realities.
              </p>
              <p className="text-distorted">
                The narrative collapses under its own weight, syntax errors cascading through consciousness.
              </p>
              <p className="hover-stretch">
                In the space between characters, silence screams louder than any declaration.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Glitch overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                mixBlendMode: 'difference',
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 right-6 font-mono text-[#00ff41] text-xs"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL: {Math.floor(scrollPosition)}px
      </motion.div>
    </div>
  );
}
