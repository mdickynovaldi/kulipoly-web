"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInWithEmailPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" } as const;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message } as const;
  }

  redirect("/dashboard");
}

export async function signInWithProvider(provider: "google" | "github") {
  const supabase = await createSupabaseServerClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
      }/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message } as const;
  }

  if (url) {
    redirect(url);
  }
}
