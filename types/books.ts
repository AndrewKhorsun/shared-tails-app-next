export interface Book {
  id: number;
  title: string;
  description: string;
  content: string;
  author_id: number;
  author_name: string;
  created_at: string;
  updated_at: string;
  category_id: number | null;
  rating: string;
  views: number;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}
