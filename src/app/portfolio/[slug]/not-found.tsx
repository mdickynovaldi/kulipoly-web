import Link from "next/link";

export default function PortfolioNotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 -mt-4">
          Project Not Found
        </h1>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          The project you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-[0_0_30px_-5px_rgba(229,57,26,0.5)] transition-all duration-300 hover:scale-105"
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Portfolio
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}

