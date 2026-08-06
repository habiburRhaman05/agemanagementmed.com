

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
  /** Hide the default fallback CTA button if no actions are specified. */
  hideDefaultCta?: boolean
  containerOverride?: string
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
  hideDefaultCta = false,
  containerOverride,
}: HeroEditorialProps) {
  const FormComponent = actions?.formSource ? FORM_COMPONENTS[actions.formSource] : BookingForm
  const showFormButton = Boolean(actions?.formModal)
  const showVideoButton = Boolean(actions?.videoModal && actions?.videoSource)

  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-end sm:justify-center overflow-hidden ',
        fullHeight ? 'min-h-[100dvh] sm:min-h-screen' : 'min-h-128 lg:min-h-[620px]',
      )}
    >
      {/* Background Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover absolute inset-0 z-0"
        style={{ objectPosition: image.focalPoint ?? '85% center' }}
      />
      {/* Dark gradient overlay to ensure text legibility while keeping the top of the image completely vibrant */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />


      <Container className={cn("relative z-10 py-35 md:py-50 lg:py-60 !px-3 ", containerOverride)}>
        <div className="max-w-[528px] text-center sm:text-left">
          <h1
            className="text-[40px] sm:text-[46px] lg:text-[56px] font-medium leading-[1.15] text-white font-['Bodoni_Moda',var(--font-bodoni),serif]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-[18px] lg:text-[20px] font-normal leading-relaxed text-white/90 md:mt-6">
            {lead}
          </p>

          {!showFormButton && !showVideoButton && !hideDefaultCta ? (
            <div
              className={cn(
                'hero-enter mt-8 flex flex-col flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4 w-full',
                centerUntilTablet ? 'min-[992px]:flex-row min-[992px]:justify-start' : 'sm:flex-row sm:justify-start',
              )}
              style={{ animationDelay: '0.5s' }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[12px] sm:text-[13px] uppercase tracking-[0.1em] px-6 py-3.5 sm:px-8 sm:py-4 h-auto flex sm:inline-flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg border-none w-full sm:w-auto">
                    <span>START TODAY</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
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
              className={cn(
                'hero-enter mt-8 flex flex-col flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4 w-full',
                centerUntilTablet ? 'min-[992px]:flex-row min-[992px]:justify-start' : 'sm:flex-row sm:justify-start',
              )}
              style={{ animationDelay: '0.5s' }}
            >
              {showFormButton ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[12px] sm:text-[13px] uppercase tracking-[0.1em] px-6 py-3.5 sm:px-8 sm:py-4 h-auto flex sm:inline-flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg border-none w-full sm:w-auto">
                      <span>START TODAY</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
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
                    <Button size="lg" variant="outlineInverse" className="rounded-full bg-white hover:bg-slate-100 text-[#519B99] hover:text-[#448b89] font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.1em] px-6 py-3.5 sm:px-8 sm:py-4 h-auto inline-flex items-center justify-center gap-2 shadow-md transition-all duration-200 border-none w-auto">
                      <Play className="h-3.5 w-3.5 fill-[#519B99] text-[#519B99] translate-x-0.5" aria-hidden="true" />
                      <span>WATCH VIDEO</span>
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