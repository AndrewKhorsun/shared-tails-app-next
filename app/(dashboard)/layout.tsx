import { redirect } from "next/navigation";
import { TopNav } from "@/components/dashboard/topnav";
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

  return (
    <SocketProvider userId={data.user.id}>
      <div className="min-h-screen flex flex-col">
        <TopNav user={data.user} />
        <main className="flex-1 p-6 bg-elevated">
          {children}
        </main>
      </div>
    </SocketProvider>
  );
}
