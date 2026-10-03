/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Menu, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteData } = useSiteData();
  const {
    currentPath,
    navigate,
    setIsMobileMenuOpen,
    setIsBookingOpen,
    triggerMehendiTransition,
  } = useNavigation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past top threshold
      setIsScrolled(currentScrollY > 40);

      // Scroll direction detection (hide on scroll down past 120px, reveal on scroll up)
      if (currentScrollY > 140) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 5) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out site-navbar ${
        isScrolled ? 'scrolled' : ''
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Left: Brand Identity [LOGO] + YOUR STORY TATTOO */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-3.5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
          aria-label="Your Story Tattoo - Back to homepage"
        >
          {/* Logo mark */}
          {siteData.studio.logoUrl ? (
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden border border-white/30 bg-[#0c0c0c] transition-colors group-hover:border-white">
              <img
                src={siteData.studio.logoUrl}
                alt={`${siteData.studio.name} Logo`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="relative flex h-8 w-8 items-center justify-center border border-white/30 bg-[#0c0c0c] transition-colors group-hover:border-white">
              <span className="font-mono text-[11px] font-medium tracking-tighter text-white">YS</span>
              <span className="absolute -top-[1px] -right-[1px] h-1 w-1 bg-white" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="font-serif text-xs sm:text-sm font-medium tracking-[0.24em] text-white uppercase transition-colors group-hover:text-white">
              {siteData.studio.name}
            </span>
            <span className="nav-subtext hidden sm:inline-block text-[9px] tracking-[0.28em] text-white/70 uppercase">
              STUDIO
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Main Navigation"
        >
          {siteData.navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`relative py-1 text-xs tracking-[0.18em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'text-[#A3A3A0] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions & Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Book Appointment CTA */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 border border-white/20 hover:border-amber-400/80 bg-white/5 hover:bg-amber-400/10 px-4 py-2 text-xs tracking-[0.18em] uppercase text-[#F5F5F3] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 cursor-pointer shadow-sm"
          >
            <span>Book Consultation</span>
          </button>

          {/* Tattoo ↔ Mehendi Toggle Button */}
          <button
            onClick={triggerMehendiTransition}
            title="Explore our Mehendi & Henna Art Studio"
            aria-label="Switch between Tattoo and Mehendi experiences"
            className="group relative flex items-center gap-1.5 border border-white/20 bg-[#0c0c0c]/90 px-2.5 sm:px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase text-white/90 transition-all hover:border-amber-400/60 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
          >
            <Sparkles className="h-3 w-3 text-amber-400/90 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline text-white">Tattoo</span>
            <span className="text-white/40">⇄</span>
            <span className="text-amber-300">Mehendi</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="flex md:hidden h-9 w-9 items-center justify-center border border-white/20 bg-[#0c0c0c] text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
          >
            <Menu className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
