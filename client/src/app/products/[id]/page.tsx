import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailActions } from '@/components/ProductDetailActions';
import { findProductById, getProductDetails } from '@/lib/productDetails';
import { formatPrice } from '@/lib/helpers';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = findProductById(id);

  if (!product) {
    notFound();
  }

  const details = getProductDetails(product);

  function renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, index) => (index < Math.round(rating) ? '★' : '☆')).join('');
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F4F7F3] via-white to-[#EEF5F2] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href="/products" className="text-sm font-medium text-[#0E4A4E] underline-offset-4 hover:underline">
          Back to products
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl">
              <img
                src={details.gallery[0]}
                alt={details.name}
                className="h-[420px] w-full object-cover sm:h-[540px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {details.gallery.slice(1, 4).map((image, index) => (
                <div key={image} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                  <img
                    src={image}
                    alt={`${details.name} photo ${index + 2}`}
                    className="h-36 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-lg lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {details.category}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                {details.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                <span className="font-semibold text-amber-600">{renderStars(details.rating ?? 0)}</span>
                <span>{(details.rating ?? 0).toFixed(1)} rating</span>
                <span>{details.numReviews ?? 0} reviews</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4FAF7] p-4">
              <p className="text-sm font-medium text-zinc-600">Price</p>
              <div className="text-4xl font-semibold text-zinc-950">{formatPrice(details.price)}</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 p-4">
                <p className="text-sm font-medium text-zinc-600">Seller</p>
                <p className="mt-1 text-base font-semibold text-zinc-950">{details.sellerName}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-4">
                <p className="text-sm font-medium text-zinc-600">Delivery time</p>
                <p className="mt-1 text-base font-semibold text-zinc-950">{details.deliveryTime}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 p-4">
                <p className="text-sm font-medium text-zinc-600">Delivery charge</p>
                <p className="mt-1 text-base font-semibold text-zinc-950">
                  {details.deliveryCharge === 0 ? 'Free' : formatPrice(details.deliveryCharge)}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-4">
                <p className="text-sm font-medium text-zinc-600">Stock</p>
                <p className="mt-1 text-base font-semibold text-zinc-950">{details.countInStock} available</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">Delivery options</h2>
              <div className="mt-3 space-y-3">
                {details.deliveryOptions.map((option) => (
                  <div key={option.label} className="rounded-2xl border border-zinc-200 p-4">
                    <p className="font-semibold text-zinc-950">{option.label}</p>
                    <p className="text-sm text-zinc-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <ProductDetailActions product={details} />
          </div>
        </div>

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
