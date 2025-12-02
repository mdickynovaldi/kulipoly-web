-- Alter blog_posts.content to JSONB for structured blocks
ALTER TABLE blog_posts
  ALTER COLUMN content SET DEFAULT '[]'::jsonb;

ALTER TABLE blog_posts
  ALTER COLUMN content TYPE JSONB
  USING COALESCE(
    CASE
      WHEN pg_typeof(content)::text = 'jsonb' THEN content::jsonb
      ELSE to_jsonb(content)
    END,
    '[]'::jsonb
  );
