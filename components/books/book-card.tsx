"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Book } from "@/types";
import { Modal } from "@/components/ui/modal";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { error } = await api.put<Book>(`/api/books/${book.id}`, { title, description });
    setIsLoading(false);
    if (error) { setError(error); return; }
    setEditOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await api.delete<Book>(`/api/books/${book.id}`);
    setIsLoading(false);
    if (error) { setError(error); return; }
    setDeleteOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="group relative flex flex-col gap-2 p-4 rounded-xl bg-elevated border border-border-soft hover:bg-card hover:border-border-mid transition-colors">
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditOpen(true)}
            className="p-1.5 rounded-lg text-fog hover:text-parchment hover:bg-surface transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setDeleteOpen(true)}
            className="p-1.5 rounded-lg text-fog hover:text-red-400 hover:bg-surface transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>

        <Link href={`/books/${book.id}`} className="flex flex-col gap-2 min-h-35">
          <h3 className="font-serif text-parchment text-base leading-snug group-hover:text-amber transition-colors line-clamp-2 pr-14">
            {book.title}
          </h3>

          <p className="text-sm font-light text-fog line-clamp-3 leading-relaxed">
            {book.description}
          </p>
        </Link>
      </div>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit book">
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-fog font-light">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-surface rounded-lg px-3 py-2 text-sm text-parchment placeholder:text-fog/40 outline-none focus:ring-1 focus:ring-fog/30 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-fog font-light">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-surface rounded-lg px-3 py-2 text-sm text-parchment placeholder:text-fog/40 outline-none focus:ring-1 focus:ring-fog/30 transition resize-none"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 rounded-lg text-sm bg-amber-dim text-parchment hover:bg-amber transition-colors disabled:opacity-50 cursor-pointer">
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete book">
        <p className="text-sm text-fog">
          Are you sure you want to delete <span className="text-parchment">"{book.title}"</span>? This cannot be undone.
        </p>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={() => setDeleteOpen(false)} className="px-4 py-2 rounded-lg text-sm text-fog hover:text-parchment transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={isLoading} className="px-4 py-2 rounded-lg text-sm bg-red-900/60 text-red-300 hover:bg-red-900 transition-colors disabled:opacity-50 cursor-pointer">
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}
