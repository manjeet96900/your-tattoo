/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { ImageSlot } from '@/src/components/ui/ImageSlot';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Instagram, ArrowUpRight, Award } from 'lucide-react';

export const ArtistsSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { artists } = siteData;
  const { setIsBookingOpen, openBookingWithData, navigate } = useNavigation();
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(0);

  const activeArtist = artists[selectedArtistIndex] || artists[0];

  return (
    <section
      aria-label="Resident Artists"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge={siteData.sectionHeadings?.artists?.badge || 'The Resident Masters'}
            title={siteData.sectionHeadings?.artists?.title || 'OUR ARTISTS'}
            description={siteData.sectionHeadings?.artists?.description || 'Resident practitioners, each specializing in distinct tattoo idioms—from fine-line botanicals to micro-realism and geometric sacred geometry.'}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/artists')}
            className="self-start sm:self-auto text-xs tracking-[0.2em] uppercase shrink-0"
          >
            <span>View Full Profiles</span>
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* Interactive Master Showcase Card */}
        <div className="border border-white/15 bg-[#0a0a0a]">
          {/* Main Selected Artist Feature */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArtist.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12"
            >
              {/* Left Column: Large Portrait */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#141414]">
                  <ImageSlot
                    image={activeArtist.portraitImage}
                    aspectRatio="aspect-[3/4]"
                    className="h-full w-full object-cover grayscale contrast-110"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#060606]/90 border border-white/20 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                    {activeArtist.experienceYears} Years Experience
                  </div>
                </div>
              </div>

              {/* Right Column: Bio, Philosophy & Work Samples */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <span className="font-mono text-xs tracking-widest text-[#A3A3A0] uppercase">
                      {activeArtist.title}
                    </span>
                    {activeArtist.instagramHandle && (
                      <span className="font-mono text-xs text-amber-400/90 flex items-center gap-1">
                        <Instagram className="h-3 w-3" />
                        <span>{activeArtist.instagramHandle}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase text-white mb-2">
                    {activeArtist.name}
                  </h3>

                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber-300/90 mb-6">
                    SPECIALTY: {activeArtist.specialty}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A3A3A0] leading-relaxed mb-6 font-normal">
                    {activeArtist.bio}
                  </p>

                  <div className="border-l-2 border-amber-400/60 pl-4 py-1.5 mb-8 bg-amber-400/5">
                    <p className="font-serif italic text-xs sm:text-sm text-amber-100/95">
                      "{activeArtist.philosophy}"
                    </p>
                  </div>

                  {/* Sample Portfolio Highlights */}
                  {activeArtist.portfolioSamples && activeArtist.portfolioSamples.length > 0 && (
                    <div className="mb-8">
                      <span className="font-mono text-[10px] tracking-[0.24em] text-amber-400/80 uppercase block mb-3">
                        Selected Portfolio Works
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeArtist.portfolioSamples.map((sample, sIdx) => (
                          <div
                            key={sIdx}
                            className="aspect-square border border-white/10 bg-[#141414] overflow-hidden group/sample"
                          >
                            <img
                              src={sample.src}
                              alt={sample.alt}
                              className="h-full w-full object-cover grayscale group-hover/sample:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Consultation with this artist */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => openBookingWithData({ artistId: activeArtist.id })}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    Request Session With {activeArtist.name.split(' ')[0]}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Thumbnails Selector Strip */}
          <div className="border-t border-white/15 bg-[#080808] p-4 sm:p-6">
            <span className="font-mono text-[10px] tracking-[0.28em] text-[#9E9E9C] uppercase block mb-3">
              SELECT ARTIST TO PREVIEW:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {artists.map((artist, idx) => {
                const isSelected = selectedArtistIndex === idx;
                return (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtistIndex(idx)}
                    className={`flex items-center gap-3 p-2.5 sm:p-3 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-[#161616] text-white shadow-lg'
                        : 'border-white/10 bg-[#060606] text-[#9E9E9C] hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden border border-white/20">
                      <img
                        src={artist.portraitImage.src}
                        alt={artist.name}
                        className="h-full w-full object-cover grayscale"
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-serif text-xs uppercase tracking-wider truncate">
                        {artist.name}
                      </p>
                      <p className="font-mono text-[9px] text-amber-400/80 truncate">
                        {artist.specialty.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
