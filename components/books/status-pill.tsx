interface StatusPillProps {
  status: "draft" | "published" | "archived" | "generating";
}

export function StatusPill({ status }: StatusPillProps) {
  const styles = {
    published: "bg-moss/20 text-moss border border-moss/30",
    draft: "bg-amber/10 text-amber border border-amber/20",
    generating: "bg-amber/10 text-amber border border-amber/20 animate-ai-pulse",
    archived: "bg-surface text-fog border border-border-soft",
  };

  const labels = {
    published: "Published",
    draft: "Draft",
    generating: "Generating",
    archived: "Archived",
  };

  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
