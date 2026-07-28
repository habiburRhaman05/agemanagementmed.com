'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Clock, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { AppointmentDetailModal } from './AppointmentDetailModal'

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
    color: 'text-emerald-600 bg-emerald-50',
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

  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (search) params.set('search', search)
    params.set('page', String(page))
    return `/admin/appointments?${params.toString()}`
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full divide-y">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                Service
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {appointments.map((apt) => {
              const config = statusConfig[apt.status] || statusConfig.pending
              const StatusIcon = config.icon

              return (
                <tr
                  key={apt.id}
                  className="hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {apt.name}
                      </p>
                      <p className="text-xs text-gray-500">{apt.email}</p>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                    {apt.service || 'General'}
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                    {apt.preferredDate
                      ? format(new Date(apt.preferredDate), 'MMM d, yyyy')
                      : '—'}
                    {apt.preferredTime && (
                      <span className="ml-1 text-xs text-gray-400">
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
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
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
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <a
                href={buildPaginationUrl(currentPage - 1)}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Previous
              </a>
            )}
            {currentPage < totalPages && (
              <a
                href={buildPaginationUrl(currentPage + 1)}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
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
    </>
  )
}
