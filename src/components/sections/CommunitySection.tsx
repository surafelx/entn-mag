'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

const seedPosts = [
  { id: 1, handle: 'VOID_USER_404', message: 'found a bootleg cassette in the subway. no label. it changed my life.', color: '#ff0080', ts: '23:47' },
  { id: 2, handle: 'GLITCH_PROPHET', message: 'the signal is everywhere if you know how to tune', color: '#00ff41', ts: '23:31' },
  { id: 3, handle: 'STATIC_GHOST', message: 'does anyone else hear the hum at 3am or just me', color: '#ffff00', ts: '22:58' },
  { id: 4, handle: 'NUL_PTR', message: 'ENTN is the only thing keeping me sane in this city', color: '#9966ff', ts: '22:44' },
  { id: 5, handle: 'RAWFEED_BOT', message: '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░', color: '#00ffff', ts: '22:12' },
  { id: 6, handle: 'TORN_ARCHIVE', message: 'just came back from the show. ears still ringing. perfect.', color: '#ff6600', ts: '21:55' },
];

let postIdCounter = seedPosts.length + 1;

export function CommunitySection() {
  const [posts, setPosts] = useState(seedPosts);
  const [input, setInput] = useState('');
  const [handle, setHandle] = useState('');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 6000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  const colors = ['#ff0080', '#00ff41', '#ffff00', '#9966ff', '#00ffff', '#ff6600'];
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const submit = () => {
    if (!input.trim()) return;
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newPost = {
      id: postIdCounter++,
      handle: handle.trim().toUpperCase() || `ANON_${Math.floor(Math.random() * 9999)}`,
      message: input.trim(),
      color: randomColor(),
      ts,
    };
    setPosts(prev => [newPost, ...prev]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[110]">
      {/* Header */}
      <div className="flex-none border-b border-white/10 z-40">
        <div className="h-14 flex items-center px-6 gap-4">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-white hover:text-[#00ff41] transition-colors font-mono text-sm"
              data-interactive
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={16} />
              BACK
            </motion.button>
          </Link>
          <motion.h1
            className="flex-1 text-center text-2xl font-bold tracking-wider font-mono"
            style={{
              color: glitch ? '#ff0080' : '#00ff41',
              textShadow: glitch ? '3px 0 0 #ff0080, -3px 0 0 #ffff00' : 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            COMMUNITY<span className="text-white">WALL</span>
          </motion.h1>
          <span className="font-mono text-xs text-[#00ff41]/40 whitespace-nowrap">{posts.length} signals</span>
        </div>
        <div className="px-6 pb-1">
          <p className="font-mono text-white/25 text-xs">unmoderated. unfiltered. real signals only.</p>
        </div>
      </div>

      {/* Post compose */}
      <div className="px-6 py-3 border-b border-white/10 space-y-2 z-40 relative">
        <input
          className="w-full bg-transparent border border-white/20 px-3 py-2 font-mono text-xs text-white placeholder-white/20 outline-none focus:border-[#00ff41]/50"
          placeholder="HANDLE (optional)"
          value={handle}
          onChange={e => setHandle(e.target.value)}
          maxLength={20}
        />
        <div className="flex gap-2">
          <input
            className="flex-1 bg-transparent border border-white/20 px-3 py-2 font-mono text-sm text-white placeholder-white/20 outline-none focus:border-[#00ff41]/50"
            placeholder="transmit signal..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            maxLength={160}
          />
          <motion.button
            className="px-4 border border-[#00ff41] text-[#00ff41] font-mono text-sm hover:bg-[#00ff41] hover:text-black transition-colors"
            onClick={submit}
            whileTap={{ scale: 0.95 }}
            data-interactive
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="border border-white/10 p-3 bg-white/2 relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ borderLeftColor: post.color, borderLeftWidth: 2 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold" style={{ color: post.color }}>
                  {post.handle}
                </span>
                <span className="font-mono text-xs text-white/20">{post.ts}</span>
              </div>
              <p className="font-mono text-sm text-white/80">{post.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex-none h-8 border-t border-white/10 flex items-center px-6 font-mono text-xs text-white/20">
        <motion.span animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
          ● LIVE TRANSMISSION / ENTN COMMUNITY
        </motion.span>
      </div>
    </div>
  );
}
