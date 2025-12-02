"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import Image from "next/image";
import type {
  BlogCategory,
  BlogContentBlock,
  BlogContentKind,
  BlogPost,
} from "@/lib/types/blog";
import { cn } from "@/lib/utils";

const categoryOptions: { value: BlogCategory; blurb: string }[] = [
  { value: "Insight", blurb: "Opini dan cara pikir tim." },
  { value: "Case Study", blurb: "Ringkasan project yang sudah selesai." },
  { value: "Update", blurb: "Rilis fitur atau asset terbaru." },
  { value: "Guide", blurb: "How-to atau best practice." },
];

const fallbackThumbnail = "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png";

const categoryColors: Record<BlogCategory, string> = {
  Insight:
    "from-orange-500/20 to-red-500/20 text-orange-200 border-orange-500/20",
  "Case Study":
    "from-emerald-500/20 to-teal-500/20 text-emerald-200 border-emerald-500/20",
  Update: "from-blue-500/20 to-cyan-500/20 text-blue-200 border-blue-500/20",
  Guide:
    "from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/20",
};

type Props = {
  post?: BlogPost | null;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

function formatDefaultDate(): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function createBlock(kind: BlogContentKind, id?: string): BlogContentBlock {
  const baseId = id ?? randomId();
  switch (kind) {
    case "text":
      return { id: baseId, kind: "text", text: "" };
    case "image":
      return { id: baseId, kind: "image", url: "", caption: "", alt: "" };
    case "video":
      return { id: baseId, kind: "video", url: "", caption: "" };
    case "file":
      return {
        id: baseId,
        kind: "file",
        url: "",
        label: "Download",
        description: "",
      };
  }
}

function sanitizeBlocks(blocks: BlogContentBlock[]): BlogContentBlock[] {
  return blocks
    .map((block) => {
      switch (block.kind) {
        case "text": {
          const text = block.text.trim();
          if (!text) return null;
          return { ...block, text };
        }
        case "image": {
          const url = block.url.trim();
          if (!url) return null;
          return {
            ...block,
            url,
            caption: block.caption?.trim() || undefined,
            alt: block.alt?.trim() || undefined,
          };
        }
        case "video": {
          const url = block.url.trim();
          if (!url) return null;
          return { ...block, url, caption: block.caption?.trim() || undefined };
        }
        case "file": {
          const url = block.url.trim();
          const label = block.label.trim() || "Download";
          if (!url) return null;
          return {
            ...block,
            url,
            label,
            description: block.description?.trim() || undefined,
          };
        }
        default:
          return null;
      }
    })
    .filter(Boolean) as BlogContentBlock[];
}

export default function BlogComposer({ post }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [subtitle, setSubtitle] = useState(post?.subtitle ?? "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail ?? "");
  const [date, setDate] = useState(post?.date ?? formatDefaultDate());
  const [category, setCategory] = useState<BlogCategory>(
    post?.category ?? "Insight"
  );
  const [readingTime, setReadingTime] = useState(
    post?.readingTime ?? "5 menit baca"
  );
  const [content, setContent] = useState<BlogContentBlock[]>(
    post?.content?.length ? post.content : [createBlock("text")]
  );
  const [isPublished, setIsPublished] = useState(post?.isPublished ?? true);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const resolvedSlug = slug.trim() ? slugify(slug) : slugify(title);
  const cleanedBlocks = sanitizeBlocks(content);
  const textOnly = cleanedBlocks
    .filter((b) => b.kind === "text")
    .map((b) => (b as { text: string }).text)
    .join(" ");
  const totalWords = textOnly.split(/\s+/).filter(Boolean).length;
  const suggestedReadingTime = `${Math.max(
    1,
    Math.round(totalWords / 170)
  )} menit baca`;
  const readingTimeToUse = readingTime.trim() || suggestedReadingTime;
  const thumbnailToUse = thumbnail.trim() || fallbackThumbnail;
  const mode = post ? "edit" : "create";

  const snippet = useMemo(() => {
    const payload = {
      slug: resolvedSlug || "judul-artikel",
      title: title || "Judul artikel baru",
      subtitle: subtitle || "Subjudul singkat untuk menjelaskan konteks",
      date,
      category,
      thumbnail: thumbnailToUse,
      readingTime: readingTimeToUse,
      content: cleanedBlocks.length
        ? cleanedBlocks
        : [createBlock("text", "sample-text")],
      isPublished,
    };
    return JSON.stringify(payload, null, 2);
  }, [
    category,
    cleanedBlocks,
    date,
    readingTimeToUse,
    resolvedSlug,
    subtitle,
    thumbnailToUse,
    title,
    isPublished,
  ]);

  const updateBlock = (id: string, data: Partial<BlogContentBlock>) => {
    setContent(
      (prev) =>
        prev.map((block) =>
          block.id === id ? { ...block, ...data } : block
        ) as BlogContentBlock[]
    );
  };

  const changeKind = (id: string, kind: BlogContentKind) => {
    setContent((prev) =>
      prev.map((block) =>
        block.id === id ? createBlock(kind, block.id) : block
      )
    );
  };

  const addBlock = (kind: BlogContentKind) => {
    setContent((prev) => [...prev, createBlock(kind)]);
  };

  const removeBlock = (id: string) => {
    setContent((prev) =>
      prev.length === 1 ? prev : prev.filter((b) => b.id !== id)
    );
  };

  const moveBlock = (fromId: string, toId: string) => {
    setContent((prev) => {
      const from = prev.findIndex((b) => b.id === fromId);
      const to = prev.findIndex((b) => b.id === toId);
      if (from === -1 || to === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Judul wajib diisi.");
      return;
    }
    if (!resolvedSlug) {
      setError("Slug wajib diisi.");
      return;
    }
    if (cleanedBlocks.length === 0) {
      setError("Minimal satu blok konten (teks/gambar/video/file).");
      return;
    }

    const payload = {
      slug: resolvedSlug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      date: date.trim(),
      category,
      thumbnail: thumbnailToUse,
      readingTime: readingTimeToUse,
      content: cleanedBlocks,
      isPublished,
    };

    startTransition(async () => {
      const result = post
        ? await updateBlogPost(post.id, payload)
        : await createBlogPost(payload);

      if (!result.success) {
        setError(result.error ?? "Gagal menyimpan ke Supabase");
        return;
      }
      setSuccess(
        `Blog berhasil ${post ? "diperbarui" : "disimpan"} ke Supabase.`
      );
      router.refresh();
    });
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setSubtitle("");
    setThumbnail("");
    setDate(formatDefaultDate());
    setCategory("Insight");
    setReadingTime("5 menit baca");
    setContent([createBlock("text")]);
    setCopyState("idle");
    setIsPublished(true);
    setError(null);
    setSuccess(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error(error);
      setCopyState("error");
    }
  };

  const renderBlockEditor = (block: BlogContentBlock, index: number) => {
    return (
      <div
        key={block.id}
        draggable
        onDragStart={() => setDraggingId(block.id)}
        onDragEnter={() => {
          if (draggingId && draggingId !== block.id) {
            moveBlock(draggingId, block.id);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={() => setDraggingId(null)}
        className={cn(
          "rounded-xl border border-white/10 bg-white/5 p-3 space-y-3",
          draggingId === block.id ? "border-orange-500/50 bg-orange-500/5" : ""
        )}>
        <div className="flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white/70">
              {index + 1}
            </span>
            <span className="font-semibold uppercase tracking-[0.18em]">
              {block.kind}
            </span>
            <button
              type="button"
              onClick={() => changeKind(block.id, "text")}
              className={cn(
                "rounded-lg px-3 py-1 border text-[11px]",
                block.kind === "text"
                  ? "border-orange-500/50 text-orange-300 bg-orange-500/10"
                  : "border-white/10 text-white/60 hover:border-white/20"
              )}>
              Text
            </button>
            <button
              type="button"
              onClick={() => changeKind(block.id, "image")}
              className={cn(
                "rounded-lg px-3 py-1 border text-[11px]",
                block.kind === "image"
                  ? "border-emerald-500/50 text-emerald-200 bg-emerald-500/10"
                  : "border-white/10 text-white/60 hover:border-white/20"
              )}>
              Image
            </button>
            <button
              type="button"
              onClick={() => changeKind(block.id, "video")}
              className={cn(
                "rounded-lg px-3 py-1 border text-[11px]",
                block.kind === "video"
                  ? "border-blue-500/50 text-blue-200 bg-blue-500/10"
                  : "border-white/10 text-white/60 hover:border-white/20"
              )}>
              Video
            </button>
            <button
              type="button"
              onClick={() => changeKind(block.id, "file")}
              className={cn(
                "rounded-lg px-3 py-1 border text-[11px]",
                block.kind === "file"
                  ? "border-purple-500/50 text-purple-200 bg-purple-500/10"
                  : "border-white/10 text-white/60 hover:border-white/20"
              )}>
              File
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40">Drag untuk urutkan</span>
            {content.length > 1 && (
              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="text-red-400 hover:text-red-300">
                Hapus
              </button>
            )}
          </div>
        </div>

        {block.kind === "text" && (
          <textarea
            value={block.text}
            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
            rows={4}
            placeholder="Tuliskan paragraf di sini..."
            className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40 resize-none"
          />
        )}

        {block.kind === "image" && (
          <div className="space-y-3">
            <input
              value={block.url}
              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={block.caption || ""}
                onChange={(e) =>
                  updateBlock(block.id, { caption: e.target.value })
                }
                placeholder="Caption (opsional)"
                className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
              <input
                value={block.alt || ""}
                onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                placeholder="Alt text (opsional)"
                className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
            </div>
          </div>
        )}

        {block.kind === "video" && (
          <div className="space-y-3">
            <input
              value={block.url}
              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
              placeholder="YouTube/Vimeo/mp4 URL"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            <input
              value={block.caption || ""}
              onChange={(e) =>
                updateBlock(block.id, { caption: e.target.value })
              }
              placeholder="Caption (opsional)"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
          </div>
        )}

        {block.kind === "file" && (
          <div className="space-y-3">
            <input
              value={block.label}
              onChange={(e) => updateBlock(block.id, { label: e.target.value })}
              placeholder="Label tombol download"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            <input
              value={block.url}
              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
              placeholder="URL file"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            <input
              value={block.description || ""}
              onChange={(e) =>
                updateBlock(block.id, { description: e.target.value })
              }
              placeholder="Deskripsi singkat (opsional)"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            Blog Builder
          </p>
          <h2 className="text-xl font-semibold text-white">
            {mode === "edit" ? "Edit blog" : "Input blog baru"}
          </h2>
          <p className="text-white/50 text-sm">
            Susun data blog, kirim ke Supabase, dan atur urutan blok konten
            (teks, gambar, video, file).
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.16)]" />
          Data dikirim ke Supabase
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Judul <span className="text-red-400">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="Contoh: Pipeline 3D untuk Web & Mobile"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="pipeline-3d-untuk-web-mobile"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
              <p className="text-xs text-white/40">
                Kosongkan untuk auto-slug dari judul.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Subjudul
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={2}
              placeholder="Satu kalimat singkat yang merangkum cerita."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Tanggal
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
              <p className="text-xs text-white/40">
                Format bebas, contoh: 12 Feb 2024.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Kategori
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCategory(option.value)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-all",
                      category === option.value
                        ? "border-orange-500/50 bg-orange-500/10 text-white shadow-[0_10px_30px_-15px_rgba(234,88,12,0.7)]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                    )}>
                    <p className="text-sm font-semibold">{option.value}</p>
                    <p className="text-[11px] text-white/50">{option.blurb}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Reading Time
              </label>
              <input
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="6 menit baca"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
              <p className="text-xs text-white/40">
                Saran: {suggestedReadingTime} (otomatis dari jumlah kata teks).
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Thumbnail URL
            </label>
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="/images/blog-thumbnail.png"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            <p className="text-xs text-white/40">
              Kosongkan untuk pakai thumbnail default.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-white/80">
                  Konten
                </label>
                <p className="text-xs text-white/40">
                  Tambah blok teks, gambar, video, atau file. Drag untuk atur
                  urutan.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => addBlock("text")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:border-white/20 hover:bg-white/10">
                  + Text
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:border-white/20 hover:bg-white/10">
                  + Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("video")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:border-white/20 hover:bg-white/10">
                  + Video
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("file")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:border-white/20 hover:bg-white/10">
                  + File
                </button>
              </div>
            </div>

            {content.map((block, index) => renderBlockEditor(block, index))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <label className="flex items-center gap-4 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-white/10 rounded-full peer peer-checked:bg-orange-500/50 transition-colors"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
              <div>
                <p className="text-white font-medium">Publish ke blog</p>
                <p className="text-white/50 text-sm">
                  Jika aktif, artikel langsung tampil di halaman blog publik.
                </p>
              </div>
            </label>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-8px_rgba(234,88,12,0.8)] transition hover:shadow-[0_0_25px_-8px_rgba(234,88,12,1)] disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {mode === "edit" ? "Update Blog" : "Simpan ke Supabase"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/10">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Salin JSON
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/10">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0119 5"
                />
              </svg>
              Reset
            </button>
            {copyState === "copied" && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Disalin
              </span>
            )}
            {copyState === "error" && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1 text-sm font-medium text-red-300">
                Gagal menyalin, coba lagi.
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_-45px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-semibold text-white">
                Preview kartu
              </h3>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                  categoryColors[category]
                )}>
                {category}
              </span>
            </div>
            <div className="relative h-40 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-black">
              <Image
                src={thumbnail || fallbackThumbnail}
                alt="Preview"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {date}
              </div>
            </div>
            <div className="space-y-2 pt-3">
              <h4 className="text-lg font-bold text-white">
                {title || "Judul artikel baru"}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {subtitle ||
                  "Subjudul akan muncul di sini untuk memberi konteks cepat."}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="inline-flex h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_0_6px_rgba(251,146,60,0.15)]" />
                <span>{readingTime || suggestedReadingTime}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Payload JSON</h3>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                Supabase insert
              </span>
            </div>
            <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-white/80 whitespace-pre">
              {snippet}
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
}
