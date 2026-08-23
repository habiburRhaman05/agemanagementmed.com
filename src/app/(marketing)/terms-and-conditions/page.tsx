import { Header } from '@/components/layout/Header'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LegalDocument } from '@/components/sections/LegalDocument'
import type { Metadata } from 'next'

import { officePoliciesHtml } from '@/content/office-policies'
import { buildMetadata, resolveStaticPageSeo } from '@/lib/seo'

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

export default function Page() {
  return (
    <>
      <Header />
      <HeroCompact
        eyebrow="Legal"
        title="Terms & Conditions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        ]}
      />
      <LegalDocument html={officePoliciesHtml} />
    </>
  )
}
