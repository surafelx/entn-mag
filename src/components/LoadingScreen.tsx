'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState('LOADING');
  const [glitchActive, setGlitchActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentLogo, setCurrentLogo] = useState(0);

  const loadingPhrases = [
    'INITIALIZING',
    'LOADING VOID',
    'CORRUPTING DATA',
    'GLITCHING REALITY',
    'BREAKING FREQUENCIES',
    'DIGITAL DECAY',
    'SYSTEM BREACH',
    'ENTERING ENTN'
  ];

  const logos = [
    '/entn-logo.png',
    '/entn-logo-am.png'
  ];

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
  
  const glitchText = (text: string) => {
    return text.split('').map((char, i) => {
      if (Math.random() < 0.3) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onLoadComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 8 + 2; // Random progress increments
      });
    }, 150);

    // Change loading phrases
    const phraseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % loadingPhrases.length);
    }, 800);

    // Change logos
    const logoInterval = setInterval(() => {
      setCurrentLogo(prev => (prev + 1) % logos.length);
    }, 600); // Faster logo switching for more chaos

    // Random glitch activation
    const glitchInterval = setInterval(() => {
      setGlitchActive(Math.random() < 0.4);
    }, 100);

    // Update loading text with glitch effects
    const textInterval = setInterval(() => {
      const currentText = loadingPhrases[currentPhase];
      if (glitchActive) {
        setLoadingText(glitchText(currentText));
      } else {
        setLoadingText(currentText);
      }
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
      clearInterval(logoInterval);
      clearInterval(glitchInterval);
      clearInterval(textInterval);
    };
  }, [currentPhase, glitchActive, onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Trippy background pattern */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, Math.random() * 3 + 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="text-center z-10">
        {/* ENTN Logo */}
        <motion.div
          className="mb-8 relative"
          animate={{
            scale: glitchActive ? [1, 1.05, 0.95, 1] : 1,
            x: glitchActive ? [0, -4, 4, 0] : 0,
            y: glitchActive ? [0, -2, 2, 0] : 0,
          }}
          transition={{ duration: 0.1 }}
        >
          <motion.img
            src={logos[currentLogo]}
            alt="ENTN Logo"
            className="h-32 w-auto mx-auto"
            style={{
              filter: glitchActive
                ? `hue-rotate(${Math.random() * 360}deg) saturate(${1 + Math.random() * 2}) brightness(${0.8 + Math.random() * 0.6}) contrast(${1 + Math.random()})`
                : 'brightness(1) contrast(1) saturate(1)',
              mixBlendMode: glitchActive ? 'screen' : 'normal',
            }}
            animate={{
              opacity: glitchActive ? [1, 0.7, 1] : 1,
            }}
            transition={{ duration: 0.05 }}
          />

          {/* Glitch overlay for logo */}
          {glitchActive && (
            <motion.img
              src={logos[currentLogo]}
              alt="ENTN Logo Glitch"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 h-32 w-auto"
              style={{
                filter: `hue-rotate(${Math.random() * 360}deg) saturate(3) brightness(1.5) contrast(2)`,
                mixBlendMode: 'difference',
                opacity: 0.6,
              }}
              animate={{
                x: [0, -2, 2, 0],
                y: [0, 1, -1, 0],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 0.05 }}
            />
          )}
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="text-2xl font-mono text-white mb-8"
          style={{
            color: glitchActive ? '#ff0080' : '#ffffff',
            textShadow: glitchActive 
              ? '2px 2px 0px #00ff41, -2px -2px 0px #ffff00'
              : '1px 1px 2px rgba(0,0,0,1)',
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {loadingText}
        </motion.div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-gray-800 border border-white/30 mx-auto mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ff0080] via-[#00ff41] to-[#ffff00]"
            style={{ width: `${progress}%` }}
            animate={{
              opacity: glitchActive ? [1, 0.5, 1] : 1,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress percentage */}
        <motion.div
          className="text-lg font-mono text-gray-400"
          animate={{
            color: glitchActive ? '#ff0080' : '#9ca3af',
          }}
        >
          {Math.floor(progress)}%
        </motion.div>

        {/* Glitch lines */}
        <AnimatePresence>
          {glitchActive && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white h-0.5"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 200 + 50}px`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
