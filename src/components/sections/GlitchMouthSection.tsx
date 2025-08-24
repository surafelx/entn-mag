'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function GlitchMouthSection() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Activate glitch effect randomly
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    // Request webcam access for the authentic glitchmouth experience
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 320, height: 240 } 
        });
        setWebcamStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log('Webcam access denied - using placeholder');
      }
    };

    initWebcam();

    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const articles = [
    {
      title: "DIGITAL DECAY IN THE AGE OF SURVEILLANCE",
      content: "The pixels bleed through our screens, each frame a confession to the machine...",
      timestamp: "23:47:12",
    },
    {
      title: "GLITCH AS RESISTANCE",
      content: "When the system breaks, we find truth in the fragments...",
      timestamp: "02:15:33",
    },
    {
      title: "MOUTH FULL OF STATIC",
      content: "Words dissolve into noise, meaning scattered across the void...",
      timestamp: "18:22:01",
    },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Back button */}
      <Link href="/">
        <motion.button
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm"
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

      {/* Webcam overlay */}
      <motion.div
        className="absolute top-20 right-6 w-48 h-36 border border-[#00ff41] overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          className={`w-full h-full object-cover ${
            glitchActive ? 'hue-rotate-180 saturate-200' : ''
          }`}
          style={{
            filter: glitchActive ? 'contrast(200%) brightness(150%)' : 'contrast(120%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <div className="absolute bottom-2 left-2 text-[#00ff41] font-mono text-xs">
          LIVE_FEED_001
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="absolute inset-0 pt-32 pb-20 px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              <motion.div
                className="h-full p-6 border border-white/20 bg-black/40 backdrop-blur-sm"
                whileHover={{ 
                  borderColor: '#ff0080',
                  backgroundColor: 'rgba(255, 0, 128, 0.05)',
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 
                    className={`text-xl font-bold font-mono ${
                      glitchActive && index === 0 ? 'text-glitch' : 'text-white'
                    }`}
                    data-text={article.title}
                  >
                    {article.title}
                  </h2>
                  <span className="text-[#00ff41] font-mono text-xs">
                    {article.timestamp}
                  </span>
                </div>
                
                <motion.p
                  className="text-gray-300 leading-relaxed font-mono text-sm"
                  animate={{
                    opacity: glitchActive && index === 0 ? [1, 0.3, 1] : 1,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  {article.content}
                </motion.p>

                {/* Flickering cursor */}
                <motion.span
                  className="inline-block w-2 h-4 bg-[#00ff41] ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Glitch overlay effects */}
      {glitchActive && (
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
