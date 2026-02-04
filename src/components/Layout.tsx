'use client';

import { Header } from './Header';
import { SocialMedia } from './SocialMedia';
import { MusicPlayer } from './MusicPlayer';

interface LayoutProps {
  children: React.ReactNode;
  showHeaderFooter?: boolean;
}

export function Layout({ children, showHeaderFooter = true }: LayoutProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* Header */}
      {showHeaderFooter && (
        <div className="relative z-[100]">
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
          <div className="relative z-[100]">
            <SocialMedia />
          </div>
          <div className="relative z-[100]">
            <MusicPlayer />
          </div>
        </>
      )}
    </div>
  );
}
