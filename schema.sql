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


-- ========================================================================
-- Analytics and User Behavior Tracking Table
-- ========================================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR NOT NULL, -- 'page_view', 'click', 'time_spent', 'video_play', 'image_view'
  event_name VARCHAR, -- e.g., 'whatsapp_click', 'call_click', 'calculator_submit', image title, video title, or duration in seconds
  page_path VARCHAR NOT NULL, -- e.g., '/', '/contact', '/branches/jharkhand/ranchi'
  session_id VARCHAR NOT NULL, -- Unique per browser tab session (sessionStorage)
  referrer VARCHAR, -- Client referrer link
  device_type VARCHAR DEFAULT 'desktop', -- 'mobile', 'tablet', 'desktop'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for optimized dashboard analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics_events(session_id);


-- ========================================================================
-- Shipments Tracking Table
-- ========================================================================

CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_number VARCHAR UNIQUE NOT NULL,
  customer_name VARCHAR NOT NULL,
  customer_phone VARCHAR,
  origin VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  booking_date DATE DEFAULT CURRENT_DATE,
  current_status VARCHAR NOT NULL DEFAULT 'Booked', -- 'Booked', 'Packed', 'Dispatched', 'In Transit', 'Delivered'
  current_location VARCHAR,
  vehicle_number VARCHAR,
  driver_name VARCHAR,
  driver_phone VARCHAR,
  status_history JSONB DEFAULT '[]'::jsonb, -- e.g., [{"status": "Booked", "date": "2026-06-28", "location": "Dhanbad HQ", "notes": "Order booked."}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for fast search and tracking lookup
CREATE INDEX IF NOT EXISTS idx_shipments_cn ON shipments(consignment_number);


-- ========================================================================
-- Gallery Images Table
-- ========================================================================

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


-- ========================================================================
-- Site Custom Metadata (SEO Settings) Table
-- ========================================================================

CREATE TABLE IF NOT EXISTS site_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path VARCHAR UNIQUE NOT NULL,
  meta_title VARCHAR NOT NULL,
  meta_description VARCHAR NOT NULL,
  meta_keywords VARCHAR,
  is_noindex BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for fast path lookups
CREATE INDEX IF NOT EXISTS idx_site_metadata_path ON site_metadata(path);


-- Note on Row Level Security (RLS) policies:
-- ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE site_metadata ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow public read access to gallery_images" ON gallery_images
--   FOR SELECT TO anon, authenticated USING (true);
-- CREATE POLICY "Allow public read access to site_metadata" ON site_metadata
--   FOR SELECT TO anon, authenticated USING (true);
-- 
-- CREATE POLICY "Allow admin CRUD access to gallery_images" ON gallery_images
--   FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow admin CRUD access to site_metadata" ON site_metadata
--   FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

