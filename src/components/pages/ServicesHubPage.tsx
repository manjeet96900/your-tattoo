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
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

export const ServicesHubPage: React.FC = () => {
  const { siteData } = useSiteData();
  const { services } = siteData;
  const { navigate, setIsBookingOpen } = useNavigation();

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#070707]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-amber-400/80" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
                {siteData.sectionHeadings?.servicesPage?.badge || 'Studio Disciplines'}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {siteData.sectionHeadings?.servicesPage?.title || 'THE DISCIPLINES'} <br />
              <span className="italic font-light text-amber-200/90">{siteData.sectionHeadings?.servicesPage?.subtitle || '& TECHNIQUES'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A3A3A0] leading-relaxed font-normal">
              {siteData.sectionHeadings?.servicesPage?.description || 'From delicate single-needle fine line work and bespoke narrative sleeves to laser tattoo removal and anatomical piercings, each craft is performed under medical-grade sterility by dedicated specialists.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Chapters Fast-Nav */}
      <section className="py-6 border-b border-white/10 bg-[#0c0c0c]">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-mono tracking-wider uppercase text-[#9E9E9C]">
            <span className="text-white/40">// DEEP-DIVE CHAPTERS:</span>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {[
                { label: 'Custom Tattoos', path: '/services/custom-tattoos' },
                { label: 'Fine Line Tattoos', path: '/services/fine-line-tattoos' },
                { label: 'Tattoo Cover-Ups', path: '/services/tattoo-cover-ups' },
                { label: 'Laser Removal', path: '/services/tattoo-removal' },
              ].map((sub) => (
                <button
                  key={sub.path}
                  onClick={() => navigate(sub.path)}
                  className="hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  <span>{sub.label}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Complete 8-Service Catalog */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-24">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border border-white/10 bg-[#080808] p-6 sm:p-10 lg:p-12 transition-all hover:border-white/30"
                >
                  {/* Visual Column */}
                  <div
                    className={`lg:col-span-5 relative aspect-[4/3] overflow-hidden border border-white/15 bg-[#141414] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={service.image.src}
                      alt={service.image.alt}
                      style={{
                        objectPosition: service.image.desktopPosition || 'center 35%',
                      }}
                      className="h-full w-full object-cover grayscale contrast-110 hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#050505]/90 border border-white/20 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-white">
                      DISCIPLINE {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Copy Column */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-between ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="font-mono text-xs text-[#9E9E9C] tracking-widest uppercase">
                          {service.idealFor}
                        </span>
                        {service.consultationRequired && (
                          <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 border border-white/20 px-2 py-0.5">
                            Consultation Mandatory
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-wide text-white mb-3">
                        {service.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed mb-6 font-normal">
                        {service.detailedDescription}
                      </p>

                      {/* Technical Features Checklist */}
                      <div className="mb-6 border-t border-white/10 pt-4">
                        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/60 block mb-3">
                          TECHNICAL HIGHLIGHTS:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-2 text-xs text-[#9E9E9C]"
                            >
                              <Check className="h-3.5 w-3.5 text-white/70 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => setIsBookingOpen(true)}
                        className="text-xs tracking-[0.2em] uppercase"
                      >
                        {service.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Booking CTA Footer */}
      <section className="py-12 sm:py-16 bg-[#080808] text-center">
        <Container size="md">
          <h2 className="font-serif text-3xl sm:text-4xl font-light uppercase text-white mb-4">
            UNSURE WHICH DISCIPLINE FITS YOUR VISION?
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E9C] max-w-lg mx-auto mb-8 leading-relaxed">
            Our consultations are non-committal conversations dedicated to assessing your skin, placement, and artistic goals.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsBookingOpen(true)}
            className="text-xs tracking-[0.24em] uppercase py-4 px-8"
          >
            Schedule Consultation
          </Button>
        </Container>
      </section>
    </div>
  );
};
