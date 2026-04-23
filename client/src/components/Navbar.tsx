import Link from 'next/link';

export function Navbar() {
  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="flex w-full items-center gap-3 rounded-2xl bg-[#0E4A4E] px-4 py-3 text-white shadow-lg sm:gap-4 sm:px-5">
        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-lg"
          type="button"
        >
          ≡
        </button>

        <Link href="/" className="whitespace-nowrap text-xl font-semibold tracking-tight">
          Allie
        </Link>

        <div className="hidden flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-zinc-500 md:flex">
          <input
            aria-label="Search products"
            className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            placeholder="Search for Grocery, Stores, Vegetable or Meat"
            type="text"
          />
          <span className="text-zinc-700">⌕</span>
        </div>

        <p className="hidden text-sm text-emerald-100 lg:block">
          <span className="mr-1">⚡</span>
          Get all your essentials in one 
          <span className="ml-1 font-semibold text-yellow-300">place</span>
        </p>

        <Link
          href="/cart"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-[#0E4A4E]"
        >
          🛒
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#F6C53E] px-4 py-2 text-sm font-semibold text-[#15333A] transition hover:brightness-95"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-3 w-full md:hidden">
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm">
          <input
            aria-label="Search products"
            className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            placeholder="Search groceries"
            type="text"
          />
          <span className="text-zinc-700">⌕</span>
        </div>
      </div>
    </header>
  );
}
