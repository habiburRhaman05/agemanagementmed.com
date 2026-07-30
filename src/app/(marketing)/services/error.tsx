'use client'

import { AlertCircle, RotateCcw } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="pt-24 pb-12">
      <Section background="page" spacing="lg">
        <Container>
          <div className="mx-auto max-w-xl text-center flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            
            <h2 className="font-serif text-3xl font-bold text-navy-900 sm:text-4xl mb-4">
              Something went wrong
            </h2>
            
            <p className="text-body-md text-canvas-600 mb-8">
              We encountered an issue loading our services. Please try again or contact us if the problem persists.
            </p>
            
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sage-600 bg-sage-600 px-6 py-3 text-body-sm font-semibold text-white transition-all duration-300 hover:bg-sage-700 hover:border-sage-700"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
