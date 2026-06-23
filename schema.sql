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
