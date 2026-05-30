import { SiteShell } from "@/components/site-shell";
import { siteSettings, deliveryZones } from "@/lib/data";

const settings = [
  ["Business name", siteSettings.businessName],
  ["Business phone", siteSettings.businessPhone],
  ["Business email", siteSettings.businessEmail],
  ["WhatsApp number", siteSettings.whatsappNumber],
  ["Paystack public key", "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY"],
  ["Paystack secret key", "Environment variable only"],
  ["Paystack enabled", siteSettings.paystackEnabled ? "Enabled" : "Disabled"],
  ["Checkout enabled", siteSettings.checkoutEnabled ? "Enabled" : "Disabled"],
  ["Catalogue-only mode", siteSettings.catalogueOnly ? "Enabled" : "Disabled"],
  ["Warning text", siteSettings.warningText],
  ["Age gate text", siteSettings.ageGateText],
  ["Email sender", "Resend verified domain"],
];

export default function AdminSettingsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Compliance settings</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Settings</h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {settings.map(([label, value]) => (
            <label key={label} className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
              {label}
              <input className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-white" defaultValue={value} />
            </label>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Delivery zones</h2>
          <div className="mt-4 grid gap-3">
            {deliveryZones.map((zone) => (
              <div key={zone.zone} className="grid gap-3 rounded-md bg-zinc-950 px-4 py-3 text-sm text-zinc-300 md:grid-cols-3">
                <span>{zone.zone}</span>
                <span>KES {zone.fee}</span>
                <span>{zone.eta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
