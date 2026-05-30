insert into categories (name, slug) values
  ('Devices', 'devices'),
  ('Pods', 'pods'),
  ('Disposables', 'disposables'),
  ('E-liquids', 'e-liquids'),
  ('Accessories', 'accessories')
on conflict (slug) do nothing;

insert into brands (name, slug) values
  ('NaiVapes Select', 'naivapes-select'),
  ('Metro Labs', 'metro-labs'),
  ('Noir', 'noir'),
  ('Archive', 'archive')
on conflict (slug) do nothing;

insert into flavour_profiles (name, family) values
  ('Mint', 'Mint'),
  ('Ice', 'Ice'),
  ('Berry', 'Berry'),
  ('Device', 'Device')
on conflict (name) do nothing;

insert into delivery_zones (name, fee, eta) values
  ('Nairobi CBD', 250, 'Same day'),
  ('Westlands / Kilimani', 350, 'Same day'),
  ('Karen / Runda', 500, 'Next day available')
on conflict (name) do nothing;

insert into content_blocks (key, title, body, data) values
  ('home_hero', 'NaiVapes', 'Premium adult-only vape catalogue and checkout for verified customers.', '{}'),
  ('announcement_bar', 'Adult-only store', 'Products are restricted to verified adults aged 18 and above.', '{}')
on conflict (key) do nothing;
