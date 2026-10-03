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
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { address, contact } = siteData.studio;
  const { navigate } = useNavigation();
  const locationImgSrc = siteData.locationImage?.src || 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1200&q=85';
  const locationImgAlt = siteData.locationImage?.alt || 'Your Story Tattoo Studio private appointment interior and sterile equipment';

  return (
    <section
      aria-label="Studio Sanctuary & Location"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Address, Hours & Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <SectionHeading
                badge={siteData.sectionHeadings?.location?.badge || 'Studio Sanctuary'}
                title={siteData.sectionHeadings?.location?.title || 'STUDIO & VISITS'}
                description={siteData.sectionHeadings?.location?.description || 'Designed as a tranquil, quiet, sterile sanctuary. We operate primarily by appointment to guarantee unhurried creative immersion for every client.'}
              />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-y border-white/10 py-8">
                {/* Physical Location */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-xs font-mono tracking-widest uppercase">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>Location</span>
                  </div>
                  <p className="text-xs text-[#A3A3A0] leading-relaxed">
                    {address.street}
                    <br />
                    {address.district}
                    <br />
                    {address.city} {address.postalCode}, {address.country}
                  </p>
                  <a
                    href={address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider text-amber-300 underline underline-offset-4 mt-1 hover:text-amber-200"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                {/* Operating Hours */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-xs font-mono tracking-widest uppercase">
                    <Clock className="h-3.5 w-3.5 text-white/70" />
                    <span>Studio Hours</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-[#9E9E9C]">
                    {contact.openingHours.map((slot, sIdx) => (
                      <div key={sIdx} className="flex justify-between gap-4">
                        <span className="text-white/80">{slot.days}</span>
                        <span>{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6 text-xs text-[#9E9E9C]">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/70" />
                  <a href={`tel:${contact.phoneRaw}`} className="hover:text-white transition-colors">
                    {contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/70" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/contact')}
                className="text-xs tracking-[0.2em] uppercase"
              >
                Send Studio Enquiry
              </Button>
            </div>
          </div>

          {/* Right Column: Stylized Architectural Dark Map / Lounge Visual Frame */}
          <div className="lg:col-span-6 border border-white/15 bg-[#0a0a0a] p-4 sm:p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#111111]">
              <img
                src={locationImgSrc}
                alt={locationImgAlt}
                className="h-full w-full object-cover grayscale brightness-90 contrast-110"
              />
              {/* Overlay with studio pin badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/95 border border-white/20 p-4 flex items-center justify-between">
                <div>
                  <p className="font-serif text-xs uppercase tracking-wider text-white">
                    {siteData.studio.name}
                  </p>
                  <p className="font-mono text-[10px] text-[#9E9E9C] tracking-widest mt-0.5">
                    {address.district}, {address.city}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-[#9E9E9C] uppercase">
                    Open By Appointment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
