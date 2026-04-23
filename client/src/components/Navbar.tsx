"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth, getStoredAuth, type StoredAuth } from '@/lib/auth';
import { products } from '@/lib/products';

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  suggestions: typeof products;
  showSuggestions: boolean;
  onSuggestionSelect: () => void;
  wrapperClassName: string;
  inputClassName: string;
  placeholder: string;
};

function SearchInput({
  query,
  setQuery,
  onSubmit,
  suggestions,
  showSuggestions,
  onSuggestionSelect,
  wrapperClassName,
  inputClassName,
  placeholder
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} className={wrapperClassName}>
        <input
          aria-label="Search products"
          className={inputClassName}
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="text-zinc-700" type="submit" aria-label="Search">
          ⌕
        </button>
      </form>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
          {suggestions.map((product) => (
            <Link
              key={product._id}
              href={`/products?q=${encodeURIComponent(product.name)}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-zinc-50"
              onClick={onSuggestionSelect}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-10 w-10 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900">{product.name}</p>
                <p className="text-xs text-zinc-500">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const router = useRouter();
  const [auth, setAuth] = useState<StoredAuth | null>(getStoredAuth());
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return products
      .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [query]);

  const showSuggestions = query.trim().length > 0 && suggestions.length > 0;

  function handleLogout() {
    clearAuth();
    setAuth(null);
    router.push('/login');
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    setQuery('');

    if (!normalizedQuery) {
      router.push('/products');
      return;
    }

    router.push(`/products?q=${encodeURIComponent(normalizedQuery)}`);
  }

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

        <div className="hidden flex-1 md:flex">
          <SearchInput
            query={query}
            setQuery={setQuery}
            onSubmit={handleSearchSubmit}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onSuggestionSelect={() => setQuery('')}
            wrapperClassName="flex w-full items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-zinc-500"
            inputClassName="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            placeholder="Search for Your Products"
          />
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
          {auth ? (
            <>
              <div className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-emerald-50 sm:block">
                {auth.user.name}
              </div>
              <button
                className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="mt-3 w-full md:hidden">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearchSubmit}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onSuggestionSelect={() => setQuery('')}
          wrapperClassName="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm"
          inputClassName="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
          placeholder="Search groceries"
        />
      </div>
    </header>
  );
}
