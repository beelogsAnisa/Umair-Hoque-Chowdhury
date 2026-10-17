/* ------------------------------------------------------------------
   CATALOG — prices taken from upartynyc.com/rentals (checked Oct 2026).
   price: number = listed rate, null = quoted on request.
   ------------------------------------------------------------------ */
const CATEGORIES = [
  { id: 'seating', label: 'Seating' },
  { id: 'tables', label: 'Tables' },
  { id: 'decor', label: 'Linens & Decor' },
  { id: 'tents', label: 'Tents' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'concessions', label: 'Concessions' }
];

const PRODUCTS = [
  /* Seating */
  { id: 'chiavari-gold', cat: 'seating', name: 'Gold & Clear Chiavari Chair', price: 10, unit: 'each', note: 'Elegant seating for weddings, showers and milestone events.' },
  { id: 'chiavari-cushion', cat: 'seating', name: 'Chiavari Chair with Cushion', price: 13, unit: 'each', note: 'The same chair with a cushion for longer celebrations.' },
  { id: 'folding-white', cat: 'seating', name: 'White Folding Chair', price: 2.5, unit: 'each', note: 'Budget-friendly seating for bigger guest lists.' },
  { id: 'folding-black', cat: 'seating', name: 'Black Folding Chair', price: 3, unit: 'each', note: 'A sleek black finish that suits any theme.' },
  { id: 'folding-heavy', cat: 'seating', name: 'Heavy-Duty Folding Chair', price: 3, unit: 'each', note: 'A sturdier build for heavier everyday use.' },
  { id: 'throne', cat: 'seating', name: 'Throne Chair', price: null, unit: 'quote', note: 'Statement seating for birthdays and celebrations.' },
  { id: 'toddler', cat: 'seating', name: 'Toddler Chairs & Tables', price: null, unit: 'quote', note: 'Kid-sized sets for party rooms.' },

  /* Tables */
  { id: 'table-4', cat: 'tables', name: '4 ft Table', price: 10, unit: 'each', note: 'Compact tables for small gatherings.' },
  { id: 'table-6', cat: 'tables', name: '6 ft Table', price: 12, unit: 'each', note: 'The everyday banquet table.' },
  { id: 'table-8', cat: 'tables', name: '8 ft Table', price: 15, unit: 'each', note: 'Long tables for family-style seating.' },
  { id: 'table-60', cat: 'tables', name: '60" Table (seats 8)', price: 15, unit: 'each', note: 'Seats 8. Delivery only.' },
  { id: 'round-48', cat: 'tables', name: '48" Round Table (seats 4)', price: 15, unit: 'each', note: 'Round tables for four guests each.' },
  { id: 'cocktail-36', cat: 'tables', name: '30" / 36" Cocktail Table', price: 15, unit: 'each', note: 'Standing-height tables for mingling.' },
  { id: 'bar-table', cat: 'tables', name: '30" / 36" High Bar Table', price: 15, unit: 'each', note: 'High tables for lounge-style setups.' },
  { id: 'bar-cover', cat: 'tables', name: 'High Bar Table Cover', price: 8, unit: 'each', note: 'Available in white or black.' },
  { id: 'portable-bar', cat: 'tables', name: 'Portable Bar', price: 200, unit: 'each', note: 'Serve drinks wherever the party is.' },

  /* Linens & decor */
  { id: 'chair-cover', cat: 'decor', name: 'Chair Cover', price: 2, unit: 'each', note: 'Dress up any chair. More colours available.' },
  { id: 'chair-sachet', cat: 'decor', name: 'Chair Sachet', price: 2, unit: 'each', note: 'A finishing touch for chair backs.' },
  { id: 'marquee-numbers', cat: 'decor', name: 'Marquee 5 ft Large Numbers', price: 100, unit: 'each', note: 'Light-up numbers for birthdays and anniversaries.' },
  { id: 'backdrop', cat: 'decor', name: 'Backdrops', price: null, unit: 'quote', note: 'Several styles. Ask about availability.' },
  { id: 'illum-arch', cat: 'decor', name: 'Illuminated Arch', price: null, unit: 'quote', note: 'A glowing arch to frame your entrance or photo wall.' },
  { id: 'dinner-napkins', cat: 'decor', name: 'Dinner Napkins', price: null, unit: 'quote', note: 'Napkins for dinner service.' },
  { id: 'candy-jars', cat: 'decor', name: 'Candy Jars', price: null, unit: 'quote', note: 'Glass jars for your candy display.' },

  /* Tents */
  { id: 'gazebo-10x10', cat: 'tents', name: '10x10 Gazebo Tent', price: null, unit: 'quote', note: 'Shade and shelter for smaller outdoor events.' },
  { id: 'gazebo-10x20', cat: 'tents', name: '10x20 Gazebo Tent', price: null, unit: 'quote', note: 'Room for a larger outdoor group.' },
  { id: 'mesh-10x10', cat: 'tents', name: '10x10 Mesh Net', price: null, unit: 'quote', note: 'Mesh netting panel, 10x10.' },
  { id: 'mesh-10x20', cat: 'tents', name: '10x20 Mesh Net', price: null, unit: 'quote', note: 'Mesh netting panel, 10x20.' },

  /* Entertainment */
  { id: 'dj', cat: 'entertainment', name: 'DJ', price: null, unit: 'quote', note: 'Book a DJ to set the mood.' },
  { id: 'comedian', cat: 'entertainment', name: 'Comedian', price: null, unit: 'quote', note: 'Live comedy for adult parties.' },
  { id: 'magician', cat: 'entertainment', name: 'Magician', price: null, unit: 'quote', note: 'Close-up and stage magic for all ages.' },
  { id: 'clown', cat: 'entertainment', name: 'Clown', price: null, unit: 'quote', note: 'Balloons, games and big smiles.' },
  { id: 'characters', cat: 'entertainment', name: 'Characters', price: null, unit: 'quote', note: 'Costumed characters for kids\u2019 parties.' },
  { id: 'airbrush', cat: 'entertainment', name: 'Airbrush Tattoos', price: null, unit: 'quote', note: 'Temporary airbrush tattoos for guests.' },
  { id: 'face-paint', cat: 'entertainment', name: 'Face Painting', price: null, unit: 'quote', note: 'Face painting for kids and grown-ups.' },

  /* Concessions */
  { id: 'popcorn', cat: 'concessions', name: 'Popcorn Machine', price: null, unit: 'quote', note: 'Fresh popcorn at your event.' },
  { id: 'cotton-candy', cat: 'concessions', name: 'Cotton Candy Machine', price: null, unit: 'quote', note: 'Spun sugar, made to order.' },
  { id: 'ice-cream', cat: 'concessions', name: 'Ice Cream Machine', price: null, unit: 'quote', note: 'Soft-serve style ice cream on site.' },
  { id: 'candy-station', cat: 'concessions', name: 'Candy Station', price: null, unit: 'quote', note: 'A full candy bar for the guests.' },
  { id: 'dessert-bar', cat: 'concessions', name: 'Dessert Bar', price: null, unit: 'quote', note: 'A sweet table for cakes and treats.' },
  { id: 'photo-booth', cat: 'concessions', name: 'Photo Booth', price: null, unit: 'quote', note: 'Instant photo fun for every guest.' },
  { id: 'fog', cat: 'concessions', name: 'Fog Machine', price: null, unit: 'quote', note: 'Atmosphere for the dance floor.' },
  { id: 'bubble', cat: 'concessions', name: 'Bubble Machine', price: null, unit: 'quote', note: 'Bubbles for kids\u2019 parties and photos.' }
];

/* Chairs offered in the planner */
const PLANNER_CHAIRS = ['folding-white', 'chiavari-gold', 'folding-black'];
