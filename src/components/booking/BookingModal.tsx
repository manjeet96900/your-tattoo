/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '@/src/context/NavigationContext';
import { siteData } from '@/src/data/siteData';
import { Button } from '@/src/components/ui/Button';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Shield, Clock, Phone } from 'lucide-react';

interface BookingFormData {
  serviceId: string;
  artistId: string;
  placement: string;
  size: string;
  storyNarrative: string;
  referenceLinks: string;
  timelinePreference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredTiming: string;
  ageConfirmed: boolean;
  depositAcknowledged: boolean;
}

export const BookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, bookingInitialData } = useNavigation();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: 'srv-3', // Default Custom Tattoo
    artistId: 'any',
    placement: 'Forearm',
    size: 'Medium (4–6 in)',
    storyNarrative: '',
    referenceLinks: '',
    timelinePreference: 'Within the next 4 weeks',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredTiming: 'Flexible / Any Day',
    ageConfirmed: false,
    depositAcknowledged: false,
  });

  // Pre-fill if opened with initial data
  useEffect(() => {
    if (bookingInitialData) {
      if (bookingInitialData.artistId) {
        setFormData((prev) => ({ ...prev, artistId: bookingInitialData.artistId! }));
      }
      if (bookingInitialData.serviceId) {
        setFormData((prev) => ({ ...prev, serviceId: bookingInitialData.serviceId! }));
      }
    }
  }, [bookingInitialData]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isBookingOpen]);

  const handleClose = () => {
    setIsBookingOpen(false);
    // Reset to step 1 after exit animation
    setTimeout(() => {
      setStep(1);
      setErrors({});
    }, 300);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.serviceId) newErrors.serviceId = 'Please select a discipline.';
    if (!formData.placement) newErrors.placement = 'Please specify anatomical placement.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.storyNarrative.trim() || formData.storyNarrative.length < 10) {
      newErrors.storyNarrative = 'Please provide a brief description of your concept or story (min 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.clientName.trim()) newErrors.clientName = 'Full name is required.';
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      newErrors.clientEmail = 'A valid email is required.';
    }
    if (!formData.clientPhone.trim() || formData.clientPhone.length < 7) {
      newErrors.clientPhone = 'Phone or WhatsApp number is required.';
    }
    if (!formData.ageConfirmed) {
      newErrors.ageConfirmed = 'You must confirm you are 18 years of age or older.';
    }
    if (!formData.depositAcknowledged) {
      newErrors.depositAcknowledged = 'Please acknowledge the studio consultation deposit policy.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    // Simulate real studio dispatch & booking generation
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const randomCode = `YST-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceId(randomCode);
    setIsSubmitting(false);
    setStep(4); // Success screen
  };

  if (!isBookingOpen) return null;

  const placements = [
    'Forearm',
    'Ribs & Sternum',
    'Spine & Back',
    'Shoulder / Bicep',
    'Leg & Thigh',
    'Ankle & Foot',
    'Wrist & Hand',
    'Neck & Collarbone',
    'Other / Full Body',
  ];

  const sizes = [
    'Micro (< 2 inches)',
    'Small (2 – 4 inches)',
    'Medium (4 – 6 inches)',
    'Large (6 – 10 inches)',
    'Multi-Session / Sleeve / Back',
  ];

  const selectedArtist =
    formData.artistId === 'any'
      ? { name: 'Any Available Resident Master' }
      : siteData.artists.find((a) => a.id === formData.artistId) || { name: 'Resident Master' };

  const selectedService =
    siteData.services.find((s) => s.id === formData.serviceId) || siteData.services[0];

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl border border-white/20 bg-[#0a0a0a] shadow-2xl my-auto text-[#F5F5F3] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#080808]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-white/80">
                {siteData.studio.name} // INTAKE PROTOCOL
              </span>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close intake dialog"
              className="flex h-8 w-8 items-center justify-center border border-white/15 text-[#9E9E9C] hover:border-white hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stepper Indicator (only visible for steps 1-3) */}
          {step < 4 && (
            <div className="grid grid-cols-3 border-b border-white/10 bg-[#060606] text-center font-mono text-[10px] tracking-widest uppercase">
              <div
                className={`py-3 px-2 border-r border-white/10 transition-colors ${
                  step === 1 ? 'bg-white/10 text-white font-medium' : 'text-[#9E9E9C]/60'
                }`}
              >
                01 // INTENT & PLACEMENT
              </div>
              <div
                className={`py-3 px-2 border-r border-white/10 transition-colors ${
                  step === 2 ? 'bg-white/10 text-white font-medium' : 'text-[#9E9E9C]/60'
                }`}
              >
                02 // CONCEPT & STORY
              </div>
              <div
                className={`py-3 px-2 transition-colors ${
                  step === 3 ? 'bg-white/10 text-white font-medium' : 'text-[#9E9E9C]/60'
                }`}
              >
                03 // CLIENT & DATES
              </div>
            </div>
          )}

          {/* Body Form Container */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {/* STEP 1: Creative Intent */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2
                    id="booking-modal-title"
                    className="font-serif text-2xl uppercase tracking-wide text-white mb-1"
                  >
                    SELECT DISCIPLINE & PLACEMENT
                  </h2>
                  <p className="text-xs text-[#9E9E9C]">
                    Every session is customized. Choose your desired artistic style and anatomical location.
                  </p>
                </div>

                {/* Service Discipline Grid */}
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2">
                    AESTHETIC DISCIPLINE:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {siteData.services.map((s) => {
                      const isSelected = formData.serviceId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceId: s.id })}
                          className={`p-3 text-left border text-xs transition-all ${
                            isSelected
                              ? 'border-white bg-white text-black font-medium'
                              : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40 hover:text-white'
                          }`}
                        >
                          <span className="block font-serif uppercase tracking-wider truncate">
                            {s.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.serviceId && (
                    <p className="font-mono text-[10px] text-amber-300 mt-1">{errors.serviceId}</p>
                  )}
                </div>

                {/* Artist Preference */}
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2">
                    RESIDENT ARTIST PREFERENCE:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, artistId: 'any' })}
                      className={`p-3 text-left border text-xs transition-all ${
                        formData.artistId === 'any'
                          ? 'border-white bg-white/15 text-white'
                          : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40'
                      }`}
                    >
                      <span className="font-serif uppercase tracking-wider block">First Available Master</span>
                      <span className="font-mono text-[10px] text-[#9E9E9C] block mt-0.5">
                        Matched to your aesthetic
                      </span>
                    </button>
                    {siteData.artists.map((a) => {
                      const isSelected = formData.artistId === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, artistId: a.id })}
                          className={`p-3 text-left border text-xs transition-all ${
                            isSelected
                              ? 'border-white bg-white/15 text-white'
                              : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40'
                          }`}
                        >
                          <span className="font-serif uppercase tracking-wider block">{a.name}</span>
                          <span className="font-mono text-[10px] text-[#9E9E9C] block mt-0.5 truncate">
                            {a.specialty.split(',')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Anatomical Placement */}
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2">
                    ANATOMICAL PLACEMENT:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {placements.map((p) => {
                      const isSelected = formData.placement === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setFormData({ ...formData, placement: p })}
                          className={`px-3 py-2 text-xs border transition-colors ${
                            isSelected
                              ? 'border-white bg-white text-black font-medium'
                              : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Approximate Size */}
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2">
                    APPROXIMATE SCALE:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => {
                      const isSelected = formData.size === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({ ...formData, size: s })}
                          className={`px-3 py-2 text-xs border transition-colors ${
                            isSelected
                              ? 'border-white bg-white text-black font-medium'
                              : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={nextStep}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    <span>Proceed to Narrative</span>
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Personal Narrative */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-serif text-2xl uppercase tracking-wide text-white mb-1">
                    YOUR STORY & INSPIRATION
                  </h2>
                  <p className="text-xs text-[#9E9E9C]">
                    We do not reproduce flash art. Describe the emotional chapter, memory, or concept behind your piece.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="intake-story"
                    className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2"
                  >
                    THE STORY OR CONCEPT BEHIND THIS PIECE: *
                  </label>
                  <textarea
                    id="intake-story"
                    rows={5}
                    value={formData.storyNarrative}
                    onChange={(e) => setFormData({ ...formData, storyNarrative: e.target.value })}
                    placeholder="e.g., A memory of walking the coastline with my grandfather, represented through botanical contours and an astronomical compass..."
                    className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs leading-relaxed text-white placeholder-white/30 focus:border-white focus:outline-none"
                  />
                  {errors.storyNarrative && (
                    <p className="font-mono text-[10px] text-amber-300 mt-1">{errors.storyNarrative}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="intake-references"
                    className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2"
                  >
                    REFERENCE LINKS / MOODBOARDS (OPTIONAL):
                  </label>
                  <input
                    id="intake-references"
                    type="text"
                    value={formData.referenceLinks}
                    onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                    placeholder="Pinterest board, Dropbox link, Google Drive, or reference notes"
                    className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase text-white/80 block mb-2">
                    PREFERRED SESSION TIMELINE:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Within the next 2 weeks',
                      'Within the next 4–6 weeks',
                      'Flexible / Traveling into city',
                    ].map((time) => {
                      const isSelected = formData.timelinePreference === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, timelinePreference: time })}
                          className={`p-2.5 text-xs text-left border transition-colors ${
                            isSelected
                              ? 'border-white bg-white text-black font-medium'
                              : 'border-white/10 bg-[#0d0d0d] text-[#9E9E9C] hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Back / Next buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    <ArrowLeft className="h-3 w-3 mr-2" />
                    <span>Back</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={nextStep}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    <span>Proceed to Contact</span>
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Client Contact & Agreement */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="font-serif text-2xl uppercase tracking-wide text-white mb-1">
                    CLIENT DETAILS & SANCTUARY POLICIES
                  </h2>
                  <p className="text-xs text-[#9E9E9C]">
                    Provide your contact information so our studio concierge can deliver the design quote and proposed appointment dates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-name"
                      className="font-mono text-[10px] tracking-widest uppercase text-white/80 block mb-1.5"
                    >
                      FULL NAME: *
                    </label>
                    <input
                      id="intake-name"
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                    />
                    {errors.clientName && (
                      <p className="font-mono text-[10px] text-amber-300 mt-1">{errors.clientName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="intake-email"
                      className="font-mono text-[10px] tracking-widest uppercase text-white/80 block mb-1.5"
                    >
                      EMAIL ADDRESS: *
                    </label>
                    <input
                      id="intake-email"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                    />
                    {errors.clientEmail && (
                      <p className="font-mono text-[10px] text-amber-300 mt-1">{errors.clientEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="intake-phone"
                      className="font-mono text-[10px] tracking-widest uppercase text-white/80 block mb-1.5"
                    >
                      PHONE / WHATSAPP NUMBER: *
                    </label>
                    <input
                      id="intake-phone"
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                    />
                    {errors.clientPhone && (
                      <p className="font-mono text-[10px] text-amber-300 mt-1">{errors.clientPhone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="intake-timing"
                      className="font-mono text-[10px] tracking-widest uppercase text-white/80 block mb-1.5"
                    >
                      PREFERRED APPOINTMENT DAYS:
                    </label>
                    <select
                      id="intake-timing"
                      value={formData.preferredTiming}
                      onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                      className="w-full border border-white/20 bg-[#0c0c0c] p-3 text-xs text-white focus:border-white focus:outline-none"
                    >
                      <option value="Flexible / Any Day">Flexible / Any Day</option>
                      <option value="Weekdays (Mon–Fri)">Weekdays (Mon–Fri)</option>
                      <option value="Weekends (Sat–Sun)">Weekends (Sat–Sun)</option>
                      <option value="Morning Sessions (11 AM – 2 PM)">Morning Sessions (11 AM – 2 PM)</option>
                      <option value="Afternoon Sessions (3 PM – 8 PM)">Afternoon Sessions (3 PM – 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Policy Acknowledgments */}
                <div className="border border-white/10 bg-[#070707] p-4 flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ageConfirmed}
                      onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded-none border-white/30 bg-transparent text-white focus:ring-0"
                    />
                    <span className="text-[11px] text-[#9E9E9C] leading-normal">
                      I confirm that I am at least 18 years of age and can present government-issued photo identification upon arrival at the studio sanctuary.
                    </span>
                  </label>
                  {errors.ageConfirmed && (
                    <p className="font-mono text-[10px] text-amber-300 pl-7">{errors.ageConfirmed}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.depositAcknowledged}
                      onChange={(e) => setFormData({ ...formData, depositAcknowledged: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded-none border-white/30 bg-transparent text-white focus:ring-0"
                    />
                    <span className="text-[11px] text-[#9E9E9C] leading-normal">
                      I understand that securing a private studio session requires a 20% non-refundable design deposit applied toward the final cost of the session.
                    </span>
                  </label>
                  {errors.depositAcknowledged && (
                    <p className="font-mono text-[10px] text-amber-300 pl-7">{errors.depositAcknowledged}</p>
                  )}
                </div>

                {/* Back / Submit buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    <ArrowLeft className="h-3 w-3 mr-2" />
                    <span>Back</span>
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="text-xs tracking-[0.24em] uppercase py-3.5 px-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border border-black border-t-transparent" />
                        <span>Transmitting Brief...</span>
                      </span>
                    ) : (
                      <span>Submit Consultation Request</span>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4: Success & Confirmation State */}
            {step === 4 && (
              <div className="text-center py-6 sm:py-10">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-white/30 bg-white/10">
                  <Check className="h-6 w-6 text-white" />
                </div>

                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#9E9E9C] block mb-2">
                  // INTAKE DISPATCH CONFIRMED
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wide text-white mb-3">
                  CONSULTATION REQUEST RECEIVED
                </h2>

                <div className="mx-auto max-w-md border border-white/15 bg-[#060606] p-4 sm:p-5 mb-6 text-left font-mono text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#9E9E9C]">REFERENCE CODE:</span>
                    <span className="text-white font-bold">{referenceId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#9E9E9C]">DISCIPLINE:</span>
                    <span className="text-white">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#9E9E9C]">ARTIST:</span>
                    <span className="text-white">{selectedArtist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9E9C]">RESPONSE WINDOW:</span>
                    <span className="text-white">Within 24–48 studio hours</span>
                  </div>
                </div>

                <p className="max-w-md mx-auto text-xs text-[#9E9E9C] leading-relaxed mb-8">
                  Our resident master will review your story concept and prepare preliminary placement recommendations. A dedicated studio concierge will contact you via WhatsApp / email with booking dates.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/${siteData.studio.contact.phoneRaw.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20have%20submitted%20consultation%20intake%20${referenceId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/30 bg-[#0d0d0d] px-6 py-3 text-xs font-mono uppercase tracking-wider text-white hover:border-white transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>WhatsApp Studio Desk</span>
                  </a>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleClose}
                    className="text-xs tracking-[0.2em] uppercase"
                  >
                    Return to Sanctuary
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer reassurance bar */}
          <div className="border-t border-white/10 bg-[#050505] px-6 py-3 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#9E9E9C]/60 uppercase">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3 w-3" />
              <span>Confidential Story Intake</span>
            </span>
            <span>100% Sterile Sanctuary</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
