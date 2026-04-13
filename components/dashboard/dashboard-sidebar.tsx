"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, FileText, ScrollText } from "lucide-react";
import { api } from "@/lib/api";
import { Chapter, ChaptersResponse } from "@/types";
import { NavLink } from "./nav-link";
import { ChapterLink } from "./chapter-link";

export function DashboardSidebar() {
  const path = usePathname();

  const bookMatch = path.match(/^\/books\/(\d+)/);
  const bookId = bookMatch ? bookMatch[1] : null;

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (!bookId) return;
    api
      .get<ChaptersResponse>(`/api/books/${bookId}/chapters`)
      .then(({ data }) => {
        if (data) setChapters(data.chapters);
      });
  }, [bookId]);

  if (bookId) {
    const bookPlanHref = `/books/${bookId}/book-plan`;
    const isBookPlanActive = path === bookPlanHref;

    return (
      <div className="flex flex-col gap-1">
        <Link
          href="/books"
          className="flex items-center gap-2 text-xs text-fog hover:text-parchment transition-colors py-1.5 px-2 rounded-lg hover:bg-elevated mb-2"
        >
          <ArrowLeft size={13} />
          All books
        </Link>

        <Link
          href={bookPlanHref}
          className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated ${isBookPlanActive ? "text-amber" : "text-fog"}`}
        >
          <ScrollText size={14} />
          Book plan
        </Link>

        <div className="border-t border-border-soft my-2" />

        <div className="flex items-center justify-between px-2 mb-1">
          <span className="flex items-center gap-2 text-xs text-fog/60 uppercase tracking-wider">
            <FileText size={12} />
            Chapters
          </span>
          <button className="text-fog hover:text-parchment transition-colors">
            <BookOpen size={13} />
          </button>
        </div>

        <div className="flex flex-col gap-0.5">
          {chapters.map((chapter) => (
            <ChapterLink key={chapter.id} chapter={chapter} bookId={bookId} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <NavLink href="/books">Books</NavLink>
      <NavLink href="/profile">Profile</NavLink>
    </div>
  );
}
