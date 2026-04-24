"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { Chapter } from "@/types";
import { Tooltip } from "@/components/ui/tooltip";

interface ChapterLinkProps {
  chapter: Chapter;
  bookId: string;
}

export function ChapterLink({ chapter, bookId }: ChapterLinkProps) {
  const path = usePathname();
  const href = `/books/${bookId}/chapters/${chapter.id}`;
  const isActive = path === href;

  return (
    <Tooltip content={`${chapter.order_index}. ${chapter.title}`}>
      <Link
        href={href}
        className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated truncate ${isActive ? "text-amber" : "text-fog"}`}
      >
        <FileText size={13} className="shrink-0" />
        <span className="hidden sm:inline truncate">{chapter.order_index}. {chapter.title}</span>
      </Link>
    </Tooltip>
  );
}
