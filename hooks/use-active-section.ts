import { useState, useEffect, useRef } from "react";

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0]);
  const observers = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    observers.current.forEach((o) => o.disconnect());
    observers.current = [];

    const visible = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
          if (visible.size > 0) {
            const top = [...visible.entries()].sort((a, b) => {
              const elA = document.getElementById(a[0]);
              const elB = document.getElementById(b[0]);
              return (elA?.getBoundingClientRect().top ?? 0) - (elB?.getBoundingClientRect().top ?? 0);
            });
            setActiveId(top[0][0]);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 1] }
      );
      observer.observe(el);
      observers.current.push(observer);
    });

    return () => observers.current.forEach((o) => o.disconnect());
  }, [ids.join(",")]);

  return activeId;
}
