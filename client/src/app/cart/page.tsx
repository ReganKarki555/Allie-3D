"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { getStoredAuth } from '@/lib/auth';
import { calculateCartTotal, formatPrice } from '@/lib/helpers';

const SHIPPING_FEE_NPR = 95;
const SHIPPING_FEE_BASE = SHIPPING_FEE_NPR / 133;

function formatNprValue(amount: number) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState('');

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

  useEffect(() => {
    setSelectedIds((current) => {
      const existingIds = current.filter((id) => items.some((item) => item._id === id));
      const newIds = items.map((item) => item._id).filter((id) => !existingIds.includes(id));
      return [...existingIds, ...newIds];
    });
  }, [items]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item._id)),
    [items, selectedIds]
  );

  const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateCartTotal(selectedItems);
  const discount = subtotal * discountRate;
  const shipping = selectedItems.length > 0 ? SHIPPING_FEE_BASE : 0;
  const total = Math.max(0, subtotal - discount + shipping);
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(items.map((item) => item._id));
  }

  function toggleItemSelection(productId: string) {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  function handleDeleteSelected() {
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds([]);
  }

  function handleVoucherApply() {
    const normalized = voucherCode.trim().toUpperCase();

    if (normalized === 'SAVE10') {
      setDiscountRate(0.1);
      setVoucherMessage('Voucher applied: 10% off on selected items.');
      return;
    }

    if (normalized === 'SAVE20') {
      setDiscountRate(0.2);
      setVoucherMessage('Voucher applied: 20% off on selected items.');
      return;
    }

    setDiscountRate(0);
    setVoucherMessage('Invalid voucher code. Try SAVE10 or SAVE20.');
  }

  function handleProceedToCheckout() {
    if (selectedItems.length === 0) {
      return;
    }

    router.push('/checkout');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-950">My Cart</h1>
      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          Your cart is empty.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <label className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-zinc-300 text-[#1A8AA6] focus:ring-[#1A8AA6]"
                />
                SELECT ALL ({items.length} ITEM(S))
              </label>
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
              >
                DELETE
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3 text-sm font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-zinc-300 text-[#1A8AA6] focus:ring-[#1A8AA6]"
                />
                <span>LS Mall</span>
              </div>

              <div className="divide-y divide-zinc-100">
                {items.map((item) => {
                  const isSelected = selectedIds.includes(item._id);
                  const originalPrice = Math.max(item.price + 1, Math.round(item.price * 1.25));

                  return (
                    <article key={item._id} className="grid gap-3 px-4 py-4 sm:grid-cols-[28px_96px_1fr_auto_auto] sm:items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItemSelection(item._id)}
                        className="mt-2 h-4 w-4 rounded border-zinc-300 text-[#1A8AA6] focus:ring-[#1A8AA6] sm:mt-0"
                      />

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg border border-zinc-100 bg-zinc-50 object-cover"
                      />

                      <div className="min-w-0">
                        <h2 className="text-2xl font-medium leading-snug text-zinc-900">{item.name}</h2>
                        <p className="mt-1 text-sm text-zinc-500">{item.sellerName ?? 'No Brand'}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-semibold text-[#D9782F]">{formatPrice(item.price)}</p>
                        <p className="text-xl text-zinc-400 line-through">{formatPrice(originalPrice)}</p>
                      </div>

                      <div className="justify-self-end">
                        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="h-10 w-10 rounded-md bg-white text-2xl text-zinc-700 transition hover:bg-zinc-100"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-lg font-semibold text-zinc-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item._id, Math.min(item.countInStock, item.quantity + 1))}
                            className="h-10 w-10 rounded-md bg-white text-2xl text-zinc-700 transition hover:bg-zinc-100"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-3xl font-semibold text-zinc-900">Order Summary</h2>

            <div className="mt-5 space-y-3 text-lg text-zinc-700">
              <div className="flex items-center justify-between">
                <p>Subtotal ({selectedQuantity} items)</p>
                <p className="font-medium text-zinc-900">{formatPrice(subtotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping Fee</p>
                <p className="font-medium text-zinc-900">{selectedItems.length === 0 ? formatPrice(0) : formatNprValue(SHIPPING_FEE_NPR)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Discount</p>
                <p className="font-medium text-emerald-700">-{formatPrice(discount)}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(event) => setVoucherCode(event.target.value)}
                placeholder="Enter Voucher Code"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-base outline-none ring-[#1A8AA6] focus:ring"
              />
              <button
                type="button"
                onClick={handleVoucherApply}
                className="rounded-md bg-[#1A8AA6] px-5 py-2 text-base font-semibold text-white transition hover:brightness-95"
              >
                APPLY
              </button>
            </div>

            {voucherMessage && (
              <p className="mt-2 text-sm text-zinc-600">{voucherMessage}</p>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 text-2xl">
              <p className="font-medium text-zinc-900">Total</p>
              <p className="font-semibold text-[#D9782F]">{formatPrice(total)}</p>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className="mt-5 w-full rounded-md bg-[#F17222] px-4 py-3 text-lg font-semibold text-white transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              PROCEED TO CHECKOUT({selectedQuantity})
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
