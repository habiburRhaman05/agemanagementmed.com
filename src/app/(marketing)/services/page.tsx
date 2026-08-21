import { Services } from '@/components/shared/Services'
import { getServices } from '@/content/services'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Header } from '@/components/layout/Header'
import { getPageH1 } from '@/lib/seo'


export const metadata = {
  title: 'Our Services | Savannah Age Management Medicine',
  description: 'Explore our range of treatments and services designed to help you live life feeling energetic, strong, and confident.',
}

export default async function ServicesPage() {
  const treatments = await getServices()
  // PageSeo.h1 for '/services'. Note: this only reaches the empty-state
  // branch below — the normal (treatments-loaded) branch has no `<h1>` at
  // all (see the final report for why that's a separate issue).
  const h1Override = await getPageH1('/services')

  if (!treatments || treatments.length === 0) {
    return (
      <Section className="py-24" background="page">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-3xl text-navy-900 sm:text-4xl">
              {h1Override || 'Our Services'}
            </h1>
            <p className="mt-4 text-canvas-600 max-w-lg">
              We are currently updating our services catalog. Please check back later or contact us directly to learn more about our treatments.
            </p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Header/>
      <div className="pt-24 pb-12">
      <Services
        eyebrow="Our treatments"
        title="Comprehensive Care for Optimal Health"
        lead="Discover personalized age management, hormone therapy, and wellness treatments tailored to your unique needs."
        treatments={treatments}
        visibleCount={treatments.length}
        background="page"
      />
    </div>
    </>
  )
}
