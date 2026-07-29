import Link from 'next/link'

import { PersonForm } from '@/components/admin/PersonForm'

export default function NewPersonPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/people" className="text-sm text-sage-700 hover:underline">
          ← Back to team
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-ink-950">Add team member</h1>
        <p className="text-sm text-gray-500">Create a new provider or staff profile.</p>
      </div>
      <PersonForm mode="create" />
    </div>
  )
}
