import { Header } from '@/components/layout/Header'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LegalDocument } from '@/components/sections/LegalDocument'
import { PageSchema } from '@/components/seo/PageSchema'
import type { Metadata } from 'next'

import { officePoliciesHtml } from '@/content/office-policies'
import { buildMetadata, getPageH1, resolveStaticPageSeo } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    await resolveStaticPageSeo('/terms-and-conditions', {
      title: 'Terms & Conditions | SAMM',
      description:
        'Office policies and terms and conditions for patients of Savannah Age Management Medicine.',
      canonical: '/terms-and-conditions',
    }),
  )
}

export default async function Page() {
  const h1Override = await getPageH1('/terms-and-conditions')

  return (
    <>
      <PageSchema path="/terms-and-conditions" />
      <Header />
      <HeroCompact
        eyebrow="Legal"
        title={h1Override || 'Terms & Conditions'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        ]}
      />
      <LegalDocument html={officePoliciesHtml} />
    </>
  )
}
