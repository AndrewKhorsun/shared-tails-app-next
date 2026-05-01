"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Book } from "@/types";
import { useRouter } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { Modal } from "@/components/ui/modal";

interface ShelfRowProps {
  book: Book;
}

export function ShelfRow({ book }: ShelfRowProps) {
  const tGrid = useTranslations("BookGrid");
  const tCard = useTranslations("BookCard");
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { error } = await api.put<Book>(`/api/books/${book.id}`, { title, description });
    setIsLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setEditOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await api.delete<Book>(`/api/books/${book.id}`);
    setIsLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDeleteOpen(false);
    router.refresh();
  };

  return (
    <>
      <Link
        href={`/books/${book.id}`}
        className="flex items-center gap-4 hover:bg-surface/50 border-b border-border-soft px-5 py-4 transition-colors"
      >
        <div className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-parchment line-clamp-1">{book.title}</h3>
          <p className="text-xs text-fog line-clamp-1">{book.description}</p>
        </div>

        <p className="font-mono text-sm text-fog flex-shrink-0">
          {book.published_chapters || 0} / {book.total_chapters || 0} {tGrid("chaptersShort")}
        </p>

        <p className="font-mono text-[11px] text-fog flex-shrink-0">
          {new Date(book.updated_at).toLocaleDateString()}
        </p>

        <div ref={dropdownRef} className="relative flex-shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
            className="p-1 rounded-lg text-fog hover:text-parchment hover:bg-elevated transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-surface border border-border-soft rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditOpen(true);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-fog hover:text-parchment hover:bg-elevated transition-colors text-left"
              >
                <Pencil size={14} />
                Edit
              </button>
              <div className="border-t border-border-soft" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteOpen(true);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rust hover:text-amber hover:bg-elevated transition-colors text-left"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </Link>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title={tCard("editModalTitle")}>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-fog font-light">{tCard("titleLabel")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-surface rounded-lg px-3 py-2 text-sm text-parchment placeholder:text-fog/40 outline-none focus:ring-1 focus:ring-fog/30 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-fog font-light">{tCard("descriptionLabel")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-surface rounded-lg px-3 py-2 text-sm text-parchment placeholder:text-fog/40 outline-none focus:ring-1 focus:ring-fog/30 transition resize-none"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer"
            >
              {tCard("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-sm bg-amber-dim text-parchment hover:bg-amber transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? tCard("saving") : tCard("save")}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title={tCard("deleteModalTitle")}>
        <p className="text-sm text-fog">
          {tCard("deleteConfirmPrefix")} <span className="text-parchment">&ldquo;{book.title}&rdquo;</span>? {tCard("deleteCannotUndo")}
        </p>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setDeleteOpen(false)}
            className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer"
          >
            {tCard("cancel")}
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm bg-red-900/60 text-red-300 hover:bg-red-900 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? tCard("deleting") : tCard("delete")}
          </button>
        </div>
      </Modal>
    </>
  );
}
