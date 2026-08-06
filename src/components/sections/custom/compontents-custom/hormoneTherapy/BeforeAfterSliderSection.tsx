'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'

export interface SlideData {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

export interface BeforeAfterSliderSectionProps {
  title: string;
  description: string;
  slides: SlideData[];
}

export const BeforeAfterSliderSection = ({
  title,
  description,
  slides
}: BeforeAfterSliderSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
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
    <Section className="py-16 md:py-24">
      <Container>
        {/* Header — outside the dark card, on white background */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-[#519B99] font-medium mb-4">
            Transformations
          </span>
          <h2
            className="text-3xl md:text-[42px] font-normal text-[#1C274C] mb-4 leading-tight font-display"
            
          >
            {title}
          </h2>
          <p className="text-slate-600 text-[15px] md:text-base leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Main container with the requested exact #14214B background */}
        <div className="bg-[#14214B] rounded-[32px] p-6 md:p-14 relative max-w-6xl mx-auto shadow-2xl ring-1 ring-white/[0.06]">

          {/* Carousel + side arrows share one relative wrapper so they align to the images, not the header */}
          <div className="relative">
            {/* Navigation Arrows — vertically centered on the image row itself */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 w-11 h-11 rounded-full border border-white/15 bg-[#14214B] text-white flex items-center justify-center hover:bg-white/10 hover:border-[#C9A876]/50 transition-colors z-20 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 w-11 h-11 rounded-full border border-white/15 bg-[#14214B] text-white flex items-center justify-center hover:bg-white/10 hover:border-[#C9A876]/50 transition-colors z-20 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Viewport */}
            <div className="overflow-hidden w-full" ref={emblaRef}>
              <div className="flex w-full">
                {slides.map((slide, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-6 md:px-14">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">

                      {/* Before */}
                      <div className="w-full md:w-[45%] rounded-2xl overflow-hidden shadow-lg shrink-0 ring-1 ring-white/10">
                        <div className="aspect-[4/5] relative">
                          <Image
                            src={slide.beforeImage}
                            alt={`${slide.alt} Before`}
                            fill
                            sizes="(min-width: 768px) 40vw, 90vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-[#519B99] py-3 text-center text-[13px] tracking-[0.2em] uppercase text-white font-display">
                          Before
                        </div>
                      </div>

                      {/* Center Arrow */}
                      <div className="text-white shrink-0">
                        <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                      </div>

                      {/* After */}
                      <div className="w-full md:w-[45%] rounded-2xl overflow-hidden shadow-lg shrink-0 ring-1 ring-white/10">
                        <div className="aspect-[4/5] relative">
                          <Image
                            src={slide.afterImage}
                            alt={`${slide.alt} After`}
                            fill
                            sizes="(min-width: 768px) 40vw, 90vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-[#519B99] py-3 text-center text-[13px] tracking-[0.2em] uppercase text-white font-display">
                          After
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom swap controls — dot pagination + prev/next, replaces reliance on side arrows alone */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#C9A876]/50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-7 bg-[#C9A876]'
                      : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#C9A876]/50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  )
}