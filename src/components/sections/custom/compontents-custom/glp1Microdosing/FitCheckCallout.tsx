import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import type { Media } from '@/types/content'

export interface FitCheckCalloutProps {
  image: Media
  heading: string
  lead?: string
  points: string[]
  ctaLabel?: string
  ctaHref?: string
}

/**
 * "Is Microdosing The Right Fit For You?" — full-bleed, image left 50% /
 * dark navy right 50%, teal arrow bullets, teal pill CTA button.
 * Matches the reference screenshot exactly.
 */
export function FitCheckCallout({
  image,
  heading,
  lead,
  points,
  ctaLabel = 'Schedule a Consultation',
}: FitCheckCalloutProps) {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid lg:grid-cols-2">

        {/* ── Left: photo ── */}
        <div className="relative min-h-64 overflow-hidden lg:min-h-[480px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: image.focalPoint ?? 'center top' }}
          />
        </div>

        {/* ── Right: navy content panel ── */}
        <div className="flex flex-col justify-center bg-[#1a2744] px-8 py-12 sm:px-10 lg:px-14 lg:py-16">

          {/* Heading */}
          <h2 className="font-display text-[20px] font-medium leading-snug text-white lg:text-[24px]">
            {heading}
          </h2>

          {/* Lead */}
          {lead && (
            <p className="mt-3 text-[14px] font-normal text-white">
              {lead}
            </p>
          )}

          {/* Bullet points */}
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[14px] font-normal text-white">
                <ArrowRight className="mt-0.5 size-3 shrink-0 text-[#519B98]" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="mt-8">
            <BookAppointmentButton variant="teal" className="px-6 py-2.5" modalTitle="Schedule a Consultation">
              {ctaLabel}
            </BookAppointmentButton>
          </div>

        </div>
      </div>
    </section>
  )
}
