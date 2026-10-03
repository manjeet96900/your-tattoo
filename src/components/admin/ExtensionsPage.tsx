/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  PlusCircle,
  Calendar,
  BarChart3,
  Search,
  FileText,
  Bell,
  Mail,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';

export const ExtensionsPage: React.FC = () => {
  const extensionModules = [
    {
      id: 'booking-crm',
      title: 'Booking Inquiries & Client Leads CRM',
      category: 'Client Operations',
      status: 'Ready to Activate',
      icon: Calendar,
      color: 'text-amber-400',
      description:
        'A dedicated table to view, filter, export, and manage client consultation requests submitted through Web3Forms or direct booking forms.',
    },
    {
      id: 'analytics-tracking',
      title: 'Google Analytics & Pixel Tracking',
      category: 'Marketing & Traffic',
      status: 'Ready to Activate',
      icon: BarChart3,
      color: 'text-sky-400',
      description:
        'Inject Google Tag Manager (GTM-XXXXX), GA4 tracking ID, and Meta Pixel ID with one click without editing code files.',
    },
    {
      id: 'seo-social-cards',
      title: 'Advanced SEO & OpenGraph Card Builder',
      category: 'Search & Social',
      status: 'Active in siteData',
      icon: Search,
      color: 'text-emerald-400',
      description:
        'Manage meta keywords, Twitter summary cards, Schema.org JSON-LD local business rich snippets, and search engine preview descriptions.',
    },
    {
      id: 'custom-pages',
      title: 'Bespoke Custom Landing Pages',
      category: 'Content Architecture',
      status: 'Extensible',
      icon: FileText,
      color: 'text-purple-400',
      description:
        'Generate standalone landing pages for special guest spots, international artist conventions, and flash tattoo charity events.',
    },
    {
      id: 'newsletter-dispatch',
      title: 'Newsletter & VIP Waitlist Dispatch',
      category: 'Client Engagement',
      status: 'Extensible',
      icon: Mail,
      color: 'text-rose-400',
      description:
        'Collect VIP client emails for seasonal diary openings and private studio invitations.',
    },
    {
      id: 'automated-reminders',
      title: 'WhatsApp Automated Appointment Reminders',
      category: 'Studio Automation',
      status: 'Extensible',
      icon: Zap,
      color: 'text-yellow-400',
      description:
        'Pre-formatted WhatsApp appointment confirmation links and tattoo aftercare instruction reminders sent automatically.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
              [ MODULAR ARCHITECTURE &bull; FUTURE EXTENSIONS ]
            </span>
          </div>
          <h1 className="font-serif text-2xl uppercase tracking-wider text-white">
            Addons, Extensions &amp; Future Modules
          </h1>
          <p className="text-xs text-white/60 font-sans mt-1">
            This workspace is pre-engineered for seamless modular upgrades. Whenever you request new features (like booking dashboards, analytics, or custom forms), they plug directly in here.
          </p>
        </div>
      </div>

      {/* Grid of Modular Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extensionModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="border border-white/15 bg-[#0a0a0a] p-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/5">
                    <Icon className={`h-4 w-4 ${mod.color}`} />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 text-white/70 uppercase">
                    {mod.status}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                  {mod.category}
                </span>
                <h3 className="font-serif text-base uppercase tracking-wider text-white font-semibold">
                  {mod.title}
                </h3>
                <p className="text-xs text-white/60 font-sans mt-2.5 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Module Slot #{mod.id}</span>
                <span className="text-amber-400">Ready to expand</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
