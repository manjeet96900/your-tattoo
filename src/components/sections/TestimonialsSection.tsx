/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { useSiteData } from '@/src/context/SiteDataContext';

export const TestimonialsSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { testimonials } = siteData;

  return (
    <section
      aria-label="Client Stories and Testimonials"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <SectionHeading
            badge={siteData.sectionHeadings?.testimonials?.badge || 'Client Narratives'}
            title={siteData.sectionHeadings?.testimonials?.title || 'STORIES INKED'}
            description={siteData.sectionHeadings?.testimonials?.description || 'Reflections from clients who entrusted our studio with their most intimate and enduring chapters.'}
          />
        </div>

        {/* 3 Editorial Narrative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between border border-white/10 bg-[#0d0d0d] p-8 sm:p-10 transition-colors hover:border-amber-400/40"
            >
              <div>
                <span className="font-serif text-4xl text-amber-400/50 block mb-4">“</span>
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#F5F5F3] mb-8">
                  {t.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="font-serif text-sm uppercase tracking-wider text-white">
                  {t.clientName}
                </p>
                <p className="font-mono text-[11px] text-amber-300/80 uppercase tracking-widest mt-1">
                  {t.tattooStory}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A3A3A0]/60">
                  <span>ARTIST: {t.artistName}</span>
                  <span>{t.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
