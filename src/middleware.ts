import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ADMIN_ROUTES = ['/admin']
const PUBLIC_ADMIN_ROUTES = ['/admin/login']
const API_ROUTES = ['/api']
// Public API routes that don't require authentication (login, logout, etc.)
const PUBLIC_API_ROUTES = ['/api/admin/auth/login', '/api/admin/auth/logout', '/api/upload']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin and /api routes
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isApiRoute = API_ROUTES.some((route) => pathname.startsWith(route))
  const isPublicApiRoute = PUBLIC_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (!isAdminRoute && !isApiRoute) {
    return NextResponse.next()
  }

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

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
