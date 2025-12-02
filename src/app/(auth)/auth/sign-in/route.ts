import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  // Coba sebagai form-urlencoded dari tombol provider
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const provider = String(form.get("provider") || "");
    if (provider === "google" || provider === "github") {
      const {
        data: { url },
        error,
      } = await supabase.auth.signInWithOAuth({
        provider: provider as "google" | "github",
        options: {
          redirectTo: `${
            process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
          }/auth/callback`,
        },
      });
      if (error)
        return NextResponse.json({ error: error.message }, { status: 400 });
      if (url) return NextResponse.redirect(url);
      // OAuth succeeded but no redirect URL returned - return error
      return NextResponse.json(
        { error: "OAuth authentication failed: no redirect URL" },
        { status: 500 }
      );
    }
  }

  // Default JSON untuk email/password
  const json = await request.json().catch(() => ({}));
  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    const issues = parsed.error.format();
    const message =
      (issues.email?._errors?.[0] || issues.password?._errors?.[0]) ??
      "Input tidak valid";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const { email, password } = parsed.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json({ ok: true });
}
