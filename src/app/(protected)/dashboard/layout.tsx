import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/layout/sidebar/dashboard-sidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Kulipoly Admin",
  description: "Admin dashboard for managing Kulipoly content",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardSidebar user={user} />
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

