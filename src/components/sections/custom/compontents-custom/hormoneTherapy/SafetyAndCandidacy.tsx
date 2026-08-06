'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'
import type { Media } from '@/types/content'

export interface SafetyAndCandidacyProps {
  image: Media
  imageSide?: 'left' | 'right'
  heading: string
  subtitle?: string
  paragraphs: string[]
  questionsLabel?: string
  questions?: string[]
  closingParagraph?: string
  disclaimerLabel?: string
  disclaimer?: string
  bg?: string
  className?: string
}

/**
 * SafetyAndCandidacy section component:
 * - Redesigned to match the reference screenshots pixel-for-pixel
 * - Bodoni Moda typography for headings & sub-headers
 * - Teal directional arrow (→) list items
 * - Clean medical disclaimer block
 * - Rounded-[24px] image card with responsive flex/grid ordering
 */
export function SafetyAndCandidacy({
  image,
  imageSide = 'left',
  heading,
  subtitle,
  paragraphs,
  questionsLabel,
  questions,
  closingParagraph,
  disclaimerLabel = 'Medical Disclaimer:',
  disclaimer,
  bg = 'bg-[#F8F9F5]',
  className,
}: SafetyAndCandidacyProps) {
  const imageSrc = image?.src || ''
  const imageAlt = image?.alt || heading

  const textContent = (
    <div className="flex flex-col justify-center">
      {/* Main Headline */}
      <h2
        className="text-3xl sm:text-4xl md:text-[38px] font-normal leading-tight text-[#1C274C] mb-4 font-display"
        
      >
        {heading}
      </h2>

      {/* Subtitle if present */}
      {subtitle ? (
        <h3
          className="text-xl sm:text-2xl font-normal text-[#1C274C] mb-3 font-display"
          
        >
          {subtitle}
        </h3>
      ) : null}

      {/* Body Paragraphs */}
      {paragraphs?.map((paragraph, index) => (
        <p
          key={index}
          className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-3"
        >
          {paragraph}
        </p>
      ))}

      {/* Questions Section */}
      {questions?.length ? (
        <div className="mt-2 mb-4">
          {questionsLabel ? (
            <h3
              className="text-xl sm:text-2xl font-normal text-[#1C274C] mb-3 font-display"
              
            >
              {questionsLabel}
            </h3>
          ) : null}

          <ul className="space-y-2 my-2">
            {questions.map((question, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-normal">
                <span className="text-[#519B99] shrink-0 font-sans font-medium">→</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Closing Paragraph */}
      {closingParagraph ? (
        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4 italic text-slate-500">
          {closingParagraph}
        </p>
      ) : null}

      {/* Medical Disclaimer */}
      {disclaimer ? (
        <div className="mt-2 pt-3 border-t border-slate-200/60">
          <strong className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            {disclaimerLabel}
          </strong>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            {disclaimer}
          </p>
        </div>
      ) : null}
    </div>
  )

  const imageBlock = (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-[24px] overflow-hidden shadow-md bg-slate-200">
      {imageSrc.startsWith('http') ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
      )}
    </div>
  )

  return (
    <section className={cn('relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8', bg, className)}>
      <Container className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-10 sm:gap-12 lg:gap-16"
        >
          {imageSide === 'left' ? (
            <>
              {imageBlock}
              {textContent}
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1">{textContent}</div>
              <div className="order-1 lg:order-2 h-full">{imageBlock}</div>
            </>
          )}
        </m.div>
      </Container>
    </section>
  )
}
