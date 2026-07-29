import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'

import { NewsManager } from '@/components/admin/NewsManager'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { prisma } from '@/lib/prisma'

async function NewsSection() {
  const rows = await prisma.newsItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return <NewsManager initial={rows} />
}

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-950">News</h1>
          <p className="text-sm text-gray-500">Press coverage shown on the public /in-the-news page.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700"
        >
          <Plus className="size-4" />
          Add news item
        </Link>
      </div>
      <Suspense fallback={<TableSkeleton columns={2} />}>
        <NewsSection />
      </Suspense>
    </div>
  )
}
