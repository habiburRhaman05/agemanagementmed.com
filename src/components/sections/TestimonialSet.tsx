'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

import { homeMedia } from '@/content/pages/home-media'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types/content'

/** The source's opening-quote mark, reproduced from its inline SVG. */
function QuoteMark() {
  return (
    <svg width="44" height="32" viewBox="0 0 65 44" fill="none" aria-hidden className="shrink-0">
      <path
        d="M64.9992 31.7236C64.9992 34.9421 63.7762 37.7099 61.3302 40.0271C59.013 42.2157 56.1164 43.3099 52.6405 43.3099C47.8772 43.3099 43.8864 41.6363 40.668 38.2892C37.5783 34.9421 36.0335 30.6294 36.0335 25.3512C36.0335 15.6959 39.7668 8.80854 47.2336 4.68897C52.6405 1.72803 57.0175 0.247559 60.3647 0.247559C61.7808 0.247559 62.4888 0.762506 62.4888 1.7924C62.4888 2.69355 61.7164 3.33723 60.1716 3.72345C49.4865 6.55565 44.1439 11.8982 44.1439 19.7511C44.1439 23.227 45.045 26.188 46.8474 28.634C47.1048 24.2569 49.8727 22.0684 55.1509 22.0684C57.9831 22.0684 60.3003 23.0339 62.1026 24.965C64.0337 26.7673 64.9992 29.0202 64.9992 31.7236ZM29.4679 31.7236C29.4679 34.9421 28.2449 37.7099 25.7989 40.0271C23.4817 42.2157 20.6495 43.3099 17.3023 43.3099C12.4103 43.3099 8.4195 41.6363 5.32983 38.2892C2.24015 34.8133 0.695312 30.4363 0.695312 25.1581C0.695312 15.6316 4.42867 8.80854 11.8954 4.68897C17.3023 1.72803 21.615 0.247559 24.8334 0.247559C26.2495 0.247559 26.9576 0.762506 26.9576 1.7924C26.9576 2.69355 26.1851 3.33723 24.6403 3.72345C14.0839 6.55565 8.80571 11.9626 8.80571 19.9442C8.80571 23.2914 9.70687 26.188 11.5092 28.634C11.7667 24.2569 14.4701 22.0684 19.6196 22.0684C22.4518 22.0684 24.769 23.0339 26.5714 24.965C28.5024 26.7673 29.4679 29.0202 29.4679 31.7236Z"
        fill="#051E5C"
      />
    </svg>
  )
}

/** Official Google "G" brand logo icon. */
function GoogleLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
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

export interface TestimonialSetProps {
  eyebrow?: string
  title: string
  lead?: string
  width?: string
  testimonials: Testimonial[]
  background?: 'page' | 'alt' | 'accent'
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
  ctaText?: string
  ctaHref?: string
}

/**
 * The live site's `#testimonial-d` band — 100vh photo background with left copy/card
 * carousel and bottom justify-between bar (dashes on left, SEE ALL REVIEWS on right).
 */
export function TestimonialSet({
  eyebrow,
  title,
  lead,
  testimonials,
  backgroundImage = homeMedia.testimonialsBackground,
  ctaText = 'SEE ALL REVIEWS',
  ctaHref = '/specials',
}: TestimonialSetProps) {
  const [index, setIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  const active = testimonials[index]
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)

  // Split multi-paragraph quotes cleanly
  const paragraphs = active.quote ? active.quote.split(/\n+/).filter((p) => p.trim().length > 0) : []

  return (
    <section
      className="relative w-full min-h-screen min-h-[100vh] flex flex-col justify-center overflow-hidden bg-cover bg-[position:right_center] py-12 sm:py-16 md:py-20"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundPosition: 'right center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Simple image overlay */}
      <div className="absolute inset-0 bg-[#071946]/50 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col justify-between min-h-[82vh]">
        {/* Carousel & Content on Left Side */}
        <div className="max-w-[560px] w-full">
          {/* Intro text */}
          <div className="text-white mb-6">
            {eyebrow ? (
              <h2
                className="text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-200/90 mb-2 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
              >
                {eyebrow}
              </h2>
            ) : null}
            <h3
              className="text-3xl sm:text-4xl lg:text-[46px] leading-tight text-white mb-3 font-['Bodoni_Moda',var(--font-bodoni),serif]"
              style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
            >
              {title}
            </h3>
            {lead ? (
              <p className="text-sm sm:text-base text-slate-200/90 font-light max-w-lg">
                {lead}
              </p>
            ) : null}
          </div>

          {/* White Testimonial Card with Left & Right Nav Arrows */}
          <div className="relative">
            {testimonials.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute -left-3 sm:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-opacity p-1 cursor-pointer focus:outline-none"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.5]" aria-hidden />
                </button>

                <button
                  type="button"
                  className="absolute -right-3 sm:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-opacity p-1 cursor-pointer focus:outline-none"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.5]" aria-hidden />
                </button>
              </>
            ) : null}

            {/* White Testimonial Box */}
            <div className="bg-white rounded-[24px] shadow-2xl p-6 sm:p-8 md:p-10 relative z-10 transition-all duration-300 h-auto">
              {/* Top quote mark */}
              <div className="mb-4">
                <QuoteMark />
              </div>

              {/* Quote content */}
              <div className="text-slate-800 text-[13px] sm:text-[14px] leading-relaxed font-normal space-y-3 mb-6">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Author + Rating + Google branding */}
              <div className="flex items-center gap-3 pt-2">
                <GoogleLogo />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {active.author}
                  </span>
                  <div className="flex items-center gap-0.5 mt-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-[#F5A623] text-[#F5A623]"
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Bottom Bar: Carousel dashes on LEFT, SEE ALL REVIEWS button on RIGHT */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mt-8 w-full">
          {/* Left: Carousel dashes */}
          {testimonials.length > 1 ? (
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1 rounded-full transition-all duration-300 cursor-pointer border-0 p-0',
                    i === index
                      ? 'w-7 sm:w-8 bg-white'
                      : 'w-3.5 sm:w-4 bg-white/40 hover:bg-white/75'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          ) : <div />}

          {/* Right: SEE ALL REVIEWS Button */}
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center bg-[#30A7A0] hover:bg-[#278d87] text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
