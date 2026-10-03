/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { useNavigation } from '@/src/context/NavigationContext';
import {
  Image as ImageIcon,
  Type,
  Link2,
  Building2,
  Sparkles,
  ArrowRight,
  HardDrive,
  Database,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    siteData,
    totalSlots,
    modifiedCount,
    lastSavedTime,
    isDiskConnected,
    isSupabaseConnected,
  } = useSiteData();
  const { navigate } = useNavigation();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden border border-white/15 bg-gradient-to-r from-[#0c0c0c] via-[#080808] to-[#0c0c0c] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
                Studio Control Center &bull; Operational
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl uppercase tracking-wider text-white">
              Your Story Tattoo Admin Portal
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/60 mt-2 max-w-2xl leading-relaxed">
              Welcome to your centralized studio management console. Select any dedicated module below
              to customize your studio's images, editorial text copy, navigation links, and operational parameters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 border border-white/10 bg-black/50 text-right">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                Codebase Disk
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-400 flex items-center gap-1.5 justify-end">
                <HardDrive className="h-3 w-3" />
                {isDiskConnected ? 'Connected (Auto-save)' : 'Local File Active'}
              </span>
            </div>

            <div className="px-4 py-2.5 border border-white/10 bg-black/50 text-right">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                Supabase Storage
              </span>
              <span className="font-mono text-xs font-semibold text-sky-400 flex items-center gap-1.5 justify-end">
                <Database className="h-3 w-3" />
                {isSupabaseConnected ? 'your-tattoo Bucket' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Images Manager Card */}
        <div
          onClick={() => navigate('/admin/images')}
          className="group relative border border-white/15 bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/60 hover:bg-[#0e0e0e] transition-all cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border border-amber-400/30 bg-amber-400/10 text-amber-300 transition-transform group-hover:scale-110">
                <ImageIcon className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 border border-amber-400/20 bg-amber-400/5">
                {totalSlots} SLOTS
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-1">
              [ MODULE 01 // VISUAL ASSETS ]
            </span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
              Images Manager
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
              Control all {totalSlots} visual slots with direct drag-and-drop uploads, Supabase cloud sync,
              aspect ratio guides, and instant live preview across the studio website.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-white/50">
              <span className="text-emerald-400 font-medium">{modifiedCount} Custom Inks</span>
              <span>&bull;</span>
              <span>{totalSlots - modifiedCount} Default Assets</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-amber-400 group-hover:text-amber-300">
            <span>Open Images Suite</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* 2. Text & Content Manager Card */}
        <div
          onClick={() => navigate('/admin/text')}
          className="group relative border border-white/15 bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between hover:border-sky-400/60 hover:bg-[#0e0e0e] transition-all cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border border-sky-400/30 bg-sky-400/10 text-sky-300 transition-transform group-hover:scale-110">
                <Type className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold text-sky-400 px-2 py-0.5 border border-sky-400/20 bg-sky-400/5">
                HEADINGS & COPY
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-1">
              [ MODULE 02 // EDITORIAL ]
            </span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white group-hover:text-sky-300 transition-colors">
              Text & Headings
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
              Edit all website headings, hero headlines, manifesto philosophy, 9 services titles and summaries,
              20 gallery pieces, artist biographies, process steps, and FAQs.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Hero Copy</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">9 Services</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">20 Gallery</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">4 Artists</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-sky-400 group-hover:text-sky-300">
            <span>Open Text Editor</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* 3. Links & Navigation Manager Card */}
        <div
          onClick={() => navigate('/admin/links')}
          className="group relative border border-white/15 bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-400/60 hover:bg-[#0e0e0e] transition-all cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 transition-transform group-hover:scale-110">
                <Link2 className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 border border-emerald-400/20 bg-emerald-400/5">
                {siteData.navigation.length} NAV LINKS
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-1">
              [ MODULE 03 // URLS & NAVIGATION ]
            </span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
              Website Links & URLs
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
              Manage header navbar links, mobile menu items, WhatsApp direct chat link, Instagram URL,
              Google Maps location, Mehendi switcher URL, and CTA destination buttons.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Navbar Menu</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">WhatsApp</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Google Maps</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Mehendi URL</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300">
            <span>Manage All Links</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* 4. Studio & Contact Settings Card */}
        <div
          onClick={() => navigate('/admin/studio')}
          className="group relative border border-white/15 bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between hover:border-purple-400/60 hover:bg-[#0e0e0e] transition-all cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border border-purple-400/30 bg-purple-400/10 text-purple-300 transition-transform group-hover:scale-110">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold text-purple-400 px-2 py-0.5 border border-purple-400/20 bg-purple-400/5">
                STUDIO INFO
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-1">
              [ MODULE 04 // OPERATIONS ]
            </span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white group-hover:text-purple-300 transition-colors">
              Studio & Contact Settings
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
              Configure studio branding, official telephone numbers, email address, physical address,
              weekly opening hours schedules, and footer legal disclaimers.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Opening Hours</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Address Suite</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Legal Notices</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-purple-400 group-hover:text-purple-300">
            <span>Edit Studio Parameters</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* 5. Extensions & Future Addons Card */}
        <div
          onClick={() => navigate('/admin/extensions')}
          className="group relative border border-dashed border-white/20 bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between hover:border-white/40 hover:bg-[#0e0e0e] transition-all cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white/80 transition-transform group-hover:scale-110">
                <PlusCircle className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-mono text-xs font-bold text-white/70 px-2 py-0.5 border border-white/20 bg-white/5">
                FUTURE ADDONS
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-1">
              [ MODULE 05 // EXTENSIBLE ]
            </span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white group-hover:text-white transition-colors">
              Modules & Extensions
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
              Modular extension architecture ready for plug-and-play future studio features such as
              Booking Inquiries Log, Google Analytics Integration, SEO Meta Tags, and Custom Landing Pages.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/40">
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Booking Logs</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Analytics</span>
              <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">SEO Tools</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/70 group-hover:text-white">
            <span>Explore Addon Slots</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
