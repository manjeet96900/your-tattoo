/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { Button } from '@/src/components/ui/Button';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';

export const FinalCTASection: React.FC = () => {
  const { siteData } = useSiteData();
  const { setIsBookingOpen } = useNavigation();

  const ctaHeading = siteData.sectionHeadings?.finalCta || {
    badge: '[ COMMENCE YOUR CHAPTER ]',
    title: 'READY TO TELL',
    subtitle: 'YOUR STORY?',
    description: 'Whether you hold a fully formed conceptual drawing or simply a meaningful memory awaiting its artistic translation, our artists are here to listen.',
  };

  return (
    <section
      aria-label="Booking Call to Action"
      className="relative border-b border-white/10 bg-[#050505] py-14 sm:py-20 text-center text-[#F5F5F3] overflow-hidden"
    >
      {/* Decorative fine-line geometry */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-16 w-[1px] bg-gradient-to-b from-amber-400/60 to-transparent" />
      </div>

      <Container size="md">
        <div className="mx-auto flex flex-col items-center">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400 mb-4 font-medium">
            {ctaHeading.badge || 'Commence Your Chapter'}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.06em] leading-[1.1] uppercase text-white mb-6">
            {ctaHeading.title || 'READY TO TELL'} <br />
            <span className="italic font-light text-amber-200/90">{ctaHeading.subtitle || 'YOUR STORY?'}</span>
          </h2>

          <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-[#A3A3A0] mb-10 font-normal">
            {ctaHeading.description || 'Whether you hold a fully formed conceptual drawing or simply a meaningful memory awaiting its artistic translation, our artists are here to listen.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="text-xs tracking-[0.24em] uppercase py-4 px-8"
            >
              Book Studio Appointment
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#9E9E9C]/60 uppercase">
            <span>Private Consultations</span>
            <span>&bull;</span>
            <span>Sterile Sanctuary</span>
            <span>&bull;</span>
            <span>Bespoke Artistry</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
