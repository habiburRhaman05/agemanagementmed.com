import { ClosingCTA } from '@/components/sections/ClosingCTA'

/**
 * Closing CTA band for the Specials page — reuses the shared ClosingCTA
 * component with the page-specific background to match the reference
 * design exactly.
 */
export function SpecialsClosingCTA() {
  return (
    <ClosingCTA
      backgroundImage="/specials/hero-16-bg.jpg"
      title="Ready to learn more or schedule an appointment?"
      body="Contact us today to speak with our team."
      cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      contentMaxWidth={620}
      centered
    />
  )
}
