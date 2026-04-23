import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Allie 3D Store
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
