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
import { ArrowLeft, Check, Shield, Clock, HelpCircle, ArrowUpRight } from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { siteData } = useSiteData();
  const { services, gallery } = siteData;
  const { navigate, setIsBookingOpen } = useNavigation();

  const service = services.find((s) => s.slug === slug) || services[0];
  const relatedGalleryWorks = gallery.filter((item) => {
    if (slug === 'fine-line-tattoos') return item.category === 'Fine Line';
    if (slug === 'tattoo-cover-ups') return item.category === 'Cover-Up';
    if (slug === 'custom-tattoos') return item.category === 'Minimal' || item.category === 'Geometric';
    return true;
  }).slice(0, 3);

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Top Breadcrumb & Hero */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#080808]">
        <Container>
          <div className="mb-6">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E9E9C] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Disciplines</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#9E9E9C]">
                // DISCIPLINE CHAPTER
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-[#9E9E9C] leading-relaxed font-light">
              {service.detailedDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Chapter Content */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Visual & Specs Card */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative aspect-[4/5] border border-white/15 bg-[#141414] overflow-hidden">
                <img
                  src={service.image.src}
                  alt={service.image.alt}
                  className="h-full w-full object-cover grayscale contrast-110"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/95 border border-white/20 p-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#9E9E9C] block mb-1">
                    TARGET AUDIENCE
                  </span>
                  <p className="font-serif text-xs uppercase tracking-wider text-white">
                    {service.idealFor}
                  </p>
                </div>
              </div>

              {/* Protocol Spec Box */}
              <div className="border border-white/10 bg-[#0c0c0c] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-[#9E9E9C] uppercase">Sterility Protocol</span>
                  <span className="font-mono text-xs text-white">Class-B ISO 11134</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-[#9E9E9C] uppercase">Consultation</span>
                  <span className="font-mono text-xs text-white">
                    {service.consultationRequired ? 'Mandatory' : 'Optional / Walk-In'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9E9E9C] uppercase">Touch-Up Warranty</span>
                  <span className="font-mono text-xs text-white">Complimentary (60 Days)</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-white/50 block mb-2">
                  // THE CRAFT & ANATOMY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light uppercase tracking-wide text-white mb-4">
                  SURGICAL INTENT & METHODOLOGY
                </h2>
                <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed mb-6 font-normal">
                  Our approach to {service.title.toLowerCase()} is grounded in continuous skin tension
                  analysis and millimeter needle-depth precision. We reject rushed conveyor-belt ink delivery.
                  Instead, we calculate ink pigment absorption and capillary spread to ensure the tattoo retains its
                  clarity, sharpness, and intended contrast over decades of life.
                </p>
              </div>

              {/* Technical Features Checklist */}
              <div className="border-t border-white/10 pt-6">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-white/50 block mb-4">
                  // EXECUTION STANDARDS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 border border-white/10 bg-[#080808] p-4">
                      <Check className="h-4 w-4 text-white/80 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#9E9E9C] leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Summary */}
              <div className="border-t border-white/10 pt-6">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-white/50 block mb-3">
                  // APPOINTMENT TIMELINE
                </span>
                <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed bg-[#0c0c0c] border border-white/10 p-5 font-mono">
                  {service.processSummary}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  className="text-xs tracking-[0.24em] uppercase py-4"
                >
                  Book Session For {service.title}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/gallery')}
                  className="text-xs tracking-[0.24em] uppercase py-4"
                >
                  Inspect Gallery Works
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Portfolio Works */}
      {relatedGalleryWorks.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-white/10 bg-[#080808]">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#9E9E9C]">
                // RELEVANT ARCHIVE WORKS
              </span>
              <button
                onClick={() => navigate('/gallery')}
                className="font-mono text-xs uppercase tracking-wider text-white hover:underline flex items-center gap-1"
              >
                <span>View Full Gallery</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedGalleryWorks.map((item) => (
                <div key={item.id} className="border border-white/10 bg-[#0c0c0c] overflow-hidden group">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="h-full w-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <p className="font-serif text-xs uppercase text-white truncate">{item.title}</p>
                    <p className="font-mono text-[10px] text-[#9E9E9C] uppercase mt-0.5">
                      {item.category} &bull; {item.artistName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};
