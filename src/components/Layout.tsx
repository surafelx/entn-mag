'use client';

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
      {/* VHS Background Effects - Static for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Colorful blurred shapes - CSS animations instead of JS */}
        <div
          className="absolute w-96 h-96 rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,128,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            left: '10%',
            top: '20%',
            willChange: 'transform',
          }}
        />
        
        <div
          className="absolute w-80 h-80 rounded-full animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
            right: '15%',
            top: '30%',
            willChange: 'transform',
          }}
        />

        <div
          className="absolute w-72 h-72 rounded-full animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,0,0.08) 0%, transparent 70%)',
            filter: 'blur(70px)',
            left: '60%',
            bottom: '20%',
            willChange: 'transform',
          }}
        />

        {/* VHS noise overlay - static */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
        />
      </div>

      {/* Header */}
      {showHeaderFooter && (
        <div 
          className="relative z-[100] transition-opacity duration-300"
          style={{ opacity: hoveredSection !== null ? 0.3 : 1 }}
        >
          <Header />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Footer Elements */}
      {showHeaderFooter && (
        <>
          {/* Social Media Icons */}
          <div 
            className="relative z-[100] transition-opacity duration-300"
            style={{ opacity: hoveredSection !== null ? 0.2 : 1 }}
          >
            <SocialMedia />
          </div>

          {/* Music Player */}
          <div 
            className="relative z-[100] transition-opacity duration-300"
            style={{ opacity: hoveredSection !== null ? 0.2 : 1 }}
          >
            <MusicPlayer />
          </div>
        </>
      )}
    </div>
  );
}
