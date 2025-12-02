"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Portfolio, type ProjectTag } from "@/lib/types/portfolio";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useLocalizedPortfolio } from "@/lib/hooks/use-auto-translate";

const tagColors: Record<ProjectTag, { bg: string; text: string }> = {
  VR: { bg: "bg-violet-500/20", text: "text-violet-400" },
  AR: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  Web: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  "3D": { bg: "bg-orange-500/20", text: "text-orange-400" },
};

// Helper function to detect media type from URL
function isVideoUrl(url: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".ogg"];
  const lowerUrl = url.toLowerCase();

  if (videoExtensions.some((ext) => lowerUrl.includes(ext))) {
    return true;
  }

  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return true;
  }

  if (lowerUrl.includes("vimeo.com")) {
    return true;
  }

  return false;
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getVimeoId(url: string): string | null {
  const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function getVideoEmbedUrl(url: string): string | null {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}`;
  }

  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"];
  if (videoExtensions.some((ext) => url.toLowerCase().includes(ext))) {
    return url;
  }

  return null;
}

type Props = {
  portfolio: Portfolio;
  relatedProjects: Portfolio[];
};

export default function PortfolioDetailContent({
  portfolio,
  relatedProjects,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useTranslation();

  // Use auto-translated content based on current language
  const { data: localizedPortfolio, isTranslating } =
    useLocalizedPortfolio(portfolio);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Translation indicator */}
      {isTranslating && (
        <div className="fixed top-24 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-md rounded-full border border-orange-500/30">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-orange-400">Translating...</span>
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-32 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-white/50 hover:text-orange-500 transition-colors group">
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                {t.portfolioDetail.backToPortfolio}
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={localizedPortfolio.thumbnail}
                alt={localizedPortfolio.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-6 right-6 flex flex-wrap gap-2 justify-end max-w-[50%]">
                {localizedPortfolio.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/10",
                      tagColors[tag].bg,
                      tagColors[tag].text
                    )}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  {localizedPortfolio.companyLogo ? (
                    <Image
                      src={localizedPortfolio.companyLogo}
                      alt={localizedPortfolio.companyName}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {localizedPortfolio.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-white/60 text-sm">
                    {t.portfolioDetail.client}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {localizedPortfolio.companyName}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Title & Meta */}
        <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {localizedPortfolio.title}
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                {localizedPortfolio.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5">
                <div className="space-y-4">
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      {t.portfolioDetail.year}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedPortfolio.year}
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      {t.portfolioDetail.duration}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedPortfolio.duration}
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      {t.portfolioDetail.ourRole}
                    </div>
                    <div className="text-white font-semibold">
                      {localizedPortfolio.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        {localizedPortfolio.metrics &&
          localizedPortfolio.metrics.length > 0 && (
            <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {localizedPortfolio.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-sm border border-white/5 text-center group hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-white font-medium text-sm mb-1">
                      {metric.label}
                    </div>
                    <div className="text-white/40 text-xs">
                      {metric.description}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

        {/* Challenge & Solution */}
        <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t.portfolioDetail.challenge}
                </h2>
              </div>
              <p className="text-white/60 leading-relaxed">
                {localizedPortfolio.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t.portfolioDetail.solution}
                </h2>
              </div>
              <p className="text-white/60 leading-relaxed">
                {localizedPortfolio.solution}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        {localizedPortfolio.gallery.length > 0 && (
          <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {t.portfolioDetail.projectGallery}
              </h2>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-4">
                {isVideoUrl(localizedPortfolio.gallery[activeImage]) ? (
                  (() => {
                    const embedUrl = getVideoEmbedUrl(
                      localizedPortfolio.gallery[activeImage]
                    );
                    const isDirectVideo = localizedPortfolio.gallery[
                      activeImage
                    ].match(/\.(mp4|webm|mov|ogg)$/i);

                    if (isDirectVideo) {
                      return (
                        <video
                          key={activeImage}
                          src={localizedPortfolio.gallery[activeImage]}
                          controls
                          className="w-full h-full object-contain bg-black"
                          playsInline>
                          Your browser does not support the video tag.
                        </video>
                      );
                    }

                    if (embedUrl) {
                      return (
                        <iframe
                          key={activeImage}
                          src={embedUrl}
                          title={`${localizedPortfolio.title} video ${
                            activeImage + 1
                          }`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    }

                    return null;
                  })()
                ) : (
                  <Image
                    src={localizedPortfolio.gallery[activeImage]}
                    alt={`${localizedPortfolio.title} gallery ${
                      activeImage + 1
                    }`}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {localizedPortfolio.gallery.map((media, index) => {
                  const isVideo = isVideoUrl(media);
                  const youtubeId = getYouTubeId(media);

                  return (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300",
                        activeImage === index
                          ? "border-orange-500 ring-2 ring-orange-500/30"
                          : "border-white/10 hover:border-white/30"
                      )}>
                      {isVideo ? (
                        <>
                          {youtubeId ? (
                            <Image
                              src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                              alt={`Video thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-white/50"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Image
                          src={media}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                      {activeImage !== index && (
                        <div className="absolute inset-0 bg-black/40" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </section>
        )}

        {/* Results */}
        {localizedPortfolio.results.length > 0 && (
          <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 border border-orange-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                {t.portfolioDetail.keyResults}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {localizedPortfolio.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-orange-500"
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
                    </div>
                    <span className="text-white/80">{result}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Technologies */}
        {localizedPortfolio.technologies.length > 0 && (
          <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {t.portfolioDetail.technologiesUsed}
              </h2>
              <div className="flex flex-wrap gap-3">
                {localizedPortfolio.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="px-5 py-2.5 rounded-full bg-zinc-800/80 text-white/80 font-medium border border-white/10 hover:border-orange-500/30 hover:bg-zinc-800 transition-all duration-300">
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Testimonial */}
        {localizedPortfolio.testimonial && (
          <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10 overflow-hidden">
              <div className="absolute top-6 left-8 text-orange-500/20">
                <svg
                  className="w-20 h-20"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                  &ldquo;{localizedPortfolio.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {localizedPortfolio.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {localizedPortfolio.testimonial.author}
                    </div>
                    <div className="text-white/50 text-sm">
                      {localizedPortfolio.testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {t.portfolioDetail.relatedProjects}
                </h2>
                <Link
                  href="/portfolio"
                  className="text-orange-500 hover:text-orange-400 font-medium flex items-center gap-2 transition-colors">
                  {t.portfolioDetail.viewAll}
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

              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}>
                    <Link
                      href={`/portfolio/${related.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/5 hover:border-orange-500/30 transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={related.thumbnail}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {related.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "px-2 py-0.5 text-[10px] font-bold uppercase rounded-full backdrop-blur-md",
                                tagColors[tag].bg,
                                tagColors[tag].text
                              )}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
                          {related.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2">
                          {related.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center">
            <div className="inline-block p-px rounded-3xl bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50">
              <div className="bg-zinc-900/95 backdrop-blur-sm rounded-3xl px-8 md:px-16 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t.portfolioDetail.readyToStart}
                </h2>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  {t.portfolioDetail.createExperience}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-[0_0_40px_-5px_rgba(229,57,26,0.5)] transition-all duration-300 hover:scale-105">
                    {t.portfolio.startProject}
                    <svg
                      className="w-5 h-5"
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
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
                    {t.portfolioDetail.viewMoreProjects}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
