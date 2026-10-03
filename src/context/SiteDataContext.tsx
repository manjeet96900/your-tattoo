/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  SiteData,
  ImageConfig,
  SectionHeadingData,
  ServiceItem,
  GalleryItem,
  Artist,
  WhyYourStoryPoint,
  ProcessStage,
  FAQItem,
  Testimonial,
  NavLink,
} from '@/src/types';
import { siteData as initialSiteData } from '@/src/data/siteData';
import { fetchSupabaseOverrides, saveSlotToSupabase } from '@/src/lib/supabase';

export interface ImageSlotDefinition {
  id: string;
  slotNumber: number; // 1 to 58
  category: 'Brand & Logo' | 'Hero' | 'Services' | 'Artists' | 'Process' | 'Editorial' | 'Instagram' | 'Gallery';
  title: string;
  description: string;
  recommendedAspect: string;
  defaultUrl: string;
  currentUrl: string;
  isModified: boolean;
  altText: string;
}

interface SiteDataContextType {
  siteData: SiteData;
  allSlots: ImageSlotDefinition[];
  updateImageSlot: (slotId: string, newUrl: string) => Promise<void>;
  resetSlot: (slotId: string) => void;
  resetAllSlots: () => void;
  modifiedCount: number;
  totalSlots: number;
  exportSiteDataCode: () => string;
  saveAllToDisk: (customData?: SiteData) => Promise<boolean>;
  isDiskConnected: boolean;
  isSupabaseConnected: boolean;
  lastSavedTime: string | null;
  isSavingToDisk: boolean;
  // Content & Headings mutation methods
  updateSiteData: (updater: (prev: SiteData) => SiteData) => void;
  updateSectionHeading: (sectionKey: string, heading: Partial<SectionHeadingData>) => void;
  updateHeroText: (fields: Partial<SiteData['hero']>) => void;
  updateStudioInfo: (fields: Partial<SiteData['studio']>) => void;
  updateServiceItem: (serviceId: string, fields: Partial<ServiceItem>) => void;
  updateGalleryItem: (galleryId: string, fields: Partial<GalleryItem>) => void;
  updateArtistItem: (artistId: string, fields: Partial<Artist>) => void;
  updateWhyYourStoryItem: (id: string, fields: Partial<WhyYourStoryPoint>) => void;
  updateProcessStage: (step: string, fields: Partial<ProcessStage>) => void;
  updateFAQItem: (id: string, fields: Partial<FAQItem>) => void;
  updateTestimonialItem: (id: string, fields: Partial<Testimonial>) => void;
  // Navigation & Links mutation methods
  updateNavigationLink: (id: string, fields: Partial<NavLink>) => void;
  addNavigationLink: (link: NavLink) => void;
  removeNavigationLink: (id: string) => void;
  updateAllNavigation: (links: NavLink[]) => void;
  updateContactLinks: (fields: Partial<SiteData['studio']['contact']>) => void;
  updateAddressLinks: (fields: Partial<SiteData['studio']['address']>) => void;
  updateSeoLinks: (fields: Partial<SiteData['studio']['seo']>) => void;
}

const STORAGE_KEY = 'your_story_tattoo_images_v1';

// Build initial slot definitions catalog mapping to all 58 exact slots
const buildDefaultSlotList = (data: SiteData): Omit<ImageSlotDefinition, 'currentUrl' | 'isModified'>[] => {
  const slots: Omit<ImageSlotDefinition, 'currentUrl' | 'isModified'>[] = [];
  let counter = 1;

  // 1: Studio Primary Logo (1)
  slots.push({
    id: 'brand-logo',
    slotNumber: counter++,
    category: 'Brand & Logo',
    title: 'Website Logo & Monogram',
    description: 'Header Navbar, Mobile Drawer & Brand Identity Icon',
    recommendedAspect: '1:1 Square (PNG/SVG transparent or dark)',
    defaultUrl: data.studio.logoUrl || 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=400&q=80',
    altText: 'Your Story Tattoo Studio Logo',
  });

  // 2-5: Hero Slides (4)
  data.hero.images.forEach((img, idx) => {
    slots.push({
      id: `hero-${idx}`,
      slotNumber: counter++,
      category: 'Hero',
      title: `Hero Slide ${String(idx + 1).padStart(2, '0')}`,
      description: idx === 0 ? 'Primary Homepage Needle Inking Macro' : `Rotating Fullscreen Hero Slide ${idx + 1}`,
      recommendedAspect: '16:9 / 21:9',
      defaultUrl: img.src,
      altText: img.alt,
    });
  });

  // 5-13: Services (9)
  data.services.forEach((srv) => {
    slots.push({
      id: `service-${srv.id}`,
      slotNumber: counter++,
      category: 'Services',
      title: `${srv.title}`,
      description: `Service Card & Detail Page Hero (${srv.slug})`,
      recommendedAspect: '4:3 or 16:9',
      defaultUrl: srv.image.src,
      altText: srv.image.alt,
    });
  });

  // 14-17: Artist Portraits (4)
  data.artists.forEach((art) => {
    slots.push({
      id: `artist-${art.id}-portrait`,
      slotNumber: counter++,
      category: 'Artists',
      title: `${art.name} — Portrait`,
      description: `Resident Master Portrait (${art.specialty.split(',')[0]})`,
      recommendedAspect: '1:1 or 4:5',
      defaultUrl: art.portraitImage.src,
      altText: art.portraitImage.alt,
    });
  });

  // 18-25: Artist Portfolio Samples (8 - 2 for each of 4 artists)
  data.artists.forEach((art) => {
    art.portfolioSamples.forEach((sample, sampleIdx) => {
      slots.push({
        id: `artist-${art.id}-sample-${sampleIdx}`,
        slotNumber: counter++,
        category: 'Artists',
        title: `${art.name} — Work ${sampleIdx + 1}`,
        description: `Portfolio Highlight ${sampleIdx + 1} on Artist Card`,
        recommendedAspect: '3:4 or 4:5',
        defaultUrl: sample.src,
        altText: sample.alt,
      });
    });
  });

  // 26-29: Process Stages (4)
  data.processStages.forEach((stage, idx) => {
    slots.push({
      id: `process-${idx}`,
      slotNumber: counter++,
      category: 'Process',
      title: `Step ${stage.step}: ${stage.title}`,
      description: `4-Step Studio Protocol (${stage.tagline})`,
      recommendedAspect: '4:3 or 16:9',
      defaultUrl: stage.image.src,
      altText: stage.image.alt,
    });
  });

  // 30-32: Editorial & Studio Atmosphere (3)
  slots.push({
    id: 'editorial-brand-intro',
    slotNumber: counter++,
    category: 'Editorial',
    title: 'Brand Manifesto Drafting',
    description: 'Homepage Section 01 Studio Notebook & Ideation Photography',
    recommendedAspect: '4:5 or 3:4',
    defaultUrl: data.brandIntroImage?.src || 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=800&q=85',
    altText: data.brandIntroImage?.alt || 'Artist sketching bespoke tattoo design',
  });

  slots.push({
    id: 'editorial-location',
    slotNumber: counter++,
    category: 'Editorial',
    title: 'Studio Interior & Lounge',
    description: 'Location & Appointment Suite Architectural Framing',
    recommendedAspect: '4:3 or 16:9',
    defaultUrl: data.locationImage?.src || 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1200&q=85',
    altText: data.locationImage?.alt || 'Studio private appointment interior',
  });

  slots.push({
    id: 'editorial-about-founder',
    slotNumber: counter++,
    category: 'Editorial',
    title: 'About Atelier & Founder',
    description: 'About Page Story & Heritage Workshop Frame',
    recommendedAspect: '4:5 or 3:4',
    defaultUrl: data.aboutStudioImage?.src || 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85',
    altText: data.aboutStudioImage?.alt || 'Studio founder sketching custom tattoo',
  });

  // 33-37: Instagram Feed Preview (5)
  data.instagramFeedPreview.images.forEach((img, idx) => {
    slots.push({
      id: `instagram-${idx}`,
      slotNumber: counter++,
      category: 'Instagram',
      title: `Instagram Feed ${String(idx + 1).padStart(2, '0')}`,
      description: `Studio Social Showcase Tile ${idx + 1}`,
      recommendedAspect: '1:1 Square',
      defaultUrl: img.src,
      altText: img.alt,
    });
  });

  // 38-57: Gallery Items (20 items)
  data.gallery.forEach((gal, idx) => {
    slots.push({
      id: `gallery-${idx}`,
      slotNumber: counter++,
      category: 'Gallery',
      title: `Gallery ${String(idx + 1).padStart(2, '0')}: ${gal.title.split('&')[0].trim()}`,
      description: `${gal.category} Archive by ${gal.artistName || 'Resident Artist'}`,
      recommendedAspect: gal.image.aspectRatio || '3:4',
      defaultUrl: gal.image.src,
      altText: gal.image.alt,
    });
  });

  return slots;
};

// Helper to mutate and clone SiteData with active overrides
const applyOverridesToSiteData = (base: SiteData, overrides: Record<string, string>): SiteData => {
  // Deep clone to ensure immutability in React state
  const updated: SiteData = JSON.parse(JSON.stringify(base));

  // 0. Brand Logo
  if (overrides['brand-logo']) {
    updated.studio.logoUrl = overrides['brand-logo'];
    initialSiteData.studio.logoUrl = overrides['brand-logo'];
  }

  // 1. Hero
  updated.hero.images.forEach((img, idx) => {
    const key = `hero-${idx}`;
    if (overrides[key]) {
      img.src = overrides[key];
      initialSiteData.hero.images[idx].src = overrides[key];
    }
  });

  // 2. Services
  updated.services.forEach((srv) => {
    const key = `service-${srv.id}`;
    if (overrides[key]) {
      srv.image.src = overrides[key];
      const match = initialSiteData.services.find((s) => s.id === srv.id);
      if (match) match.image.src = overrides[key];
    }
  });

  // 3. Artists
  updated.artists.forEach((art) => {
    const portKey = `artist-${art.id}-portrait`;
    if (overrides[portKey]) {
      art.portraitImage.src = overrides[portKey];
      const match = initialSiteData.artists.find((a) => a.id === art.id);
      if (match) match.portraitImage.src = overrides[portKey];
    }
    art.portfolioSamples.forEach((sample, sampleIdx) => {
      const sampKey = `artist-${art.id}-sample-${sampleIdx}`;
      if (overrides[sampKey]) {
        sample.src = overrides[sampKey];
        const match = initialSiteData.artists.find((a) => a.id === art.id);
        if (match && match.portfolioSamples[sampleIdx]) {
          match.portfolioSamples[sampleIdx].src = overrides[sampKey];
        }
      }
    });
  });

  // 4. Process
  updated.processStages.forEach((stage, idx) => {
    const key = `process-${idx}`;
    if (overrides[key]) {
      stage.image.src = overrides[key];
      if (initialSiteData.processStages[idx]) {
        initialSiteData.processStages[idx].image.src = overrides[key];
      }
    }
  });

  // 5. Editorial
  if (overrides['editorial-brand-intro']) {
    if (!updated.brandIntroImage) updated.brandIntroImage = { src: '', alt: '' };
    updated.brandIntroImage.src = overrides['editorial-brand-intro'];
    if (!initialSiteData.brandIntroImage) initialSiteData.brandIntroImage = { src: '', alt: '' };
    initialSiteData.brandIntroImage.src = overrides['editorial-brand-intro'];
  }
  if (overrides['editorial-location']) {
    if (!updated.locationImage) updated.locationImage = { src: '', alt: '' };
    updated.locationImage.src = overrides['editorial-location'];
    if (!initialSiteData.locationImage) initialSiteData.locationImage = { src: '', alt: '' };
    initialSiteData.locationImage.src = overrides['editorial-location'];
  }
  if (overrides['editorial-about-founder']) {
    if (!updated.aboutStudioImage) updated.aboutStudioImage = { src: '', alt: '' };
    updated.aboutStudioImage.src = overrides['editorial-about-founder'];
    if (!initialSiteData.aboutStudioImage) initialSiteData.aboutStudioImage = { src: '', alt: '' };
    initialSiteData.aboutStudioImage.src = overrides['editorial-about-founder'];
  }

  // 6. Instagram
  updated.instagramFeedPreview.images.forEach((img, idx) => {
    const key = `instagram-${idx}`;
    if (overrides[key]) {
      img.src = overrides[key];
      if (initialSiteData.instagramFeedPreview.images[idx]) {
        initialSiteData.instagramFeedPreview.images[idx].src = overrides[key];
      }
    }
  });

  // 7. Gallery
  updated.gallery.forEach((gal, idx) => {
    const key = `gallery-${idx}`;
    if (overrides[key]) {
      gal.image.src = overrides[key];
      if (initialSiteData.gallery[idx]) {
        initialSiteData.gallery[idx].image.src = overrides[key];
      }
    }
  });

  return updated;
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDiskConnected, setIsDiskConnected] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isSavingToDisk, setIsSavingToDisk] = useState(false);

  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to load image overrides from localStorage:', e);
      }
    }
    return {};
  });

  // 1. Fetch live image overrides from Supabase database table (cross-device global sync)
  useEffect(() => {
    let isMounted = true;
    fetchSupabaseOverrides()
      .then((cloudOverrides) => {
        if (isMounted && Object.keys(cloudOverrides).length > 0) {
          setOverrides((prev) => ({ ...prev, ...cloudOverrides }));
          setIsSupabaseConnected(true);
        }
      })
      .catch(() => {
        if (isMounted) setIsSupabaseConnected(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Check server filesystem persistence connection
  useEffect(() => {
    let isMounted = true;
    fetch('/api/site-data-status')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.status === 'online') {
          setIsDiskConnected(true);
        }
      })
      .catch(() => {
        if (isMounted) setIsDiskConnected(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reactive siteData state
  const [activeSiteData, setActiveSiteData] = useState<SiteData>(() =>
    applyOverridesToSiteData(initialSiteData, overrides)
  );

  // Function to save activeSiteData directly to src/data/siteData.ts on disk
  const saveAllToDisk = useCallback(async (customData?: SiteData): Promise<boolean> => {
    setIsSavingToDisk(true);
    const targetData = customData || activeSiteData;
    try {
      const response = await fetch('/api/save-site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedSiteData: targetData }),
      });

      if (response.ok) {
        const data = await response.json();
        const formattedTime = new Date().toLocaleTimeString();
        setLastSavedTime(formattedTime);
        setIsDiskConnected(true);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Failed to save siteData.ts to server disk:', err);
      return false;
    } finally {
      setIsSavingToDisk(false);
    }
  }, [activeSiteData]);

  // Re-apply when overrides change
  useEffect(() => {
    const updated = applyOverridesToSiteData(initialSiteData, overrides);
    setActiveSiteData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Failed to save image overrides to localStorage:', e);
    }
  }, [overrides]);

  // Update a single image slot (syncs to Supabase Cloud + Local Disk file!)
  const updateImageSlot = useCallback(
    async (slotId: string, newUrl: string) => {
      const trimmed = newUrl.trim();
      if (!trimmed) return;

      const newOverrides = { ...overrides, [slotId]: trimmed };
      setOverrides(newOverrides);

      // Compute updated siteData with this change
      const updatedData = applyOverridesToSiteData(initialSiteData, newOverrides);

      // 1. Sync to Supabase cloud database
      saveSlotToSupabase(slotId, trimmed).catch((err) => {
        console.warn('Supabase database sync notification:', err);
      });

      // 2. Automatically write to src/data/siteData.ts on disk
      saveAllToDisk(updatedData);
    },
    [overrides, saveAllToDisk]
  );

  // Reset a single slot to original default
  const resetSlot = useCallback((slotId: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  }, []);

  // Reset all 57 slots to default
  const resetAllSlots = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Compute 57 slots list with active URLs
  const allSlots: ImageSlotDefinition[] = useMemo(() => {
    const baseSlots = buildDefaultSlotList(initialSiteData);
    return baseSlots.map((slot) => {
      const overrideUrl = overrides[slot.id];
      return {
        ...slot,
        currentUrl: overrideUrl || slot.defaultUrl,
        isModified: Boolean(overrideUrl && overrideUrl !== slot.defaultUrl),
      };
    });
  }, [overrides]);

  const modifiedCount = useMemo(() => {
    return allSlots.filter((s) => s.isModified).length;
  }, [allSlots]);

  // Helper to export full siteData.ts file as a string
  const exportSiteDataCode = useCallback(() => {
    return `// Updated siteData with active image overrides
export const siteData = ${JSON.stringify(activeSiteData, null, 2)};
`;
  }, [activeSiteData]);

  // Content & Headings mutation methods
  const updateSiteData = useCallback((updater: (prev: SiteData) => SiteData) => {
    setActiveSiteData((prev) => updater(prev));
  }, []);

  const updateSectionHeading = useCallback((sectionKey: string, headingData: Partial<SectionHeadingData>) => {
    setActiveSiteData((prev) => {
      const currentHeadings = prev.sectionHeadings || {};
      const currentSection = currentHeadings[sectionKey] || { title: '' };
      return {
        ...prev,
        sectionHeadings: {
          ...currentHeadings,
          [sectionKey]: {
            ...currentSection,
            ...headingData,
          },
        },
      };
    });
  }, []);

  const updateHeroText = useCallback((fields: Partial<SiteData['hero']>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...fields,
      },
    }));
  }, []);

  const updateStudioInfo = useCallback((fields: Partial<SiteData['studio']>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      studio: {
        ...prev.studio,
        ...fields,
      },
    }));
  }, []);

  const updateServiceItem = useCallback((serviceId: string, fields: Partial<ServiceItem>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === serviceId ? { ...s, ...fields } : s)),
    }));
  }, []);

  const updateGalleryItem = useCallback((galleryId: string, fields: Partial<GalleryItem>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === galleryId ? { ...g, ...fields } : g)),
    }));
  }, []);

  const updateArtistItem = useCallback((artistId: string, fields: Partial<Artist>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      artists: prev.artists.map((a) => (a.id === artistId ? { ...a, ...fields } : a)),
    }));
  }, []);

  const updateWhyYourStoryItem = useCallback((id: string, fields: Partial<WhyYourStoryPoint>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      whyYourStory: prev.whyYourStory.map((w) => (w.id === id ? { ...w, ...fields } : w)),
    }));
  }, []);

  const updateProcessStage = useCallback((step: string, fields: Partial<ProcessStage>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      processStages: prev.processStages.map((p) => (p.step === step ? { ...p, ...fields } : p)),
    }));
  }, []);

  const updateFAQItem = useCallback((id: string, fields: Partial<FAQItem>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...fields } : f)),
    }));
  }, []);

  const updateTestimonialItem = useCallback((id: string, fields: Partial<Testimonial>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...fields } : t)),
    }));
  }, []);

  // Navigation & Links mutation methods
  const updateNavigationLink = useCallback((id: string, fields: Partial<NavLink>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      navigation: prev.navigation.map((n) => (n.id === id ? { ...n, ...fields } : n)),
    }));
  }, []);

  const addNavigationLink = useCallback((link: NavLink) => {
    setActiveSiteData((prev) => ({
      ...prev,
      navigation: [...prev.navigation, link],
    }));
  }, []);

  const removeNavigationLink = useCallback((id: string) => {
    setActiveSiteData((prev) => ({
      ...prev,
      navigation: prev.navigation.filter((n) => n.id !== id),
    }));
  }, []);

  const updateAllNavigation = useCallback((links: NavLink[]) => {
    setActiveSiteData((prev) => ({
      ...prev,
      navigation: links,
    }));
  }, []);

  const updateContactLinks = useCallback((fields: Partial<SiteData['studio']['contact']>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      studio: {
        ...prev.studio,
        contact: {
          ...prev.studio.contact,
          ...fields,
        },
      },
    }));
  }, []);

  const updateAddressLinks = useCallback((fields: Partial<SiteData['studio']['address']>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      studio: {
        ...prev.studio,
        address: {
          ...prev.studio.address,
          ...fields,
        },
      },
    }));
  }, []);

  const updateSeoLinks = useCallback((fields: Partial<SiteData['studio']['seo']>) => {
    setActiveSiteData((prev) => ({
      ...prev,
      studio: {
        ...prev.studio,
        seo: {
          ...prev.studio.seo,
          ...fields,
        },
      },
    }));
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        siteData: activeSiteData,
        allSlots,
        updateImageSlot,
        resetSlot,
        resetAllSlots,
        modifiedCount,
        totalSlots: allSlots.length,
        exportSiteDataCode,
        saveAllToDisk,
        isDiskConnected,
        isSupabaseConnected,
        lastSavedTime,
        isSavingToDisk,
        updateSiteData,
        updateSectionHeading,
        updateHeroText,
        updateStudioInfo,
        updateServiceItem,
        updateGalleryItem,
        updateArtistItem,
        updateWhyYourStoryItem,
        updateProcessStage,
        updateFAQItem,
        updateTestimonialItem,
        updateNavigationLink,
        addNavigationLink,
        removeNavigationLink,
        updateAllNavigation,
        updateContactLinks,
        updateAddressLinks,
        updateSeoLinks,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
