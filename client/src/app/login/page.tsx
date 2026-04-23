"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { saveAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const auth = await loginUser({ email, password });
      saveAuth(auth);
      router.push('/');
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-106px)] items-center overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
      <div className="pointer-events-none absolute right-8 top-6 hidden text-[170px] leading-none text-[#0E4A4E]/5 lg:block">
        ⚒
      </div>
      <div className="pointer-events-none absolute bottom-8 left-8 hidden text-[120px] leading-none text-[#0E4A4E]/5 lg:block">
        ◇
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#0E4A4E] text-lg text-white shadow-md">
            A
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0E4A4E]">Allie</h1>
          <p className="mt-1 text-sm text-zinc-600">Get your essentials in one place</p>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-white/95 p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-800">Welcome Back</h2>
          <p className="mt-1 text-sm text-zinc-600">Enter your credentials to access your account.</p>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Email Address</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                <span className="text-zinc-500">✉</span>
                <input
                  type="email"
                  placeholder="email@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                  required
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Password</span>
                <Link href="#" className="text-xs font-semibold text-[#0E4A4E] hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                <span className="text-zinc-500">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
                  required
                />
              </div>
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-600">
              <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-[#0E4A4E]" />
              Keep me logged in on this device
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#0E4A4E] px-4 py-2.5 text-base font-semibold text-white shadow transition hover:brightness-95"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <div className="mt-5 border-t border-zinc-200 pt-4 text-center text-sm text-zinc-600">
            New to Allie?
            <Link href="/register" className="ml-1 font-semibold text-[#0E4A4E] hover:underline">
              Register Account
            </Link>
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white/70 px-4 py-3 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-700">SECURE ACCESS</p>
            <p className="mt-1">Protected account login and safe checkout.</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white/70 px-4 py-3 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-700">LIVE SYNC</p>
            <p className="mt-1">Realtime cart and order status updates.</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms Of Service</Link>
          <Link href="#">Contact Support</Link>
        </div>
      </div>
    </section>
  );
}
