-- ============================================================
-- Ephtopia Cleans — Content Change Log
-- Run this in the Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Audit log: every save / reset action by any admin
CREATE TABLE IF NOT EXISTS content_change_log (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  changed_at       TIMESTAMPTZ DEFAULT now(),
  changed_by       UUID        REFERENCES auth.users(id),
  changed_by_email TEXT,          -- denormalized for display; avoids extra joins
  section          TEXT        NOT NULL,
  content_key      TEXT        NOT NULL,
  action           TEXT        NOT NULL CHECK (action IN ('save', 'reset')),
  old_value        TEXT,          -- NULL on first-ever write
  new_value        TEXT           -- NULL on reset
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE content_change_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can read the log
CREATE POLICY "Authenticated can read change log"
  ON content_change_log FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admins can insert rows
CREATE POLICY "Authenticated can insert change log"
  ON content_change_log FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- No updates or deletes allowed (immutable audit trail)
