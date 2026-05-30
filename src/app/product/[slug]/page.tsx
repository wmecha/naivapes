import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { LinkButton } from "@/components/ui/button";
import { products } from "@/lib/data";
import { formatKes } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const specs = [
    ["Flavour profile", product.flavourFamily],
    ["Nicotine strength", product.nicotineStrength],
    ["Device type", product.deviceType],
    ["Puff count", product.puffCount],
    ["Battery capacity", product.batteryCapacity],
    ["Pod capacity", product.podCapacity],
    ["Coil compatibility", product.coilCompatibility],
  ].filter(([, value]) => value);

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="glass relative aspect-square overflow-hidden rounded-lg">
            <Image src={product.gallery[0] ?? product.image} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-zinc-900">
                <Image src={image} alt={product.name} fill sizes="180px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">{product.brand}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-emerald-200">{formatKes(product.price)}</p>
          <p className="mt-2 text-sm text-zinc-400">{product.stock > 0 ? `${product.stock} units available` : "Out of stock"}</p>
          <p className="mt-6 leading-7 text-zinc-300">{product.fullDescription}</p>
          <div className="mt-6 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            {product.warnings.join(" ")}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/cart">Add to cart</LinkButton>
            <LinkButton href="/checkout" variant="secondary">Checkout</LinkButton>
          </div>
          <div className="mt-8 grid gap-3">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[160px_1fr] gap-4 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                <span className="text-zinc-400">{label}</span>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="font-semibold text-white">What is in the box</h2>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
              {product.whatsInBox.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-2xl font-semibold text-white">Frequently bought together</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.filter((item) => item.id !== product.id).slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Reviews</h2>
          <p className="mt-3 text-zinc-300">Reviews are ready for a moderated, verified-purchase workflow.</p>
        </div>
      </section>
    </SiteShell>
  );
}
