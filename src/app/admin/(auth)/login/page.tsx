'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

/* ── Full-screen preloader ────────────────────────────────────────── */

function AuthPreloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-950/90 backdrop-blur-sm">
      {/* Logo mark */}
      <div className="mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-linear-to-br from-sage-400 to-sage-700 shadow-lg shadow-sage-900/40">
        <span className="text-2xl font-bold text-white">S</span>
      </div>
      {/* Spinner */}
      <Loader2 className="mb-3 size-8 animate-spin text-sage-400" />
      <p className="text-sm font-medium text-slate-300">Signing in…</p>
      <p className="mt-1 text-xs text-slate-500">Redirecting to dashboard</p>
    </div>
  )
}

/* ── Login Page ───────────────────────────────────────────────────── */

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(false) // full-screen preloader
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')
      setLoading(true)

      try {
        const res = await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        const json = await res.json()

        if (!res.ok) {
          setError(json.error || 'Invalid email or password')
          setLoading(false)
          return
        }

        // Success — show full-screen preloader, then redirect
        setLoading(false)
        setAuthLoading(true)

        // Small delay so the preloader is visible, then redirect
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 600)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection error. Please try again.')
        setLoading(false)
      }
    },
    [email, password, router],
  )

  return (
    <>
      {/* Full-screen preloader when authenticating */}
      {authLoading && <AuthPreloader />}

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-ink-950 via-ink-900 to-ink-800 p-4">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sage-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-rose-300/10 blur-3xl"
          aria-hidden
        />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sage-400 to-sage-700 shadow-lg shadow-sage-900/40">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              SAMM Admin Panel
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Savannah Age Management Medicine
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-24px_rgba(6,11,33,0.6)] ring-1 ring-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                  disabled={loading || authLoading}
                  className="mt-1 block w-full rounded-lg border border-canvas-300 px-4 py-2.5 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="admin@samm.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    disabled={loading || authLoading}
                    className="block w-full rounded-lg border border-canvas-300 px-4 py-2.5 pr-10 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || authLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Secure admin access only
          </p>
        </div>
      </div>
    </>
  )
}
