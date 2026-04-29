import { serverApi } from "@/lib/server-api";
import { Book } from "@/types";
import { notFound } from "next/navigation";
import { BookView } from "@/components/books/book-view";

interface BookPageProps {
  params: Promise<{ bookId: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const { data: book, error } = await serverApi.get<Book>(`/api/books/${bookId}`);

  if (error) {
    return <p className="text-fog text-sm">{error}</p>;
  }

  if (!book) {
    notFound();
  }

  return <BookView book={book} />;
}
