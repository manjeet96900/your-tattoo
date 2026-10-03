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
import { ArrowUpRight, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { siteData } = useSiteData();

  // Curated 6 primary services for the homepage
  const homepageServices = siteData.services.slice(0, 6);

  return (
    <section
      aria-label="Studio Services"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge={siteData.sectionHeadings?.services?.badge || 'Services & Disciplines'}
            title={siteData.sectionHeadings?.services?.title || 'THE DISCIPLINES'}
            description={siteData.sectionHeadings?.services?.description || 'From single-needle botanical minimalism to comprehensive cover-ups and safe laser tattoo removal, every session is executed under hospital-grade sterility.'}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/services')}
            className="self-start sm:self-auto text-xs tracking-[0.2em] uppercase shrink-0"
          >
            <span>Explore All {siteData.services.length} Services</span>
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {homepageServices.map((service, idx) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 transition-all duration-300 hover:border-amber-400/50 hover:bg-[#111111]"
            >
              {/* Top Index & Title */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="font-mono text-xs text-amber-400/90 font-medium tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {service.consultationRequired && (
                    <span className="font-mono text-[9px] tracking-widest uppercase text-amber-300/80 border border-amber-400/20 bg-amber-400/5 px-2 py-0.5">
                      Consultation Required
                    </span>
                  )}
                </div>

                {/* Service Visual Thumbnail */}
                <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-white/10 bg-[#141414]">
                  <img
                    src={service.image.src}
                    alt={service.image.alt}
                    style={{
                      objectPosition: service.image.desktopPosition || 'center 35%',
                    }}
                    className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <h3 className="font-serif text-lg tracking-wider uppercase text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#A3A3A0] leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Key features bullets */}
                <ul className="flex flex-col gap-1.5 mb-6">
                  {service.features.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-[11px] text-[#A3A3A0]">
                      <Check className="h-3 w-3 text-amber-400/80 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (service.slug) {
                      navigate(`/services/${service.slug}`);
                    } else {
                      navigate('/services');
                    }
                  }}
                  className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/70 group-hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Chapter</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
