import { SiteShell } from "@/components/site-shell";

const panels = ["Login/signup", "Profile", "Saved addresses", "Order history", "Wishlist", "Verification status"];

export default function AccountPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-semibold text-white">Customer account</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {panels.map((panel) => (
            <div key={panel} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-semibold text-white">{panel}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Ready for Supabase Auth, customer profile data, and RLS-backed access.</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
