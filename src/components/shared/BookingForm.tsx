'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
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
  preferredDate: z.string().min(1, 'Let us know when works for you'),
  consent: z.literal(true, {
    message: 'Consent is required to submit this form',
  }),
})

type FormValues = z.infer<typeof schema>

/**
 * The one canonical lead form. `defaultLocation` lets a location page or the
 * CTA band pre-select a clinic without duplicating this component.
 *
 * ⚠ Submission is not wired to a backend yet — it validates and shows a
 * confirmation state. Needs a real endpoint (email/CRM) before launch.
 */
export function BookingForm({ defaultLocation }: { defaultLocation?: LocationSlug }) {
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

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append(
          'service',
          `Consultation at ${
            data.location === 'savannah-pooler'
              ? 'Savannah/Pooler'
              : 'Statesboro'
          }`
        )
        formData.append('preferredTime', data.preferredDate)
        formData.append('message', `Location: ${data.location}`)

        const result = await bookAppointment(null, formData)

        if (result.success) {
          router.push('/thank-you')
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
          <FieldError
            id="name-error"
            message={errors.name?.message}
          />
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
          <FieldError
            id="phone-error"
            message={errors.phone?.message}
          />
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
        <FieldError
          id="email-error"
          message={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <Label htmlFor="location">Which location?</Label>
          <select
            id="location"
            className="mt-2 h-14 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 text-body text-canvas-900 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600"
            {...register('location')}
          >
            <option value="savannah-pooler">Savannah / Pooler</option>
            <option value="statesboro">Statesboro</option>
          </select>
        </div>

        <div>
          <Label htmlFor="preferredDate">
            When would you like to come in?
          </Label>
          <Input
            id="preferredDate"
            className="mt-2"
            placeholder="e.g. next week, mornings"
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={errors.preferredDate ? 'date-error' : undefined}
            {...register('preferredDate')}
          />
          <FieldError
            id="date-error"
            message={errors.preferredDate?.message}
          />
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

        <FieldError
          id="consent-error"
          message={errors.consent?.message as string | undefined}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:min-w-[240px] sm:w-auto"
      >
        {isSubmitting ? 'Submitting…' : 'Schedule a consultation'}
      </Button>
    </form>
  )
}