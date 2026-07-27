'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'

import { BookingForm } from '@/components/shared/BookingForm'
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
    <section className="relative isolate min-h-screen lg:min-h-screen overflow-hidden flex flex-col justify-center">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-ink-950/60" aria-hidden />

      <Container className="relative flex items-center justify-center py-24 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl w-full flex flex-col items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-display-xl text-canvas-50"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-7 max-w-2xl text-body-lg text-canvas-50/90"
          >
            {lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Booking Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="primary" className="!bg-sage-600 hover:!bg-ink-900 !text-white">
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
                <Button size="lg" variant="outlineInverse" className="group hover:!bg-sage-600 hover:!border-sage-600 hover:!text-white">
                  <Play className="mr-2 size-4 group-hover:text-white transition-colors" />
                  Watch Video
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

          {meta ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-label font-semibold uppercase text-sage-400"
            >
              {meta}
            </motion.p>
          ) : null}
        </motion.div>
      </Container>
    </section>
  )
}
