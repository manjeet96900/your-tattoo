/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { BrandIntroSection } from '@/src/components/sections/BrandIntroSection';
import { FeaturedWorkSection } from '@/src/components/sections/FeaturedWorkSection';
import { ServicesSection } from '@/src/components/sections/ServicesSection';
import { ArtistsSection } from '@/src/components/sections/ArtistsSection';
import { ProcessSection } from '@/src/components/sections/ProcessSection';
import { WhyYourStorySection } from '@/src/components/sections/WhyYourStorySection';
import { TestimonialsSection } from '@/src/components/sections/TestimonialsSection';
import { FAQSection } from '@/src/components/sections/FAQSection';
import { FinalCTASection } from '@/src/components/sections/FinalCTASection';
import { LocationSection } from '@/src/components/sections/LocationSection';
import { InstagramSection } from '@/src/components/sections/InstagramSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Intro / Brand Statement */}
      <BrandIntroSection />

      {/* 3. Featured Work */}
      <FeaturedWorkSection />

      {/* 4. Services */}
      <ServicesSection />

      {/* 5. Our Artists */}
      <ArtistsSection />

      {/* 6. The Process */}
      <ProcessSection />

      {/* 7. Why Your Story */}
      <WhyYourStorySection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ (Homepage Only as specified) */}
      <FAQSection />

      {/* 10. CTA / Booking */}
      <FinalCTASection />

      {/* 11. Location / Contact */}
      <LocationSection />

      {/* 12. Social / Instagram */}
      <InstagramSection />
    </div>
  );
};
