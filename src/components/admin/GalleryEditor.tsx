/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Image, Tag, User, Sparkles } from 'lucide-react';

interface GalleryEditorProps {
  searchQuery: string;
}

export const GalleryEditor: React.FC<GalleryEditorProps> = ({ searchQuery }) => {
  const { siteData, updateGalleryItem } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const query = searchQuery.toLowerCase().trim();

  const categories = [
    'All',
    'Fine Line',
    'Black & Grey',
    'Geometric',
    'Minimal',
    'Cover-Up',
    'Custom',
  ];

  const filteredItems = siteData.gallery.filter((item) => {
    // Category Filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    // Search Query
    if (query) {
      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.artistName && item.artistName.toLowerCase().includes(query)) ||
        (item.storySnippet && item.storySnippet.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#0d0d0d] border border-white/15">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-1">
            [ PORTFOLIO ARCHIVE &bull; {siteData.gallery.length} BESPOKE TATTOOS ]
          </span>
          <h2 className="font-serif text-lg uppercase tracking-wider text-white">
            Gallery Titles, Categories & Artist Credits
          </h2>
          <p className="text-xs text-white/60 font-mono mt-1">
            Edit artwork titles (e.g. Lord Shiva Tattoo, Samurai Warrior), category tags, artist credits, and story concepts.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-2.5 py-1 border transition-colors ${
                selectedCategory === cat
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Gallery Work Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const globalIndex = siteData.gallery.findIndex((g) => g.id === item.id);
          const slotNumber = 38 + globalIndex; // Gallery slots start at #39 to #58

          return (
            <div
              key={item.id}
              className="border border-white/15 bg-[#0a0a0a] p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header & Thumbnail */}
                <div className="flex items-start gap-3 pb-4 border-b border-white/10 mb-4">
                  <div className="relative h-16 w-16 shrink-0 border border-white/20 bg-[#141414] overflow-hidden">
                    <img
                      src={item.image.src}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/90 font-mono text-[9px] text-white/80 px-1 border-t border-l border-white/20">
                      #{String(slotNumber + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-white/50 uppercase">
                        {item.id}
                      </span>
                      <span className="border border-white/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/70">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm uppercase tracking-wider text-white font-semibold truncate mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1">
                      Piece Title (Name)
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateGalleryItem(item.id, { title: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-1.5 text-xs text-white font-serif tracking-wide focus:border-white focus:outline-none"
                      placeholder="e.g. Lord Shiva Tattoo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1">
                        Category
                      </label>
                      <select
                        value={item.category}
                        onChange={(e) =>
                          updateGalleryItem(item.id, {
                            category: e.target.value as any,
                          })
                        }
                        className="w-full bg-[#141414] border border-white/20 px-2.5 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                      >
                        <option value="Fine Line">Fine Line</option>
                        <option value="Black & Grey">Black & Grey</option>
                        <option value="Geometric">Geometric</option>
                        <option value="Minimal">Minimal</option>
                        <option value="Custom">Custom</option>
                        <option value="Cover-Up">Cover-Up</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1">
                        Artist Name
                      </label>
                      <input
                        type="text"
                        value={item.artistName || ''}
                        onChange={(e) =>
                          updateGalleryItem(item.id, { artistName: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 px-2.5 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                        placeholder="e.g. Amit Kumar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1">
                      Story Snippet & Concept
                    </label>
                    <textarea
                      rows={2}
                      value={item.storySnippet || ''}
                      onChange={(e) =>
                        updateGalleryItem(item.id, { storySnippet: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-white/20 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
                      placeholder="Brief narrative meaning or story for this tattoo..."
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
