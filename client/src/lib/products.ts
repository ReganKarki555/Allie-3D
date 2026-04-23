import type { Product } from '@/types';

export const products: Product[] = [
  {
    _id: '1',
    name: 'Chrono Edge Smartwatch',
    description: 'AMOLED smartwatch with sleep tracking, GPS, and 7-day battery life.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: 'Watches',
    countInStock: 18
  },
  {
    _id: '2',
    name: 'Titan Steel Classic Watch',
    description: 'Elegant stainless steel analog watch with water-resistant build.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=900&q=80',
    category: 'Watches',
    countInStock: 14
  },
  {
    _id: '3',
    name: 'Pixel Wave Phone',
    description: '6.7-inch OLED Android phone with a pro-grade camera system.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    category: 'Phones',
    countInStock: 20
  },
  {
    _id: '4',
    name: 'Galaxy Nova 5G',
    description: 'Fast 5G smartphone with smooth 120Hz display and night photography.',
    price: 749,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    category: 'Phones',
    countInStock: 16
  },
  {
    _id: '5',
    name: 'iPhone 15 Pro',
    description: 'Premium iPhone with titanium frame, A17 chip, and advanced cameras.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484a3f57?auto=format&fit=crop&w=900&q=80',
    category: 'iPhones',
    countInStock: 11
  },
  {
    _id: '6',
    name: 'iPhone 14 Plus',
    description: 'Large-display iPhone with excellent battery life and smooth performance.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1663499482523-45247d5c3d9d?auto=format&fit=crop&w=900&q=80',
    category: 'iPhones',
    countInStock: 13
  },
  {
    _id: '7',
    name: 'Volt 65W GaN Charger',
    description: 'Compact fast charger with dual USB-C ports for phones and tablets.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
    category: 'Chargers',
    countInStock: 40
  },
  {
    _id: '8',
    name: 'MagDock Wireless Charger',
    description: 'Magnetic wireless charging stand compatible with modern smartphones.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=80',
    category: 'Chargers',
    countInStock: 28
  },
  {
    _id: '9',
    name: 'Organic Spinach Bundle',
    description: 'Fresh farm-picked spinach rich in iron and vitamins.',
    price: 6,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80',
    category: 'Vegetables',
    countInStock: 50
  },
  {
    _id: '10',
    name: 'Rainbow Bell Peppers Pack',
    description: 'Colorful and crunchy bell peppers perfect for salads and stir-fry.',
    price: 8,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=80',
    category: 'Vegetables',
    countInStock: 34
  },
  {
    _id: '11',
    name: 'SilkGlow Hair Serum',
    description: 'Lightweight anti-frizz serum for smooth and shiny hair.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1596704017254-9f3ef0f3f8f2?auto=format&fit=crop&w=900&q=80',
    category: 'Hair Products',
    countInStock: 26
  },
  {
    _id: '12',
    name: 'Herbal Repair Shampoo',
    description: 'Sulfate-free shampoo with herbal extracts for stronger hair.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    category: 'Hair Products',
    countInStock: 29
  },
  {
    _id: '13',
    name: 'Breeze Mini Bluetooth Speaker',
    description: 'Portable speaker with rich bass and all-day playback.',
    price: 59,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
    category: 'Gadgets',
    countInStock: 23
  },
  {
    _id: '14',
    name: 'Orbit Fitness Tracker',
    description: 'Slim tracker that monitors heart rate, steps, and daily activity.',
    price: 79,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80',
    category: 'Gadgets',
    countInStock: 31
  },
  {
    _id: '15',
    name: 'AirTone Pro Earbuds',
    description: 'Noise-cancelling true wireless earbuds with crystal-clear calls.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80',
    category: 'Tech Products',
    countInStock: 24
  },
  {
    _id: '16',
    name: 'CorePad Mechanical Keyboard',
    description: 'Compact RGB mechanical keyboard with tactile switches.',
    price: 109,
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    category: 'Tech Products',
    countInStock: 17
  },
  {
    _id: '17',
    name: 'Vision HD Webcam',
    description: '1080p webcam with auto-focus and dual noise-reduction mics.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
    category: 'Tech Products',
    countInStock: 19
  },
  {
    _id: '18',
    name: 'PowerVault 20000mAh Power Bank',
    description: 'High-capacity fast-charging power bank with USB-C PD support.',
    price: 69,
    image: 'https://images.unsplash.com/photo-1609592806787-3d9d0b4d6e06?auto=format&fit=crop&w=900&q=80',
    category: 'Gadgets',
    countInStock: 22
  },
  {
    _id: '19',
    name: 'Smart Home Plug Duo',
    description: 'Wi-Fi smart plug set with app control and voice assistant support.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1558002038-1055e2e28ed1?auto=format&fit=crop&w=900&q=80',
    category: 'Gadgets',
    countInStock: 35
  },
  {
    _id: '20',
    name: 'Fresh Avocado Basket',
    description: 'Creamy ripe avocados sourced fresh for daily healthy meals.',
    price: 12,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80',
    category: 'Vegetables',
    countInStock: 27
  }
];
