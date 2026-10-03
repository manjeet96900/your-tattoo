/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { processStages } = siteData;

  return (
    <section
      aria-label="Studio Creative Process"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 sm:mb-20 max-w-2xl">
          <SectionHeading
            badge={siteData.sectionHeadings?.process?.badge || 'The Ritual & Protocol'}
            title={siteData.sectionHeadings?.process?.title || 'THE PROCESS'}
            description={siteData.sectionHeadings?.process?.description || 'Four deliberate stages designed to transform an intimate memory or philosophical concept into permanent fine ink.'}
          />
        </div>

        {/* 4 Storytelling Chapters */}
        <div className="flex flex-col gap-12 sm:gap-20">
          {processStages.map((stage, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={stage.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border border-white/10 bg-[#0d0d0d] p-6 sm:p-10 lg:p-12 hover:border-amber-400/40 transition-colors ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Left/Image Column */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden border border-white/15 bg-[#141414] ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={stage.image.src}
                    alt={stage.image.alt}
                    style={{
                      objectPosition: stage.image.desktopPosition || 'center center',
                    }}
                    className="h-full w-full object-cover grayscale contrast-[1.1] transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#060606]/90 border border-white/20 px-3 py-1 font-mono text-xs text-amber-300">
                    STAGE {stage.step}
                  </div>
                </div>

                {/* Right/Text Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-3xl sm:text-4xl font-light text-amber-400/50">
                      {stage.step}
                    </span>
                    <span className="h-[1px] flex-1 bg-white/10" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide uppercase text-white mb-2">
                    {stage.title}
                  </h3>

                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-amber-300/90 mb-4">
                    {stage.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A3A3A0] leading-relaxed mb-6 font-normal">
                    {stage.description}
                  </p>

                  {/* Key Points */}
                  <div className="border-t border-white/10 pt-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stage.keyPoints.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-[#A3A3A0]"
                        >
                          <Check className="h-3.5 w-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
