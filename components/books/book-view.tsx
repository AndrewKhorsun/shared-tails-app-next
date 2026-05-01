import Link from "next/link";
import { Book } from "@/types";

interface BookViewProps {
  book: Book;
}

export function BookView({ book }: BookViewProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-serif text-parchment text-3xl leading-snug">
            {book.title}
          </h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-fog font-light">
          <span>{book.author_name || "Unknown"}</span>
          <span>·</span>
          <span>★ {book.rating ? parseFloat(book.rating).toFixed(1) : "0"}</span>
          <span>·</span>
          <span>{book.views || 0} views</span>
        </div>
      </div>

      {book.description && (
        <p className="text-fog text-sm font-light leading-relaxed border-l-2 border-fog/20 pl-4">
          {book.description}
        </p>
      )}

      <div className="text-parchment text-[15px] font-light leading-loose whitespace-pre-wrap">
        {book.content}
      </div>
    </div>
  );
}
