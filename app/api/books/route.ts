import { serverApi } from "@/lib/server-api";
import { BooksResponse } from "@/types/books";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { data, error } = await serverApi.get<BooksResponse>("/api/books");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await serverApi.post<BooksResponse>(
    "/api/books",
    body,
  );

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
