export default function BookLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div className="h-4 bg-surface rounded w-24" />

      <div className="flex flex-col gap-2">
        <div className="h-8 bg-surface rounded w-2/3" />
        <div className="flex gap-3">
          <div className="h-3 bg-surface rounded w-20" />
          <div className="h-3 bg-surface rounded w-12" />
          <div className="h-3 bg-surface rounded w-16" />
        </div>
      </div>

      <div className="h-12 bg-surface rounded w-full" />

      <div className="flex flex-col gap-2">
        {[90, 100, 95, 88, 100, 92, 97, 85].map((w, i) => (
          <div key={i} className="h-3 bg-surface rounded" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
