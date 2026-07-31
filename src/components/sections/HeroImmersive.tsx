'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowBigRight, ArrowBigRightIcon, MoveRight, Play } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { Container } from '@/components/shared/Container'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
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
  const words = title.split(' ')
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-20 pb-14 sm:pt-28 sm:pb-24 lg:pt-32"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: 1.09 }}
        transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
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
      </motion.div>

      <div className="absolute inset-0 bg-ink-950/40" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/20 to-ink-950/10"
        aria-hidden
      />
      <div className="absolute inset-0 bg-mesh-hero opacity-50" aria-hidden />

      <Container className="relative">
        {meta ? (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sage-400 md:px-4 md:py-2 md:text-label"
          >
            {meta}
          </motion.span>
        ) : null}

        <h1 className="mt-5 max-w-4xl text-3xl leading-[1.2] text-canvas-50 drop-shadow-sm sm:mt-8 sm:text-4xl sm:leading-tight md:mt-8 md:text-display-xl">
          <StaggerGroup as="span" stagger={0.05} className="inline">
            {words.map((word, i) => (
              <StaggerItem
                as="span"
                blur
                key={`${word}-${i}`}
                className="mr-[0.28em] inline-block break-words"
              >
                {word}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-3 max-w-xl text-sm text-canvas-50/90 sm:mt-7 sm:text-base md:text-body-lg"
        >
          {lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
        >
          {/* Booking Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="primary"
                className="h-12 w-full justify-center bg-[#008080] px-6 text-body-sm sm:h-14 sm:w-auto sm:px-9 sm:text-body"
              >
                START TODAY <MoveRight />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="
                w-[calc(100%-1.5rem)]
                max-w-2xl
                max-h-[90dvh]
                overflow-y-auto
                rounded-[24px]
                p-5
                sm:w-full
                sm:rounded-[40px]
                sm:p-10
              "
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-display text-ink-900 sm:text-2xl">
                  Schedule A Consultation
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
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
                className="group h-12 w-full justify-center px-6 text-body-sm sm:h-14 sm:w-auto sm:px-9 sm:text-body"
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
        </motion.div>
      </Container>
    </section>
  )
}