'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'

export interface SymptomsLabsReviewPanelProps {
  title?: string
  subtitle?: string
  body?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

/**
 * Text-left, image-right panel matching the reference: a two-line Bodoni
 * heading (short label + question), a body paragraph, and a tall rounded
 * photo card. Mirrors PatientBenefitsSection's title/subtitle typography
 * but with the image on the opposite side and a paragraph instead of a
 * bulleted list.
 */
export function SymptomsLabsReviewPanel({
  title = 'Symptoms + Labs Review',
  subtitle = 'Not Sure If Low Testosterone Is Holding You Back?',
  body = 'Review your symptoms and labs with our clinical team and get clear answers - no pressure, no guesswork.',
  imageSrc = 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-74-img.jpg',
  imageAlt = 'A patient reviewing symptoms and labs with a provider',
  className,
}: SymptomsLabsReviewPanelProps) {
  return (
    <section className={cn('relative w-full bg-canvas-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <Container className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2
              className="text-3xl sm:text-4xl md:text-[38px] font-normal leading-tight text-[#1C274C] mb-3 font-display"
              
            >
              {title}
            </h2>

            <h3
              className="text-xl sm:text-2xl font-normal leading-snug text-[#1C274C] mb-6 max-w-md font-display"
              
            >
              {subtitle}
            </h3>

            <p className="max-w-md text-sm sm:text-base text-slate-600 leading-relaxed">{body}</p>
          </div>

          {/* Right Column: Image Card */}
          <div className="relative w-full aspect-4/3 sm:aspect-square lg:aspect-auto lg:h-[600px] rounded-[24px] overflow-hidden shadow-md bg-slate-200 order-1 lg:order-2">
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
        </m.div>
      </Container>
    </section>
  )
}
