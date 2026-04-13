import { serverApi } from "@/lib/server-api";
import { ChaptersResponse } from "@/types/chapters";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string }> },
) {
  const { bookId } = await params;
  const { data, error } = await serverApi.get<ChaptersResponse>(`/api/books/${bookId}/chapters`);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
