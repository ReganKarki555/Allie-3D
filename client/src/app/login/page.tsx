export default function LoginPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#103A42]">Login</h1>
        <p className="mt-2 text-sm text-zinc-600">Welcome back. Sign in to continue shopping.</p>

        <form className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-[#0E4A4E]/20 transition focus:ring-4"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Password
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-[#0E4A4E]/20 transition focus:ring-4"
              placeholder="Enter password"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-full bg-[#0E4A4E] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
