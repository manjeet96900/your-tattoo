/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { useSiteData } from '@/src/context/SiteDataContext';

export const WhyYourStorySection: React.FC = () => {
  const { siteData } = useSiteData();
  const { whyYourStory } = siteData;

  return (
    <section
      aria-label="Why Choose Your Story"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <SectionHeading
            badge={siteData.sectionHeadings?.whyYourStory?.badge || 'Foundational Commitments'}
            title={siteData.sectionHeadings?.whyYourStory?.title || 'WHY YOUR STORY'}
            description={siteData.sectionHeadings?.whyYourStory?.description || 'Our foundational principles govern every consultation, sketch, sterile packaging seal, and tattoo stroke.'}
          />
        </div>

        {/* Cohesive Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {whyYourStory.map((pillar, idx) => {
            const isWide = idx === 0 || idx === 3;

            return (
              <div
                key={pillar.id}
                className={`bg-[#0d0d0d] p-8 sm:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-[#121212] ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-2xl sm:text-3xl text-amber-400/50 font-light">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-amber-300 border border-amber-400/20 bg-amber-400/5 px-2 py-0.5">
                      TENET {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide uppercase text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber-300/90 mb-4">
                    {pillar.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A3A3A0] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-amber-400/40">
                  <span>UNCOMPROMISED STANDARD</span>
                  <span>0{idx + 1} / 05</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
