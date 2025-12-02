import Link from "next/link";
import { getAllPortfolios } from "@/lib/data/portfolio";
import Image from "next/image";

export default async function DashboardPage() {
  const portfolios = await getAllPortfolios();
  const publishedCount = portfolios.filter((p) => p.isPublished).length;
  const draftCount = portfolios.filter((p) => !p.isPublished).length;

  const stats = [
    {
      name: "Total Projects",
      value: portfolios.length.toString(),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Published",
      value: publishedCount.toString(),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-emerald-500 to-green-600",
    },
    {
      name: "Drafts",
      value: draftCount.toString(),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "from-yellow-500 to-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 mt-1">Welcome to Kulipoly Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-white/50 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/portfolio/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_-5px_rgba(229,57,26,0.5)] transition-all duration-200">
            <svg
              className="w-5 h-5"
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
            Add New Portfolio
          </Link>
          <Link
            href="/dashboard/portfolio"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            View All Portfolios
          </Link>
          <Link
            href="/portfolio"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Public Portfolio
          </Link>
        </div>
      </div>

      {/* Recent Portfolios */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Recent Portfolios
          </h2>
          <Link
            href="/dashboard/portfolio"
            className="text-orange-400 hover:text-orange-300 text-sm font-medium">
            View All →
          </Link>
        </div>
        {portfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-white/50 mb-4">No portfolios yet</p>
            <Link
              href="/dashboard/portfolio/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4"
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
              Create Your First Portfolio
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {portfolios.slice(0, 5).map((portfolio) => (
              <Link
                key={portfolio.id}
                href={`/dashboard/portfolio/${portfolio.id}`}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    <Image
                      src={portfolio.thumbnail}
                      alt={portfolio.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {portfolio.title}
                    </h3>
                    <p className="text-white/40 text-sm">
                      {portfolio.companyName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      portfolio.isPublished
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                    {portfolio.isPublished ? "Published" : "Draft"}
                  </span>
                  <svg
                    className="w-5 h-5 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
