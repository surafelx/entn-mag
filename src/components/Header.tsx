'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Users, Zap } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';

export function Header() {
  const [logoGlitch, setLogoGlitch] = useState(false);

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
            className="flex items-center gap-3 group cursor-pointer"
            data-interactive
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setLogoGlitch(true)}
            onMouseLeave={() => setLogoGlitch(false)}
          >
            <motion.div
              className="w-8 h-8 border-2 border-white flex items-center justify-center"
              animate={{
                rotate: logoGlitch ? [0, 180, 360] : 0,
                borderColor: logoGlitch ? ['#ffffff', '#ff0080', '#00ff41', '#ffffff'] : '#ffffff',
              }}
              transition={{ duration: 0.5 }}
            >
              <Zap 
                size={16} 
                className={logoGlitch ? 'text-[#ff0080]' : 'text-white'}
              />
            </motion.div>
            
            <motion.span
              className={`text-xl font-bold font-mono tracking-wider ${
                logoGlitch ? 'text-glitch' : 'text-white'
              }`}
              data-text="ENTN"
              style={{
                textShadow: logoGlitch ? '1px 1px 0px #00ff41, -1px -1px 0px #ff0080' : 'none',
              }}
            >
              ENTN
            </motion.span>
            
            <motion.span
              className="text-xs font-mono text-gray-400 ml-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              v2.1.3
            </motion.span>
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
