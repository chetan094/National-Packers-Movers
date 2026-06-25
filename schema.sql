-- SQL Schema for National Packers & Movers Blog Engine
-- Execute this SQL script in your Supabase SQL Editor (https://supabase.com)

CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for high-performance slug lookup (used by public editorial page)
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Note on Row Level Security (RLS):
-- If you want to enable RLS to secure direct client-side requests, execute the following:
-- ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
-- 
-- -- 1. Allow anyone (including anonymous guests) to read blogs:
-- CREATE POLICY "Allow public read access" ON blogs
--   FOR SELECT TO anon, authenticated USING (true);
-- 
-- -- 2. Since our Next.js backend handles admin password validation and calls Supabase from the server using the anon key,
-- -- you can allow CRUD operations under RLS by enabling it for anon/authenticated roles, or bypass RLS by using the Service Role Key.
-- -- For simplicity and direct backend-to-Supabase REST integration:
-- CREATE POLICY "Allow admin CRUD access" ON blogs
--   FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);


-- ========================================================================
-- Leads Capture and CRM Tables
-- ========================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  email VARCHAR,
  from_city VARCHAR,
  to_city VARCHAR,
  moving_date VARCHAR, -- Using VARCHAR to handle different browser date formats safely
  move_type VARCHAR,
  notes TEXT,
  inventory TEXT,
  matched_vehicle VARCHAR,
  total_cft INTEGER DEFAULT 0,
  source VARCHAR NOT NULL, -- e.g., 'Quote Wizard', 'Calculator Modal', 'Contact Page', 'Testimonials Page'
  status VARCHAR NOT NULL DEFAULT 'New', -- 'New', 'In Progress', 'Completed', 'Cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for fast search and CRM dashboard loading
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_name ON leads(name);

