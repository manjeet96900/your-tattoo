/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigation } from '@/src/context/NavigationContext';
import { Calendar, Phone } from 'lucide-react';

export const FloatingBookingButton: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, isMobileMenuOpen } = useNavigation();

  if (isBookingOpen || isMobileMenuOpen) return null;

  return (
    <>
      {/* Desktop Floating Action Bar at Right Bottom */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3">
        {/* Book Consultation Trigger */}
        <button
          onClick={() => setIsBookingOpen(true)}
          aria-label="Open studio consultation intake"
          className="group flex items-center gap-2.5 border border-amber-400/40 bg-[#0c0c0c]/95 px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5 text-amber-400 transition-colors group-hover:text-black" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white transition-colors group-hover:text-black font-medium">
            Book Consultation
          </span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Quick-Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-white/15 bg-[#070707]/98 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 border border-amber-400 bg-amber-400 text-black py-2.5 px-4 font-mono text-[11px] tracking-[0.16em] uppercase text-center font-bold active:bg-amber-300"
        >
          Book Consultation
        </button>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/20 bg-[#121212] text-white py-2.5 px-4 font-mono text-[11px] tracking-[0.16em] uppercase text-center shrink-0 active:bg-white/10 flex items-center gap-1.5"
        >
          <Phone className="h-3 w-3 text-amber-400" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
