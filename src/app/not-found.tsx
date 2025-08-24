'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const glitchVariations = ['404', '40#', '4@4', '#04', '!04', '4*4', '###'];
  const messages = [
    'PAGE NOT FOUND',
    'REALITY.EXE CRASHED',
    'LOST IN THE VOID',
    'SIGNAL CORRUPTED',
    'DATA STREAM INTERRUPTED',
    'MEMORY LEAK DETECTED',
    'UNDEFINED BEHAVIOR',
    'SEGMENTATION FAULT',
  ];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(glitchVariations[Math.floor(Math.random() * glitchVariations.length)]);
      setTimeout(() => setGlitchText('404'), 100);
    }, 2000);

    const messageInterval = setInterval(() => {
      setErrorMessages(prev => {
        const newMessage = messages[Math.floor(Math.random() * messages.length)];
        const updated = [newMessage, ...prev.slice(0, 4)];
        return updated;
      });
    }, 1500);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
      {/* Background static */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 z-10">
        {/* Glitchy 404 */}
        <motion.h1
          className="text-9xl font-bold font-mono text-white"
          style={{
            textShadow: '4px 4px 0px #ff0080, -4px -4px 0px #00ff41',
            filter: 'contrast(200%)',
          }}
          animate={{
            textShadow: [
              '4px 4px 0px #ff0080, -4px -4px 0px #00ff41',
              '6px 6px 0px #00ff41, -6px -6px 0px #ffff00',
              '2px 2px 0px #ffff00, -2px -2px 0px #ff0080',
              '4px 4px 0px #ff0080, -4px -4px 0px #00ff41',
            ],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {glitchText}
        </motion.h1>

        {/* Error messages stream */}
        <div className="h-32 overflow-hidden">
          {errorMessages.map((message, index) => (
            <motion.div
              key={`${message}-${index}`}
              className="font-mono text-lg text-gray-300 mb-2"
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ 
                opacity: 1 - (index * 0.2), 
                y: 0, 
                x: 0,
                scale: 1 - (index * 0.1),
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                color: ['#ff0080', '#00ff41', '#ffff00', '#ffffff'][index % 4],
              }}
            >
              {message}
            </motion.div>
          ))}
        </div>

        {/* Navigation back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="/">
            <motion.button
              className="px-8 py-4 border-2 border-white text-white font-mono text-lg hover:border-[#ff0080] hover:text-[#ff0080] transition-colors"
              data-interactive
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              RETURN TO REALITY
            </motion.button>
          </Link>
        </motion.div>

        {/* Glitch lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-[#ff0080]"
              style={{
                top: `${20 + i * 15}%`,
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
      </div>
    </div>
  );
}
