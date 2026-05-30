import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Order received</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">NV-2026-0001</h1>
          <div className="mt-6 grid gap-3 text-sm text-zinc-300">
            <p>Payment status: pending verification</p>
            <p>Delivery: Nairobi CBD, same-day estimate after review</p>
            <p>Next steps: confirmation email, age verification review, dispatch update.</p>
            <p className="rounded-md bg-amber-300/10 p-3 text-amber-100">Dispatch may require additional verification review.</p>
          </div>
          <LinkButton href="/shop" className="mt-7">Continue shopping</LinkButton>
        </div>
      </section>
    </SiteShell>
  );
}
