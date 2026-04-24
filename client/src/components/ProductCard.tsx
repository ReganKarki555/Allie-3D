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
    <article className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product._id}`}
        aria-label={`Open details for ${product.name}`}
        className="absolute inset-0 z-20 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4A4E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      />
      <img
        src={product.image}
        alt={product.name}
        className="relative z-10 aspect-square w-full rounded-2xl bg-zinc-100 object-cover"
        loading="lazy"
      />
      <div className="relative z-10 mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-zinc-950 group-hover:underline group-hover:underline-offset-4">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-base font-semibold text-zinc-950">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="relative z-30 rounded-full bg-[#0E4A4E] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-500">Click the card to open the full product view.</p>
      </div>
    </article>
  );
}
