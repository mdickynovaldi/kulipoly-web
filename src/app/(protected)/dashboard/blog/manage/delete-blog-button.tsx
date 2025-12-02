"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/lib/actions/blog";

type Props = {
  id: string;
};

export default function DeleteBlogButton({ id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Hapus blog ini?")) return;
    startTransition(async () => {
      const result = await deleteBlogPost(id);
      if (!result.success) {
        alert(result.error ?? "Gagal menghapus");
        return;
      }
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-400 hover:text-red-300 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
