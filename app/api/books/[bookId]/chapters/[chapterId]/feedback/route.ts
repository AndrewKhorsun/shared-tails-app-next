import { serverApi } from "@/lib/server-api";
import { Chapter } from "@/types";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;
  const body: { approved: boolean; feedback?: string } = await request.json();

  if (typeof body.approved !== "boolean") {
    return NextResponse.json(
      { error: "Field 'approved' is required and must be a boolean." },
      { status: 400 },
    );
  }
  
  const { data, error } = await serverApi.post<{
    message: string;
    chapter: Chapter;
  }>(`/api/books/${bookId}/chapters/${chapterId}/feedback`, body);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
