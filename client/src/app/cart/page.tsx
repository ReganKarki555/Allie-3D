"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/hooks/useCart';
import { getStoredAuth } from '@/lib/auth';

export default function CartPage() {
  const router = useRouter();
  const { items } = useCart();

  useEffect(() => {
    const auth = getStoredAuth();
    const role = auth?.user.role;
    const isAllowedRole = role === 'customer' || role === 'vendor';

    if (!auth || !isAllowedRole) {
      router.replace('/login?redirect=%2Fcart');
    }
  }, [router]);

  const auth = getStoredAuth();
  const role = auth?.user.role;
  const isAllowedRole = role === 'customer' || role === 'vendor';

  if (!auth || !isAllowedRole) {
    return null;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">Cart</h1>
      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          Your cart is empty.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
