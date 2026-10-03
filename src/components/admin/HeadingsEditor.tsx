/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSiteData } from '@/src/context/SiteDataContext';
import { Type, Sparkles, Layout, Compass } from 'lucide-react';

interface HeadingsEditorProps {
  searchQuery: string;
}

export const HeadingsEditor: React.FC<HeadingsEditorProps> = ({ searchQuery }) => {
  const { siteData, updateHeroText, updateStudioInfo, updateSectionHeading } = useSiteData();
  const headings = siteData.sectionHeadings || {};
  const query = searchQuery.toLowerCase().trim();

  // Helper filter
  const matchesSearch = (texts: (string | undefined)[]) => {
    if (!query) return true;
    return texts.some((t) => t && t.toLowerCase().includes(query));
  };

  return (
    <div className="space-y-10">
      {/* 1. HERO SECTION HEADINGS */}
      {matchesSearch([
        'hero',
        siteData.hero.headlinePrimary,
        siteData.hero.headlineSecondary,
        siteData.hero.subheadline,
        siteData.hero.ctaPrimary.label,
        siteData.hero.ctaSecondary.label,
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Sparkles className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ SECTION 00 // HERO BANNER ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Homepage Hero Headlines & Subtitle
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Primary Headline (e.g. "YOUR STORY.")
              </label>
              <input
                type="text"
                value={siteData.hero.headlinePrimary}
                onChange={(e) => updateHeroText({ headlinePrimary: e.target.value })}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-sm text-white font-serif tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="YOUR STORY."
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Secondary Headline (e.g. "INKED FOREVER.")
              </label>
              <input
                type="text"
                value={siteData.hero.headlineSecondary}
                onChange={(e) => updateHeroText({ headlineSecondary: e.target.value })}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-sm text-white font-serif tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="INKED FOREVER."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Hero Subheadline / Ethos Statement
              </label>
              <textarea
                rows={2}
                value={siteData.hero.subheadline}
                onChange={(e) => updateHeroText({ subheadline: e.target.value })}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-sm text-white font-sans focus:border-white focus:outline-none transition-colors leading-relaxed"
                placeholder="A sanctuary where personal narratives transform into enduring works of fine-line and custom tattoo art."
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={siteData.hero.ctaPrimary.label}
                onChange={(e) =>
                  updateHeroText({
                    ctaPrimary: { ...siteData.hero.ctaPrimary, label: e.target.value },
                  })
                }
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-xs text-white font-mono tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="Book Consultation"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={siteData.hero.ctaSecondary.label}
                onChange={(e) =>
                  updateHeroText({
                    ctaSecondary: { ...siteData.hero.ctaSecondary, label: e.target.value },
                  })
                }
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-xs text-white font-mono tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="Explore Our Work"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. THE MANIFESTO & BRAND STATEMENT */}
      {matchesSearch([
        'manifesto',
        siteData.studio.brandStatement.heading,
        siteData.studio.brandStatement.subheading,
        siteData.studio.tagline,
        ...siteData.studio.brandStatement.paragraphs,
      ]) && (
        <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
              <Type className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
                [ SECTION 01 // THE MANIFESTO ]
              </span>
              <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
                Brand Manifesto & Studio Philosophy
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Manifesto Subheading Eyebrow
              </label>
              <input
                type="text"
                value={siteData.studio.brandStatement.subheading}
                onChange={(e) =>
                  updateStudioInfo({
                    brandStatement: {
                      ...siteData.studio.brandStatement,
                      subheading: e.target.value,
                    },
                  })
                }
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-xs text-white font-mono tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="AN EDITORIAL SANCTUARY FOR BESPOKE TATTOO ARTISTRY"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Studio Global Tagline
              </label>
              <input
                type="text"
                value={siteData.studio.tagline}
                onChange={(e) => updateStudioInfo({ tagline: e.target.value })}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-xs text-white font-mono tracking-wider focus:border-white focus:outline-none transition-colors"
                placeholder="YOUR STORY. INKED FOREVER."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Manifesto Main Heading Quote
              </label>
              <input
                type="text"
                value={siteData.studio.brandStatement.heading}
                onChange={(e) =>
                  updateStudioInfo({
                    brandStatement: {
                      ...siteData.studio.brandStatement,
                      heading: e.target.value,
                    },
                  })
                }
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-base text-white font-serif tracking-wide focus:border-white focus:outline-none transition-colors"
                placeholder="Every line carries weight. Every shadow preserves a chapter."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Manifesto Paragraph 1
              </label>
              <textarea
                rows={2}
                value={siteData.studio.brandStatement.paragraphs[0] || ''}
                onChange={(e) => {
                  const paras = [...siteData.studio.brandStatement.paragraphs];
                  paras[0] = e.target.value;
                  updateStudioInfo({
                    brandStatement: { ...siteData.studio.brandStatement, paragraphs: paras },
                  });
                }}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-sm text-white font-sans focus:border-white focus:outline-none transition-colors leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-[11px] tracking-wider uppercase text-white/70 mb-2">
                Manifesto Paragraph 2
              </label>
              <textarea
                rows={2}
                value={siteData.studio.brandStatement.paragraphs[1] || ''}
                onChange={(e) => {
                  const paras = [...siteData.studio.brandStatement.paragraphs];
                  paras[1] = e.target.value;
                  updateStudioInfo({
                    brandStatement: { ...siteData.studio.brandStatement, paragraphs: paras },
                  });
                }}
                className="w-full bg-[#121212] border border-white/20 px-3.5 py-2.5 text-sm text-white font-sans focus:border-white focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. HOMEPAGE & GLOBAL SECTION HEADINGS */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Layout className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ ALL SECTIONS // TITLES & BADGES ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Website Section Headings & Eyebrows
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section: Featured Work */}
          {matchesSearch([
            'featured work',
            headings.featuredWork?.badge,
            headings.featuredWork?.title,
            headings.featuredWork?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                02 &bull; Homepage Portfolio / Featured Work
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.featuredWork?.badge || '02 // PORTFOLIO ARCHIVE'}
                    onChange={(e) =>
                      updateSectionHeading('featuredWork', { badge: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.featuredWork?.title || 'FEATURED WORK'}
                    onChange={(e) =>
                      updateSectionHeading('featuredWork', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.featuredWork?.description ||
                      'A curated selection of bespoke fine-line, geometry, and custom narrative tattoos executed in our studio.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('featuredWork', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Services & Disciplines */}
          {matchesSearch([
            'services',
            'disciplines',
            headings.services?.badge,
            headings.services?.title,
            headings.services?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                03 &bull; Homepage Services / Disciplines
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.services?.badge || '03 // SERVICES & DISCIPLINES'}
                    onChange={(e) => updateSectionHeading('services', { badge: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.services?.title || 'THE DISCIPLINES'}
                    onChange={(e) => updateSectionHeading('services', { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.services?.description ||
                      'From single-needle botanical minimalism to comprehensive cover-ups and safe laser tattoo removal, every session is executed under hospital-grade sterility.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('services', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Artists */}
          {matchesSearch([
            'artists',
            headings.artists?.badge,
            headings.artists?.title,
            headings.artists?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                04 &bull; Homepage Resident Masters / Artists
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.artists?.badge || '04 // THE RESIDENT MASTERS'}
                    onChange={(e) => updateSectionHeading('artists', { badge: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.artists?.title || 'OUR ARTISTS'}
                    onChange={(e) => updateSectionHeading('artists', { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.artists?.description ||
                      'Resident practitioners, each specializing in distinct tattoo idioms—from fine-line botanicals to micro-realism and geometric sacred geometry.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('artists', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Process */}
          {matchesSearch([
            'process',
            'protocol',
            headings.process?.badge,
            headings.process?.title,
            headings.process?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                05 &bull; The Process & Protocol
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.process?.badge || '05 // THE RITUAL'}
                    onChange={(e) => updateSectionHeading('process', { badge: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.process?.title || 'THE PROCESS'}
                    onChange={(e) => updateSectionHeading('process', { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.process?.description ||
                      'Four deliberate stages designed to transform an intimate memory or philosophical concept into permanent fine ink.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('process', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Why Your Story */}
          {matchesSearch([
            'why your story',
            'commitment',
            headings.whyYourStory?.badge,
            headings.whyYourStory?.title,
            headings.whyYourStory?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                06 &bull; Why Your Story / Commitment
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.whyYourStory?.badge || '06 // THE COMMITMENT'}
                    onChange={(e) =>
                      updateSectionHeading('whyYourStory', { badge: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.whyYourStory?.title || 'WHY YOUR STORY'}
                    onChange={(e) =>
                      updateSectionHeading('whyYourStory', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.whyYourStory?.description ||
                      'Our foundational principles govern every consultation, sketch, sterile packaging seal, and tattoo stroke.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('whyYourStory', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Testimonials */}
          {matchesSearch([
            'testimonials',
            'client narratives',
            headings.testimonials?.badge,
            headings.testimonials?.title,
            headings.testimonials?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                07 &bull; Client Stories & Narratives
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.testimonials?.badge || '07 // CLIENT NARRATIVES'}
                    onChange={(e) =>
                      updateSectionHeading('testimonials', { badge: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.testimonials?.title || 'STORIES INKED'}
                    onChange={(e) =>
                      updateSectionHeading('testimonials', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.testimonials?.description ||
                      'Reflections from clients who entrusted our studio with their most intimate and enduring chapters.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('testimonials', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: FAQs */}
          {matchesSearch([
            'faqs',
            'frequently asked',
            headings.faqs?.badge,
            headings.faqs?.title,
            headings.faqs?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                08 &bull; FAQs & Studio Clarity
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={headings.faqs?.badge || '08 // STUDIO CLARITY'}
                    onChange={(e) => updateSectionHeading('faqs', { badge: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={headings.faqs?.title || 'FREQUENTLY ASKED'}
                    onChange={(e) => updateSectionHeading('faqs', { title: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.faqs?.description ||
                      'Transparent answers regarding custom design preparation, sterile hygiene standards, consultation dynamics, and healing protocols.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('faqs', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Final CTA */}
          {matchesSearch([
            'final cta',
            'ready to tell',
            headings.finalCta?.badge,
            headings.finalCta?.title,
            headings.finalCta?.subtitle,
            headings.finalCta?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-amber-400/80 uppercase block mb-3">
                11 &bull; Bottom Booking Call to Action
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge Eyebrow
                    </label>
                    <input
                      type="text"
                      value={headings.finalCta?.badge || '[ COMMENCE YOUR CHAPTER ]'}
                      onChange={(e) =>
                        updateSectionHeading('finalCta', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle / Script
                    </label>
                    <input
                      type="text"
                      value={headings.finalCta?.subtitle || 'YOUR STORY?'}
                      onChange={(e) =>
                        updateSectionHeading('finalCta', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Primary Title
                  </label>
                  <input
                    type="text"
                    value={headings.finalCta?.title || 'READY TO TELL'}
                    onChange={(e) =>
                      updateSectionHeading('finalCta', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.finalCta?.description ||
                      'Whether you hold a fully formed conceptual drawing or simply a meaningful memory awaiting its artistic translation, our artists are here to listen.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('finalCta', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. DEDICATED PAGE BANNERS */}
      <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
            <Compass className="h-4 w-4 text-white/80" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 block">
              [ SUB-PAGES // BANNER HEADERS ]
            </span>
            <h2 className="font-serif text-lg sm:text-xl uppercase tracking-wider text-white">
              Full-Page Banner Headings & Descriptions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Page Banner */}
          {matchesSearch([
            'gallery page',
            headings.galleryPage?.badge,
            headings.galleryPage?.title,
            headings.galleryPage?.subtitle,
            headings.galleryPage?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                /gallery &bull; Gallery Page Banner
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={headings.galleryPage?.badge || '// PERMANENT RECORD'}
                      onChange={(e) =>
                        updateSectionHeading('galleryPage', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={headings.galleryPage?.subtitle || '& PORTFOLIO ARCHIVE'}
                      onChange={(e) =>
                        updateSectionHeading('galleryPage', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={headings.galleryPage?.title || 'THE GALLERY'}
                    onChange={(e) =>
                      updateSectionHeading('galleryPage', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.galleryPage?.description ||
                      'Every photograph below represents a bespoke narrative designed and tattooed within our studio. Click any piece to inspect high-resolution details, artist credentials, and story background.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('galleryPage', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Page Banner */}
          {matchesSearch([
            'services page',
            headings.servicesPage?.badge,
            headings.servicesPage?.title,
            headings.servicesPage?.subtitle,
            headings.servicesPage?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                /services &bull; Services Hub Page Banner
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={headings.servicesPage?.badge || '// STUDIO DISCIPLINES'}
                      onChange={(e) =>
                        updateSectionHeading('servicesPage', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={headings.servicesPage?.subtitle || '& TECHNIQUES'}
                      onChange={(e) =>
                        updateSectionHeading('servicesPage', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={headings.servicesPage?.title || 'THE DISCIPLINES'}
                    onChange={(e) =>
                      updateSectionHeading('servicesPage', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.servicesPage?.description ||
                      'From delicate single-needle fine line work and bespoke narrative sleeves to laser tattoo removal and anatomical piercings, each craft is performed under medical-grade sterility by dedicated specialists.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('servicesPage', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Artists Page Banner */}
          {matchesSearch([
            'artists page',
            headings.artistsPage?.badge,
            headings.artistsPage?.title,
            headings.artistsPage?.subtitle,
            headings.artistsPage?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                /artists &bull; Artists Directory Banner
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={headings.artistsPage?.badge || '// THE RESIDENT MASTERS'}
                      onChange={(e) =>
                        updateSectionHeading('artistsPage', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={headings.artistsPage?.subtitle || '& CRAFTSPEOPLE'}
                      onChange={(e) =>
                        updateSectionHeading('artistsPage', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={headings.artistsPage?.title || 'OUR ARTISTS'}
                    onChange={(e) =>
                      updateSectionHeading('artistsPage', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.artistsPage?.description ||
                      'We do not employ generalists. Each resident artist at Your Story has spent years immersing themselves in specific artistic idioms—from microscopic single-needle botanical work to chiaroscuro renaissance realism and structural scar cover-ups.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('artistsPage', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* About Page Banner */}
          {matchesSearch([
            'about page',
            headings.aboutPage?.badge,
            headings.aboutPage?.title,
            headings.aboutPage?.subtitle,
            headings.aboutPage?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                /about &bull; Studio Sanctuary & Story Banner
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={headings.aboutPage?.badge || '// ABOUT THE SANCTUARY'}
                      onChange={(e) =>
                        updateSectionHeading('aboutPage', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={headings.aboutPage?.subtitle || 'YOUR STORY'}
                      onChange={(e) =>
                        updateSectionHeading('aboutPage', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={headings.aboutPage?.title || 'THE STORY BEHIND'}
                    onChange={(e) =>
                      updateSectionHeading('aboutPage', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.aboutPage?.description ||
                      'Founded in 2018, Your Story Tattoo was born from a singular rejection: that a tattoo studio should feel like a loud, transactional factory of mass-produced flash sheets.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('aboutPage', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Page Banner */}
          {matchesSearch([
            'contact page',
            headings.contactPage?.badge,
            headings.contactPage?.title,
            headings.contactPage?.subtitle,
            headings.contactPage?.description,
          ]) && (
            <div className="border border-white/10 bg-[#0d0d0d] p-5">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase block mb-3">
                /contact &bull; Contact & Consultation Banner
              </span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={headings.contactPage?.badge || '// INITIATE DIALOGUE'}
                      onChange={(e) =>
                        updateSectionHeading('contactPage', { badge: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={headings.contactPage?.subtitle || 'CONSULTATION INQUIRY'}
                      onChange={(e) =>
                        updateSectionHeading('contactPage', { subtitle: e.target.value })
                      }
                      className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif italic focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={headings.contactPage?.title || 'CONTACT &'}
                    onChange={(e) =>
                      updateSectionHeading('contactPage', { title: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white font-serif tracking-wider focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      headings.contactPage?.description ||
                      'We operate exclusively by appointment to ensure unhurried focus. Fill out the brief below with your tattoo concept, placement, and preferred artist to begin the conversation.'
                    }
                    onChange={(e) =>
                      updateSectionHeading('contactPage', { description: e.target.value })
                    }
                    className="w-full bg-[#161616] border border-white/15 px-3 py-1.5 text-xs text-white/80 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
