import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (!token?.value && pathname !== '/login') {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token?.value && pathname === "/login") {
    return NextResponse.redirect(new URL("/books", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/books/:path*", "/profile/:path*", "/login"],
};
