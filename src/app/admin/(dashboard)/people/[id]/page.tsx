import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PersonForm } from '@/components/admin/PersonForm'
import { getPersonById } from '@/actions/people'

export default async function EditPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getPersonById(id)
  if (!row) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/people" className="text-sm text-sage-700 hover:underline">
          ← Back to team
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-ink-950">Edit team member</h1>
        <p className="text-sm text-gray-500">{row.name}</p>
      </div>
      <PersonForm
        mode="edit"
        person={{
          id: row.id,
          slug: row.slug,
          name: row.name,
          credentials: row.credentials,
          role: row.role,
          portraitSrc: row.portraitSrc,
          portraitAlt: row.portraitAlt,
          summary: row.summary,
          bio: row.bio as string[],
          specialties: row.specialties as string[] | null,
          featured: row.featured,
          status: row.status,
          order: row.order,
        }}
      />
    </div>
  )
}
