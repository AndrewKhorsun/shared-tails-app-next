import { redirect } from "next/navigation";
import { TopNav } from "@/components/dashboard/topnav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { User } from "@/types/auth";
import { serverApi } from "@/lib/server-api";
import { SocketProvider } from "@/components/dashboard/socket-provider";

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
    <SocketProvider userId={data.user.id}>
      <div className="min-h-screen flex flex-col">
        <TopNav user={user} />
        <div className="flex-1 flex">
          <aside className="w-12 sm:w-64 bg-surface border-r border-border-soft p-3 sm:p-6 shrink-0">
            <DashboardSidebar />
          </aside>
          <main className="flex-1 p-4 sm:p-6 min-w-0 bg-elevated">
            {children}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
