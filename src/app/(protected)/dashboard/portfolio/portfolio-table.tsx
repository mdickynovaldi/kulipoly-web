"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Portfolio, type ProjectTag } from "@/lib/types/portfolio";
import { deletePortfolio, togglePublishStatus, togglePremierStatus } from "@/lib/actions/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  portfolios: Portfolio[];
};

const tagColors: Record<ProjectTag, string> = {
  VR: "bg-violet-500/20 text-violet-400",
  AR: "bg-cyan-500/20 text-cyan-400",
  Web: "bg-emerald-500/20 text-emerald-400",
  "3D": "bg-orange-500/20 text-orange-400",
};

export default function PortfolioTable({ portfolios }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [togglingPremierId, setTogglingPremierId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    startTransition(async () => {
      await deletePortfolio(id);
      setDeletingId(null);
    });
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    startTransition(async () => {
      await togglePublishStatus(id, !currentStatus);
      setTogglingId(null);
    });
  };

  const handleTogglePremier = async (id: string, currentStatus: boolean) => {
    setTogglingPremierId(id);
    startTransition(async () => {
      await togglePremierStatus(id, !currentStatus);
      setTogglingPremierId(null);
    });
  };

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl bg-zinc-900/50 border border-white/10">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No portfolios yet</h3>
        <p className="text-white/50 mb-6 max-w-md mx-auto">
          Start showcasing your work by adding your first portfolio project.
        </p>
        <Link
          href="/dashboard/portfolio/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_-5px_rgba(229,57,26,0.5)] transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Your First Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                Premier
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white/50 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {portfolios.map((portfolio) => (
              <tr
                key={portfolio.id}
                className={cn(
                  "hover:bg-white/5 transition-colors",
                  (deletingId === portfolio.id || togglingId === portfolio.id || togglingPremierId === portfolio.id) && "opacity-50"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <Image
                        src={portfolio.thumbnail}
                        alt={portfolio.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium line-clamp-1">
                        {portfolio.title}
                      </h3>
                      <p className="text-white/40 text-sm">{portfolio.companyName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {portfolio.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-2 py-0.5 text-xs font-semibold rounded-full",
                          tagColors[tag]
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePublish(portfolio.id, portfolio.isPublished)}
                    disabled={isPending && togglingId === portfolio.id}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                      portfolio.isPublished
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    )}
                  >
                    {togglingId === portfolio.id
                      ? "..."
                      : portfolio.isPublished
                      ? "Published"
                      : "Draft"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePremier(portfolio.id, portfolio.isPremier)}
                    disabled={isPending && togglingPremierId === portfolio.id}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5",
                      portfolio.isPremier
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        : "bg-white/10 text-white/40 hover:bg-white/20"
                    )}
                  >
                    {portfolio.isPremier && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {togglingPremierId === portfolio.id
                      ? "..."
                      : portfolio.isPremier
                      ? "Featured"
                      : "Standard"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/60">{portfolio.year}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {portfolio.isPublished && (
                      <Link
                        href={`/portfolio/${portfolio.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                        title="View on site"
                      >
                        <svg
                          className="w-4 h-4"
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
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/portfolio/${portfolio.id}`}
                      className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(portfolio.id, portfolio.title)}
                      disabled={isPending && deletingId === portfolio.id}
                      className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

