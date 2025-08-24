'use client';

import { motion } from 'framer-motion';
import { Header } from './Header';
import { SocialMedia } from './SocialMedia';
import { MusicPlayer } from './MusicPlayer';
import { useHover } from '@/contexts/HoverContext';

interface LayoutProps {
  children: React.ReactNode;
  showHeaderFooter?: boolean;
}

export function Layout({ children, showHeaderFooter = true }: LayoutProps) {
  const { hoveredSection } = useHover();
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* VHS Background Effects - Global */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Colorful blurred shapes */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,128,0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(0,255,65,0.12) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(255,255,0,0.1) 0%, transparent 70%)',
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

        {/* VHS noise overlay */}
        <motion.div
          className="absolute inset-0 opacity-5"
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
          }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      {showHeaderFooter && (
        <motion.div
          className="relative z-[100]"
          animate={{
            opacity: hoveredSection !== null ? 0.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Header />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Footer Elements */}
      {showHeaderFooter && (
        <>
          {/* Social Media Icons */}
          <motion.div
            className="relative z-[100]"
            animate={{
              opacity: hoveredSection !== null ? 0.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <SocialMedia />
          </motion.div>

          {/* Music Player */}
          <motion.div
            className="relative z-[100]"
            animate={{
              opacity: hoveredSection !== null ? 0.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <MusicPlayer />
          </motion.div>
        </>
      )}
    </div>
  );
}
