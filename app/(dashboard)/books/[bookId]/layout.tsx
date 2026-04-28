import { use } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = use(params);

  return (
    <div className="flex -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-12 sm:w-64 bg-surface border-r border-border-soft p-3 sm:p-6 shrink-0">
        <DashboardSidebar bookId={bookId} />
      </aside>
      <div className="flex-1 p-4 sm:p-6 min-w-0">
        {children}
      </div>
    </div>
  );
}
