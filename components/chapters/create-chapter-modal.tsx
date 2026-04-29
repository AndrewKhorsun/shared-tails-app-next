"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { Modal } from "@/components/ui/modal";
import { Chapter } from "@/types/chapters";

interface CreateChapterModalProps {
  bookId: string;
  onClose?: () => void;
  onCreated?: () => void;
  isOpen?: boolean;
  orderIndex: number;
}

export function CreateChapterModal({
  bookId,
  isOpen = false,
  onClose,
  onCreated,
  orderIndex,
}: CreateChapterModalProps) {
  const t = useTranslations("CreateChapterModal");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    onClose?.();
    setTitle("");
    setError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await api.post<{ chapter: Chapter }>(
      `/api/books/${bookId}/chapters`,
      {
        title,
        order_index: orderIndex + 1,
      },
    );

    setIsLoading(false);

    if (error) {
      setError(error);
      return;
    }

    handleClose();
    onCreated?.();
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("modalTitle")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-fog font-light">{t("titleLabel")}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder={t("titlePlaceholder")}
            className="bg-surface rounded-lg px-3 py-2 text-sm text-parchment placeholder:text-fog/40 outline-none focus:ring-1 focus:ring-fog/30 transition"
          />
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm bg-amber-dim text-parchment hover:bg-amber transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? t("creating") : t("create")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
