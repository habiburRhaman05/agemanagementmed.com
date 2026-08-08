'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'

export interface PatientBenefitsSectionProps {
  title?: string
  subtitle?: string
  benefits?: string[]
  imageSrc?: string
  imageAlt?: string
  className?: string
}

const DEFAULT_BENEFITS = [
  'Priority access to care',
  'Personalized treatment optimization',
  'Exclusive member pricing on additional services',
  'Integrated wellness support beyond hormones',
]

/**
 * PatientBenefitsSection component matching reference screenshot:
 * - Left side: rounded-[24px] image card of practitioner shaking hands with patient
 * - Right side: Bodoni Moda typography with "Patient Benefits" title, "As A Savannah Age Management Medicine Patient, You Receive:" subtitle, and teal arrow (→) list items.
 */
export function PatientBenefitsSection({
  title = 'Patient Benefits',
  subtitle = 'As A Savannah Age Management Medicine Patient, You Receive:',
  benefits = DEFAULT_BENEFITS,
  imageSrc = 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785350545/photo-content-38-img_lxshmc.jpg',
  imageAlt = 'A provider shaking hands with a male patient',
  className,
}: PatientBenefitsSectionProps) {
  return (
    <section className={cn('relative w-full bg-[#F8F9F5] py-16 sm:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <Container className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16"
        >
          {/* Left Column: Image Card */}
          <div className="relative w-full aspect-4/3 sm:aspect-square lg:aspect-auto lg:h-[440px] rounded-[24px] overflow-hidden shadow-md bg-slate-200">
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

          {/* Right Column: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Main Title */}
            <h2
              className="sm:text-[48px] text-[36px] font-medium leading-tight text-[#111214] mb-3 font-display"
            >
              {title}
            </h2>

            {/* Subtitle */}
            <h3
              className="text-[32px] font-normal leading-snug text-[#111214] mb-6  lg:mx-0 font-display"
            >
              {subtitle}
            </h3>

            {/* Benefits List */}
            <ul className="space-y-3">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start justify-center lg:justify-start gap-2.5 text-[16px] text-[#111214] font-normal">
                  <span className="text-[#519B99] shrink-0 font-sans font-medium">→</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      </Container>
    </section>
  )
}
