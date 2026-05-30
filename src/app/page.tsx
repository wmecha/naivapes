import { ArrowRight, BadgeCheck, CreditCard, PackageCheck, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";
import { MotionCard } from "@/components/motion-card";
import { ProductCard } from "@/components/product-card";
import { collections, products } from "@/lib/data";

const trustItems = [
  { label: "Verified adult checkout", icon: ShieldCheck },
  { label: "Secure payment structure", icon: CreditCard },
  { label: "Fast Nairobi delivery", icon: PackageCheck },
  { label: "Authentic products", icon: BadgeCheck },
];

export default function Home() {
  const featured = products.filter((product) => product.featured || product.bestSeller);

  return (
    <SiteShell>
      <section className="neon-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_80%_25%,rgba(244,63,94,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Adult-only ecommerce</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              NaiVapes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Premium vape catalogue and checkout for verified adults, built around responsible commerce,
              age checks, clear warnings, and a polished Nairobi delivery experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/shop">Shop Devices</LinkButton>
              <LinkButton href="/shop?category=E-liquids" variant="secondary">
                Explore Flavours
              </LinkButton>
            </div>
          </div>
          <div className="relative min-h-[430px]">
            {featured.slice(0, 3).map((product, index) => (
              <MotionCard
                key={product.id}
                delay={index * 0.1}
                className={`absolute ${index === 0 ? "left-0 top-4 w-64" : index === 1 ? "right-0 top-20 w-72" : "bottom-8 left-16 w-60"}`}
              >
                <ProductCard product={product} />
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-900/80">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-sm text-zinc-200">
              <item.icon className="size-5 text-emerald-200" />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Collections</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Shop by category</h2>
          </div>
          <LinkButton href="/shop" variant="ghost" className="hidden md:inline-flex">
            View all <ArrowRight className="size-4" />
          </LinkButton>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {collections.map((collection) => (
            <a key={collection} href={`/shop?category=${encodeURIComponent(collection)}`} className="rounded-lg border border-white/10 bg-white/5 p-5 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10">
              {collection}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Popular this week</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Featured products</h2>
            </div>
            <LinkButton href="/shop" variant="secondary">Open catalogue</LinkButton>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Build your kit</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Device, pods, compatible accessories.</h2>
          <p className="mt-4 text-zinc-300">
            Bundle starter hardware with compatible pods and accessories while keeping compliance warnings visible
            throughout the purchase flow.
          </p>
          <LinkButton href="/shop" className="mt-7">Start a kit</LinkButton>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Restock alerts</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Newsletter and stock notifications.</h2>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input className="min-h-11 flex-1 rounded-md border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-emerald-300" placeholder="Email address" type="email" />
            <button className="rounded-md bg-emerald-300 px-5 py-2.5 text-sm font-semibold text-zinc-950">Notify me</button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
