'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Users } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';

export function Header() {
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0); // 0 for entn-logo.png, 1 for entn-logo-am.png

  const logos = ['/entn-logo.png', '/entn-logo-am.png'];

  // Auto-switch logos with glitch effect
  useEffect(() => {
    const logoSwitchInterval = setInterval(() => {
      setLogoGlitch(true);
      setTimeout(() => {
        setCurrentLogo(prev => (prev + 1) % logos.length);
        setTimeout(() => setLogoGlitch(false), 200);
      }, 100);
    }, 3000 + Math.random() * 2000); // Switch every 3-5 seconds

    return () => clearInterval(logoSwitchInterval);
  }, [logos.length]);

  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-50 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
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

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Bootleg Shop */}
          <Link href="/shop">
            <motion.div
              className="flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm group cursor-pointer"
              data-interactive
              whileHover={{ x: 2 }}
            >
              <ShoppingBag size={16} />
              <span className="group-hover:text-glitch" data-text="BOOTLEG SHOP">
                BOOTLEG SHOP
              </span>
            </motion.div>
          </Link>

          {/* Filter Button */}
          <FilterDropdown />

          {/* Community Wall */}
          <Link href="/community">
            <motion.div
              className="flex items-center gap-2 text-white hover:text-[#00ff41] transition-colors font-mono text-sm group cursor-pointer"
              data-interactive
              whileHover={{ x: 2 }}
            >
              <Users size={16} />
              <span className="group-hover:text-glitch" data-text="COMMUNITY WALL">
                COMMUNITY WALL
              </span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Hued effects line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff0080, #00ff41, #ffff00, #ff0080, transparent)',
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.header>
  );
}
