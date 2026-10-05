-- Neon PostgreSQL Schema for BABA TEE GLOBAL Gadget Store
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  condition TEXT NOT NULL, -- 'brand_new', 'uk_used_a_plus', 'uk_used_a'
  condition_label TEXT NOT NULL,
  price_ngn NUMERIC NOT NULL,
  original_price_ngn NUMERIC,
  storage TEXT NOT NULL, -- '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'
  ram TEXT,
  processor TEXT,
  battery_health INT, -- 85 to 100
  colors JSONB,
  color_hexes JSONB,
  image_url TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_hero BOOLEAN DEFAULT false,
  warranty TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_state TEXT NOT NULL,
  items JSONB NOT NULL,
  total_price_ngn NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
