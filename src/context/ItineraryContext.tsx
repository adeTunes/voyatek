"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

export type ItineraryItem = {
  type: 'flight' | 'hotel' | 'activity';
  data: any;
};

interface ItineraryContextType {
  items: ItineraryItem[];
  addItem: (item: ItineraryItem) => void;
  removeItem: (index: number) => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  const addItem = (item: ItineraryItem) => setItems((prev) => [...prev, item]);
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <ItineraryContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const ctx = useContext(ItineraryContext);
  if (!ctx) throw new Error('useItinerary must be used within ItineraryProvider');
  return ctx;
}
