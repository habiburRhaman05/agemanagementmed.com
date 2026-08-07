import Image from 'next/image'
import { Star } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

/** The source's opening-quote mark, reused from TestimonialSet. */
function QuoteMark() {
  return (
    <svg width="36" height="26" viewBox="0 0 65 44" fill="none" aria-hidden className="shrink-0">
      <path
        d="M64.9992 31.7236C64.9992 34.9421 63.7762 37.7099 61.3302 40.0271C59.013 42.2157 56.1164 43.3099 52.6405 43.3099C47.8772 43.3099 43.8864 41.6363 40.668 38.2892C37.5783 34.9421 36.0335 30.6294 36.0335 25.3512C36.0335 15.6959 39.7668 8.80854 47.2336 4.68897C52.6405 1.72803 57.0175 0.247559 60.3647 0.247559C61.7808 0.247559 62.4888 0.762506 62.4888 1.7924C62.4888 2.69355 61.7164 3.33723 60.1716 3.72345C49.4865 6.55565 44.1439 11.8982 44.1439 19.7511C44.1439 23.227 45.045 26.188 46.8474 28.634C47.1048 24.2569 49.8727 22.0684 55.1509 22.0684C57.9831 22.0684 60.3003 23.0339 62.1026 24.965C64.0337 26.7673 64.9992 29.0202 64.9992 31.7236ZM29.4679 31.7236C29.4679 34.9421 28.2449 37.7099 25.7989 40.0271C23.4817 42.2157 20.6495 43.3099 17.3023 43.3099C12.4103 43.3099 8.4195 41.6363 5.32983 38.2892C2.24015 34.8133 0.695312 30.4363 0.695312 25.1581C0.695312 15.6316 4.42867 8.80854 11.8954 4.68897C17.3023 1.72803 21.615 0.247559 24.8334 0.247559C26.2495 0.247559 26.9576 0.762506 26.9576 1.7924C26.9576 2.69355 26.1851 3.33723 24.6403 3.72345C14.0839 6.55565 8.80571 11.9626 8.80571 19.9442C8.80571 23.2914 9.70687 26.188 11.5092 28.634C11.7667 24.2569 14.4701 22.0684 19.6196 22.0684C22.4518 22.0684 24.769 23.0339 26.5714 24.965C28.5024 26.7673 29.4679 29.0202 29.4679 31.7236Z"
        fill="#051E5C"
      />
    </svg>
  )
}

/** Official Google "G" brand logo icon, reused from TestimonialSet. */
function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  )
}

export interface TrustMarkersProps {
  label?: string
  reviewer: {
    name: string
    subtitle?: string
    bio: string[]
    portrait: Media
  }
  successStories: {
    eyebrow: string
    title: string
    lead?: string
    backgroundImage: string
    quote: string[]
    author: string
  }
}

/**
 * E-E-A-T credibility block: a "Reviewed by" byline row followed by a
 * full-bleed photo card carrying a single spotlighted patient testimonial —
 * matches the reference's two-tier "Trust Markers" layout.
 */
export function TrustMarkers({ label = 'Trust Markers', reviewer, successStories }: TrustMarkersProps) {
  return (
    <Section background="page" spacing="lg">
      <Container className="max-w-6xl text-center px-4! lg:px-0">
        <Reveal>
          <p className="font-display text-[32px] lg:text-[48px] text-ink-900 mb-8">{label}</p>

          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 sm:gap-10">
            <div className="relative size-72 sm:size-80 xl:size-[500px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={reviewer.portrait.src}
                alt={reviewer.portrait.alt}
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>

            <div className="text-left pl-[40px] max-[768px]:text-center max-[768px]:pl-0">
              <p className="text-[14px] font-semibold uppercase tracking-widest text-[#111214] mb-1">Reviewed by</p>
              <h3 className="font-display text-[32px] leading-tight tracking-tight text-[#111214]">{reviewer.name}</h3>
              {reviewer.subtitle ? (
                <p className="mt-1 text-left text-[24px] font-medium text-[#111214] py-3 max-[768px]:text-center">{reviewer.subtitle}</p>
              ) : null}
              <div className="mt-4 space-y-3 text-body-sm leading-relaxed text-[#111214]">
                {reviewer.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div
            className="relative overflow-hidden rounded-3xl min-h-[460px] sm:min-h-[560px] flex items-end bg-cover bg-center"
            style={{ backgroundImage: `url('${successStories.backgroundImage}')` }}
          >
            <div className="absolute inset-0 bg-ink-950/55" aria-hidden />

            <div className="absolute top-8 left-6 right-6 sm:top-10 sm:left-10 sm:right-10">
              <p className="text-label font-semibold uppercase tracking-widest text-sage-300">
                {successStories.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-display-sm text-canvas-50">{successStories.title}</h3>
              {successStories.lead ? (
                <p className="mt-2 max-w-xs text-body-sm text-canvas-50/80">{successStories.lead}</p>
              ) : null}
            </div>

            <div className="relative m-6 sm:m-10 max-w-sm rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <QuoteMark />
              <div className="mt-4 space-y-3 text-body-sm leading-relaxed text-[#111214]">
                {successStories.quote.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <GoogleLogo />
                <div>
                  <p className="text-body-sm font-bold text-[#111214]">{successStories.author}</p>
                  <div className="mt-0.5 flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#F5A623] text-[#F5A623]" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
