"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAuth } from '@/lib/auth';
import { formatPrice } from '@/lib/helpers';

type VendorProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

export default function VendorDashboardPage() {
  const router = useRouter();
  const auth = getStoredAuth();
  const userRole = auth?.user.role;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [listedProducts, setListedProducts] = useState<VendorProduct[]>([]);

  const parsedPrice = Number(price);
  const parsedStock = Number(stock);

  const dashboardStats = useMemo(() => {
    const totalProducts = listedProducts.length;
    const totalUnits = listedProducts.reduce((sum, product) => sum + product.stock, 0);
    const averagePrice = totalProducts === 0
      ? 0
      : listedProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts;

    return {
      totalProducts,
      totalUnits,
      averagePrice
    };
  }, [listedProducts]);

  useEffect(() => {
    if (!auth) {
      router.replace('/login?redirect=%2Fvendor%2Fdashboard');
      return;
    }

    if (userRole !== 'vendor') {
      router.replace('/');
    }
  }, [auth, router, userRole]);

  if (!auth || userRole !== 'vendor') {
    return null;
  }

  function handleAddProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback('');

    if (!name.trim() || !description.trim() || !image.trim()) {
      setFeedback('Please fill in product name, description, and image URL.');
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setFeedback('Please enter a valid product price.');
      return;
    }

    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      setFeedback('Please enter a valid stock quantity.');
      return;
    }

    const newProduct: VendorProduct = {
      id: `${Date.now()}`,
      name: name.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      image: image.trim(),
      description: description.trim()
    };

    setListedProducts((current) => [newProduct, ...current]);
    setName('');
    setCategory('General');
    setPrice('');
    setStock('');
    setImage('');
    setDescription('');
    setFeedback('Product listed successfully.');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="rounded-2xl bg-[#0E4A4E] px-6 py-6 text-white shadow-lg sm:px-8">
        <p className="text-sm uppercase tracking-[0.22em] text-emerald-100">Vendor workspace</p>
        <h1 className="mt-2 text-3xl font-semibold">Vendor Dashboard</h1>
        <p className="mt-2 text-sm text-emerald-100">
          Manage your catalog and publish new products from one place.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Listed products</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{dashboardStats.totalProducts}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Total stock units</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{dashboardStats.totalUnits}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Average price</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{formatPrice(dashboardStats.averagePrice)}</p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold text-zinc-900">List New Product</h2>
          <p className="mt-1 text-sm text-zinc-600">Add the product details and publish it to your list.</p>

          <form className="mt-5 space-y-4" onSubmit={handleAddProduct}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Product Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                  placeholder="Enter product name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                >
                  <option>General</option>
                  <option>Watches</option>
                  <option>Phones</option>
                  <option>iPhones</option>
                  <option>Chargers</option>
                  <option>Vegetables</option>
                  <option>Hair Products</option>
                  <option>Gadgets</option>
                  <option>Tech Products</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Price</span>
                <input
                  type="number"
                  min={1}
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                  placeholder="Enter price"
                  required
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Stock</span>
                <input
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                  placeholder="Available quantity"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Image URL</span>
              <input
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                placeholder="https://example.com/product-image.jpg"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1.5 min-h-24 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none ring-[#0E4A4E] focus:ring"
                placeholder="Write product description"
                required
              />
            </label>

            <button
              type="submit"
              className="rounded-lg bg-[#0E4A4E] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              List Product
            </button>
          </form>

          {feedback && (
            <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">{feedback}</p>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold text-zinc-900">Your Listed Products</h2>
          <p className="mt-1 text-sm text-zinc-600">Products you have added from this dashboard.</p>

          {listedProducts.length === 0 ? (
            <p className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              No products listed yet. Use the form to add your first product.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {listedProducts.map((product) => (
                <article key={product.id} className="flex gap-3 rounded-xl border border-zinc-200 p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-lg bg-zinc-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-zinc-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{product.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span className="font-medium text-zinc-900">{formatPrice(product.price)}</span>
                      <span className="text-zinc-600">Stock: {product.stock}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
