import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailHero } from '@/components/ProductDetailHero';
import { findProductById, getProductDetails } from '@/lib/productDetails';
import { getProductById, getProducts } from '@/lib/api';
import { mergeProducts } from '@/lib/products';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  let product = findProductById(id);
  let catalog = mergeProducts([]);

  try {
    const apiProducts = await getProducts();
    catalog = mergeProducts(apiProducts);
  } catch {
    catalog = mergeProducts([]);
  }

  if (!product) {
    try {
      product = await getProductById(id);
    } catch {
      product = undefined;
    }
  }

  if (!product) {
    notFound();
  }

  const details = getProductDetails(product, catalog);

  function renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, index) => (index < Math.round(rating) ? '★' : '☆')).join('');
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F4F7F3] via-white to-[#EEF5F2] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href="/products" className="text-sm font-medium text-[#0E4A4E] underline-offset-4 hover:underline">
          Back to products
        </Link>

        <ProductDetailHero details={details} />

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-950">Description</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">{details.description}</p>

            <h3 className="mt-8 text-xl font-semibold text-zinc-950">Specification</h3>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {details.specifications.map((specification) => (
                <div key={specification.label} className="rounded-2xl bg-zinc-50 p-4">
                  <dt className="text-sm font-medium text-zinc-500">{specification.label}</dt>
                  <dd className="mt-1 text-base font-semibold text-zinc-950">{specification.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-950">Customer reviews</h2>
            <p className="mt-2 text-sm text-zinc-600">All reviews collected for this product.</p>
            <div className="mt-6 space-y-4">
              {details.reviews.map((review) => (
                <article key={review.id} className="rounded-2xl border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-zinc-950">{review.name}</p>
                      <p className="text-sm text-zinc-500">{review.date}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-amber-600">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{review.comment}</p>
                  {review.verified && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                      Verified purchase
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">Similar products</h2>
            <p className="mt-2 text-sm text-zinc-600">More items from the same category or close matches in price.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {details.similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct._id} product={similarProduct} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
