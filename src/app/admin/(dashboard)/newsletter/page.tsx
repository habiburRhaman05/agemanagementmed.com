import { Suspense } from 'react'

import { getNewsletterSubscribers } from '@/actions/newsletter'
import { NewsletterTable } from '@/components/admin/NewsletterTable'
import { TableSkeleton } from '@/components/admin/TableSkeleton'

interface Props {
  searchParams: Promise<{
    search?: string
    page?: string
  }>
}

async function NewsletterTableSection({ search, page }: { search?: string; page: number }) {
  const result = await getNewsletterSubscribers({ search, page })

  const serialized = result.subscribers.map((subscriber) => ({
    ...subscriber,
    createdAt: subscriber.createdAt.toISOString(),
  }))

  return (
    <NewsletterTable
      subscribers={serialized}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      total={result.total}
      search={search}
    />
  )
}

export default async function NewsletterPage({ searchParams }: Props) {
  const params = await searchParams
  const search = params.search || undefined
  const page = Number(params.page) || 1

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-950">Newsletter</h1>
        <p className="mt-1 text-sm text-gray-500">
          Subscribers who joined from the public newsletter page
        </p>
      </div>

      <form className="relative max-w-xs">
        <input
          type="search"
          name="search"
          defaultValue={search || ''}
          placeholder="Search by name, email..."
          className="w-full rounded-lg border border-canvas-300 py-2 pl-4 pr-4 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      </form>

      <Suspense key={`${search}-${page}`} fallback={<TableSkeleton columns={3} />}>
        <NewsletterTableSection search={search} page={page} />
      </Suspense>
    </div>
  )
}
