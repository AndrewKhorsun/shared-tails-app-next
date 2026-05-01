"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChapterContent } from "@/components/chapters/chapter-content";
import { GenerationPanel } from "@/components/chapters/generation-panel";

interface ChapterViewProps {
  bookId: string;
  chapterId: string;
  initialContent: string;
}

export function ChapterView({ bookId, chapterId, initialContent }: ChapterViewProps) {
  const router = useRouter();

  const handleContentGenerated = useCallback(() => {
    router.refresh();
  }, [router]);

  if (!initialContent) {
    return (
      <div className="p-12 max-w-4xl mx-auto w-full">
        <GenerationPanel
          bookId={bookId}
          chapterId={chapterId}
          onContentGenerated={handleContentGenerated}
        />
      </div>
    );
  }

  return (
    <ChapterContent
      bookId={bookId}
      chapterId={chapterId}
      initialContent={initialContent}
    />
  );
}
