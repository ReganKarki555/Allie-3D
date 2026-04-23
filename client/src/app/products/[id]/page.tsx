import type { Product } from '@/types';
import { formatPrice } from '@/lib/helpers';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

const demoProduct: Product = {
  _id: '1',
  name: 'Aurora Headphones',
  description: 'Premium wireless headphones with immersive audio.',
  price: 249,
  image: '/images/headphones.png',
  category: 'Audio',
  countInStock: 12
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-zinc-100" />
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Product {id}</p>
          <h1 className="text-4xl font-semibold text-zinc-950">{demoProduct.name}</h1>
          <p className="text-lg leading-8 text-zinc-600">{demoProduct.description}</p>
          <div className="text-2xl font-semibold text-zinc-950">{formatPrice(demoProduct.price)}</div>
        </div>
      </div>
    </section>
  );
}
