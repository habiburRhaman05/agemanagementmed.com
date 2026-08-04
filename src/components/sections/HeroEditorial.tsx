

import { ArrowRight, ChevronRight, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Button } from '@/components/ui/Button'


import { cn } from '@/lib/utils'
import type { Cta, Media } from '@/types/content'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

// react-hook-form + zod only need to load once the consultation dialog is
// actually opened, not as part of every treatment page's initial bundle —
// this hero renders on every treatment page, so deferring these two forms
// is the single highest-impact JS-payload cut available site-wide.
const formLoading = (
  <div className="flex h-48 items-center justify-center text-body-sm text-canvas-600">
    Loading form…
  </div>
)
const BookingForm = dynamic(
  () => import('../shared/BookingForm').then((mod) => mod.BookingForm),
  { loading: () => formLoading },
)
const LeadForm = dynamic(() => import('../shared/LeadForm').then((mod) => mod.LeadForm), {
  loading: () => formLoading,
})

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
  breadcrumbs,
  actions,
  fullHeight = false,
}: HeroEditorialProps) {
  const FormComponent = actions?.formSource ? FORM_COMPONENTS[actions.formSource] : BookingForm
  const showFormButton = Boolean(actions?.formModal)
  const showVideoButton = Boolean(actions?.videoModal && actions?.videoSource)

  // Smaller, non-full-width CTA on mobile; the "lg" size (via the `size` prop) still applies from `sm:` up.
  const ctaSizeClass = 'h-11 px-6 text-body-sm uppercase tracking-wide sm:h-14 sm:px-9 sm:text-body'

  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-center overflow-hidden ',
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
      <div
        className="absolute inset-0 bg-linear-to-r from-[#16284F]/80 via-[#16284F]/45 to-transparent pointer-events-none z-0"
        aria-hidden
      />

      <Container className="relative z-10 py-35 md:py-50 lg:py-60 !px-3">
        <div className="max-w-3xl text-center sm:text-left">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.15] text-white font-['Bodoni_Moda',var(--font-bodoni),serif]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-[17px] font-light leading-relaxed text-white/90 md:mt-6">
            {lead}
          </p>

          { !showFormButton && !showVideoButton ? (
            <div
              className="hero-enter mt-6 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:justify-start md:mt-10 md:gap-4"
              style={{ animationDelay: '0.5s' }}
            >
             <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="primary" className={cn('bg-[#008080] w-auto justify-center', ctaSizeClass)}>
                      Schedule a consultation <span><ArrowRight></ArrowRight></span>
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
            </div>
          ) : null}



          {showFormButton || showVideoButton ? (
            <div
              className="hero-enter mt-6 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:justify-start md:mt-10 md:gap-4"
              style={{ animationDelay: '0.5s' }}
            >
              {showFormButton ? (
                <Dialog>
                  <DialogTrigger asChild>
                   <Button size="lg" variant="primary" className={cn('bg-[#008080] w-auto justify-center', ctaSizeClass)}>
                      Schedule a consultation <span><ArrowRight></ArrowRight></span>
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
                    <Button size="lg" variant="outlineInverse" className={cn('group w-auto justify-center', ctaSizeClass)}>
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
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}