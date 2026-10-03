/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LinksEditor } from '@/src/components/admin/LinksEditor';
import { Link2 } from 'lucide-react';

interface LinksPageProps {
  searchQuery: string;
}

export const LinksPage: React.FC<LinksPageProps> = ({ searchQuery }) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase">
              [ URLS &amp; ROUTING &bull; NAVIGATION ]
            </span>
          </div>
          <h1 className="font-serif text-2xl uppercase tracking-wider text-white">
            Website Links &amp; Navigation Manager
          </h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            Manage primary navbar links, WhatsApp chat triggers, Instagram profile URLs, Google Maps directions, Mehendi switcher link, and CTA destinations.
          </p>
        </div>
      </div>

      <LinksEditor searchQuery={searchQuery} />
    </div>
  );
};
