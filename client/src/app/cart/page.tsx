import { CartItem } from '@/components/CartItem';
import type { CartItem as CartItemType } from '@/types';

const items: CartItemType[] = [
  {
    _id: '1',
    name: 'Aurora Headphones',
    description: 'Premium wireless headphones with immersive audio.',
    price: 249,
    image: '/images/headphones.png',
    category: 'Audio',
    countInStock: 12,
    quantity: 1
  }
];

export default function CartPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">Cart</h1>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
