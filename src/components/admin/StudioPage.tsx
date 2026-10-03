/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudioInfoEditor } from '@/src/components/admin/StudioInfoEditor';
import { Building2 } from 'lucide-react';

interface StudioPageProps {
  searchQuery: string;
}

export const StudioPage: React.FC<StudioPageProps> = ({ searchQuery }) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-purple-400 uppercase">
              [ STUDIO OPERATIONS &bull; IDENTITY &amp; HOURS ]
            </span>
          </div>
          <h1 className="font-serif text-2xl uppercase tracking-wider text-white">
            Studio Information &amp; Contact Parameters
          </h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            Manage studio name, brand philosophy, telephone contact numbers, physical address, weekly opening hours, and footer legal notices.
          </p>
        </div>
      </div>

      <StudioInfoEditor searchQuery={searchQuery} />
    </div>
  );
};
