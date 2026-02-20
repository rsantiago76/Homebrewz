/**
 * HomeBrewz Product Catalog
 * Centralized product data with realistic pricing and options
 */

export interface ProductSize {
  name: string;
  priceDeltaCents: number;
}

export interface ProductOptions {
  milk?: string[];
  sweetness?: string[];
  grind?: string[];
}

export interface ProductImage {
  key: string;
  alt: string;
}

export interface Product {
  id: string;
  type: 'drink' | 'beans';
  name: string;
  slug: string;
  tag: 'Bestseller' | 'New' | 'Smooth' | "Roaster's Pick" | 'Everyday' | null;
  shortDescription: string;
  description: string;
  basePriceCents: number;
  sizes: ProductSize[];
  options: ProductOptions;
  image: ProductImage;
}

export const CURRENCY = 'USD';
export const BRAND = 'HomeBrewz';

/**
 * Convert cents to dollar string
 */
export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2);
}

/**
 * Calculate total price for a product with selected options
 */
export function calculateProductPrice(
  product: Product,
  selectedSize?: string
): number {
  let totalCents = product.basePriceCents;
  
  if (selectedSize) {
    const size = product.sizes.find(s => s.name === selectedSize);
    if (size) {
      totalCents += size.priceDeltaCents;
    }
  }
  
  return totalCents;
}

export const products: Product[] = [
  {
    id: 'latte-classic',
    type: 'drink',
    name: 'Classic Latte',
    slug: 'classic-latte',
    tag: 'Bestseller',
    shortDescription: 'Espresso balanced with steamed milk for a smooth, creamy finish.',
    description: 'Our Classic Latte pairs rich espresso with silky steamed milk for a refined, everyday favorite. Customize your size and milk choice for the perfect pour—morning or afternoon.',
    basePriceCents: 495,
    sizes: [
      { name: 'Small', priceDeltaCents: 0 },
      { name: 'Medium', priceDeltaCents: 75 },
      { name: 'Large', priceDeltaCents: 150 }
    ],
    options: {
      milk: ['Whole', 'Oat', 'Almond', '2%'],
      sweetness: ['Unsweetened', 'Light', 'Regular']
    },
    image: { key: 'public/products/latte-classic.jpg', alt: 'HomeBrewz Classic Latte' }
  },
  {
    id: 'cappuccino-foam',
    type: 'drink',
    name: 'Velvet Cappuccino',
    slug: 'velvet-cappuccino',
    tag: 'New',
    shortDescription: 'Bold espresso topped with airy microfoam for a lighter sip.',
    description: "The Velvet Cappuccino brings espresso forward with a cloud-like layer of microfoam. It's bold, aromatic, and balanced—crafted for coffee lovers who like a lighter texture with a strong finish.",
    basePriceCents: 475,
    sizes: [
      { name: 'Small', priceDeltaCents: 0 },
      { name: 'Medium', priceDeltaCents: 60 },
      { name: 'Large', priceDeltaCents: 120 }
    ],
    options: { milk: ['Whole', 'Oat', 'Almond', '2%'] },
    image: { key: 'public/products/cappuccino-velvet.jpg', alt: 'HomeBrewz Velvet Cappuccino' }
  },
  {
    id: 'coldbrew-signature',
    type: 'drink',
    name: 'Signature Cold Brew',
    slug: 'signature-cold-brew',
    tag: 'Smooth',
    shortDescription: 'Slow-steeped for a naturally sweet, ultra-smooth cold finish.',
    description: 'Our Signature Cold Brew is slow-steeped to reduce bitterness and highlight natural sweetness. Crisp, clean, and refreshing—perfect on its own or customized with a splash of milk.',
    basePriceCents: 525,
    sizes: [
      { name: 'Small', priceDeltaCents: 0 },
      { name: 'Medium', priceDeltaCents: 80 },
      { name: 'Large', priceDeltaCents: 160 }
    ],
    options: { milk: ['None', 'Oat', 'Almond', '2%'] },
    image: { key: 'public/products/coldbrew-signature.jpg', alt: 'HomeBrewz Signature Cold Brew' }
  },
  {
    id: 'beans-espresso-roast',
    type: 'beans',
    name: 'Espresso Roast Beans',
    slug: 'espresso-roast-beans',
    tag: "Roaster's Pick",
    shortDescription: 'Dark roast with deep cocoa notes and a bold, clean finish.',
    description: 'Our Espresso Roast is crafted for rich crema and balanced intensity. Expect deep cocoa notes, a smooth finish, and a bold profile that performs beautifully in espresso machines or moka pots.',
    basePriceCents: 1595,
    sizes: [
      { name: '12 oz', priceDeltaCents: 0 },
      { name: '2 lb', priceDeltaCents: 1600 }
    ],
    options: { grind: ['Whole Bean'] },
    image: { key: 'public/products/beans-espresso.jpg', alt: 'HomeBrewz Espresso Roast Beans Bag' }
  },
  {
    id: 'beans-ground-signature',
    type: 'beans',
    name: 'Signature Ground Blend',
    slug: 'signature-ground-blend',
    tag: 'Everyday',
    shortDescription: 'Medium roast ground blend—smooth, balanced, and easy to brew.',
    description: 'A smooth, balanced blend designed for everyday brewing. This medium roast delivers caramel warmth and a clean finish—ideal for drip, pour-over, or your favorite home brewer.',
    basePriceCents: 1395,
    sizes: [
      { name: '12 oz', priceDeltaCents: 0 },
      { name: '2 lb', priceDeltaCents: 1400 }
    ],
    options: { grind: ['Ground'] },
    image: { key: 'public/products/beans-ground.jpg', alt: 'HomeBrewz Signature Ground Blend Bag' }
  }
];

/**
 * Helper functions for product filtering and search
 */

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByType(type: 'drink' | 'beans'): Product[] {
  return products.filter(p => p.type === type);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Badge variant mapping
 */
export function getTagVariant(tag: Product['tag']): 'bestseller' | 'new' | 'default' {
  switch (tag) {
    case 'Bestseller':
      return 'bestseller';
    case 'New':
    case 'Smooth':
      return 'new';
    default:
      return 'default';
  }
}
