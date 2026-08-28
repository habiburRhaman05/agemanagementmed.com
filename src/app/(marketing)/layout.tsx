import { AutoRevealSections } from '@/components/layout/AutoRevealSections'
import { Footer } from '@/components/layout/Footer'
import { ScrollFeatures } from '@/components/layout/ScrollFeatures'
import { PageTransition } from '@/components/shared/PageTransition'

// The sitewide organization/business schema used to render here,
// unconditionally, on every page — which meant it always won over each
// page's own `PageSeo.jsonLd` admin override (this layout has no reliable,
// verifiable way to know the current path). That decision now lives with
// each individual page instead — see `<PageSchema path="..." />` on each
// `page.tsx` — so this layout no longer renders any JSON-LD itself.

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-6 focus:py-3 focus:text-canvas-50"
      >
        Skip to content
      </a>
     

        <main id="main">{children}</main>
      
      <Footer />
    
      {/* <ScrollFeatures /> */}
   </>
  )
}
