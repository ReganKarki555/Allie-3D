"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductDetails } from '@/lib/productDetails';
import { formatPrice } from '@/lib/helpers';
import { useCart } from '@/hooks/useCart';
import { getStoredAuth } from '@/lib/auth';

type ProductDetailHeroProps = {
  details: ProductDetails;
};

function buildHighlights(details: ProductDetails) {
  const source = details.specifications.length > 0
    ? details.specifications
    : [
        { label: 'Category', value: details.category },
        { label: 'Stock', value: `${details.countInStock} available` },
        { label: 'Seller', value: details.sellerName }
      ];

  return source.slice(0, 5).map((item) => ({
    title: item.label,
    description: item.value
  }));
}

export function ProductDetailHero({ details }: ProductDetailHeroProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const highlights = useMemo(() => buildHighlights(details), [details]);
  const mrp = Math.max(details.price + 1, Math.round(details.price * 1.35));
  const discountPercent = Math.max(5, Math.round(((mrp - details.price) / mrp) * 100));

  function getAllowedAuth() {
    const auth = getStoredAuth();
    const role = auth?.user.role;
    const isAllowedRole = role === 'customer' || role === 'vendor';
    return auth && isAllowedRole ? auth : null;
  }

  function addSelectedQuantity() {
    for (let index = 0; index < quantity; index += 1) {
      addItem(details);
    }
  }

  function handleAddToCart() {
    if (!getAllowedAuth()) {
      router.push(`/login?redirect=${encodeURIComponent(`/products/${details._id}`)}`);
      return;
    }

    addSelectedQuantity();
  }

  function handleBuyNow() {
    if (!getAllowedAuth()) {
      router.push(`/login?redirect=${encodeURIComponent(`/products/${details._id}`)}`);
      return;
    }

    addSelectedQuantity();
    router.push('/checkout');
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[300px_1fr_330px]">
      <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="border-b border-zinc-100 pb-3 text-xl font-semibold tracking-tight text-[#0E4A4E]">Why you will love it</h2>
        <div className="mt-4 space-y-3">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#CF8C3B]" />
              <div>
                <p className="text-sm font-semibold text-zinc-900">{highlight.title}</p>
                <p className="text-sm text-zinc-600">{highlight.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
          <img
            src={details.gallery[0]}
            alt={details.name}
            className="h-72 w-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {details.gallery.slice(0, 4).map((image, index) => (
            <div key={image} className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <img
                src={image}
                alt={`${details.name} preview ${index + 1}`}
                className="h-16 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </aside>

      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-3xl font-semibold leading-tight text-zinc-950">{details.name}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
          <span className="font-semibold text-amber-600">{'★'.repeat(Math.round(details.rating ?? 0)).padEnd(5, '☆')}</span>
          <span>{(details.rating ?? 0).toFixed(1)} rating</span>
          <span>{details.numReviews ?? 0} reviews</span>
        </div>

        <p className="mt-3 text-sm text-zinc-600">
          Brand: <span className="font-semibold text-zinc-900">{details.sellerName}</span>
          <span className="mx-2">|</span>
          Category: <span className="font-semibold text-zinc-900">{details.category}</span>
        </p>

        <div className="mt-5 border-t border-zinc-200 pt-5">
          <div className="text-5xl font-semibold tracking-tight text-[#0B4B55]">{formatPrice(details.price)}</div>
          <div className="mt-1 flex items-center gap-2 text-lg">
            <span className="text-zinc-400 line-through">{formatPrice(mrp)}</span>
            <span className="font-semibold text-[#BC5E1D]">-{discountPercent}%</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <p className="text-2xl font-medium text-zinc-800">Quantity</p>
          <div className="flex items-center overflow-hidden rounded-xl border border-zinc-300">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="h-11 w-11 bg-zinc-100 text-xl font-semibold text-zinc-700 transition hover:bg-zinc-200"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="grid h-11 min-w-12 place-items-center px-3 text-lg font-semibold text-zinc-900">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.min(details.countInStock, current + 1))}
              className="h-11 w-11 bg-zinc-100 text-xl font-semibold text-zinc-700 transition hover:bg-zinc-200"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-sm text-zinc-500">{details.countInStock} in stock</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="rounded-xl bg-[#1A8AA6] px-5 py-3 text-base font-semibold text-white transition hover:brightness-95"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl bg-[#D9782F] px-5 py-3 text-base font-semibold text-white transition hover:brightness-95"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <aside className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-zinc-900">Delivery options</h3>
          <article className="rounded-xl border border-zinc-200 p-3">
            <p className="text-sm text-zinc-500">Location</p>
            <p className="font-medium text-zinc-900">Kathmandu Valley, Nepal</p>
          </article>
          <article className="rounded-xl border border-zinc-200 p-3">
            <p className="text-sm text-zinc-500">Standard delivery</p>
            <p className="font-medium text-zinc-900">{details.deliveryTime}</p>
            <p className="text-sm text-zinc-600">
              {details.deliveryCharge === 0 ? 'Free shipping' : `${formatPrice(details.deliveryCharge)} shipping`}
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 p-3">
            <p className="font-medium text-zinc-900">Cash on delivery available</p>
          </article>
        </section>

        <section className="space-y-2 border-t border-zinc-200 pt-4">
          <h3 className="text-base font-semibold text-zinc-900">Return & warranty</h3>
          <p className="text-sm text-zinc-600">14 days free returns</p>
          <p className="text-sm text-zinc-600">Seller warranty available for eligible items</p>
        </section>

        <section className="space-y-2 border-t border-zinc-200 pt-4">
          <h3 className="text-base font-semibold text-zinc-900">Sold by</h3>
          <p className="text-xl font-semibold text-[#0E4A4E]">{details.sellerName}</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-zinc-50 p-2">
              <p className="text-xs text-zinc-500">Positive</p>
              <p className="text-base font-semibold text-zinc-900">{Math.min(99, 90 + Math.round(details.rating ?? 0))}%</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-2">
              <p className="text-xs text-zinc-500">On-time</p>
              <p className="text-base font-semibold text-zinc-900">{details.deliveryCharge === 0 ? '100%' : '96%'}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-2">
              <p className="text-xs text-zinc-500">Replies</p>
              <p className="text-base font-semibold text-zinc-900">Fast</p>
            </div>
          </div>
        </section>
      </aside>
    </section>
  );
}
