import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import type { Media } from '@/types/content'

export interface FitCheckCalloutProps {
  image: Media
  imagePosition?: string
  heading: string
  lead?: string
  points: string[]
  ctaLabel?: string
  ctaHref?: string
}

/**
 * "Is Microdosing the Right Fit for You?" — full-bleed `.photo-content-d.full-img`
 * with no container wrapper (image and copy both run edge to edge). Ported
 * 1:1 from https://www.agemanagementmed.com/glp-1-microdosing/female/;
 * styling lives in src/app/legacy.css.
 */
export function FitCheckCallout({
  image,
  imagePosition = '50% 25%',
  heading,
  lead,
  points,
  ctaLabel = 'Schedule a Consultation',
}: FitCheckCalloutProps) {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[660px]">

        {/* ── Left: photo ── */}
        <div className="relative min-h-64 overflow-hidden lg:min-h-[480px] ">
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
        <div className="flex flex-col justify-center bg-[#1a2744] px-8 py-12 sm:px-10 lg:pl-24 lg:py-16">

          {/* Heading */}
          <h2
            className="font-display leading-snug text-white text-[36px]!  sm:text-[48px]!"
            style={{ fontWeight: 500, letterSpacing: '-0.025em' }}
          >
            {heading}
          </h2>

          {/* Lead */}
          {lead && (
            <p className="mt-3 text-white" style={{ fontSize: 16, fontWeight: 400 }}>
              {lead}
            </p>
          )}

          {/* Bullet points */}
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-white" style={{ fontSize: 16 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none"><path d="M15.5 1L20.5 6L15.5 11" stroke="#519B98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 6H1" stroke="#519B98" stroke-width="1.5" stroke-linecap="round"/></svg>
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
