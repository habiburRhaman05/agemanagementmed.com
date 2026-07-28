import { getAppointments } from '@/actions/appointment'
import { AppointmentsTable } from '@/components/admin/AppointmentsTable'
import { CalendarCheck } from 'lucide-react'

interface Props {
  searchParams: Promise<{
    status?: string
    search?: string
    page?: string
  }>
}

export default async function AppointmentsPage({ searchParams }: Props) {
  const params = await searchParams
  const status = params.status || undefined
  const search = params.search || undefined
  const page = Number(params.page) || 1

  const result = await getAppointments({ status, search, page })

  // Convert Date objects to strings for serialization
  const serializedAppointments = result.appointments.map((apt) => ({
    ...apt,
    preferredDate: apt.preferredDate
      ? apt.preferredDate.toISOString()
      : null,
    createdAt: apt.createdAt.toISOString(),
    updatedAt: apt.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink-950">Appointments</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage patient appointment requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(
            (s) => (
              <a
                key={s}
                href={
                  s === 'all'
                    ? '/admin/appointments'
                    : `/admin/appointments?status=${s}`
                }
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  (s === 'all' && !status) || s === status
                    ? 'bg-sage-50 text-sage-700'
                    : 'text-gray-500 hover:bg-canvas-50 hover:text-gray-700'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            )
          )}
        </div>

        <form className="relative max-w-xs">
          <input
            type="search"
            name="search"
            defaultValue={search || ''}
            placeholder="Search by name, email..."
            className="w-full rounded-lg border border-canvas-300 py-2 pl-4 pr-4 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </form>
      </div>

      {/* Table */}
      {result.appointments.length > 0 ? (
        <AppointmentsTable
          appointments={serializedAppointments}
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          total={result.total}
          status={status}
          search={search}
        />
      ) : (
        <div className="rounded-2xl bg-white py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <CalendarCheck className="mx-auto h-12 w-12 text-canvas-300" />
          <h3 className="mt-4 text-base font-semibold text-ink-950">
            No appointments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {search
              ? 'Try a different search term.'
              : 'No appointments have been booked yet.'}
          </p>
        </div>
      )}
    </div>
  )
}
