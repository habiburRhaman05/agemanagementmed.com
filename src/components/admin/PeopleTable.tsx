'use client'

import { Loader2, Pencil, Star, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { deletePerson, togglePersonFeatured, togglePersonStatus } from '@/actions/people'

interface PersonSummary {
  id: string
  slug: string
  name: string
  role: string
  portraitSrc: string
  featured: boolean
  status: string
  order: number
}

export function PeopleTable({ people }: { people: PersonSummary[] }) {
  const router = useRouter()
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setTogglingId(id)
    try {
      const result = await togglePersonStatus(id, currentStatus === 'published' ? 'draft' : 'published')
      if (!result.success) throw new Error(result.error)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    setTogglingId(id)
    try {
      const result = await togglePersonFeatured(id, !featured)
      if (!result.success) throw new Error(result.error)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the team? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const result = await deletePerson(id)
      if (!result.success) throw new Error(result.error)
      toast.success(`${name} removed.`)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  if (people.length === 0) {
    return (
      <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <Users className="mx-auto h-10 w-10 text-dash-border" />
        <h3 className="mt-4 text-base font-semibold text-dash-text">No team members yet</h3>
        <p className="mt-1 text-sm text-dash-text-muted">Add your first provider or staff member to get started.</p>
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y divide-dash-border">
        <thead className="sticky top-0 z-10 bg-dash-bg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Name</th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Status</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-border">
          {people.map((person) => (
            <tr key={person.id} className="transition-colors hover:bg-dash-bg">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.portraitSrc}
                    alt=""
                    className="size-10 shrink-0 rounded-full object-cover ring-1 ring-dash-border"
                  />
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-dash-text">
                      {person.name}
                      {person.featured ? <Star className="size-3.5 fill-current text-amber-500" /> : null}
                    </p>
                    <p className="text-xs text-dash-text-muted md:hidden">{person.role}</p>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-4 text-sm text-dash-text-muted md:table-cell">{person.role}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(person.id, person.status)}
                  disabled={togglingId === person.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    person.status === 'published'
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {togglingId === person.id ? <Loader2 className="size-3 animate-spin" /> : null}
                  {person.status === 'published' ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(person.id, person.featured)}
                    disabled={togglingId === person.id}
                    title={person.featured ? 'Remove from homepage' : 'Feature on homepage'}
                    className={`rounded-lg p-2 transition-colors ${
                      person.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-400 hover:bg-dash-bg hover:text-amber-500'
                    }`}
                  >
                    <Star className={`size-4 ${person.featured ? 'fill-current' : ''}`} />
                  </button>
                  <Link
                    href={`/admin/people/${person.id}`}
                    className="rounded-lg p-2 text-gray-400 hover:bg-dash-bg hover:text-dash-text"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(person.id, person.name)}
                    disabled={deletingId === person.id}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {deletingId === person.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
