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
import { Shield, Sparkles, HeartHandshake, Award, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteData } = useSiteData();
  const { studio, whyYourStory } = siteData;
  const { setIsBookingOpen, navigate } = useNavigation();
  const founderImgSrc = siteData.aboutStudioImage?.src || 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85';
  const founderImgAlt = siteData.aboutStudioImage?.alt || 'Your Story Tattoo studio founder sketching a custom tattoo concept';

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#070707]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-amber-400/80" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
                {siteData.sectionHeadings?.aboutPage?.badge || 'About The Sanctuary'}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {siteData.sectionHeadings?.aboutPage?.title || 'THE STORY BEHIND'} <br />
              <span className="italic font-light text-amber-200/90">{siteData.sectionHeadings?.aboutPage?.subtitle || 'YOUR STORY'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A3A3A0] leading-relaxed font-normal">
              {siteData.sectionHeadings?.aboutPage?.description || 'Founded in 2018, Your Story Tattoo was born from a singular rejection: that a tattoo studio should feel like a loud, transactional factory of mass-produced flash sheets.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Genesis & Studio Philosophy */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-6 relative aspect-[4/5] border border-white/15 bg-[#111111] overflow-hidden">
              <img
                src={founderImgSrc}
                alt={founderImgAlt}
                className="h-full w-full object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/90 border border-white/20 p-4">
                <p className="font-serif text-xs uppercase tracking-wider text-white">
                  AARAV MEHTA &bull; FOUNDER
                </p>
                <p className="font-mono text-[10px] text-[#9E9E9C] tracking-widest mt-0.5">
                  ESTABLISHED 2018 &bull; INDIRANAGAR, BANGALORE
                </p>
              </div>
            </div>

            {/* Narrative Copy */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-white/40" />
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#9E9E9C]">
                  THE GENESIS
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-light uppercase tracking-wide text-white">
                "SKIN IS NOT PAPER. IT IS A LIVING RECORD."
              </h2>
              <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed">
                When you step into our sanctuary, you aren’t asked to flip through binders of stock designs.
                We begin with a cup of warm tea and an unhurried conversation. We listen to the memory, the
                loss, the rebirth, or the private revelation you wish to anchor onto your body.
              </p>
              <p className="text-xs sm:text-sm text-[#9E9E9C] leading-relaxed">
                Every needle gauge, machine stroke, and pigment shade is calibrated to honor your physiology.
                The outcome is never simply a decoration—it is your story, rendered permanent in archival carbon.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center gap-8">
                <div>
                  <p className="font-serif text-3xl font-light text-white">6,500+</p>
                  <p className="font-mono text-[10px] text-[#9E9E9C] uppercase tracking-widest mt-1">
                    Stories Inked
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div>
                  <p className="font-serif text-3xl font-light text-white">100%</p>
                  <p className="font-mono text-[10px] text-[#9E9E9C] uppercase tracking-widest mt-1">
                    Custom 1-of-1
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div>
                  <p className="font-serif text-3xl font-light text-white">4</p>
                  <p className="font-mono text-[10px] text-[#9E9E9C] uppercase tracking-widest mt-1">
                    Resident Masters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Sterile Sanctuary Environment */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-[#080808]">
        <Container>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <SectionHeading
              badge="// CLINICAL DISCIPLINE"
              title="THE STERILE SANCTUARY"
              description="We operate at standards that exceed municipal health mandates, treating tattoo artistry as a clinical surgical discipline."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/10 bg-[#0c0c0c] p-8 flex flex-col justify-between">
              <div>
                <Shield className="h-6 w-6 text-white/70 mb-4" />
                <h3 className="font-serif text-lg uppercase tracking-wider text-white mb-2">
                  Class-B Autoclave
                </h3>
                <p className="text-xs text-[#9E9E9C] leading-relaxed mb-4">
                  Hospital-grade vacuum autoclaves tested monthly with biological spore indicators. Non-disposable stainless instruments undergo complete surgical decontamination.
                </p>
              </div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                ISO 11134 PROTOCOL
              </span>
            </div>

            <div className="border border-white/10 bg-[#0c0c0c] p-8 flex flex-col justify-between">
              <div>
                <Sparkles className="h-6 w-6 text-white/70 mb-4" />
                <h3 className="font-serif text-lg uppercase tracking-wider text-white mb-2">
                  100% Disposable Needles
                </h3>
                <p className="text-xs text-[#9E9E9C] leading-relaxed mb-4">
                  Every cartridge needle is single-use, sterile-blister packed, and opened solely in the client’s line of sight before ink application begins.
                </p>
              </div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                ZERO COMPROMISE
              </span>
            </div>

            <div className="border border-white/10 bg-[#0c0c0c] p-8 flex flex-col justify-between">
              <div>
                <HeartHandshake className="h-6 w-6 text-white/70 mb-4" />
                <h3 className="font-serif text-lg uppercase tracking-wider text-white mb-2">
                  EU REACH Compliant Inks
                </h3>
                <p className="text-xs text-[#9E9E9C] leading-relaxed mb-4">
                  We use strictly vegan, heavy-metal-free, and allergen-screened European black carbon formulations engineered for crisp cellular aging over decades.
                </p>
              </div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                PURE ARCHIVAL PIGMENT
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Tenets Grid */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              badge="// PILLARS OF EXCELLENCE"
              title="OUR ETHICAL CODE"
              description="A transparent pact with every client who sits in our chairs."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyYourStory.map((tenet) => (
              <div key={tenet.id} className="border border-white/10 bg-[#080808] p-6 sm:p-8">
                <span className="font-mono text-2xl text-white/20 block mb-3">{tenet.number}</span>
                <h4 className="font-serif text-base uppercase tracking-wider text-white mb-2">
                  {tenet.title}
                </h4>
                <p className="text-xs text-[#9E9E9C] leading-relaxed">{tenet.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action Bar */}
      <section className="py-12 sm:py-16 bg-[#080808] text-center">
        <Container size="md">
          <h2 className="font-serif text-3xl sm:text-4xl font-light uppercase text-white mb-4">
            BEGIN YOUR COLLABORATION
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E9C] max-w-lg mx-auto mb-8 leading-relaxed">
            Reserve a quiet 45-minute consultation to discuss your vision with one of our resident artists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="text-xs tracking-[0.24em] uppercase"
            >
              Book Studio Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/services')}
              className="text-xs tracking-[0.24em] uppercase"
            >
              Explore Disciplines
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
