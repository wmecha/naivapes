import { SiteShell } from "@/components/site-shell";

const statuses = [
  "pending_payment",
  "paid",
  "age_review_required",
  "processing",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refund_requested",
  "refunded",
  "failed",
];

export default function AdminOrdersPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Orders</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Order management</h1>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {statuses.map((status) => (
            <div key={status} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-zinc-300">{status}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{status === "age_review_required" ? 7 : 0}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Operational controls</h2>
          <p className="mt-3 text-zinc-300">
            View orders, update status, assign rider, add internal notes, approve or reject age verification,
            trigger confirmation and dispatch emails, mark delivered, and export orders.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
