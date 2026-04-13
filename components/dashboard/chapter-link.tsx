"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chapter } from "@/types";

interface ChapterLinkProps {
  chapter: Chapter;
  bookId: string;
}

export function ChapterLink({ chapter, bookId }: ChapterLinkProps) {
  const path = usePathname();
  const href = `/books/${bookId}/chapters/${chapter.id}`;
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={`text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated truncate ${isActive ? "text-amber" : "text-fog"}`}
    >
      {chapter.order_index}. {chapter.title}
    </Link>
  );
}
