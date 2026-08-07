import { ClosingCTA } from '@/components/sections/ClosingCTA'

const IMAGE_URL =
  'https://www.agemanagementmed.com/themes/default/assets/images/hero-25-bg.jpg'

/**
 * Closing CTA band for the Male Weight Loss page — reuses the shared
 * ClosingCTA component with the page-specific background, title, body
 * and CTA label to match the reference design exactly.
 */
export function WeightLossClosingCTA() {
  return (
    <ClosingCTA
      backgroundImage={IMAGE_URL}
      title="Start Your Personalized Weight Loss Plan Today"
      body="You don't have to figure this out on your own."
      cta={{ href: '/book-appointment', label: 'Schedule a Consultation' }}
    />
  )
}
