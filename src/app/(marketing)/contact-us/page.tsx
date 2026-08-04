import { Header } from '@/components/layout/Header'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactInfoSection } from '@/components/sections/ContactInfoSection'
import { ContactMapForm } from '@/components/sections/ContactMapForm'
import { contactContent } from '@/content/pages/contact'
import { locations } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(contactContent.seo)

export default function ContactPage() {
  return (
    <>
      <ContactHero
        title="Connect with us at Savannah Age Management Medicine!"
        lead={contactContent.hero.lead}
      />
      <ContactInfoSection locations={locations} />
      <ContactMapForm location={locations[0]} />

    </>
  )
}
