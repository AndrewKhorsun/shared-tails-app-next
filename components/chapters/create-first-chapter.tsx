"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CreateChapterModal } from "@/components/chapters/create-chapter-modal";

interface CreateFirstChapterProps {
  bookId: string;
}

export function CreateFirstChapter({ bookId }: CreateFirstChapterProps) {
  const t = useTranslations("CreateFirstChapter");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex flex-col items-center gap-5 text-center cursor-pointer"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-fog/30 flex items-center justify-center text-3xl text-fog/40 group-hover:border-amber group-hover:text-amber transition-colors duration-200">
          ✦
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-serif text-xl text-parchment/80 group-hover:text-parchment transition-colors">
            {t("title")}
          </span>
          <span className="text-sm text-fog/60">
            {t("subtitle")}
          </span>
        </div>
      </button>

      <CreateChapterModal
        bookId={bookId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        orderIndex={0}
      />
    </>
  );
}
