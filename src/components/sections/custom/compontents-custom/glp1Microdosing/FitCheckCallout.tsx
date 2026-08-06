import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
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
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#519B98] bg-[#519B98]/80 px-6 py-2.5 text-[14px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#519B98]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
