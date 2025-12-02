import { createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import {
  type BlogPost,
  type BlogRow,
  transformBlogPost,
} from "@/lib/types/blog";

export type { BlogCategory } from "@/lib/types/blog";

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data as BlogRow[]).map(transformBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
  includeDrafts: boolean = false
): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClientReadOnly();

  let query = supabase.from("blog_posts").select("*").eq("slug", slug);
  if (!includeDrafts) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }

  return transformBlogPost(data as BlogRow);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all blog posts:", error);
    return [];
  }

  return (data as BlogRow[]).map(transformBlogPost);
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClientReadOnly();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching blog post by id:", error);
    return null;
  }

  return transformBlogPost(data as BlogRow);
}
