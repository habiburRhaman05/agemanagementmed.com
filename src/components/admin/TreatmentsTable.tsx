'use client'

import { ExternalLink, Loader2, Pencil, Stethoscope } from 'lucide-react'
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

  if (treatments.length === 0) {
    return (
      <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <Stethoscope className="mx-auto h-10 w-10 text-dash-border" />
        <h3 className="mt-4 text-base font-semibold text-dash-text">No treatments yet</h3>
        <p className="mt-1 text-sm text-dash-text-muted">Create your first treatment page to get started.</p>
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y divide-dash-border">
        <thead className="sticky top-0 z-10 bg-dash-bg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Name</th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">Pillar</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Status</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-border">
          {treatments.map((t) => (
            <tr key={t.id} className="transition-colors hover:bg-dash-bg">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-dash-text">{t.name}</p>
                <p className="text-xs text-dash-text-muted">{t.href}</p>
              </td>
              <td className="hidden px-6 py-4 text-sm capitalize text-dash-text-muted md:table-cell">
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
                      className="rounded-lg p-2 text-dash-text-muted hover:bg-dash-bg hover:text-dash-text"
                      aria-label="View live page"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  ) : null}
                  <Link
                    href={`/admin/treatments/${t.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-dash-text hover:bg-dash-bg"
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
