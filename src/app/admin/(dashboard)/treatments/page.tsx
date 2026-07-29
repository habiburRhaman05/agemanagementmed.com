import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'

import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { TreatmentsTable } from '@/components/admin/TreatmentsTable'
import { prisma } from '@/lib/prisma'

async function TreatmentsTableSection() {
  const rows = await prisma.treatment.findMany({ orderBy: { order: 'asc' } })

  const treatments = rows.map((row) => {
    const data = row.data as { name?: string }
    return {
      id: row.id,
      slug: row.slug,
      href: row.href,
      pillar: row.pillar,
      audience: row.audience,
      status: row.status,
      order: row.order,
      name: data.name ?? row.slug,
      updatedAt: row.updatedAt.toISOString(),
    }
  })

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        All {treatments.length} treatment pages. Draft pages 404 on the live site until published.
      </p>
      <TreatmentsTable treatments={treatments} />
    </div>
  )
}

export default function TreatmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-950">Treatments</h1>
        <Link
          href="/admin/treatments/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700"
        >
          <Plus className="size-4" />
          New treatment
        </Link>
      </div>
      <Suspense fallback={<TableSkeleton columns={3} />}>
        <TreatmentsTableSection />
      </Suspense>
    </div>
  )
}
