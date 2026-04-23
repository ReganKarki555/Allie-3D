import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

const products: Product[] = [
  {
    _id: '1',
    name: 'Aurora Headphones',
    description: 'Premium wireless headphones with immersive audio.',
    price: 249,
    image: '/images/headphones.png',
    category: 'Audio',
    countInStock: 12
  }
];

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">Products</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
