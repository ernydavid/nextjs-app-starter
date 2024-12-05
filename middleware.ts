import { type NextRequest, NextResponse } from 'next/server'
import { AUTH_ROUTES, DEFAULT_AUTH_REDIRECT_PAGE, DEFAULT_UNAUTH_REDIRECT_PAGE, PROTECTED_ROUTE_PREFIX } from '@/middleware-routes'
import { getSession } from './lib/sessions'

export default async function middleware (req: NextRequest) {
  // 1. check is route is protected or public
  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = currentPath.startsWith(PROTECTED_ROUTE_PREFIX)
  const isAuthRoute = AUTH_ROUTES.includes(currentPath)

  // 2. Decrypt the session from cookie
  const session = await getSession()

  if (isProtectedRoute && !session) {
    // redirect unauth users
    return NextResponse.redirect(new URL(DEFAULT_UNAUTH_REDIRECT_PAGE, req.nextUrl))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT_PAGE, req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
