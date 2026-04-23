import Link from 'next/link';
import { Button } from '@/components/Button';

export default function HomePage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl place-items-center px-6 py-16">
      <div className="max-w-3xl space-y-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">Ecommerce Platform</p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl">
          Build a sharper shopping experience.
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-600">
          Next.js frontend, Express backend, MongoDB data, and Tailwind CSS styling only.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
          <Link href="/checkout">
            <Button variant="secondary">Checkout</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
