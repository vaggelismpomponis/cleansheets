-- ============================================================
-- Ephtopia Cleans — CMS Database Schema
-- Run this in the Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Main content table — stores all editable site content as key-value pairs
CREATE TABLE IF NOT EXISTS site_content (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  section     TEXT        NOT NULL,  -- e.g. 'hero', 'pricing', 'faq'
  content_key TEXT        NOT NULL,  -- e.g. 'headline', 'subheadline', 'items'
  content_value TEXT      NOT NULL,  -- The actual text / JSON value
  content_type TEXT        DEFAULT 'text', -- 'text' | 'json'
  updated_at  TIMESTAMPTZ DEFAULT now(),
  updated_by  UUID        REFERENCES auth.users(id),
  UNIQUE(section, content_key)
);

-- Update the updated_at timestamp on every change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content (needed for public site)
CREATE POLICY "Public can read site_content"
  ON site_content FOR SELECT
  USING (true);

-- Only authenticated users (the admin) can insert/update/delete
CREATE POLICY "Admin can insert site_content"
  ON site_content FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update site_content"
  ON site_content FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete site_content"
  ON site_content FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- Instructions
-- ============================================================
-- 1. Run this SQL in Supabase Dashboard → Database → SQL Editor
-- 2. Go to Authentication → Users → Add User and create your admin account
-- 3. Copy your Project URL and API keys to .env.local
-- 4. The site will use static defaults from lib/content.ts until
--    you make edits in the /admin dashboard
