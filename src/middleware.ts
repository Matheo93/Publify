// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale, ValidLocale } from './i18n/config';

function getLocaleFromRequest(request: NextRequest): ValidLocale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  try {
    if (!negotiatorHeaders['accept-language']) {
      return defaultLocale;
    }

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const locale = matchLocale(languages, locales, defaultLocale);
    return locale as ValidLocale;
  } catch (error) {
    console.warn('Language matching failed:', error);
    return defaultLocale;
  }
}

function validateLocale(pathname: string): boolean {
  const segments = pathname.split('/');
  if (segments.length < 2) return false;
  const localeSegment = segments[1];
  return locales.includes(localeSegment as ValidLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclusion des ressources statiques et des API
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Validation de la locale existante ou ajout si manquante
  const pathnameHasValidLocale = validateLocale(pathname);
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (!pathnameHasValidLocale || pathnameIsMissingLocale) {
    const locale = getLocaleFromRequest(request);
    const newUrl = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    );
    newUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};