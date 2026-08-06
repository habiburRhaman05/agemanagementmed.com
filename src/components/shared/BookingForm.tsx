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
      className={isDark ? 'space-y-4' : 'space-y-5 sm:space-y-6'}
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
              ? 'h-12 w-full rounded-xl border border-white/25 bg-[#08142c] px-4 text-sm text-white placeholder:text-slate-300 focus:border-[#519B99] focus:outline-none focus:ring-1 focus:ring-[#519B99] cursor-pointer'
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
              ? 'h-12 w-full rounded-xl border border-white/25 bg-[#08142c] px-4 text-sm text-white placeholder:text-slate-300 focus:border-[#519B99] focus:outline-none focus:ring-1 focus:ring-[#519B99] cursor-pointer'
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
              ? 'h-12 w-full rounded-xl border border-white/25 bg-[#08142c] px-4 text-sm text-white placeholder:text-slate-300 focus:border-[#519B99] focus:outline-none focus:ring-1 focus:ring-[#519B99] cursor-pointer'
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
      <div>
        <label
          htmlFor="location"
          className={
            isDark
              ? 'block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5'
              : 'block text-sm font-medium text-canvas-900 mb-2'
          }
        >
          WHICH LOCATION ARE YOU INTERESTED IN?
        </label>
        <select
          id="location"
          className={
            isDark
              ? 'h-12 w-full rounded-xl border border-white/25 bg-[#08142c] px-4 text-sm text-white focus:border-[#519B99] focus:outline-none focus:ring-1 focus:ring-[#519B99] cursor-pointer'
              : 'mt-2 h-14 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 text-body text-canvas-900 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600 cursor-pointer'
          }
          {...register('location')}
        >
          <option value="savannah-pooler" className="bg-[#0b1938] text-white">
            Pooler / Savannah
          </option>
          <option value="statesboro" className="bg-[#0b1938] text-white">
            Statesboro
          </option>
        </select>
      </div>

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
          className="w-full rounded-full bg-[#519B99] hover:bg-[#448b89] py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] cursor-pointer mt-2"
        >
          {isSubmitting ? 'Submitting…' : (submitLabel ?? 'NEXT STEP')}
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
        <div className="mt-6 pt-5 border-t border-white/15">
          <p className="text-[9px] sm:text-[9.5px] leading-relaxed text-slate-300 font-medium uppercase tracking-tight text-left">
            BY COMPLETING AND SUBMITTING THIS FORM, I HEREBY PROVIDE EXPLICIT WRITTEN CONSENT TO RECEIVE COMMUNICATIONS THROUGH TEXT MESSAGES AND PHONE CALLS, INCLUDING THOSE TO WIRELESS NUMBERS OR NUMBERS REGISTERED ON AN INTERNAL DO NOT CALL REGISTRY. I ACKNOWLEDGE THAT THESE COMMUNICATIONS MAY BE INITIATED THROUGH TELEPHONE CALLS, PRERECORDED VOICEMAILS, OR POSTAL MAIL, AND MAY PERTAIN TO MARKETING SERVICES. I UNDERSTAND THAT SUCH COMMUNICATIONS MIGHT INVOLVE AUTOMATED SOFTWARE. ADDITIONALLY, I AFFIRM MY UNDERSTANDING AND ACCEPTANCE OF THE PRIVACY POLICY AND TERMS AND CONDITIONS. I AM AWARE THAT I CAN OPT OUT OF THESE COMMUNICATIONS AT ANY TIME BY REPLYING WITH "STOP". STANDARD MESSAGE AND DATA RATES MAY APPLY.
          </p>
        </div>
      )}
    </form>
  )
}