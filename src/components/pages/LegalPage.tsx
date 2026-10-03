/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { siteData } from '@/src/data/siteData';
import { useNavigation } from '@/src/context/NavigationContext';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { studio } = siteData;
  const { navigate } = useNavigation();

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy & Data Policy' : 'Terms of Service & Health Waiver';
  const lastUpdated = 'October 2025';

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F5F3]">
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-white/10 bg-[#080808]">
        <Container size="narrow">
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E9E9C] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return Home</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-6 bg-white/40" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#9E9E9C]">
              // LEGAL ARCHIVE
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide uppercase text-white mb-4">
            {title}
          </h1>

          <p className="font-mono text-xs text-[#9E9E9C] uppercase tracking-widest">
            LAST REVISED: {lastUpdated} &bull; {studio.name}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24 border-b border-white/10">
        <Container size="narrow">
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#9E9E9C] leading-relaxed flex flex-col gap-8">
            {isPrivacy ? (
              <>
                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    01 // Collection of Personal Details
                  </h2>
                  <p>
                    When you request a tattoo consultation or book a studio session at Your Story Tattoo,
                    we collect essential identifying information including your full name, contact numbers,
                    email address, medical history disclosures relevant to skin procedures, and design notes.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    02 // Confidentiality of Narrative & Conceptual Briefs
                  </h2>
                  <p>
                    We acknowledge that many custom tattoo concepts emerge from deeply personal, vulnerable,
                    or commemorative life events. We pledge strict studio confidentiality. Your narrative
                    is shared exclusively with your designated resident artist and is never commercialized.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    03 // Photography & Portfolio Rights
                  </h2>
                  <p>
                    Studio photography of fresh or healed tattoos is captured solely with explicit verbal and
                    written client consent. Clients may opt out of facial identity inclusion or social media
                    archival publications without prejudice.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    04 // Contact & Data Rectification
                  </h2>
                  <p>
                    For inquiries regarding data records or to request permanent record deletion, contact
                    our privacy liaison at <span className="text-white">{studio.contact.email}</span>.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    01 // Age Mandate & Identification Verification
                  </h2>
                  <p>
                    Clients must be at least 18 years of age on the date of appointment. Valid government-issued
                    photographic identification (Passport, Driving License, National ID) is strictly verified
                    prior to ink application. No exceptions or parental sign-offs apply.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    02 // Health & Medical Disclosure Waiver
                  </h2>
                  <p>
                    Clients must disclose any active skin ailments, blood disorders, epilepsy, diabetes, pregnancy,
                    or use of anticoagulants. We reserve the absolute right to decline tattooing if procedure safety
                    or physiological healing cannot be guaranteed.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    03 // Studio Deposits & Rescheduling Protocol
                  </h2>
                  <p>
                    All appointment lockouts require an advance non-refundable deposit that applies toward the
                    session total. Rescheduling requires a minimum of 48 hours notice. Failure to arrive or
                    cancellations within 48 hours forfeit the studio lockout deposit.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-lg uppercase text-white tracking-wider mb-2">
                    04 // Intellectual Property of Bespoke Artwork
                  </h2>
                  <p>
                    All preliminary sketches, digital mockups, and tattoo artwork conceived by our artists remain
                    the intellectual property of Your Story Tattoo and the contributing resident artist. Designs are
                    guaranteed 1-of-1 and will never be reproduced on another client.
                  </p>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
