'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { submitLead, type ActionResult } from '@/actions/lead'
import { FieldError } from '@/components/shared/FieldError'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { site } from '@/content/site'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, {
    message: 'Consent is required to submit this form',
  }),
})

type FormValues = z.infer<typeof schema>

/**
 * The lighter-weight "quick inquiry" form — no scheduling fields, stored as
 * a `Lead` (separate model from `Appointment`, which represents an actual
 * booking intent). Used wherever `hero.actions.formSource === 'lead'`.
 */
export function LeadForm() {
  const router = useRouter()
  const pathname = usePathname()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const [state, setState] = useState<ActionResult | null>(null)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        if (data.phone) formData.append('phone', data.phone)
        if (data.message) formData.append('message', data.message)
        formData.append('sourcePath', pathname)

        const result = await submitLead(null, formData)

        if (result.success) {
          router.push('/thank-you')
        } else {
          setState(result)
        }
      })}
      className="space-y-5 sm:space-y-6"
      noValidate
    >
      {state && !state.success && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <Label htmlFor="lead-name">Full name</Label>
          <Input
            id="lead-name"
            className="mt-2"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            {...register('name')}
          />
          <FieldError id="lead-name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="lead-phone">Phone (optional)</Label>
          <Input
            id="lead-phone"
            type="tel"
            className="mt-2"
            autoComplete="tel"
            {...register('phone')}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="lead-email">Email address</Label>
        <Input
          id="lead-email"
          type="email"
          className="mt-2"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'lead-email-error' : undefined}
          {...register('email')}
        />
        <FieldError id="lead-email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="lead-message">What can we help with? (optional)</Label>
        <textarea
          id="lead-message"
          rows={3}
          className="mt-2 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 py-3 text-body text-canvas-900 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600"
          {...register('message')}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="lead-consent"
                className="mt-0.5 shrink-0"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby="lead-consent-text lead-consent-error"
              />
            )}
          />
          <Label
            htmlFor="lead-consent"
            id="lead-consent-text"
            className="flex-1 text-body-sm leading-relaxed text-canvas-600"
          >
            {site.legal.smsConsent}
          </Label>
        </div>
        <FieldError id="lead-consent-error" message={errors.consent?.message as string | undefined} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:min-w-[240px] sm:w-auto">
        {isSubmitting ? 'Submitting…' : 'Send inquiry'}
      </Button>
    </form>
  )
}
