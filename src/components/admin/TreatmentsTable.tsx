'use client'

import { ExternalLink, Loader2, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TreatmentSummary {
  id: string
  slug: string
  href: string
  pillar: string
  audience: string | null
  status: string
  order: number
  name: string
  updatedAt: string
}

export function TreatmentsTable({ treatments }: { treatments: TreatmentSummary[] }) {
  const router = useRouter()
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setTogglingId(id)
    try {
      await fetch(`/api/admin/treatments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 'published' ? 'draft' : 'published' }),
      })
      router.refresh()
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y">
        <thead>
          <tr className="bg-canvas-50">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">Pillar</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {treatments.map((t) => (
            <tr key={t.id} className="hover:bg-canvas-50">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-ink-950">{t.name}</p>
                <p className="text-xs text-gray-400">{t.href}</p>
              </td>
              <td className="hidden px-6 py-4 text-sm capitalize text-gray-600 md:table-cell">
                {t.pillar.replace(/-/g, ' ')}{t.audience && t.audience !== 'all' ? ` · ${t.audience}` : ''}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(t.id, t.status)}
                  disabled={togglingId === t.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    t.status === 'published'
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {togglingId === t.id ? <Loader2 className="size-3 animate-spin" /> : null}
                  {t.status === 'published' ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  {t.status === 'published' ? (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-400 hover:bg-canvas-100 hover:text-gray-600"
                      aria-label="View live page"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  ) : null}
                  <Link
                    href={`/admin/treatments/${t.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-sage-700 hover:bg-sage-50"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
