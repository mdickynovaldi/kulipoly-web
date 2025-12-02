-- Migration: Add translation fields for multi-language support (Hybrid approach)
-- Run this SQL in Supabase SQL Editor

-- =============================================
-- PORTFOLIO TABLE - Add English translation fields
-- =============================================

-- Add English translation columns to portfolios
ALTER TABLE portfolios
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS role_en TEXT,
ADD COLUMN IF NOT EXISTS challenge_en TEXT,
ADD COLUMN IF NOT EXISTS solution_en TEXT,
ADD COLUMN IF NOT EXISTS results_en TEXT[],
ADD COLUMN IF NOT EXISTS testimonial_en JSONB;

-- Add comments for documentation
COMMENT ON COLUMN portfolios.title_en IS 'English translation of title (auto-generated or manual override)';
COMMENT ON COLUMN portfolios.description_en IS 'English translation of description';
COMMENT ON COLUMN portfolios.role_en IS 'English translation of role';
COMMENT ON COLUMN portfolios.challenge_en IS 'English translation of challenge';
COMMENT ON COLUMN portfolios.solution_en IS 'English translation of solution';
COMMENT ON COLUMN portfolios.results_en IS 'English translation of results array';
COMMENT ON COLUMN portfolios.testimonial_en IS 'English translation of testimonial';

-- =============================================
-- BLOG POSTS TABLE - Add English translation fields
-- =============================================

-- Add English translation columns to blog_posts
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS subtitle_en TEXT,
ADD COLUMN IF NOT EXISTS content_en JSONB;

-- Add comments for documentation
COMMENT ON COLUMN blog_posts.title_en IS 'English translation of title (auto-generated or manual override)';
COMMENT ON COLUMN blog_posts.subtitle_en IS 'English translation of subtitle';
COMMENT ON COLUMN blog_posts.content_en IS 'English translation of content blocks';

-- =============================================
-- Note: Default values are NULL, meaning translations
-- will be auto-generated on first request if not set.
-- Admin can manually override any translation.
-- =============================================

