"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  type BlogInput,
  type BlogContentBlock,
  type BlogPost,
  type BlogRow,
  transformBlogInputToDb,
  transformBlogPost,
} from "@/lib/types/blog";

const DEFAULT_THUMBNAIL = "/bd1036d9ddfe2eaeb6860f51018f41bd5899f875.png";
const REVALIDATE_PATHS = ["/blog", "/dashboard/blog", "/dashboard/blog/manage"];

function sanitizeBlocks(blocks: BlogContentBlock[]): BlogContentBlock[] {
  return blocks
    .map((block) => {
      switch (block.kind) {
        case "text": {
          const text = block.text.trim();
          if (!text) return null;
          return { ...block, text };
        }
        case "image": {
          const url = block.url.trim();
          if (!url) return null;
          return {
            ...block,
            url,
            caption: block.caption?.trim() || undefined,
            alt: block.alt?.trim() || undefined,
          };
        }
        case "video": {
          const url = block.url.trim();
          if (!url) return null;
          return { ...block, url, caption: block.caption?.trim() || undefined };
        }
        case "file": {
          const url = block.url.trim();
          const label = block.label.trim() || "Download";
          if (!url) return null;
          return {
            ...block,
            url,
            label,
            description: block.description?.trim() || undefined,
          };
        }
        default:
          return null;
      }
    })
    .filter(Boolean) as BlogContentBlock[];
}

export async function createBlogPost(
  input: BlogInput
): Promise<{ success: boolean; error?: string; data?: BlogPost }> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const sanitizedInput: BlogInput = {
    ...input,
    slug: input.slug.trim(),
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    date: input.date.trim(),
    thumbnail: input.thumbnail.trim() || DEFAULT_THUMBNAIL,
    readingTime: input.readingTime.trim() || "5 menit baca",
    content: sanitizeBlocks(input.content),
  };

  if (!sanitizedInput.slug) {
    return { success: false, error: "Slug is required" };
  }
  if (!sanitizedInput.title) {
    return { success: false, error: "Title is required" };
  }
  if (sanitizedInput.content.length === 0) {
    return { success: false, error: "Content is required" };
  }

  const payload = transformBlogInputToDb(sanitizedInput);

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/blog/${payload.slug}`);
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));

  return { success: true, data: transformBlogPost(data as BlogRow) };
}

export async function updateBlogPost(
  id: string,
  input: Partial<BlogInput>
): Promise<{ success: boolean; error?: string; data?: BlogPost }> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const updateData: Record<string, unknown> = {};
  if (input.slug !== undefined) updateData.slug = input.slug.trim();
  if (input.title !== undefined) updateData.title = input.title.trim();
  if (input.subtitle !== undefined) updateData.subtitle = input.subtitle.trim();
  if (input.date !== undefined) updateData.date = input.date.trim();
  if (input.category !== undefined) updateData.category = input.category;
  if (input.thumbnail !== undefined)
    updateData.thumbnail = input.thumbnail.trim() || DEFAULT_THUMBNAIL;
  if (input.readingTime !== undefined)
    updateData.reading_time = input.readingTime.trim() || "5 menit baca";
  if (input.content !== undefined) {
    const cleanedContent = sanitizeBlocks(input.content);
    if (cleanedContent.length === 0) {
      return { success: false, error: "Content is required" };
    }
    updateData.content = cleanedContent;
  }
  if (input.isPublished !== undefined) updateData.is_published = input.isPublished;

  const { data, error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: error.message };
  }

  const slug = (data as BlogRow).slug;
  revalidatePath(`/blog/${slug}`);
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));

  return { success: true, data: transformBlogPost(data as BlogRow) };
}

export async function deleteBlogPost(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Need slug for revalidate
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }

  if (existing?.slug) {
    revalidatePath(`/blog/${existing.slug}`);
  }
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));

  return { success: true };
}
