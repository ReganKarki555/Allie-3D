import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';

type ProductsPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = searchParams?.q?.trim() ?? '';
  const normalizedQuery = query.toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    : products;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">Products</h1>
      {query && (
        <p className="mt-2 text-sm text-zinc-600">
          Showing {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'} for "{query}".
        </p>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {query && filteredProducts.length === 0 && (
        <p className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          No products found for "{query}". Try another product name.
        </p>
      )}
    </section>
  );
}
