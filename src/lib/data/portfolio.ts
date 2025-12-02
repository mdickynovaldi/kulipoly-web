import { createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import {
  type Portfolio,
  type PortfolioRow,
  transformPortfolio,
} from "@/lib/types/portfolio";

/**
 * Fungsi-fungsi ini digunakan untuk membaca data portfolio dari Server Components.
 * Menggunakan read-only client karena tidak memerlukan modifikasi cookies.
 */

// Fetch all published portfolios
export async function getPublishedPortfolios(): Promise<Portfolio[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }

  return (data as PortfolioRow[]).map(transformPortfolio);
}

// Fetch premier portfolios (featured on homepage)
export async function getPremierPortfolios(): Promise<Portfolio[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("is_published", true)
    .eq("is_premier", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching premier portfolios:", error);
    return [];
  }

  return (data as PortfolioRow[]).map(transformPortfolio);
}

// Fetch all portfolios (including unpublished, for admin)
export async function getAllPortfolios(): Promise<Portfolio[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all portfolios:", error);
    return [];
  }

  return (data as PortfolioRow[]).map(transformPortfolio);
}

// Fetch single portfolio by slug
export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return transformPortfolio(data as PortfolioRow);
}

// Fetch single portfolio by ID (for admin editing)
export async function getPortfolioById(id: string): Promise<Portfolio | null> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching portfolio by id:", error);
    return null;
  }

  return transformPortfolio(data as PortfolioRow);
}

// Get related projects by tags
export async function getRelatedPortfolios(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<Portfolio[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("is_published", true)
    .neq("slug", currentSlug)
    .overlaps("tags", tags)
    .limit(limit);

  if (error) {
    console.error("Error fetching related portfolios:", error);
    return [];
  }

  return (data as PortfolioRow[]).map(transformPortfolio);
}
