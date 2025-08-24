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
      className="z-50 p-8 mt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between relative">
        {/* Filter Button - Far Left */}
        <div className="flex-1">
          <FilterDropdown />
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

        {/* Navigation Icons - Right */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          {/* Bootleg Shop Icon */}
          <Link href="/shop">
            <motion.div
              className="text-white hover:text-[#ff0080] transition-colors cursor-pointer"
              data-interactive
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} />
            </motion.div>
          </Link>

          {/* Community Wall Icon */}
          <Link href="/community">
            <motion.div
              className="text-white hover:text-[#00ff41] transition-colors cursor-pointer"
              data-interactive
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users size={20} />
            </motion.div>
          </Link>
        </div>
      </div>


    </motion.header>
  );
}
