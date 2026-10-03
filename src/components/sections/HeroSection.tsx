/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Button } from '@/src/components/ui/Button';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsBookingOpen, navigate } = useNavigation();
  const { siteData } = useSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const images = siteData.hero.images;
  const intervalMs = siteData.hero.sliderIntervalMs || 6500;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, intervalMs, nextSlide]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentImage = images[currentIndex];

  return (
    <section
      aria-label="Hero Showcase"
      className="hero-section relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Slider with Crossfade & Subtle Parallax Scale */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                objectPosition: currentImage.desktopPosition || 'center 35%',
              }}
              className="h-full w-full object-cover brightness-[0.78] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>
        {/* Measured Contrast Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/40 to-[#060606]/70 pointer-events-none" />
      </div>

      {/* Top Spacer for transparent navbar integration */}
      <div className="h-24 sm:h-32" />

      {/* Main Hero Typography & Actions */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-12 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Studio Brand Monogram Eyebrow */}
          <div className="mb-3 sm:mb-4 flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-10 bg-amber-400/80 shadow-sm" />
            <span className="hero-eyebrow font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              {siteData.studio.name} &bull; EST. 2018
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] leading-[1.12] uppercase text-white mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <span className="hero-headline-primary text-white">{siteData.hero.headlinePrimary}</span>
            <br />
            <span className="hero-headline-secondary italic font-light text-amber-100/95">
              {siteData.hero.headlineSecondary}
            </span>
          </h1>

          {/* Editorial Subheadline */}
          <p className="hero-subheadline max-w-lg text-xs sm:text-sm leading-relaxed text-white/90 mb-6 sm:mb-8 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {siteData.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="hero-btn-primary text-xs tracking-[0.24em] uppercase py-4"
            >
              {siteData.hero.ctaPrimary.label}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(siteData.hero.ctaSecondary.href)}
              className="hero-btn-outline text-xs tracking-[0.24em] uppercase py-4"
            >
              {siteData.hero.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Slider Navigation & Progress Metadata */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12">
        <div className="flex items-end justify-between border-t border-white/10 pt-4 sm:pt-6">
          {/* Slide Indicator & Caption */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest text-white">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-[2px] transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-white' : 'w-3 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs tracking-widest text-[#9E9E9C]">
              {String(images.length).padStart(2, '0')}
            </span>
          </div>

          {/* Manual Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center border border-white/20 bg-[#0c0c0c]/80 text-[#F5F5F3] transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center border border-white/20 bg-[#0c0c0c]/80 text-[#F5F5F3] transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
