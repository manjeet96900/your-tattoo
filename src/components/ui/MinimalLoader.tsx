/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteData } from '@/src/data/siteData';

export const MinimalLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quick, restrained reveal (under 950ms total) to avoid blocking the user
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-label="Loading Your Story Tattoo"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F5F5F3]"
        >
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            {/* Fine needle ink mark icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative flex h-10 w-10 items-center justify-center border border-white/20"
            >
              <span className="font-mono text-xs tracking-widest text-[#F5F5F3]">YS</span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-[1px] -translate-x-1/2 bg-white" />
            </motion.div>

            {/* Studio Name */}
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="font-serif text-sm tracking-[0.28em] text-[#F5F5F3] uppercase"
            >
              {siteData.studio.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
              className="text-[10px] tracking-[0.2em] text-[#9E9E9C] uppercase"
            >
              {siteData.studio.tagline}
            </motion.p>

            {/* Fine progress line */}
            <div className="mt-4 h-[1px] w-24 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="h-full w-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
