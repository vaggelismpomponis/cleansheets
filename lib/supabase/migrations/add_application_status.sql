-- Add status column to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new' 
CHECK (status IN ('new', 'viewed', 'rejected', 'hired'));

-- Policy for updating applications (admin only)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admin can update applications' AND tablename = 'job_applications'
  ) THEN
    CREATE POLICY "Admin can update applications"
      ON job_applications FOR UPDATE
      USING (auth.role() = 'authenticated');
  END IF;
END $$;
