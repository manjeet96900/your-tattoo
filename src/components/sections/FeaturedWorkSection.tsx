/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { ImageSlot } from '@/src/components/ui/ImageSlot';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedWorkSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { siteData } = useSiteData();

  // Pick 4 standout editorial pieces across different categories
  const featuredItems = siteData.gallery.slice(0, 4);

  return (
    <section
      aria-label="Featured Tattoo Works"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        {/* Section Heading with Right-Aligned Full Gallery Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge={siteData.sectionHeadings?.featuredWork?.badge || '02 // PORTFOLIO ARCHIVE'}
            title={siteData.sectionHeadings?.featuredWork?.title || 'FEATURED WORK'}
            description={siteData.sectionHeadings?.featuredWork?.description || 'A curated selection of bespoke fine-line, geometry, and custom narrative tattoos executed in our studio.'}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/gallery')}
            className="self-start sm:self-auto text-xs tracking-[0.2em] uppercase shrink-0"
          >
            <span>View Full Gallery</span>
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredItems.map((item, idx) => {
            const isTall = idx % 2 === 1;
            return (
              <div
                key={item.id}
                onClick={() => navigate('/gallery')}
                className={`group relative flex flex-col border border-white/10 bg-[#0c0c0c] transition-colors duration-300 hover:border-white/40 cursor-pointer ${
                  isTall ? 'md:mt-8' : ''
                }`}
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative overflow-hidden aspect-[4/5] w-full">
                  <ImageSlot
                    image={item.image}
                    aspectRatio="aspect-[4/5]"
                    className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Monochrome Grain Filter */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                </div>

                {/* Metadata Strip */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-t border-white/10 bg-[#080808]">
                  <div>
                    <h3 className="font-serif text-sm tracking-wide text-white uppercase group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-widest text-[#9E9E9C] uppercase mt-0.5">
                      {item.category} &bull; {item.artistName}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-white/40 group-hover:text-white transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/gallery')}
            className="font-mono text-xs tracking-[0.24em] text-[#9E9E9C] hover:text-white uppercase transition-colors border-b border-white/20 hover:border-white pb-1"
          >
            DISCOVER ALL {siteData.gallery.length} ARCHIVAL WORKS IN THE GALLERY &rarr;
          </button>
        </div>
      </Container>
    </section>
  );
};
