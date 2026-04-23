import { products } from '@/lib/products';

const categoryFilters = [
  ,
];

export default function HomePage() {
  return (
    <section className="pb-14">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
        <article className="relative overflow-hidden rounded-2xl bg-[#EAC6A5]">
          <div className="grid min-h-[230px] items-stretch gap-0 lg:grid-cols-[44%_56%]">
            <div className="relative flex flex-col justify-center bg-[#9A1E27] px-8 py-10 text-[#F7D89B] sm:px-10">
              <div className="absolute -right-10 top-0 hidden h-full w-20 rounded-l-[100px] bg-[#9A1E27] lg:block" />
              <p className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
                Get 5% Cash Back
                <br />
                on Shopping Above Rs. 2,999
              </p>
              <p className="mt-4 max-w-xs text-sm text-[#F4D4AF]/90">
                Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
              </p>
              <button
                className="mt-6 w-fit rounded-full bg-[#F6C53E] px-5 py-2 text-sm font-semibold text-[#15333A] transition hover:brightness-95"
                type="button"
              >
                Learn More
              </button>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              <div className="absolute h-52 w-52 rounded-full bg-orange-200/50 blur-lg" />
              <div className="grid grid-cols-3 gap-3">
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#9D7A58] text-4xl">🫘</span>
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#BCA180] text-4xl">🌾</span>
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#D18C4A] text-4xl">🥜</span>
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#B9875F] text-4xl">🌰</span>
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#D69E2E] text-4xl">🌽</span>
                <span className="grid h-24 w-24 place-items-center rounded-full bg-[#D57745] text-4xl">🥕</span>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-10">
          

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((filter, index) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? 'bg-[#0A6A46] text-white'
                      : 'border border-zinc-200 bg-white text-[#20434A] hover:bg-zinc-50'
                  }`}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>

            
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <article
                key={product._id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full rounded-lg bg-zinc-50 object-cover"
                  loading="lazy"
                />
                <h3 className="mt-4 text-lg font-semibold leading-7 text-[#143940]">{product.name}</h3>
                <p className="text-sm text-zinc-500">{product.category}</p>
                <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{product.description}</p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B343A]">Rs. {product.price}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
