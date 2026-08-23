import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ADMIN_ROUTES = ['/admin']
const PUBLIC_ADMIN_ROUTES = ['/admin/login']
const API_ROUTES = ['/api']
// Public API routes that don't require authentication (login, logout, etc.)
const PUBLIC_API_ROUTES = ['/api/admin/auth/login', '/api/admin/auth/logout', '/api/upload']

/**
 * Legacy/stale URLs → their current canonical page, issued as real 301s.
 * `/aesthetics` used to live at `src/app/(marketing)/aesthetics/page.tsx`
 * calling `redirect()`, which is a 307 — a permanent redirect stuck on a
 * temporary status code is exactly the "long-term 302/307 hurts SEO" issue
 * these were flagged for, so it's handled here instead and that page removed.
 */
const EXTERNAL_REDIRECTS: Record<string, string> = {
  '/aesthetics': 'https://www.savannahskinmed.com/',
}

const PATH_REDIRECTS: Record<string, string> = {
  '/bhrt-male': '/bioidentical-hormone-replacement-therapy/male',
  '/bhrt-female': '/bioidentical-hormone-replacement-therapy/female',
  '/platelet-rich-plasma-therapy': '/platelet-rich-plasma-hair',
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- Force https + canonical (www) host on production traffic ---
  // Vercel already terminates TLS, but a client that reaches the origin over
  // plain http, or the bare `agemanagementmed.com` host (client audit asked
  // for this — see docx "Additional 301s"), gets bounced with a real 301
  // rather than served insecurely or under the wrong host.
  //
  // The redirect target is built from the *incoming* Host header rather than
  // `request.nextUrl.clone()`: on at least one deployment target, hitting the
  // app directly by IP still resolves `nextUrl.host` to "localhost"
  // regardless of the real host requested, which turned this into a
  // dead-end redirect to `https://localhost:3000/`. Reading the header
  // directly sidesteps that.
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const isInsecure = forwardedProto ? forwardedProto !== 'https' : request.nextUrl.protocol === 'http:'
  const incomingHost = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.host
  const canonicalHost = incomingHost === 'agemanagementmed.com' ? 'www.agemanagementmed.com' : incomingHost
  const isWrongHost = incomingHost !== canonicalHost

  if (process.env.NODE_ENV === 'production' && (isInsecure || isWrongHost)) {
    const secureUrl = new URL(`${pathname}${request.nextUrl.search}`, `https://${canonicalHost}`)
    return NextResponse.redirect(secureUrl, 301)
  }

  // --- Legacy URL redirects ---
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const externalTarget = EXTERNAL_REDIRECTS[normalizedPath]
  if (externalTarget) {
    return NextResponse.redirect(externalTarget, 301)
  }
  const internalTarget = PATH_REDIRECTS[normalizedPath]
  if (internalTarget) {
    return NextResponse.redirect(new URL(internalTarget, request.url), 301)
  }

  // Only protect /admin and /api routes
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isApiRoute = API_ROUTES.some((route) => pathname.startsWith(route))
  const isPublicApiRoute = PUBLIC_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // For admin/api routes: handle auth (no SEO header needed)
  if (isAdminRoute || isApiRoute) {
    // Allow public admin routes (login page, etc.)
    if (isPublicAdminRoute) {
      return NextResponse.next()
    }

    // Allow public API routes (login endpoint, upload endpoint, etc.)
    if (isPublicApiRoute) {
      return NextResponse.next()
    }

    // Check for session token in cookie
    const sessionCookie = request.cookies.get('session')
    if (!sessionCookie?.value) {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the JWT token
    const payload = await verifyToken(sessionCookie.value)
    if (!payload) {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.next()
  }

  // For public pages: add X-Robots-Tag header for SEO
  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'index, follow')
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*', '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
