import Link from "next/link";
import BlogComposer from "../blog-composer";

export const metadata = {
  title: "Blog Builder | Kulipoly Admin",
};

export default function BlogBuilderPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            Blog Builder
          </p>
          <h1 className="text-2xl font-bold text-white">Kelola konten blog</h1>
          <p className="text-white/50 text-sm mt-1">
            Susun data artikel, preview kartu, dan siapkan schema Supabase untuk
            API blog.
          </p>
        </div>
        <Link
          href="/dashboard/blog/manage"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/10">
          Lihat daftar artikel
        </Link>
      </div>

      <BlogComposer />

      {/* <BlogSqlEditor /> */}
    </div>
  );
}
