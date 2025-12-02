"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type Props = {
  id: string;
  media: string;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
};

function getMediaType(url: string) {
  if (!url) return "image";
  if (
    url.includes("youtube") ||
    url.includes("youtu.be") ||
    url.includes("vimeo") ||
    url.match(/\.(mp4|webm|mov)$/i)
  ) {
    return "video";
  }
  return "image";
}

function getYouTubeThumbnail(url: string) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
  }
  return null;
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function SortableMediaItem({
  id,
  media,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const mediaType = getMediaType(media);
  const ytThumb = mediaType === "video" ? getYouTubeThumbnail(media) : null;
  const vimeoId = mediaType === "video" ? getVimeoId(media) : null;

  // Determine preview
  const isImage =
    mediaType === "image" &&
    media &&
    (media.startsWith("http") || media.startsWith("/"));
  const isYouTube = !!ytThumb;
  const isVimeo = !!vimeoId;
  const isDirectVideo =
    mediaType === "video" && media.match(/\.(mp4|webm|mov)$/i);
  const hasPreview = isImage || isYouTube || isVimeo || isDirectVideo;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border transition-all ${
        isDragging
          ? "border-orange-500 shadow-lg shadow-orange-500/20 z-50 scale-[1.02]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="shrink-0 p-1 rounded text-white/30 hover:text-white hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
        aria-label="Drag to reorder"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {/* Order number */}
      <span className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-semibold text-white/40 bg-white/5 rounded">
        {index + 1}
      </span>

      {/* Compact preview thumbnail */}
      <div className="shrink-0 w-16 h-10 rounded overflow-hidden bg-black/30 relative">
        {hasPreview ? (
          <>
            {isImage && (
              <Image
                src={media}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            )}
            {isYouTube && (
              <Image
                src={ytThumb}
                alt={`YouTube preview ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            )}
            {isVimeo && (
              <div className="flex items-center justify-center h-full text-white/40">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            {isDirectVideo && (
              <video src={media} className="w-full h-full object-cover" muted playsInline />
            )}
            {/* Play icon overlay for videos */}
            {(isYouTube || isVimeo || isDirectVideo) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Input field */}
      <div className="flex-1 min-w-0">
        <div className="relative">
          <input
            type="text"
            value={media}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder="Paste image/video URL..."
            className="w-full px-3 py-1.5 pl-8 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors truncate"
          />
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            {mediaType === "video" ? (
              <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Type badge */}
      {media && (
        <span
          className={`shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded ${
            mediaType === "video"
              ? "bg-violet-500/20 text-violet-400"
              : "bg-emerald-500/20 text-emerald-400"
          }`}
        >
          {mediaType === "video" ? "VID" : "IMG"}
        </span>
      )}

      {/* Delete button */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="shrink-0 p-1 rounded text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          aria-label="Remove media"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
