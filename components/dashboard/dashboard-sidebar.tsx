"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    api.get<ChaptersResponse>(`/api/books/${bookId}/chapters`).then(({ data }) => {
      if (data) setChapters(data.chapters);
    });
  }, [bookId]);

  if (bookId) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/books" className="text-xs text-fog hover:text-parchment transition-colors">
          ← All books
        </Link>

        <button className="flex items-center gap-2 text-sm text-fog hover:text-parchment transition-colors">
          <span className="text-lg leading-none">+</span>
          Add chapter
        </button>

        <div className="flex flex-col gap-1">
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
