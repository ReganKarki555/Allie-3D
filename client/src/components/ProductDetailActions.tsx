"use client";

import { useEffect, useState } from 'react';
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
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [toastTrigger, setToastTrigger] = useState(0);

  useEffect(() => {
    if (!showAddedToast) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setShowAddedToast(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAddedToast, toastTrigger]);

  function triggerAddedToast() {
    setShowAddedToast(true);
    setToastTrigger((current) => current + 1);
  }

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
    return addItem(product, quantity);
  }

  function handleAddToCart() {
    if (!ensureAllowedAccess()) {
      return;
    }

    const added = addSelectedQuantity();

    if (added) {
      triggerAddedToast();
    }
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
        <div className="relative">
          {showAddedToast && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-[#0E4A4E] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              Added to the cart
            </div>
          )}
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-[#0E4A4E] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}