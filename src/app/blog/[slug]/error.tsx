'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'

/* ── Error Boundary for Blog Detail ───────────────────────────────── */

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[BlogPostPage] Unhandled error:', error)
  }, [error])

  return (
    <>
      {/* Minimal header for error state */}
      <header className="fixed inset-x-0 top-0 z-50 px-0 pt-0 lg:px-4 lg:pt-4">
        <div className="mx-auto w-full max-w-[80rem] px-6 lg:px-12 glass h-20 flex items-center lg:h-20 lg:max-w-304 lg:rounded-full lg:border lg:border-white/60 lg:shadow-lg">
          <Link
            href="/"
            className="text-title-lg font-display text-ink-900"
            aria-label="Home"
          >
            SAMM
          </Link>
        </div>
      </header>

      <main id="main" className="min-h-screen flex items-center justify-center bg-white">
        <Container>
          <div className="mx-auto max-w-lg text-center py-24">
            {/* Error illustration */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-10 w-10 text-red-400" />
            </div>

            {/* Error heading */}
            <h1 className="text-display-sm font-display font-semibold text-gray-900 mb-3">
              Something went wrong
            </h1>

            {/* Error description */}
            <p className="text-body text-gray-500 mb-2">
              We couldn&apos;t load this article right now. It might be a
              temporary issue with our connection.
            </p>
            <p className="text-body-sm text-gray-400 mb-10">
              Please try again, or browse other articles.
            </p>

            {/* Error digest for debugging */}
            {error.digest && (
              <p className="mb-8 text-xs text-gray-300 font-mono">
                Reference: {error.digest}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={reset}
                className="inline-flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>

              <Button
                variant="secondary"
                size="lg"
                asChild
                className="inline-flex items-center gap-2"
              >
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Journal
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
