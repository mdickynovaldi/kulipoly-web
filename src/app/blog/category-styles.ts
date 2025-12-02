import type { BlogCategory } from "@/lib/types/blog";

export const categoryStyles: Record<BlogCategory, string> = {
  Insight: "bg-orange-500/15 text-orange-100 border border-orange-500/30",
  "Case Study": "bg-red-500/15 text-red-100 border border-red-500/30",
  Update: "bg-white/10 text-white border border-white/20",
  Guide: "bg-amber-400/15 text-amber-100 border border-amber-400/30",
};
