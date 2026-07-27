'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
]

export function AdvancedBookingForm() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!date || !time) {
      alert('Please select both a date and a time for your appointment.')
      return
    }

    setIsSubmitting(true)
    // Simulate API call for booking
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-md ring-1 ring-ink-900/5">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-sage-100">
          <CheckCircle2 className="size-10 text-sage-700" aria-hidden />
        </div>
        <h2 className="mb-4 text-display-sm text-ink-900">Request received</h2>
        <p className="mb-8 max-w-md text-body text-canvas-600">
          Thank you for reaching out. Our team will contact you shortly to confirm your
          consultation details.
        </p>
        <Button onClick={() => window.location.href = '/'} size="lg" variant="primary">
          Return to home
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h2 className="text-display-sm text-ink-900">Your Details</h2>
          <p className="mt-2 text-body-sm text-canvas-600">
            Provide your information so we can confirm your appointment.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required placeholder="Jane Doe" className="bg-canvas-50" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required placeholder="jane@example.com" className="bg-canvas-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" required placeholder="(912) 555-0123" className="bg-canvas-50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <select
              id="location"
              className="flex h-10 w-full rounded-md border border-canvas-300 bg-canvas-50 px-3 py-2 text-sm ring-offset-canvas-50 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-canvas-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a clinic location...</option>
              <option value="pooler">Savannah / Pooler</option>
              <option value="statesboro">Statesboro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-ink-900/5 sm:p-8">
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
                    'w-full justify-start text-left font-normal bg-canvas-50',
                    !date && 'text-canvas-600',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    // Disable past days and weekends
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
                    'rounded-md border py-2 text-sm transition-colors hover:bg-sage-100 hover:text-ink-900',
                    time === slot
                      ? 'border-sage-600 bg-sage-600 text-white hover:bg-sage-700 hover:text-white'
                      : 'border-canvas-300 bg-canvas-50 text-ink-900',
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
            {!time && <p className="text-xs text-canvas-600">Please pick a time slot.</p>}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" variant="primary" className="w-full !bg-sage-600 hover:!bg-ink-900 !text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
          </Button>
          <p className="mt-4 text-center text-xs text-canvas-600">
            By submitting, you agree to receive communications regarding this booking.
          </p>
        </div>
      </div>
    </form>
  )
}
