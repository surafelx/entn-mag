'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const tiers = [
  {
    name: 'COFFEE MONEY',
    amount: '$5',
    description: 'Keeps us caffeinated for one late night session.',
    color: '#ffff00',
  },
  {
    name: 'YOU GET IT',
    amount: '$15',
    description: 'You understand what we are trying to do here.',
    color: '#00ff41',
  },
  {
    name: 'PATRON SAINT',
    amount: '$50',
    description: 'Your name whispered in reverence during our meetings.',
    color: '#ff0080',
  },
  {
    name: 'I BELIEVE',
    amount: '$100+',
    description: 'You are not just supporting. You are co-creating.',
    color: '#9966ff',
  },
];

export default function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <div className="w-full min-h-screen relative overflow-y-auto overflow-x-hidden bg-black">
      {/* Full-screen text-focused design */}
      <div className="min-h-screen flex flex-col justify-center px-8 py-20">
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

        {/* Main headline */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-[7rem] font-bold leading-none mb-12 font-mono"
            style={{
              color: '#fff',
              textShadow: '4px 4px 0px #ff0080',
            }}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            KEEP THIS<br/>
            <span style={{ color: '#ff0080' }}>ALIVE</span>
          </motion.h1>

          {/* Emotional copy - no cards, just raw text */}
          <motion.div 
            className="space-y-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-mono text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl">
              We do not have investors.<br/>
              We do not have sponsors.<br/>
              We do not have a business plan.
            </p>
            
            <p className="font-mono text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
              What we have is a small group of people who believe that independent culture 
              matters. That weird things deserve to exist. That not everything needs to be 
              optimized, monetized, or made palatable for the algorithm.
            </p>

            <p className="font-mono text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
              Every dollar goes directly to paying artists, printing zines, keeping the 
              server running, and occasionally buying ramen at 3AM when we are still 
              working on something we care about.
            </p>

            <motion.p 
              className="font-mono text-2xl md:text-3xl text-white leading-relaxed max-w-3xl pt-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              If this means something to you, help us keep it going.
            </motion.p>
          </motion.div>

          {/* Donation tiers - simple, text-based */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {tiers.map((tier, index) => {
                const isSelected = selectedTier === index;
                
                return (
                  <motion.button
                    key={tier.name}
                    className="text-left p-6 border-2 transition-all cursor-pointer"
                    style={{
                      borderColor: isSelected ? tier.color : 'rgba(255,255,255,0.2)',
                      backgroundColor: isSelected ? `${tier.color}15` : 'transparent',
                    }}
                    onClick={() => setSelectedTier(isSelected ? null : index)}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      x: 5,
                      borderColor: tier.color,
                    }}
                    data-interactive
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 
                        className="font-mono text-lg font-bold"
                        style={{ color: isSelected ? tier.color : '#fff' }}
                      >
                        {tier.name}
                      </h3>
                      <span 
                        className="text-2xl font-bold font-mono"
                        style={{ 
                          color: tier.color,
                        }}
                      >
                        {tier.amount}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-white/60">
                      {tier.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Custom amount option */}
            <motion.div 
              className="mt-8 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <label className="font-mono text-sm text-white/50 block mb-2">
                OR ENTER YOUR OWN AMOUNT
              </label>
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl text-white/50">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedTier(null);
                  }}
                  placeholder="Any amount"
                  className="bg-transparent border-b-2 border-white/30 focus:border-[#ff0080] outline-none font-mono text-2xl text-white px-2 py-1 w-40 transition-colors"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              className="font-mono text-xl px-12 py-4 border-4 border-[#ff0080] text-[#ff0080] hover:bg-[#ff0080] hover:text-black transition-all"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              data-interactive
            >
              {selectedTier !== null 
                ? `DONATE ${tiers[selectedTier].amount}`
                : customAmount 
                  ? `DONATE $${customAmount}`
                  : 'SELECT AN AMOUNT'
              }
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.p 
            className="font-mono text-xs text-white/30 mt-12 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Payments processed securely. We will never share your information. 
            All contributions are non-refundable because they go straight into making things.
            Thank you for believing in this.
          </motion.p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute text-[20rem] font-bold opacity-[0.02] select-none font-mono"
          style={{ 
            right: '-10%',
            top: '10%',
            transform: 'rotate(90deg)',
          }}
        >
          GIVE
        </motion.div>
        <motion.div
          className="absolute text-[15rem] font-bold opacity-[0.02] select-none font-mono"
          style={{ 
            left: '-5%',
            bottom: '5%',
            transform: 'rotate(-15deg)',
          }}
        >
          HELP
        </motion.div>
      </div>
    </div>
  );
}
