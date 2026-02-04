'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const merchItems = [
  {
    id: 1,
    name: 'ISSUE #01 ZINE',
    price: '$12',
    handwrittenPrice: 'twelve bucks',
    status: 'LIMITED',
    remaining: 7,
    description: 'First print run. 48 pages of chaos.',
    rotation: -8,
    position: { x: '5%', y: '5%' },
    color: '#ff0080',
  },
  {
    id: 2,
    name: 'GLITCH POSTER',
    price: '$15',
    handwrittenPrice: '15$',
    status: 'IN STOCK',
    remaining: 23,
    description: '18x24 risograph. Neon inks.',
    rotation: 12,
    position: { x: '55%', y: '2%' },
    color: '#00ff41',
  },
  {
    id: 3,
    name: 'STICKER PACK',
    price: '$5',
    handwrittenPrice: 'five',
    status: 'IN STOCK',
    remaining: 50,
    description: '10 die-cut stickers. Waterproof.',
    rotation: -5,
    position: { x: '35%', y: '28%' },
    color: '#ffff00',
  },
  {
    id: 4,
    name: 'BLACK TEE',
    price: '$30',
    handwrittenPrice: 'thirty',
    status: 'LOW STOCK',
    remaining: 4,
    description: 'Heavyweight cotton. Screen printed.',
    rotation: 15,
    position: { x: '70%', y: '32%' },
    color: '#ff6600',
  },
  {
    id: 5,
    name: 'DIGITAL PACK',
    price: '$8',
    handwrittenPrice: '8',
    status: 'UNLIMITED',
    remaining: null,
    description: 'Wallpapers, fonts, sounds. Instant download.',
    rotation: -10,
    position: { x: '8%', y: '45%' },
    color: '#9966ff',
  },
  {
    id: 6,
    name: 'PATCH SET',
    price: '$18',
    handwrittenPrice: 'eighteen',
    status: 'IN STOCK',
    remaining: 15,
    description: '3 embroidered patches. Iron-on.',
    rotation: 8,
    position: { x: '48%', y: '55%' },
    color: '#00ffff',
  },
  {
    id: 7,
    name: 'CASSETTE TAPE',
    price: '$10',
    handwrittenPrice: 'ten',
    status: 'SOLD OUT',
    remaining: 0,
    description: 'Compilation. 60min. Hand-dubbed.',
    rotation: -12,
    position: { x: '75%', y: '60%' },
    color: '#ff3366',
  },
  {
    id: 8,
    name: 'MYSTERY BOX',
    price: '$25',
    handwrittenPrice: '???',
    status: 'LIMITED',
    remaining: 3,
    description: 'Random selection. Always worth more.',
    rotation: 6,
    position: { x: '20%', y: '72%' },
    color: '#66ff00',
  },
];

export default function MerchPage() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [draggedPositions, setDraggedPositions] = useState<Record<number, { x: number; y: number }>>({});

  return (
    <div className="w-full min-h-screen relative overflow-y-auto overflow-x-hidden bg-black pb-20">
      {/* Messy table texture background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.02) 10px,
                rgba(255,255,255,0.02) 20px
              )
            `,
          }}
        />
      </div>

      {/* Back button */}
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-[70] flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/30"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Header */}
      <motion.div 
        className="pt-24 px-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1 
          className="text-6xl md:text-[8rem] font-bold tracking-wider"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#fff',
            textShadow: '4px 4px 0px #ff0080, -2px -2px 0px #00ff41',
            transform: 'rotate(-2deg)',
          }}
        >
          MERCH TABLE
        </motion.h1>
        <motion.p 
          className="text-xl font-mono tracking-widest mt-4"
          style={{ color: '#666' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          GRAB WHAT YOU CAN / SUPPORT THE CHAOS
        </motion.p>
        
        {/* Handwritten note */}
        <motion.div
          className="mt-6 inline-block p-4 border-2 border-dashed border-white/30"
          style={{ transform: 'rotate(2deg)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-sm text-white/70 italic">
            * all prices in USD / shipping worldwide / DM for bulk orders *
          </p>
        </motion.div>
      </motion.div>

      {/* Scattered Merch Items */}
      <div className="relative min-h-[200vh] px-8">
        {merchItems.map((item, index) => {
          const isHovered = hoveredItem === index;
          const isSoldOut = item.status === 'SOLD OUT';
          const dragOffset = draggedPositions[item.id] || { x: 0, y: 0 };

          return (
            <motion.div
              key={item.id}
              className="absolute w-[80%] md:w-[280px]"
              style={{
                left: item.position.x,
                top: item.position.y,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: item.rotation * 2 }}
              animate={{ 
                opacity: isSoldOut ? 0.5 : 1, 
                scale: 1,
                rotate: item.rotation,
                x: dragOffset.x,
                y: dragOffset.y,
              }}
              transition={{ delay: index * 0.1 }}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => {
                setDraggedPositions(prev => ({
                  ...prev,
                  [item.id]: { x: info.offset.x, y: info.offset.y }
                }));
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.05, zIndex: 50 }}
            >
              <motion.div
                className="p-5 bg-black border-2 cursor-grab active:cursor-grabbing"
                style={{
                  borderColor: isHovered ? item.color : 'rgba(255,255,255,0.2)',
                  boxShadow: isHovered ? `0 0 30px ${item.color}40` : '4px 4px 0px rgba(255,255,255,0.1)',
                }}
                data-interactive
              >
                {/* Product image placeholder */}
                <motion.div 
                  className="w-full h-40 mb-4 border border-white/10 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                  }}
                >
                  <span 
                    className="font-mono text-4xl font-bold"
                    style={{ color: item.color, opacity: 0.3 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Status badge */}
                  <motion.div
                    className="absolute top-2 right-2 px-2 py-1 font-mono text-xs"
                    style={{
                      backgroundColor: isSoldOut ? '#333' : item.color,
                      color: isSoldOut ? '#666' : '#000',
                      transform: 'rotate(3deg)',
                    }}
                  >
                    {item.status}
                  </motion.div>

                  {isSoldOut && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)',
                      }}
                    >
                      <span className="font-mono text-2xl font-bold text-white/50 rotate-[-15deg]">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Product info */}
                <h3 
                  className="text-xl font-mono font-bold mb-1"
                  style={{ color: isHovered ? item.color : '#fff' }}
                >
                  {item.name}
                </h3>
                
                <p className="text-sm font-mono text-white/50 mb-3">
                  {item.description}
                </p>

                {/* Price - handwritten style */}
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-2xl font-bold"
                    style={{ 
                      fontFamily: 'Creepster, cursive',
                      color: item.color,
                      textShadow: '1px 1px 0px #000',
                    }}
                  >
                    {item.price}
                  </motion.span>
                  
                  {item.remaining !== null && item.remaining > 0 && (
                    <span className="font-mono text-xs text-white/40">
                      {item.remaining} left
                    </span>
                  )}
                </div>

                {/* Add to cart button */}
                {!isSoldOut && (
                  <motion.button
                    className="w-full mt-4 py-2 font-mono text-sm border-2 transition-colors"
                    style={{
                      borderColor: item.color,
                      color: isHovered ? '#000' : item.color,
                      backgroundColor: isHovered ? item.color : 'transparent',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-interactive
                  >
                    GRAB IT
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Scattered decorative elements */}
        <motion.div
          className="absolute font-mono text-6xl font-bold text-white/5 pointer-events-none"
          style={{ left: '30%', top: '15%', transform: 'rotate(-15deg)' }}
        >
          $$$
        </motion.div>
        <motion.div
          className="absolute font-mono text-4xl font-bold text-white/5 pointer-events-none"
          style={{ left: '60%', top: '45%', transform: 'rotate(10deg)' }}
        >
          CASH ONLY JK
        </motion.div>
        <motion.div
          className="absolute font-mono text-3xl font-bold text-white/5 pointer-events-none"
          style={{ left: '15%', top: '65%', transform: 'rotate(-5deg)' }}
        >
          NO REFUNDS
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="font-mono text-xs text-white/30 text-right">
          drag items around<br/>
          like a real merch table
        </p>
      </motion.div>
    </div>
  );
}
