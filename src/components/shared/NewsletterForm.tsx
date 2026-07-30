'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { subscribeNewsletter, type ActionResult } from '@/actions/newsletter'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Enter a valid email address'),
})

type FormValues = z.infer<typeof schema>

const darkInputClass =
  'border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-sage-400 focus-visible:outline-sage-400'
const darkLabelClass = 'text-canvas-50/80'

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const [result, setResult] = useState<ActionResult | null>(null)

  if (result?.success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-sage-400/15 text-sage-300">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="font-display text-title-md text-white">You&apos;re on the list!</h3>
        <p className="max-w-sm text-body-sm text-canvas-50/70">
          Thanks for joining Savannah&apos;s Wellness Insiders — watch your inbox for updates.
        </p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData()
        formData.append('firstName', data.firstName)
        formData.append('lastName', data.lastName)
        formData.append('email', data.email)

        const res = await subscribeNewsletter(null, formData)
        setResult(res)
        if (res.success) reset()
      })}
      className="space-y-5"
    >
      {result && !result.success ? (
        <div className="flex items-start gap-2 rounded-lg bg-rose-500/10 px-4 py-3 text-body-sm text-rose-300">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="break-words">{result.error}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName" className={darkLabelClass}>
            First name
          </Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            placeholder="First Name"
            className={`mt-2 ${darkInputClass}`}
            aria-invalid={Boolean(errors.firstName)}
            {...register('firstName')}
          />
          {errors.firstName ? (
            <p className="mt-1.5 text-body-sm text-rose-300">{errors.firstName.message}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="lastName" className={darkLabelClass}>
            Last name
          </Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            className={`mt-2 ${darkInputClass}`}
            aria-invalid={Boolean(errors.lastName)}
            {...register('lastName')}
          />
          {errors.lastName ? (
            <p className="mt-1.5 text-body-sm text-rose-300">{errors.lastName.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className={darkLabelClass}>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          className={`mt-2 ${darkInputClass}`}
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email ? <p className="mt-1.5 text-body-sm text-rose-300">{errors.email.message}</p> : null}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Joining…' : 'Join today!'}
      </Button>
    </form>
  )
}
