"use client";

import ProjectPinCard from "@/components/shared/cards/project-pin-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import {
  type Portfolio as PortfolioType,
  type ProjectTag,
} from "@/lib/types/portfolio";

type Props = {
  portfolios?: PortfolioType[];
};

// Accent colors based on first tag
const tagAccentColors: Record<ProjectTag, string> = {
  VR: "bg-violet-600",
  AR: "bg-cyan-600",
  Web: "bg-emerald-600",
  "3D": "bg-orange-600",
};

// Fallback projects when no premier portfolios exist
const fallbackProjects = [
  {
    title: "AR Character Experience",
    date: "september 2023",
    accentColor: "bg-blue-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "3D Environment Design",
    date: "october 2023",
    accentColor: "bg-green-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "VR Training Simulation",
    date: "november 2023",
    accentColor: "bg-violet-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "Digital Twin Factory",
    date: "december 2023",
    accentColor: "bg-cyan-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "AR Product Visualization",
    date: "january 2024",
    accentColor: "bg-orange-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "3D Animation Showcase",
    date: "february 2024",
    accentColor: "bg-red-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
  {
    title: "Interactive 3D Web",
    date: "march 2024",
    accentColor: "bg-emerald-600",
    thumbnail: "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png",
    slug: "#",
  },
];

export default function Portfolio({ portfolios = [] }: Props) {
  const { t } = useTranslation();

  // Map portfolios to display format or use fallback
  const projects =
    portfolios.length > 0
      ? portfolios.map((p) => ({
          title: p.title,
          date: p.year,
          accentColor: p.tags[0] ? tagAccentColors[p.tags[0]] : "bg-orange-600",
          thumbnail: p.thumbnail,
          slug: p.slug,
        }))
      : fallbackProjects;

  return (
    <section className="w-full min-h-screen bg-black py-16 sm:py-20 lg:py-24">
      <div className="bg-black">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 w-full">
          {/* Header */}
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic uppercase tracking-wide">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {t.portfolio.title}
              </span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              {t.portfolio.description}
            </p>
          </div>

          {/* Cards - Responsive Grid */}
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-32 sm:gap-y-36 lg:gap-y-40 gap-x-6 sm:gap-x-8 lg:gap-x-10 pt-8 pb-16">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex justify-center items-start min-h-[320px]">
                  <ProjectPinCard
                    title={project.title}
                    date={project.date}
                    href={
                      project.slug === "#" ? "#" : `/portfolio/${project.slug}`
                    }
                    imageSrc={
                      project.thumbnail ||
                      "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png"
                    }
                    imageAlt={project.title}
                    containerClassName=""
                    accentColor={project.accentColor}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 sm:mt-10 lg:mt-12 w-full flex justify-center px-4">
            <Button
              asChild
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-600/30">
              <Link
                href="/portfolio"
                className="text-white flex items-center gap-2 hover:text-white transition-colors">
                {t.portfolio.seeAll}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
