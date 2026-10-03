/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { useSiteData } from '@/src/context/SiteDataContext';

export const BrandIntroSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { brandStatement } = siteData.studio;
  const brandImgSrc = siteData.brandIntroImage?.src || 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=800&q=85';
  const brandImgAlt = siteData.brandIntroImage?.alt || 'Artist sketching bespoke tattoo design in studio notebook';

  return (
    <section
      aria-label="Brand Philosophy"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Monogram & Subheading */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-amber-400/80" />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
                  Studio Manifesto
                </span>
              </div>
              <h3 className="font-mono text-xs tracking-[0.24em] uppercase text-white/70 font-medium">
                {brandStatement.subheading}
              </h3>
            </div>

            {/* Editorial Studio Craft Photography Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full max-h-[300px] sm:max-h-none overflow-hidden border border-white/10 bg-[#111111]">
              <img
                src={brandImgSrc}
                alt={brandImgAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale contrast-110 brightness-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-[#060606]/90 border border-white/20 px-2 py-0.5 text-[9px] font-mono tracking-widest text-[#9E9E9C] uppercase">
                STUDIO DRAFTING &bull; 1-OF-1
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Heading & Paragraphs */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.04em] leading-[1.2] text-white">
              "{brandStatement.heading}"
            </h2>

            <div className="pt-3 border-t border-white/10 text-xs sm:text-sm leading-relaxed text-[#A3A3A0] max-w-3xl flex flex-col gap-3">
              {brandStatement.paragraphs.slice(0, 1).map((p, idx) => (
                <p key={idx} className="font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* Ethos signature mark */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-mono tracking-widest text-amber-300/80">
              <span>AUTHENTICITY &bull; PRECISION &bull; REVERENCE</span>
              <span>EST. 2018 &bull; INDIRANAGAR</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
