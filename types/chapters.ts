export interface Chapter {
  id: number;
  book_id: number;
  title: string;
  content: string;
  order_index: number;
  status: "draft" | "published" | "archived";
  plan: string;
  created_at: string;
  updated_at: string;
}

export interface ChaptersResponse {
  chapters: Chapter[];
  total: number;
}

export interface CreateChapter {
  title: string;
  content?: string;
  order_index?: number;
  plan?: string;
}
