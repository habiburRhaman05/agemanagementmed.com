'use client'

import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useState } from 'react'

import { homeMedia } from '@/content/pages/home-media'
import type { Testimonial } from '@/types/content'

/** The source's opening-quote mark, reproduced from its inline SVG. */
function QuoteMark() {
  return (
    <svg width="65" height="44" viewBox="0 0 65 44" fill="none" aria-hidden>
      <path
        d="M64.9992 31.7236C64.9992 34.9421 63.7762 37.7099 61.3302 40.0271C59.013 42.2157 56.1164 43.3099 52.6405 43.3099C47.8772 43.3099 43.8864 41.6363 40.668 38.2892C37.5783 34.9421 36.0335 30.6294 36.0335 25.3512C36.0335 15.6959 39.7668 8.80854 47.2336 4.68897C52.6405 1.72803 57.0175 0.247559 60.3647 0.247559C61.7808 0.247559 62.4888 0.762506 62.4888 1.7924C62.4888 2.69355 61.7164 3.33723 60.1716 3.72345C49.4865 6.55565 44.1439 11.8982 44.1439 19.7511C44.1439 23.227 45.045 26.188 46.8474 28.634C47.1048 24.2569 49.8727 22.0684 55.1509 22.0684C57.9831 22.0684 60.3003 23.0339 62.1026 24.965C64.0337 26.7673 64.9992 29.0202 64.9992 31.7236ZM29.4679 31.7236C29.4679 34.9421 28.2449 37.7099 25.7989 40.0271C23.4817 42.2157 20.6495 43.3099 17.3023 43.3099C12.4103 43.3099 8.4195 41.6363 5.32983 38.2892C2.24015 34.8133 0.695312 30.4363 0.695312 25.1581C0.695312 15.6316 4.42867 8.80854 11.8954 4.68897C17.3023 1.72803 21.615 0.247559 24.8334 0.247559C26.2495 0.247559 26.9576 0.762506 26.9576 1.7924C26.9576 2.69355 26.1851 3.33723 24.6403 3.72345C14.0839 6.55565 8.80571 11.9626 8.80571 19.9442C8.80571 23.2914 9.70687 26.188 11.5092 28.634C11.7667 24.2569 14.4701 22.0684 19.6196 22.0684C22.4518 22.0684 24.769 23.0339 26.5714 24.965C28.5024 26.7673 29.4679 29.0202 29.4679 31.7236Z"
        fill="#051E5C"
      />
    </svg>
  )
}

interface TestimonialSetProps {
  eyebrow?: string
  title: string
  lead?: string
  width?: string
  testimonials: Testimonial[]
  background?: 'page' | 'alt' | 'accent'
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
}

/**
 * The live site's `#testimonial-d` band — a photo background with a navy
 * gradient, intro copy on the left and a white quote card carrying the review,
 * star rating and reviewer name. Ported live-site CSS.
 */
export function TestimonialSet({
  eyebrow,
  title,
  lead,
  testimonials,
  backgroundImage = homeMedia.testimonialsBackground,
}: TestimonialSetProps) {
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const active = testimonials[index]
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)

  return (
    <div id="testimonial-d" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content">
            {eyebrow ? <h2 className="lg-top-title">{eyebrow}</h2> : null}
            <h3 className="lg-title">{title}</h3>
            {lead ? (
              <div className="lg-text">
                <p>{lead}</p>
              </div>
            ) : null}
          </div>

          <div className="slider">
            <div className="box">
              <div className="lg-text">
                <div className="quote">
                  <QuoteMark />
                </div>
                <p>{active.quote}</p>
              </div>

              <div className="rating">
                <div className="star-name">
                  <div className="star" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
                    ))}
                  </div>
                  <div className="name">{active.author}</div>
                </div>
              </div>
            </div>

            {testimonials.length > 1 ? (
              <div className="nav">
                <button type="button" className="arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
                  <ArrowLeft size={18} aria-hidden />
                </button>
                <button type="button" className="arrow" onClick={() => go(1)} aria-label="Next testimonial">
                  <ArrowRight size={18} aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
