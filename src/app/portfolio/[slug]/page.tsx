import { notFound } from "next/navigation";
import { getPortfolioBySlug, getRelatedPortfolios } from "@/lib/data/portfolio";
import PortfolioDetailContent from "./portfolio-detail-content";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return {
      title: "Not Found | Kulipoly",
    };
  }

  return {
    title: `${portfolio.title} | Kulipoly Portfolio`,
    description: portfolio.description,
    openGraph: {
      title: portfolio.title,
      description: portfolio.description,
      images: [portfolio.thumbnail],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  const relatedProjects = await getRelatedPortfolios(slug, portfolio.tags, 3);

  return (
    <PortfolioDetailContent
      portfolio={portfolio}
      relatedProjects={relatedProjects}
    />
  );
}
