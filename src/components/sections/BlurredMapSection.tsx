'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';

export function BlurredMapSection() {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const locations = [
    {
      id: 1,
      name: "FORGOTTEN DISTRICT",
      x: 25,
      y: 30,
      description: "Where memories dissolve into concrete",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%23333'/%3E%3Ctext x='100' y='75' text-anchor='middle' fill='white' font-family='monospace'%3ELOST%3C/text%3E%3C/svg%3E"
    },
    {
      id: 2,
      name: "NEON GRAVEYARD",
      x: 70,
      y: 45,
      description: "Dead signs still flicker in the dark",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%23ff0080'/%3E%3Ctext x='100' y='75' text-anchor='middle' fill='black' font-family='monospace'%3ENEON%3C/text%3E%3C/svg%3E"
    },
    {
      id: 3,
      name: "STATIC ZONE",
      x: 45,
      y: 70,
      description: "Reality glitches at the edges",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%2300ff41'/%3E%3Ctext x='100' y='75' text-anchor='middle' fill='black' font-family='monospace'%3ESTATIC%3C/text%3E%3C/svg%3E"
    },
    {
      id: 4,
      name: "VOID TERMINAL",
      x: 80,
      y: 25,
      description: "The last stop before nowhere",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%23ffff00'/%3E%3Ctext x='100' y='75' text-anchor='middle' fill='black' font-family='monospace'%3EVOID%3C/text%3E%3C/svg%3E"
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
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
        <h1 className="text-4xl font-bold tracking-wider text-white font-mono">
          BLURRED<span className="text-[#00ff41]">MAP</span>
        </h1>
      </motion.div>

      {/* Interactive map */}
      <div className="absolute inset-0 pt-20">
        <motion.div
          ref={mapRef}
          className="relative w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(0, 0, 0, 0.8) 30%,
                rgba(0, 0, 0, 0.95) 60%
              ),
              linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
              linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
              linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 0, 20px 20px, 20px 20px, 20px 20px',
          }}
        >
          {/* Map locations */}
          {locations.map((location) => (
            <motion.div
              key={location.id}
              className="absolute cursor-pointer"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
              }}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              whileHover={{ scale: 1.2 }}
              data-interactive
            >
              <motion.div
                className="relative"
                animate={{
                  scale: hoveredLocation === location.id ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: hoveredLocation === location.id ? Infinity : 0 }}
              >
                <MapPin 
                  size={24} 
                  className={`${
                    hoveredLocation === location.id ? 'text-[#ff0080]' : 'text-[#00ff41]'
                  } drop-shadow-lg`}
                />
                
                {/* Pulsing circle */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-8 h-8 border border-[#00ff41] rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: location.id * 0.5,
                  }}
                />
              </motion.div>

              {/* Location popup */}
              {hoveredLocation === location.id && (
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                >
                  <div className="bg-black/90 border border-[#00ff41] p-4 backdrop-blur-sm">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-24 object-cover mb-3 opacity-80"
                      style={{
                        filter: 'blur(1px) contrast(120%) saturate(150%)',
                      }}
                    />
                    <h3 className="text-white font-mono text-sm font-bold mb-2">
                      {location.name}
                    </h3>
                    <p className="text-gray-300 font-mono text-xs">
                      {location.description}
                    </p>
                  </div>
                  
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#00ff41]" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Glitch overlay on hover */}
          {hoveredLocation && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-px bg-[#ff0080]"
                  style={{
                    top: `${Math.random() * 100}%`,
                    mixBlendMode: 'screen',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Scanning line effect */}
          <motion.div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-30"
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {/* Coordinates display */}
      <motion.div
        className="absolute bottom-6 left-6 font-mono text-[#00ff41] text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        COORDS: {Math.floor(mousePosition.x)}.{Math.floor(mousePosition.y)}
      </motion.div>
    </div>
  );
}
