-- Add is_premier column for featured portfolio on homepage
-- Run this SQL in Supabase SQL Editor

-- Add is_premier column (default false)
ALTER TABLE portfolios 
ADD COLUMN IF NOT EXISTS is_premier BOOLEAN DEFAULT false;

-- Create index for faster queries on premier portfolios
CREATE INDEX IF NOT EXISTS idx_portfolios_is_premier ON portfolios(is_premier);

-- Update RLS policy to include is_premier in select for public
-- (already covered by existing "Public can read published portfolios" policy)

