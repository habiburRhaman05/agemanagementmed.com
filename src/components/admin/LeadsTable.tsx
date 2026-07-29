'use client'

import { format } from 'date-fns'
import { Inbox, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { updateLeadStatus } from '@/actions/lead'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  sourcePath: string | null
  status: string
  createdAt: string
}

interface Props {
  leads: Lead[]
  currentPage: number
  totalPages: number
  total: number
  status?: string
  search?: string
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-50 text-amber-700',
  contacted: 'bg-blue-50 text-blue-700',
  converted: 'bg-sage-50 text-sage-700',
  archived: 'bg-dash-bg text-dash-text-muted',
}

export function LeadsTable({ leads, currentPage, totalPages, total, status, search }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (search) params.set('search', search)
    params.set('page', String(page))
    return `/admin/leads?${params.toString()}`
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    await updateLeadStatus(id, newStatus)
    setUpdatingId(null)
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <Inbox className="mx-auto h-10 w-10 text-dash-border" />
        <h3 className="mt-4 text-base font-semibold text-dash-text">No leads found</h3>
        <p className="mt-1 text-sm text-dash-text-muted">
          {search ? 'Try a different search term.' : 'No inquiries have been submitted yet.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <table className="min-w-full divide-y divide-dash-border">
          <thead className="sticky top-0 z-10 bg-dash-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Contact</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted lg:table-cell">Message</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Status</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted sm:table-cell">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-border">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-dash-bg">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-dash-text">{lead.name}</p>
                  <p className="text-xs text-dash-text-muted">{lead.email}</p>
                  {lead.phone ? <p className="text-xs text-dash-text-muted">{lead.phone}</p> : null}
                </td>
                <td className="hidden max-w-xs px-6 py-4 text-sm text-dash-text-muted lg:table-cell">
                  <p className="line-clamp-2">{lead.message || '—'}</p>
                </td>
                <td className="hidden px-6 py-4 text-xs text-dash-text-muted md:table-cell">
                  {lead.sourcePath || '—'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      disabled={updatingId === lead.id}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-dash-action/30 ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                    {updatingId === lead.id ? <Loader2 className="size-3 animate-spin text-dash-text-muted" /> : null}
                  </div>
                </td>
                <td className="hidden px-6 py-4 text-sm text-dash-text-muted sm:table-cell">
                  {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-dash-border pt-4">
          <p className="text-sm text-dash-text-muted">
            Page {currentPage} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <a href={buildPaginationUrl(currentPage - 1)} className="rounded-lg border border-dash-border px-3 py-1.5 text-sm font-medium text-dash-text-muted hover:bg-dash-bg">
                Previous
              </a>
            ) : null}
            {currentPage < totalPages ? (
              <a href={buildPaginationUrl(currentPage + 1)} className="rounded-lg border border-dash-border px-3 py-1.5 text-sm font-medium text-dash-text-muted hover:bg-dash-bg">
                Next
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
