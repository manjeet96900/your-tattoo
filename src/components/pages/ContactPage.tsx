/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { useSiteData } from '@/src/context/SiteDataContext';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteData } = useSiteData();
  const { studio, artists } = siteData;
  const { address, contact } = studio;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    artist: 'Any Specialist',
    style: 'Fine Line',
    placement: '',
    description: '',
    budget: '$300 – $600',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#080808]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#9E9E9C]">
                {siteData.sectionHeadings?.contactPage?.badge || '// INITIATE DIALOGUE'}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide uppercase text-white mb-6">
              {siteData.sectionHeadings?.contactPage?.title || 'CONTACT &'} <br />
              <span className="italic font-light">{siteData.sectionHeadings?.contactPage?.subtitle || 'CONSULTATION INQUIRY'}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#9E9E9C] leading-relaxed font-light">
              {siteData.sectionHeadings?.contactPage?.description || 'We operate exclusively by appointment to ensure unhurried focus. Fill out the brief below with your tattoo concept, placement, and preferred artist to begin the conversation.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid: Form + Studio Details */}
      <section className="py-12 sm:py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Comprehensive Consultation Brief Form */}
            <div className="lg:col-span-7 border border-white/15 bg-[#0a0a0a] p-6 sm:p-10">
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl uppercase tracking-wider text-white mb-3">
                    INQUIRY RECEIVED
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9E9C] max-w-md mx-auto leading-relaxed mb-8">
                    Thank you, <span className="text-white">{formState.name}</span>. Our studio manager and chosen artist
                    will review your narrative brief within 24 business hours to coordinate your consultation date.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        artist: 'Any Specialist',
                        style: 'Fine Line',
                        placement: '',
                        description: '',
                        budget: '$300 – $600',
                      });
                    }}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="border-b border-white/10 pb-3 mb-2">
                    <span className="font-mono text-xs tracking-widest text-[#9E9E9C] uppercase">
                      01 // YOUR IDENTIFIERS
                    </span>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Maya Sharma"
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. maya@example.com"
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Preferred Artist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Preferred Artist
                      </label>
                      <select
                        value={formState.artist}
                        onChange={(e) => setFormState({ ...formState, artist: e.target.value })}
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white focus:border-white focus:outline-none"
                      >
                        <option value="Any Specialist">Any Matching Specialist</option>
                        {artists.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name} ({a.specialty.split(',')[0]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Concept Style & Placement */}
                  <div className="border-b border-white/10 pb-3 mt-4 mb-2">
                    <span className="font-mono text-xs tracking-widest text-[#9E9E9C] uppercase">
                      02 // PIECE PARAMETERS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Aesthetic Style
                      </label>
                      <select
                        value={formState.style}
                        onChange={(e) => setFormState({ ...formState, style: e.target.value })}
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white focus:border-white focus:outline-none"
                      >
                        <option value="Fine Line">Fine Line / Micro Detail</option>
                        <option value="Black & Grey">Black &amp; Grey Realism</option>
                        <option value="Geometric">Sacred Geometry / Dotwork</option>
                        <option value="Calligraphy">Minimalist Typography / Script</option>
                        <option value="Cover-Up">Tattoo Cover-Up / Metamorphosis</option>
                        <option value="Laser Removal">Laser Tattoo Removal</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                        Anatomical Placement &amp; Size
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.placement}
                        onChange={(e) => setFormState({ ...formState, placement: e.target.value })}
                        placeholder="e.g. Inner forearm, ~10cm"
                        className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="font-mono text-xs uppercase text-[#9E9E9C] block mb-2">
                      Narrative Idea / Conceptual Story *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      placeholder="Share what this tattoo represents, any symbolic elements, memory references, or visual motifs you envision..."
                      className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-white focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#9E9E9C] uppercase tracking-widest">
                      100% Confidential Brief
                    </span>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="text-xs tracking-[0.24em] uppercase"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Send Consultation Inquiry'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Physical Location & Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="border border-white/15 bg-[#0a0a0a] p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-white/40" />
                  <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#9E9E9C]">
                    STUDIO SANCTUARY
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-xs font-mono tracking-widest uppercase">
                    <MapPin className="h-3.5 w-3.5 text-white/70" />
                    <span>Physical Address</span>
                  </div>
                  <p className="text-xs text-[#9E9E9C] leading-relaxed">
                    {address.street}
                    <br />
                    {address.district}
                    <br />
                    {address.city} {address.postalCode}, {address.country}
                  </p>
                  <a
                    href={address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider text-white underline underline-offset-4 mt-1 hover:text-white/80"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-xs font-mono tracking-widest uppercase">
                    <Clock className="h-3.5 w-3.5 text-white/70" />
                    <span>Appointment Hours</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-[#9E9E9C]">
                    {contact.openingHours.map((slot, sIdx) => (
                      <div key={sIdx} className="flex justify-between gap-4">
                        <span className="text-white/80">{slot.days}</span>
                        <span>{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex flex-col gap-3 text-xs text-[#9E9E9C]">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-white/70" />
                    <a href={`tel:${contact.phoneRaw}`} className="hover:text-white transition-colors">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-white/70" />
                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation Policy Card */}
              <div className="border border-white/10 bg-[#080808] p-6 text-xs text-[#9E9E9C] leading-relaxed">
                <h4 className="font-serif text-sm uppercase text-white tracking-wider mb-2">
                  CONSULTATION PROTOCOL
                </h4>
                <p>
                  Initial consultations are 45 minutes and free of charge. If you proceed with custom drafting,
                  a non-refundable deposit of ₹2,000 / $50 is applied toward your final session balance to secure
                  your artist’s studio lockout time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
