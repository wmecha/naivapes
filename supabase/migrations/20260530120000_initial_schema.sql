create extension if not exists pgcrypto;

create type order_status as enum (
  'pending_payment',
  'paid',
  'age_review_required',
  'processing',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'refund_requested',
  'refunded',
  'failed'
);

create type verification_status as enum ('unverified', 'pending', 'approved', 'rejected');

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table flavour_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  family text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  brand_id uuid references brands(id),
  flavour_profile_id uuid references flavour_profiles(id),
  name text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  low_stock_threshold integer not null default 5,
  nicotine_strength text,
  device_type text,
  puff_count text,
  battery_capacity text,
  pod_capacity text,
  compatibility text,
  warnings text[] not null default '{}',
  whats_in_box text[] not null default '{}',
  published boolean not null default false,
  featured boolean not null default false,
  best_seller boolean not null default false,
  new_arrival boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text not null unique,
  phone text,
  date_of_birth date,
  verification_status verification_status not null default 'unverified',
  risk_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  label text,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  delivery_zone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references customers(id),
  status order_status not null default 'pending_payment',
  subtotal integer not null default 0,
  delivery_fee integer not null default 0,
  discount_total integer not null default 0,
  total integer not null default 0,
  delivery_address jsonb not null default '{}',
  delivery_rider text,
  internal_notes text,
  age_review_required boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  total integer not null check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  provider text not null default 'paystack',
  provider_reference text unique,
  status text not null default 'pending',
  amount integer not null,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table paystack_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  reference text,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table age_verifications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  order_id uuid references orders(id),
  full_legal_name text not null,
  date_of_birth date not null,
  phone text,
  email text,
  id_number text,
  status verification_status not null default 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage', 'fixed', 'free_delivery')),
  value integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer,
  product_restrictions uuid[] default '{}',
  category_restrictions uuid[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table cart_sessions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  session_key text not null unique,
  items jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table wishlist_items (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, product_id)
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  product_id uuid references products(id),
  rating integer check (rating between 1 and 5),
  body text,
  moderated boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  role text not null default 'staff',
  permissions text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references admin_users(id),
  action text not null,
  table_name text,
  record_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  admin_editable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  body text,
  data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table delivery_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  fee integer not null default 0,
  eta text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  movement_type text not null check (movement_type in ('stock_in', 'stock_out', 'manual_adjustment', 'damaged', 'returned')),
  quantity integer not null,
  supplier text,
  cost_price integer,
  selling_price integer,
  margin integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_idx on products(category_id);
create index products_brand_idx on products(brand_id);
create index products_stock_idx on products(stock);
create index orders_status_idx on orders(status);
create index orders_customer_idx on orders(customer_id);
create index payments_reference_idx on payments(provider_reference);
create index paystack_events_reference_idx on paystack_events(reference);
create index audit_logs_record_idx on audit_logs(table_name, record_id);

alter table categories enable row level security;
alter table brands enable row level security;
alter table flavour_profiles enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table customers enable row level security;
alter table customer_addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table paystack_events enable row level security;
alter table age_verifications enable row level security;
alter table discount_codes enable row level security;
alter table cart_sessions enable row level security;
alter table wishlist_items enable row level security;
alter table reviews enable row level security;
alter table admin_users enable row level security;
alter table audit_logs enable row level security;
alter table site_settings enable row level security;
alter table content_blocks enable row level security;
alter table delivery_zones enable row level security;
alter table inventory_movements enable row level security;

create policy "Public can read published products" on products for select using (published = true and deleted_at is null);
create policy "Public can read product images" on product_images for select using (deleted_at is null);
create policy "Public can read catalogue taxonomies" on categories for select using (deleted_at is null);
create policy "Public can read brands" on brands for select using (deleted_at is null);
create policy "Public can read flavour profiles" on flavour_profiles for select using (deleted_at is null);
create policy "Public can read active delivery zones" on delivery_zones for select using (active = true and deleted_at is null);
create policy "Public can read site settings" on site_settings for select using (true);
create policy "Customers read own profile" on customers for select using (auth.uid() = auth_user_id);
create policy "Customers read own orders" on orders for select using (customer_id in (select id from customers where auth_user_id = auth.uid()));

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from admin_users
    where auth_user_id = auth.uid()
      and deleted_at is null
  );
$$;

create policy "Admins manage categories" on categories for all using (is_admin()) with check (is_admin());
create policy "Admins manage brands" on brands for all using (is_admin()) with check (is_admin());
create policy "Admins manage flavours" on flavour_profiles for all using (is_admin()) with check (is_admin());
create policy "Admins manage products" on products for all using (is_admin()) with check (is_admin());
create policy "Admins manage product images" on product_images for all using (is_admin()) with check (is_admin());
create policy "Admins manage customers" on customers for all using (is_admin()) with check (is_admin());
create policy "Admins manage orders" on orders for all using (is_admin()) with check (is_admin());
create policy "Admins manage settings" on site_settings for all using (is_admin()) with check (is_admin());
create policy "Admins manage audit logs" on audit_logs for all using (is_admin()) with check (is_admin());

insert into site_settings (key, value) values
  ('checkout_enabled', 'true'),
  ('paystack_enabled', 'false'),
  ('catalogue_only', 'false'),
  ('warning_text', '"Adult-only nicotine products. Sale is restricted to verified adults aged 18 and above."'),
  ('age_gate_text', '"This site is intended for adults aged 18 and above."');
