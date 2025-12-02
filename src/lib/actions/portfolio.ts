"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  type Portfolio,
  type PortfolioInput,
  type PortfolioRow,
  transformPortfolio,
  transformToDbFormat,
} from "@/lib/types/portfolio";

// Note: Untuk fungsi read (getPublishedPortfolios, getAllPortfolios, dll),
// import langsung dari "@/lib/data/portfolio" di Server Components.

// Create new portfolio
export async function createPortfolio(
  input: PortfolioInput
): Promise<{ success: boolean; error?: string; data?: Portfolio }> {
  const supabase = await createSupabaseServerClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const dbData = transformToDbFormat(input);

  const { data, error } = await supabase
    .from("portfolios")
    .insert(dbData)
    .select()
    .single();

  if (error) {
    console.error("Error creating portfolio:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");

  return { success: true, data: transformPortfolio(data as PortfolioRow) };
}

// Update portfolio
export async function updatePortfolio(
  id: string,
  input: Partial<PortfolioInput>
): Promise<{ success: boolean; error?: string; data?: Portfolio }> {
  const supabase = await createSupabaseServerClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Build update object with only provided fields
  const updateData: Record<string, unknown> = {};
  if (input.slug !== undefined) updateData.slug = input.slug;
  if (input.title !== undefined) updateData.title = input.title;
  if (input.description !== undefined)
    updateData.description = input.description;
  if (input.thumbnail !== undefined) updateData.thumbnail = input.thumbnail;
  if (input.companyLogo !== undefined)
    updateData.company_logo = input.companyLogo;
  if (input.companyName !== undefined)
    updateData.company_name = input.companyName;
  if (input.tags !== undefined) updateData.tags = input.tags;
  if (input.year !== undefined) updateData.year = input.year;
  if (input.duration !== undefined) updateData.duration = input.duration;
  if (input.role !== undefined) updateData.role = input.role;
  if (input.challenge !== undefined) updateData.challenge = input.challenge;
  if (input.solution !== undefined) updateData.solution = input.solution;
  if (input.results !== undefined) updateData.results = input.results;
  if (input.technologies !== undefined)
    updateData.technologies = input.technologies;
  if (input.gallery !== undefined) updateData.gallery = input.gallery;
  if (input.testimonial !== undefined)
    updateData.testimonial = input.testimonial;
  if (input.metrics !== undefined) updateData.metrics = input.metrics;
  if (input.isPublished !== undefined)
    updateData.is_published = input.isPublished;
  if (input.isPremier !== undefined)
    updateData.is_premier = input.isPremier;

  const { data, error } = await supabase
    .from("portfolios")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating portfolio:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/dashboard/portfolio");

  return { success: true, data: transformPortfolio(data as PortfolioRow) };
}

// Delete portfolio
export async function deletePortfolio(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("portfolios").delete().eq("id", id);

  if (error) {
    console.error("Error deleting portfolio:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");

  return { success: true };
}

// Toggle publish status
export async function togglePublishStatus(
  id: string,
  isPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("portfolios")
    .update({ is_published: isPublished })
    .eq("id", id);

  if (error) {
    console.error("Error toggling publish status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");

  return { success: true };
}

// Toggle premier status (featured on homepage)
export async function togglePremierStatus(
  id: string,
  isPremier: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("portfolios")
    .update({ is_premier: isPremier })
    .eq("id", id);

  if (error) {
    console.error("Error toggling premier status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");

  return { success: true };
}
