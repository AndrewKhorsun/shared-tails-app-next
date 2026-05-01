import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default async function WithSidebarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return (
    <div className="flex">
      <aside className="w-12 sm:w-64 bg-surface border-r border-border-soft p-3 sm:p-6 shrink-0">
        <DashboardSidebar bookId={bookId} />
      </aside>
      <div className="flex-1 p-4 sm:p-6 min-w-0">
        {children}
      </div>
    </div>
  );
}
