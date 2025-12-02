"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryStyles } from "@/app/blog/category-styles";
import type { BlogContentBlock, BlogPost } from "@/lib/types/blog";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useLocalizedBlogPost } from "@/lib/hooks/use-auto-translate";

type BlogDetailContentProps = {
  post: BlogPost;
};

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { t } = useTranslation();

  // Use auto-translated content based on current language
  const { data: localizedPost, isTranslating } = useLocalizedBlogPost(post);

  const renderTextBlock = (
    block: Extract<BlogContentBlock, { kind: "text" }>
  ) => (
    <div className="group relative">
      <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-orange-500 via-red-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <p className="text-lg leading-[1.9] text-white/85 md:text-xl md:leading-[1.9] font-light tracking-wide">
        {block.text}
      </p>
    </div>
  );

  const renderImageBlock = (
    block: Extract<BlogContentBlock, { kind: "image" }>
  ) => (
    <figure className="group relative overflow-hidden rounded-2xl">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-orange-500/30 via-transparent to-red-500/30 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={block.url}
            alt={block.alt || block.caption || "Blog image"}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {t.blogDetail.image}
          </div>
        </div>

        {(block.caption || block.alt) && (
          <div className="border-t border-white/5 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 px-5 py-4">
            <p className="flex items-center gap-3 text-sm text-white/70">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              {block.caption || block.alt}
            </p>
          </div>
        )}
      </div>
    </figure>
  );

  const renderVideoBlock = (
    block: Extract<BlogContentBlock, { kind: "video" }>
  ) => {
    const isYouTube =
      block.url.includes("youtube.com") || block.url.includes("youtu.be");
    const isVimeo = block.url.includes("vimeo.com");
    const isDirect = block.url.match(/\.(mp4|webm|mov)$/i);

    const getYouTubeEmbedUrl = (url: string) => {
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
      } else if (url.includes("embed/")) {
        return url;
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    if (isYouTube || isVimeo) {
      const embedUrl = isYouTube ? getYouTubeEmbedUrl(block.url) : block.url;

      return (
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-red-500/25">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {t.blogDetail.video}
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={block.caption || "Video"}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {block.caption && (
              <div className="border-t border-white/5 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 px-5 py-4">
                <p className="flex items-center gap-3 text-sm text-white/70">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  {block.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isDirect) {
      return (
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
            <video controls className="w-full" poster="">
              <source src={block.url} />
              {t.blogDetail.browserNotSupport}
            </video>

            {block.caption && (
              <div className="border-t border-white/5 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 px-5 py-4">
                <p className="text-sm text-white/70">{block.caption}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <a
        href={block.url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 p-5 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <div>
          <p className="font-semibold text-white group-hover:text-blue-300">
            {block.caption || t.blogDetail.watchVideo}
          </p>
          <p className="mt-1 text-sm text-white/50">
            {t.blogDetail.clickToOpen}
          </p>
        </div>
        <svg
          className="ml-auto h-5 w-5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  };

  const renderFileBlock = (
    block: Extract<BlogContentBlock, { kind: "file" }>
  ) => {
    const getFileIcon = () => {
      const url = block.url.toLowerCase();
      if (url.match(/\.(pdf)$/)) {
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      }
      if (url.match(/\.(doc|docx)$/)) {
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      }
      if (url.match(/\.(zip|rar|7z)$/)) {
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        );
      }
      return (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    };

    return (
      <a
        href={block.url}
        download
        className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 p-5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:scale-110">
          {getFileIcon()}
        </span>

        <div className="relative flex-1">
          <p className="font-semibold text-white transition-colors duration-300 group-hover:text-orange-300">
            {block.label || t.blogDetail.downloadFile}
          </p>
          {block.description && (
            <p className="mt-1 text-sm text-white/50">{block.description}</p>
          )}
        </div>

        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/50 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:text-orange-400">
          <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </a>
    );
  };

  const renderBlock = (block: BlogContentBlock) => {
    switch (block.kind) {
      case "text":
        return renderTextBlock(block);
      case "image":
        return renderImageBlock(block);
      case "video":
        return renderVideoBlock(block);
      case "file":
        return renderFileBlock(block);
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Translation indicator */}
      {isTranslating && (
        <div className="fixed top-24 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-md rounded-full border border-orange-500/30">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-orange-400">Translating...</span>
        </div>
      )}

      {/* Animated background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute left-[-20%] top-0 h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[150px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-red-600/15 blur-[140px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 lg:pt-36">
        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-orange-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {t.blogDetail.backToBlog}
          </Link>
        </nav>

        {/* Header */}
        <header className="mt-10 space-y-6">
          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg",
                categoryStyles[localizedPost.category]
              )}
            >
              {localizedPost.category}
            </span>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange-500 to-red-600" />
                {localizedPost.date}
              </span>
              <span className="text-white/30">•</span>
              <span>{localizedPost.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
              {localizedPost.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {localizedPost.subtitle}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative mt-12 overflow-hidden rounded-3xl">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500/30 via-transparent to-red-500/30 blur-sm" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-[2/1] w-full overflow-hidden">
              <Image
                src={localizedPost.thumbnail}
                alt={localizedPost.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/30">
            {t.blogDetail.articleContent}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Content */}
        <article className="mt-12 space-y-10">
          {localizedPost.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <svg
                  className="h-8 w-8 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-white/50">
                {t.blogDetail.noContent}
              </p>
              <p className="mt-1 text-sm text-white/30">
                {t.blogDetail.articleEmpty}
              </p>
            </div>
          ) : (
            localizedPost.content.map((block) => (
              <div
                key={block.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                {renderBlock(block)}
              </div>
            ))
          )}
        </article>

        {/* Footer */}
        <footer className="mt-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-white/70">
                {t.blogDetail.thankYou}
              </p>
              <p className="mt-1 text-xs text-white/40">
                {t.blogDetail.fromSupabase}
              </p>
            </div>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30"
            >
              {t.blogDetail.viewOtherArticles}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
