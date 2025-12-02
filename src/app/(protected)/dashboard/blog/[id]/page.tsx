import { notFound } from "next/navigation";
import BlogComposer from "../../blog-composer";
import { getBlogPostById } from "@/lib/data/blog";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

export default async function BlogEditPage({ params }: Props) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
          Blog Builder
        </p>
        <h1 className="text-2xl font-bold text-white">Edit artikel</h1>
        <p className="text-white/50 text-sm mt-1">Perbarui konten, urutan blok, atau publish status.</p>
      </div>
      <BlogComposer post={post} />
    </div>
  );
}
