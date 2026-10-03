/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { instagramFeedPreview } = siteData;
  const { instagramUrl, instagramHandle } = siteData.studio.contact;

  return (
    <section
      aria-label="Instagram Feed Preview"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-6 bg-amber-400/80" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400 font-medium">
                Live Studio Feed
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wide uppercase text-white">
              {instagramFeedPreview.headline}
            </h2>
            <p className="text-xs text-[#A3A3A0] mt-1">
              {instagramFeedPreview.subtitle}
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-mono tracking-wider uppercase text-white hover:border-amber-400/60 hover:text-amber-300 transition-colors"
          >
            <Instagram className="h-3.5 w-3.5 text-amber-400" />
            <span>Follow {instagramHandle}</span>
            <ArrowUpRight className="h-3 w-3 text-amber-400/60" />
          </a>
        </div>

        {/* 5-Column Editorial Image Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {instagramFeedPreview.images.map((img, idx) => (
            <a
              key={idx}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden border border-white/10 bg-[#111111]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="h-5 w-5 text-white" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};
