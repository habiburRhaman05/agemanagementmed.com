import { type Metadata } from 'next'

import { Header } from '@/components/layout/Header'
import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { UnifiedBookingForm } from '@/components/shared/UnifiedBookingForm'

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
        {/* Dark hero header */}
        <section className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-36 lg:pb-20 lg:pt-44">
          <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
          <Container className="relative text-center">
            <Reveal>
              <Eyebrow tone="inverse" className="mx-auto">
                Take the first step
              </Eyebrow>
              <h1 className="mt-6 text-display-lg text-canvas-50">Book a Consultation</h1>
              <p className="mx-auto mt-6 max-w-2xl text-body-lg text-canvas-50/80">
                Choose your preferred date and time below to schedule a private, in-depth
                evaluation with our expert medical team.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Unified form */}
        <section className="py-16 lg:py-24">
          <Container>
            <UnifiedBookingForm />
          </Container>
        </section>
      </main>
    </>
  )
}
