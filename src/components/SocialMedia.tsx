'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Instagram, Twitter, Youtube, Github, Twitch, MessageCircle } from 'lucide-react';

export function SocialMedia() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const socialLinks = [
    {
      icon: Instagram,
      name: 'IG',
      altName: 'VISUAL_FEED',
      url: '#',
      color: '#ff0080',
      glitchColor: '#00ff41'
    },
    {
      icon: Youtube,
      name: 'YT',
      altName: 'VIDEO_CHAOS',
      url: '#',
      color: '#ffff00',
      glitchColor: '#ff0080'
    },
  ];

  return (
    <motion.div
      className="absolute bottom-6 right-6 z-30"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <div className="flex flex-row gap-6">
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon;
          const isHovered = hoveredIcon === index;
          
          return (
            <motion.a
              key={social.name}
              href={social.url}
              className="group relative cursor-pointer"
              data-interactive
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {/* Icon */}
              <motion.div
                className="w-10 h-10 flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: isHovered ? `${social.color}20` : 'transparent',
                }}
                animate={{
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                }}
                transition={{ 
                  duration: 0.3,
                  rotate: { repeat: isHovered ? Infinity : 0, duration: 0.5 }
                }}
              >
                <IconComponent 
                  size={20} 
                  style={{
                    color: isHovered ? social.color : '#ffffff',
                    filter: isHovered ? 'drop-shadow(0 0 5px currentColor)' : 'none',
                  }}
                />

                {/* Glitch overlay */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                  >
                    <div 
                      className="w-full h-px absolute top-1/3"
                      style={{ backgroundColor: social.glitchColor }}
                    />
                    <div 
                      className="w-full h-px absolute bottom-1/3"
                      style={{ backgroundColor: social.glitchColor }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="font-mono text-sm font-bold"
                  style={{
                    color: social.color,
                    textShadow: `1px 1px 0px ${social.glitchColor}`,
                  }}
                  animate={{
                    opacity: isHovered ? [1, 0.7, 1] : 1,
                  }}
                  transition={{ duration: 0.1, repeat: isHovered ? Infinity : 0 }}
                >
                  {isHovered ? social.altName : social.name}
                </motion.span>
              </motion.div>

              {/* Hover particles */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: social.color,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 30],
                        y: [0, (Math.random() - 0.5) * 30],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.a>
          );
        })}

        {/* Horizontal line connector */}
        <motion.div
          className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
