import PortfolioForm from "../portfolio-form";

export const metadata = {
  title: "Add New Portfolio | Kulipoly Admin",
};

export default function NewPortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Add New Portfolio</h1>
        <p className="text-white/50 mt-1">
          Create a new portfolio project to showcase your work
        </p>
      </div>

      {/* Form */}
      <PortfolioForm />
    </div>
  );
}

