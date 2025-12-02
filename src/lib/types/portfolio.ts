// Portfolio database types that match Supabase schema

export type ProjectTag = "VR" | "AR" | "Web" | "3D";

export type Testimonial = {
  quote: string;
  author: string;
  position: string;
};

export type Metric = {
  label: string;
  value: string;
  description: string;
};

// Database row type from Supabase
export type PortfolioRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  company_logo: string | null;
  company_name: string;
  tags: ProjectTag[];
  year: string;
  duration: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  gallery: string[];
  testimonial: Testimonial | null;
  metrics: Metric[] | null;
  is_published: boolean;
  is_premier: boolean;
  created_at: string;
  updated_at: string;
  // English translation fields (nullable - auto-generated or manual override)
  title_en: string | null;
  description_en: string | null;
  role_en: string | null;
  challenge_en: string | null;
  solution_en: string | null;
  results_en: string[] | null;
  testimonial_en: Testimonial | null;
};

// Transformed type for frontend use (camelCase)
export type Portfolio = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  companyLogo: string | null;
  companyName: string;
  tags: ProjectTag[];
  year: string;
  duration: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  gallery: string[];
  testimonial: Testimonial | null;
  metrics: Metric[] | null;
  isPublished: boolean;
  isPremier: boolean;
  createdAt: string;
  updatedAt: string;
  // English translations
  titleEn: string | null;
  descriptionEn: string | null;
  roleEn: string | null;
  challengeEn: string | null;
  solutionEn: string | null;
  resultsEn: string[] | null;
  testimonialEn: Testimonial | null;
};

// Helper type for localized content based on language
export type LocalizedPortfolio = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  companyLogo: string | null;
  companyName: string;
  tags: ProjectTag[];
  year: string;
  duration: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  gallery: string[];
  testimonial: Testimonial | null;
  metrics: Metric[] | null;
};

// Input type for creating/updating portfolio
export type PortfolioInput = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  companyLogo?: string | null;
  companyName: string;
  tags: ProjectTag[];
  year: string;
  duration: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  gallery: string[];
  testimonial?: Testimonial | null;
  metrics?: Metric[] | null;
  isPublished?: boolean;
  isPremier?: boolean;
  // Optional English translations (for manual override)
  titleEn?: string | null;
  descriptionEn?: string | null;
  roleEn?: string | null;
  challengeEn?: string | null;
  solutionEn?: string | null;
  resultsEn?: string[] | null;
  testimonialEn?: Testimonial | null;
};

// Transform database row to frontend type
export function transformPortfolio(row: PortfolioRow): Portfolio {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    thumbnail: row.thumbnail,
    companyLogo: row.company_logo,
    companyName: row.company_name,
    tags: row.tags,
    year: row.year,
    duration: row.duration,
    role: row.role,
    challenge: row.challenge,
    solution: row.solution,
    results: row.results,
    technologies: row.technologies,
    gallery: row.gallery,
    testimonial: row.testimonial,
    metrics: row.metrics,
    isPublished: row.is_published,
    isPremier: row.is_premier,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Translations
    titleEn: row.title_en,
    descriptionEn: row.description_en,
    roleEn: row.role_en,
    challengeEn: row.challenge_en,
    solutionEn: row.solution_en,
    resultsEn: row.results_en,
    testimonialEn: row.testimonial_en,
  };
}

// Transform frontend input to database format
export function transformToDbFormat(
  input: PortfolioInput
): Omit<PortfolioRow, "id" | "created_at" | "updated_at"> {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    thumbnail: input.thumbnail,
    company_logo: input.companyLogo ?? null,
    company_name: input.companyName,
    tags: input.tags,
    year: input.year,
    duration: input.duration,
    role: input.role,
    challenge: input.challenge,
    solution: input.solution,
    results: input.results,
    technologies: input.technologies,
    gallery: input.gallery,
    testimonial: input.testimonial ?? null,
    metrics: input.metrics ?? null,
    is_published: input.isPublished ?? false,
    is_premier: input.isPremier ?? false,
    // Translations
    title_en: input.titleEn ?? null,
    description_en: input.descriptionEn ?? null,
    role_en: input.roleEn ?? null,
    challenge_en: input.challengeEn ?? null,
    solution_en: input.solutionEn ?? null,
    results_en: input.resultsEn ?? null,
    testimonial_en: input.testimonialEn ?? null,
  };
}

// Get localized portfolio content based on language
export function getLocalizedPortfolio(
  portfolio: Portfolio,
  language: "id" | "en"
): LocalizedPortfolio {
  if (language === "en") {
    return {
      id: portfolio.id,
      slug: portfolio.slug,
      // Use English version if available, fallback to Indonesian
      title: portfolio.titleEn || portfolio.title,
      description: portfolio.descriptionEn || portfolio.description,
      thumbnail: portfolio.thumbnail,
      companyLogo: portfolio.companyLogo,
      companyName: portfolio.companyName,
      tags: portfolio.tags,
      year: portfolio.year,
      duration: portfolio.duration,
      role: portfolio.roleEn || portfolio.role,
      challenge: portfolio.challengeEn || portfolio.challenge,
      solution: portfolio.solutionEn || portfolio.solution,
      results: portfolio.resultsEn || portfolio.results,
      technologies: portfolio.technologies,
      gallery: portfolio.gallery,
      testimonial: portfolio.testimonialEn || portfolio.testimonial,
      metrics: portfolio.metrics,
    };
  }

  // Return Indonesian (original) content
  return {
    id: portfolio.id,
    slug: portfolio.slug,
    title: portfolio.title,
    description: portfolio.description,
    thumbnail: portfolio.thumbnail,
    companyLogo: portfolio.companyLogo,
    companyName: portfolio.companyName,
    tags: portfolio.tags,
    year: portfolio.year,
    duration: portfolio.duration,
    role: portfolio.role,
    challenge: portfolio.challenge,
    solution: portfolio.solution,
    results: portfolio.results,
    technologies: portfolio.technologies,
    gallery: portfolio.gallery,
    testimonial: portfolio.testimonial,
    metrics: portfolio.metrics,
  };
}
