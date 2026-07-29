import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt-ts'
import { cookies, headers } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-me'
)

const COOKIE_NAME = 'session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthPayload extends JWTPayload {
  adminId: string
  email: string
  name: string
  role: string
}

/* ── Password hashing ──────────────────────────────────────────────── */

export async function hashPassword(password: string): Promise<string> {
  return bcryptHash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptCompare(password, hash)
}

/* ── JWT token management ─────────────────────────────────────────── */

export async function createToken(payload: AuthPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyToken(
  token: string
): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AuthPayload
  } catch {
    return null
  }
}

/* ── Cookie management ────────────────────────────────────────────── */

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  const hdrs = await headers()

  // `NODE_ENV === 'production'` doesn't mean the request was served over
  // HTTPS — e.g. a VPS accessed directly by IP:port before a TLS-terminating
  // reverse proxy is put in front. A `Secure` cookie set over plain HTTP is
  // silently dropped by the browser, which breaks login without any visible
  // error. Detect the real scheme instead: trust `x-forwarded-proto` (set by
  // a reverse proxy terminating TLS) and fall back to a direct HTTPS check.
  const forwardedProto = hdrs.get('x-forwarded-proto')
  const isHttps = forwardedProto === 'https' || hdrs.get('referer')?.startsWith('https://') === true

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value ?? null
}

export async function getCurrentAdmin(): Promise<AuthPayload | null> {
  const token = await getSessionToken()
  if (!token) return null
  return verifyToken(token)
}
