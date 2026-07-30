'use client'

import { bookAppointment, type ActionResult } from '@/actions/appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FieldError } from '@/components/shared/FieldError'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface ContactFormProps {
  /** Overrides the submit button's default "Schedule a consultation" label. */
  submitLabel?: string
}

export function ContactForm({ submitLabel }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const [bookingState, setBookingState] = useState<ActionResult | null>(null)
  // Modal state to handle local success instead of page redirect
  const [showThankYou, setShowThankYou] = useState(false)

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          const formData = new FormData()

          // Combine first and last name for the backend action
          formData.append('name', `${data.firstName} ${data.lastName}`.trim())
          formData.append('email', data.email)
          formData.append('phone', data.phone)
          formData.append('service', 'General Consultation')
          formData.append('message', data.message || '')

          const result = await bookAppointment(null, formData)

          if (result.success) {
            // Shows the modal instead of redirecting
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

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              className="mt-2"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              {...register('firstName')}
            />
            <FieldError id="firstName-error" message={errors.firstName?.message} />
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              className="mt-2"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              {...register('lastName')}
            />
            <FieldError id="lastName-error" message={errors.lastName?.message} />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
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

        {/* Message */}
        <div>
          <Label htmlFor="message">Message (optional)</Label>
          <textarea
            id="message"
            className="mt-2 block w-full rounded-lg border border-canvas-300 bg-canvas-50 px-4 py-3 text-body text-canvas-900 transition-colors placeholder:text-gray-400 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
            rows={4}
            placeholder="Tell us about your goals or any specific questions..."
            {...register('message')}
          />
          <FieldError id="message-error" message={errors.message?.message} />
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

      {/* ─── Thank You Modal ─── */}
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
              Your message has been sent successfully. Our team will reach out to you shortly.
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