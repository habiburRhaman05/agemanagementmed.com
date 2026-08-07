

import { Play } from 'lucide-react'
import Image from 'next/image'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Cta, Media } from '@/types/content'

interface HeroImmersiveProps {
  title: string
  lead: string
  image: Media
  ctas: Cta[]
  meta?: string
}

export function HeroImmersive({ title, lead, image, meta }: HeroImmersiveProps) {
  return (
    <section
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink-950 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      <div
        className="absolute inset-0 hero-zoom"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          // Mobile portrait crops need the subject pulled more toward center;
          // the 60% offset was tuned for wide desktop frames.
          className="object-cover object-[75%_center] sm:object-[60%_center]"
        />
      </div>

      <div
        className="absolute inset-0 bg-linear-to-t from-ink-950/55 via-ink-950/15 to-transparent"
        aria-hidden
      />

      <Container className="relative">
        {/* {meta ? (
          <span
            style={{ animationDelay: '0.1s' }}
            className="hero-enter glass-dark inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sage-400 md:px-4 md:py-2 md:text-label"
          >
            {meta}
          </span>
        ) : null} */}

        <h1 className="mt-5 max-w-3xl text-3xl leading-[1.2] text-canvas-50 capitalize drop-shadow-sm sm:mt-8 sm:text-4xl sm:leading-tight md:mt-8 md:text-display-md">
          {title}
        </h1>

        <p className="mt-3 max-w-xl text-sm text-canvas-50/90 sm:mt-7 sm:text-base md:text-body-lg">
          {lead}
        </p>

        <div
          style={{ animationDelay: '0.65s' }}
          className="hero-enter mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
        >
          {/* Booking Modal */}
          <BookAppointmentButton
            variant="teal"
            className="h-12 w-full sm:h-14 sm:w-auto"
            modalTitle="Schedule A Consultation"
          >
            START TODAY
          </BookAppointmentButton>

          {/* Video Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outlineInverse"
                className="group h-12 w-full justify-center px-6 text-body-sm bg-white text-[#00555A] hover:border-canvas-50/60 hover:bg-transparent hover:text-canvas-50 sm:h-14 sm:w-auto sm:px-9 sm:text-body"
              >
                <Play className="size-4" aria-hidden />
                Watch video
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-1.5rem)] max-h-[90dvh] border-none bg-black p-1 sm:max-w-5xl">
              {/* Radix requires a DialogTitle for a11y; visually hidden here */}
              <DialogHeader className="sr-only">
                <DialogTitle>Intro video</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1080951303?h=91f29206b0&autoplay=1"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </section>
  )
}