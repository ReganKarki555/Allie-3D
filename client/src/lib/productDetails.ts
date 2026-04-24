import { products } from '@/lib/products';
import type { Product } from '@/types';

export type ProductDetails = Product & {
  gallery: string[];
  sellerName: string;
  deliveryTime: string;
  deliveryCharge: number;
  deliveryOptions: Array<{
    label: string;
    description: string;
  }>;
  specifications: Array<{
    label: string;
    value: string;
  }>;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
  }>;
  similarProducts: Product[];
};

const categoryGallery: Record<string, string[]> = {
  Watches: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80'
  ],
  Phones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1574920162043-b872873f19c6?auto=format&fit=crop&w=1200&q=80'
  ],
  iPhones: [
    'https://images.unsplash.com/photo-1662947852422-4fc6b8f7a5c7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611472173362-3f53dbd65d75?auto=format&fit=crop&w=1200&q=80'
  ],
  Chargers: [
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b43?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
  ],
  Vegetables: [
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1200&q=80'
  ],
  'Hair Products': [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519699050407-4a7a4b2a4f18?auto=format&fit=crop&w=1200&q=80'
  ],
  Gadgets: [
    'https://images.unsplash.com/photo-1518441902117-f0e5c7be2f91?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
  ],
  'Tech Products': [
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
  ]
};

const sellerByCategory: Record<string, string> = {
  Watches: 'Chrono House',
  Phones: 'Wave Mobile',
  iPhones: 'Premium Device Hub',
  Chargers: 'Volt Supply Co.',
  Vegetables: 'FreshField Market',
  'Hair Products': 'SilkGlow Studio',
  Gadgets: 'Orbit Tech Store',
  'Tech Products': 'Core Electronics'
};

const categoryDelivery: Record<string, { time: string; charge: number }> = {
  Watches: { time: '2-4 business days', charge: 6.99 },
  Phones: { time: '1-3 business days', charge: 4.99 },
  iPhones: { time: '1-2 business days', charge: 0 },
  Chargers: { time: '2-3 business days', charge: 3.99 },
  Vegetables: { time: 'Same day or next day', charge: 2.99 },
  'Hair Products': { time: '2-4 business days', charge: 4.49 },
  Gadgets: { time: '2-5 business days', charge: 5.49 },
  'Tech Products': { time: '2-4 business days', charge: 4.99 }
};

const categorySpecifications: Record<string, Array<{ label: string; value: string }>> = {
  Watches: [
    { label: 'Case Material', value: 'Stainless steel' },
    { label: 'Water Resistance', value: '50m' },
    { label: 'Battery', value: 'Up to 7 days' }
  ],
  Phones: [
    { label: 'Display', value: '6.7-inch OLED' },
    { label: 'Network', value: '5G' },
    { label: 'Battery', value: 'All-day use' }
  ],
  iPhones: [
    { label: 'Chipset', value: 'A17-class performance' },
    { label: 'Frame', value: 'Titanium' },
    { label: 'Camera', value: 'Pro-grade system' }
  ],
  Chargers: [
    { label: 'Power Output', value: '65W' },
    { label: 'Ports', value: 'Dual USB-C' },
    { label: 'Form Factor', value: 'Compact GaN' }
  ],
  Vegetables: [
    { label: 'Origin', value: 'Farm fresh' },
    { label: 'Storage', value: 'Refrigerate' },
    { label: 'Shelf Life', value: '4-6 days' }
  ],
  'Hair Products': [
    { label: 'Formula', value: 'Lightweight and nourishing' },
    { label: 'Hair Type', value: 'All hair types' },
    { label: 'Scent', value: 'Fresh botanical' }
  ],
  Gadgets: [
    { label: 'Compatibility', value: 'Universal' },
    { label: 'Use Case', value: 'Daily productivity' },
    { label: 'Warranty', value: '12 months' }
  ],
  'Tech Products': [
    { label: 'Connectivity', value: 'Bluetooth / USB / Wi-Fi' },
    { label: 'Finish', value: 'Matte black' },
    { label: 'Warranty', value: '12 months' }
  ]
};

const categoryReviews: Record<string, Array<{ id: string; name: string; rating: number; date: string; comment: string; verified?: boolean }>> = {
  Watches: [
    { id: 'w-1', name: 'Ava', rating: 5, date: '2026-03-12', comment: 'Premium look, precise tracking, and the battery easily lasts through the week.', verified: true },
    { id: 'w-2', name: 'Noah', rating: 4, date: '2026-03-18', comment: 'Comfortable fit and the packaging felt high-end.' },
    { id: 'w-3', name: 'Mia', rating: 5, date: '2026-03-24', comment: 'The display stays bright outdoors and the delivery was fast.', verified: true }
  ],
  Phones: [
    { id: 'p-1', name: 'Jordan', rating: 5, date: '2026-02-11', comment: 'Camera quality is excellent and performance is smooth.', verified: true },
    { id: 'p-2', name: 'Sophia', rating: 4, date: '2026-02-19', comment: 'Great battery life and the seller answered questions quickly.' },
    { id: 'p-3', name: 'Ethan', rating: 5, date: '2026-02-28', comment: 'Feels premium in hand and arrived in perfect condition.', verified: true }
  ],
  iPhones: [
    { id: 'ip-1', name: 'Liam', rating: 5, date: '2026-01-14', comment: 'Fast, polished, and the screen is stunning.', verified: true },
    { id: 'ip-2', name: 'Olivia', rating: 5, date: '2026-01-20', comment: 'Battery lasts longer than expected and the photos are sharp.' },
    { id: 'ip-3', name: 'Lucas', rating: 4, date: '2026-01-28', comment: 'Slightly expensive but the build quality makes sense.', verified: true }
  ],
  Chargers: [
    { id: 'c-1', name: 'Emma', rating: 5, date: '2026-03-03', comment: 'Charges my phone and tablet quickly without heating up.', verified: true },
    { id: 'c-2', name: 'Henry', rating: 4, date: '2026-03-09', comment: 'Compact enough for travel and really convenient.' },
    { id: 'c-3', name: 'Zoe', rating: 5, date: '2026-03-14', comment: 'Excellent build quality and the dual-port setup is useful.', verified: true }
  ],
  Vegetables: [
    { id: 'v-1', name: 'Isla', rating: 5, date: '2026-04-01', comment: 'Very fresh produce with no damaged items.', verified: true },
    { id: 'v-2', name: 'Mason', rating: 4, date: '2026-04-04', comment: 'Arrived quickly and the quality was above what I expected.' },
    { id: 'v-3', name: 'Ella', rating: 5, date: '2026-04-07', comment: 'Great value and the basket was packed carefully.', verified: true }
  ],
  'Hair Products': [
    { id: 'h-1', name: 'Harper', rating: 5, date: '2026-02-08', comment: 'Left my hair smooth without feeling heavy.', verified: true },
    { id: 'h-2', name: 'Ben', rating: 4, date: '2026-02-15', comment: 'A little goes a long way and the scent is pleasant.' },
    { id: 'h-3', name: 'Grace', rating: 5, date: '2026-02-22', comment: 'Noticeable improvement after the first few uses.', verified: true }
  ],
  Gadgets: [
    { id: 'g-1', name: 'Chloe', rating: 5, date: '2026-03-20', comment: 'Useful, durable, and exactly as described.', verified: true },
    { id: 'g-2', name: 'Daniel', rating: 4, date: '2026-03-23', comment: 'Setup was simple and it works well every day.' },
    { id: 'g-3', name: 'Aria', rating: 5, date: '2026-03-29', comment: 'A strong buy for the price and the delivery was quick.', verified: true }
  ],
  'Tech Products': [
    { id: 't-1', name: 'Elena', rating: 5, date: '2026-01-08', comment: 'Clean design, reliable performance, and good packaging.', verified: true },
    { id: 't-2', name: 'Kai', rating: 4, date: '2026-01-16', comment: 'A solid product with no setup headaches.' },
    { id: 't-3', name: 'Nora', rating: 5, date: '2026-01-24', comment: 'Works exactly as expected and feels premium.', verified: true }
  ]
};

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values));
}

function getFallbackGallery(product: Product) {
  const categoryImages = categoryGallery[product.category] ?? [];
  return uniqueStrings([product.image, ...categoryImages]).slice(0, 4);
}

function getSimilarProducts(product: Product) {
  const sameCategory = products.filter((candidate) => candidate._id !== product._id && candidate.category === product.category);

  if (sameCategory.length > 0) {
    return sameCategory.slice(0, 4);
  }

  return products
    .filter((candidate) => candidate._id !== product._id)
    .sort((left, right) => Math.abs(left.price - product.price) - Math.abs(right.price - product.price))
    .slice(0, 4);
}

export function getProductDetails(product: Product): ProductDetails {
  const delivery = categoryDelivery[product.category] ?? {
    time: '2-4 business days',
    charge: 4.99
  };

  const reviews = categoryReviews[product.category] ?? [
    {
      id: `${product._id}-1`,
      name: 'Customer',
      rating: product.rating ?? 4,
      date: new Date().toISOString().slice(0, 10),
      comment: 'A solid product with dependable quality and fast delivery.',
      verified: true
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return {
    ...product,
    gallery: getFallbackGallery(product),
    sellerName: sellerByCategory[product.category] ?? 'Allie Marketplace',
    deliveryTime: product.deliveryTime ?? delivery.time,
    deliveryCharge: product.deliveryCharge ?? delivery.charge,
    deliveryOptions: [
      {
        label: 'Standard delivery',
        description: `${delivery.time} · ${delivery.charge === 0 ? 'Free' : `$${delivery.charge.toFixed(2)}`}`
      },
      {
        label: 'Express delivery',
        description: '1-2 business days · Priority dispatch'
      },
      {
        label: 'Store pickup',
        description: 'Pickup available from select partner locations'
      }
    ],
    specifications: product.specifications ?? categorySpecifications[product.category] ?? [
      { label: 'Category', value: product.category },
      { label: 'Stock', value: `${product.countInStock} available` },
      { label: 'Quality', value: 'Verified marketplace product' }
    ],
    reviews: product.reviews ?? reviews,
    similarProducts: getSimilarProducts(product),
    rating: product.rating ?? Number(averageRating.toFixed(1)),
    numReviews: product.numReviews ?? reviews.length
  };
}

export function findProductById(id: string) {
  return products.find((product) => product._id === id);
}