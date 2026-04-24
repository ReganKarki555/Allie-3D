"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredAuth } from '@/lib/auth';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleAddToCart() {
    const auth = getStoredAuth();
    const role = auth?.user.role;
    const isAllowedRole = role === 'customer' || role === 'vendor';

    if (!auth || !isAllowedRole) {
      router.push(`/login?redirect=${encodeURIComponent(`/products/${product._id}`)}`);
      return;
    }

    addItem(product);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-full bg-[#0E4A4E] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
      >
        Add to Cart
      </button>
      <Link
        href="/cart"
        className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
      >
        Go to Cart
      </Link>
    </div>
  );
}