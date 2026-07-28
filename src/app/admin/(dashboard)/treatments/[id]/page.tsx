import Link from 'next/link'
import { notFound } from 'next/navigation'

import { TreatmentForm } from '@/components/admin/TreatmentForm'
import { prisma } from '@/lib/prisma'

export default async function EditTreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await prisma.treatment.findUnique({ where: { id } })
  if (!row) notFound()

  const seo = await prisma.pageSeo.findUnique({ where: { path: row.href } })

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/treatments" className="text-sm text-sage-700 hover:underline">
          ← Back to treatments
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-ink-950">Edit treatment</h1>
        <p className="text-sm text-gray-500">{row.href}</p>
      </div>
      <TreatmentForm
        treatment={{
          id: row.id,
          slug: row.slug,
          href: row.href,
          pillar: row.pillar,
          audience: row.audience,
          kind: row.kind,
          status: row.status,
          order: row.order,
          data: row.data as never,
        }}
        seo={seo}
      />
    </div>
  )
}
