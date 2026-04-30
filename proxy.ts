import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const localePattern = new RegExp(`^/(${routing.locales.join("|")})`);

function getBaseUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const pathWithoutLocale = pathname.replace(localePattern, "") || "/";
  const locale = pathname.match(localePattern)?.[1] ?? routing.defaultLocale;

  const baseUrl = getBaseUrl(request);

  if (!token?.value && pathWithoutLocale !== "/login") {
    return NextResponse.redirect(new URL(`/${locale}/login`, baseUrl));
  }

  if (token?.value && pathWithoutLocale === "/login") {
    return NextResponse.redirect(new URL(`/${locale}/books`, baseUrl));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)"],
};
