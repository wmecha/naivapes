# NaiVapes

Premium adult-only ecommerce starter for a regulated vape/nicotine store in Nairobi.

The starter includes a compliance-first storefront, age gate, catalogue, product detail pages, cart, checkout flow, admin dashboard, product management UI, order/status surfaces, settings, Supabase schema, and Paystack route structure.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn-style local UI primitives
- Framer Motion
- Supabase database, auth, and storage integration points
- Paystack server-side payment routes
- Resend integration placeholders
- Vercel-ready deployment structure

## Compliance Notes

- The storefront shows an 18+ age gate before site access.
- Checkout includes separate age verification fields and mandatory adult-only confirmation.
- Server validation blocks under-18 checkout via `checkoutSchema`.
- Warning copy is centralized in `src/lib/data.ts` and modelled as admin-editable `site_settings`.
- Paystack can be disabled with `PAYSTACK_ENABLED=false`.
- Catalogue-only and checkout-enabled settings are part of the data model.
- Paystack secret keys are server-only and must never be exposed to frontend code.

Avoid adding health claims such as "safe", "healthy", "risk-free", or "better for you".

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

See `.env.example`.

Required for full Supabase/Paystack operation:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_ENABLED`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## Supabase

Apply the migration in:

```text
supabase/migrations/20260530120000_initial_schema.sql
```

The schema includes:

- Products, product images, categories, brands, flavour profiles
- Inventory movements
- Customers, addresses, wishlist, reviews
- Orders, order items, payments, Paystack events
- Age verifications
- Discount codes and cart sessions
- Admin users, audit logs, site settings, content blocks, delivery zones
- RLS policies and indexes for common storefront/admin queries

For storage, create a private/admin-managed product media bucket and expose signed URLs from server routes or Supabase policies suitable for published assets.

## Paystack Flow

Implemented routes:

- `POST /api/paystack/initialize`
- `GET /api/paystack/verify?reference=...`
- `POST /api/paystack/webhook`

Expected production flow:

1. Validate checkout data server-side.
2. Create order with `pending_payment`.
3. Initialize Paystack server-side.
4. Redirect to Paystack authorization URL.
5. Verify on return.
6. Persist webhook event in `paystack_events`.
7. Update `payments` and `orders`.
8. Set order to `paid` or `age_review_required`.
9. Send Resend transactional emails.
10. Write audit logs for admin changes.

## Key Routes

- `/` storefront homepage
- `/shop` catalogue with filter/sort surface
- `/product/[slug]` product detail
- `/cart` cart
- `/checkout` adult checkout
- `/order-confirmation` confirmation
- `/account` customer account shell
- `/admin` admin dashboard
- `/admin/products` product CRUD surface
- `/admin/orders` order management
- `/admin/settings` compliance and business settings

## Next Implementation Passes

- Replace seed arrays with Supabase queries and mutations.
- Add Supabase Auth middleware for `/account` and `/admin`.
- Implement product image uploads to Supabase Storage.
- Connect product CRUD to server actions with audit logging.
- Persist cart sessions and checkout orders.
- Add Resend email templates.
- Add rate limiting around checkout and payment routes.
