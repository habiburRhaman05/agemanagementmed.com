'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, type ActionResult } from '@/actions/auth'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    async (prev: ActionResult | null, formData: FormData) =>
      login(prev, formData),
    null
  )
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/dashboard')
    }
  }, [state, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-200">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            SAMM Admin Panel
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Savannah Age Management Medicine
          </p>
        </div>

        {/* Form */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <form action={formAction} className="space-y-5">
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
                required
                autoComplete="email"
                autoFocus
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {state && !state.success && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Secure admin access only
        </p>
      </div>
    </div>
  )
}
