export default function ChaptersLoading() {
  return (
    <div className="flex overflow-hidden" style={{ height: "calc(100dvh - 52px)" }}>
      {/* Sidebar skeleton */}
      <aside className="w-62 shrink-0 bg-page border-r border-border-soft flex flex-col animate-pulse">
        {/* Back link */}
        <div className="px-3 pt-3 pb-1">
          <div className="h-6 w-24 bg-surface rounded-lg mx-2" />
        </div>

        {/* Book header */}
        <div className="px-4.5 pt-2 pb-3.5 flex flex-col gap-2">
          <div className="h-5 bg-surface rounded w-3/4" />
          <div className="h-3 bg-surface rounded w-1/2" />
        </div>

        {/* Stats */}
        <div className="mx-4.5 mb-3.5 px-3 py-2.5 bg-surface rounded-lg flex justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-12 bg-elevated rounded" />
            <div className="h-4 w-8 bg-elevated rounded" />
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <div className="h-2 w-10 bg-elevated rounded" />
            <div className="h-4 w-10 bg-elevated rounded" />
          </div>
        </div>

        {/* Book nav */}
        <div className="px-3 flex flex-col gap-1">
          <div className="h-2 w-16 bg-surface rounded mx-3 mb-1" />
          <div className="h-8 bg-surface rounded-lg" />
          <div className="h-8 bg-surface rounded-lg" />
        </div>

        {/* Chapters */}
        <div className="px-3 mt-2.5 flex flex-col gap-1">
          <div className="h-2 w-14 bg-surface rounded mx-3 mb-2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-surface rounded-lg" style={{ opacity: 1 - i * 0.1 }} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto px-4.5 py-3 border-t border-border-soft flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-surface shrink-0" />
          <div className="h-3 bg-surface rounded w-24" />
        </div>
      </aside>

      {/* Editor skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden animate-pulse">
        {/* Toolbar */}
        <div className="h-10 bg-surface border-b border-border-soft shrink-0 flex items-center gap-2 px-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 w-7 bg-elevated rounded" />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-[15%] py-8 flex flex-col gap-3">
          <div className="h-5 bg-surface rounded w-2/3" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-11/12" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-4/5" />
          <div className="mt-4 h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-10/12" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-3/4" />
        </div>
      </main>
    </div>
  );
}
