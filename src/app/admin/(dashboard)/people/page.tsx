import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'

import { PeopleTable } from '@/components/admin/PeopleTable'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { getPeople } from '@/actions/people'

async function PeopleSection() {
  const rows = await getPeople()
  return <PeopleTable people={rows} />
}

export default function PeoplePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-950">Team</h1>
          <p className="text-sm text-gray-500">
            Providers and staff shown on /our-experts, the homepage, and per-treatment care team credits.
          </p>
        </div>
        <Link
          href="/admin/people/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700"
        >
          <Plus className="size-4" />
          Add team member
        </Link>
      </div>
      <Suspense fallback={<TableSkeleton columns={2} />}>
        <PeopleSection />
      </Suspense>
    </div>
  )
}
