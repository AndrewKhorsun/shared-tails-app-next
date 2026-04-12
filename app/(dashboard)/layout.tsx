import { redirect } from "next/navigation";
import { TopNav } from "@/components/dashboard/topnav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { User } from "@/types/auth";
import { serverApi } from "@/lib/server-api";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = await serverApi.get<{ user: User }>("/api/auth/me");
  if (error || !data) {
    redirect("/login");
  }
  const { user } = data;

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav user={user} />
      <div className="flex-1 flex">
        <aside className="w-64 bg-surface p-6">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
