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
  /** Render image + text inside one unified card */
  card?: boolean
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
  card = false,
  className,
}: SafetyAndCandidacyProps) {
  const imageSrc = image?.src || ''
  const imageAlt = image?.alt || heading

  const textContent = (
    <div className={cn('flex flex-col  w-full justify-center  text-center lg:text-left', card && 'p-6 sm:p-8 lg:p-10')}>
      {/* Main Headline */}
      <h2
        className="text-[32px] sm:text-[48px] font-[500] leading-tight text-[#0b2055] mb-4 font-display"
      >
        {heading}
      </h2>

      {/* Subtitle if present */}
      {subtitle ? (
        <h3
          className="text-[22px] sm:text-[32px] font-normal text-[#0b2055] mb-3 font-display"
        >
          {subtitle}
        </h3>
      ) : null}

      {/* Body Paragraphs */}
      {paragraphs?.map((paragraph, index) => (
        <p
          key={index}
          className="text-[16px] font-normal text-[#111214] leading-relaxed mb-3"
        >
          {paragraph}
        </p>
      ))}

      {/* Questions Section */}
      {questions?.length ? (
        <div className="mt-2 mb-4">
          {questionsLabel ? (
            <h3
              className="text-[32px] font-medium leading-tight text-[#111214] mb-3 font-display"
            >
              {questionsLabel}
            </h3>
          ) : null}

          <ul className="space-y-2 my-2">
            {questions.map((question, idx) => (
              <li key={idx} className="flex items-start justify-center lg:justify-start gap-2 text-[16px] text-[#111214] font-normal">
                <span className="text-[#519B99] shrink-0 font-sans font-medium">→</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Closing Paragraph */}
      {closingParagraph ? (
        <p className="text-[16px] text-[#111214] font-normal leading-relaxed mb-4 italic">
          {closingParagraph}
        </p>
      ) : null}

      {/* Medical Disclaimer */}
      {disclaimer ? (
        <div className="mt-2 pt-3 border-t border-slate-200/60">
          <strong className="block text-[16px] font-bold text-[#111214] uppercase tracking-wider mb-1">
            {disclaimerLabel}
          </strong>
          <p className="text-[16px] text-[#111214] font-normal leading-relaxed">
            {disclaimer}
          </p>
        </div>
      ) : null}
    </div>
  )

  const imageBlock = (
    <div className={cn('relative w-full h-full min-h-[240px] sm:min-h-[420px] overflow-hidden bg-slate-200', card ? 'rounded-none shadow-none' : 'rounded-[24px] shadow-md')}>
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
    <section className={cn('relative w-full py-16 sm:py-24 px-4 ', bg, className)}>
      <Container className="w-full px-0">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 items-stretch',
            card && 'overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]',
            !card && 'gap-10 sm:gap-12 lg:gap-16'
          )}
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
