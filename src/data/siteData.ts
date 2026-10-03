import { SiteData } from '../types';

/**
 * ============================================================================
 * YOUR STORY TATTOO — CENTRAL DATA ARCHITECTURE
 * ============================================================================
 * This file is the single editable source of truth for all business content,
 * artists, services, gallery images, copy, and contact parameters.
 *
 * All image paths support desktop and mobile positioning overrides.
 * Replace placeholder image URLs with your studio's photography when ready.
 * ============================================================================
 */

export const siteData: SiteData = {
  studio: {
    name: 'YOUR STORY TATTOO',
    tagline: 'YOUR STORY. INKED FOREVER.',
    logoUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=400&q=80',
    coreBrandMessage:
      'Tattoos are intimate narratives carved into skin—memories, beliefs, triumphs, and vulnerabilities preserved with surgical precision and fine-ink craftsmanship.',
    brandStatement: {
      heading: 'Every line carries weight. Every shadow preserves a chapter.',
      subheading: 'AN EDITORIAL SANCTUARY FOR BESPOKE TATTOO ARTISTRY',
      paragraphs: [
        'At Your Story Tattoo, we reject mass-produced flash sheets and hasty appointments. We believe the body is an unwritten manuscript, and the ink we deposit should honor the significance of the life that carries it.',
      ],
    },
    address: {
      street: '14 Arts & Heritage Enclave, Studio 4B', // Temporary dummy address
      district: 'Creative Arts Quarter',
      city: 'Mumbai',
      postalCode: '400050',
      country: 'India',
      mapCoordinates: {
        lat: 19.0596,
        lng: 72.8295,
      },
      googleMapsUrl: 'https://maps.google.com/?q=Your+Story+Tattoo',
    },
    contact: {
      phoneDisplay: '+91 98200 12345', // Temporary dummy phone
      phoneRaw: '+919820012345',
      whatsappNumber: '919820012345', // Without '+' for wa.me URL
      email: 'enquire@yourstorytattoo.com', // Temporary dummy email
      openingHours: [
        { days: 'Monday – Friday', hours: '10:00 AM – 10:00 PM' },
        { days: 'Saturday – Sunday', hours: '10:00 AM – 11:00 PM' },
        { days: 'Monday', hours: 'Private Consultations Only' },
      ],
      instagramUrl: 'https://instagram.com/yourstorytattoo',
      instagramHandle: '@yourstorytattoo',
      mehendiWebsiteUrl: 'https://yourstorymehendi.com', // Temporary Mehendi transition URL
      mehendiBrandName: 'Rishabh Mehandi',
    },
    web3Forms: {
      // Set via environment variable VITE_WEB3FORMS_ACCESS_KEY or update here:
      accessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
      endpoint: 'https://api.web3forms.com/submit',
    },
    seo: {
      siteUrl: 'https://yourstorytattoo.com',
      defaultTitle: 'Your Story Tattoo | Editorial & Fine-Line Tattoo Studio',
      titleTemplate: '%s | Your Story Tattoo',
      defaultDescription:
        'A sanctuary of fine-line and bespoke custom tattooing. Your Story. Inked Forever. Discover bespoke designs, surgical sterility, and seasoned artists.',
      ogImage: '/images/hero/hero-01.webp',
      keywords: [
        'custom tattoo studio',
        'fine line tattoo artist',
        'tattoo cover up',
        'laser tattoo removal',
        'bespoke tattoo design',
        'minimalist tattoo',
        'black and grey tattoo',
        'private tattoo consultation',
      ],
    },
  },

  navigation: [
    { id: 'nav-about', label: 'About', href: '/about' },
    { id: 'nav-services', label: 'Services', href: '/services' },
    { id: 'nav-gallery', label: 'Gallery', href: '/gallery' },
    { id: 'nav-artists', label: 'Artists', href: '/artists' },
    { id: 'nav-contact', label: 'Contact', href: '/contact' },
  ],

  hero: {
    headlinePrimary: 'YOUR STORY.',
    headlineSecondary: 'INKED FOREVER.',
    subheadline:
      'A sanctuary where personal narratives transform into enduring works of fine-line and custom tattoo art.',
    ctaPrimary: {
      label: 'Book Consultation',
      action: 'booking_modal',
    },
    ctaSecondary: {
      label: 'Explore Our Work',
      href: '/gallery',
    },
    sliderIntervalMs: 6500,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=2000&q=85',
        alt: 'Fine-line tattoo machine needle depositing black ink onto skin with precision',
        desktopPosition: 'center 35%',
        mobilePosition: 'center 35%',
      },
      {
        src: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=2000&q=85',
        alt: 'Monochrome close-up of intricate fine-line tattoo process in studio',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 35%',
      },
      {
        src: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=2000&q=85',
        alt: 'Intricate custom botanical and illustrative tattoo artwork',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 30%',
      },
      {
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=2000&q=85',
        alt: 'Editorial black and grey realism portrait tattoo composition',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 40%',
      },
    ],
  },

  sectionHeadings: {
    manifesto: {
      badge: '01 // THE MANIFESTO',
      title: 'Every line carries weight. Every shadow preserves a chapter.',
      subtitle: 'AN EDITORIAL SANCTUARY FOR BESPOKE TATTOO ARTISTRY',
      description: 'At Your Story Tattoo, we reject mass-produced flash sheets and hasty appointments.',
    },
    featuredWork: {
      badge: '02 // PORTFOLIO ARCHIVE',
      title: 'FEATURED WORK',
      description: 'A curated selection of bespoke fine-line, geometry, and custom narrative tattoos executed in our studio.',
    },
    services: {
      badge: '03 // SERVICES & DISCIPLINES',
      title: 'THE DISCIPLINES',
      description: 'From single-needle botanical minimalism to comprehensive cover-ups and safe laser tattoo removal, every session is executed under hospital-grade sterility.',
    },
    artists: {
      badge: '04 // THE RESIDENT MASTERS',
      title: 'OUR ARTISTS',
      description: 'Resident practitioners, each specializing in distinct tattoo idioms—from fine-line botanicals to micro-realism and geometric sacred geometry.',
    },
    process: {
      badge: '05 // THE RITUAL',
      title: 'THE PROCESS',
      description: 'Four deliberate stages designed to transform an intimate memory or philosophical concept into permanent fine ink.',
    },
    whyYourStory: {
      badge: '06 // THE COMMITMENT',
      title: 'WHY YOUR STORY',
      description: 'Our foundational principles govern every consultation, sketch, sterile packaging seal, and tattoo stroke.',
    },
    testimonials: {
      badge: '07 // CLIENT NARRATIVES',
      title: 'STORIES INKED',
      description: 'Reflections from clients who entrusted our studio with their most intimate and enduring chapters.',
    },
    faqs: {
      badge: '08 // STUDIO CLARITY',
      title: 'FREQUENTLY ASKED',
      description: 'Transparent answers regarding custom design preparation, sterile hygiene standards, consultation dynamics, and healing protocols.',
    },
    instagram: {
      badge: '09 // DAILY ARCHIVE',
      title: 'FOLLOW THE WORK',
      description: 'More stories. More ink. Unfiltered glimpses from our studio floor.',
    },
    location: {
      badge: '10 // THE SANCTUARY',
      title: 'STUDIO & VISITS',
      description: 'Designed as a tranquil, quiet, sterile sanctuary. We operate primarily by appointment to guarantee unhurried creative immersion for every client.',
    },
    finalCta: {
      badge: '[ COMMENCE YOUR CHAPTER ]',
      title: 'READY TO TELL YOUR STORY?',
      subtitle: 'YOUR STORY. INKED FOREVER.',
      description: 'Whether you hold a fully formed conceptual drawing or simply a meaningful memory awaiting its artistic translation, our artists are here to listen.',
    },
    galleryPage: {
      badge: '// PERMANENT RECORD',
      title: 'THE GALLERY',
      subtitle: '& PORTFOLIO ARCHIVE',
      description: 'Every photograph below represents a bespoke narrative designed and tattooed within our studio. Click any piece to inspect high-resolution details, artist credentials, and story background.',
    },
    servicesPage: {
      badge: '// STUDIO DISCIPLINES',
      title: 'THE DISCIPLINES',
      subtitle: '& TECHNIQUES',
      description: 'From delicate single-needle fine line work and bespoke narrative sleeves to laser tattoo removal and anatomical piercings, each craft is performed under medical-grade sterility by dedicated specialists.',
    },
    artistsPage: {
      badge: '// THE RESIDENT MASTERS',
      title: 'OUR ARTISTS',
      subtitle: '& CRAFTSPEOPLE',
      description: 'We do not employ generalists. Each resident artist at Your Story has spent years immersing themselves in specific artistic idioms—from microscopic single-needle botanical work to chiaroscuro renaissance realism and structural scar cover-ups.',
    },
    aboutPage: {
      badge: '// ABOUT THE SANCTUARY',
      title: 'THE STORY BEHIND',
      subtitle: 'YOUR STORY',
      description: 'Founded in 2018, Your Story Tattoo was born from a singular rejection: that a tattoo studio should feel like a loud, transactional factory of mass-produced flash sheets.',
    },
    contactPage: {
      badge: '// INITIATE CONSULTATION',
      title: 'DIRECT CONSULTATION',
      subtitle: '& STUDIO VISITS',
      description: 'Consultations are conducted in our private studio suites with total discretion and focused artistic attention.',
    },
  },

  featuredServices: [
    'custom-tattoos',
    'fine-line-tattoos',
    'permanent-tattooing',
    'tattoo-cover-ups',
    'laser-tattoo-removal',
    'tattoo-consultation',
  ],

  services: [
    {
      id: 'srv-1',
      slug: 'premium-tattoo',
      title: 'Premium Tattoo',
      shortDescription:
        'Artistic exclusivity for multi-session legacy pieces, full sleeves, and back murals.',
      detailedDescription:
        'Our flagship private tier. A dedicated artist crafts your conceptual brief with private chamber sessions, iterative drafting, and bespoke post-care.',
      image: {
        src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1400&q=85',
        alt: 'Master artist crafting intricate back piece in quiet private studio suite',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 30%',
      },
      features: [
        'Private suite with climate & acoustic isolation',
        'Multi-session creative roadmap & drafting',
      ],
      processSummary: 'Initial 90-minute narrative interview, 3 vellum iterations, followed by dedicated studio lockouts.',
      idealFor: 'Full sleeves, back pieces & legacy journeys.',
      consultationRequired: true,
      ctaText: 'Reserve Premium Session',
    },
    {
      id: 'srv-2',
      slug: 'permanent-tattooing',
      title: 'Permanent Tattooing',
      shortDescription:
        'Timeless tattooing executed with sterile discipline and archival black pigments.',
      detailedDescription:
        'Built to outlive trends. Proven needle depth and clinical single-use safety yield crisp lines and deep contrasts that age gracefully over decades.',
      image: {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1400&q=85',
        alt: 'Close-up of precise permanent line tattooing on forearm',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 45%',
      },
      features: [
        'Autoclave sterile & 100% disposable cartridges',
        'Heavy-metal-free European carbon pigments',
      ],
      processSummary: 'Skin analysis, sterile stencil application, session execution, and sterile derm-shield wrapping.',
      idealFor: 'Enduring marks, typography & realism.',
      consultationRequired: false,
      ctaText: 'Book Permanent Ink',
    },
    {
      id: 'srv-3',
      slug: 'custom-tattoos',
      title: 'Custom Tattoo',
      shortDescription:
        'Bespoke compositions derived exclusively from your memory, philosophy, or story.',
      detailedDescription:
        'Every custom tattoo originates from a blank canvas. We interpret your memories, references, and milestones into a composition balanced to your anatomy.',
      image: {
        src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1400&q=85',
        alt: 'Tattoo designer drawing custom geometric and botanical study',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 35%',
      },
      features: [
        'Anatomical body-flow mapping before drafting',
        'Strictly 1-of-1: never tattooed on another client',
      ],
      processSummary: 'Story intake call, digital placement visualization, stencil fitting, and ink delivery.',
      idealFor: 'Meaningful milestones & original statements.',
      consultationRequired: true,
      ctaText: 'Design Your Custom Piece',
    },
    {
      id: 'srv-4',
      slug: 'fine-line-tattoos',
      title: 'Fine Line Tattoos',
      shortDescription:
        'Whisper-thin needle precision producing micro-details, floral stems, and ethereal script.',
      detailedDescription:
        'Using single-needle configurations (1RL / 3RL), our specialists render feather-light contours, microscopic botanicals, and understated script with minimal trauma.',
      image: {
        src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1400&q=85',
        alt: 'Ethereal fine-line spine and rib botanical tattoo',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 25%',
      },
      features: [
        'Specialized 0.20mm & 0.25mm single needles',
        'Gentle skin impact with rapid 5–7 day healing',
      ],
      processSummary: 'Micro-stencil calibration, low-vibration rotary stroke, and transparent breathable second-skin dressing.',
      idealFor: 'Minimalists, script & micro-botanicals.',
      consultationRequired: false,
      ctaText: 'Book Fine Line Session',
    },
    {
      id: 'srv-5',
      slug: 'temporary-tattoos',
      title: 'Temporary Tattoos',
      shortDescription:
        'Semi-permanent test runs utilizing organic jagua plant extract lasting 10 to 18 days.',
      detailedDescription:
        'Test your envisioned design in real life before committing. Organic fruit-derived Jagua stain sinks into the epidermis, darkening to rich navy-black tones.',
      image: {
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        alt: 'Temporary artistic body art applied with fine brush stylus',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 50%',
      },
      features: [
        '100% natural, non-toxic Genipa extract',
        'Looks like fresh permanent ink at casual glance',
      ],
      processSummary: 'Design stencil, gel application, 2-hour dry time, and peel-off with overnight oxidation.',
      idealFor: 'Placement testing & creative experimentation.',
      consultationRequired: false,
      ctaText: 'Try Semi-Permanent Ink',
    },
    {
      id: 'srv-6',
      slug: 'tattoo-cover-ups',
      title: 'Tattoo Cover-Ups',
      shortDescription:
        'Transform outdated or regrettable ink into breathtaking new art through contrast mastery.',
      detailedDescription:
        'An architectural exercise in color theory, eye redirection, and texture. We thoughtfully reclaim your skin so you can wear your art with pride.',
      image: {
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1400&q=85',
        alt: 'Artistic dark cover-up tattoo transforming prior aged ink',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 40%',
      },
      features: [
        'Scar tissue & pigment saturation analysis',
        'Strategic negative space & textural shading',
      ],
      processSummary: 'High-res macro photography of old tattoo, digital camouflage study, and multi-pass transformation.',
      idealFor: 'Aged ink, past chapters & faded pieces.',
      consultationRequired: true,
      ctaText: 'Request Cover-Up Review',
    },
    {
      id: 'srv-7',
      slug: 'laser-tattoo-removal',
      title: 'Laser Tattoo Removal',
      shortDescription:
        'State-of-the-art Q-switched & Pico laser technology for clearance or targeted lightening.',
      detailedDescription:
        'Safe, controlled pigment dissolution. Certified technicians shatter ink particles to provide a clean slate or lighten existing marks for cover-ups.',
      image: {
        src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=85',
        alt: 'Clinical precision laser equipment in sterile studio setting',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 50%',
      },
      features: [
        'Picosecond photo-acoustic pulse tech',
        'Multi-wavelength targeting of deep pigments',
      ],
      processSummary: 'Patch test, cooling prep, rapid laser pass (5-15 mins), and clinical dressing.',
      idealFor: 'Targeted lightening or complete ink clearance.',
      consultationRequired: true,
      ctaText: 'Schedule Laser Assessment',
    },
    {
      id: 'srv-8',
      slug: 'tattoo-consultation',
      title: 'Tattoo Consultation',
      shortDescription:
        'An unhurried conversation with senior artists to unpack your ideas, placement, and sizing.',
      detailedDescription:
        'A relaxed, contemplative 45-minute dialogue. We examine your skin, review references, test mock stencils, and plan transparently with zero pressure.',
      image: {
        src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=85',
        alt: 'Artist and client conversing over sketch table in relaxed monochrome studio',
        desktopPosition: 'center 35%',
        mobilePosition: 'center 30%',
      },
      features: [
        '1-on-1 artist consult (in-studio or virtual)',
        'Anatomical placement & scale mockup testing',
      ],
      processSummary: 'Coffee or herbal tea, narrative brief review, preliminary sketching, and transparent session budgeting.',
      idealFor: 'First-timers, complex pieces & roadmap planning.',
      consultationRequired: false,
      ctaText: 'Book 45-Min Consultation',
    },
    {
      id: 'srv-9',
      slug: 'piercing',
      title: 'Piercing',
      shortDescription:
        'Anatomically matched body and ear piercings using ASTM F-136 titanium and solid gold.',
      detailedDescription:
        'Conducted with aseptic needle technique (never guns). We emphasize anatomical fit, zero-pinch sweeps, and curation with hypoallergenic fine jewelry.',
      image: {
        src: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1400&q=85',
        alt: 'Minimalist gold and titanium curated ear piercing close-up',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 40%',
      },
      features: [
        'Single-use Tri-bevel needles (strictly no guns)',
        'ASTM F-136 Titanium & 14k/18k solid gold',
      ],
      processSummary: 'Anatomy review, sterile marking, aseptic needle pass, jewelry insertion, and aftercare debrief.',
      idealFor: 'Curated ear stacks & delicate piercings.',
      consultationRequired: false,
      ctaText: 'Book Piercing Appointment',
    },
  ],

  artists: [
    {
      id: 'artist-aarav',
      name: 'Amit Kumar',
      title: 'Founder & Master Fine-Line Specialist',
      specialty: 'Single-Needle Fine Line, Micro-Botanicals & Sacred Geometry',
      experienceYears: 6,
      bio: 'Trained in classical printmaking and fine arts in Florence before dedicating his life to contemporary tattoo craft. Aarav is celebrated across Asia for his whisper-thin line weights, anatomical harmony, and poetic narrative interpretations.',
      philosophy:
        'A tattoo is not an ornament on the body; it is the skin speaking its memory in silence.',
      portraitImage: {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
        alt: 'Portrait of Aarav Mehta holding fine line rotary machine in studio light',
        desktopPosition: 'center 20%',
        mobilePosition: 'center 20%',
      },
      portfolioSamples: [
        {
          src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=85',
          alt: 'Fine line spine botanical tattoo by Aarav Mehta',
        },
        {
          src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=85',
          alt: 'Micro sacred geometry wrist tattoo by Aarav Mehta',
        },
      ],
      instagramHandle: '@aarav.yourstory',
    },
    {
      id: 'artist-elena',
      name: 'Nikhil Nayak',
      title: 'Senior Black & Grey Realism Artist',
      specialty: 'Surrealism, Chiaroscuro Portraits & Dark Editorial Flora',
      experienceYears: 5,
      bio: 'Known for haunting chiaroscuro contrasts and velvety soft gradients that mimic renaissance charcoal drawings. Elena excels in translating photographic memories and classical sculptures into timeless black and grey ink.',
      philosophy:
        'Shadows give form to light. In black and grey tattooing, what you leave untouched is just as crucial as the deepest ink.',
      portraitImage: {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
        alt: 'Portrait of Elena Rostova examining sketch in monochrome studio',
        desktopPosition: 'center 25%',
        mobilePosition: 'center 20%',
      },
      portfolioSamples: [
        {
          src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=800&q=85',
          alt: 'Black and grey realism portrait sleeve by Elena Rostova',
        },
        {
          src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=800&q=85',
          alt: 'Renaissance classical sculpture tattoo study by Elena Rostova',
        },
      ],
      instagramHandle: '@elena.ink',
    },
    {
      id: 'artist-kavya',
      name: 'Coming Soon',
      title: 'Bespoke Illustrative & Calligraphy Specialist',
      specialty: 'Minimalist Calligraphy, Modern Devanagari & Abstract Linework',
      experienceYears: 0,
      bio: 'Bridging Eastern script traditions with minimalist Scandinavian typography. Kavya works closely with writers, poets, and seekers, distilling paragraphs of personal significance into evocative single-stroke strokes.',
      philosophy:
        'Language carries the vibration of who we were when we first understood it. We immortalize that frequency.',
      portraitImage: {
        src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
        alt: 'Portrait of Kavya Sen sketching custom typography on vellum',
        desktopPosition: 'center 25%',
        mobilePosition: 'center 20%',
      },
      portfolioSamples: [
        {
          src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=800&q=85',
          alt: 'Modern Devanagari spine typography tattoo by Kavya Sen',
        },
        {
          src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
          alt: 'Abstract single line fluid gesture tattoo by Kavya Sen',
        },
      ],
      instagramHandle: '@....',
    },
    {
      id: 'artist-marcus',
      name: 'Coming Soon',
      title: 'Cover-Up & Heavy Contrast Specialist',
      specialty: 'Architectural Geometry, Cover-Up Metamorphosis & Solid Blackwork',
      experienceYears: 0,
      bio: 'An architect turned tattooist, Marcus perceives the human anatomy as structural terrain. His specialty lies in complex cover-up engineering, turning old scars and aged tattoos into bold geometric narratives.',
      philosophy:
        'Never look at an old tattoo with regret. It is simply the first layer of an even bolder composition.',
      portraitImage: {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
        alt: 'Portrait of Marcus Vance in his industrial-minimalist studio station',
        desktopPosition: 'center 25%',
        mobilePosition: 'center 20%',
      },
      portfolioSamples: [
        {
          src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=85',
          alt: 'Architectural geometric sleeve cover-up by Marcus Vance',
        },
        {
          src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=800&q=85',
          alt: 'Dense solid blackwork and dot-matrix gradient by Marcus Vance',
        },
      ],
      instagramHandle: '@....',
    },
  ],

  processStages: [
    {
      step: '01',
      title: 'The Consultation',
      tagline: 'Listening before drawing.',
      description:
        'We begin in our private library lounge over warm tea. We explore the memory, feeling, or narrative you wish to mark. We analyze your skin texture, discuss placement dynamics, and set deliberate boundaries.',
      keyPoints: [
        'Exploration of emotional and symbolic intent',
        'Direct consultation with your chosen resident artist',
        'Precise anatomical scale and placement testing',
        'Transparent time and financial expectations',
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=85',
        alt: 'Artist and client discussing sketches during relaxed consultation',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 35%',
      },
    },
    {
      step: '02',
      title: 'The Design',
      tagline: 'Translating narrative into line.',
      description:
        'Your artist crafts original concepts from a blank canvas. We examine flow, balance, and how the art bends as your muscles flex. You review the draft, request refinements, and finalize the exact stencil.',
      keyPoints: [
        'Strictly 1-of-1 original artwork',
        'Digital or hand-drawn vellum studies',
        'Body-matching curve and contour alignment',
        'Zero pressure: we only tattoo when you are entirely in love with the piece',
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=85',
        alt: 'Artist illustrating custom tattoo design on drawing desk',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 35%',
      },
    },
    {
      step: '03',
      title: 'The Tattoo',
      tagline: 'Quiet focus, surgical precision.',
      description:
        'On appointment day, you step into our calm, hospital-grade sterile studio. Fresh single-use needles are unsealed before your eyes. We work in unhurried, rhythmic focus with your comfort as our highest priority.',
      keyPoints: [
        'Hospital-grade sterilization with single-use sealed cartridges',
        'Ultra-quiet rotary machines designed for minimal tissue agitation',
        'Private audio/visual control in your session bay',
        'Breaks paced entirely according to your endurance',
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85',
        alt: 'Tattoo session in quiet, sterile, focused studio environment',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 40%',
      },
    },
    {
      step: '04',
      title: 'Aftercare',
      tagline: 'Preserving the art for a lifetime.',
      description:
        'The tattoo process is only half complete when the machine turns off. We seal your piece with breathable medical-grade derm-film and supply a curated aftercare box with day-by-day healing guidelines.',
      keyPoints: [
        'Medical second-skin protective film applied on-site',
        'Bespoke aftercare balm and organic cleansing soap included',
        'Direct 24/7 WhatsApp healing support line with our team',
        'Complimentary 60-day touch-up guarantee',
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85',
        alt: 'Applying protective second skin barrier after tattoo session',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 40%',
      },
    },
  ],

  whyYourStory: [
    {
      id: 'why-1',
      number: '01',
      title: 'Custom Artistry',
      tagline: 'Never flash. Always personal.',
      description:
        'Every line is conceived for your body and your history. We never duplicate designs, guaranteeing that your tattoo remains exclusively yours.',
    },
    {
      id: 'why-2',
      number: '02',
      title: 'Hygiene & Safety',
      tagline: 'Clinical hospital discipline.',
      description:
        'Exceeding international health department mandates: class-B autoclaves, hospital-grade barrier film, 100% disposable cartridges, and certified sterile procedures.',
    },
    {
      id: 'why-3',
      number: '03',
      title: 'Experienced Artists',
      tagline: 'Masters of specialized aesthetics.',
      description:
        'Our resident artists are not generalists; each has devoted years exclusively to fine-line, chiaroscuro realism, bespoke typography, or structural cover-ups.',
    },
    {
      id: 'why-4',
      number: '04',
      title: 'Premium Experience',
      tagline: 'Calm, contemplative, unhurried.',
      description:
        'No chaotic rock-and-roll stereos or rushed conveyor-belt walk-ins. We provide private suites, curated playlists, aromatic tea, and total discretion.',
    },
    {
      id: 'why-5',
      number: '05',
      title: 'Quality & Detail',
      tagline: 'Archival permanence engineered to age.',
      description:
        'We select pigment viscosity and needle taper calibrated specifically for skin longevity, preventing premature fading or pigment bleed over decades.',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      quote:
        'I had spent three years carrying the sketch of my father’s handwritten final letter. Aarav did not merely copy the ink—he studied the pressure of his penmanship. When I look at my forearm today, it feels like my father’s steady hand is still there.',
      clientName: 'Devika Singhania',
      tattooStory: 'Handwritten Script & Fine Line Botanical',
      artistName: 'Amit Kumar',
      year: '2025',
    },
    {
      id: 'test-2',
      quote:
        'After an impulsive tattoo at 19 that made me dread short sleeves, Marcus took the time to design an anatomical cover-up that incorporated the old lines into a majestic dark architectural landscape. The studio atmosphere is as serene as a gallery.',
      clientName: 'Rohan Kulkarni',
      tattooStory: 'Geometric Forearm Metamorphosis',
      artistName: 'Amit Kumar',
      year: '2025',
    },
    {
      id: 'test-3',
      quote:
        'Elena’s black and grey chiaroscuro work is otherworldly. The transitions from velvety deep blacks to untouched bare skin highlights make the piece look three-dimensional. The aftercare kit and check-ins made healing effortless.',
      clientName: 'Zoya Merchant',
      tattooStory: 'Renaissance Sculptural Rib Piece',
      artistName: 'Nikhil Kumar',
      year: '2026',
    },
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'How do I book an appointment or consultation?',
      answer:
        'Click the "Book Consultation" button anywhere on our site to launch our multi-step booking modal. You can describe your concept, select your desired artist or service, choose placement, and submit your request via WhatsApp or our direct studio email. We respond within 24 hours.',
      category: 'Booking',
    },
    {
      id: 'faq-2',
      question: 'Do you accept walk-ins or are you appointment-only?',
      answer:
        'To ensure unhurried focus and hospital-grade sanitization between clients, Your Story Tattoo is strictly appointment-only. We occasionally open flash day slots via our Instagram stories, but custom pieces always require advance consultation.',
      category: 'Booking',
    },
    {
      id: 'faq-3',
      question: 'How does the custom design process work?',
      answer:
        'After your initial consultation, your chosen artist creates conceptual sketches based on your brief. We share digital or physical drafts for your review and iterate until the design is flawless. On the day of your appointment, we test the stencil on your body to ensure the placement flows naturally with your anatomy.',
      category: 'Design',
    },
    {
      id: 'faq-4',
      question: 'Will fine-line tattoos blur or fade over time?',
      answer:
        'When executed by seasoned specialists who master correct needle depth, fine-line tattoos heal sharp and age gracefully. We use specialized low-trauma single needles and archival carbon pigments. Proper sun protection and our included aftercare protocol preserve your linework for decades.',
      category: 'Longevity',
    },
    {
      id: 'faq-5',
      question: 'How should I prepare for my tattoo appointment?',
      answer:
        'Stay well-hydrated for 48 hours prior, eat a balanced meal 1–2 hours before arriving, avoid alcohol or blood-thinning medication for 24 hours, and wear comfortable, loose clothing that allows easy access to the tattoo placement area.',
      category: 'Preparation',
    },
    {
      id: 'faq-6',
      question: 'What is your sterilization and hygiene protocol?',
      answer:
        'We adhere to rigorous hospital-grade standards. All needles are single-use sealed cartridges opened in front of you. Work surfaces, power supplies, and armrests are shielded with medical-grade barriers, and all non-disposable instruments undergo hospital-level autoclave sterilization.',
      category: 'Safety',
    },
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'Lord Shiva Tattoo',
      category: 'Fine Line',
      image: {
        src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=85',
        alt: 'Delicate fine-line astronomical compass tattoo on spine',
        desktopPosition: 'center 35%',
        mobilePosition: 'center 35%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-aarav',
      artistName: 'Amit Kumar',
      storySnippet: 'Commemorating a solo circumnavigation and finding grounding in solitude.',
    },
    {
      id: 'gal-2',
      title: 'Samurai Warrior',
      category: 'Black & Grey',
      image: {
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Black and grey realism classical statue tattoo with soft shading',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 45%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-elena',
      artistName: 'Amit Kumar',
      storySnippet: 'An homage to resilience, capturing light falling across marble stone.',
    },
    {
      id: 'gal-3',
      title: 'Illuminati',
      category: 'Geometric',
      image: {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85',
        alt: 'Geometric sacred pattern sleeve with dotwork gradients',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 40%',
        aspectRatio: '1/1',
      },
      artistId: 'artist-marcus',
      artistName: 'Amit Kumar',
      storySnippet: 'A mathematical manifestation of eternal recurring cycles.',
    },
    {
      id: 'gal-4',
      title: 'Custom Tattoo',
      category: 'Minimal',
      image: {
        src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=85',
        alt: 'Minimalist fluid typography tattoo along inner wrist',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 50%',
        aspectRatio: '4/3',
      },
      artistId: 'artist-kavya',
      artistName: 'Amit Kumar',
      storySnippet: 'A single Sanskrit term encapsulating forgiveness and release.',
    },
    {
      id: 'gal-5',
      title: 'Metamorphic Blackwork Blossom',
      category: 'Cover-Up',
      image: {
        src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1200&q=85',
        alt: 'Deep black and negative space floral cover-up transformation',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 30%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-marcus',
      artistName: 'Marcus Vance',
      storySnippet: 'Concealing an old teenage impulse with powerful negative-space peonies.',
    },
    {
      id: 'gal-6',
      title: 'Whisper-Thin Botanical Fern',
      category: 'Fine Line',
      image: {
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
        alt: 'Single needle botanical fern frond along collarbone',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 45%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-aarav',
      artistName: 'Aarav Mehta',
      storySnippet: 'A tribute to mountain roots and generational resilience.',
    },
    {
      id: 'gal-7',
      title: 'Anatomical Heart & Timepiece',
      category: 'Custom',
      image: {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
        alt: 'Custom illustrative anatomical heart merged with gears',
        desktopPosition: 'center 25%',
        mobilePosition: 'center 20%',
        aspectRatio: '1/1',
      },
      artistId: 'artist-elena',
      artistName: 'Elena Rostova',
      storySnippet: 'Marking recovery from a life-altering medical intervention.',
    },
    {
      id: 'gal-8',
      title: 'Architectural Isometric Lines',
      category: 'Geometric',
      image: {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        alt: 'Architectural line grid tattoo wrapped around upper arm',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 30%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-marcus',
      artistName: 'Marcus Vance',
      storySnippet: 'Commemorating an architect’s first constructed building blueprint.',
    },
    {
      id: 'gal-9',
      title: 'Crescent Moon & Ethereal Nebula',
      category: 'Fine Line',
      image: {
        src: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1200&q=85',
        alt: 'Micro fine-line crescent moon with stardust dotwork',
        desktopPosition: 'center 35%',
        mobilePosition: 'center 35%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-aarav',
      artistName: 'Aarav Mehta',
      storySnippet: 'Honoring nocturnal inspiration and personal transformation in quiet hours.',
    },
    {
      id: 'gal-10',
      title: 'Mythological Athena & Olive Branch',
      category: 'Black & Grey',
      image: {
        src: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Classical Greek deity portrait in chiaroscuro realism',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 40%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-elena',
      artistName: 'Elena Rostova',
      storySnippet: 'Embodying wisdom, strategic endurance, and peace forged through trial.',
    },
    {
      id: 'gal-11',
      title: 'Cyber-Tribal Biomechanical Spine',
      category: 'Custom',
      image: {
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Futuristic biomechanical contour aligned to spinal vertebrae',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 45%',
        aspectRatio: '1/1',
      },
      artistId: 'artist-marcus',
      artistName: 'Marcus Vance',
      storySnippet: 'Merging organic spinal anatomy with industrial cybernetic linework.',
    },
    {
      id: 'gal-12',
      title: 'Sacred Mandala Forearm Band',
      category: 'Geometric',
      image: {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85',
        alt: 'Intricate dotwork mandala cuff wrapping around forearm',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 50%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-aarav',
      artistName: 'Aarav Mehta',
      storySnippet: 'A meditative circular diagram representing universal balance.',
    },
    {
      id: 'gal-13',
      title: 'Japanese Sumi-e Crane & Lotus',
      category: 'Custom',
      image: {
        src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=85',
        alt: 'Fluid sumi-e brushstroke Japanese crane soaring through lotus blossoms',
        desktopPosition: 'center 40%',
        mobilePosition: 'center 40%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-kavya',
      artistName: 'Kavya Sen',
      storySnippet: 'Expressing longevity, grace, and rising pure from turbulent water.',
    },
    {
      id: 'gal-14',
      title: 'Negative-Space Phoenix Rebirth',
      category: 'Cover-Up',
      image: {
        src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1200&q=85',
        alt: 'High-contrast blackwork phoenix emerging from negative space',
        desktopPosition: 'center 30%',
        mobilePosition: 'center 30%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-marcus',
      artistName: 'Marcus Vance',
      storySnippet: 'Transforming older fading ink into a symbol of ascendance from ash.',
    },
    {
      id: 'gal-15',
      title: 'Micro Orion Constellation & Starlight',
      category: 'Fine Line',
      image: {
        src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=85',
        alt: 'Single needle micro astronomy coordinates and celestial lines',
        desktopPosition: 'center 35%',
        mobilePosition: 'center 35%',
        aspectRatio: '1/1',
      },
      artistId: 'artist-aarav',
      artistName: 'Aarav Mehta',
      storySnippet: 'Navigational coordinate marking birthplace under the winter solstice.',
    },
    {
      id: 'gal-16',
      title: 'Renaissance Angel & Classical Drapery',
      category: 'Black & Grey',
      image: {
        src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85',
        alt: 'Haunting black and grey wing plumage with sculpted folds of drapery',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 45%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-elena',
      artistName: 'Elena Rostova',
      storySnippet: 'A protective monument dedicated to enduring memory and guardianship.',
    },
    {
      id: 'gal-17',
      title: 'Wild Botanical Thistle & Vines',
      category: 'Fine Line',
      image: {
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
        alt: 'Botanical field thistle with micro serrated leaf contours',
        desktopPosition: 'center 50%',
        mobilePosition: 'center 50%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-kavya',
      artistName: 'Kavya Sen',
      storySnippet: 'Beauty nurtured amidst rough terrain and untamed wilderness.',
    },
    {
      id: 'gal-18',
      title: 'Minimalist Fluid Tidal Wave',
      category: 'Minimal',
      image: {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Single unbroken continuous line wave wrapping wrist',
        desktopPosition: 'center 20%',
        mobilePosition: 'center 20%',
        aspectRatio: '1/1',
      },
      artistId: 'artist-kavya',
      artistName: 'Kavya Sen',
      storySnippet: 'A minimalist reminder to surrender to the immutable ebb and flow.',
    },
    {
      id: 'gal-19',
      title: 'Mythological Serpent & Dagger',
      category: 'Custom',
      image: {
        src: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1200&q=85',
        alt: 'Custom illustrative coiled viper intertwined with obsidian blade',
        desktopPosition: 'center 45%',
        mobilePosition: 'center 45%',
        aspectRatio: '3/4',
      },
      artistId: 'artist-elena',
      artistName: 'Elena Rostova',
      storySnippet: 'Dual symbols of lethal clarity and continual shedding of past skin.',
    },
    {
      id: 'gal-20',
      title: 'Deep Blackout Band & Gradient Fade',
      category: 'Cover-Up',
      image: {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
        alt: 'Heavy solid black band dissolving into atmospheric stipple gradient',
        desktopPosition: 'center 25%',
        mobilePosition: 'center 20%',
        aspectRatio: '4/5',
      },
      artistId: 'artist-marcus',
      artistName: 'Marcus Vance',
      storySnippet: 'An architectural boundary dividing past history from intentional focus.',
    },
  ],

  instagramFeedPreview: {
    headline: 'FOLLOW THE WORK',
    subtitle: 'More stories. More ink. Unfiltered glimpses from our studio floor.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=85',
        alt: 'Macro shot of fresh ink session',
      },
      {
        src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=600&q=85',
        alt: 'Fine line botanical tattoo on client shoulder',
      },
      {
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=85',
        alt: 'Black and grey realism portrait detail',
      },
      {
        src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=600&q=85',
        alt: 'Artist sketching next project in studio notebook',
      },
      {
        src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=600&q=85',
        alt: 'Private studio consultation lounge',
      },
    ],
  },

  brandIntroImage: {
    src: 'https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=800&q=85',
    alt: 'Artist sketching bespoke tattoo design in studio notebook',
    desktopPosition: 'center 40%',
    mobilePosition: 'center 40%',
  },
  locationImage: {
    src: 'https://images.unsplash.com/photo-1590246814883-578336ffbbf9?auto=format&fit=crop&w=1200&q=85',
    alt: 'Your Story Tattoo Studio private appointment interior and sterile equipment',
    desktopPosition: 'center 50%',
    mobilePosition: 'center 50%',
  },
  aboutStudioImage: {
    src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85',
    alt: 'Your Story Tattoo studio founder sketching a custom tattoo concept',
    desktopPosition: 'center 50%',
    mobilePosition: 'center 50%',
  },

  footer: {
    legalNotice: 'All custom designs and photographs are intellectual property of Your Story Tattoo Studio.',
    disclaimer: 'Strictly 18+ only. Government ID verification required for all permanent procedures.',
    copyrightYear: 2026,
  },
};
