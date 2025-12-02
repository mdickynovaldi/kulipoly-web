-- Blog posts table for Kulipoly
-- Run this SQL in Supabase SQL Editor

-- Create enum safely (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'blog_category') THEN
    CREATE TYPE blog_category AS ENUM ('Insight', 'Case Study', 'Update', 'Guide');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'blog_category'::regtype AND enumlabel = 'Insight') THEN
    ALTER TYPE blog_category ADD VALUE 'Insight';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'blog_category'::regtype AND enumlabel = 'Case Study') THEN
    ALTER TYPE blog_category ADD VALUE 'Case Study';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'blog_category'::regtype AND enumlabel = 'Update') THEN
    ALTER TYPE blog_category ADD VALUE 'Update';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'blog_category'::regtype AND enumlabel = 'Guide') THEN
    ALTER TYPE blog_category ADD VALUE 'Guide';
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  date TEXT NOT NULL,
  category blog_category NOT NULL,
  thumbnail TEXT NOT NULL,
  reading_time TEXT NOT NULL DEFAULT '5 menit baca',
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();
