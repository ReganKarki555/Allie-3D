import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/helpers';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square rounded-2xl bg-zinc-100" />
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-zinc-950">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-zinc-950">
            {formatPrice(product.price)}
          </span>
          <Link href={`/products/${product._id}`} className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
