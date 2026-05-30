import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatKes } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="glass group overflow-hidden rounded-lg">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded-md bg-zinc-950/80 px-3 py-1 text-xs text-emerald-200">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{product.brand}</p>
            <Link href={`/product/${product.slug}`} className="mt-1 block font-semibold text-white">
              {product.name}
            </Link>
          </div>
          <button className="grid size-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5" aria-label="Add to wishlist">
            <Heart className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-semibold text-emerald-200">{formatKes(product.price)}</p>
          <button className="inline-flex size-10 items-center justify-center rounded-md bg-emerald-300 text-zinc-950" aria-label="Quick add">
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
