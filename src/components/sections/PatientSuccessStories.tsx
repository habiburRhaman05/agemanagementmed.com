import { Star } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

/** The source's opening-quote mark, reused from TestimonialSet/TrustMarkers. */
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

/** Official Google "G" brand logo icon, reused from TestimonialSet/TrustMarkers. */
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

export interface PatientSuccessStoriesProps {
  eyebrow: string
  title: string
  lead?: string
  backgroundImage: string
  /** Custom background focal point (any CSS background-position value). */
  backgroundPosition?: string
  /**
   * Custom background-size (any CSS background-size value). Defaults to
   * `cover`, which fills the frame using whichever axis needs the least
   * scaling — on a photo that's wider than the frame is tall, that's
   * usually the height axis, so the *entire* height of the source photo
   * (including anything you don't want shown, e.g. below the waist) always
   * ends up visible with `cover`, no matter what `backgroundPosition` says.
   * Pass an explicit `auto <height%>` (e.g. `'auto 170%'`) to zoom in and
   * crop the bottom (or top) out instead — `backgroundPosition` then
   * chooses which vertical slice of that zoomed image shows through.
   */
  backgroundSize?: string
  quote: string[]
  author: string
}

/**
 * Full-bleed photo card carrying a single spotlighted patient testimonial —
 * eyebrow/title/lead pinned top-left over the photo, a white quote card
 * anchored bottom-left. Split out of TrustMarkers (which still owns the
 * "Reviewed by" byline block) so it can be redesigned/reused on its own.
 */
export function PatientSuccessStories({
  eyebrow,
  title,
  lead,
  backgroundImage,
  backgroundPosition = '72% center',
  backgroundSize = 'cover',
  quote,
  author,
}: PatientSuccessStoriesProps) {
  return (
    <Section background="page" spacing="lg">
      <Container className="max-w-6xl px-4! lg:px-0">
        <Reveal>
          <div
            className="relative min-h-[560px] overflow-hidden rounded-[28px] sm:min-h-[680px] sm:rounded-[32px] lg:min-h-[620px]"
            style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition, backgroundSize }}
          >
            {/* Light top-left scrim — the photo itself is dark enough here, this is
                just a legibility safety net for lighter background images. */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#0f1c3f]/60 via-[#0f1c3f]/10 to-transparent"
              aria-hidden
            />

            <div className="relative flex h-full flex-col justify-between gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              <div className="max-w-md">
                <p className="text-[13px] font-bold tracking-[0.15em] text-white uppercase">{eyebrow}</p>
                <h2 className="mt-3 font-display text-[36px] leading-tight text-white sm:text-[44px]">{title}</h2>
                {lead ? <p className="mt-3 text-[16px] text-white/85">{lead}</p> : null}
              </div>

              <div className="w-full rounded-2xl bg-white p-6 shadow-xl sm:max-w-[560px] sm:p-9">
                <QuoteMark />
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#15224c]">
                  {quote.map((paragraph) => (
                    <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <GoogleLogo />
                  <div>
                    <p className="text-[14px] font-bold text-[#15224c]">{author}</p>
                    <div className="mt-0.5 flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-[#F5A623] text-[#F5A623]" aria-hidden />
                      ))}
                    </div>
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
