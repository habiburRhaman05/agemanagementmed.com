import { type Metadata } from 'next'
import Image from 'next/image'

import { Header } from '@/components/layout/Header'
import { AdvancedBookingForm } from '@/components/shared/AdvancedBookingForm'
import { Container } from '@/components/shared/Container'

export const metadata: Metadata = {
  title: 'Book a Consultation | SAMM',
  description:
    'Schedule your private consultation with Savannah Age Management Medicine to discuss hormone therapy, weight loss, and more.',
}

export default function BookPage() {
  return (
    <>
      <Header overlay />
      <main className="bg-canvas-100">
        <section className="relative isolate flex min-h-[24rem] flex-col justify-center overflow-hidden pb-12 pt-32 lg:min-h-[32rem] lg:pt-40">
          <Image
            src="/images/gallery/IMG_5666.jpg"
            alt="Clinic interior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-ink-950/70" aria-hidden />

          <Container className="relative text-center">
            <span className="mb-4 block text-label font-semibold uppercase text-sage-400">
              Take the first step
            </span>
            <h1 className="text-display-lg text-canvas-50">Book a Consultation</h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-canvas-50/90">
              Choose your preferred date and time below to schedule a private, in-depth evaluation
              with our expert medical team.
            </p>
          </Container>
        </section>

        <section className="py-20 lg:py-28 relative z-10 -mt-10 lg:-mt-16">
          <Container>
            <AdvancedBookingForm />
          </Container>
        </section>
      </main>
    </>
  )
}
