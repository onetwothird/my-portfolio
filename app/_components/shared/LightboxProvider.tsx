"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LightboxContextType {
  isLightboxOpen: boolean;
  setLightboxOpen: (isOpen: boolean) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const setLightboxOpen = useCallback((isOpen: boolean) => {
    setIsLightboxOpen(isOpen);
  }, []);

  return (
    <LightboxContext.Provider value={{ isLightboxOpen, setLightboxOpen }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}