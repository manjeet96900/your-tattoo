/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavigationProvider, useNavigation } from '@/src/context/NavigationContext';
import { Navbar } from '@/src/components/navigation/Navbar';
import { MobileMenu } from '@/src/components/navigation/MobileMenu';
import { Footer } from '@/src/components/layout/Footer';
import { CustomCursor } from '@/src/components/ui/CustomCursor';
import { MinimalLoader } from '@/src/components/ui/MinimalLoader';
import { HomePage } from '@/src/components/pages/HomePage';
import { AboutPage } from '@/src/components/pages/AboutPage';
import { ServicesHubPage } from '@/src/components/pages/ServicesHubPage';
import { ServiceDetailPage } from '@/src/components/pages/ServiceDetailPage';
import { GalleryPage } from '@/src/components/pages/GalleryPage';
import { ArtistsPage } from '@/src/components/pages/ArtistsPage';
import { ContactPage } from '@/src/components/pages/ContactPage';
import { LegalPage } from '@/src/components/pages/LegalPage';
import { AdminPage } from '@/src/components/pages/AdminPage';
import { BookingModal } from '@/src/components/booking/BookingModal';
import { FloatingBookingButton } from '@/src/components/booking/FloatingBookingButton';
import { SiteDataProvider } from '@/src/context/SiteDataContext';

const MainContent: React.FC = () => {
  const { currentPath } = useNavigation();

  const isAdminRoute = currentPath.startsWith('/admin');

  const renderActiveRoute = () => {
    if (currentPath.startsWith('/admin')) {
      return <AdminPage />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesHubPage />;
      case '/services/custom-tattoos':
        return <ServiceDetailPage slug="custom-tattoos" />;
      case '/services/fine-line-tattoos':
        return <ServiceDetailPage slug="fine-line-tattoos" />;
      case '/services/tattoo-cover-ups':
        return <ServiceDetailPage slug="tattoo-cover-ups" />;
      case '/services/tattoo-removal':
        return <ServiceDetailPage slug="tattoo-removal" />;
      case '/gallery':
        return <GalleryPage />;
      case '/artists':
        return <ArtistsPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <LegalPage type="privacy" />;
      case '/terms':
        return <LegalPage type="terms" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#050505] text-[#F5F5F3]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>
      <MinimalLoader />
      <CustomCursor />
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <MobileMenu />}

      {/* Main Routed Page Content */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {renderActiveRoute()}
      </main>

      {!isAdminRoute && <BookingModal />}
      {!isAdminRoute && <FloatingBookingButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <SiteDataProvider>
        <MainContent />
      </SiteDataProvider>
    </NavigationProvider>
  );
}
