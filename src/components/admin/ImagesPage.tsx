/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { AdminCard } from '@/src/components/admin/AdminCard';
import {
  Image as ImageIcon,
  HardDrive,
  Sparkles,
  RotateCcw,
  X,
  Database,
  Check,
  Copy,
} from 'lucide-react';

interface ImagesPageProps {
  searchQuery: string;
}

export const ImagesPage: React.FC<ImagesPageProps> = ({ searchQuery }) => {
  const {
    allSlots,
    totalSlots,
    modifiedCount,
    resetAllSlots,
  } = useSiteData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [previewModal, setPreviewModal] = useState<{ url: string; title: string } | null>(null);

  const categories = [
    'All',
    'Brand & Logo',
    'Hero',
    'Services',
    'Artists',
    'Process',
    'Editorial',
    'Instagram',
    'Gallery',
    'Modified',
  ];

  // Filter slots
  const filteredSlots = allSlots.filter((slot) => {
    // 1. Category filter
    if (selectedCategory === 'Modified') {
      if (!slot.isModified) return false;
    } else if (selectedCategory !== 'All' && slot.category !== selectedCategory) {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = slot.title.toLowerCase().includes(q);
      const matchCat = slot.category.toLowerCase().includes(q);
      const matchDesc = slot.description.toLowerCase().includes(q);
      const matchNum = `slot #${slot.slotNumber}`.includes(q) || `${slot.slotNumber}` === q;
      return matchTitle || matchCat || matchDesc || matchNum;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase">
              [ VISUAL ASSETS &bull; {totalSlots} MANAGED SLOTS ]
            </span>
          </div>
          <h1 className="font-serif text-2xl uppercase tracking-wider text-white">
            Images &amp; Photography Suite
          </h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            Upload studio photography directly into any card, sync to Supabase storage, and see updates live.
          </p>
        </div>

        {modifiedCount > 0 && (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 border border-rose-500/30 bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Overrides ({modifiedCount})</span>
          </button>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 border border-white/10 bg-[#0a0a0a]">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Total Image Slots
          </span>
          <span className="font-mono text-lg font-bold text-white">{totalSlots} Cards</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Horizontal Row Layout
          </span>
          <span className="font-mono text-lg font-bold text-white">6 Cards / Row</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Live Custom Overrides
          </span>
          <span className="font-mono text-lg font-bold text-emerald-400">
            {modifiedCount} Active
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            File Persistence Mode
          </span>
          <span className="font-mono text-lg font-bold text-emerald-400 flex items-center gap-1.5">
            <HardDrive className="h-4 w-4" />
            Codebase Disk
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? totalSlots
              : cat === 'Modified'
              ? modifiedCount
              : allSlots.filter((s) => s.category === cat).length;

          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-2.5 py-1.5 border transition-all ${
                isSelected
                  ? 'bg-amber-400 text-black border-amber-400 font-bold'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat} <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 58-Card Responsive Grid (6 cards per row) */}
      <div className="max-w-[1920px] mx-auto">
        {filteredSlots.length === 0 ? (
          <div className="p-12 text-center border border-white/10 bg-[#0c0c0c] my-4">
            <p className="font-mono text-sm text-white/60 mb-2">No matching image slots found.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="font-mono text-xs uppercase px-3 py-1.5 border border-white/20 text-white hover:bg-white/10"
            >
              Reset Category Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredSlots.map((slot) => (
              <AdminCard
                key={slot.id}
                slot={slot}
                onPreviewModal={(url, title) => setPreviewModal({ url, title })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0e0e0e] border border-white/20 p-6 shadow-2xl">
            <h3 className="font-serif text-lg text-white mb-2 uppercase">Reset All Image Slots?</h3>
            <p className="font-mono text-xs text-white/70 mb-6">
              This will remove all custom uploaded URLs and revert every card back to the original studio defaults.
            </p>
            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 border border-white/20 text-white/80 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAllSlots();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 bg-rose-600 text-white font-medium hover:bg-rose-500"
              >
                Confirm Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Size Image Preview Modal */}
      {previewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setPreviewModal(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-white/20 p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-2 border-b border-white/10 mb-2">
              <h4 className="font-serif text-sm text-white">{previewModal.title}</h4>
              <button
                type="button"
                onClick={() => setPreviewModal(null)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={previewModal.url}
                alt={previewModal.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
