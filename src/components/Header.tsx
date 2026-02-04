'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navSections = [
  { name: 'GL!TCH', subtitle: 'Digital', href: '/glitch', color: '#ff0080' },
  { name: 'SK!N', subtitle: 'Fashion', href: '/skin', color: '#00ff41' },
  { name: 'MOUTHFEEL', subtitle: 'Food', href: '/mouthfeel', color: '#ffff00' },
  { name: 'NO SIGNAL', subtitle: 'Events', href: '/no-signal', color: '#ff6600' },
  { name: 'LOUDER', subtitle: 'Music', href: '/louder', color: '#9966ff' },
  { name: 'EYES ONLY', subtitle: 'Visuals', href: '/eyes-only', color: '#00ffff' },
  { name: 'RIGHT NOW', subtitle: 'Happenings', href: '/right-now', color: '#ff3366' },
  { name: 'BRAIN DUMP', subtitle: 'Thoughts', href: '/brain-dump', color: '#66ff00' },
  { name: 'HUMANS', subtitle: 'People', href: '/humans', color: '#ff9900' },
];

const utilityLinks = [
  { name: 'MERCH TABLE', href: '/merch', color: '#ff0080' },
  { name: 'KEEP THIS ALIVE', href: '/donate', color: '#00ff41' },
];

const positions = [
  { x: '5%', y: '15%', rotate: -8 },
  { x: '55%', y: '10%', rotate: 12 },
  { x: '75%', y: '25%', rotate: -5 },
  { x: '10%', y: '35%', rotate: 15 },
  { x: '45%', y: '40%', rotate: -12 },
  { x: '80%', y: '50%', rotate: 8 },
  { x: '20%', y: '55%', rotate: -10 },
  { x: '60%', y: '65%', rotate: 5 },
  { x: '35%', y: '75%', rotate: -7 },
];

export function Header() {
  const [currentLogo, setCurrentLogo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const logos = ['/entn-logo.png', '/entn-logo-am.png'];

  useEffect(() => {
    const logoSwitchInterval = setInterval(() => {
      setCurrentLogo(prev => (prev + 1) % logos.length);
    }, 5000);
    return () => clearInterval(logoSwitchInterval);
  }, [logos.length]);

  // Close menu on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <header
        style={{ margin: "30px" }}
        className="z-[100] relative"
      >
        <div className="flex items-center justify-between relative p-8 mt-10">
          {/* Menu Toggle */}
          <div className="flex-1">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#ff0080] transition-colors cursor-pointer font-mono text-sm flex items-center gap-2"
              data-interactive
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="hidden md:inline">{menuOpen ? 'CLOSE' : 'NAVIGATE'}</span>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" data-interactive>
              <img
                src={logos[currentLogo]}
                alt="ENTN Logo"
                className="h-12 w-auto hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <Link href="/merch" className="text-white hover:text-[#ff0080] transition-colors cursor-pointer font-mono text-xs hidden md:block" data-interactive>
              MERCH
            </Link>
            <Link href="/donate" className="text-white hover:text-[#00ff41] transition-colors cursor-pointer font-mono text-xs hidden md:block" data-interactive>
              DONATE
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen Navigation Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/95 overflow-y-auto"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div className="w-full h-full relative min-h-screen p-8 pt-32">
            {navSections.map((section, index) => {
              const pos = positions[index % positions.length];
              const isHovered = hoveredItem === index;

              return (
                <div
                  key={section.name}
                  className="absolute transition-transform duration-200"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: `rotate(${pos.rotate}deg) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={section.href} onClick={() => setMenuOpen(false)} data-interactive>
                    <h2
                      className="font-mono font-bold text-2xl md:text-4xl tracking-wider transition-colors"
                      style={{
                        color: isHovered ? section.color : '#ffffff',
                        textShadow: isHovered
                          ? `3px 3px 0px #000, 0 0 20px ${section.color}`
                          : '2px 2px 4px rgba(0,0,0,0.8)',
                      }}
                    >
                      {section.name}
                    </h2>
                    <span
                      className="font-mono text-xs tracking-widest block mt-1 transition-colors"
                      style={{ color: isHovered ? section.color : '#666' }}
                    >
                      {section.subtitle}
                    </span>
                  </Link>
                </div>
              );
            })}

            {/* Utility Links */}
            <div className="absolute bottom-12 left-8 right-8 flex flex-wrap justify-between items-end gap-8">
              {utilityLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMenuOpen(false)} data-interactive>
                  <span
                    className="font-mono text-sm tracking-widest border-b-2 pb-1 hover:opacity-80 transition-opacity"
                    style={{ color: link.color, borderColor: link.color }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Keyboard hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span className="font-mono text-xs text-white/40">
                Press ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
