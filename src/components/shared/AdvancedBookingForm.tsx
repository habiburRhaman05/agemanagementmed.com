'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { cn } from '@/lib/utils'

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
]

export function AdvancedBookingForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!date || !time) {
      setError('Please select both a date and a time for your appointment.')
      return
    }

    const form = e.currentTarget
    const formData = new FormData()
    formData.append('name', (form.elements.namedItem('name') as HTMLInputElement)?.value || '')
    formData.append('email', (form.elements.namedItem('email') as HTMLInputElement)?.value || '')
    formData.append('phone', (form.elements.namedItem('phone') as HTMLInputElement)?.value || '')
    formData.append('service', `Consultation at ${(form.elements.namedItem('location') as HTMLSelectElement)?.value === 'statesboro' ? 'Statesboro' : 'Savannah/Pooler'}`)
    formData.append('preferredDate', date.toISOString())
    formData.append('preferredTime', time)
    formData.append('message', `Location: ${(form.elements.namedItem('location') as HTMLSelectElement)?.value === 'statesboro' ? 'Statesboro' : 'Savannah/Pooler'}`)

    setIsSubmitting(true)
    const result = await bookAppointment(null, formData)
    setIsSubmitting(false)

    if (result.success) {
      router.push('/thank-you')
    } else {
      setError(result.error)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
      <div className="space-y-8 rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-md sm:p-8">
        <div>
          <h2 className="text-title-lg text-ink-900">Your Details</h2>
          <p className="mt-2 text-body-sm text-canvas-600">
            Provide your information so we can confirm your appointment.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required placeholder="Jane Doe" className="bg-white" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required placeholder="jane@example.com" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="(912) 555-0123" className="bg-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <select
              id="location"
              name="location"
              className="flex h-14 w-full rounded-xl border border-canvas-300 bg-white px-4 text-body text-canvas-900 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-sage-600 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a clinic location...</option>
              <option value="pooler">Savannah / Pooler</option>
              <option value="statesboro">Statesboro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-md sm:p-8">
        <div>
          <h2 className="text-title-lg text-ink-900">Date & Time</h2>
          <p className="mt-1 text-body-sm text-canvas-600">
            Select your preferred consultation slot.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={cn(
                    'w-full justify-start bg-white text-left font-normal',
                    !date && 'text-canvas-600',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-2xl p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today || date.getDay() === 0 || date.getDay() === 6
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label>Select Time</Label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    'rounded-xl border py-2.5 text-body-sm font-medium transition-all duration-200 hover:-translate-y-0.5',
                    time === slot
                      ? 'border-sage-600 bg-sage-600 text-white shadow-glow hover:bg-sage-700'
                      : 'border-canvas-300 bg-white text-ink-900 hover:border-sage-600/50 hover:text-sage-700',
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" size="lg" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
          </Button>
          <p className="mt-4 text-center text-body-sm text-canvas-600">
            By submitting, you agree to receive communications regarding this booking.
          </p>
        </div>
      </div>
    </form>
  )
}
