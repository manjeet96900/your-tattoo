/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { HelpCircle, CheckSquare, MessageSquareQuote, GitCommit } from 'lucide-react';

interface ProcessFaqEditorProps {
  searchQuery: string;
}

export const ProcessFaqEditor: React.FC<ProcessFaqEditorProps> = ({ searchQuery }) => {
  const {
    siteData,
    updateProcessStage,
    updateWhyYourStoryItem,
    updateFAQItem,
    updateTestimonialItem,
  } = useSiteData();

  const query = searchQuery.toLowerCase().trim();

  return (
    <div className="space-y-10">
      {/* 1. PROCESS & PROTOCOL (4 STAGES) */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <GitCommit className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ THE RITUAL // 4 STAGES ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Creative Process & Protocol Stages
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteData.processStages.map((stage) => (
            <div key={stage.step} className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase block mb-3">
                Stage {stage.step} // {stage.title}
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Stage Title
                  </label>
                  <input
                    type="text"
                    value={stage.title}
                    onChange={(e) => updateProcessStage(stage.step, { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={stage.tagline}
                    onChange={(e) => updateProcessStage(stage.step, { tagline: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Narrative Summary
                  </label>
                  <textarea
                    rows={2}
                    value={stage.description}
                    onChange={(e) =>
                      updateProcessStage(stage.step, { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/90 focus:border-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WHY YOUR STORY (5 PILLARS) */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <CheckSquare className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ THE COMMITMENT // 5 PILLARS ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Foundational Principles & Pillars
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.whyYourStory.map((pillar) => (
            <div key={pillar.id} className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase block mb-3">
                Pillar {pillar.number} &bull; {pillar.id}
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Pillar Title
                  </label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => updateWhyYourStoryItem(pillar.id, { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={pillar.tagline}
                    onChange={(e) =>
                      updateWhyYourStoryItem(pillar.id, { tagline: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={pillar.description}
                    onChange={(e) =>
                      updateWhyYourStoryItem(pillar.id, { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/90 focus:border-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TESTIMONIALS & CLIENT STORIES */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <MessageSquareQuote className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ CLIENT NARRATIVES // REVIEWS ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Client Testimonials & Stories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.testimonials.map((test) => (
            <div key={test.id} className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase block mb-3">
                Review &bull; {test.id} ({test.year})
              </span>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={test.clientName}
                      onChange={(e) =>
                        updateTestimonialItem(test.id, { clientName: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-2.5 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      value={test.artistName}
                      onChange={(e) =>
                        updateTestimonialItem(test.id, { artistName: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-2.5 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Tattoo Story Title
                  </label>
                  <input
                    type="text"
                    value={test.tattooStory}
                    onChange={(e) =>
                      updateTestimonialItem(test.id, { tattooStory: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-2.5 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Quote
                  </label>
                  <textarea
                    rows={4}
                    value={test.quote}
                    onChange={(e) => updateTestimonialItem(test.id, { quote: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-2.5 py-1.5 text-xs text-white/90 focus:border-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <HelpCircle className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ FAQ ACCORDION // {siteData.faqs.length} ITEMS ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Frequently Asked Questions & Answers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteData.faqs.map((faq) => (
            <div key={faq.id} className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                {faq.category} &bull; {faq.id}
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFAQItem(faq.id, { question: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-medium focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => updateFAQItem(faq.id, { answer: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/90 focus:border-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
