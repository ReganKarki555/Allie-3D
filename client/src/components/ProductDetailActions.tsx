"use client";

import { useState } from 'react';
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
  const [quantity, setQuantity] = useState(1);

  function ensureAllowedAccess() {
    const auth = getStoredAuth();
    const role = auth?.user.role;
    const isAllowedRole = role === 'customer' || role === 'vendor';

    if (!auth || !isAllowedRole) {
      router.push(`/login?redirect=${encodeURIComponent(`/products/${product._id}`)}`);
      return false;
    }

    return true;
  }

  function addSelectedQuantity() {
    for (let index = 0; index < quantity; index += 1) {
      addItem(product);
    }
  }

  function handleAddToCart() {
    if (!ensureAllowedAccess()) {
      return;
    }

    addSelectedQuantity();
  }

  function handleBuyNow() {
    if (!ensureAllowedAccess()) {
      return;
    }

    addSelectedQuantity();
    router.push('/checkout');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-zinc-700">Quantity</p>
        <div className="flex items-center overflow-hidden rounded-lg border border-zinc-300">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="h-10 w-10 bg-zinc-100 text-lg font-semibold text-zinc-700 transition hover:bg-zinc-200"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="grid h-10 min-w-10 place-items-center px-2 text-base font-semibold text-zinc-900">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.min(product.countInStock, current + 1))}
            className="h-10 w-10 bg-zinc-100 text-lg font-semibold text-zinc-700 transition hover:bg-zinc-200"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleBuyNow}
          className="rounded-full bg-[#1A8AA6] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="rounded-full bg-[#0E4A4E] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}