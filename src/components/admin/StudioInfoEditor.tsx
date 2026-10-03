/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Building2, Phone, Mail, Clock, MapPin, Sparkles, Shield, Globe } from 'lucide-react';

interface StudioInfoEditorProps {
  searchQuery: string;
}

export const StudioInfoEditor: React.FC<StudioInfoEditorProps> = ({ searchQuery }) => {
  const { siteData, updateStudioInfo, updateSiteData } = useSiteData();
  const { studio, footer } = siteData;

  const handleOpeningHoursChange = (idx: number, field: 'days' | 'hours', val: string) => {
    const openingHours = [...studio.contact.openingHours];
    openingHours[idx] = { ...openingHours[idx], [field]: val };
    updateStudioInfo({
      contact: { ...studio.contact, openingHours },
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Studio Identity & Mehendi Switcher */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Building2 className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ IDENTITY & BRANDING ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Studio Name, Taglines & Mehendi Integration
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Studio Official Name
            </label>
            <input
              type="text"
              value={studio.name}
              onChange={(e) => updateStudioInfo({ name: e.target.value })}
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-serif tracking-widest focus:border-white focus:outline-none"
              placeholder="YOUR STORY TATTOO"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Studio Tagline
            </label>
            <input
              type="text"
              value={studio.tagline}
              onChange={(e) => updateStudioInfo({ tagline: e.target.value })}
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="YOUR STORY. INKED FOREVER."
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-amber-400 mb-1.5">
              Mehendi Brand Name (Navbar Switcher)
            </label>
            <input
              type="text"
              value={studio.contact.mehendiBrandName || 'Rishabh Mehandi'}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, mehendiBrandName: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-amber-400/40 px-3.5 py-2 text-xs text-white font-serif tracking-wider focus:border-amber-400 focus:outline-none"
              placeholder="Rishabh Mehandi"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-amber-400 mb-1.5">
              Mehendi Website URL
            </label>
            <input
              type="text"
              value={studio.contact.mehendiWebsiteUrl || 'https://yourstorymehendi.com'}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, mehendiWebsiteUrl: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-amber-400/40 px-3.5 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
              placeholder="https://yourstorymehendi.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Core Brand Philosophy Statement
            </label>
            <textarea
              rows={2}
              value={studio.coreBrandMessage}
              onChange={(e) => updateStudioInfo({ coreBrandMessage: e.target.value })}
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 2. Contact Numbers, WhatsApp, Email & Socials */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Phone className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ COMMUNICATIONS & SOCIALS ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Direct Contact, WhatsApp & Instagram
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Display Phone Number
            </label>
            <input
              type="text"
              value={studio.contact.phoneDisplay}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, phoneDisplay: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="+91 98200 12345"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Raw Phone for tel: Links
            </label>
            <input
              type="text"
              value={studio.contact.phoneRaw}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, phoneRaw: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="+919820012345"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-emerald-400 mb-1.5">
              WhatsApp Number (digits only without +)
            </label>
            <input
              type="text"
              value={studio.contact.whatsappNumber}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, whatsappNumber: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-emerald-500/40 px-3.5 py-2 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
              placeholder="919820012345"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Studio Inquiry Email
            </label>
            <input
              type="email"
              value={studio.contact.email}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, email: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="enquire@yourstorytattoo.com"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Instagram Handle
            </label>
            <input
              type="text"
              value={studio.contact.instagramHandle}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, instagramHandle: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="@yourstorytattoo"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="text"
              value={studio.contact.instagramUrl}
              onChange={(e) =>
                updateStudioInfo({
                  contact: { ...studio.contact, instagramUrl: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              placeholder="https://instagram.com/yourstorytattoo"
            />
          </div>
        </div>
      </div>

      {/* 3. Opening Hours & Physical Sanctuary Address */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Clock className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ SCHEDULE & SANCTUARY LOCATION ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Studio Operating Hours & Address
            </h2>
          </div>
        </div>

        {/* Operating Hours Rows */}
        <div className="space-y-3 mb-6">
          <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70">
            Studio Operating Hours
          </label>
          {studio.contact.openingHours.map((schedule, sIdx) => (
            <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={schedule.days}
                onChange={(e) => handleOpeningHoursChange(sIdx, 'days', e.target.value)}
                className="w-full bg-[#141414] border border-white/20 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                placeholder="e.g. Monday – Friday"
              />
              <input
                type="text"
                value={schedule.hours}
                onChange={(e) => handleOpeningHoursChange(sIdx, 'hours', e.target.value)}
                className="w-full bg-[#141414] border border-white/20 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                placeholder="e.g. 10:00 AM – 10:00 PM"
              />
            </div>
          ))}
        </div>

        {/* Address Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Street Address & Studio Suite
            </label>
            <input
              type="text"
              value={studio.address.street}
              onChange={(e) =>
                updateStudioInfo({
                  address: { ...studio.address, street: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              District / Area
            </label>
            <input
              type="text"
              value={studio.address.district}
              onChange={(e) =>
                updateStudioInfo({
                  address: { ...studio.address, district: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={studio.address.city}
              onChange={(e) =>
                updateStudioInfo({
                  address: { ...studio.address, city: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Postal Code / PIN
            </label>
            <input
              type="text"
              value={studio.address.postalCode}
              onChange={(e) =>
                updateStudioInfo({
                  address: { ...studio.address, postalCode: e.target.value },
                })
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Footer Legal & Copyright */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Shield className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ FOOTER & LEGAL ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Footer Notices, Age Disclaimer & Copyright
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Legal Notice Text
            </label>
            <input
              type="text"
              value={footer.legalNotice}
              onChange={(e) =>
                updateSiteData((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, legalNotice: e.target.value },
                }))
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-white/70 mb-1.5">
              Age Restriction / 18+ Notice
            </label>
            <input
              type="text"
              value={footer.disclaimer}
              onChange={(e) =>
                updateSiteData((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, disclaimer: e.target.value },
                }))
              }
              className="w-full bg-[#141414] border border-white/20 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
