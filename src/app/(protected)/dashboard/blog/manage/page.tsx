import Link from "next/link";
import DeleteBlogButton from "./delete-blog-button";
import { getAllBlogPosts } from "@/lib/data/blog";

export const dynamic = "force-dynamic";

export default async function BlogManagePage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            Blog Posts
          </p>
          <h1 className="text-2xl font-bold text-white">Kelola artikel</h1>
          <p className="text-white/50 text-sm mt-1">
            Edit, publish/draft, atau hapus artikel yang sudah ada.
          </p>
        </div>
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_-8px_rgba(234,88,12,0.8)] hover:shadow-[0_0_25px_-8px_rgba(234,88,12,1)]"
        >
          + Artikel baru
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          <div className="col-span-4">Judul</div>
          <div className="col-span-2">Kategori</div>
          <div className="col-span-2">Tanggal</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        <div className="divide-y divide-white/5">
          {posts.length === 0 ? (
            <div className="p-6 text-white/60 text-center">
              Belum ada artikel. Buat di Blog Builder.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-12 items-center px-4 py-3 text-sm text-white/80"
              >
                <div className="col-span-4">
                  <div className="font-semibold text-white">{post.title}</div>
                  <div className="text-white/50 text-xs">{post.subtitle}</div>
                </div>
                <div className="col-span-2">{post.category}</div>
                <div className="col-span-2 text-white/60">{post.date}</div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      post.isPublished
                        ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/20"
                        : "bg-yellow-500/15 text-yellow-200 border border-yellow-500/20"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-3 text-xs">
                  <Link
                    href={`/dashboard/blog/${post.id}`}
                    className="text-orange-300 hover:text-orange-200"
                  >
                    Edit
                  </Link>
                  <DeleteBlogButton id={post.id} />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-white/50 hover:text-white"
                    target="_blank"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
