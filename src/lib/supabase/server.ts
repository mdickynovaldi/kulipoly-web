import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Pastikan variabel env terisi."
    );
  }

  return { url, anonKey };
}

/**
 * Untuk Server Actions dan Route Handlers yang memerlukan modifikasi cookies
 * (login, logout, auth callback, dll)
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set(name, value, options);
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set(name, "", { ...options, maxAge: 0 });
      },
    },
  });
}

/**
 * Untuk Server Components yang hanya perlu membaca data (read-only)
 * Tidak bisa memodifikasi cookies (set/remove diabaikan)
 */
export async function createSupabaseServerClientReadOnly() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {
        // Tidak bisa set cookies di Server Component - diabaikan
      },
      remove() {
        // Tidak bisa remove cookies di Server Component - diabaikan
      },
    },
  });
}
