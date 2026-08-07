'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FieldError } from '@/components/shared/FieldError'
import type { LocationSlug } from '@/types/content'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  location: z.enum(['savannah-pooler', 'statesboro']),
})

type FormValues = z.infer<typeof schema>

const LOCATIONS: Record<LocationSlug, { name: string; address: string; hours: string }> = {
  'savannah-pooler': {
    name: 'Pooler / Savannah',
    address: '200 Blue Moon Xing, Suite 102, Pooler, GA 31322',
    hours: 'Mon–Thu: 9AM – 5PM  |  Fri: 9AM – 3PM',
  },
  statesboro: {
    name: 'Statesboro',
    address: '5 Oak Street, Statesboro, GA 30458',
    hours: 'Mon–Thu: 8AM – 4PM  |  Fri: 8AM – 2PM',
  },
}

export interface BookingFormProps {
  defaultLocation?: LocationSlug
  /** Overrides the "General consultation" service label — e.g. to tag a claimed special. */
  serviceLabel?: string
  /** Overrides the submit button's default "NEXT STEP" label. */
  submitLabel?: string
  /** Optional handler to close modal */
  onClose?: () => void
  /** Optional custom form container class name */
  className?: string
}

export function BookingForm({
  defaultLocation,
  serviceLabel,
  submitLabel,
  onClose,
  className = '',
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: defaultLocation ?? 'savannah-pooler',
    },
  })

  const [bookingState, setBookingState] = useState<ActionResult | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          const formData = new FormData()

          formData.append('name', data.name)
          formData.append('email', data.email)
          formData.append('phone', data.phone)
          formData.append(
            'message',
            `Location: ${data.location}${serviceLabel ? ` | Service: ${serviceLabel}` : ''}`
          )

          const result = await bookAppointment(null, formData)

          if (result.success) {
            setShowThankYou(true)
          } else {
            setBookingState(result)
          }
        })}
        className={`space-y-4 sm:space-y-5 ${className}`}
        noValidate
      >
        {bookingState && !bookingState.success && (
          <div className="flex items-start gap-2 rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <span className="break-words">{bookingState.error}</span>
          </div>
        )}

        {/* Name Field */}
        <div>
          <input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="w-full h-13 sm:h-14 rounded-xl border border-white/20 bg-[#060E26]/50 focus:bg-[#060E26] px-4 sm:px-5 text-white placeholder:text-white/70 text-base sm:text-lg focus:border-teal-400 focus:outline-none transition-all"
            {...register('name')}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        {/* Email Field */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="E-mail Address"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="w-full h-13 sm:h-14 rounded-xl border border-white/20 bg-[#060E26]/50 focus:bg-[#060E26] px-4 sm:px-5 text-white placeholder:text-white/70 text-base sm:text-lg focus:border-teal-400 focus:outline-none transition-all"
            {...register('email')}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        {/* Phone Field */}
        <div>
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className="w-full h-13 sm:h-14 rounded-xl border border-white/20 bg-[#060E26]/50 focus:bg-[#060E26] px-4 sm:px-5 text-white placeholder:text-white/70 text-base sm:text-lg focus:border-teal-400 focus:outline-none transition-all"
            {...register('phone')}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        {/* Location Field */}
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
              {(Object.keys(LOCATIONS) as LocationSlug[]).map((slug) => (
                <option key={slug} value={slug}>
                  {LOCATIONS[slug].name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
          </div>
          <FieldError id="location-error" message={errors.location?.message} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 sm:h-14 rounded-full bg-[#4DA89E] hover:bg-[#3f9188] active:scale-[0.99] text-white font-bold tracking-[0.18em] text-sm sm:text-base uppercase transition-all shadow-lg shadow-teal-900/30 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed mt-6 sm:mt-8"
        >
          {isSubmitting ? 'SUBMITTING...' : (submitLabel ?? 'NEXT STEP')}
        </button>

        {/* Divider */}
        <div className="my-6 sm:my-7 border-t border-white/15" />

        {/* Consent Text */}
        <p className="text-[10px] sm:text-[11px] leading-[1.45] text-white/60 uppercase tracking-tight text-justify font-sans">
          BY COMPLETING AND SUBMITTING THIS FORM, I HEREBY PROVIDE EXPLICIT WRITTEN CONSENT TO RECEIVE COMMUNICATIONS THROUGH TEXT MESSAGES AND PHONE CALLS, INCLUDING THOSE TO WIRELESS NUMBERS OR NUMBERS REGISTERED ON AN INTERNAL DO NOT CALL REGISTRY. I ACKNOWLEDGE THAT THESE COMMUNICATIONS MAY BE INITIATED THROUGH TELEPHONE CALLS, PRERECORDED VOICEMAILS, OR POSTAL MAIL, AND MAY PERTAIN TO MARKETING SERVICES. I UNDERSTAND THAT SUCH COMMUNICATIONS MIGHT INVOLVE AUTOMATED SOFTWARE. ADDITIONALLY, I AFFIRM MY UNDERSTANDING AND ACCEPTANCE OF THE PRIVACY POLICY AND TERMS AND CONDITIONS. I AM AWARE THAT I CAN OPT OUT OF THESE COMMUNICATIONS AT ANY TIME BY REPLYING WITH &quot;STOP&quot;. STANDARD MESSAGE AND DATA RATES MAY APPLY.
        </p>
      </form>

      {/* Thank You Success Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0E1738] border border-white/10 p-6 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-300 sm:p-8 text-white">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#4DA89E]/20 text-[#4DA89E]">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="mt-4 font-serif text-2xl font-bold text-white">
              Thank You!
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              Your consultation request has been sent successfully. Our team will reach out to you shortly to confirm your appointment.
            </p>

            <button
              onClick={() => setShowThankYou(false)}
              className="mt-6 w-full h-12 rounded-full bg-[#4DA89E] hover:bg-[#42968D] text-white font-bold tracking-wider text-sm uppercase transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export { BookingForm as GetConnectedForm }
export default BookingForm