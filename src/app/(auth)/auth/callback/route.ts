import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  try {
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    if (!user) {
      return NextResponse.redirect(new URL("/login", base));
    }
    return NextResponse.redirect(new URL("/dashboard", base));
  } catch {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    return NextResponse.redirect(new URL("/login?error=callback", base));
  }
}
