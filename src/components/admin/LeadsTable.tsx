'use client'

import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
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
  archived: 'bg-canvas-100 text-gray-600',
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

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <table className="min-w-full divide-y">
          <thead>
            <tr className="bg-canvas-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">Message</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-canvas-50/50">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-ink-950">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                  {lead.phone ? <p className="text-xs text-gray-400">{lead.phone}</p> : null}
                </td>
                <td className="hidden max-w-xs px-6 py-4 text-sm text-gray-600 lg:table-cell">
                  <p className="line-clamp-2">{lead.message || '—'}</p>
                </td>
                <td className="hidden px-6 py-4 text-xs text-gray-500 md:table-cell">
                  {lead.sourcePath || '—'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      disabled={updatingId === lead.id}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sage-600/30 ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                    {updatingId === lead.id ? <Loader2 className="size-3 animate-spin text-gray-400" /> : null}
                  </div>
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                  {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <a href={buildPaginationUrl(currentPage - 1)} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-canvas-50">
                Previous
              </a>
            ) : null}
            {currentPage < totalPages ? (
              <a href={buildPaginationUrl(currentPage + 1)} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-canvas-50">
                Next
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
