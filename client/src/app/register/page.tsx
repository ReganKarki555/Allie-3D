"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import { saveAuth } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getSafeRedirectTo(roleValue?: 'customer' | 'vendor') {
    if (roleValue === 'vendor') {
      return '/vendor/dashboard';
    }

    if (typeof window === 'undefined') {
      return '/';
    }

    const redirectTo = new URLSearchParams(window.location.search).get('redirect');

    return redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const auth = await registerUser({
        name,
        email,
        phoneNumber,
        role,
        password,
        confirmPassword
      });

      saveAuth(auth);
      router.push(getSafeRedirectTo(auth.role));
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to create your account');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-4 py-4 sm:px-6 sm:py-5">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl sm:p-4">
        <div className="grid gap-4 lg:grid-cols-[42%_58%]">
          <aside className="relative overflow-hidden rounded-xl bg-[#0E4A4E] p-6 text-white sm:p-8">
            <p className="inline-block rounded-full bg-[#F6C53E] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#15333A]">
              Join The Community
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-tight">
              The Smart Way
              <br />
              to Do Online
              <br />
              Shopping.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-100/90">
              Create your account to explore and order your essentials in cheaper rate.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-emerald-100">
              <span className="ml-2">Join 2,000+ active shoppers</span>
            </div>
          </aside>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 sm:p-6">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-800">Create Account</h2>
            <p className="mt-1 text-sm text-zinc-600">Please complete your details to start your journey.</p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Full Name</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                  <span className="text-zinc-500">👤</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                    required
                  />
                </div>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Email</span>
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
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Phone Number</span>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                    <span className="text-zinc-500">☎</span>
                    <input
                      type="tel"
                      placeholder="+977 9800000000"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Role Selection</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-600">
                  <span>▣</span>
                  <select
                    className="w-full bg-transparent text-sm text-zinc-700 focus:outline-none"
                    value={role}
                    onChange={(event) => setRole(event.target.value as 'customer' | 'vendor')}
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Password</span>
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

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Confirm Password</span>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                    <span className="text-zinc-500">↻</span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
                      required
                    />
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg bg-[#0E4A4E] px-4 py-2.5 text-base font-semibold text-white shadow transition hover:brightness-95"
              >
                {isSubmitting ? 'Creating Account...' : 'Complete Registration →'}
              </button>
            </form>

            {error ? (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <div className="mt-4 rounded-lg border border-[#0E4A4E]/10 bg-[#0E4A4E]/5 px-4 py-3 text-sm text-zinc-700">
              Your registration will be reviewed. Access is granted after account verification.
            </div>

            <div className="mt-4 text-center text-sm text-zinc-600">
              Already have an account?
              <Link href="/login" className="ml-1 font-semibold text-[#0E4A4E] hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
        AllieTrack 2026 Grocery Commerce Management
      </p>
    </section>
  );
}
