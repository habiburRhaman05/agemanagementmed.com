import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactInfoSection } from '@/components/sections/ContactInfoSection'
import { ContactMapForm } from '@/components/sections/ContactMapForm'
import { PageSchema } from '@/components/seo/PageSchema'
import { contactContent } from '@/content/pages/contact'
import { locations } from '@/content/site'
import { buildMetadata, getPageH1, resolveStaticPageSeo } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await resolveStaticPageSeo('/contact-us', contactContent.seo))
}

export default async function ContactPage() {
  // PageSeo.h1 for '/contact-us' — this page never fetched PageSeo at all
  // before, so an admin setting an H1 override here had zero effect.
  const h1Override = await getPageH1('/contact-us')

  return (
    <>
      <PageSchema path="/contact-us" />
      <Header />
      <ContactHero
        title={h1Override || 'Connect with us at Savannah Age Management Medicine!'}
        lead={contactContent.hero.lead}
      />
      <ContactInfoSection locations={locations} />
      <ContactMapForm location={locations[0]} />

    </>
  )
}
