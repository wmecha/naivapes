import { Copy, Download, ImagePlus, Plus, Upload } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/data";
import { formatKes } from "@/lib/utils";

const fields = [
  "Name",
  "Brand",
  "Category",
  "Price",
  "Compare-at price",
  "Stock",
  "Flavour profile",
  "Nicotine strength",
  "Device type",
  "Puff count",
  "Battery capacity",
  "Pod capacity",
  "Compatibility",
  "Warnings",
];

export default function AdminProductsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Products</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Product management</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex min-h-10 items-center gap-2 rounded-md bg-emerald-300 px-4 text-sm font-semibold text-zinc-950"><Plus className="size-4" />Create</button>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/10 px-4 text-sm"><Upload className="size-4" />CSV import</button>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/10 px-4 text-sm"><Download className="size-4" />Export</button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
          <form className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="font-semibold text-white">Create or edit product</h2>
            <div className="mt-5 grid gap-3">
              {fields.map((field) => (
                <label key={field} className="grid gap-1 text-xs text-zinc-400">
                  {field}
                  <input className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white" />
                </label>
              ))}
              <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/10 text-sm">
                <ImagePlus className="size-4" /> Upload gallery to Supabase Storage
              </button>
            </div>
          </form>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-white/[0.06] text-zinc-300">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Flags</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-white/10">
                    <td className="p-4">
                      <p className="font-semibold text-white">{product.name}</p>
                      <p className="text-zinc-400">{product.brand}</p>
                    </td>
                    <td className="p-4 text-zinc-300">{product.category}</td>
                    <td className="p-4 text-zinc-300">{formatKes(product.price)}</td>
                    <td className="p-4 text-zinc-300">{product.stock}</td>
                    <td className="p-4 text-zinc-300">{[product.featured && "Featured", product.bestSeller && "Best seller", product.newArrival && "New"].filter(Boolean).join(", ")}</td>
                    <td className="p-4">
                      <button className="inline-flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/10" aria-label="Duplicate product">
                        <Copy className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
