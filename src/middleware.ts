import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

const LANG_COOKIE_NAME = "preferredLanguage";
const locales = ["en-US", "de-DE", "de"] as const;
export type SupportedLocales = (typeof locales)[number];
export type Dictionary<T extends Record<string, string>> = {
  [locale in SupportedLocales]: T;
};

const setPreferredLanguage = (request: NextRequest, fallbackLang: string) => {
  const cookieLocale = request.cookies.get(LANG_COOKIE_NAME)?.value;
  const locale = cookieLocale ?? fallbackLang;
  const { pathname } = request.nextUrl;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  if (cookieLocale) return response;
  response.cookies.set(LANG_COOKIE_NAME, locale);
  return response;
};

const getAcceptedLanguages = (request: NextRequest) => {
  if (!request.headers) return [];
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return [];
  const headers = { "accept-language": acceptLanguage };
  return new Negotiator({ headers }).languages();
};

// Get the preferred locale from request headers
function getLocale(request: NextRequest): string {
  const languages = getAcceptedLanguages(request);
  const defaultLocale = "en-US";
  return match(languages, locales, defaultLocale);
}

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in pathname, redirect to the appropriate locale path
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    return setPreferredLanguage(request, locale);
  }
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default middleware;
