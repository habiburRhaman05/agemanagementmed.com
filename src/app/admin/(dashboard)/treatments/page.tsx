import { TreatmentsTable } from '@/components/admin/TreatmentsTable'
import { prisma } from '@/lib/prisma'

export default async function TreatmentsPage() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Treatments</h1>
        <p className="text-sm text-gray-500">
          All {treatments.length} treatment pages. Draft pages 404 on the live site until published.
        </p>
      </div>
      <TreatmentsTable treatments={treatments} />
    </div>
  )
}
