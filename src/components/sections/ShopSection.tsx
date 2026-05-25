'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, X } from 'lucide-react';

const products = [
  { id: 1, name: 'VOID T-SHIRT', price: '€ERROR', corruptPrice: '€24', color: '#ff0080', description: 'cotton blend. washed in static. size: undefined', stock: 'UNKNOWN' },
  { id: 2, name: 'GLITCH CAP', price: '€NULL', corruptPrice: '€18', color: '#00ff41', description: 'unstructured. fits all heads. even corrupt ones.', stock: 'LOW' },
  { id: 3, name: 'BOOTLEG TAPE', price: '€NaN', corruptPrice: '€6', color: '#ffff00', description: '60min blank. pre-loaded with silence and static.', stock: '∞' },
  { id: 4, name: 'ZINE #04 — RAW', price: '€0xF', corruptPrice: '€12', color: '#9966ff', description: 'current issue. risograph. 32 pages of decay.', stock: '404' },
  { id: 5, name: 'NOISE POSTER A2', price: '€BSOD', corruptPrice: '€15', color: '#00ffff', description: 'hand-screenprinted. 3 color. may bleed.', stock: 'FEW' },
  { id: 6, name: 'ENTN PATCH', price: '€BRK', corruptPrice: '€5', color: '#ff6600', description: 'embroidered. iron-on or sew-on. glitches when hot.', stock: 'MANY' },
];

export function ShopSection() {
  const [glitch, setGlitch] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (id: number) => {
    setCart(c => [...c, id]);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black overflow-y-auto">
      <Link href="/">
        <motion.button
          className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#ff0080] transition-colors font-mono text-sm bg-black/80 px-3 py-2 border border-white/20"
          data-interactive
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} />
          BACK
        </motion.button>
      </Link>

      {/* Cart button */}
      <motion.button
        className="fixed top-6 right-6 z-50 flex items-center gap-2 font-mono text-sm border px-3 py-2 bg-black/80"
        style={{ borderColor: cart.length ? '#ff0080' : 'rgba(255,255,255,0.2)', color: cart.length ? '#ff0080' : '#ffffff' }}
        onClick={() => setShowCart(s => !s)}
        data-interactive
      >
        <ShoppingBag size={16} />
        VOID ({cart.length})
      </motion.button>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-black border-l border-[#ff0080]/50 z-[200] flex flex-col"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <span className="font-mono font-bold text-[#ff0080]">VOID BAG ({cart.length})</span>
              <button onClick={() => setShowCart(false)} data-interactive><X size={20} className="text-white" /></button>
            </div>
            <div className="flex-1 p-6 space-y-3">
              {cart.map((id, i) => {
                const p = products.find(pr => pr.id === id)!;
                return (
                  <div key={i} className="flex justify-between items-center font-mono text-sm border-b border-white/10 pb-2">
                    <span className="text-white truncate pr-2">{p.name}</span>
                    <span style={{ color: p.color }}>{p.corruptPrice}</span>
                  </div>
                );
              })}
              {!cart.length && <p className="font-mono text-white/40 text-sm">your void is empty</p>}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/20">
                <motion.button
                  className="w-full py-3 border-2 border-[#ff0080] font-mono text-[#ff0080] font-bold text-sm hover:bg-[#ff0080] hover:text-black transition-colors"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('CHECKOUT.EXE FAILED — transaction corrupted')}
                  data-interactive
                >
                  SEND TO VOID ▶
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-16 px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-5xl font-bold font-mono tracking-wider"
            style={{
              color: glitch ? '#00ff41' : '#ffffff',
              textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #00ff41' : 'none',
            }}
          >
            BOOTLEG<span className="text-[#ff0080]">SHOP</span>
          </h1>
          <p className="font-mono text-white/40 text-sm mt-2">all items may or may not exist</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="border border-white/20 bg-black relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ borderColor: product.color }}
            >
              {/* Product image placeholder */}
              <div
                className="aspect-square flex items-center justify-center text-4xl font-bold font-mono"
                style={{ backgroundColor: `${product.color}15`, color: product.color }}
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {['▓', '░', '▒', '█', '▚', '▞'][i % 6]}
                </motion.span>
              </div>

              <div className="p-3 space-y-2">
                <div className="font-mono text-sm font-bold text-white">{product.name}</div>
                <div className="font-mono text-xs text-white/50">{product.description}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs line-through" style={{ color: `${product.color}60` }}>{product.price}</span>
                    <span className="font-mono text-sm font-bold ml-2" style={{ color: product.color }}>{product.corruptPrice}</span>
                  </div>
                  <span className="font-mono text-xs text-white/30">stk:{product.stock}</span>
                </div>
                <motion.button
                  className="w-full py-2 border font-mono text-xs transition-all"
                  style={{ borderColor: product.color, color: addedId === product.id ? '#000000' : product.color, backgroundColor: addedId === product.id ? product.color : 'transparent' }}
                  onClick={() => addToCart(product.id)}
                  whileTap={{ scale: 0.95 }}
                  data-interactive
                >
                  {addedId === product.id ? 'ADDED TO VOID' : 'ADD TO VOID'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
