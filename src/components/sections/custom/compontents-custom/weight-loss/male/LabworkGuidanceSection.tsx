'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

export function LabworkGuidanceSection() {
  return (
    <Section background="page" spacing="lg">
      <Container>
        <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[44%_56%]">
          
          {/* Left Column: Image */}
          <div className="relative min-h-[320px] bg-beige-100 lg:min-h-full">
            <Image
              src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785339098/How_We_Use_Labwor_mzioxu.jpg" // Replace with your actual image
              alt="A physician greeting a patient during a weight loss consultation"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
            
            {/* Main Heading */}
            <h2 className="font-display text-display-sm text-canvas-50">
              How We Use Labwork To Guide Your Plan
            </h2>

            {/* Bold Sub-heading */}
            <p className="mt-4 text-body font-semibold text-canvas-50">
              We don&rsquo;t guess. We test.
            </p>

            {/* Lead Paragraph */}
            <p className="mt-3 text-body leading-relaxed text-canvas-50/75 max-w-prose">
              Labwork helps us understand what&rsquo;s happening inside your body so we can build a plan that actually works.
            </p>

            {/* The Split Lists */}
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              
              {/* Left List Group */}
              <div>
                <p className="text-body-sm font-medium text-canvas-50">
                  We may review markers related to:
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Metabolism and insulin function</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Thyroid health</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Hormone balance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Inflammation levels</span>
                  </li>
                </ul>
              </div>

              {/* Right List Group */}
              <div>
                <p className="text-body-sm font-medium text-canvas-50">
                  These markers help explain things like:
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Why weight loss has stalled</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Why you feel low energy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-relaxed text-canvas-50/80">Why certain diets haven&rsquo;t worked</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Paragraph with Links */}
            <p className="mt-8 text-body-sm leading-relaxed text-canvas-50/70 max-w-prose">
              We review hormone balance and other factors that may impact weight. Learn more about our{' '}
              <Link href="/services/bhrt" className="text-canvas-50 underline decoration-sage-400/40 underline-offset-4 transition-colors hover:decoration-sage-400">
                BHRT Therapy
              </Link>
              {' '}services, including{' '}
              <Link href="/services/bhrt/men" className="text-canvas-50 underline decoration-sage-400/40 underline-offset-4 transition-colors hover:decoration-sage-400">
                Hormone Therapy for Men
              </Link>
              {' '}and{' '}
              <Link href="/services/bhrt/women" className="text-canvas-50 underline decoration-sage-400/40 underline-offset-4 transition-colors hover:decoration-sage-400">
                Hormone Therapy for Women
              </Link>
              .
            </p>

            {/* Final Paragraphs */}
            <p className="mt-4 text-body-sm leading-relaxed text-canvas-50/70 max-w-prose">
              From there, we build a plan based on your results and adjust it over time as your body responds.
            </p>
            <p className="mt-4 text-body-sm leading-relaxed text-canvas-50/60 max-w-prose">
              This is what makes lab-guided weight loss more precise and sustainable.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}