export interface ImageConfig {
  src: string;
  alt: string;
  desktopPosition?: string;
  mobilePosition?: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  philosophy: string;
  portraitImage: ImageConfig;
  portfolioSamples: ImageConfig[];
  instagramHandle?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: ImageConfig;
  features: string[];
  processSummary: string;
  idealFor: string;
  consultationRequired: boolean;
  ctaText?: string;
}

export type GalleryCategory =
  | 'All'
  | 'Fine Line'
  | 'Minimal'
  | 'Custom'
  | 'Cover-Up'
  | 'Black & Grey'
  | 'Geometric'
  | 'Other';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: ImageConfig;
  artistId?: string;
  artistName?: string;
  storySnippet?: string;
}

export interface ProcessStage {
  step: string; // e.g. "01"
  title: string;
  tagline: string;
  description: string;
  keyPoints: string[];
  image: ImageConfig;
}

export interface WhyYourStoryPoint {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  tattooStory: string;
  artistName: string;
  year: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  logoUrl?: string;
  coreBrandMessage: string;
  brandStatement: {
    heading: string;
    subheading: string;
    paragraphs: string[];
  };
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
    country: string;
    mapCoordinates: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string; // for tel:
    whatsappNumber: string; // international format for wa.me
    email: string;
    openingHours: {
      days: string;
      hours: string;
    }[];
    instagramUrl: string;
    instagramHandle: string;
    mehendiWebsiteUrl: string;
    mehendiBrandName: string;
  };
  web3Forms: {
    accessKey: string; // Replaceable via ENV or siteData
    endpoint: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string[];
  };
}

export interface SectionHeadingData {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface SiteData {
  studio: StudioInfo;
  navigation: NavLink[];
  hero: {
    headlinePrimary: string;
    headlineSecondary: string;
    subheadline: string;
    ctaPrimary: {
      label: string;
      action: 'booking_modal';
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
    sliderIntervalMs: number;
    images: ImageConfig[];
  };
  sectionHeadings?: Record<string, SectionHeadingData>;
  featuredServices: string[]; // slug list
  services: ServiceItem[];
  artists: Artist[];
  processStages: ProcessStage[];
  whyYourStory: WhyYourStoryPoint[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
  instagramFeedPreview: {
    headline: string;
    subtitle: string;
    images: ImageConfig[];
  };
  footer: {
    legalNotice: string;
    disclaimer: string;
    copyrightYear: number;
  };
  brandIntroImage?: ImageConfig;
  locationImage?: ImageConfig;
  aboutStudioImage?: ImageConfig;
}

export interface BookingFormData {
  serviceType: string;
  story: string;
  placement: string;
  size: string;
  colorPreference: 'Black & Grey' | 'Fine Line Black' | 'Color Accent' | 'Undecided';
  referenceUrl?: string;
  referenceFile?: File | null;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}
