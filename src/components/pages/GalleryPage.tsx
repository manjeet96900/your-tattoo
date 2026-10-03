/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { GalleryItem } from '@/src/types';
import { X, ChevronLeft, ChevronRight, Sparkles, Eye, ArrowUpRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { siteData } = useSiteData();
  const { gallery } = siteData;
  const { setIsBookingOpen } = useNavigation();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Extract all categories dynamically
  const categories = ['All', 'Fine Line', 'Black & Grey', 'Geometric', 'Minimal', 'Cover-Up', 'Custom'];

  const filteredItems =
    activeCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const nextLightboxItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  }, [selectedItemIndex, filteredItems.length]);

  const prevLightboxItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      (prev ?? 0) - 1 < 0 ? filteredItems.length - 1 : (prev ?? 0) - 1
    );
  }, [selectedItemIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxItem();
      if (e.key === 'ArrowLeft') prevLightboxItem();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, nextLightboxItem, prevLightboxItem]);

  const activeItem: GalleryItem | null =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#070707]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-amber-400/80" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
                {siteData.sectionHeadings?.galleryPage?.badge || 'Permanent Portfolio Archive'}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {siteData.sectionHeadings?.galleryPage?.title || 'THE GALLERY'} <br />
              <span className="italic font-light text-amber-200/90">{siteData.sectionHeadings?.galleryPage?.subtitle || '& PORTFOLIO ARCHIVE'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A3A3A0] leading-relaxed font-normal">
              {siteData.sectionHeadings?.galleryPage?.description || 'Every photograph below represents a bespoke narrative designed and tattooed within our studio. Click any piece to inspect high-resolution details, artist credentials, and story background.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Tabs Bar */}
      <section className="sticky top-16 sm:top-20 z-20 border-b border-white/10 bg-[#060606]/95 backdrop-blur-md py-4">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'border border-amber-400 bg-amber-400 text-black font-bold shadow-md'
                      : 'border border-white/10 bg-[#0d0d0d] text-[#A3A3A0] hover:border-white/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative cursor-pointer border border-white/10 bg-[#0c0c0c] overflow-hidden transition-all duration-300 hover:border-white/50"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111]">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    style={{
                      objectPosition: item.image.desktopPosition || 'center 35%',
                    }}
                    className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-[#050505]/90 border border-white/30 px-3 py-1.5 text-xs font-mono tracking-widest uppercase text-white">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect Artwork</span>
                    </div>
                  </div>
                </div>

                {/* Card Info Strip */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080808] flex items-center justify-between">
                  <div className="truncate pr-2">
                    <h3 className="font-serif text-sm uppercase text-white truncate group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#9E9E9C] uppercase tracking-wider mt-0.5">
                      {item.category} &bull; {item.artistName}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-white/30 group-hover:text-white shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[#9E9E9C]">
                No archive works currently in this category.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close fullscreen inspection"
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#0c0c0c] text-white hover:border-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={prevLightboxItem}
              aria-label="Previous artwork"
              className="absolute left-4 sm:left-8 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border border-white/20 bg-[#0c0c0c] text-white hover:border-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={nextLightboxItem}
              aria-label="Next artwork"
              className="absolute right-4 sm:right-8 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border border-white/20 bg-[#0c0c0c] text-white hover:border-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Main Modal Card */}
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0c0c0c] flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-3/5 relative aspect-square sm:aspect-[4/5] bg-black overflow-hidden">
                <img
                  src={activeItem.image.src}
                  alt={activeItem.image.alt}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Story & Metadata Side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#080808]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/50 border border-white/15 px-2 py-0.5">
                      {activeItem.category}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      {selectedItemIndex !== null ? selectedItemIndex + 1 : 1} / {filteredItems.length}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl uppercase tracking-wide text-white mb-2">
                    {activeItem.title}
                  </h2>

                  <p className="font-mono text-xs uppercase tracking-widest text-[#9E9E9C] mb-6">
                    ARTIST: {activeItem.artistName}
                  </p>

                  <div className="border-l-2 border-white/30 pl-4 py-1 mb-6">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                      CLIENT NARRATIVE:
                    </span>
                    <p className="font-serif italic text-xs sm:text-sm text-[#F5F5F3] leading-relaxed">
                      "{activeItem.storySnippet}"
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      closeLightbox();
                      setIsBookingOpen(true);
                    }}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    Inquire About a Piece Like This
                  </Button>
                  <p className="text-[10px] font-mono text-[#9E9E9C]/60 text-center uppercase tracking-widest">
                    100% Bespoke &bull; Never Duplicated
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
