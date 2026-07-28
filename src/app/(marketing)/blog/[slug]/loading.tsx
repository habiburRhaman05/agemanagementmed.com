import { Container } from '@/components/shared/Container'

/* ── Blog Post Detail Loading Skeleton ───────────────────────────── */

export default function BlogPostLoading() {
  return (
    <>
      {/* Reading progress bar skeleton */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-100" />

      {/* Hero skeleton */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative pt-28 pb-16 animate-pulse">
          <Container>
            {/* Back link */}
            <div className="mb-8 h-4 w-32 rounded bg-white/20" />

            {/* Category badge */}
            <div className="mb-4 h-6 w-28 rounded-full bg-white/20" />

            {/* Title */}
            <div className="max-w-4xl space-y-3">
              <div className="h-10 w-3/4 rounded bg-white/20" />
              <div className="h-10 w-1/2 rounded bg-white/20" />
            </div>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="h-4 w-32 rounded bg-white/20" />
              <div className="h-4 w-28 rounded bg-white/20" />
              <div className="h-4 w-36 rounded bg-white/20" />
            </div>

            {/* Share button */}
            <div className="mt-6 h-9 w-24 rounded-full bg-white/20" />
          </Container>
        </div>
      </section>

      {/* Article body skeleton */}
      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Sidebar skeleton */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 h-3 w-24 rounded bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-3/4 rounded bg-gray-100" />
                    <div className="h-3 w-5/6 rounded bg-gray-100" />
                    <div className="h-3 w-2/3 rounded bg-gray-100" />
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-sm">
                  <div className="mb-2 h-4 w-40 rounded bg-emerald-200/50" />
                  <div className="mb-3 h-3 w-full rounded bg-emerald-200/30" />
                  <div className="h-10 w-full rounded-lg bg-emerald-200/50" />
                </div>
              </div>
            </aside>

            {/* Main content skeleton */}
            <article className="lg:col-span-9">
              {/* Mobile meta */}
              <div className="mb-8 flex flex-wrap items-center gap-3 lg:hidden">
                <div className="h-3 w-28 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-3 w-32 rounded bg-gray-200" />
              </div>

              {/* Excerpt */}
              <div className="mb-8 rounded-xl border-l-4 border-emerald-200 bg-emerald-50/30 px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-emerald-200/40" />
                  <div className="h-4 w-3/4 rounded bg-emerald-200/40" />
                </div>
              </div>

              {/* Content paragraphs */}
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    {i % 4 === 0 && (
                      <div className="h-7 w-2/3 rounded bg-gray-200" />
                    )}
                    <div className="h-4 w-full rounded bg-gray-100" />
                    <div className="h-4 w-11/12 rounded bg-gray-100" />
                    {i % 3 === 0 && (
                      <div className="h-4 w-4/5 rounded bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>

              {/* Article footer skeleton */}
              <div className="mt-12 border-t border-gray-100 pt-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div>
                      <div className="mb-1 h-4 w-28 rounded bg-gray-200" />
                      <div className="h-3 w-20 rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="h-9 w-24 rounded-full bg-gray-100" />
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Related posts skeleton */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-16">
        <Container>
          <div className="mb-8">
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-64 rounded bg-gray-100" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="-mx-5 -mt-5 mb-4 aspect-[16/9] rounded-t-xl bg-gray-200" />
                <div className="mb-2 h-5 w-full rounded bg-gray-200" />
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA skeleton */}
      <section className="bg-ink-900 py-20 lg:py-32">
        <Container>
          <div className="mx-auto max-w-[47.5rem] text-center">
            <div className="mx-auto mb-6 h-10 w-3/4 rounded bg-white/20" />
            <div className="mx-auto h-4 w-1/2 rounded bg-white/20" />
            <div className="mt-12 flex justify-center gap-4">
              <div className="h-14 w-48 rounded-full bg-white/20" />
              <div className="h-14 w-40 rounded-full border border-white/20" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
