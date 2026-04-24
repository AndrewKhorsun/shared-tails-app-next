"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, FileText, Plus, ScrollText } from "lucide-react";
import { api } from "@/lib/api";
import { Chapter, ChaptersResponse } from "@/types";
import { NavLink } from "./nav-link";
import { ChapterLink } from "./chapter-link";
import { CreateChapterModal } from "../chapters/create-chapter-modal";
import { Tooltip } from "../ui/tooltip";

export function DashboardSidebar() {
  const path = usePathname();

  const bookMatch = path.match(/^\/books\/(\d+)/);
  const bookId = bookMatch ? bookMatch[1] : null;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isCreateChapterModalOpen, setIsCreateChapterModalOpen] =
    useState(false);

  const fetchChapters = (id: string) => {
    api
      .get<ChaptersResponse>(`/api/books/${id}/chapters`)
      .then(({ data }) => {
        if (data) setChapters(data.chapters);
      });
  };

  useEffect(() => {
    if (!bookId) return;
    fetchChapters(bookId);
  }, [bookId]);

  if (bookId) {
    const bookHref = `/books/${bookId}`;
    const bookPlanHref = `/books/${bookId}/book-plan`;
    const isBookActive = path === bookHref;
    const isBookPlanActive = path === bookPlanHref;

    return (
      <div className="flex flex-col gap-1">
        <Tooltip content="All books">
          <Link
            href="/books"
            className="flex items-center gap-2 text-xs text-fog hover:text-parchment transition-colors py-1.5 px-2 rounded-lg hover:bg-elevated mb-2"
          >
            <ArrowLeft size={13} className="shrink-0" />
            <span className="hidden sm:inline">All books</span>
          </Link>
        </Tooltip>

        <Tooltip content="Book">
          <Link
            href={bookHref}
            className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated ${isBookActive ? "text-amber" : "text-fog"}`}
          >
            <BookOpen size={14} className="shrink-0" />
            <span className="hidden sm:inline">Book</span>
          </Link>
        </Tooltip>

        <Tooltip content="Book plan">
          <Link
            href={bookPlanHref}
            className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated ${isBookPlanActive ? "text-amber" : "text-fog"}`}
          >
            <ScrollText size={14} className="shrink-0" />
            <span className="hidden sm:inline">Book plan</span>
          </Link>
        </Tooltip>

        <div className="border-t border-border-soft my-2" />

        <div className="flex items-center justify-between px-2 mb-1">
          <span className="flex items-center gap-2 text-xs text-fog/60 uppercase tracking-wider">
            <FileText size={12} className="shrink-0" />
            <span className="hidden sm:inline">Chapters</span>
          </span>

          <Tooltip content="Add new chapter">
            <button
              className="text-fog hover:text-parchment transition-colors cursor-pointer"
              onClick={() => setIsCreateChapterModalOpen(true)}
            >
              <Plus size={16} />
            </button>
          </Tooltip>
        </div>

        <div className="flex flex-col gap-0.5">
          {chapters.map((chapter) => (
            <ChapterLink key={chapter.id} chapter={chapter} bookId={bookId} />
          ))}
        </div>
        <CreateChapterModal
          bookId={bookId}
          isOpen={isCreateChapterModalOpen}
          onClose={() => setIsCreateChapterModalOpen(false)}
          onCreated={() => fetchChapters(bookId)}
          orderIndex={chapters.length}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <NavLink href="/books" icon={BookOpen}>Books</NavLink>
      <NavLink href="/profile" icon={ScrollText}>Profile</NavLink>
    </div>
  );
}
