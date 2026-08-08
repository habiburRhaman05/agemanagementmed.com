import Link from 'next/link'

import { Header } from '@/components/layout/Header'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <div className='bg-[#58617C] w-full sm:h-[145px] h-[100px] '>
        <Header />
      </div>
      <Section spacing="xl" className="pt-40 bg-white">
        <Container width="prose">
          <div className="text-center">
            <span className="text-label font-semibold uppercase text-sage-700">Error 404</span>
            <h1 className="mt-5 text-display-lg">This page doesn&rsquo;t exist</h1>
            <p className="mx-auto mt-6 max-w-md text-body-lg text-canvas-600">
              The page you were looking for may have moved. Let us point you somewhere useful.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact-us">Contact us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
