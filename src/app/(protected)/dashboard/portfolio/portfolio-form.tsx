"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  type Portfolio,
  type PortfolioInput,
  type ProjectTag,
  type Metric,
  type Testimonial,
} from "@/lib/types/portfolio";
import { createPortfolio, updatePortfolio } from "@/lib/actions/portfolio";
import { cn } from "@/lib/utils";
import SortableMediaItem from "./sortable-media-item";

type Props = {
  portfolio?: Portfolio;
};

const availableTags: ProjectTag[] = ["VR", "AR", "Web", "3D"];

const tagColors: Record<ProjectTag, string> = {
  VR: "bg-violet-500/20 text-violet-400 border-violet-500/30 hover:bg-violet-500/30",
  AR: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30",
  Web: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30",
  "3D": "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export default function PortfolioForm({ portfolio }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Basic info
  const [title, setTitle] = useState(portfolio?.title ?? "");
  const [slug, setSlug] = useState(portfolio?.slug ?? "");
  const [description, setDescription] = useState(portfolio?.description ?? "");
  const [thumbnail, setThumbnail] = useState(portfolio?.thumbnail ?? "");
  const [companyName, setCompanyName] = useState(portfolio?.companyName ?? "");
  const [companyLogo, setCompanyLogo] = useState(portfolio?.companyLogo ?? "");
  const [tags, setTags] = useState<ProjectTag[]>(portfolio?.tags ?? []);

  // Project details
  const [year, setYear] = useState(
    portfolio?.year ?? new Date().getFullYear().toString()
  );
  const [duration, setDuration] = useState(portfolio?.duration ?? "");
  const [role, setRole] = useState(portfolio?.role ?? "");
  const [challenge, setChallenge] = useState(portfolio?.challenge ?? "");
  const [solution, setSolution] = useState(portfolio?.solution ?? "");

  // Arrays
  const [results, setResults] = useState<string[]>(portfolio?.results ?? [""]);
  const [technologies, setTechnologies] = useState<string[]>(
    portfolio?.technologies ?? [""]
  );
  const [gallery, setGallery] = useState<string[]>(portfolio?.gallery ?? [""]);

  // Optional
  const [testimonial, setTestimonial] = useState<Testimonial | null>(
    portfolio?.testimonial ?? null
  );
  const [metrics, setMetrics] = useState<Metric[]>(portfolio?.metrics ?? []);
  const [isPublished, setIsPublished] = useState(
    portfolio?.isPublished ?? false
  );
  const [isPremier, setIsPremier] = useState(portfolio?.isPremier ?? false);

  // DnD sensors for gallery
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Generate unique IDs for gallery items
  const galleryIds = gallery.map((_, index) => `gallery-${index}`);

  const handleGalleryDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setGallery((items) => {
        const oldIndex = items.findIndex(
          (_, i) => `gallery-${i}` === active.id
        );
        const newIndex = items.findIndex((_, i) => `gallery-${i}` === over.id);
        // Validate indices before calling arrayMove
        if (oldIndex === -1 || newIndex === -1) {
          return items;
        }
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const updateGalleryItem = useCallback((index: number, value: string) => {
    setGallery((prev) => prev.map((item, i) => (i === index ? value : item)));
  }, []);

  const removeGalleryItem = useCallback((index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!portfolio) {
      setSlug(slugify(value));
    }
  };

  const toggleTag = (tag: ProjectTag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const updateArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => [...prev, ""]);
  };

  const removeArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const addMetric = () => {
    setMetrics((prev) => [...prev, { label: "", value: "", description: "" }]);
  };

  const updateMetric = (index: number, field: keyof Metric, value: string) => {
    setMetrics((prev) =>
      prev.map((metric, i) =>
        i === index ? { ...metric, [field]: value } : metric
      )
    );
  };

  const removeMetric = (index: number) => {
    setMetrics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }
    if (tags.length === 0) {
      setError("At least one tag is required");
      return;
    }

    const input: PortfolioInput = {
      slug: slug.trim(),
      title: title.trim(),
      description: description.trim(),
      thumbnail:
        thumbnail.trim() || "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
      companyLogo: companyLogo.trim() || null,
      companyName: companyName.trim(),
      tags,
      year: year.trim(),
      duration: duration.trim(),
      role: role.trim(),
      challenge: challenge.trim(),
      solution: solution.trim(),
      results: results.filter((r) => r.trim()),
      technologies: technologies.filter((t) => t.trim()),
      gallery: gallery.filter((g) => g.trim()),
      testimonial: testimonial?.quote ? testimonial : null,
      metrics: metrics.filter((m) => m.label && m.value),
      isPublished,
      isPremier,
    };

    startTransition(async () => {
      const result = portfolio
        ? await updatePortfolio(portfolio.id, input)
        : await createPortfolio(input);

      if (!result.success) {
        setError(result.error ?? "Something went wrong");
        return;
      }

      router.push("/dashboard/portfolio");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-6">
        <h2 className="text-lg font-semibold text-white">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., VR Training Platform"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="vr-training-platform"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Brief description of the project..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="/images/project-thumbnail.jpg"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., PT Example"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Company Logo URL
          </label>
          <input
            type="text"
            value={companyLogo}
            onChange={(e) => setCompanyLogo(e.target.value)}
            placeholder="/images/company-logo.png"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Tags <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                  tags.includes(tag)
                    ? tagColors[tag]
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                )}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-6">
        <h2 className="text-lg font-semibold text-white">Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Year
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6 months"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Full Development"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            The Challenge
          </label>
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            rows={4}
            placeholder="Describe the challenge..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            The Solution
          </label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            rows={4}
            placeholder="Describe your solution..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Key Results</h2>
          <button
            type="button"
            onClick={() => addArrayItem(setResults)}
            className="text-sm text-orange-400 hover:text-orange-300">
            + Add Result
          </button>
        </div>

        {results.map((result, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={result}
              onChange={(e) =>
                updateArrayItem(setResults, index, e.target.value)
              }
              placeholder="e.g., 85% cost reduction"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
            />
            {results.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(setResults, index)}
                className="p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Technologies Used
          </h2>
          <button
            type="button"
            onClick={() => addArrayItem(setTechnologies)}
            className="text-sm text-orange-400 hover:text-orange-300">
            + Add Technology
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-white/5 rounded-lg pr-1">
              <input
                type="text"
                value={tech}
                onChange={(e) =>
                  updateArrayItem(setTechnologies, index, e.target.value)
                }
                placeholder="e.g., Unity"
                className="w-32 px-3 py-2 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm"
              />
              {technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem(setTechnologies, index)}
                  className="p-1 text-white/30 hover:text-red-400 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">Gallery Media</h2>
            <p className="text-white/40 text-xs mt-0.5">
              Drag ≡ untuk ubah urutan • Image/YouTube/Vimeo/Video
            </p>
          </div>
          <button
            type="button"
            onClick={() => addArrayItem(setGallery)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-lg transition-colors">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        </div>

        {/* Sortable gallery list */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleGalleryDragEnd}>
          <SortableContext
            items={galleryIds}
            strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {gallery.map((media, index) => (
                <SortableMediaItem
                  key={galleryIds[index]}
                  id={galleryIds[index]}
                  media={media}
                  index={index}
                  onUpdate={updateGalleryItem}
                  onRemove={removeGalleryItem}
                  canRemove={gallery.length > 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Compact format hint */}
        <p className="text-[11px] text-white/25 pt-1">
          Supported: .jpg .png .webp • youtube.com/watch?v= • youtu.be/ •
          vimeo.com/ • .mp4 .webm
        </p>
      </div>

      {/* Metrics */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Project Metrics</h2>
          <button
            type="button"
            onClick={addMetric}
            className="text-sm text-orange-400 hover:text-orange-300">
            + Add Metric
          </button>
        </div>

        {metrics.map((metric, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              value={metric.label}
              onChange={(e) => updateMetric(index, "label", e.target.value)}
              placeholder="Label"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <input
              type="text"
              value={metric.value}
              onChange={(e) => updateMetric(index, "value", e.target.value)}
              placeholder="Value"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <input
              type="text"
              value={metric.description}
              onChange={(e) =>
                updateMetric(index, "description", e.target.value)
              }
              placeholder="Description"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => removeMetric(index)}
              className="p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors justify-self-start">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Testimonial (Optional)
          </h2>
          {!testimonial && (
            <button
              type="button"
              onClick={() =>
                setTestimonial({ quote: "", author: "", position: "" })
              }
              className="text-sm text-orange-400 hover:text-orange-300">
              + Add Testimonial
            </button>
          )}
        </div>

        {testimonial && (
          <div className="space-y-4">
            <textarea
              value={testimonial.quote}
              onChange={(e) =>
                setTestimonial({ ...testimonial, quote: e.target.value })
              }
              rows={3}
              placeholder="Client testimonial..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={testimonial.author}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, author: e.target.value })
                }
                placeholder="Author name"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
              <input
                type="text"
                value={testimonial.position}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, position: e.target.value })
                }
                placeholder="Author position"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => setTestimonial(null)}
              className="text-sm text-red-400 hover:text-red-300">
              Remove Testimonial
            </button>
          </div>
        )}
      </div>

      {/* Publish & Premier Status */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-6">
        {/* Publish Toggle */}
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
            <p className="text-white font-medium">Publish Portfolio</p>
            <p className="text-white/50 text-sm">
              Make this portfolio visible on the public website
            </p>
          </div>
        </label>

        {/* Premier Toggle */}
        <label className="flex items-center gap-4 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={isPremier}
              onChange={(e) => setIsPremier(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-white/10 rounded-full peer peer-checked:bg-amber-500/50 transition-colors"></div>
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-medium">Premier Portfolio</p>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-400">
                Featured
              </span>
            </div>
            <p className="text-white/50 text-sm">
              Display this portfolio on homepage showcase section
            </p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/dashboard/portfolio"
          className="px-6 py-3 text-white/60 hover:text-white font-medium transition-colors">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_-5px_rgba(229,57,26,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
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
              Saving...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
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
              {portfolio ? "Update Portfolio" : "Create Portfolio"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
