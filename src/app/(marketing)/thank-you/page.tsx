import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/shared/Container'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Thank You | SAMM',
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-canvas-50 py-24 sm:py-32">
        <Container width="prose" className="text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle2 className="size-10 text-sage-700" aria-hidden />
          </div>
          <h1 className="mt-8 text-display-md text-ink-900">Request received</h1>
          <p className="mx-auto mt-4 max-w-md text-body-lg text-canvas-600">
            Thank you for reaching out. Our team will contact you shortly to confirm your consultation details.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="primary">
              <Link href="/">Return to home</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
