import { notFound } from "next/navigation";
import { getPortfolioById } from "@/lib/data/portfolio";
import PortfolioForm from "../portfolio-form";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const portfolio = await getPortfolioById(id);

  if (!portfolio) {
    return {
      title: "Not Found | Kulipoly Admin",
    };
  }

  return {
    title: `Edit ${portfolio.title} | Kulipoly Admin`,
  };
}

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const portfolio = await getPortfolioById(id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Portfolio</h1>
        <p className="text-white/50 mt-1">Update the details of your portfolio project</p>
      </div>

      {/* Form */}
      <PortfolioForm portfolio={portfolio} />
    </div>
  );
}

