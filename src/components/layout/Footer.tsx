/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigation } from '@/src/context/NavigationContext';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Container } from '@/src/components/ui/Container';
import { Button } from '@/src/components/ui/Button';
import { Instagram, ArrowUpRight, Clock, MapPin, Mail, Phone, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setIsBookingOpen } = useNavigation();
  const { siteData, modifiedCount, totalSlots } = useSiteData();

  return (
    <footer className="relative border-t border-white/10 bg-[#060606] pt-16 sm:pt-24 pb-24 sm:pb-12 text-[#F5F5F3] overflow-hidden">
      <Container>
        {/* Tier 1: Oversized Brand Declaration Banner */}
        <div className="mb-16 sm:mb-20 pb-12 sm:pb-16 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400/90 block mb-3">
                Studio Sanctuary &bull; Bespoke Inking
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.08em] leading-[1.1] uppercase text-white">
                YOUR STORY. <br />
                <span className="italic font-light text-amber-200/90">INKED FOREVER.</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="text-xs tracking-[0.24em] uppercase"
              >
                Book Consultation
              </Button>
              <a
                href={siteData.studio.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-xs tracking-[0.2em] uppercase text-[#9E9E9C] hover:border-white hover:text-white transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
                <ArrowUpRight className="h-3 w-3 text-white/40" />
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: 4-Column Editorial Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Studio Ethos & Hours */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-2">
              {siteData.studio.logoUrl ? (
                <div className="flex h-5 w-5 items-center justify-center overflow-hidden border border-white/20 bg-[#0c0c0c]">
                  <img
                    src={siteData.studio.logoUrl}
                    alt={`${siteData.studio.name} Logo`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-2 w-2 bg-white" />
              )}
              <span className="font-serif text-sm tracking-[0.2em] text-white uppercase font-medium">
                {siteData.studio.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#9E9E9C]">
              {siteData.studio.coreBrandMessage}
            </p>
            <div className="mt-2 flex items-start gap-2.5 text-xs text-[#9E9E9C]">
              <Clock className="h-4 w-4 shrink-0 text-white/60 mt-0.5" />
              <div>
                <p className="text-white">{siteData.studio.contact.openingHours[0]?.days}</p>
                <p className="text-[#9E9E9C]">{siteData.studio.contact.openingHours[0]?.hours}</p>
                <p className="text-[10px] text-white/50">{siteData.studio.contact.openingHours[2]?.days}: {siteData.studio.contact.openingHours[2]?.hours}</p>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-400/80 uppercase block mb-5">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => navigate(item.href)}
                    className="text-xs tracking-[0.16em] uppercase text-[#9E9E9C] hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-xs tracking-[0.16em] uppercase text-[#9E9E9C] hover:text-white transition-colors cursor-pointer"
                >
                  Contact Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="text-xs tracking-[0.16em] uppercase text-emerald-400/80 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Admin Console</span>
                  <span className="font-mono text-[9px] bg-white/10 px-1 py-0.2 border border-white/15">58</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dedicated Services Directory */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-400/80 uppercase block mb-5">
              Disciplines &amp; Craft
            </span>
            <ul className="flex flex-col gap-2.5">
              {siteData.services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      if (service.slug) {
                        navigate(`/services/${service.slug}`);
                      } else {
                        navigate('/services');
                      }
                    }}
                    className="text-xs tracking-[0.12em] text-[#9E9E9C] hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-[11px] font-mono tracking-[0.16em] text-amber-300/80 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
                >
                  View All Services &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Location & Direct Reach */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-400/80 uppercase block mb-5">
              Studio Atelier
            </span>
            <div className="flex flex-col gap-3 text-xs text-[#9E9E9C]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-white/60 mt-0.5" />
                <p>
                  {siteData.studio.address.street}, {siteData.studio.address.district}
                  <br />
                  {siteData.studio.address.city}, {siteData.studio.address.postalCode}
                </p>
              </div>

              <div className="flex items-center gap-2.5 mt-2">
                <Phone className="h-4 w-4 shrink-0 text-white/60" />
                <a
                  href={`tel:${siteData.studio.contact.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {siteData.studio.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-white/60" />
                <a
                  href={`mailto:${siteData.studio.contact.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {siteData.studio.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Legal & Copyright Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-[#9E9E9C]">
          <div className="flex items-center gap-4">
            <span>
              &copy; {siteData.footer.copyrightYear} {siteData.studio.name}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-[#9E9E9C]/70">
              {siteData.studio.tagline}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-white transition-colors uppercase tracking-[0.16em] cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-white transition-colors uppercase tracking-[0.16em] cursor-pointer"
            >
              Terms & Conditions
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors uppercase tracking-[0.16em] cursor-pointer"
            >
              Sitemap
            </a>

            {/* Studio Image Admin Button */}
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white bg-[#0e0e0e] hover:bg-white text-white hover:text-black px-3.5 py-1.5 transition-all uppercase tracking-[0.16em] text-[11px] font-mono cursor-pointer group"
              title="Open Studio Admin Panel (Password Protected)"
            >
              <Settings className="h-3 w-3 group-hover:rotate-45 transition-transform duration-300" />
              <span>Admin</span>
              <span className="bg-white/10 group-hover:bg-black/10 px-1.5 py-0.5 border border-white/15 text-[9px] font-mono">
                {totalSlots || 58}
              </span>
              {modifiedCount > 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" title={`${modifiedCount} custom images active`} />
              )}
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
