import { Book } from "@/types";
import { BookCard } from "./book-card";
import { CreateBookModal } from "./create-book-modal";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}

      <CreateBookModal />
    </div>
  );
}
