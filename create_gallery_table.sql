-- SQL script to initialize gallery_images table in Supabase
-- Execute this SQL script in your Supabase SQL Editor (https://supabase.com)

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for optimized sorted queries
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_images(display_order ASC, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 1. Read Policy: Allow anyone (including public visitors) to read gallery images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gallery_images' AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON gallery_images
      FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

-- 2. Write Policy: Allow full administrative CRUD operations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gallery_images' AND policyname = 'Allow admin CRUD access'
  ) THEN
    CREATE POLICY "Allow admin CRUD access" ON gallery_images
      FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
