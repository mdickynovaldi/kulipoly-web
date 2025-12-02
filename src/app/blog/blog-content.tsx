"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryStyles } from "@/app/blog/category-styles";
import { cn } from "@/lib/utils";
import { useTranslation, useLanguage } from "@/lib/i18n";
import type { BlogPost } from "@/lib/types/blog";
import { getLocalizedBlogPost } from "@/lib/types/blog";

type BlogContentProps = {
  blogPosts: BlogPost[];
};

export default function BlogContent({ blogPosts }: BlogContentProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange-500/30 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-red-600/20 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pb-28">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
              {t.blog.badge}
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {t.blog.title}
            </h1>
            <p className="max-w-3xl text-sm text-white/60 md:text-base">
              {t.blog.description}
            </p>
          </div>
          <div className="hidden items-center gap-3 text-sm text-white/60 lg:flex">
            <span className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-red-600" />
            <span>{t.blog.performanceDriven}</span>
          </div>
        </header>

        {blogPosts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/60">
            {t.blog.noArticles}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => {
              // Get localized content based on current language
              const localizedPost = getLocalizedBlogPost(post, language);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-950/90 to-zinc-900/70 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:-translate-y-2"
                >
                  <article className="relative">
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={localizedPost.thumbnail}
                        alt={localizedPost.title}
                        fill
                        className="h-full w-full bg-gradient-to-br from-orange-500/10 via-red-500/10 to-black object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        priority={false}
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/30 to-transparent"
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                          categoryStyles[localizedPost.category]
                        )}
                      >
                        {localizedPost.category}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 p-5">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_0_6px_rgba(229,57,26,0.14)]" />
                        <span>{localizedPost.date}</span>
                      </div>

                      <h2 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-orange-400">
                        {localizedPost.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-white/60">
                        {localizedPost.subtitle}
                      </p>

                      <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
                        <span>{t.blog.readArticle}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <div
                      className="absolute inset-x-10 top-[38%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      aria-hidden
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
