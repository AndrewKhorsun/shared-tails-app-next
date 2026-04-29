import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const localePattern = new RegExp(`^/(${routing.locales.join("|")})`);

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  const pathWithoutLocale = pathname.replace(localePattern, "") || "/";
  const locale = pathname.match(localePattern)?.[1] ?? routing.defaultLocale;

  if (!token?.value && pathWithoutLocale !== "/login") {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (token?.value && pathWithoutLocale === "/login") {
    return NextResponse.redirect(new URL(`/${locale}/books`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
