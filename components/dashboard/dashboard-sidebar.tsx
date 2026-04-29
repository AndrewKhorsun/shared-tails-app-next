"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, BookOpen, FileText, Plus, ScrollText } from "lucide-react";
import { api } from "@/lib/api";
import { Chapter, ChaptersResponse } from "@/types";
import { ChapterLink } from "./chapter-link";
import { CreateChapterModal } from "../chapters/create-chapter-modal";
import { Tooltip } from "../ui/tooltip";

export function DashboardSidebar({ bookId }: { bookId: string }) {
  const t = useTranslations("DashboardSidebar");
  const path = usePathname();

  const bookHref = `/books/${bookId}`;
  const bookPlanHref = `/books/${bookId}/book-plan`;
  const isBookActive = path === bookHref;
  const isBookPlanActive = path === bookPlanHref;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isCreateChapterModalOpen, setIsCreateChapterModalOpen] = useState(false);

  const fetchChapters = useCallback(() => {
    api
      .get<ChaptersResponse>(`/api/books/${bookId}/chapters`)
      .then(({ data }) => {
        if (data) setChapters(data.chapters);
      });
  }, [bookId]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  return (
    <div className="flex flex-col gap-1">
      <Tooltip content={t("allBooks")}>
        <Link
          href="/books"
          className="flex items-center gap-2 text-xs text-fog hover:text-parchment transition-colors py-1.5 px-2 rounded-lg hover:bg-elevated mb-2"
        >
          <ArrowLeft size={13} className="shrink-0" />
          <span className="hidden sm:inline">{t("allBooks")}</span>
        </Link>
      </Tooltip>

      <Tooltip content={t("book")}>
        <Link
          href={bookHref}
          className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated ${isBookActive ? "text-amber" : "text-fog"}`}
        >
          <BookOpen size={14} className="shrink-0" />
          <span className="hidden sm:inline">{t("book")}</span>
        </Link>
      </Tooltip>

      <Tooltip content={t("bookPlan")}>
        <Link
          href={bookPlanHref}
          className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:bg-elevated ${isBookPlanActive ? "text-amber" : "text-fog"}`}
        >
          <ScrollText size={14} className="shrink-0" />
          <span className="hidden sm:inline">{t("bookPlan")}</span>
        </Link>
      </Tooltip>

      <div className="border-t border-border-soft my-2" />

      <div className="flex items-center justify-between px-2 mb-1">
        <span className="flex items-center gap-2 text-xs text-fog/60 uppercase tracking-wider">
          <FileText size={12} className="shrink-0" />
          <span className="hidden sm:inline">{t("chapters")}</span>
        </span>

        <Tooltip content={t("addChapter")}>
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
          <ChapterLink key={chapter.id} chapter={chapter} bookId={bookId} onRefresh={fetchChapters} />
        ))}
      </div>

      <CreateChapterModal
        bookId={bookId}
        isOpen={isCreateChapterModalOpen}
        onClose={() => setIsCreateChapterModalOpen(false)}
        onCreated={fetchChapters}
        orderIndex={chapters.length}
      />
    </div>
  );
}
