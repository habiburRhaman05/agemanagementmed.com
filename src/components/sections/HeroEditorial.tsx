'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Button } from '@/components/ui/Button'


import { cn } from '@/lib/utils'
import type { Cta, Media } from '@/types/content'
import { BookingForm } from '../shared/BookingForm'
import { LeadForm } from '../shared/LeadForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface Crumb {
  label: string
  href: string
}

/** Registry of forms that can be rendered inside the form modal, keyed by `formSource`. */
const FORM_COMPONENTS = {
  booking: BookingForm,
  lead: LeadForm,
} as const

interface HeroActions {
  /** Show a "Watch video" button that opens `videoSource` in a modal. Omit/false hides the button entirely. */
  videoModal?: boolean
  /** Show a "Schedule a consultation" button that opens `formSource` in a modal. Omit/false hides the button entirely. */
  formModal?: boolean
  /** Raw embed markup for the video modal, e.g. a Vimeo/YouTube `<iframe>` string. */
  videoSource?: string
  /** Which form to render inside the form modal. */
  formSource?: keyof typeof FORM_COMPONENTS
}

interface HeroEditorialProps {
  eyebrow?: string
  title: string
  lead: string
  image: Media
  ctas?: Cta[]
  breadcrumbs?: Crumb[]
  actions?: HeroActions
  /** Treatment pages want the full viewport; editorial/blog posts stay a shorter, content-forward height. */
  fullHeight?: boolean
}

/**
 * An immersive hero style applied to treatments and editorial pages.
 * The image covers the background, overlaid with dark scrim to keep text legible.
 *
 * Sub-elements stagger on page load (breadcrumbs → eyebrow → h1 → lead → CTAs)
 * for a cinematic entrance consistent with the home page HeroImmersive.
 *
 * `actions` drives two optional modal-triggered buttons:
 * - `formModal: true` shows "Schedule a consultation", opening `formSource` in a dialog
 * - `videoModal: true` shows "Watch video", opening `videoSource` (an iframe embed string) in a dialog
 * Either button is omitted entirely when its flag is false/unset.
 */
export function HeroEditorial({
  eyebrow,
  title,
  lead,
  image,
  ctas,
  breadcrumbs,
  actions,
  fullHeight = false,
}: HeroEditorialProps) {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay: number, distance = 18) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  const blurUp = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 22,
      filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
    },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  const FormComponent = actions?.formSource ? FORM_COMPONENTS[actions.formSource] : BookingForm
  const showFormButton = Boolean(actions?.formModal)
  const showVideoButton = Boolean(actions?.videoModal && actions?.videoSource)

  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44',
        fullHeight ? 'min-h-screen' : 'min-h-128 lg:min-h-168',
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/45 to-ink-950/20" aria-hidden />

      <Container className="relative">
        <div className="max-w-3xl">
          {breadcrumbs?.length ? (
            <motion.nav aria-label="Breadcrumb" className="mb-8" {...fadeUp(0.05, 10)}>
              <ol className="flex flex-wrap items-center gap-1.5 text-body-sm text-canvas-50/70">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 ? (
                      <ChevronRight className="size-3.5 text-canvas-50/40" aria-hidden />
                    ) : null}
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </motion.nav>
          ) : null}

          {eyebrow ? (
            <motion.div {...fadeUp(0.15)} className="mb-5">
              <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
            </motion.div>
          ) : null}

          <motion.h1 className="text-display-lg text-canvas-50" {...blurUp(0.22)}>
            {title}
          </motion.h1>

          <motion.p className="mt-6 max-w-2xl text-body-lg text-canvas-50/90" {...fadeUp(0.38)}>
            {lead}
          </motion.p>

          {/* {ctas?.length ? (
            <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeUp(0.5)}>
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href}
                  asChild
                  size="lg"
                  variant={cta.variant ?? (i === 0 ? 'primary' : 'outlineInverse')}
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </motion.div>
          ) : null} */}

          {showFormButton || showVideoButton ? (
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              {...fadeUp(0.5)}
            >
              {showFormButton ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="primary" className="bg-[#008080]">
                      Schedule a consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="
                      w-[calc(100%-1rem)]
                      max-w-2xl
                      max-h-[90dvh]
                      overflow-y-auto
                      rounded-[28px]
                      p-5
                      sm:w-full
                      sm:rounded-[40px]
                      sm:p-10
                    "
                  >
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-display text-ink-900">
                        Book Your Consultation
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">{FormComponent ? <FormComponent /> : null}</div>
                  </DialogContent>
                </Dialog>
              ) : null}

              {showVideoButton ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outlineInverse" className="group">
                      <Play className="mr-2 size-4" aria-hidden />
                      Watch video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-5xl p-1 bg-black border-none max-h-[90vh]">
                    <div
                      className="relative w-full aspect-video overflow-hidden rounded-lg [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
                      // videoSource is CMS-authored embed markup (e.g. a Vimeo <iframe>), not user input.
                      dangerouslySetInnerHTML={{ __html: actions!.videoSource! }}
                    />
                  </DialogContent>
                </Dialog>
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}