'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock, MapPin, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'
import type { LocationSlug } from '@/types/content'

/* ── Validation schema ─────────────────────────────────────────────────── */

const schema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(7, "Please enter a valid phone number"),

  location: z.enum(
    ["savannah-pooler", "statesboro"],
    {
      message: "Please select a clinic location",
    }
  ),

  date: z.coerce.date({
    message: "Please select a date",
  }),

  time: z
    .string()
    .min(1, "Please select a time slot"),

  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Consent is required to submit this form",
    }),
});


type FormValues = z.infer<typeof schema>

/* ── Time slots ────────────────────────────────────────────────────────── */

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
]

/* ── Field error ───────────────────────────────────────────────────────── */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-body-sm text-rose-700">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  )
}

/* ── Step label ────────────────────────────────────────────────────────── */

function StepLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-canvas-300/60 pb-4 mb-6">
      <span className="flex size-8 items-center justify-center rounded-full bg-sage-100 text-sage-700">
        <Icon className="size-4" />
      </span>
      <h2 className="text-title-lg text-ink-900">{children}</h2>
    </div>
  )
}

/* ── Main unified component ─────────────────────────────────────────────── */

/**
 * UnifiedBookingForm merges the previous AdvancedBookingForm (date/time picker)
 * and BookingForm (contact details + zod/RHF validation) into one cohesive unit.
 *
 * Layout: single card with two clearly-labelled sections side-by-side on lg,
 * stacked on mobile. All fields are validated with react-hook-form + zod and
 * show inline error messages on submission attempt.
 */
export function UnifiedBookingForm({ defaultLocation }: { defaultLocation?: LocationSlug }) {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: { location: defaultLocation ?? 'savannah-pooler' },
  })

  const selectedDate = watch('date')
  const selectedTime = watch('time')

  const [bookingState, setBookingState] = useState<ActionResult | null>(null)

  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('name', watch('name'))
    formData.append('email', watch('email'))
    formData.append('phone', watch('phone'))
    formData.append('service', `Consultation at ${watch('location') === 'savannah-pooler' ? 'Savannah/Pooler' : 'Statesboro'}`)
    formData.append('preferredDate', watch('date')?.toISOString() || '')
    formData.append('preferredTime', watch('time'))
    formData.append('message', `Location: ${watch('location') === 'savannah-pooler' ? 'Savannah/Pooler' : 'Statesboro'}`)

    const result = await bookAppointment(null, formData)
    if (result.success) {
      router.push('/thank-you')
    } else {
      setBookingState(result)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto w-full max-w-5xl"
    >
      {/* Single unified card */}
      <div className="overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-lg">

        {/* Card header */}
        <div className="bg-ink-900 px-8 py-6 sm:px-10">
          <p className="text-label font-semibold uppercase tracking-widest text-sage-400">
            Savannah Age Management Medicine
          </p>
          <h1 className="mt-1 text-display-sm text-canvas-50">
            Schedule Your Consultation
          </h1>
          <p className="mt-2 text-body-sm text-canvas-50/65">
            Fill in your details and choose a time — our team will confirm within one business day.
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid divide-y divide-canvas-300/60 lg:grid-cols-2 lg:divide-x lg:divide-y-0">

          {/* ── Left: Personal details ───────────────────────────────── */}
          <div className="p-7 sm:p-9">
            <StepLabel icon={User}>Your Details</StepLabel>

            <div className="space-y-5">
              {/* Full name */}
              <div>
                <Label htmlFor="name">Full Name <span className="text-rose-600">*</span></Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={cn('mt-2 bg-white', errors.name && 'border-rose-500 focus-visible:outline-rose-500')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name')}
                />
                <FieldError id="name-error" message={errors.name?.message} />
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address <span className="text-rose-600">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className={cn('mt-2 bg-white', errors.email && 'border-rose-500 focus-visible:outline-rose-500')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                  />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number <span className="text-rose-600">*</span></Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(912) 555-0123"
                    className={cn('mt-2 bg-white', errors.phone && 'border-rose-500 focus-visible:outline-rose-500')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone')}
                  />
                  <FieldError id="phone-error" message={errors.phone?.message} />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-sage-600" />
                  Preferred Location <span className="text-rose-600">*</span>
                </Label>
                <select
                  id="location"
                  className={cn(
                    'mt-2 flex h-14 w-full rounded-xl border bg-white px-4 text-body text-canvas-900',
                    'focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600',
                    'transition-colors duration-200',
                    errors.location ? 'border-rose-500' : 'border-canvas-300',
                  )}
                  aria-invalid={Boolean(errors.location)}
                  {...register('location')}
                >
                  <option value="">Select a clinic location…</option>
                  <option value="savannah-pooler">Savannah / Pooler</option>
                  <option value="statesboro">Statesboro</option>
                </select>
                <FieldError id="location-error" message={errors.location?.message} />
              </div>

              {/* Consent */}
              <div className="rounded-xl border border-canvas-300/60 bg-canvas-100 p-4">
                <div className="flex items-start gap-3">
                  <Controller
                    name="consent"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="consent"
                        className="mt-0.5"
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby="consent-text consent-error"
                      />
                    )}
                  />
                  <Label
                    htmlFor="consent"
                    id="consent-text"
                    className="cursor-pointer text-body-sm leading-relaxed text-canvas-600"
                  >
                    {site.legal.smsConsent}
                  </Label>
                </div>
                <FieldError id="consent-error" message={errors.consent?.message as string | undefined} />
              </div>
            </div>
          </div>

          {/* ── Right: Date & time ───────────────────────────────────── */}
          <div className="p-7 sm:p-9">
            <StepLabel icon={Clock}>Date & Time</StepLabel>

            <div className="space-y-6">
              {/* Date picker */}
              <div>
                <Label className="flex items-center gap-1.5 mb-2">
                  <CalendarIcon className="size-3.5 text-sage-600" />
                  Select Date <span className="text-rose-600">*</span>
                </Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            'flex h-14 w-full items-center gap-3 rounded-xl border px-4 text-body transition-colors duration-200',
                            'focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600',
                            field.value ? 'text-ink-900' : 'text-canvas-600',
                            errors.date ? 'border-rose-500 bg-rose-50' : 'border-canvas-300 bg-white',
                          )}
                          aria-invalid={Boolean(errors.date)}
                        >
                          <CalendarIcon className="size-4 text-sage-600 shrink-0" />
                          {field.value ? format(field.value, 'EEEE, MMMM d, yyyy') : 'Pick a date'}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto rounded-2xl p-0 shadow-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(d) => field.onChange(d)}
                          disabled={(d) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return d < today || d.getDay() === 0 || d.getDay() === 6
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <FieldError id="date-error" message={errors.date?.message} />
              </div>

              {/* Time slot grid */}
              <div>
                <Label className="flex items-center gap-1.5 mb-3">
                  <Clock className="size-3.5 text-sage-600" />
                  Select Time <span className="text-rose-600">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setValue('time', slot, { shouldValidate: true })}
                      className={cn(
                        'rounded-xl border py-2.5 text-body-sm font-medium transition-all duration-200 hover:-translate-y-0.5',
                        selectedTime === slot
                          ? 'border-sage-600 bg-sage-600 text-white shadow-glow'
                          : 'border-canvas-300 bg-white text-ink-900 hover:border-sage-600/50 hover:text-sage-700',
                        errors.time && !selectedTime && 'border-rose-300',
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <FieldError id="time-error" message={errors.time?.message} />
              </div>

              {/* Summary pill — shows selected slot */}
              {selectedDate && selectedTime ? (
                <div className="flex items-center gap-3 rounded-xl border border-sage-200 bg-sage-50 px-4 py-3">
                  <CalendarIcon className="size-4 shrink-0 text-sage-600" />
                  <p className="text-body-sm font-medium text-sage-800">
                    {format(selectedDate, 'EEE, MMM d')} at {selectedTime}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Booking error */}
        {bookingState && !bookingState.success && (
          <div className="mx-8 mb-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {bookingState.error}
          </div>
        )}

        {/* Footer / submit */}
        <div className="flex flex-col items-center gap-4 border-t border-canvas-300/60 bg-canvas-100/60 px-8 py-6 sm:flex-row sm:justify-between sm:px-10">
          <p className="text-body-sm text-canvas-600 sm:max-w-sm">
            By submitting, you agree to receive communications regarding this booking.
          </p>
          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Confirming…' : 'Confirm Appointment'}
          </Button>
        </div>
      </div>
    </form>
  )
}
