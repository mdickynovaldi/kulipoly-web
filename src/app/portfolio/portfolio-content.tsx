"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortfolioCard from "@/components/shared/cards/portfolio-card";
import { type Portfolio, type ProjectTag } from "@/lib/types/portfolio";
import { getLocalizedPortfolio } from "@/lib/types/portfolio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslation, useLanguage } from "@/lib/i18n";
import Link from "next/link";

const filterTags: (ProjectTag | "All")[] = ["All", "VR", "AR", "Web", "3D"];

const tagFilterStyles: Record<
  ProjectTag | "All",
  { active: string; inactive: string }
> = {
  All: {
    active: "bg-white text-black",
    inactive: "bg-white/5 text-white/60 hover:bg-white/10",
  },
  VR: {
    active: "bg-violet-500 text-white",
    inactive: "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20",
  },
  AR: {
    active: "bg-cyan-500 text-white",
    inactive: "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20",
  },
  Web: {
    active: "bg-emerald-500 text-white",
    inactive: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
  },
  "3D": {
    active: "bg-orange-500 text-white",
    inactive: "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20",
  },
};

type PortfolioContentProps = {
  portfolios: Portfolio[];
};

export default function PortfolioContent({
  portfolios,
}: PortfolioContentProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectTag | "All">("All");
  const { t } = useTranslation();
  const { language } = useLanguage();

  const filteredProjects = portfolios.filter((project) => {
    if (activeFilter === "All") return true;
    return project.tags.includes(activeFilter);
  });

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ornaments */}
        <div className="absolute top-0 left-0">
          <Image
            src="/ornamen.svg"
            alt=""
            width={400}
            height={400}
            className="opacity-30"
          />
        </div>
        <div className="absolute bottom-0 right-0 rotate-180">
          <Image
            src="/ornamen.svg"
            alt=""
            width={300}
            height={300}
            className="opacity-20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block mb-4">
            <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 border border-orange-500/30 rounded-full bg-orange-500/5">
              {t.portfolio.ourWork}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
          </h1>

          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.portfolio.exploreDescription}
          </p>
        </motion.header>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 py-6 border-y border-white/5">
          {[
            {
              value: `${portfolios.length}+`,
              label: t.portfolio.projectsCompleted,
            },
            { value: "15+", label: t.portfolio.happyClients },
            { value: "6710+", label: t.portfolio.assetsCreated },
            { value: "100%", label: t.portfolio.optimizedPerformance },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </motion.div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={cn(
                "px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 border border-transparent",
                activeFilter === tag
                  ? cn(tagFilterStyles[tag].active, "shadow-lg")
                  : cn(tagFilterStyles[tag].inactive, "border-white/5")
              )}>
              {tag === "All" ? t.portfolio.allProjects : tag}
              {tag !== "All" && (
                <span className="ml-2 opacity-60">
                  ({portfolios.filter((p) => p.tags.includes(tag)).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Get localized content based on current language
              const localizedProject = getLocalizedPortfolio(project, language);

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    layout: { duration: 0.3 },
                  }}>
                  <PortfolioCard
                    title={localizedProject.title}
                    description={localizedProject.description}
                    thumbnail={localizedProject.thumbnail}
                    companyLogo={localizedProject.companyLogo ?? undefined}
                    companyName={localizedProject.companyName}
                    tags={localizedProject.tags}
                    href={`/portfolio/${project.slug}`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20">
            <div className="text-white/30 text-lg">
              {t.portfolio.noProjects}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center">
          <div className="inline-block p-px rounded-2xl bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50">
            <div className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl px-12 py-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.portfolio.haveProject}
              </h2>
              <p className="text-white/50 mb-6 max-w-md mx-auto">
                {t.portfolio.createTogether}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-[0_0_30px_-5px_rgba(229,57,26,0.5)] transition-all duration-300 hover:scale-105">
                {t.portfolio.startProject}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
