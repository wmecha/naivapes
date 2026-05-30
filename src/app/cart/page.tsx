import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";
import { products, siteSettings } from "@/lib/data";
import { formatKes } from "@/lib/utils";

export default function CartPage() {
  const cartItems = products.slice(0, 2).map((product, index) => ({ product, quantity: index + 1 }));
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-4xl font-semibold text-white">Cart</h1>
          <div className="mt-6 grid gap-4">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-zinc-400">{product.brand}</p>
                  <h2 className="mt-1 font-semibold text-white">{product.name}</h2>
                  <p className="mt-2 text-sm text-zinc-400">Stock validation: {product.stock > quantity ? "available" : "review required"}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/5" aria-label="Decrease quantity"><Minus className="size-4" /></button>
                    <span className="grid size-9 place-items-center rounded-md bg-zinc-950 text-sm">{quantity}</span>
                    <button className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/5" aria-label="Increase quantity"><Plus className="size-4" /></button>
                    <button className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/5 text-red-200" aria-label="Remove item"><Trash2 className="size-4" /></button>
                  </div>
                </div>
                <p className="text-lg font-semibold text-emerald-200">{formatKes(product.price * quantity)}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-zinc-300">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatKes(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery estimate</span><span>From KES 250</span></div>
            <input className="min-h-11 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm" placeholder="Promo code" />
            <p className="rounded-md bg-amber-300/10 p-3 text-amber-100">{siteSettings.warningText}</p>
          </div>
          <LinkButton href="/checkout" className="mt-6 w-full">Continue to checkout</LinkButton>
          <p className="mt-5 text-sm font-semibold text-white">Suggested add-ons</p>
          <p className="mt-2 text-sm text-zinc-400">Replacement pods, USB-C cables, and compatible accessories.</p>
        </aside>
      </section>
    </SiteShell>
  );
}
