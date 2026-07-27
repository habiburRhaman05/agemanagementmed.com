'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { X, Clock, CheckCircle2, XCircle, MessageSquare } from 'lucide-react'
import { updateAppointmentStatus } from '@/actions/appointment'
import { useRouter } from 'next/navigation'

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
  appointment: Appointment
  onClose: () => void
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export function AppointmentDetailModal({ appointment, onClose }: Props) {
  const router = useRouter()
  const [updating, setUpdating] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)
    await updateAppointmentStatus(appointment.id, newStatus)
    setUpdating(false)
    router.refresh()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {appointment.name}
            </h2>
            <p className="text-sm text-gray-500">
              Booked{' '}
              {format(new Date(appointment.createdAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[appointment.status] || 'bg-gray-100 text-gray-800'}`}
            >
              {appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>
                <a
                  href={`mailto:${appointment.email}`}
                  className="text-gray-900 hover:text-emerald-600"
                >
                  {appointment.email}
                </a>
              </div>
              {appointment.phone && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Phone</p>
                  <a
                    href={`tel:${appointment.phone}`}
                    className="text-gray-900 hover:text-emerald-600"
                  >
                    {appointment.phone}
                  </a>
                </div>
              )}
              {appointment.service && (
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500">Service</p>
                  <p className="text-gray-900">{appointment.service}</p>
                </div>
              )}
              {appointment.preferredDate && (
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Preferred Date
                  </p>
                  <p className="text-gray-900">
                    {format(
                      new Date(appointment.preferredDate),
                      'MMMM d, yyyy'
                    )}
                  </p>
                </div>
              )}
              {appointment.preferredTime && (
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Preferred Time
                  </p>
                  <p className="text-gray-900">{appointment.preferredTime}</p>
                </div>
              )}
            </div>

            {appointment.message && (
              <div>
                <p className="text-xs font-medium text-gray-500">Message</p>
                <p className="mt-1 text-sm text-gray-700">
                  {appointment.message}
                </p>
              </div>
            )}
          </div>

          {appointment.notes && (
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-700">Admin Notes</p>
              <p className="mt-1 text-sm text-blue-900">
                {appointment.notes}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <p className="text-xs font-medium text-gray-500">
            Update status:
          </p>
          <div className="flex gap-2">
            {['pending', 'confirmed', 'completed', 'cancelled'].map(
              (status) => {
                if (status === appointment.status) return null
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(status)}
                    disabled={updating}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                      status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : status === 'completed'
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : status === 'cancelled'
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
