import Link from "next/link";
import { Book } from "@/types";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col gap-2 p-4 rounded-xl bg-surface hover:bg-elevated transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-parchment text-base leading-snug group-hover:text-amber transition-colors line-clamp-2">
          {book.title}
        </h3>
        <span className="shrink-0 text-xs text-fog bg-elevated group-hover:bg-surface transition-colors rounded-full px-2 py-0.5">
          ★ {parseFloat(book.rating).toFixed(1)}
        </span>
      </div>

      <p className="text-sm font-light text-fog line-clamp-2 leading-relaxed">
        {book.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 text-xs text-fog/60">
        <span>{book.author_name}</span>
        <span>{book.views} views</span>
      </div>
    </Link>
  );
}
