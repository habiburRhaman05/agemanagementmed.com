import { Mail, Phone } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { BookingForm } from '@/components/shared/BookingForm'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LocationBlock } from '@/components/sections/LocationBlock'
import { contactContent } from '@/content/pages/contact'
import { locations, site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(contactContent.seo)

export default function ContactPage() {
  return (
    <>
      <Header />
      <HeroCompact
        {...contactContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact-us' }]}
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2 className="text-title-lg">Prefer to talk now?</h2>
              <p className="mt-3 text-body-sm text-canvas-600">
                Reach our care team directly — we typically respond the same business day.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-colors hover:border-sage-600/40"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-body-sm text-canvas-600">Call us</span>
                    <span className="block font-semibold text-ink-900 group-hover:text-sage-700">
                      {site.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={site.emailHref}
                  className="group flex items-center gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-colors hover:border-sage-600/40"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-body-sm text-canvas-600">Email us</span>
                    <span className="block font-semibold text-ink-900 group-hover:text-sage-700 break-all">
                      {site.email}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              <div className="rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-md sm:p-10">
                <h2 className="text-title-lg">Request a consultation</h2>
                <p className="mt-2 text-body-sm text-canvas-600">
                  Tell us a bit about you and we'll follow up to confirm a time.
                </p>
                <div className="mt-8">
                  <BookingForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <LocationBlock
        eyebrow="Visit us"
        title="Two clinics across coastal Georgia"
        locations={locations}
        showMap
      />

      <FAQAccordion
        eyebrow="Before you book"
        title="Common questions"
        items={[
          {
            question: 'What happens at my first consultation?',
            answer:
              'Your provider reviews your symptoms and health history, discusses your goals, and, where appropriate, orders lab work to build a personalized plan.',
          },
          {
            question: 'Do you accept insurance?',
            answer:
              'SAMM operates as a concierge practice. Visit our financing options page for details on payment plans and what to expect regarding cost.',
          },
          {
            question: 'Can I choose between the Pooler and Statesboro locations?',
            answer:
              'Yes — select your preferred location on the booking form and our team will confirm availability.',
          },
        ]}
      />
    </>
  )
}
