/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Instagram, ArrowUpRight, Award, Check } from 'lucide-react';

export const ArtistsPage: React.FC = () => {
  const { siteData } = useSiteData();
  const { artists } = siteData;
  const { openBookingWithData } = useNavigation();

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#080808]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#9E9E9C]">
                {siteData.sectionHeadings?.artistsPage?.badge || '// THE RESIDENT MASTERS'}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {siteData.sectionHeadings?.artistsPage?.title || 'OUR ARTISTS'} <br />
              <span className="italic font-light">{siteData.sectionHeadings?.artistsPage?.subtitle || '& CRAFTSPEOPLE'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#9E9E9C] leading-relaxed font-light">
              {siteData.sectionHeadings?.artistsPage?.description || 'We do not employ generalists. Each resident artist at Your Story has spent years immersing themselves in specific artistic idioms—from microscopic single-needle botanical work to chiaroscuro renaissance realism and structural scar cover-ups.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Artist Profiles Grid */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="flex flex-col gap-20 sm:gap-28">
            {artists.map((artist, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={artist.id}
                  id={artist.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start border border-white/15 bg-[#080808] p-6 sm:p-10 lg:p-14"
                >
                  {/* Left Column: Portrait & Stats */}
                  <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[3/4] overflow-hidden border border-white/15 bg-[#141414]">
                      <img
                        src={artist.portraitImage.src}
                        alt={artist.portraitImage.alt}
                        style={{
                          objectPosition: artist.portraitImage.desktopPosition || 'center 20%',
                        }}
                        className="h-full w-full object-cover grayscale contrast-110"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#050505]/90 border border-white/20 px-3 py-1 font-mono text-[10px] uppercase text-white">
                        {artist.experienceYears} Years Studio Craft
                      </div>
                    </div>

                    {/* Social & Contact */}
                    {artist.instagramHandle && (
                      <div className="flex items-center justify-between border border-white/10 bg-[#0c0c0c] px-4 py-3">
                        <span className="font-mono text-xs text-[#9E9E9C] uppercase">Instagram Archive</span>
                        <span className="font-mono text-xs text-white flex items-center gap-1.5">
                          <Instagram className="h-3.5 w-3.5" />
                          <span>{artist.instagramHandle}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Bio, Philosophy & Samples */}
                  <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="font-mono text-xs text-[#9E9E9C] uppercase tracking-widest">
                          {artist.title}
                        </span>
                        <span className="font-mono text-xs text-white/40">
                          RESIDENT // 0{idx + 1}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wide text-white mb-2">
                        {artist.name}
                      </h2>

                      <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/80 mb-6">
                        SPECIALTY: {artist.specialty}
                      </p>

                      <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed mb-6 font-normal">
                        {artist.bio}
                      </p>

                      <div className="border-l-2 border-white/30 pl-4 py-1 mb-8">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                          ARTISTIC PHILOSOPHY:
                        </span>
                        <p className="font-serif italic text-xs sm:text-sm text-[#F5F5F3] leading-relaxed">
                          "{artist.philosophy}"
                        </p>
                      </div>

                      {/* Portfolio Sample Works */}
                      {artist.portfolioSamples && artist.portfolioSamples.length > 0 && (
                        <div className="mb-8">
                          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/60 block mb-3">
                            // CURATED PORTFOLIO HIGHLIGHTS
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {artist.portfolioSamples.map((sample, sIdx) => (
                              <div
                                key={sIdx}
                                className="aspect-square border border-white/10 bg-[#141414] overflow-hidden"
                              >
                                <img
                                  src={sample.src}
                                  alt={sample.alt}
                                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Booking Action */}
                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => openBookingWithData({ artistId: artist.id })}
                        className="text-xs tracking-[0.2em] uppercase"
                      >
                        Request Session with {artist.name.split(' ')[0]}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
};
