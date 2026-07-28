'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { submitLead, type ActionResult } from '@/actions/lead'
import { FieldError } from '@/components/shared/FieldError'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { features } from '@/content/feature'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  treatment: z.string().optional(),
  consent: z.literal(true, {
    message: 'Consent is required to submit this form',
  }),
})

type FormValues = z.infer<typeof schema>

export function GetConnectedForm() {
  const pathname = usePathname()
  const [submitted, setSubmitted] = useState(false)
  const [state, setState] = useState<ActionResult | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-6 text-display-sm font-display text-ink-900">Thank You!</h3>
        <p className="mt-3 max-w-md text-body text-canvas-600">
          Your message has been received. A member of our care team will follow up with you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        if (data.phone) formData.append('phone', data.phone)
        if (data.treatment) formData.append('message', `Interested in: ${data.treatment}`)
        formData.append('sourcePath', pathname)

        const result = await submitLead(null, formData)
        if (result.success) {
          setSubmitted(true)
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
          <Label htmlFor="gc-name">Full name</Label>
          <Input
            id="gc-name"
            className="mt-2"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'gc-name-error' : undefined}
            {...register('name')}
          />
          <FieldError id="gc-name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="gc-phone">Phone (optional)</Label>
          <Input
            id="gc-phone"
            type="tel"
            className="mt-2"
            autoComplete="tel"
            {...register('phone')}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="gc-email">Email address</Label>
        <Input
          id="gc-email"
          type="email"
          className="mt-2"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'gc-email-error' : undefined}
          {...register('email')}
        />
        <FieldError id="gc-email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="gc-treatment">Treatment of interest (optional)</Label>
        <select
          id="gc-treatment"
          className={cn(
            'mt-2 flex h-14 w-full rounded-xl border border-canvas-300 bg-canvas-50 px-4 text-body text-canvas-900',
            'transition-shadow duration-200',
            'focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...register('treatment')}
        >
          <option value="">Select a treatment…</option>
          {features.map((f) => (
            <option key={f.slug} value={f.shortName}>
              {f.shortName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="gc-consent"
                className="mt-0.5 shrink-0"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby="gc-consent-text gc-consent-error"
              />
            )}
          />
          <Label
            htmlFor="gc-consent"
            id="gc-consent-text"
            className="flex-1 text-body-sm leading-relaxed text-canvas-600"
          >
            {site.legal.smsConsent}
          </Label>
        </div>
        <FieldError id="gc-consent-error" message={errors.consent?.message as string | undefined} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:min-w-[240px] sm:w-auto">
        {isSubmitting ? 'Submitting…' : 'Get Connected'}
      </Button>
    </form>
  )
}
