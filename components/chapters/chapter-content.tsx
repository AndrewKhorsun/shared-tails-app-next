"use client";

import { useCallback, useRef, useState } from "react";
import { api } from "@/lib/api";
import { ChapterEditor } from "@/components/chapters/chapter-editor";

interface ChapterContentProps {
  bookId: string;
  chapterId: string;
  initialContent: string;
}

export function ChapterContent({ bookId, chapterId, initialContent }: ChapterContentProps) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (content: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(async () => {
        setSaveState("saving");
        const { error } = await api.put(`/api/books/${bookId}/chapters/${chapterId}`, { content });
        setSaveState(error ? "error" : "saved");
        setTimeout(() => setSaveState("idle"), 2000);
      }, 1000);
    },
    [bookId, chapterId],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end h-4 text-xs">
        {saveState === "saving" && <span className="text-moss">Saving...</span>}
        {saveState === "saved" && <span className="text-moss">Saved</span>}
        {saveState === "error" && <span className="text-rust">Save failed</span>}
      </div>
      <ChapterEditor markdown={initialContent} onChange={handleChange} />
    </div>
  );
}
