"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/helpers';
import { useCart } from '@/hooks/useCart';
import { getStoredAuth } from '@/lib/auth';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleAddToCart() {
    const auth = getStoredAuth();
    const role = auth?.user.role;
    const isAllowedRole = role === 'customer' || role === 'vendor';

    if (!auth || !isAllowedRole) {
      router.push(`/login?redirect=${encodeURIComponent('/products')}`);
      return;
    }

    addItem(product);
  }

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square w-full rounded-2xl bg-zinc-100 object-cover"
        loading="lazy"
      />
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-zinc-950">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-zinc-950">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-[#0E4A4E] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-95"
            >
              Add to Cart
            </button>
            <Link href={`/products/${product._id}`} className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline">
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
