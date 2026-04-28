import { serverApi } from "@/lib/server-api";
import { Chapter } from "@/types";
import { notFound } from "next/navigation";
import { ChapterContent } from "@/components/chapters/chapter-content";
import { ChapterView } from "@/components/chapters/chapter-view";

interface BookPageProps {
  params: Promise<{ bookId: string; chapterId: string }>;
}

export default async function ChapterPage({ params }: BookPageProps) {
  const { bookId, chapterId } = await params;
  const { data, error } = await serverApi.get<{ chapter: Chapter }>(
    `/api/books/${bookId}/chapters/${chapterId}`,
  );

  if (error) {
    return <p className="text-fog text-sm">{error}</p>;
  }
  const { chapter } = data || {};

  if (!chapter) {
    notFound();
  }

  return (
    <div className="flex gap-4 flex-col">
      <h1>{chapter.title}</h1>
      <ChapterView
        bookId={bookId}
        chapterId={chapterId}
        initialContent={chapter.content}
      />
    </div>
  );
}
