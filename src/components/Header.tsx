'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navSections = [
  { name: 'GL!TCH', subtitle: 'Digital', href: '/glitch', color: '#ff0080', sample: ['AI-generated club flyers', 'Internet subcultures', 'Experimental web projects'] },
  { name: 'SK!N', subtitle: 'Fashion', href: '/skin', color: '#00ff41', sample: ['Streetwear lookbook', 'Designer interview', 'Texture-focused visuals'] },
  { name: 'MOUTHFEEL', subtitle: 'Food', href: '/mouthfeel', color: '#ffff00', sample: ['Late-night food rituals', 'Food as identity', 'Messy food photography'] },
  { name: 'NO SIGNAL', subtitle: 'Events', href: '/no-signal', color: '#ff6600', sample: ['Underground party flyer', 'Gallery opening', 'Pop-up culture'] },
  { name: 'LOUDER', subtitle: 'Music', href: '/louder', color: '#9966ff', sample: ['Artist spotlight', 'Playlist drops', 'Lyrics as visual elements'] },
  { name: 'EYES ONLY', subtitle: 'Visuals', href: '/eyes-only', color: '#00ffff', sample: ['Experimental photography', 'Digital art', 'Posters'] },
  { name: 'RIGHT NOW', subtitle: 'Happenings', href: '/right-now', color: '#ff3366', sample: ['Just dropped', 'Currently unfolding', 'Time-sensitive culture'] },
  { name: 'BRAIN DUMP', subtitle: 'Thoughts', href: '/brain-dump', color: '#66ff00', sample: ['Short essays', 'Rants', 'Notes', 'Unfinished ideas'] },
  { name: 'HUMANS', subtitle: 'People', href: '/humans', color: '#ff9900', sample: ['Portrait interviews', 'Conversations', 'Community profiles'] },
];

const utilityLinks = [
  { name: 'MERCH TABLE', href: '/merch', color: '#ff0080' },
  { name: 'KEEP THIS ALIVE', href: '/donate', color: '#00ff41' },
];

export function Header() {
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const logos = ['/entn-logo.png', '/entn-logo-am.png'];

  useEffect(() => {
    const logoSwitchInterval = setInterval(() => {
      setLogoGlitch(true);
      setTimeout(() => {
        setCurrentLogo(prev => (prev + 1) % logos.length);
        setTimeout(() => setLogoGlitch(false), 200);
      }, 100);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(logoSwitchInterval);
  }, [logos.length]);

  return (
    <>
      <motion.header
        style={{ margin: "30px" }}
        className="z-[100] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between relative p-8 mt-10">
          {/* Menu Toggle - Far Left */}
          <div className="flex-1">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#ff0080] transition-colors cursor-pointer font-mono text-sm flex items-center gap-2"
              data-interactive
              whileHover={{ x: 2 }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="hidden md:inline">{menuOpen ? 'CLOSE' : 'NAVIGATE'}</span>
            </motion.button>
          </div>

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <motion.div
                className="group cursor-pointer"
                data-interactive
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setLogoGlitch(true)}
                onMouseLeave={() => setLogoGlitch(false)}
              >
                <motion.img
                  src={logos[currentLogo]}
                  alt="ENTN Logo"
                  className="h-12 w-auto"
                  animate={{
                    filter: logoGlitch
                      ? [
                          'contrast(100%) saturate(100%) hue-rotate(0deg)',
                          'contrast(200%) saturate(300%) hue-rotate(90deg)',
                          'contrast(150%) saturate(200%) hue-rotate(180deg)',
                          'contrast(100%) saturate(100%) hue-rotate(0deg)'
                        ]
                      : 'contrast(100%) saturate(100%) hue-rotate(0deg)',
                    scale: logoGlitch ? [1, 1.02, 0.98, 1] : 1,
                  }}
                  transition={{
                    duration: logoGlitch ? 0.2 : 0.5,
                    ease: logoGlitch ? "easeInOut" : "easeOut"
                  }}
                  style={{
                    imageRendering: 'pixelated',
                    filter: logoGlitch
                      ? 'contrast(150%) saturate(200%) drop-shadow(2px 2px 0px #ff0080) drop-shadow(-2px -2px 0px #00ff41)'
                      : 'contrast(110%) saturate(120%)',
                  }}
                />
              </motion.div>
            </Link>
          </div>

          {/* Quick Links - Right */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <Link href="/merch">
              <motion.span
                className="text-white hover:text-[#ff0080] transition-colors cursor-pointer font-mono text-xs hidden md:block"
                data-interactive
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                MERCH
              </motion.span>
            </Link>
            <Link href="/donate">
              <motion.span
                className="text-white hover:text-[#00ff41] transition-colors cursor-pointer font-mono text-xs hidden md:block"
                data-interactive
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                DONATE
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Scattered Navigation Links */}
            <div className="w-full h-full relative min-h-screen p-8 pt-32">
              {navSections.map((section, index) => {
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
                const pos = positions[index % positions.length];
                const isHovered = hoveredItem === index;

                return (
                  <motion.div
                    key={section.name}
                    className="absolute"
                    style={{
                      left: pos.x,
                      top: pos.y,
                    }}
                    initial={{ opacity: 0, scale: 0.5, rotate: pos.rotate * 2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: pos.rotate,
                      y: [0, -5, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                      y: {
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={section.href} onClick={() => setMenuOpen(false)}>
                      <motion.div
                        className="cursor-pointer group"
                        data-interactive
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.h2
                          className="font-mono font-bold text-2xl md:text-4xl tracking-wider"
                          style={{
                            color: isHovered ? section.color : '#ffffff',
                            textShadow: isHovered
                              ? `3px 3px 0px #000, -1px -1px 0px #000, 0 0 20px ${section.color}`
                              : '2px 2px 4px rgba(0,0,0,0.8)',
                          }}
                          animate={{
                            x: isHovered ? [0, 2, -2, 0] : 0,
                          }}
                          transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0 }}
                        >
                          {section.name}
                        </motion.h2>
                        <motion.span
                          className="font-mono text-xs tracking-widest block mt-1"
                          style={{
                            color: isHovered ? section.color : '#666',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          }}
                          animate={{
                            opacity: isHovered ? [0.7, 1, 0.7] : 0.5,
                          }}
                          transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
                        >
                          {section.subtitle}
                        </motion.span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Utility Links at Bottom */}
              <motion.div
                className="absolute bottom-12 left-8 right-8 flex flex-wrap justify-between items-end gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                {utilityLinks.map((link, index) => (
                  <Link key={link.name} href={link.href} onClick={() => setMenuOpen(false)}>
                    <motion.div
                      className="cursor-pointer"
                      data-interactive
                      whileHover={{ scale: 1.1, x: index === 0 ? 5 : -5 }}
                    >
                      <span
                        className="font-mono text-sm tracking-widest border-b-2 pb-1"
                        style={{
                          color: link.color,
                          borderColor: link.color,
                        }}
                      >
                        {link.name}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>

              {/* Keyboard hint */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
              >
                <span className="font-mono text-xs text-white/50">
                  Press ESC to close / Arrow keys to navigate
                </span>
              </motion.div>

              {/* Decorative glitch lines */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-px"
                    style={{
                      top: `${20 + i * 15}%`,
                      background: `linear-gradient(90deg, transparent 0%, ${
                        ['#ff0080', '#00ff41', '#ffff00', '#9966ff', '#00ffff'][i]
                      }40 50%, transparent 100%)`,
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
