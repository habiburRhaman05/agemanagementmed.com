import Link from 'next/link'

import { NewTreatmentForm } from '@/components/admin/NewTreatmentForm'

export default function NewTreatmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/treatments" className="text-sm text-sage-700 hover:underline">
          ← Back to treatments
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-ink-950">New treatment</h1>
        <p className="text-sm text-gray-500">
          Create a new treatment page. It saves as a draft until you publish it.
        </p>
      </div>
      <NewTreatmentForm />
    </div>
  )
}
