-- Create portfolio table for Kulipoly projects
-- Run this SQL in Supabase SQL Editor

-- Create enum type for project tags
CREATE TYPE project_tag AS ENUM ('VR', 'AR', 'Web', '3D');

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  company_logo TEXT,
  company_name TEXT NOT NULL,
  tags project_tag[] NOT NULL DEFAULT '{}',
  -- Detail fields
  year TEXT NOT NULL,
  duration TEXT NOT NULL,
  role TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  -- Testimonial (nullable, stored as JSONB)
  testimonial JSONB,
  -- Metrics (nullable, stored as JSONB array)
  metrics JSONB,
  -- Metadata
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_published ON portfolios(is_published);
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at DESC);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read published portfolios
CREATE POLICY "Public can read published portfolios"
  ON portfolios
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can do everything (admin)
CREATE POLICY "Authenticated users can manage portfolios"
  ON portfolios
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for portfolio images (run separately in Storage settings)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policy for public read
-- CREATE POLICY "Public can view portfolio images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'portfolio');

-- Storage policy for authenticated upload
-- CREATE POLICY "Authenticated can upload portfolio images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

