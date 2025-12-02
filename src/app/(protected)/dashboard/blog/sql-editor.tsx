"use client";

import { useState } from "react";

const defaultSql = `-- Create enum for blog categories (idempotent)
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

-- Create blog table with JSONB content blocks
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Row Level Security
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

-- updated_at trigger
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
`;

const sampleInsert = `-- Sample insert for testing
INSERT INTO blog_posts (
  slug, title, subtitle, date, category, thumbnail, reading_time, content, is_published
) VALUES (
  'pipeline-3d-efisien',
  'Menyusun Pipeline 3D yang Efisien untuk Web & Mobile',
  'Bagaimana kami menjaga detail visual tanpa mengorbankan performa.',
  '12 Feb 2024',
  'Insight',
  '/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png',
  '6 menit baca',
  '[
    {"id":"1","kind":"text","text":"Kami memulai pipeline dengan audit target device..."},
    {"id":"2","kind":"image","url":"https://placehold.co/800x450","caption":"Contoh render"},
    {"id":"3","kind":"file","url":"https://example.com/checklist.pdf","label":"Unduh checklist"}
  ]'::jsonb,
  true
);`;

export default function BlogSqlEditor() {
  const [schemaSql, setSchemaSql] = useState(defaultSql);
  const [insertSql, setInsertSql] = useState(sampleInsert);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error(error);
      setCopyState("error");
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            Supabase SQL
          </p>
          <h2 className="text-lg font-semibold text-white">SQL editor untuk API blog</h2>
          <p className="text-white/50 text-sm">
            Copy-paste ke SQL Editor Supabase untuk bikin tabel, RLS, dan trigger API blog.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-red-600" />
          <span>Public read, auth manage</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Schema & RLS</span>
            <button
              type="button"
              onClick={() => copyText(schemaSql)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:border-white/20 hover:bg-white/10 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy schema
            </button>
          </div>
          <textarea
            value={schemaSql}
            onChange={(e) => setSchemaSql(e.target.value)}
            rows={22}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/80 font-mono leading-relaxed placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Sample insert</span>
            <button
              type="button"
              onClick={() => copyText(insertSql)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:border-white/20 hover:bg-white/10 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy sample
            </button>
          </div>
          <textarea
            value={insertSql}
            onChange={(e) => setInsertSql(e.target.value)}
            rows={22}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/80 font-mono leading-relaxed placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
          />
        </div>
      </div>

      {copyState === "copied" && (
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied to clipboard
        </div>
      )}
      {copyState === "error" && (
        <div className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300">
          Gagal menyalin, cek permission clipboard.
        </div>
      )}
    </div>
  );
}
