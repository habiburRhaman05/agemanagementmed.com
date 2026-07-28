import { Footer } from '@/components/layout/Footer'
import { ScrollFeatures } from '@/components/layout/ScrollFeatures'
import { PageTransition } from '@/components/shared/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildOrganizationSchema } from '@/lib/seo'
import { getSiteSettings } from '@/lib/settings'

/** Chrome for every public marketing page — footer, page-transition animation, scroll features, Organization schema. Admin pages are a sibling route group and never see this. */
export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <>
      <JsonLd
        data={buildOrganizationSchema({
          siteName: settings.siteName,
          phone: settings.phone,
          email: settings.email,
        })}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-6 focus:py-3 focus:text-canvas-50"
      >
        Skip to content
      </a>
      <PageTransition>
        <main id="main">{children}</main>
      </PageTransition>
      <Footer />
      <ScrollFeatures />
    </>
  )
}
