import Image from "next/image";
import { ArrowRight, BadgeCheck, CreditCard, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";
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
        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_0.86fr]">
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
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-2xl shadow-emerald-950/30">
            <Image
              src="/images/products/vape-mod-dark.jpg"
              alt="Close-up of a vape device on a dark premium background"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-950/45 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-sm p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Verified adults only</p>
              <p className="mt-3 text-2xl font-semibold text-white">Dark retail, clear warnings, real product imagery.</p>
            </div>
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

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid overflow-hidden rounded-lg border border-white/10 bg-zinc-900 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[420px]">
            <Image
              src="/images/products/headline-pod-kit.jpg"
              alt="Teal vape pod kit photographed on an orange editorial background"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/35 to-transparent" />
          </div>
          <div className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute right-6 top-6 grid size-12 place-items-center rounded-md bg-emerald-300 text-zinc-950">
              <Sparkles className="size-6" aria-hidden />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Headline drop</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              The city kit, shot like a night-market poster.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-zinc-300">
              A dedicated campaign block for featured launches, seasonal drops, or catalogue-only announcements.
              It keeps the homepage hero clean while giving the brand room for a bold graphic moment.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {featured.slice(0, 2).map((product) => (
                <div key={product.id} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{product.brand}</p>
                  <p className="mt-2 font-semibold text-white">{product.name}</p>
                  <p className="mt-3 text-sm text-emerald-200">{product.tags.slice(0, 2).join(" / ")}</p>
                </div>
              ))}
            </div>
            <LinkButton href="/shop" className="mt-8">Shop the drop</LinkButton>
          </div>
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
