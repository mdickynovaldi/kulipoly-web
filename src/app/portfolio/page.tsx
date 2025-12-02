import { Suspense } from "react";
import { getPublishedPortfolios } from "@/lib/data/portfolio";
import PortfolioContent from "./portfolio-content";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Portfolio | Kulipoly",
  description:
    "Explore our collection of immersive experiences. From VR training simulations to AR product visualization.",
};

async function PortfolioData() {
  const portfolios = await getPublishedPortfolios();
  return <PortfolioContent portfolios={portfolios} />;
}

function PortfolioSkeleton() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-6 w-24 bg-zinc-800 rounded-full animate-pulse" />
          </div>
          <div className="h-16 w-96 mx-auto bg-zinc-800 rounded-lg animate-pulse mb-6" />
          <div className="h-6 w-[500px] mx-auto bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-900/80 border border-white/5 overflow-hidden"
            >
              <div className="aspect-[16/10] bg-zinc-800 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                <div className="h-6 w-full bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioData />
    </Suspense>
  );
}
