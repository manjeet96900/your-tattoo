/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { siteData } = useSiteData();
  const { faqs } = siteData;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="relative border-b border-white/10 bg-[#050505] py-12 sm:py-16 text-[#F5F5F3]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5">
            <SectionHeading
              badge={siteData.sectionHeadings?.faqs?.badge || 'Studio Clarity & Inquiries'}
              title={siteData.sectionHeadings?.faqs?.title || 'FREQUENTLY ASKED'}
              description={siteData.sectionHeadings?.faqs?.description || 'Transparent answers regarding custom design preparation, sterile hygiene standards, consultation dynamics, and healing protocols.'}
            />
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-[#A3A3A0] leading-relaxed">
                Have a unique design question or specific medical consideration? Our resident artists
                are available for one-on-one private consultations prior to ink application.
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Accordion List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={faq.id} className="py-5 sm:py-6">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg tracking-wide uppercase text-white group-hover:text-amber-200 transition-colors">
                      {faq.question}
                    </span>
                    <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
                      isOpen
                        ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                        : 'border-white/20 text-[#A3A3A0] group-hover:border-white group-hover:text-white'
                    }`}>
                      {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${faq.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-xs sm:text-sm text-[#9E9E9C] leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
