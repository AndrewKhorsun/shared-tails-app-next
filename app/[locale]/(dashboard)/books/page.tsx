import { serverApi } from "@/lib/server-api";
import { BooksResponse } from "@/types/books";
import { BookGrid } from "@/components/books/book-grid";
import { CreateBookModal } from "@/components/books/create-book-modal";
import { getTranslations } from "next-intl/server";

export default async function BooksPage() {
  const t = await getTranslations("BooksPage");
  const { data, error } = await serverApi.get<BooksResponse>("/api/books");

  if (error) {
    return <p className="text-fog text-sm">{error}</p>;
  }

  if (!data || data.books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <p className="font-serif text-parchment text-xl">{t("noBooksTitle")}</p>
        <p className="text-fog text-sm font-light">{t("noBooksSubtitle")}</p>
        <CreateBookModal />
      </div>
    );
  }

  return <BookGrid books={data.books} />;
}
