import { Header } from '@/components/layout/Header'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { LegalDocument } from '@/components/sections/LegalDocument'
import { privacyPolicyHtml } from '@/content/privacy-policy'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy Policy | SAMM',
  description:
    'How Savannah Age Management Medicine collects, uses, and protects your personal information.',
  canonical: '/privacy-policy',
})

export default function Page() {
  return (
    <>
      <Header />
      <HeroCompact
      align='center'
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy', href: '/privacy-policy' }]}
      />
      <LegalDocument html={privacyPolicyHtml} />
    </>
  )
}
