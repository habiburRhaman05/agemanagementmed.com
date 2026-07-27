import { Header } from '@/components/layout/Header'
import { BookingForm } from '@/components/shared/BookingForm'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LocationBlock } from '@/components/sections/LocationBlock'
import { contactContent } from '@/content/pages/contact'
import { locations } from '@/content/site'
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
        <Container width="prose">
          <BookingForm />
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
