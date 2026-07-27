'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'

import { BookingForm } from '@/components/shared/BookingForm'
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

interface HeroImmersiveProps {
  title: string
  lead: string
  image: Media
  ctas: Cta[]
  meta?: string
}

/**
 * Full-bleed background photo with a slow, continuous Ken Burns drift — a
 * light scrim (not a flat dark box) keeps the statement legible without
 * flattening the photography into wallpaper.
 */
export function HeroImmersive({ title, lead, image, meta }: HeroImmersiveProps) {
  const words = title.split(' ')
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink-950 pt-28 pb-24 lg:pt-32">
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
          className="object-cover object-[60%_center]"
        />
      </motion.div>

      {/* Light scrim — enough for legibility, not a flat dark box over the photo. */}
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
            className="glass-dark inline-flex items-center rounded-full px-4 py-2 text-label font-semibold uppercase tracking-widest text-sage-400"
          >
            {meta}
          </motion.span>
        ) : null}

        <h1 className="mt-8 max-w-4xl text-display-xl text-canvas-50 drop-shadow-sm">
          <StaggerGroup as="span" stagger={0.05} className="inline">
            {words.map((word, i) => (
              <StaggerItem as="span" blur key={`${word}-${i}`} className="mr-[0.28em] inline-block">
                {word}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-7 max-w-xl text-body-lg text-canvas-50/90"
        >
          {lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Booking Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="primary">
                Schedule a consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-ink-900">
                  Book Your Consultation
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
              <Button size="lg" variant="outlineInverse" className="group">
                <Play className="mr-2 size-4" aria-hidden />
                Watch video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-1 bg-black border-none max-h-[90vh]">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1080951303?h=91f29206b0&autoplay=1"
                  className="absolute inset-0 w-full h-full"
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
