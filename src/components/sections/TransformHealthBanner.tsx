'use client'

import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const formLoading = (
  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
    Loading form…
  </div>
)
const BookingForm = dynamic(
  () => import('../shared/BookingForm').then((mod) => mod.BookingForm),
  { loading: () => formLoading }
)

export interface TransformHealthBannerProps {
  title?: string
  lead?: string
  buttonLabel?: string
  buttonHref?: string
  backgroundImage?: string
  className?: string
}

/**
 * TransformHealthBanner component:
 * - Full-width CTA banner matching the reference screenshot design
 * - Background image with dark blue gradient overlay
 * - Bodoni Moda typography for the headline
 * - Interactive teal "SCHEDULE A CONSULTATION" CTA button that triggers the booking modal
 */
export function TransformHealthBanner({
  title = 'Ready To Transform Your Health?',
  lead = 'Take the first step towards a healthier, more vibrant you.',
  buttonLabel = 'SCHEDULE A CONSULTATION',
  buttonHref = '/book-appointment',
  backgroundImage = '/hero-11-bg.jpg',
  className,
}: TransformHealthBannerProps) {
  return (
    <section
      className={cn(
        'relative isolate w-full py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat',
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <Container className="relative z-10 max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl text-left"
        >
          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.15] text-white mb-3 sm:mb-4 font-display"
            
          >
            {title}
          </h2>

          {/* Lead Subtitle */}
          {lead ? (
            <p className="text-[20px] font-light leading-relaxed text-white/90 mb-8 sm:mb-10">
              {lead}
            </p>
          ) : null}

          {/* Interactive Modal CTA Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#519B99] hover:bg-[#448b89] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:shadow-lg border-none"
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
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
                <DialogTitle className="text-2xl font-display text-slate-900">
                  Book Your Consultation
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <BookingForm />
              </div>
            </DialogContent>
          </Dialog>
        </m.div>
      </Container>
    </section>
  )
}
