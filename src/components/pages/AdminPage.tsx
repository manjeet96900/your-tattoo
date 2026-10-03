/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { useNavigation } from '@/src/context/NavigationContext';
import { AdminDashboard } from '@/src/components/admin/AdminDashboard';
import { ImagesPage } from '@/src/components/admin/ImagesPage';
import { TextContentPage } from '@/src/components/admin/TextContentPage';
import { LinksPage } from '@/src/components/admin/LinksPage';
import { StudioPage } from '@/src/components/admin/StudioPage';
import { ExtensionsPage } from '@/src/components/admin/ExtensionsPage';
import {
  ArrowLeft,
  Download,
  Copy,
  RotateCcw,
  Search,
  Filter,
  Check,
  Layers,
  Sparkles,
  ExternalLink,
  X,
  Save,
  Loader2,
  HardDrive,
  Database,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  ShieldCheck,
  Type,
  Building2,
  HelpCircle,
  Image as ImageIcon,
  User,
  Link2,
  LayoutDashboard,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

export type AdminSection =
  | 'dashboard'
  | 'images'
  | 'text'
  | 'links'
  | 'studio'
  | 'extensions';

export const AdminPage: React.FC = () => {
  const {
    siteData,
    totalSlots,
    modifiedCount,
    exportSiteDataCode,
    saveAllToDisk,
    isDiskConnected,
    isSupabaseConnected,
    lastSavedTime,
    isSavingToDisk,
  } = useSiteData();
  const { currentPath, navigate } = useNavigation();

  // Authentication gate for Admin panel
  const ADMIN_PASSPHRASE = 'manjeet@Abd17';
  const AUTH_SESSION_KEY = 'yst_admin_authed_v1';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSPHRASE) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(false);
    navigate('/');
  };

  // Determine current active section based on currentPath
  const activeSection: AdminSection = useMemo(() => {
    if (currentPath === '/admin/images') return 'images';
    if (currentPath === '/admin/text') return 'text';
    if (currentPath === '/admin/links') return 'links';
    if (currentPath === '/admin/studio' || currentPath === '/admin/settings') return 'studio';
    if (currentPath === '/admin/extensions') return 'extensions';
    return 'dashboard';
  }, [currentPath]);

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);
  const [copiedSqlToast, setCopiedSqlToast] = useState(false);
  const [savedToDiskToast, setSavedToDiskToast] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Quick action: Save all current data to codebase disk
  const handleSaveToCodebase = async () => {
    const success = await saveAllToDisk();
    if (success) {
      setSavedToDiskToast(true);
      setTimeout(() => setSavedToDiskToast(false), 3000);
    }
  };

  // Quick action: Copy code to clipboard
  const handleCopyCode = () => {
    const code = exportSiteDataCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCodeToast(true);
      setTimeout(() => setCopiedCodeToast(false), 2500);
    });
  };

  // Quick action: Download siteData.ts
  const handleDownloadSiteData = () => {
    const code = exportSiteDataCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'siteData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const SUPABASE_SETUP_SQL = `-- 1. Create table for image overrides
CREATE TABLE IF NOT EXISTS public.site_images (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous reads & writes for real-time site updates
CREATE POLICY "Public Read" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.site_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON public.site_images FOR UPDATE USING (true);

-- 4. Enable public uploads to storage bucket 'your-tattoo'
CREATE POLICY "Public Storage Uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'your-tattoo');

CREATE POLICY "Public Storage Reads" ON storage.objects
FOR SELECT USING (bucket_id = 'your-tattoo');`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL).then(() => {
      setCopiedSqlToast(true);
      setTimeout(() => setCopiedSqlToast(false), 2500);
    });
  };

  // If not authenticated, render password lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F5F3] flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        {/* Top Bar */}
        <div className="flex items-center justify-between z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="relative flex h-8 w-8 items-center justify-center border border-white/30 bg-[#0c0c0c] transition-colors group-hover:border-white">
              <span className="font-mono text-[11px] font-medium tracking-tighter text-white">YS</span>
            </div>
            <span className="font-serif text-xs sm:text-sm font-medium tracking-[0.24em] text-white uppercase">
              YOUR STORY TATTOO
            </span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Website</span>
          </button>
        </div>

        {/* Center Password Dialog */}
        <div className="max-w-md w-full mx-auto my-auto z-10 py-12">
          <div className="border border-white/15 bg-[#0a0a0a] p-8 sm:p-10 shadow-2xl relative">
            <div className="absolute -top-[1px] -left-[1px] h-2 w-2 bg-white" />
            <div className="absolute -bottom-[1px] -right-[1px] h-2 w-2 bg-white" />

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-12 w-12 border border-white/20 bg-white/5 mb-4">
                <Lock className="h-5 w-5 text-white/80" />
              </div>
              <span className="block font-mono text-[10px] tracking-[0.28em] uppercase text-white/50 mb-2">
                [ RESTRICTED AREA // STUDIO ADMIN ]
              </span>
              <h1 className="font-serif text-xl sm:text-2xl uppercase tracking-wider text-white">
                Studio Admin Console
              </h1>
              <p className="font-mono text-xs text-white/60 mt-2 leading-relaxed">
                Enter your master passphrase to access separate management pages for images, editorial text, links, and studio parameters.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                  Admin Passphrase
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(false);
                    }}
                    placeholder="Enter admin password..."
                    autoFocus
                    required
                    className={`w-full bg-[#121212] border px-4 py-3 text-sm text-white placeholder-white/30 font-mono tracking-wide focus:outline-none transition-colors ${
                      authError
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-white/20 focus:border-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="font-mono text-xs text-rose-400 mt-2 flex items-center gap-1.5 animate-pulse">
                    <span>&times;</span> Incorrect password. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-3 px-4 font-mono text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer shadow-lg mt-2"
              >
                <KeyRound className="h-4 w-4" />
                <span>Unlock Admin Portal</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center font-mono text-[11px] text-white/30 tracking-wider z-10">
          YOUR STORY TATTOO &bull; STUDIO MANAGEMENT CONSOLE
        </div>
      </div>
    );
  }

  // Section title mapping for breadcrumbs
  const sectionTitleMap: Record<AdminSection, { label: string; icon: any }> = {
    dashboard: { label: 'Dashboard Hub', icon: LayoutDashboard },
    images: { label: 'Images Suite (58)', icon: ImageIcon },
    text: { label: 'Text & Headings', icon: Type },
    links: { label: 'Links & Navigation', icon: Link2 },
    studio: { label: 'Studio & Contact', icon: Building2 },
    extensions: { label: 'Modules & Extensions', icon: PlusCircle },
  };

  const CurrentSectionIcon = sectionTitleMap[activeSection].icon;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F3] pt-6 pb-20 px-3 sm:px-6 lg:px-8">
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1920px] mx-auto mb-6">
        {/* Brand Bar & Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="relative flex h-9 w-9 items-center justify-center border border-white/30 bg-[#0c0c0c] transition-colors group-hover:border-white">
                <span className="font-mono text-xs font-medium tracking-tighter text-white">YS</span>
              </div>
              <div>
                <span className="font-serif text-sm font-medium tracking-[0.24em] text-white uppercase block">
                  YOUR STORY TATTOO
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400 uppercase">
                  ADMIN CONSOLE
                </span>
              </div>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-white/40 pl-3 border-l border-white/15">
              <span>Admin</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium flex items-center gap-1.5">
                <CurrentSectionIcon className="h-3.5 w-3.5 text-white/80" />
                {sectionTitleMap[activeSection].label}
              </span>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Save to Codebase Button */}
            <button
              type="button"
              onClick={handleSaveToCodebase}
              disabled={isSavingToDisk}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-semibold transition-colors cursor-pointer shadow-sm"
              title="Save all changes directly into src/data/siteData.ts on disk"
            >
              {isSavingToDisk ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                  <span>Saving to Disk...</span>
                </>
              ) : savedToDiskToast ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Saved to siteData.ts!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Save to Codebase</span>
                </>
              )}
            </button>

            {/* Supabase SQL Button */}
            <button
              type="button"
              onClick={() => setShowSqlModal(true)}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 border border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/50 text-sky-300 transition-colors cursor-pointer"
              title="View & copy Supabase SQL schema"
            >
              <Database className="h-3.5 w-3.5 text-sky-400" />
              <span>Supabase SQL</span>
            </button>

            {/* Download siteData.ts */}
            <button
              type="button"
              onClick={handleDownloadSiteData}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
              title="Download updated siteData.ts file"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>

            {/* Return to Live Website */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 bg-white text-black font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

            {/* Lock / Exit Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 border border-white/20 bg-white/5 hover:bg-rose-950/40 hover:border-rose-500/50 hover:text-rose-300 text-white/80 transition-colors cursor-pointer"
              title="Lock Admin Panel and Log Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* Dual Persistence Status Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-3.5 py-2 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-black to-sky-950/30 text-xs font-mono my-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="font-semibold text-sky-300 uppercase tracking-wider">
                Supabase Cloud:
              </span>
              <span className="text-white/80 font-mono text-[11px]">
                cuywzwiclntitgwlrqts &bull; Bucket: <strong className="text-sky-300">your-tattoo</strong>
              </span>
            </div>

            <span className="text-white/20 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-emerald-300 uppercase tracking-wider">
                Codebase Disk:
              </span>
              <span className="text-white/70 text-[11px]">
                src/data/siteData.ts (Reactive)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-white/70">
            {lastSavedTime && (
              <span>Last sync: <strong className="text-white font-mono">{lastSavedTime}</strong></span>
            )}
            <span className="text-emerald-400/90 font-medium">All internet visitors updated live</span>
          </div>
        </div>

        {/* Dedicated Admin Page Switcher Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-white/15 pb-4 mb-8 pt-2">
          {/* Main Navigation Pages */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'dashboard'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dashboard Hub</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/images')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'images'
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Images Suite ({totalSlots})</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/text')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'text'
                  ? 'bg-sky-400 text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Type className="h-3.5 w-3.5" />
              <span>Text &amp; Headings</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/links')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'links'
                  ? 'bg-emerald-400 text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              <span>Links &amp; URLs ({siteData.navigation.length})</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/studio')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'studio'
                  ? 'bg-purple-400 text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Studio &amp; Contact</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/extensions')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'extensions'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Modules &amp; Extensions</span>
            </button>
          </div>

          {/* Global Search Filter */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search current section..."
              className="w-full bg-[#0c0c0c] border border-white/15 pl-8 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* ----------------- DEDICATED SECTION CONTENT PAGES ----------------- */}
        {activeSection === 'dashboard' && <AdminDashboard />}
        {activeSection === 'images' && <ImagesPage searchQuery={searchQuery} />}
        {activeSection === 'text' && <TextContentPage searchQuery={searchQuery} />}
        {activeSection === 'links' && <LinksPage searchQuery={searchQuery} />}
        {activeSection === 'studio' && <StudioPage searchQuery={searchQuery} />}
        {activeSection === 'extensions' && <ExtensionsPage />}
      </div>

      {/* Supabase SQL Setup Modal */}
      {showSqlModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setShowSqlModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-sky-500/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4 text-sky-400" />
                <h3 className="font-serif text-lg text-white">Supabase SQL Schema &amp; Storage Setup</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="font-mono text-xs text-white/70 mb-3 leading-relaxed">
              To allow instant cloud uploads to your <strong className="text-sky-300">your-tattoo</strong> bucket and live cross-device table sync, copy this SQL snippet and run it in your{' '}
              <strong className="text-white">Supabase Dashboard &rarr; SQL Editor &rarr; New Query &rarr; Run</strong>:
            </p>

            <div className="relative mb-4">
              <pre className="p-3 bg-black border border-white/15 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-56 leading-relaxed select-all">
                {SUPABASE_SETUP_SQL}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="font-mono text-[11px] text-white/50">
                Creates <code className="text-sky-300">site_images</code> table &amp; unlocks bucket policies
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs bg-sky-500 hover:bg-sky-400 text-black font-semibold transition-colors cursor-pointer"
                >
                  {copiedSqlToast ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-black" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy SQL Snippet</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSqlModal(false)}
                  className="px-3 py-2 font-mono text-xs border border-white/20 text-white hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
