import { serverApi } from "@/lib/server-api";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;
  const body: { hint?: string } = await request.json();
  const { data, error } = await serverApi.post<{ status: string }>(
    `/api/books/${bookId}/chapters/${chapterId}/generate`,
    body,
  );

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
