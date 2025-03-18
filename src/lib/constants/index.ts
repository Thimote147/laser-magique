// Navigation
export const NAV_ITEMS = [
  { name: 'Laser Game', path: '/laser-game' },
  { name: 'Tarifs', path: '/#pricing' },
  { name: 'Contact', path: '/#contact' }
];

// Business Hours
export const BUSINESS_HOURS = {
  weekdays: {
    open: '09:30',
    close: '19:30'
  },
  weekend: {
    open: '09:30',
    close: '19:30'
  }
};

// Activities
export const ACTIVITIES = {
  LASER_GAME: 'Laser Game',
  CYBER_TRIKE: 'Cyber Trike',
  VR: 'Réalité Virtuelle'
};

// Pricing
export const PRICING = {
  STANDARD: {
    title: 'Tarif Groupe',
    basePrice: 8,
    minPlayers: 2,
    maxPlayers: 20,
    duration: 15 // minutes
  },
  BIRTHDAY: {
    title: 'Tarif Anniversaire',
    basePrice: 200,
    minPlayers: 10,
    extraPlayerPrice: 20,
    duration: 120 // minutes
  }
};

// Form Validation
export const VALIDATION = {
  phone: {
    pattern: /^(\+32|0)[0-9]{9}$/,
    message: 'Veuillez entrer un numéro de téléphone belge valide'
  },
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Veuillez entrer une adresse email valide'
  }
};