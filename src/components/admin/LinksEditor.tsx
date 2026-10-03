/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import {
  Link2,
  ExternalLink,
  Plus,
  Trash2,
  Globe,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Compass,
  Layers,
  Check,
} from 'lucide-react';

interface LinksEditorProps {
  searchQuery: string;
}

export const LinksEditor: React.FC<LinksEditorProps> = ({ searchQuery }) => {
  const {
    siteData,
    updateNavigationLink,
    addNavigationLink,
    removeNavigationLink,
    updateHeroText,
    updateContactLinks,
    updateAddressLinks,
    updateSeoLinks,
    updateArtistItem,
  } = useSiteData();

  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkHref, setNewLinkHref] = useState('');
  const [showAddNavModal, setShowAddNavModal] = useState(false);

  const query = searchQuery.toLowerCase().trim();

  const handleAddNavLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkLabel.trim() || !newLinkHref.trim()) return;

    const id = `nav-${Date.now()}`;
    addNavigationLink({
      id,
      label: newLinkLabel.trim(),
      href: newLinkHref.trim(),
      isExternal: newLinkHref.startsWith('http://') || newLinkHref.startsWith('https://'),
    });

    setNewLinkLabel('');
    setNewLinkHref('');
    setShowAddNavModal(false);
  };

  const matchesSearch = (texts: (string | undefined)[]) => {
    if (!query) return true;
    return texts.some((t) => t && t.toLowerCase().includes(query));
  };

  return (
    <div className="space-y-10">
      {/* 1. PRIMARY NAVBAR NAVIGATION LINKS */}
      {matchesSearch([
        'nav',
        'navigation',
        'menu',
        'navbar',
        ...siteData.navigation.map((n) => `${n.label} ${n.href}`),
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
                <Compass className="h-4 w-4 text-white/80" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                  [ HEADER & MOBILE DRAWER NAVIGATION ]
                </span>
                <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                  Main Navbar Menu Links ({siteData.navigation.length})
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddNavModal(!showAddNavModal)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 font-mono text-xs uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="h-3.5 w-3.5 text-emerald-400" />
              <span>Add Custom Nav Link</span>
            </button>
          </div>

          {/* Add Nav Link Inline Form */}
          {showAddNavModal && (
            <form
              onSubmit={handleAddNavLink}
              className="mb-6 p-4 border border-emerald-500/30 bg-emerald-950/20 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
            >
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-emerald-300 mb-1">
                  Link Label (e.g. "Gallery")
                </label>
                <input
                  type="text"
                  value={newLinkLabel}
                  onChange={(e) => setNewLinkLabel(e.target.value)}
                  placeholder="e.g. VIP Atelier"
                  required
                  className="w-full bg-[#121212] border border-white/20 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-emerald-300 mb-1">
                  Target Path / URL (e.g. "/gallery" or "https://...")
                </label>
                <input
                  type="text"
                  value={newLinkHref}
                  onChange={(e) => setNewLinkHref(e.target.value)}
                  placeholder="e.g. /vip or https://..."
                  required
                  className="w-full bg-[#121212] border border-white/20 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-1.5 px-3 font-mono text-xs uppercase bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors cursor-pointer"
                >
                  Save Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddNavModal(false)}
                  className="py-1.5 px-3 font-mono text-xs uppercase border border-white/20 text-white/70 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Navigation Links List */}
          <div className="space-y-3">
            {siteData.navigation.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 border border-white/10 bg-[#0d0d0d]"
              >
                <div className="flex items-center gap-2 sm:w-16">
                  <span className="flex h-6 w-6 items-center justify-center border border-white/20 bg-white/5 font-mono text-[10px] text-white/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-mono text-white/50 uppercase block mb-1">
                      Menu Item Label
                    </label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateNavigationLink(item.id, { label: e.target.value })}
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wide focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-white/50 uppercase block mb-1">
                      Path or URL Link
                    </label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateNavigationLink(item.id, { href: e.target.value })}
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="p-1.5 text-white/50 hover:text-white border border-white/10 bg-white/5"
                    title="Test Open Link"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  {siteData.navigation.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeNavigationLink(item.id)}
                      className="p-1.5 text-white/40 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 bg-white/5"
                      title="Remove navigation link"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SOCIAL, WHATSAPP & MEHENDI LINKS */}
      {matchesSearch([
        'social',
        'instagram',
        'whatsapp',
        'mehendi',
        siteData.studio.contact.instagramUrl,
        siteData.studio.contact.instagramHandle,
        siteData.studio.contact.whatsappNumber,
        siteData.studio.contact.mehendiWebsiteUrl,
        siteData.studio.contact.mehendiBrandName,
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Instagram className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ SOCIAL PLATFORMS & DIRECT CHAT ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Instagram, WhatsApp & Mehendi URLs
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram URL */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-pink-400 uppercase flex items-center gap-1.5">
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram Profile
                </span>
                <a
                  href={siteData.studio.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Instagram Full URL
                  </label>
                  <input
                    type="url"
                    value={siteData.studio.contact.instagramUrl}
                    onChange={(e) => updateContactLinks({ instagramUrl: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="https://instagram.com/yourstorytattoo"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Instagram Handle Display
                  </label>
                  <input
                    type="text"
                    value={siteData.studio.contact.instagramHandle}
                    onChange={(e) => updateContactLinks({ instagramHandle: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="@yourstorytattoo"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Chat */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  WhatsApp Direct Chat
                </span>
                <a
                  href={`https://wa.me/${siteData.studio.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1"
                >
                  <span>Test WhatsApp</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    WhatsApp Phone Digits (Country code + Number, no + or spaces)
                  </label>
                  <input
                    type="text"
                    value={siteData.studio.contact.whatsappNumber}
                    onChange={(e) => updateContactLinks({ whatsappNumber: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="919820012345"
                  />
                </div>

                <div className="p-2 border border-white/10 bg-black/40 text-[10px] font-mono text-white/60">
                  Target Link: <span className="text-emerald-400">https://wa.me/{siteData.studio.contact.whatsappNumber}</span>
                </div>
              </div>
            </div>

            {/* Mehendi Switcher URL */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Mehendi Brand Switcher
                </span>
                <a
                  href={siteData.studio.contact.mehendiWebsiteUrl || 'https://yourstorymehendi.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1"
                >
                  <span>Test Mehendi URL</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Mehendi Website URL
                  </label>
                  <input
                    type="url"
                    value={siteData.studio.contact.mehendiWebsiteUrl || ''}
                    onChange={(e) => updateContactLinks({ mehendiWebsiteUrl: e.target.value })}
                    className="w-full bg-[#161616] border border-amber-400/30 px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="https://yourstorymehendi.com"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Brand Name on Switcher Button
                  </label>
                  <input
                    type="text"
                    value={siteData.studio.contact.mehendiBrandName || 'Rishabh Mehandi'}
                    onChange={(e) => updateContactLinks({ mehendiBrandName: e.target.value })}
                    className="w-full bg-[#161616] border border-amber-400/30 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-amber-400 focus:outline-none"
                    placeholder="Rishabh Mehandi"
                  />
                </div>
              </div>
            </div>

            {/* Google Maps Directions URL */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Google Maps Directions Link
                </span>
                <a
                  href={siteData.studio.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1"
                >
                  <span>Open Map</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    value={siteData.studio.address.googleMapsUrl}
                    onChange={(e) => updateAddressLinks({ googleMapsUrl: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="https://maps.google.com/?q=Your+Story+Tattoo"
                  />
                </div>

                <div className="p-2 border border-white/10 bg-black/40 text-[10px] font-mono text-white/60 truncate">
                  Target Link: <span className="text-sky-400">{siteData.studio.address.googleMapsUrl}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO & CTA ACTION BUTTON LINKS */}
      {matchesSearch([
        'cta',
        'hero',
        'button',
        siteData.hero.ctaPrimary.label,
        siteData.hero.ctaSecondary.label,
        siteData.hero.ctaSecondary.href,
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Link2 className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ CALL TO ACTION BUTTON LINKS ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Homepage Hero CTA Action & Link
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary CTA */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase block mb-3">
                Primary Button Action (Opens Interactive Booking Suite)
              </span>
              <div>
                <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                  Primary Button Label
                </label>
                <input
                  type="text"
                  value={siteData.hero.ctaPrimary.label}
                  onChange={(e) =>
                    updateHeroText({
                      ctaPrimary: { ...siteData.hero.ctaPrimary, label: e.target.value },
                    })
                  }
                  className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  placeholder="Book Consultation"
                />
              </div>
            </div>

            {/* Secondary CTA Link */}
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase block mb-3">
                Secondary Button Target Link
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.ctaSecondary.label}
                    onChange={(e) =>
                      updateHeroText({
                        ctaSecondary: { ...siteData.hero.ctaSecondary, label: e.target.value },
                      })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="Explore Our Work"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Destination Path / URL
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.ctaSecondary.href}
                    onChange={(e) =>
                      updateHeroText({
                        ctaSecondary: { ...siteData.hero.ctaSecondary, href: e.target.value },
                      })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    placeholder="/gallery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ARTIST SOCIAL LINKS */}
      {matchesSearch([
        'artist',
        'instagram',
        ...siteData.artists.map((a) => `${a.name} ${a.instagramHandle}`),
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Instagram className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ ARTIST SOCIAL PROFILES ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Resident Masters Instagram Handles & Links
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteData.artists.map((artist) => (
              <div key={artist.id} className="border border-white/10 bg-[#0d0d0d] p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-serif text-xs text-white font-medium truncate">
                    {artist.name}
                  </span>
                  {artist.instagramHandle && (
                    <a
                      href={`https://instagram.com/${artist.instagramHandle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white"
                      title="Test Instagram"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={artist.instagramHandle || ''}
                  onChange={(e) =>
                    updateArtistItem(artist.id, { instagramHandle: e.target.value })
                  }
                  className="w-full bg-[#161616] border border-white/15 px-2.5 py-1 text-xs text-white font-mono focus:border-white focus:outline-none"
                  placeholder="@handle"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SEO & BASE DOMAIN CANONICAL */}
      {matchesSearch([
        'seo',
        'canonical',
        'domain',
        'site url',
        siteData.studio.seo?.siteUrl,
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Globe className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ CANONICAL & BASE DOMAIN ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Base Website URL & SEO Links
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                Canonical Base Website URL
              </label>
              <input
                type="url"
                value={siteData.studio.seo?.siteUrl || 'https://yourstorytattoo.com'}
                onChange={(e) =>
                  updateSeoLinks({
                    ...siteData.studio.seo,
                    siteUrl: e.target.value,
                  })
                }
                className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                placeholder="https://yourstorytattoo.com"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
                OpenGraph Preview Image Path
              </label>
              <input
                type="text"
                value={siteData.studio.seo?.ogImage || '/images/hero/hero-01.webp'}
                onChange={(e) =>
                  updateSeoLinks({
                    ...siteData.studio.seo,
                    ogImage: e.target.value,
                  })
                }
                className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                placeholder="/images/hero/hero-01.webp"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
