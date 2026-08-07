

import { MoveRight, Play } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

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

const BookingForm = dynamic(
  () => import('../shared/GetConnectedForm').then((mod) => mod.BookingForm),
  {
    loading: () => (
      <div className="flex h-48 items-center justify-center text-body-sm text-canvas-600">
        Loading form…
      </div>
    ),
  },
)

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
      className="relative isolate flex items-center overflow-hidden bg-ink-950 px-0 pt-32.75 pb-32.75 min-[348px]:pt-35 min-[348px]:pb-35 sm:pt-40 sm:pb-24 lg:pt-70 lg:pb-45"
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

      <Container className="relative px-3! text-center! lg:text-left! lg-container">
        {/* {meta ? (
          <span
            style={{ animationDelay: '0.1s' }}
            className="hero-enter glass-dark inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sage-400 md:px-4 md:py-2 md:text-label"
          >
            {meta}
          </span>
        ) : null} */}

        <h1 className="mt-5 mx-auto lg:mx-0 max-w-80 sm:max-w-2xl md:max-w-3xl text-3xl leading-[1.2] text-canvas-50 capitalize drop-shadow-sm sm:mt-8 sm:text-4xl sm:leading-tight md:mt-8 md:text-[64px] md:leading-17.5 font-medium">
          {title}
        </h1>

        <p className="mt-3 mx-auto lg:mx-0 max-w-xl text-sm text-canvas-50/90 sm:mt-7 sm:text-base md:text-[20px] md:leading-7.5 md:text-white font-normal">
          {lead}
        </p>

        <div
          style={{ animationDelay: '0.65s' }}
          className="hero-enter mt-6 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-fit sm:flex-row sm:gap-4 mx-auto lg:mx-0"
        >
          {/* Booking Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="primary"
                className="h-12 w-auto justify-center bg-[#008080] px-6 text-[14px] leading-4.25 font-bold sm:h-14 sm:px-9"
              >
                START TODAY <MoveRight />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="
                max-h-[92dvh]
                w-[calc(100%-1.5rem)]
                max-w-[480px]
                sm:max-w-[520px]
                md:max-w-[580px]
                lg:max-w-[620px]
                overflow-y-auto
                rounded-[28px]
                border-none
                bg-[#0B1530]
                p-6
                sm:p-10
                text-white
                shadow-2xl
                [&>button]:bg-white/10
                [&>button]:text-white/70
                [&>button]:hover:bg-white/20
                [&>button]:hover:text-white
                [&>button]:border-none
                [&>button]:cursor-pointer
                [&>button]:rounded-full
                [&>button]:size-9
              "
            >
              <DialogHeader className="mb-2 text-center">
                <DialogTitle className="font-serif text-2xl sm:text-[32px] font-bold text-white text-center tracking-tight">
                  Schedule A Consultation
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <BookingForm />
              </div>
            </DialogContent>
          </Dialog>

          {/* Video Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outlineInverse"
                className="group h-12 w-auto justify-center px-6 text-[14px] leading-4.25 font-bold bg-white text-[#00555A] hover:border-canvas-50/60 hover:bg-transparent hover:text-canvas-50 sm:h-14 sm:px-9"
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