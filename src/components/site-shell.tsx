import Link from "next/link";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import { AgeGate } from "./age-gate";
import { siteSettings } from "@/lib/data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgeGate text={siteSettings.ageGateText} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-9 place-items-center rounded-md bg-emerald-300 text-zinc-950">NV</span>
              <span>NaiVapes</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              <Link href="/shop">Shop</Link>
              <Link href="/account">Account</Link>
              <Link href="/admin">Admin</Link>
            </nav>
            <Link
              href="/cart"
              className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/10"
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="mb-3 flex items-center gap-2 text-emerald-200">
                <ShieldCheck className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Adult-only warning</span>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-zinc-300">{siteSettings.warningText}</p>
            </div>
            <div className="text-sm text-zinc-400">
              <p className="font-semibold text-white">Policies</p>
              <p className="mt-3">Terms</p>
              <p>Privacy</p>
              <p>Delivery policy</p>
            </div>
            <div className="text-sm text-zinc-400">
              <p className="font-semibold text-white">Contact</p>
              <p className="mt-3">{siteSettings.businessPhone}</p>
              <p>{siteSettings.businessEmail}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
