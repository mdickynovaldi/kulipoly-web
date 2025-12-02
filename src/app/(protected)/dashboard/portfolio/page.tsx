import Link from "next/link";
import { getAllPortfolios } from "@/lib/data/portfolio";
import PortfolioTable from "./portfolio-table";

export default async function DashboardPortfolioPage() {
  const portfolios = await getAllPortfolios();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
          <p className="text-white/50 mt-1">
            Manage your portfolio projects ({portfolios.length} total)
          </p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_-5px_rgba(229,57,26,0.5)] transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Portfolio
        </Link>
      </div>

      {/* Portfolio Table */}
      <PortfolioTable portfolios={portfolios} />
    </div>
  );
}

