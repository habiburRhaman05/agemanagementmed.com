'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarCheck, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { AppointmentDetailModal } from './AppointmentDetailModal'
import { ExportButton } from './ExportButton'

interface Appointment {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string | null
  preferredDate: string | null
  preferredTime: string | null
  status: string
  notes: string | null
  createdAt: string
}

interface Props {
  appointments: Appointment[]
  currentPage: number
  totalPages: number
  total: number
  status?: string
  search?: string
}

const statusConfig: Record<
  string,
  { icon: typeof Clock; color: string; label: string }
> = {
  pending: {
    icon: Clock,
    color: 'text-amber-600 bg-amber-50',
    label: 'Pending',
  },
  confirmed: {
    icon: CheckCircle2,
    color: 'text-sage-600 bg-sage-50',
    label: 'Confirmed',
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-blue-600 bg-blue-50',
    label: 'Completed',
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-600 bg-red-50',
    label: 'Cancelled',
  },
}

export function AppointmentsTable({
  appointments,
  currentPage,
  totalPages,
  total,
  status,
  search,
}: Props) {
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (search) params.set('search', search)
    params.set('page', String(page))
    return `/admin/appointments?${params.toString()}`
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === appointments.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(appointments.map((a) => a.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const today = new Date().toISOString().slice(0, 10)
  const exportToolbar = (
    <div className="flex items-center justify-between">
      <p className="text-sm text-dash-text-muted">
        {selectedIds.size > 0
          ? `${selectedIds.size} selected`
          : `${total} appointment${total === 1 ? '' : 's'}`}
      </p>
      <ExportButton
        endpoint="/api/admin/appointments/export"
        resourceLabel="Appointments"
        selectedIds={Array.from(selectedIds)}
        totalCount={total}
        filters={{ status, search }}
        defaultFileTitle="Appointments Export"
        defaultFileName={`appointments-export-${today}`}
      />
    </div>
  )

  if (appointments.length === 0) {
    return (
      <div className="space-y-4">
        {exportToolbar}
        <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <CalendarCheck className="mx-auto h-10 w-10 text-dash-border" />
          <h3 className="mt-4 text-base font-semibold text-dash-text">No appointments found</h3>
          <p className="mt-1 text-sm text-dash-text-muted">
            {search ? 'Try a different search term.' : 'No appointments have been booked yet.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exportToolbar}

      <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <table className="min-w-full divide-y divide-dash-border">
          <thead className="sticky top-0 z-10 bg-dash-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
                <input
                  type="checkbox"
                  className="size-4 rounded border-dash-border text-sage-600 focus:ring-sage-600"
                  checked={selectedIds.size === appointments.length && appointments.length > 0}
                  onChange={toggleSelectAll}
                  aria-label="Select all appointments"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
                Name
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">
                Service
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-dash-text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-border">
            {appointments.map((apt) => {
              const config = statusConfig[apt.status] || statusConfig.pending
              const StatusIcon = config.icon

              return (
                <tr
                  key={apt.id}
                  className="transition-colors hover:bg-dash-bg"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-dash-border text-sage-600 focus:ring-sage-600"
                      checked={selectedIds.has(apt.id)}
                      onChange={() => toggleSelect(apt.id)}
                      aria-label={`Select ${apt.name}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-dash-text">
                        {apt.name}
                      </p>
                      <p className="text-xs text-dash-text-muted">{apt.email}</p>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-dash-text-muted md:table-cell">
                    {apt.service || 'General'}
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-dash-text-muted md:table-cell">
                    {apt.preferredDate
                      ? format(new Date(apt.preferredDate), 'MMM d, yyyy')
                      : '—'}
                    {apt.preferredTime && (
                      <span className="ml-1 text-xs text-dash-text-muted">
                        {apt.preferredTime}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(apt)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-dash-text transition-colors hover:bg-dash-bg"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-dash-border pt-4">
          <p className="text-sm text-dash-text-muted">
            Page {currentPage} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <a
                href={buildPaginationUrl(currentPage - 1)}
                className="rounded-lg border border-dash-border px-3 py-1.5 text-sm font-medium text-dash-text-muted hover:bg-dash-bg"
              >
                Previous
              </a>
            )}
            {currentPage < totalPages && (
              <a
                href={buildPaginationUrl(currentPage + 1)}
                className="rounded-lg border border-dash-border px-3 py-1.5 text-sm font-medium text-dash-text-muted hover:bg-dash-bg"
              >
                Next
              </a>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <AppointmentDetailModal
          appointment={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
