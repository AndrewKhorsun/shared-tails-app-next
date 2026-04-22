import { serverApi } from "@/lib/server-api";
import { Chapter } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;
  const { data, error } = await serverApi.get<{
    chapter: Chapter;
  }>(`/api/books/${bookId}/chapters/${chapterId}`);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;
  const body: Partial<Chapter> = await request.json();
  const { data, error } = await serverApi.put<{
    message: string;
    chapter: Chapter;
  }>(`/api/books/${bookId}/chapters/${chapterId}`, body);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ bookId: string; chapterId: string }> },
) {
  const { bookId, chapterId } = await params;

  const { data, error } = await serverApi.delete<{
    message: string;
    chapter: Chapter;
  }>(`/api/books/${bookId}/chapters/${chapterId}`);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
