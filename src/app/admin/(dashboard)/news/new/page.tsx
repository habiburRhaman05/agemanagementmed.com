import Link from 'next/link'

import { NewsForm } from '@/components/admin/NewsForm'

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/news" className="text-sm text-sage-700 hover:underline">
          ← Back to news
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-ink-950">Add news item</h1>
        <p className="text-sm text-gray-500">Feature a press mention on the public /in-the-news page.</p>
      </div>
      <NewsForm />
    </div>
  )
}
