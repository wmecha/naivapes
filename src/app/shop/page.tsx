import { Grid2X2, ListFilter } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/data";

const filters = [
  "Category",
  "Brand",
  "Price range",
  "Flavour family",
  "Nicotine strength",
  "Device type",
  "Puff count",
  "Stock status",
  "New arrivals",
  "Best sellers",
];

export default function ShopPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Catalogue</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Adult-use products</h1>
            <p className="mt-3 max-w-2xl text-zinc-300">
              Filter devices, pods, disposables, e-liquids, and accessories. Checkout remains subject to age
              verification and stock validation.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="grid size-11 place-items-center rounded-md border border-white/10 bg-white/10" aria-label="Grid view">
              <Grid2X2 className="size-5" />
            </button>
            <select className="min-h-11 rounded-md border border-white/10 bg-zinc-900 px-4 text-sm text-white">
              <option>Newest</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
              <option>Best sellers</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <ListFilter className="size-4" />
              Filters
            </div>
            <div className="grid gap-2">
              {filters.map((filter) => (
                <button key={filter} className="rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-left text-sm text-zinc-300">
                  {filter}
                </button>
              ))}
            </div>
          </aside>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
