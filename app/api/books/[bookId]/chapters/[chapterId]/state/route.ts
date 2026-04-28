import { serverApi } from "@/lib/server-api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;
  const { data, error } = await serverApi.get<{
    status: string;
    plan: string | null;
    draft: string | null;
  }>(`/api/books/${bookId}/chapters/${chapterId}/state`);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
