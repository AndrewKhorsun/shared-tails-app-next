import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const localePattern = new RegExp(`^/(${routing.locales.join("|")})`);

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL;
}

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const pathWithoutLocale = pathname.replace(localePattern, "") || "/";
  const locale = pathname.match(localePattern)?.[1] ?? routing.defaultLocale;

  const baseUrl = getBaseUrl();
  console.log("Base URL:", baseUrl);
  console.log("Base request.url:", request.url);
  if (!token?.value && pathWithoutLocale !== "/login") {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (token?.value && pathWithoutLocale === "/login") {
    return NextResponse.redirect(new URL(`/${locale}/books`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)"],
};
