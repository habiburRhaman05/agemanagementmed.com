'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ChevronDown } from 'lucide-react'
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
  consent: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

interface BookingFormProps {
  defaultLocation?: LocationSlug
  /** Overrides the "Consultation at ..." service label — e.g. to tag a claimed special. */
  serviceLabel?: string
  /** Overrides the submit button's default "Schedule a consultation" label. */
  submitLabel?: string
  /** Styling variant: 'default' (light) or 'dark' (navy modal theme matching live design) */
  variant?: 'default' | 'dark'
}

export function BookingForm({ defaultLocation, serviceLabel, submitLabel, variant = 'default' }: BookingFormProps) {
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
      consent: true,
    },
  })

  const [bookingState, setBookingState] = useState<ActionResult | null>(null)

  const isDark = variant === 'dark'

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        if (serviceLabel) {
          formData.append('service', serviceLabel)
        }
        formData.append('message', `Location: ${data.location}`)

        const result = await bookAppointment(null, formData)

        if (result.success) {
          router.push('/thank-you')
        } else {
          setBookingState(result)
        }
      })}
      className={isDark ? 'space-y-4 sm:space-y-5' : 'space-y-5 sm:space-y-6'}
      noValidate
    >
      {bookingState && !bookingState.success && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{bookingState.error}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        {!isDark && <Label htmlFor="name">Full name</Label>}
        <Input
          id="name"
          placeholder={isDark ? 'Name' : undefined}
          className={
            isDark
              ? 'h-13 sm:h-14 w-full rounded-xl border border-white/20 bg-[#060E26]/50 px-4 sm:px-5 text-base sm:text-lg text-white placeholder:text-white/70 focus:bg-[#060E26] focus:border-teal-400 focus:outline-none transition-all'
              : 'mt-2'
          }
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>

      {/* Email Input */}
      <div>
        {!isDark && <Label htmlFor="email">Email address</Label>}
        <Input
          id="email"
          type="email"
          placeholder={isDark ? 'E-mail Address' : undefined}
          className={
            isDark
              ? 'h-13 sm:h-14 w-full rounded-xl border border-white/20 bg-[#060E26]/50 px-4 sm:px-5 text-base sm:text-lg text-white placeholder:text-white/70 focus:bg-[#060E26] focus:border-teal-400 focus:outline-none transition-all'
              : 'mt-2'
          }
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      {/* Phone Input */}
      <div>
        {!isDark && <Label htmlFor="phone">Phone</Label>}
        <Input
          id="phone"
          type="tel"
          placeholder={isDark ? 'Phone' : undefined}
          className={
            isDark
              ? 'h-13 sm:h-14 w-full rounded-xl border border-white/20 bg-[#060E26]/50 px-4 sm:px-5 text-base sm:text-lg text-white placeholder:text-white/70 focus:bg-[#060E26] focus:border-teal-400 focus:outline-none transition-all'
              : 'mt-2'
          }
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          {...register('phone')}
        />
        <FieldError id="phone-error" message={errors.phone?.message} />
      </div>

      {/* Location Select */}
      {isDark ? (
        <div className="relative rounded-xl border border-white/20 bg-[#060E26]/50 focus-within:bg-[#060E26] px-4 sm:px-5 pt-2 pb-2 focus-within:border-teal-400 transition-all">
          <label
            htmlFor="location"
            className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/90"
          >
            WHICH LOCATION ARE YOU INTERESTED IN?
          </label>
          <div className="relative flex items-center">
            <select
              id="location"
              className="w-full appearance-none bg-transparent pr-8 py-0.5 text-white text-base sm:text-lg font-normal focus:outline-none cursor-pointer [&>option]:bg-[#0E1738] [&>option]:text-white"
              {...register('location')}
            >
              <option value="savannah-pooler">Pooler / Savannah</option>
              <option value="statesboro">Statesboro</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-canvas-900 mb-2">
            WHICH LOCATION ARE YOU INTERESTED IN?
          </label>
          <select
            id="location"
            className="mt-2 h-14 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 text-body text-canvas-900 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600 cursor-pointer"
            {...register('location')}
          >
            <option value="savannah-pooler">Pooler / Savannah</option>
            <option value="statesboro">Statesboro</option>
          </select>
        </div>
      )}

      {/* Checkbox for default theme */}
      {!isDark && (
        <div>
          <div className="flex items-start gap-3">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  className="mt-0.5 shrink-0 cursor-pointer"
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
              className="flex-1 text-body-sm leading-relaxed text-canvas-600 cursor-pointer"
            >
              {site.legal.smsConsent}
            </Label>
          </div>

          <FieldError
            id="consent-error"
            message={errors.consent?.message as string | undefined}
          />
        </div>
      )}

      {/* Submit Button */}
      {isDark ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 sm:h-14 rounded-full bg-[#4DA89E] hover:bg-[#3f9188] active:scale-[0.99] text-white font-bold tracking-[0.18em] text-sm sm:text-base uppercase transition-all shadow-lg shadow-teal-900/30 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? 'SUBMITTING...' : (submitLabel ?? 'NEXT STEP')}
        </button>
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:min-w-[240px] sm:w-auto cursor-pointer"
        >
          {isSubmitting ? 'Submitting…' : (submitLabel ?? 'Schedule a consultation')}
        </Button>
      )}

      {/* Explicit Legal Consent Disclaimer for Dark Theme */}
      {isDark && (
        <>
          <div className="my-6 sm:my-7 border-t border-white/15" />
          <p className="text-[10px] sm:text-[11px] leading-[1.15] text-white/60 uppercase tracking-tight text-justify font-sans">
            BY COMPLETING AND SUBMITTING THIS FORM, I HEREBY PROVIDE EXPLICIT WRITTEN CONSENT TO RECEIVE COMMUNICATIONS THROUGH TEXT MESSAGES AND PHONE CALLS, INCLUDING THOSE TO WIRELESS NUMBERS OR NUMBERS REGISTERED ON AN INTERNAL DO NOT CALL REGISTRY. I ACKNOWLEDGE THAT THESE COMMUNICATIONS MAY BE INITIATED THROUGH TELEPHONE CALLS, PRERECORDED VOICEMAILS, OR POSTAL MAIL, AND MAY PERTAIN TO MARKETING SERVICES. I UNDERSTAND THAT SUCH COMMUNICATIONS MIGHT INVOLVE AUTOMATED SOFTWARE. ADDITIONALLY, I AFFIRM MY UNDERSTANDING AND ACCEPTANCE OF THE PRIVACY POLICY AND TERMS AND CONDITIONS. I AM AWARE THAT I CAN OPT OUT OF THESE COMMUNICATIONS AT ANY TIME BY REPLYING WITH &quot;STOP&quot;. STANDARD MESSAGE AND DATA RATES MAY APPLY.
          </p>
        </>
      )}
    </form>
  )
}