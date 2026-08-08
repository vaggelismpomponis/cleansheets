-- ============================================================
-- Ephtopia Cleans — Jobs / Careers
-- Run this in Supabase Dashboard → Database → SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- JOBS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT        NOT NULL,
  description      TEXT        NOT NULL,  -- Full markdown description
  location         TEXT        NOT NULL,  -- e.g. 'Αθήνα', 'Θεσσαλονίκη'
  employment_type  TEXT        NOT NULL CHECK (employment_type IN ('full-time', 'part-time', 'contract')),
  department       TEXT        NOT NULL,  -- e.g. 'Καθαρισμός', 'Διοίκηση'
  salary_range     TEXT,                  -- Optional e.g. '€800 - €1.200/μήνα'
  requirements     JSONB       NOT NULL DEFAULT '[]',   -- Array of strings
  responsibilities JSONB       NOT NULL DEFAULT '[]',   -- Array of strings
  benefits         JSONB       NOT NULL DEFAULT '[]',   -- Array of strings
  contact_email    TEXT        NOT NULL,
  deadline         DATE,                  -- NULL = no deadline
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  created_by       UUID        REFERENCES auth.users(id)
);

-- ──────────────────────────────────────────────────────────────
-- JOB APPLICATIONS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id       UUID        NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name    TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT        NOT NULL,
  cv_url       TEXT,                  -- Supabase Storage URL
  cover_letter TEXT,                  -- Optional message
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- ──────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at on jobs
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_jobs_updated_at();

-- ──────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY — jobs
-- ──────────────────────────────────────────────────────────────
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Public can read only active jobs
CREATE POLICY "Public can read active jobs"
  ON jobs FOR SELECT
  USING (is_active = true);

-- Authenticated admins can read all jobs (including inactive)
CREATE POLICY "Admin can read all jobs"
  ON jobs FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admins can insert/update/delete
CREATE POLICY "Admin can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update jobs"
  ON jobs FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete jobs"
  ON jobs FOR DELETE
  USING (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY — job_applications
-- ──────────────────────────────────────────────────────────────
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application
CREATE POLICY "Public can insert applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can read applications
CREATE POLICY "Admin can read applications"
  ON job_applications FOR SELECT
  USING (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────────────────────
-- STORAGE: Create bucket for CV uploads
-- Run this separately in the Supabase Dashboard:
--   Storage → New Bucket → Name: "job-applications"
--   Set to: Private
--
-- Then add storage policies in Dashboard → Storage → Policies:
--
-- INSERT policy:
--   Policy Name: "Anyone can upload CVs"
--   Operations: INSERT
--   Definition: true
--
-- SELECT policy:
--   Policy Name: "Admins can view CVs"
--   Operations: SELECT
--   Definition: auth.role() = 'authenticated'
-- ──────────────────────────────────────────────────────────────
