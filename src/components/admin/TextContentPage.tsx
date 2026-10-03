/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { HeadingsEditor } from '@/src/components/admin/HeadingsEditor';
import { ServicesEditor } from '@/src/components/admin/ServicesEditor';
import { GalleryEditor } from '@/src/components/admin/GalleryEditor';
import { ArtistsEditor } from '@/src/components/admin/ArtistsEditor';
import { ProcessFaqEditor } from '@/src/components/admin/ProcessFaqEditor';
import { Type, Layers, Image as ImageIcon, User, HelpCircle, Search } from 'lucide-react';

interface TextContentPageProps {
  searchQuery: string;
}

export const TextContentPage: React.FC<TextContentPageProps> = ({ searchQuery }) => {
  const { siteData } = useSiteData();
  const [textTab, setTextTab] = useState<'headings' | 'services' | 'gallery' | 'artists' | 'process_faq'>('headings');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-sky-400 uppercase">
              [ EDITORIAL &amp; COPY SUITE ]
            </span>
          </div>
          <h1 className="font-serif text-2xl uppercase tracking-wider text-white">
            Text, Headings &amp; Descriptions
          </h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            Edit headline banners, studio philosophy, service names &amp; features, artwork titles, artist credentials, and FAQs.
          </p>
        </div>
      </div>

      {/* Subcategory Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setTextTab('headings')}
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            textTab === 'headings'
              ? 'bg-sky-400 text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <Type className="h-3.5 w-3.5" />
          <span>Headings &amp; Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setTextTab('services')}
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            textTab === 'services'
              ? 'bg-sky-400 text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Services Copy ({siteData.services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTextTab('gallery')}
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            textTab === 'gallery'
              ? 'bg-sky-400 text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <ImageIcon className="h-3.5 w-3.5" />
          <span>Gallery Titles ({siteData.gallery.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTextTab('artists')}
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            textTab === 'artists'
              ? 'bg-sky-400 text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Artists &amp; Bios ({siteData.artists.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTextTab('process_faq')}
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            textTab === 'process_faq'
              ? 'bg-sky-400 text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Process &amp; FAQs</span>
        </button>
      </div>

      {/* Render Sub-editor */}
      <div>
        {textTab === 'headings' && <HeadingsEditor searchQuery={searchQuery} />}
        {textTab === 'services' && <ServicesEditor searchQuery={searchQuery} />}
        {textTab === 'gallery' && <GalleryEditor searchQuery={searchQuery} />}
        {textTab === 'artists' && <ArtistsEditor searchQuery={searchQuery} />}
        {textTab === 'process_faq' && <ProcessFaqEditor searchQuery={searchQuery} />}
      </div>
    </div>
  );
};
