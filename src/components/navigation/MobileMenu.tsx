/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { X, Sparkles, Instagram, ArrowUpRight } from 'lucide-react';

export const MobileMenu: React.FC = () => {
  const { siteData } = useSiteData();
  const {
    currentPath,
    navigate,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsBookingOpen,
    triggerMehendiTransition,
  } = useNavigation();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    // Quick fade out then navigate
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      navigate(href);
    }, 150);
  };

  const handleBookingClick = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setIsBookingOpen(true);
    }, 150);
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] p-6 sm:p-10 md:hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              {siteData.studio.logoUrl ? (
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden border border-white/30 bg-[#0c0c0c]">
                  <img
                    src={siteData.studio.logoUrl}
                    alt={`${siteData.studio.name} Logo`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center border border-white/30 bg-[#0c0c0c]">
                  <span className="font-mono text-xs text-[#F5F5F3]">YS</span>
                </div>
              )}
              <span className="font-serif text-xs tracking-[0.22em] text-[#F5F5F3] uppercase">
                {siteData.studio.name}
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center border border-white/20 bg-[#0c0c0c] text-[#F5F5F3] transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Staggered Navigation Links */}
          <nav className="my-auto flex flex-col gap-5 py-6">
            {siteData.navigation.map((item, idx) => {
              const isActive = currentPath === item.href;
              const indexFormatted = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className="group flex w-full items-baseline justify-between py-1 text-left focus-visible:outline-none"
                  >
                    <span
                      className={`font-serif text-2xl sm:text-3xl tracking-[0.1em] uppercase transition-colors ${
                        isActive
                          ? 'text-white underline decoration-white/40 underline-offset-8'
                          : 'text-[#9E9E9C] group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-[#9E9E9C]/60 group-hover:text-white/60">
                      {indexFormatted}
                    </span>
                  </button>
                </motion.div>
              );
            })}

            {/* Book Appointment Navlink (same style as all navlinks) */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * siteData.navigation.length, duration: 0.3 }}
            >
              <button
                onClick={handleBookingClick}
                className="group flex w-full items-baseline justify-between py-1 text-left focus-visible:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#9E9E9C] group-hover:text-white transition-colors">
                  Book Appointment
                </span>
                <span className="font-mono text-xs tracking-widest text-[#9E9E9C]/60 group-hover:text-white/60">
                  {String(siteData.navigation.length + 1).padStart(2, '0')}
                </span>
              </button>
            </motion.div>

            {/* Image Admin Panel */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * (siteData.navigation.length + 1), duration: 0.3 }}
            >
              <button
                onClick={() => handleLinkClick('/admin')}
                className="group flex w-full items-baseline justify-between py-1 text-left focus-visible:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.1em] uppercase text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                  Image Admin [57]
                </span>
                <span className="font-mono text-xs tracking-widest text-emerald-400/50 group-hover:text-emerald-400">
                  {String(siteData.navigation.length + 2).padStart(2, '0')}
                </span>
              </button>
            </motion.div>
          </nav>

          {/* Bottom Actions & Ethos */}
          <div className="flex flex-col gap-3.5 border-t border-white/10 pt-5">
            {/* Mehendi Switcher */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                triggerMehendiTransition();
              }}
              className="flex w-full items-center justify-between border border-white/20 bg-[#0c0c0c] px-4 py-3 text-xs tracking-[0.18em] uppercase text-[#9E9E9C] transition-colors hover:border-white/50 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400/80" />
                <span>Explore Mehendi & Henna</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mini Footer Info */}
            <div className="mt-1 flex items-center justify-between text-[10px] tracking-widest text-[#9E9E9C] uppercase">
              <span>{siteData.studio.contact.openingHours[0]?.days}</span>
              <a
                href={siteData.studio.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white"
              >
                <Instagram className="h-3 w-3" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
