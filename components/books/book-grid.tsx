import { Book } from "@/types";
import { BookCard } from "./book-card";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}

      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface hover:bg-elevated transition-colors text-fog hover:text-parchment border border-dashed border-fog/20 hover:border-fog/40 min-h-[120px]">
        <span className="text-2xl leading-none">+</span>
        <span className="text-sm font-light">New Book</span>
      </button>
    </div>
  );
}
