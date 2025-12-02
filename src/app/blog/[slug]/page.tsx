import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data/blog";
import BlogDetailContent from "./blog-detail-content";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: "Kulipoly Blog",
    };
  }

  return {
    title: `${post.title} | Kulipoly Blog`,
    description: post.subtitle,
    openGraph: {
      title: `${post.title} | Kulipoly Blog`,
      description: post.subtitle,
      images: [{ url: post.thumbnail }],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}
