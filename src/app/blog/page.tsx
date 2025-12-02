import { getPublishedBlogPosts } from "@/lib/data/blog";
import BlogContent from "./blog-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogPosts();
  return <BlogContent blogPosts={blogPosts} />;
}
