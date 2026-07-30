'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FieldError } from '@/components/shared/FieldError'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { site } from '@/content/site'
import type { LocationSlug } from '@/types/content'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  location: z.enum(['savannah-pooler', 'statesboro']),
  consent: z.literal(true, {
    message: 'Consent is required to submit this form',
  }),
})

type FormValues = z.infer<typeof schema>

// Static clinic details for the location picker. If these ever need to be
// dynamic (a third location, hour changes without a deploy), move this into
// `site` content instead of hardcoding here — but for now, static is simpler
// and correct, per request.
const LOCATIONS: Record<LocationSlug, { name: string; address: string; hours: string }> = {
  'savannah-pooler': {
    name: 'Savannah / Pooler',
    address: '200 Blue Moon Xing, Suite 102, Pooler, GA 31322',
    hours: 'Mon–Thu: 9AM – 5PM  |  Fri: 9AM – 3PM',
  },
  statesboro: {
    name: 'Statesboro',
    address: '5 Oak Street, Statesboro, GA 30458',
    hours: 'Mon–Thu: 8AM – 4PM  |  Fri: 8AM – 2PM',
  },
}

interface BookingFormProps {
  defaultLocation?: LocationSlug
  /** Overrides the "General consultation" service label — e.g. to tag a claimed special. */
  serviceLabel?: string
  /** Overrides the submit button's default "Schedule a consultation" label. */
  submitLabel?: string
}

export function BookingForm({ defaultLocation, serviceLabel, submitLabel }: BookingFormProps) {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: defaultLocation ?? 'savannah-pooler',
    },
  })

  const [bookingState, setBookingState] = useState<ActionResult | null>(null)
  // NEW: State to handle the local success modal instead of a page redirect
  const [showThankYou, setShowThankYou] = useState(false)

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          const formData = new FormData()

          formData.append('name', data.name)
          formData.append('email', data.email)
          formData.append('phone', data.phone)
          formData.append('message', `Location: ${data.location}`)

          const result = await bookAppointment(null, formData)

          if (result.success) {
            // CHANGED: Replaced router.push('/thank-you') with local modal trigger
            setShowThankYou(true)
          } else {
            setBookingState(result)
          }
        })}
        className="space-y-5 sm:space-y-6"
        noValidate
      >
        {bookingState && !bookingState.success && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="break-words">{bookingState.error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              className="mt-2"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              className="mt-2"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              {...register('phone')}
            />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            className="mt-2"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div className="grid grid-cols-1 gap-5 ">
          <div>
            <Label htmlFor="location">Which location?</Label>
            <select
              id="location"
              className="mt-2 h-14 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 text-body text-canvas-900 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600"
              {...register('location')}
            >
              {(Object.keys(LOCATIONS) as LocationSlug[]).map((slug) => (
                <option key={slug} value={slug}>
                  {LOCATIONS[slug].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  className="mt-0.5 shrink-0"
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
              className="flex-1 text-body-sm leading-relaxed text-canvas-600"
            >
              {site.legal.smsConsent}
            </Label>
          </div>

          <FieldError id="consent-error" message={errors.consent?.message as string | undefined} />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:min-w-[240px] sm:w-auto"
        >
          {isSubmitting ? 'Submitting…' : (submitLabel ?? 'Schedule a consultation')}
        </Button>
      </form>

      {/* ─── Thank You Modal (Added without removing any existing HTML) ─── */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-300 sm:p-10">
            
            {/* Close Button */}
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            {/* Success Text */}
            <h3 className="mt-4 font-serif text-2xl font-bold text-navy-900">
              Thank you!
            </h3>
            <p className="mt-2 text-body-sm text-canvas-600">
              Your consultation request has been sent successfully. Our team will reach out to you shortly to confirm your appointment.
            </p>

            {/* Action Button */}
            <Button 
              onClick={() => setShowThankYou(false)} 
              className="mt-6 w-full bg-sage-600 text-white hover:bg-sage-700"
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  )
}