'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedIssue, setSelectedIssue] = useState('current');
  const [glitchActive, setGlitchActive] = useState(false);

  const days = [
    { value: 'today', label: 'TODAY', color: '#ff0080' },
    { value: 'yesterday', label: 'YESTERDAY', color: '#00ff41' },
    { value: 'week', label: 'THIS WEEK', color: '#ffff00' },
    { value: 'month', label: 'THIS MONTH', color: '#ff6600' },
  ];

  const issues = [
    { value: 'current', label: 'RAW ISSUE #04', color: '#ff0080' },
    { value: 'chaos', label: 'DIGITAL CHAOS #03', color: '#00ff41' },
    { value: 'neon', label: 'NEON DECAY #02', color: '#ffff00' },
    { value: 'static', label: 'STATIC DREAMS #01', color: '#9966ff' },
  ];

  const handleFilterChange = (type: 'day' | 'issue', value: string) => {
    if (type === 'day') {
      setSelectedDay(value);
      window.dispatchEvent(new CustomEvent('filter-change', { detail: { type, value } }));
    } else {
      const next = selectedIssue === value ? '' : value;
      setSelectedIssue(next);
      window.dispatchEvent(new CustomEvent('filter-change', { detail: { type, value: next } }));
    }
  };

  return (
    <div className="relative z-40">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onMouseEnter={() => setGlitchActive(true)}
        onMouseLeave={() => setGlitchActive(false)}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 text-white hover:text-[#ffff00] transition-colors font-mono text-sm ${
            glitchActive ? 'text-[#ffff00]' : ''
          }`}
          data-interactive
          whileHover={{ x: 2 }}
          style={{
            textShadow: glitchActive ? '1px 1px 0px #00ff41, -1px -1px 0px #ff0080' : 'none',
          }}
        >
          <motion.span
            className="group-hover:text-glitch"
            data-text="FILTER"
            animate={{
              opacity: glitchActive ? [1, 0.7, 1] : 1,
            }}
            transition={{ duration: 0.1, repeat: glitchActive ? Infinity : 0 }}
          >
            {glitchActive ? 'SORT' : 'FILTER'}
          </motion.span>
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full right-0 mt-3 w-72 bg-black/95 border-2 border-white/30 backdrop-blur-md"
              style={{
                boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,0,128,0.1)',
              }}
            >
              {/* Day Filter */}
              <div className="p-6 border-b border-white/20">
                <motion.h3
                  className="text-[#00ff41] font-mono text-sm mb-4 tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ◄ DAY FILTER ►
                </motion.h3>
                <div className="space-y-3">
                  {days.map((day, index) => (
                    <motion.button
                      key={day.value}
                      onClick={() => handleFilterChange('day', day.value)}
                      className={`block w-full text-left px-3 py-2 text-sm font-mono transition-all duration-200 border ${
                        selectedDay === day.value
                          ? `border-[${day.color}] bg-white/10`
                          : 'border-transparent hover:border-white/30 hover:bg-white/5'
                      }`}
                      data-interactive
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        color: selectedDay === day.value ? day.color : '#ffffff',
                        textShadow: selectedDay === day.value ? `1px 1px 0px ${day.color}40` : 'none',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {day.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Issue Filter */}
              <div className="p-6">
                <motion.h3
                  className="text-[#ffff00] font-mono text-sm mb-4 tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  ◄ ISSUE SELECT ►
                </motion.h3>
                <div className="space-y-3">
                  {issues.map((issue, index) => (
                    <motion.button
                      key={issue.value}
                      onClick={() => handleFilterChange('issue', issue.value)}
                      className={`block w-full text-left px-3 py-2 text-sm font-mono transition-all duration-200 border ${
                        selectedIssue === issue.value
                          ? `border-[${issue.color}] bg-white/10`
                          : 'border-transparent hover:border-white/30 hover:bg-white/5'
                      }`}
                      data-interactive
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        color: selectedIssue === issue.value ? issue.color : '#ffffff',
                        textShadow: selectedIssue === issue.value ? `1px 1px 0px ${issue.color}40` : 'none',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {issue.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="w-full h-px bg-[#ff0080] absolute top-1/3" />
                <div className="w-full h-px bg-[#00ff41] absolute top-2/3" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
