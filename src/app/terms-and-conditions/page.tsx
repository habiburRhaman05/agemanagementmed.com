import { Header } from '@/components/layout/Header'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LegalDocument } from '@/components/sections/LegalDocument'
import { officePoliciesHtml } from '@/content/office-policies'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Terms & Conditions | SAMM',
  description:
    'Office policies and terms and conditions for patients of Savannah Age Management Medicine.',
  canonical: '/terms-and-conditions',
})

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
