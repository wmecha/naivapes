import { ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";
import { products, siteSettings } from "@/lib/data";
import { formatKes } from "@/lib/utils";

const steps = ["Contact details", "Delivery address", "Age verification", "Order review", "Paystack payment", "Confirmation"];

export default function CheckoutPage() {
  const subtotal = products.slice(0, 2).reduce((sum, product) => sum + product.price, 0);

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Secure adult checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Checkout</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {steps.map((step) => (
              <span key={step} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300">{step}</span>
            ))}
          </div>
          <form className="mt-8 grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-zinc-300">Full legal name<input className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" /></label>
              <label className="grid gap-2 text-sm text-zinc-300">Date of birth<input type="date" className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" /></label>
              <label className="grid gap-2 text-sm text-zinc-300">Phone<input className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" /></label>
              <label className="grid gap-2 text-sm text-zinc-300">Email<input type="email" className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" /></label>
              <label className="grid gap-2 text-sm text-zinc-300 md:col-span-2">Optional ID/passport number<input className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" /></label>
              <label className="grid gap-2 text-sm text-zinc-300 md:col-span-2">Delivery address<textarea className="min-h-24 rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-white" /></label>
            </div>
            <label className="flex gap-3 text-sm text-zinc-300"><input type="checkbox" className="mt-1" /> I confirm I am 18 or older and may be asked for verification before dispatch.</label>
            <label className="flex gap-3 text-sm text-zinc-300"><input type="checkbox" className="mt-1" /> I accept the adult-only terms, warnings, delivery policy, and privacy policy.</label>
            <div className="rounded-md border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-100">{siteSettings.warningText}</div>
            <LinkButton href="/order-confirmation" className="w-full md:w-fit">
              Initialize Paystack payment
            </LinkButton>
          </form>
        </div>
        <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-2 text-emerald-200">
            <ShieldCheck className="size-5" />
            <span className="text-sm font-semibold">Server checks required</span>
          </div>
          <div className="mt-5 space-y-3 text-sm text-zinc-300">
            <p>Checkout enabled: {siteSettings.checkoutEnabled ? "Yes" : "No"}</p>
            <p>Paystack enabled: {siteSettings.paystackEnabled ? "Yes" : "No, pending merchant approval"}</p>
            <div className="flex justify-between border-t border-white/10 pt-4"><span>Subtotal</span><span>{formatKes(subtotal)}</span></div>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
