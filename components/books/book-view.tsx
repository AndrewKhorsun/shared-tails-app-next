import Link from "next/link";
import { Book } from "@/types";

interface BookViewProps {
  book: Book;
}

export function BookView({ book }: BookViewProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-parchment text-3xl leading-snug">
          {book.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-fog font-light">
          <span>{book.author_name}</span>
          <span>·</span>
          <span>★ {parseFloat(book.rating).toFixed(1)}</span>
          <span>·</span>
          <span>{book.views} views</span>
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
