'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, X } from 'lucide-react';

const products = [
  {
    id: 1, name: 'ENTN ZINE #04 — RAW', cat: 'PRINT', price: '€12', corruptPrice: '€0xC',
    color: '#ff0080', stock: 'LIMITED',
    detail: 'risograph printed / 32 pages / current issue / includes blank tape',
    art: ['▓▓▓▓▓▓', '▓░░░░▓', '▓░██░▓', '▓░░░░▓', '▓▓▓▓▓▓'],
  },
  {
    id: 2, name: 'BOOTLEG CASSETTE', cat: 'MUSIC', price: '€6', corruptPrice: '€NaN',
    color: '#00ff41', stock: '∞',
    detail: '60min blank / no label / no track listing / something is on here',
    art: ['░░░░░░', '░████░', '░█░░█░', '░████░', '░░░░░░'],
  },
  {
    id: 3, name: 'SIGNAL VOID — VINYL', cat: 'MUSIC', price: '€22', corruptPrice: '€16',
    color: '#ffff00', stock: 'FEW',
    detail: '12" / 45rpm / side A: 18min drone / side B: field recording / pressing: 200',
    art: ['░░████░░', '░██░░██░', '██░░░░██', '██░░░░██', '░██░░██░', '░░████░░'],
  },
  {
    id: 4, name: 'NOISE POSTER A2', cat: 'PRINT', price: '€15', corruptPrice: '€BSOD',
    color: '#9966ff', stock: 'FEW',
    detail: 'hand-screenprinted / 3 color / ink bleeds on purpose / A2 format',
    art: ['████░░██', '░░░░░░░░', '██░████░', '░░░░░░░░', '████░░██'],
  },
  {
    id: 5, name: 'RAW T-SHIRT', cat: 'APPAREL', price: '€24', corruptPrice: '€ERROR',
    color: '#00ffff', stock: 'UNKNOWN',
    detail: '100% cotton / washed in static / screen print front / size: undefined',
    art: ['░████░', '██████', '██████', '░████░', '░████░', '░████░'],
  },
  {
    id: 6, name: 'STATIC DREAMS #01', cat: 'PRINT', price: '€8', corruptPrice: '€0x8',
    color: '#ff6600', stock: 'ARCHIVE',
    detail: 'first issue / xerox / 28pp / out of print / archive copy / handle with care',
    art: ['▒▒▒▒▒▒', '▒░▒░▒░', '░▒░▒░▒', '▒░▒░▒░', '▒▒▒▒▒▒'],
  },
  {
    id: 7, name: 'ENTN PATCH', cat: 'APPAREL', price: '€5', corruptPrice: '€BRK',
    color: '#ff3366', stock: 'MANY',
    detail: 'embroidered / iron-on / 8cm / glitches when exposed to heat',
    art: ['░████░', '█░░░░█', '█░EN░█', '█░TN░█', '█░░░░█', '░████░'],
  },
  {
    id: 8, name: 'VOID TOTE', cat: 'APPAREL', price: '€18', corruptPrice: '€NULL',
    color: '#9900ff', stock: 'LOW',
    detail: 'heavyweight canvas / signal void print / carries everything and nothing',
    art: ['██████', '█░░░░█', '█░░░░█', '██████', '░░██░░', '░░██░░'],
  },
];

const categories = ['ALL', 'PRINT', 'MUSIC', 'APPAREL'];

export function ShopSection() {
  const [glitch, setGlitch] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [cat, setCat] = useState('ALL');

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(i);
  }, []);

  const addToCart = (id: number) => {
    setCart(c => [...c, id]);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const filtered = cat === 'ALL' ? products : products.filter(p => p.cat === cat);
  const total = cart.reduce((sum, id) => {
    const p = products.find(pr => pr.id === id);
    return sum + (p ? parseInt(p.price.replace('€', '')) : 0);
  }, 0);

  return (
    /* fixed inset-0 with overflow-y-auto lets the content scroll within the viewport */
    <div className="fixed inset-0 bg-black overflow-y-auto z-[110]">

      {/* Sticky header */}
      <div className="sticky top-0 z-[140] bg-black/95 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm"
              data-interactive whileHover={{ x: -5 }}
            >
              <ArrowLeft size={16} /> BACK
            </motion.button>
          </Link>

          <h1 className="font-mono text-2xl font-bold tracking-wider"
            style={{ color: glitch ? '#00ff41' : '#ffffff', textShadow: glitch ? '2px 0 0 #ff0080, -2px 0 0 #00ff41' : 'none' }}>
            BOOTLEG<span className="text-[#ff0080]">SHOP</span>
          </h1>

          <motion.button
            className="flex items-center gap-2 font-mono text-sm border px-3 py-1.5"
            style={{ borderColor: cart.length ? '#ff0080' : 'rgba(255,255,255,0.2)', color: cart.length ? '#ff0080' : '#ffffff' }}
            onClick={() => setShowCart(s => !s)} data-interactive
          >
            <ShoppingBag size={15} /> {cart.length}
          </motion.button>
        </div>

        {/* Category filter */}
        <div className="flex gap-0 border-t border-white/10">
          {categories.map(c => (
            <button key={c}
              className="flex-1 py-2 font-mono text-xs transition-all"
              style={{
                color: cat === c ? '#000' : 'rgba(255,255,255,0.4)',
                backgroundColor: cat === c ? '#ff0080' : 'transparent',
              }}
              onClick={() => setCat(c)} data-interactive
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 z-[190]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)} />
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-black border-l border-[#ff0080]/50 z-[200] flex flex-col"
              initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="font-mono font-bold text-[#ff0080]">VOID BAG ({cart.length})</span>
                <button onClick={() => setShowCart(false)} data-interactive><X size={18} className="text-white/60" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.map((id, i) => {
                  const p = products.find(pr => pr.id === id)!;
                  return (
                    <div key={i} className="flex justify-between items-center font-mono text-xs border-b border-white/10 pb-2">
                      <div>
                        <div className="text-white text-sm">{p.name}</div>
                        <div className="text-white/30">{p.cat}</div>
                      </div>
                      <span style={{ color: p.color }}>{p.price}</span>
                    </div>
                  );
                })}
                {!cart.length && <p className="font-mono text-white/30 text-sm">your void is empty</p>}
              </div>
              {cart.length > 0 && (
                <div className="p-5 border-t border-white/10 space-y-3">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-white/50">TOTAL</span>
                    <span className="text-[#ff0080] font-bold">€{total}</span>
                  </div>
                  <motion.button
                    className="w-full py-3 border-2 border-[#ff0080] font-mono text-[#ff0080] font-bold text-sm hover:bg-[#ff0080] hover:text-black transition-colors"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => alert('CHECKOUT.EXE FAILED — transaction corrupted\ncome find us IRL')}
                    data-interactive
                  >
                    SEND TO VOID ▶
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product grid */}
      <div className="px-6 py-6 max-w-5xl mx-auto">
        <p className="font-mono text-xs text-white/20 mb-6">
          {filtered.length} items — all physical — ships in 1-3 weeks from unknown location
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              className="border border-white/10 group flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ borderColor: p.color }}
              data-interactive
            >
              {/* Product art */}
              <div className="aspect-square flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: `${p.color}10` }}>
                <div className="font-mono text-xs leading-none space-y-0.5">
                  {p.art.map((row, ri) => (
                    <div key={ri} style={{ color: p.color, letterSpacing: '0.1em' }}>{row}</div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <div>
                  <div className="font-mono text-xs font-bold text-white leading-tight">{p.name}</div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: `${p.color}80` }}>{p.cat}</div>
                </div>

                <div className="font-mono text-xs text-white/40 leading-relaxed flex-1">{p.detail}</div>

                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="font-mono text-xs line-through text-white/20">{p.corruptPrice}</span>
                    <span className="font-mono text-sm font-bold ml-1.5" style={{ color: p.color }}>{p.price}</span>
                  </div>
                  <span className="font-mono text-xs text-white/20">{p.stock}</span>
                </div>

                <motion.button
                  className="w-full py-1.5 border font-mono text-xs transition-all mt-1"
                  style={{
                    borderColor: p.color,
                    color: addedId === p.id ? '#000' : p.color,
                    backgroundColor: addedId === p.id ? p.color : 'transparent',
                  }}
                  onClick={() => addToCart(p.id)}
                  whileTap={{ scale: 0.95 }}
                  data-interactive
                >
                  {addedId === p.id ? 'ADDED ✓' : 'ADD TO VOID'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 font-mono text-xs text-white/20 space-y-1">
          <div>ENTN BOOTLEGSHOP — UNDERGROUND DISTRIBUTION</div>
          <div>no returns / no tracking / no algorithm / all human</div>
        </div>
      </div>
    </div>
  );
}
