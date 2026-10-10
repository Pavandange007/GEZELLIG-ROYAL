import React, { createContext, useContext, useState, useEffect } from 'react';
import { Experience, INITIAL_EXPERIENCES } from '../data/experiences';

export interface Booking {
  id: string;
  referenceCode: string;
  experienceId: string;
  experienceTitle: string;
  selectedDate: string;
  packageName: string;
  priceTotal: number;
  extras: string[];
  bundledExperiences?: string[];
  recipientName: string;
  recipientMessage?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface GiftCardOrder {
  id: string;
  code: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  createdAt: string;
  status: 'Active' | 'Redeemed';
}

export interface StoreSettings {
  whatsappNumber: string;
  businessEmail: string;
  defaultCurrency: string;
  enableFlexiblePayment: boolean;
  enableGiftCards: boolean;
  addressSummary: string;
}

interface AdminContextType {
  experiences: Experience[];
  bookings: Booking[];
  giftCards: GiftCardOrder[];
  settings: StoreSettings;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => Booking;
  createGiftCard: (card: Omit<GiftCardOrder, 'id' | 'code' | 'createdAt' | 'status'>) => GiftCardOrder;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: '31614662672', // Configurable official Netherlands WhatsApp number (+31614662672)
  businessEmail: 'concierge@gezelligroyal.nl',
  defaultCurrency: 'EUR',
  enableFlexiblePayment: true,
  enableGiftCards: true,
  addressSummary: 'The Netherlands & Select European Destinations',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('gezellig_experiences');
    if (!saved) return INITIAL_EXPERIENCES;
    try {
      const parsed: Experience[] = JSON.parse(saved);
      const missing = INITIAL_EXPERIENCES.filter(init => !parsed.some(p => p.id === init.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        localStorage.setItem('gezellig_experiences', JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch {
      return INITIAL_EXPERIENCES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('gezellig_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'b-1001',
        referenceCode: 'GR-884920',
        experienceId: 'exp-1',
        experienceTitle: 'The Royal Drive',
        selectedDate: '2026-10-25',
        packageName: 'ROYAL SIGNATURE',
        priceTotal: 1350,
        extras: ['Dom Pérignon Vintage Champagne', 'Private Chauffeur Transfer'],
        recipientName: 'Willem-Alexander van Dijk',
        recipientMessage: 'Wishing you a monumental 40th birthday experience.',
        customerName: 'Sophie van Dijk',
        customerEmail: 'sophie.vandijk@example.nl',
        customerPhone: '+31 6 98765432',
        paymentMethod: 'iDEAL (ABN AMRO)',
        createdAt: '2026-10-09T14:20:00Z',
        status: 'Confirmed'
      }
    ];
  });

  const [giftCards, setGiftCards] = useState<GiftCardOrder[]>(() => {
    const saved = localStorage.getItem('gezellig_gift_cards');
    return saved ? JSON.parse(saved) : [
      {
        id: 'gc-201',
        code: 'ROYAL-7749-Vip',
        amount: 500,
        recipientName: 'Lotte de Jong',
        recipientEmail: 'lotte@example.nl',
        senderName: 'Jasper de Jong',
        message: 'For an unforgettable dining night together.',
        createdAt: '2026-10-08T10:15:00Z',
        status: 'Active'
      }
    ];
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('gezellig_settings');
    if (!saved) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.whatsappNumber === '31612345678' || !parsed.whatsappNumber) {
        parsed.whatsappNumber = '31614662672';
      }
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem('gezellig_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('gezellig_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('gezellig_gift_cards', JSON.stringify(giftCards));
  }, [giftCards]);

  useEffect(() => {
    localStorage.setItem('gezellig_settings', JSON.stringify(settings));
  }, [settings]);

  const addExperience = (newExpData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...newExpData,
      id: `exp-${Date.now()}`
    };
    setExperiences(prev => [newExp, ...prev]);
  };

  const updateExperience = (id: string, updatedFields: Partial<Experience>) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedFields } : exp));
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'referenceCode' | 'createdAt' | 'status'>): Booking => {
    const randomRef = 'GR-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
      referenceCode: randomRef,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const createGiftCard = (cardData: Omit<GiftCardOrder, 'id' | 'code' | 'createdAt' | 'status'>): GiftCardOrder => {
    const code = 'ROYAL-' + Math.floor(1000 + Math.random() * 9000) + '-GC';
    const newCard: GiftCardOrder = {
      ...cardData,
      id: `gc-${Date.now()}`,
      code,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };
    setGiftCards(prev => [newCard, ...prev]);
    return newCard;
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setExperiences(INITIAL_EXPERIENCES);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('gezellig_experiences');
    localStorage.removeItem('gezellig_settings');
  };

  return (
    <AdminContext.Provider value={{
      experiences,
      bookings,
      giftCards,
      settings,
      addExperience,
      updateExperience,
      deleteExperience,
      createBooking,
      createGiftCard,
      updateSettings,
      resetToDefaults
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
