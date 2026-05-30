import Link from "next/link";
import { AlertTriangle, Boxes, CreditCard, Settings, ShoppingBasket, Users } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { adminStats, products } from "@/lib/data";

const modules = [
  { href: "/admin/products", label: "Product management", icon: Boxes },
  { href: "/admin/orders", label: "Order management", icon: ShoppingBasket },
  { href: "/admin/settings", label: "Settings and compliance", icon: Settings },
  { href: "/admin", label: "Customers", icon: Users },
  { href: "/admin", label: "Promotions", icon: CreditCard },
  { href: "/admin", label: "Audit logs", icon: AlertTriangle },
];

export default function AdminDashboardPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Protected admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Dashboard</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link key={module.label} href={module.href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-300/50">
              <module.icon className="size-5 text-emerald-200" />
              <p className="mt-4 font-semibold text-white">{module.label}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Low stock products</h2>
          <div className="mt-4 grid gap-3">
            {products.filter((product) => product.stock < 12).map((product) => (
              <div key={product.id} className="flex justify-between rounded-md bg-zinc-950 px-4 py-3 text-sm">
                <span>{product.name}</span>
                <span className="text-amber-200">{product.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
