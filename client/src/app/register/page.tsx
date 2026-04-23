import Link from 'next/link';

export default function RegisterPage() {
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

            <form className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Full Name</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                  <span className="text-zinc-500">👤</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
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
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
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
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Date Of Birth</span>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                    <span className="text-zinc-500">◷</span>
                    <input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Role Selection</span>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-600">
                    <span>▣</span>
                    <select className="w-full bg-transparent text-sm text-zinc-700 focus:outline-none">
                      <option>Select Role</option>
                      <option>Customer</option>
                      <option>Vendor</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Password</span>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2">
                    <span className="text-zinc-500">🔒</span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
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
                      className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="mt-1 w-full rounded-lg bg-[#0E4A4E] px-4 py-2.5 text-base font-semibold text-white shadow transition hover:brightness-95"
              >
                Complete Registration →
              </button>
            </form>

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
