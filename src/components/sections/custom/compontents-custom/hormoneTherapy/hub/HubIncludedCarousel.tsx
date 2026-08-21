'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import { sliderOIcons } from './slider-o-icons'

interface IncludedItem {
  number: string
  title: string
  body: string
  icon: string
}

const items: IncludedItem[] = [
  {
    number: '1',
    title: 'Body Composition Analysis',
    body: 'Regularly monitoring body composition helps track how treatment protocols are improving muscle mass, reducing visceral fat, and supporting metabolic health — key markers of aging well. It also allows for timely adjustments to optimize outcomes and longevity. All patients of Savannah Age Management Medicine have access to our state of the art body composition device.',
    icon: sliderOIcons.bodyComposition,
  },
  {
    number: '2',
    title: 'Nutritional Guidance',
    body: 'You will receive a comprehensive nutritional guide, designed to educate and inform your dietary choices for optimal results on your program. Learn about how individual hormones are impacted by the nutrients in different foods, and begin to shape a sustainable way of eating that fuels your body and supports an optimal hormone profile.',
    icon: sliderOIcons.nutritionalGuidance,
  },
  {
    number: '3',
    title: 'Functional Movement Training',
    body: 'You will meet with our Fitness and Movement Consultant to assess your range of functional movement. As patients start to look and feel optimal, we want to ensure that their body can do everything their newfound energy levels enable. This includes customized corrective exercises, workout plans and a video library dedicated to supporting a healthy aging body.',
    icon: sliderOIcons.functionalMovement,
  },
  {
    number: '4',
    title: 'Treatment Optimization',
    body: "You will re-do your initial lab tests and report on your progress at 6 weeks and 12 weeks following treatment. These scheduled opportunities allow us to understand your body's response to the treatment plan and dial in doses as necessary. Further blood tests and dosage can be accommodated over the course of the year depending on the needs of the patient or recommendations from your provider. At your 1-year mark, we will reach out about scheduling an annual visit for another comprehensive look at your progress.",
    icon: sliderOIcons.treatmentOptimization,
  },
  {
    number: '5',
    title: 'Quick Care Access',
    body: "Skip the cost and inconvenience of Urgent Care and come right to us! Our providers are on hand to help you with additional, non-critical health needs throughout the year. Call in to our office to be evaluated and treated by our staff during cold and flu season, or when you're feeling off.",
    icon: sliderOIcons.quickCareAccess,
  },
  {
    number: '6',
    title: 'Save on Premium Supplements',
    body: 'Through our partnership with Fullscript, you receive 10% off an exhaustive library of medical-grade supplements. Consult with your provider on which supplements are right for you, and have them shipped directly to your door.',
    icon: sliderOIcons.premiumSupplements,
  },
  {
    number: '7',
    title: 'Membership Pricing',
    body: 'Enjoy discounted pricing on all additional services offered by Savannah Age Management Medicine, including our clinical aesthetic services, and receive a discount on subsequent years of hormone management and optimization.',
    icon: sliderOIcons.membershipPricing,
  },
]

/**
 * BHRT hub page's "Included As A Patient" horizontal card carousel
 * (`#slider-o`). Ported 1:1 from
 * download/_bioidentical-hormone-replacement-therapy_.html — the source's
 * Swiper free-mode markup maps onto embla-carousel (already used elsewhere
 * on the site, see BeforeAfterSliderSection.tsx). Per-card icons are the
 * source's own SVGs (slider-o-icons.ts); styling lives in src/app/legacy.css.
 */
export function HubIncludedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div id="slider-o" style={{ backgroundColor: '#fff' }}>
      <div className="group">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="content-nav lg-grid lg-items-end">
              <div className="lg-content lg-col-md">
                <h2 className="lg-title">Included As A Patient</h2>

                <div className="lg-text">
                  <p>Take full advantage of your benefits as a Savannah Age Management Medicine patient.</p>
                </div>
              </div>

              <div className="nav lg-col-md-auto">
                <button
                  type="button"
                  className="arrow arrow-left"
                  disabled={!canScrollPrev}
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="23.3938" cy="23.3938" r="23.3938" transform="matrix(-1 0 0 1 47.1797 0.53125)" fill="#519B98" />
                    <path d="M26.5137 14.5977L17.1845 23.9269L26.5137 33.256" stroke="white" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="arrow arrow-right"
                  disabled={!canScrollNext}
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="23.9954" cy="23.9251" r="23.3938" fill="#519B98" />
                    <path d="M21.2676 14.5977L30.5967 23.9269L21.2676 33.256" stroke="white" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper" ref={emblaRef}>
          <div className="swiper-wrapper flex">
            {items.map((item) => (
              <div className="swiper-slide" key={item.number}>
                <div className="box background-img">
                  <div className="content">
                    <div
                      className="icon [&>svg]:h-14 [&>svg]:w-14"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />

                    <div className="number-title">
                      <div className="number">{item.number}</div>
                      <h3 className="lg-title">{item.title}</h3>
                    </div>

                    <div className="lg-text">
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
