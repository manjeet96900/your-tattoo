/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Layers, Plus, Trash2, Tag, CheckCircle2 } from 'lucide-react';

interface ServicesEditorProps {
  searchQuery: string;
}

export const ServicesEditor: React.FC<ServicesEditorProps> = ({ searchQuery }) => {
  const { siteData, updateServiceItem } = useSiteData();
  const query = searchQuery.toLowerCase().trim();

  const filteredServices = siteData.services.filter((srv) => {
    if (!query) return true;
    return (
      srv.title.toLowerCase().includes(query) ||
      srv.slug.toLowerCase().includes(query) ||
      srv.shortDescription.toLowerCase().includes(query) ||
      (srv.idealFor && srv.idealFor.toLowerCase().includes(query))
    );
  });

  const handleFeatureChange = (serviceId: string, featureIdx: number, val: string) => {
    const srv = siteData.services.find((s) => s.id === serviceId);
    if (!srv) return;
    const features = [...srv.features];
    features[featureIdx] = val;
    updateServiceItem(serviceId, { features });
  };

  const handleAddFeature = (serviceId: string) => {
    const srv = siteData.services.find((s) => s.id === serviceId);
    if (!srv) return;
    updateServiceItem(serviceId, { features: [...srv.features, 'New bespoke feature detail'] });
  };

  const handleRemoveFeature = (serviceId: string, featureIdx: number) => {
    const srv = siteData.services.find((s) => s.id === serviceId);
    if (!srv) return;
    const features = srv.features.filter((_, idx) => idx !== featureIdx);
    updateServiceItem(serviceId, { features });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0d0d0d] border border-white/15">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-1">
            [ STUDIO DISCIPLINES &bull; {siteData.services.length} ACTIVE SERVICES ]
          </span>
          <h2 className="font-serif text-lg uppercase tracking-wider text-white">
            Services Names, Descriptions & Details
          </h2>
          <p className="text-xs text-white/60 font-mono mt-1">
            Edit service names, short summaries for homepage cards, detailed atelier copy, and key features.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/50">
          <span>Showing {filteredServices.length} of {siteData.services.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="border border-white/15 bg-[#0a0a0a] p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-white/20 bg-white/5 font-mono text-xs font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] text-white/40 uppercase block">
                      ID: {service.id} &bull; /services/{service.slug}
                    </span>
                    <h3 className="font-serif text-base uppercase tracking-wider text-white font-semibold">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {service.image?.src && (
                  <div className="h-10 w-14 shrink-0 overflow-hidden border border-white/20 bg-[#121212]">
                    <img
                      src={service.image.src}
                      alt={service.image.alt || service.title}
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Service Name / Title
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateServiceItem(service.id, { title: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-serif tracking-wide focus:border-white focus:outline-none"
                      placeholder="e.g. Fine-Line Tattoo"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={service.slug}
                      onChange={(e) => updateServiceItem(service.id, { slug: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                      placeholder="e.g. fine-line-tattoos"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                    Short Description (Homepage Card Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={service.shortDescription}
                    onChange={(e) =>
                      updateServiceItem(service.id, { shortDescription: e.target.value })
                    }
                    className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
                    placeholder="Brief description for the service card grid..."
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                    Detailed Description (Dedicated Service Page)
                  </label>
                  <textarea
                    rows={3}
                    value={service.detailedDescription || ''}
                    onChange={(e) =>
                      updateServiceItem(service.id, { detailedDescription: e.target.value })
                    }
                    className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white/90 focus:border-white focus:outline-none leading-relaxed"
                    placeholder="Full in-depth description for the atelier page..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Ideal For
                    </label>
                    <input
                      type="text"
                      value={service.idealFor || ''}
                      onChange={(e) =>
                        updateServiceItem(service.id, { idealFor: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                      placeholder="e.g. Botanicals, typography, micro-geometry."
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                      Process Summary
                    </label>
                    <input
                      type="text"
                      value={service.processSummary || ''}
                      onChange={(e) =>
                        updateServiceItem(service.id, { processSummary: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                      placeholder="e.g. Single-needle micro calibration & vellum draft."
                    />
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-[10px] tracking-wider uppercase text-white/70">
                      Feature Highlights
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature(service.id)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Feature</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white/40 shrink-0" />
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(service.id, fIdx, e.target.value)
                          }
                          className="w-full bg-[#141414] border border-white/15 px-2.5 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(service.id, fIdx)}
                          className="p-1 text-white/40 hover:text-rose-400 transition-colors"
                          title="Remove feature"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
