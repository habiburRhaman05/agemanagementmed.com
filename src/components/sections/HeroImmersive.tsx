
"use client"
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
import { useState } from 'react'

interface HeroImmersiveProps {
  title: string
  lead: string
  image: Media
  ctas: Cta[]
  meta?: string
}

export function HeroImmersive({ title, lead, image, meta }: HeroImmersiveProps) {
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
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
          className="object-cover object-[80%_center] sm:object-[60%_center]"
        />
      </div>

      <Container className="relative px-3! text-center! lg:text-left! lg-container">


        <h1 className="mt-5 mx-auto lg:mx-0 max-w-[730px] text-[40px] leading-[1.15] text-canvas-50 capitalize drop-shadow-sm sm:mt-8 md:mt-8 lg:text-[56px] font-medium">
          {title}
        </h1>

        <p className="mt-3 mx-auto lg:mx-0 max-w-[730px] text-sm text-canvas-50/90 sm:mt-7 sm:text-base md:text-[20px] md:leading-7.5 md:text-white font-normal">
          {lead}
        </p>

        <div
          style={{ animationDelay: '0.65s' }}
          className="hero-enter mt-6 flex w-full max-w-[730px] flex-col items-center gap-3 sm:mt-10 sm:w-fit sm:flex-row sm:gap-4 mx-auto lg:mx-0"
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
          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outlineInverse"
                className="group  flex items-center gap-x-3 justify-center uppercase text-[14px] tracking-[4px] leading-4.25 font-bold bg-white text-[#549898] hover:border-canvas-50/60 hover:bg-[#B7BCC8] ease-linear hover:text:[#B7BCC8]  "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
<path d="M11.046 5.57164L1.95607 0.683144C1.28985 0.324857 0.482422 0.807411 0.482422 1.56386V11.3409C0.482422 12.0973 1.28985 12.5799 1.95607 12.2216L11.046 7.33307C11.7478 6.95564 11.7478 5.94907 11.046 5.57164Z" fill="#519B98"/>
</svg>
                Watch video
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-1.5rem)] sm:max-w-5xl max-h-[90dvh] border-none bg-black p-0 overflow-hidden !rounded-none sm:!rounded-none md:!rounded-none lg:!rounded-none shadow-2xl [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/80 [&>button]:border-none [&>button]:size-8 [&>button]:top-3 [&>button]:right-3 [&>button]:z-30 [&>button]:rounded-full">
              {/* Radix requires a DialogTitle for a11y; visually hidden here */}
              <DialogHeader className="sr-only">
                <DialogTitle>Intro video</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden bg-black !rounded-none">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1080951303?h=91f29206b0&autoplay=1"
                  className="absolute inset-0 h-full w-full border-none bg-black"
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