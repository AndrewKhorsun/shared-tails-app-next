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
  const [isDirty, setIsDirty] = useState(false);
  const contentRef = useRef<string>(initialContent);

  const handleChange = useCallback((content: string) => {
    contentRef.current = content;
    setIsDirty(content !== initialContent);
  }, [initialContent]);

  const handleSave = useCallback(async () => {
    setSaveState("saving");
    const { error } = await api.put(`/api/books/${bookId}/chapters/${chapterId}`, { content: contentRef.current });
    if (error) {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
      return;
    }
    setSaveState("saved");
    setIsDirty(false);
    setTimeout(() => setSaveState("idle"), 2000);
  }, [bookId, chapterId]);

  return (
    <div className="h-full">
      <ChapterEditor
        markdown={initialContent}
        onChange={handleChange}
        onSave={handleSave}
        isDirty={isDirty}
        saveState={saveState}
      />
    </div>
  );
}
