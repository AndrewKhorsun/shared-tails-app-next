"use client";

import { useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Chapter } from "@/types";
import { Modal } from "@/components/ui/modal";

interface ChapterLinkProps {
  chapter: Chapter;
  bookId: string;
  onRefresh: () => void;
}

export function ChapterLink({ chapter, bookId, onRefresh }: ChapterLinkProps) {
  const path = usePathname();
  const href = `/books/${bookId}/chapters/${chapter.id}`;
  const isActive = path === href;

  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState(chapter.title);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title === chapter.title) { setRenaming(false); return; }
    setIsLoading(true);
    const { error } = await api.put(`/api/books/${bookId}/chapters/${chapter.id}`, { title });
    setIsLoading(false);
    if (error) { setError(error); return; }
    setRenaming(false);
    onRefresh();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await api.delete(`/api/books/${bookId}/chapters/${chapter.id}`);
    setIsLoading(false);
    if (error) { setError(error); return; }
    setDeleteOpen(false);
    onRefresh();
  };

  if (renaming) {
    return (
      <form onSubmit={handleRenameSubmit} className="px-2 py-1">
        <input
          ref={inputRef}
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRenameSubmit}
          disabled={isLoading}
          className="w-full bg-surface rounded px-2 py-1 text-sm text-parchment outline-none focus:ring-1 focus:ring-fog/30"
        />
      </form>
    );
  }

  return (
    <>
      <div className="group/chapter flex items-center gap-1 rounded-lg hover:bg-elevated transition-colors">
        <Link
          href={href}
          className={`flex items-center gap-2 text-sm py-1.5 pl-2 flex-1 min-w-0 transition-colors truncate ${isActive ? "text-amber" : "text-fog"}`}
        >
          <FileText size={13} className="shrink-0" />
          <span className="hidden sm:inline truncate">{chapter.order_index}. {chapter.title}</span>
        </Link>

        <div className="flex shrink-0 opacity-0 group-hover/chapter:opacity-100 transition-opacity pr-1">
          <button
            onClick={() => setRenaming(true)}
            className="p-1 text-fog hover:text-parchment transition-colors"
          >
            <Pencil size={11} />
          </button>
          <button
            onClick={() => { setError(null); setDeleteOpen(true); }}
            className="p-1 text-fog hover:text-red-400 transition-colors"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete chapter">
        <p className="text-sm text-fog">
          Delete <span className="text-parchment">"{chapter.title}"</span>?
        </p>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteOpen(false)}
            className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm bg-red-900/60 text-red-300 hover:bg-red-900 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}
