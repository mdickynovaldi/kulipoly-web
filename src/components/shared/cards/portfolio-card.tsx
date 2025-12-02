"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type ProjectTag } from "@/lib/types/portfolio";

type PortfolioCardProps = {
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt?: string;
  companyLogo?: string;
  companyName: string;
  tags: ProjectTag[];
  href?: string;
  className?: string;
};

const tagColors: Record<ProjectTag, { bg: string; text: string; glow: string }> = {
  VR: {
    bg: "bg-violet-500/20",
    text: "text-violet-400",
    glow: "shadow-violet-500/20",
  },
  AR: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  Web: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  "3D": {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    glow: "shadow-orange-500/20",
  },
};

export default function PortfolioCard({
  title,
  description,
  thumbnail,
  thumbnailAlt,
  companyLogo,
  companyName,
  tags,
  href = "#",
  className,
}: PortfolioCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_0_40px_-12px_rgba(229,57,26,0.3)]",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-red-500/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 -z-10" />

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={thumbnail}
          alt={thumbnailAlt || title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Tags overlay - top right */}
        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/10 shadow-lg",
                tagColors[tag].bg,
                tagColors[tag].text,
                tagColors[tag].glow
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-5">
        {/* Company info */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-white/10 flex-shrink-0">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={companyName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60 text-xs font-bold">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-white/50 text-xs font-medium truncate">
            {companyName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-orange-500 opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="text-xs font-semibold uppercase tracking-wider">View Project</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.a>
  );
}

