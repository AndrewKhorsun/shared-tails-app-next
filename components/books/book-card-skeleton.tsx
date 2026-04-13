export function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="h-4 bg-elevated rounded w-2/3" />
        <div className="h-4 bg-elevated rounded w-10 shrink-0" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3 bg-elevated rounded w-full" />
        <div className="h-3 bg-elevated rounded w-4/5" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-3 bg-elevated rounded w-1/4" />
        <div className="h-3 bg-elevated rounded w-1/5" />
      </div>
    </div>
  );
}
