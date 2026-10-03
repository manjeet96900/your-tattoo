/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/services/custom-tattoos'
  | '/services/fine-line-tattoos'
  | '/services/tattoo-cover-ups'
  | '/services/tattoo-removal'
  | '/gallery'
  | '/artists'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/admin';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  bookingInitialData?: { artistId?: string; serviceId?: string };
  openBookingWithData: (data?: { artistId?: string; serviceId?: string }) => void;
  isMehendiTransitioning: boolean;
  triggerMehendiTransition: () => void;
  selectedCategory?: string;
  setSelectedCategory: (cat: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{ artistId?: string; serviceId?: string } | undefined>(undefined);
  const [isMehendiTransitioning, setIsMehendiTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const openBookingWithData = useCallback((data?: { artistId?: string; serviceId?: string }) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const triggerMehendiTransition = useCallback(() => {
    setIsMehendiTransitioning(true);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingInitialData,
        openBookingWithData,
        isMehendiTransitioning,
        triggerMehendiTransition,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
