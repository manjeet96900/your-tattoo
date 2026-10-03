/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { User, Award, Instagram, Quote, Sparkles } from 'lucide-react';

interface ArtistsEditorProps {
  searchQuery: string;
}

export const ArtistsEditor: React.FC<ArtistsEditorProps> = ({ searchQuery }) => {
  const { siteData, updateArtistItem } = useSiteData();
  const query = searchQuery.toLowerCase().trim();

  const filteredArtists = siteData.artists.filter((art) => {
    if (!query) return true;
    return (
      art.name.toLowerCase().includes(query) ||
      art.title.toLowerCase().includes(query) ||
      art.specialty.toLowerCase().includes(query) ||
      art.bio.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0d0d0d] border border-white/15">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-1">
            [ RESIDENT MASTERS &bull; {siteData.artists.length} PRACTITIONERS ]
          </span>
          <h2 className="font-serif text-lg uppercase tracking-wider text-white">
            Artists Names, Specialties & Biographies
          </h2>
          <p className="text-xs text-white/60 font-mono mt-1">
            Edit artist names (e.g. Amit Kumar, Nikhil Nayak), titles, styles, experience, bios, and quotes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="border border-white/15 bg-[#0a0a0a] p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 border border-white/20 bg-[#121212] overflow-hidden">
                    <img
                      src={artist.portraitImage.src}
                      alt={artist.name}
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-white/40 uppercase block">
                      Resident Artist #{index + 1} &bull; {artist.id}
                    </span>
                    <h3 className="font-serif text-base uppercase tracking-wider text-white font-semibold">
                      {artist.name}
                    </h3>
                  </div>
                </div>

                <div className="border border-white/15 px-2 py-1 font-mono text-[10px] text-white/70">
                  {artist.experienceYears} Years Exp
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Artist Full Name
                    </label>
                    <input
                      type="text"
                      value={artist.name}
                      onChange={(e) => updateArtistItem(artist.id, { name: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-serif tracking-wide focus:border-white focus:outline-none"
                      placeholder="e.g. Amit Kumar"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={artist.title}
                      onChange={(e) => updateArtistItem(artist.id, { title: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                      placeholder="e.g. Master Fine-Line Specialist"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Specialty & Style Focus
                    </label>
                    <input
                      type="text"
                      value={artist.specialty}
                      onChange={(e) => updateArtistItem(artist.id, { specialty: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                      placeholder="Single-Needle Fine Line, Micro-Botanicals..."
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={artist.experienceYears}
                      onChange={(e) =>
                        updateArtistItem(artist.id, { experienceYears: parseInt(e.target.value) || 0 })
                      }
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={artist.instagramHandle}
                    onChange={(e) => updateArtistItem(artist.id, { instagramHandle: e.target.value })}
                    className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="@artist.lines"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                    Biography
                  </label>
                  <textarea
                    rows={3}
                    value={artist.bio}
                    onChange={(e) => updateArtistItem(artist.id, { bio: e.target.value })}
                    className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
                    placeholder="Full background, classical training, and stylistic lineage..."
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                    Artistic Philosophy Quote
                  </label>
                  <textarea
                    rows={2}
                    value={artist.philosophy}
                    onChange={(e) => updateArtistItem(artist.id, { philosophy: e.target.value })}
                    className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-serif italic focus:border-white focus:outline-none leading-relaxed"
                    placeholder="A tattoo is not an ornament on the body; it is the skin speaking its memory in silence."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
