// Data model for Count Kustom Atelier Furniture Studio (LIM & Live-Edge Aesthetic)

export const INSTAGRAM_URL = "https://www.instagram.com/countkustom.atelier?stkn=dGt0NGJscXoxN3M2&utm_source=qr";
export const INSTAGRAM_HANDLE = "@countkustom.atelier";
export const WHATSAPP_NUMBER = "918591851282";
export const WHATSAPP_DISPLAY = "+91 85918 51282";
export const WHATSAPP_URL = "https://wa.me/918591851282";

export const MATERIALS = [
  { id: 'limed-oak', name: 'Limed European Oak', color: '#D8C7B0', textureBg: 'bg-[#D8C7B0]', category: 'Wood', priceMultiplier: 1.0, description: 'Hand-brushed white oil finish revealing natural grain texture.' },
  { id: 'live-edge-teak', name: 'Raw Live-Edge Organic Teak Slab', color: '#8B5A2B', textureBg: 'bg-[#8B5A2B]', category: 'Live-Edge Wood', priceMultiplier: 1.15, description: 'Single natural tree slab preserving organic edge contours and rich grain figure.' },
  { id: 'hairpin-metal', name: 'Matte Black Steel Hairpin Legs', color: '#1C1B18', textureBg: 'bg-[#1C1B18]', category: 'Metal', priceMultiplier: 1.0, description: 'Industrial double-rod steel hairpin legs with satin black powder coat.' },
  { id: 'smoked-walnut', name: 'Smoked American Walnut', color: '#4A3B32', textureBg: 'bg-[#4A3B32]', category: 'Wood', priceMultiplier: 1.15, description: 'Deep chocolate undertones with rich, undulating grain.' },
  { id: 'bleached-ash', name: 'Bleached Ash', color: '#EAE3D2', textureBg: 'bg-[#EAE3D2]', category: 'Wood', priceMultiplier: 1.05, description: 'Ultra-light Scandinavian blonde tone with fine linear grain.' },
  { id: 'travertine', name: 'Raw Travertine Stone', color: '#D4C5B3', textureBg: 'bg-[#D4C5B3]', category: 'Stone', priceMultiplier: 1.25, description: 'Unfilled Italian travertine with tactile porous texture.' },
  { id: 'micro-cement', name: 'Warm Micro-Cement', color: '#BAB3A8', textureBg: 'bg-[#BAB3A8]', category: 'Mineral', priceMultiplier: 1.1, description: 'Seamless mineral plaster with soft troweled movement.' },
  { id: 'raw-linen', name: 'Organic Raw Linen', color: '#E3DAC9', textureBg: 'bg-[#E3DAC9]', category: 'Fabric', priceMultiplier: 1.0, description: 'Unbleached Belgian flax with natural slub weave.' },
  { id: 'brushed-brass', name: 'Brushed Champagne Brass', color: '#C8B082', textureBg: 'bg-[#C8B082]', category: 'Metal', priceMultiplier: 1.1, description: 'Satin-finish brass with subtle directional grain.' },
];

export const CONFIGURABLE_MODELS = [
  {
    id: 'lim-monolith-table',
    name: 'Kustom Limed Oak Dining Table',
    tagline: 'Handcrafted solid live-edge dining slab table',
    basePrice: 1750,
    category: 'Dining',
    defaultMaterial: 'limed-oak',
    secondaryMaterial: 'travertine',
    metalAccent: 'brushed-brass',
    dimensions: {
      length: { min: 180, max: 320, default: 240, step: 10, unit: 'cm' },
      width: { min: 90, max: 130, default: 105, step: 5, unit: 'cm' },
      height: { min: 72, max: 78, default: 75, step: 1, unit: 'cm' }
    },
    images: [
      '/limed-oak-dining-table.jpg',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Custom dining table crafted in solid organic wood slab preserving natural tree curvature and live bark edge texture.',
    craftTimeWeeks: 4
  },
  {
    id: 'lim-liveedge-table',
    name: 'Artisan Live-Edge Wooden Coffee Table',
    tagline: 'Raw organic tree slab on natural woven rug backdrop',
    basePrice: 1350,
    category: 'Live-Edge',
    defaultMaterial: 'live-edge-teak',
    secondaryMaterial: 'hairpin-metal',
    metalAccent: 'hairpin-metal',
    dimensions: {
      length: { min: 110, max: 220, default: 140, step: 10, unit: 'cm' },
      width: { min: 55, max: 95, default: 70, step: 5, unit: 'cm' },
      height: { min: 40, max: 75, default: 45, step: 1, unit: 'cm' }
    },
    images: [
      '/wooden-coffee-table.jpg',
      '/live-edge-table.jpg'
    ],
    description: 'Custom handcrafted live-edge coffee table made from a single solid organic timber slab with natural tree grain contours.',
    craftTimeWeeks: 3
  },
  {
    id: 'lim-sanctuary-chair',
    name: 'Tactile Wooden Arm Chair',
    tagline: 'Modern wooden frame armchair with plush cream cushions',
    basePrice: 1250,
    category: 'Seating',
    defaultMaterial: 'raw-linen',
    secondaryMaterial: 'smoked-walnut',
    metalAccent: 'brushed-brass',
    dimensions: {
      length: { min: 80, max: 110, default: 92, step: 5, unit: 'cm' },
      width: { min: 80, max: 105, default: 88, step: 5, unit: 'cm' },
      height: { min: 65, max: 75, default: 68, step: 1, unit: 'cm' }
    },
    images: [
      '/arm-chair.jpg',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Hand-sculpted solid wooden frame armchair with geometric side joinery and comfortable cream upholstery.',
    craftTimeWeeks: 3
  },
  {
    id: 'lim-credenza',
    name: 'Horizon Micro-Cement Credenza',
    tagline: 'Monolithic concrete floating TV console & sideboard',
    basePrice: 1550,
    category: 'Storage',
    defaultMaterial: 'micro-cement',
    secondaryMaterial: 'limed-oak',
    metalAccent: 'brushed-brass',
    dimensions: {
      length: { min: 160, max: 280, default: 210, step: 10, unit: 'cm' },
      width: { min: 40, max: 55, default: 48, step: 2, unit: 'cm' },
      height: { min: 60, max: 85, default: 72, step: 1, unit: 'cm' }
    },
    images: [
      '/credenza-console.jpg',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Architectural floating console crafted in textured warm micro-cement with monolithic block foot supports.',
    craftTimeWeeks: 5
  }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Kustom Limed Oak Dining Table',
    category: 'Dining',
    price: 1750,
    image: '/limed-oak-dining-table.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85',
    dimensions: '240 L × 105 W × 75 H cm',
    material: 'Organic Solid Wood Slab',
    inStock: true,
    leadTime: '3-4 Weeks Custom Build',
    badge: 'Signature LIM',
    description: 'Custom live-edge dining table crafted from a single solid organic timber slab in a sunlit rustic dining room.'
  },
  {
    id: 'prod-5',
    name: 'Aura Sculptural Floor Pendant',
    category: 'Objects',
    price: 1050,
    image: '/pendant-light.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    dimensions: '45 Dia × 165 H cm',
    material: 'Sculptural Wood & Bronze',
    inStock: true,
    leadTime: 'Ready to Ship',
    badge: 'Art Lighting',
    description: 'Tall spiral sculptural floor pendant illuminating modern gallery interiors with warm atmospheric light.'
  },
  {
    id: 'prod-3',
    name: 'Monolithic Stone Coffee Table',
    category: 'Tables',
    price: 1450,
    image: '/stone-coffee-table.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    dimensions: '140 L × 85 W × 35 H cm',
    material: 'Raw Stone Boulder Slab',
    inStock: true,
    leadTime: '4 Weeks Bespoke',
    badge: 'Organic Stone',
    description: 'Sculpted raw stone boulder coffee tables with porous organic texture and smooth polished top surface.'
  },
  {
    id: 'prod-4',
    name: 'Horizon Micro-Cement Credenza',
    category: 'Storage',
    price: 1550,
    image: '/credenza-console.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
    dimensions: '220 L × 48 W × 65 H cm',
    material: 'Warm Micro-Cement & Concrete',
    inStock: true,
    leadTime: '4-5 Weeks',
    badge: 'Architectural',
    description: 'Monolithic floating media credenza and console crafted in troweled micro-cement plaster.'
  },
  {
    id: 'prod-2',
    name: 'Tactile Wooden Arm Chair',
    category: 'Seating',
    price: 1250,
    image: '/arm-chair.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80',
    dimensions: '92 L × 88 W × 78 H cm',
    material: 'Solid Wood & Cream Linen',
    inStock: true,
    leadTime: '2-3 Weeks Custom Build',
    badge: 'Popular',
    description: 'Modern wooden frame armchair featuring geometric side joinery and thick cream linen cushioning.'
  },
  {
    id: 'prod-liveedge-1',
    name: 'Artisan Live-Edge Wooden Coffee Table',
    category: 'Live-Edge',
    price: 1350,
    image: '/wooden-coffee-table.jpg',
    secondaryImage: '/live-edge-table.jpg',
    dimensions: '145 L × 80 W × 42 H cm',
    material: 'Organic Teak Slab & Steel',
    inStock: true,
    leadTime: '2-3 Weeks Custom Build',
    badge: 'Featured Craft',
    description: 'Raw solid timber slab coffee table preserving natural tree grain figure and organic edge contours.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/limed-oak-dining-table.jpg',
    likes: '3,890',
    comments: '142',
    caption: 'Handcrafted solid live-edge dining table in organic timber slab installed in a sunlit sanctuary dining space. Handcrafted at @countkustom.atelier. WA: +91 85918 51282 #liveedgediningtable #bespokefurniture',
    date: 'JUST NOW'
  },
  {
    id: 'ig-2',
    image: '/wooden-coffee-table.jpg',
    likes: '3,120',
    comments: '104',
    caption: 'Organic live-edge wooden coffee table with rich natural grain figure on woven jute rug backdrop. @countkustom.atelier.',
    date: '2 DAYS AGO'
  },
  {
    id: 'ig-3',
    image: '/credenza-console.jpg',
    likes: '2,890',
    comments: '88',
    caption: 'Monolithic concrete & micro-cement credenza console installation under wall TV. Quiet architectural simplicity by @countkustom.atelier.',
    date: '5 DAYS AGO'
  },
  {
    id: 'ig-4',
    image: '/stone-coffee-table.jpg',
    likes: '3,050',
    comments: '92',
    caption: 'Sculptural raw stone boulder coffee tables paired with low-slung living room seating. @countkustom.atelier.',
    date: '1 WEEK AGO'
  }
];

export const INSTAGRAM_STORIES = [
  { id: 'story-1', title: 'Dining Table', cover: '/limed-oak-dining-table.jpg' },
  { id: 'story-2', title: 'Wooden Table', cover: '/wooden-coffee-table.jpg' },
  { id: 'story-3', title: 'Stone Craft', cover: '/stone-coffee-table.jpg' },
  { id: 'story-4', title: 'Credenza', cover: '/credenza-console.jpg' },
];

export const ROOM_PRESETS = [
  {
    id: 'japandi-dining',
    name: 'Japandi Dining Loft',
    image: '/limed-oak-dining-table.jpg',
    hotspots: [
      { x: 50, y: 58, productId: 'prod-1', name: 'Kustom Limed Oak Dining Table', price: '$1,750' },
      { x: 22, y: 48, productId: 'prod-4', name: 'Horizon Micro-Cement Credenza', price: '$1,550' }
    ]
  },
  {
    id: 'living-sanctuary',
    name: 'Minimalist Living Sanctuary',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      { x: 64, y: 70, productId: 'prod-3', name: 'Monolithic Stone Coffee Table', price: '$1,450' },
      { x: 38, y: 62, productId: 'prod-2', name: 'Tactile Wooden Arm Chair', price: '$1,250' },
      { x: 82, y: 42, productId: 'prod-5', name: 'Aura Sculptural Floor Pendant', price: '$1,050' }
    ]
  },
  {
    id: 'gallery-hall',
    name: 'Architectural Gallery Hall',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      { x: 45, y: 68, productId: 'prod-liveedge-1', name: 'Artisan Live-Edge Wooden Coffee Table', price: '$1,350' },
      { x: 75, y: 35, productId: 'prod-5', name: 'Aura Sculptural Floor Pendant', price: '$1,050' }
    ]
  }
];
