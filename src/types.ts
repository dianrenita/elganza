export interface EventPackage {
  id: string;
  name: string;
  category: 'birthday' | 'seminar' | 'gala' | 'other';
  venueType: 'indoor' | 'outdoor';
  basePrice: number; // in IDR (Rupiah)
  description: string;
  benefits: string[];
  image: string;
  maxGuests: number;
  durationHours: number;
}

export interface EventAddon {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  packageId: string;
  venuePreference: 'indoor' | 'outdoor';
  guestCount: number;
  date: string;
  selectedAddons: string[];
  additionalNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
