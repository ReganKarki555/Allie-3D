"use client";

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/api';
import { mergeProducts } from '@/lib/products';
import type { Product } from '@/types';

const fallbackRatings: Record<string, number> = {
  '1': 5,
  '2': 4,
  '3': 4,
  '4': 5,
  '5': 5,
  '6': 4,
  '7': 4,
  '8': 4,
  '9': 5,
  '10': 4,
  '11': 4,
  '12': 3,
  '13': 4,
  '14': 5,
  '15': 5,
  '16': 4,
  '17': 4,
  '18': 5,
  '19': 4,
  '20': 5
};

type SortOrder = 'none' | 'price-low-high' | 'price-high-low';
type RatingFilter = 'all' | '5' | '4' | '3' | '2' | '1';

export default function ProductsPage() {
  const query = typeof window === 'undefined'
    ? ''
    : new URLSearchParams(window.location.search).get('q')?.trim() ?? '';
  const normalizedQuery = query.toLowerCase();

  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [catalog, setCatalog] = useState<Product[]>(() => mergeProducts([]));

  useEffect(() => {
    async function loadCatalog() {
      try {
        const apiProducts = await getProducts();
        setCatalog(mergeProducts(apiProducts));
      } catch {
        setCatalog(mergeProducts([]));
      }
    }

    loadCatalog();
  }, []);

  const minPrice = Number(minPriceInput);
  const maxPrice = Number(maxPriceInput);

  const filteredProducts = useMemo(() => {
    let result = normalizedQuery
      ? catalog.filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      : catalog;

    if (ratingFilter !== 'all') {
      const selectedRating = Number(ratingFilter);
      result = result.filter((product) => (product.rating ?? fallbackRatings[product._id] ?? 0) === selectedRating);
    }

    if (minPriceInput !== '' && Number.isFinite(minPrice)) {
      result = result.filter((product) => product.price >= minPrice);
    }

    if (maxPriceInput !== '' && Number.isFinite(maxPrice)) {
      result = result.filter((product) => product.price <= maxPrice);
    }

    if (sortOrder === 'price-low-high') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === 'price-high-low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [catalog, maxPrice, maxPriceInput, minPrice, minPriceInput, normalizedQuery, ratingFilter, sortOrder]);

  const showSearchFilters = query.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">Products</h1>
      {query && (
        <p className="mt-2 text-sm text-zinc-600">
          Showing {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'} for "{query}".
        </p>
      )}

      {showSearchFilters && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-zinc-800">Filter Search Results</h2>

            <div className="mt-4 space-y-1">
              <label htmlFor="price-sort" className="text-sm font-medium text-zinc-700">
                Price Dropdown
              </label>
              <select
                id="price-sort"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-500 focus:ring"
              >
                <option value="none">Select Price Sort</option>
                <option value="price-high-low">High to Low</option>
                <option value="price-low-high">Low to High</option>
              </select>
            </div>

            <div className="mt-4 space-y-1">
              <label htmlFor="review-filter" className="text-sm font-medium text-zinc-700">
                Reviews Dropdown
              </label>
              <select
                id="review-filter"
                value={ratingFilter}
                onChange={(event) => setRatingFilter(event.target.value as RatingFilter)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-500 focus:ring"
              >
                <option value="all">All Stars</option>
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-zinc-700">Min Price - Max Price</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={0}
                  value={minPriceInput}
                  onChange={(event) => setMinPriceInput(event.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-500 focus:ring"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  min={0}
                  value={maxPriceInput}
                  onChange={(event) => setMaxPriceInput(event.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-500 focus:ring"
                  placeholder="Max Price"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSortOrder('none');
                setRatingFilter('all');
                setMinPriceInput('');
                setMaxPriceInput('');
              }}
              className="mt-4 w-full rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Clear All Filters
            </button>
          </aside>

          <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                No products found for "{query}" with the selected filters.
              </p>
            )}
          </div>
        </div>
      )}

      {!showSearchFilters && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
