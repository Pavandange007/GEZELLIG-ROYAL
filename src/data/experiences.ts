export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: string;
}

export interface PackageTier {
  id: string;
  name: string;
  price: number;
  description: string;
  inclusions: string[];
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: 'Luxury Drives' | 'Fine Dining' | '5-Star Stays' | 'Fine Desserts' | 'Romance' | 'Celebrations' | 'Personalised Experiences';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  priceFrom: number;
  currency: string;
  image: string;
  gallery: string[];
  location: string;
  duration: string;
  availableDates: string[];
  includedItems: string[];
  optionalExtras: ExtraOption[];
  packages: PackageTier[];
  terms: string;
  cancellationPolicy: string;
  minimumAge?: number;
  maximumParticipants?: number;
  featured: boolean;
  rating: number;
  reviewsCount: number;
}

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    slug: 'the-royal-drive',
    title: 'The Royal Drive',
    category: 'Luxury Drives',
    categoryLabel: 'LUXURY DRIVE',
    shortDescription: 'An unforgettable day behind the wheel of iconic high-performance vehicles across scenic Dutch countryside & historic estates.',
    fullDescription: 'Command the finest engineering in automotive history. You will be greeted by a private concierge at an exclusive estate in the Veluwe, where a choice of high-performance luxury vehicles (Ferrari F8 Tributo, Aston Martin DB11, or Bentley Continental GT) awaits. The experience includes a bespoke GPS route through majestic forests and castle estates, a private champagne lunch at Kasteel Engelenburg, and dedicated vehicle support throughout your journey.',
    priceFrom: 850,
    currency: 'EUR',
    image: '/images/hero.jpg',
    gallery: [
      '/images/hero.jpg',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Veluwe & Gelderland Estate, Netherlands',
    duration: 'Full Day (8 Hours)',
    availableDates: ['2026-10-15', '2026-10-18', '2026-10-22', '2026-10-25', '2026-11-01', '2026-11-08'],
    includedItems: [
      'Private vehicle orientation & safety brief with professional instructor',
      '250km driving distance allowance with premium fuel included',
      '3-Course Michelin-guided lunch at Kasteel Engelenburg',
      'Bespoke digital & printed scenic route navigation',
      'Commemorative luxury gift box & souvenir drive video'
    ],
    optionalExtras: [
      { id: 'ext-champagne', name: 'Dom Pérignon Vintage Champagne', price: 290, description: 'Chilled bottle waiting upon lunch arrival' },
      { id: 'ext-photo', name: 'Private Automotive Photographer', price: 450, description: 'Dedicated photographer following your route' },
      { id: 'ext-chauffeur', name: 'Door-to-Door Chauffeur Pick-up', price: 320, description: 'Return transfer in Mercedes Maybach' }
    ],
    packages: [
      {
        id: 'pkg-essential',
        name: 'ROYAL ESSENTIAL',
        price: 850,
        description: 'Single high-performance supercar drive for 1 driver + passenger.',
        inclusions: ['Supercar selection (1 vehicle)', 'Castle lunch for 2', 'Standard insurance']
      },
      {
        id: 'pkg-signature',
        name: 'ROYAL SIGNATURE',
        price: 1350,
        description: 'Multi-car rotation drive allowing you to sample two distinct supercars.',
        inclusions: ['2 Supercar rotations', 'Gourmet lunch with wine pairing', 'Reduced insurance deductible', 'Luxury gift hamper']
      },
      {
        id: 'pkg-exclusive',
        name: 'ROYAL EXCLUSIVE',
        price: 2200,
        description: 'The ultimate VIP driving weekend with 5-star castle overnight stay.',
        inclusions: ['Full weekend supercar access', '5-Star Castle Suite stay', '5-Course dinner with sommelier pairings', 'Full coverage VIP insurance']
      }
    ],
    terms: 'Valid driver’s license required held for a minimum of 3 years. Security deposit pre-authorization required on date of event.',
    cancellationPolicy: 'Free cancellation up to 14 days prior to scheduled date. Rescheduling permitted up to 7 days before.',
    minimumAge: 25,
    maximumParticipants: 2,
    featured: true,
    rating: 4.98,
    reviewsCount: 42
  },
  {
    id: 'exp-2',
    slug: 'haute-patisserie-grand-tasting',
    title: 'Haute Pâtisserie & Grand Dessert Tasting',
    category: 'Fine Desserts',
    categoryLabel: 'HAUTE DESSERT EXPERIENCE',
    shortDescription: 'An exquisite multi-course dessert pairing journey crafted by a master pastry chef overlooking Amsterdam’s historic canals.',
    fullDescription: 'Indulge in an extraordinary culinary afternoon dedicated entirely to high confectionery art. Hosted in a private salon overlooking the Herengracht in Amsterdam, Master Pastry Chef Julien Laurent presents a 6-course dessert menu celebrating rare single-origin chocolates, edible gold, rare botanicals, and artisanal pralines paired with fine Vintage Champagnes and rare white teas.',
    priceFrom: 245,
    currency: 'EUR',
    image: '/images/dessert.jpg',
    gallery: [
      '/images/dessert.jpg',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Private Canal Salon, Herengracht, Amsterdam',
    duration: '3 Hours',
    availableDates: ['2026-10-14', '2026-10-17', '2026-10-21', '2026-10-24', '2026-10-31'],
    includedItems: [
      '6-Course seasonal pastry & confectionery menu',
      'Pairing of 3 Vintage Champagnes & rare botanical teas',
      'Live pastry plating demonstration by Master Chef',
      'Personalized Royal Dessert Gift Box to take home'
    ],
    optionalExtras: [
      { id: 'ext-roses', name: '50 Red Dutch Velvet Roses', price: 180, description: 'Arranged beautifully at your private salon table' },
      { id: 'ext-pastry-class', name: 'Private Masterclass Extension', price: 220, description: '1-Hour hands-on soufflé & truffle masterclass' }
    ],
    packages: [
      {
        id: 'pkg-dessert-essential',
        name: 'ROYAL ESSENTIAL',
        price: 245,
        description: 'Grand Tasting menu for 2 guests with Champagne pairings.',
        inclusions: ['6-Course Dessert Menu', '3 Champagne Pairings', 'Gift Confectionery Box']
      },
      {
        id: 'pkg-dessert-signature',
        name: 'ROYAL SIGNATURE',
        price: 390,
        description: 'Private salon room reservation with customized sugar art monogram.',
        inclusions: ['Private Salon for 2', 'Customized Monogram Dessert', 'Unlimited Champagne Pairing', 'Luxury Floral Table Setup']
      }
    ],
    terms: 'Dietary preferences & nut allergies accommodated with 72 hours advance notice.',
    cancellationPolicy: 'Free cancellation up to 7 days prior.',
    minimumAge: 18,
    maximumParticipants: 4,
    featured: true,
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: 'exp-3',
    slug: 'amstel-five-star-palace-escape',
    title: '5-Star Royal Palace Escape',
    category: '5-Star Stays',
    categoryLabel: '5-STAR HOTEL STAY',
    shortDescription: 'Escape into supreme comfort, canal-side elegance, and royal hospitality at the iconic Amstel River Palace hotel.',
    fullDescription: 'Experience timeless elegance in the heart of Amsterdam. Your getaway begins with a private canal boat transfer directly to the hotel landing quay, followed by private suite check-in, personal butler service, a 5-course candlelit dinner at the Michelin-starred dining room, and an effortless high tea breakfast in your private suite balcony.',
    priceFrom: 1200,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Amstel River Palace Hotel, Amsterdam',
    duration: '2 Days / 1 Night',
    availableDates: ['2026-10-16', '2026-10-20', '2026-10-27', '2026-11-03', '2026-11-10'],
    includedItems: [
      'Executive Royal Suite accommodation with panoramic river view',
      'Private classic wooden salon boat transfer upon arrival',
      '24-Hour dedicated personal butler service',
      '5-Course dinner with sommelier wine pairing for 2',
      'Unlimited access to spa & heated indoor pool'
    ],
    optionalExtras: [
      { id: 'ext-spa-couple', name: 'Royal Duo Couples Spa Treatment', price: 340, description: '90-minute massage & rose petal bath' },
      { id: 'ext-champagne-suite', name: 'Dom Pérignon & Caviar Suite Setup', price: 490, description: 'Chilled Champagne & Oscietra caviar on arrival' }
    ],
    packages: [
      {
        id: 'pkg-stay-essential',
        name: 'ROYAL ESSENTIAL',
        price: 1200,
        description: '1 Night Executive Suite Stay with Dinner & Breakfast.',
        inclusions: ['Executive Suite', '5-Course Dinner', 'Canal Boat Arrival']
      },
      {
        id: 'pkg-stay-signature',
        name: 'ROYAL SIGNATURE',
        price: 1950,
        description: '2 Night Palace Stay with Spa Access and Champagne setup.',
        inclusions: ['2 Nights Royal Suite', 'Couples Spa Treatment', 'Champagne & Caviar on arrival', 'Private Butler']
      }
    ],
    terms: 'Valid passport or EU identity card required for check-in.',
    cancellationPolicy: 'Free cancellation up to 7 days prior.',
    minimumAge: 18,
    maximumParticipants: 2,
    featured: true,
    rating: 4.97,
    reviewsCount: 56
  },
  {
    id: 'exp-4',
    slug: 'private-canal-champagne-supper',
    title: 'Private Candlelit Canal Supper',
    category: 'Romance',
    categoryLabel: 'ROMANTIC EXPERIENCE',
    shortDescription: 'Glide through Amsterdam’s historic lit canals aboard a vintage 1920s wooden salon boat with private chef & champagne.',
    fullDescription: 'Step aboard an intimate restored 1920s mahogany salon boat reserved exclusively for the two of you. As soft classical melodies play, cruise under glowing historic bridges while a private chef prepares a bespoke 4-course seasonal dinner served candlelit at your table.',
    priceFrom: 590,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Prinsengracht Dock, Amsterdam',
    duration: '3.5 Hours',
    availableDates: ['2026-10-15', '2026-10-19', '2026-10-23', '2026-10-30', '2026-11-06'],
    includedItems: [
      'Private 3.5 hour private charter on luxury mahogany salon boat',
      '4-Course fine dining supper prepared onboard by private chef',
      'Unlimited champagne, wine, and craft refreshments',
      'Candlelight decor & customizable acoustic playlist'
    ],
    optionalExtras: [
      { id: 'ext-violinist', name: 'Live Acoustic Violinist', price: 350, description: 'Solo violinist playing romantic serenades during supper' }
    ],
    packages: [
      {
        id: 'pkg-romance-essential',
        name: 'ROYAL ESSENTIAL',
        price: 590,
        description: 'Private 3.5h boat charter with 4-course dinner.',
        inclusions: ['Exclusive Salon Boat', '4-Course Dinner', 'Champagne & Wine']
      }
    ],
    terms: 'Heated indoor cabin available for winter cruises.',
    cancellationPolicy: 'Free cancellation up to 5 days prior.',
    minimumAge: 18,
    maximumParticipants: 2,
    featured: true,
    rating: 4.99,
    reviewsCount: 64
  },
  {
    id: 'exp-5',
    slug: 'kasteel-anniversary-soiree',
    title: 'Kasteel Royal Anniversary Soirée',
    category: 'Celebrations',
    categoryLabel: 'CELEBRATION EXPERIENCE',
    shortDescription: 'Celebrate milestone anniversaries and birthdays inside a private wing of a 14th-century Dutch castle estate.',
    fullDescription: 'Transform a milestone celebration into a royal memory. Nestled near Utrecht, Kasteel de Haar opens its private dining chambers for your celebratory soirée. Complete with harpist music, a 6-course Michelin menu, customized fireworks display, and luxury return limousine service.',
    priceFrom: 1450,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Castle Estate, Utrecht Region, Netherlands',
    duration: 'Full Evening (5 Hours)',
    availableDates: ['2026-10-17', '2026-10-24', '2026-11-07', '2026-11-14'],
    includedItems: [
      'Private castle dining chamber exclusive reservation',
      '6-Course tasting menu with wine pairing',
      'Live acoustic harp or piano accompaniment',
      'Engraved crystal keepsake & celebratory cake'
    ],
    optionalExtras: [
      { id: 'ext-fireworks', name: 'Private Castle Courtyard Fireworks', price: 850, description: '3-minute synchronized fireworks display' }
    ],
    packages: [
      {
        id: 'pkg-soiree-essential',
        name: 'ROYAL ESSENTIAL',
        price: 1450,
        description: 'Private Castle Dinner for up to 4 guests.',
        inclusions: ['Castle Dining Chamber', '6-Course Tasting Menu', 'Live Harpist']
      }
    ],
    terms: 'Smart formal attire required.',
    cancellationPolicy: 'Free cancellation up to 14 days prior.',
    minimumAge: 18,
    maximumParticipants: 8,
    featured: false,
    rating: 4.95,
    reviewsCount: 29
  },
  {
    id: 'exp-6',
    slug: 'bespoke-helicopter-limburg-vineyard',
    title: 'Bespoke Helicopter & Vineyard Escape',
    category: 'Personalised Experiences',
    categoryLabel: 'BESPOKE EXPERIENCE',
    shortDescription: 'Soar across Dutch landscapes in a private helicopter to an exclusive southern vineyard estate with sommelier pairing.',
    fullDescription: 'The ultimate personalised luxury journey. Depart from Amsterdam or Rotterdam via private Eurocopter, enjoying aerial panoramas of Dutch wind parks and river deltas before landing directly at a private vineyard in South Limburg. Includes private wine harvest tour, 5-course truffle dining, and bespoke leather gift luggage.',
    priceFrom: 2100,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Amsterdam Airfield to South Limburg Vineyard',
    duration: '6 Hours',
    availableDates: ['2026-10-18', '2026-10-25', '2026-11-01', '2026-11-15'],
    includedItems: [
      'Private helicopter return flight for up to 4 guests',
      'Private vineyard masterclass & vintage wine tasting',
      '5-Course chef table tasting menu paired with estate reserve wines',
      'Bespoke monogrammed luxury luggage gift'
    ],
    optionalExtras: [
      { id: 'ext-sommelier-case', name: 'Case of Estate Reserve Vintage Wines', price: 650, description: '6 bottles of estate reserve shipped to home address' }
    ],
    packages: [
      {
        id: 'pkg-helicopter-essential',
        name: 'ROYAL EXCLUSIVE',
        price: 2100,
        description: 'Complete helicopter transfer & vineyard dining for 2 guests.',
        inclusions: ['Helicopter Flights', 'Vineyard Masterclass', '5-Course Truffle Dining', 'Monogrammed Gift']
      }
    ],
    terms: 'Flight conditional on weather safety clearance.',
    cancellationPolicy: 'Full refund or date transfer if cancelled due to weather.',
    minimumAge: 18,
    maximumParticipants: 4,
    featured: true,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'exp-7',
    slug: 'michelin-chefs-table-gastronomy',
    title: 'Michelin Chef’s Table & Wine Symphony',
    category: 'Fine Dining',
    categoryLabel: 'FINE DINING',
    shortDescription: 'An exclusive multi-course culinary journey seated at the private chef’s counter with sommelier wine pairings in a penthouse dining room.',
    fullDescription: 'Immerse yourself in world-class culinary artistry. Seated at an intimate private chef’s counter overlooking panoramic city views, Executive Chef Julian presents a bespoke 7-course seasonal gastronomy journey. Watch culinary masters craft innovative dishes using Dutch North Sea langoustines, Wagyu beef, and heirloom ingredients, with each course accompanied by rare vintage wine pairings chosen by the Head Sommelier.',
    priceFrom: 480,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Rotterdam Harbour Penthouse, Netherlands',
    duration: '4 Hours',
    availableDates: ['2026-10-16', '2026-10-19', '2026-10-23', '2026-10-28', '2026-11-04', '2026-11-11'],
    includedItems: [
      '7-Course seasonal haute gastronomy tasting menu for 2',
      'Curated sommelier wine pairing with rare reserve vintages',
      'Direct chef interaction and kitchen tour',
      'Commemorative personalized leather menu keepsake'
    ],
    optionalExtras: [
      { id: 'ext-caviar-tasting', name: 'Imperial Oscietra Caviar Course', price: 160, description: 'Handcrafted caviar pairing with vintage champagne' },
      { id: 'ext-sommelier-bottle', name: 'Reserve Cellar Vintage Bottle Gift', price: 280, description: 'Exclusive bottle of sommelier reserve wine to take home' }
    ],
    packages: [
      {
        id: 'pkg-dining-essential',
        name: 'ROYAL ESSENTIAL',
        price: 480,
        description: '7-Course tasting menu with wine pairings for 2 guests.',
        inclusions: ['7-Course Tasting Menu', 'Full Wine Pairing', 'Chef Welcome']
      },
      {
        id: 'pkg-dining-signature',
        name: 'ROYAL SIGNATURE',
        price: 780,
        description: 'VIP Chef’s Counter with Caviar upgrade and Dom Pérignon Champagne toast.',
        inclusions: ['Private Chef Counter', 'Caviar Upgrade', 'Vintage Champagne Pairing', 'Kitchen Tour & Signed Book']
      }
    ],
    terms: 'Smart elegant attire requested. Dietary requests accommodated with 48 hours notice.',
    cancellationPolicy: 'Free cancellation up to 5 days prior.',
    minimumAge: 18,
    maximumParticipants: 4,
    featured: true,
    rating: 4.99,
    reviewsCount: 47
  },
  {
    id: 'exp-8',
    slug: 'the-grand-private-salon-gastronomy',
    title: 'The Grand Private Salon Gastronomy',
    category: 'Fine Dining',
    categoryLabel: 'FINE DINING',
    shortDescription: 'An intimate candlelit dining experience in a 17th-century private historic salon along Amsterdam’s canals.',
    fullDescription: 'Dine in complete privacy in a restored historic monument salon in Amsterdam. A dedicated butler and private chef team deliver a 6-course royal dining experience with custom table florals, French champagne, and bespoke acoustic background music.',
    priceFrom: 650,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Oudezijds Canal Historic Salon, Amsterdam',
    duration: '4.5 Hours',
    availableDates: ['2026-10-17', '2026-10-21', '2026-10-26', '2026-10-31', '2026-11-07'],
    includedItems: [
      'Exclusive private historic salon room reservation for the evening',
      '6-Course seasonal gourmet dinner served by private butler',
      'Vintage Champagne reception upon arrival',
      'Bespoke floral centerpiece arranged for your table'
    ],
    optionalExtras: [
      { id: 'ext-harpist', name: 'Private Classical Harpist', price: 380, description: 'Live acoustic melodies during dinner service' }
    ],
    packages: [
      {
        id: 'pkg-salon-essential',
        name: 'ROYAL ESSENTIAL',
        price: 650,
        description: 'Private Salon dinner with Champagne reception for 2 guests.',
        inclusions: ['Private Salon', '6-Course Dinner', 'Champagne Reception', 'Personal Butler']
      }
    ],
    terms: 'Exclusive single party booking per evening.',
    cancellationPolicy: 'Free cancellation up to 7 days prior.',
    minimumAge: 18,
    maximumParticipants: 6,
    featured: false,
    rating: 4.96,
    reviewsCount: 31
  }
];
