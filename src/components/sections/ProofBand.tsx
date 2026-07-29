'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import type { Award, Testimonial } from '@/types/content'

interface Stat {
  value: string
  label: string
}

interface ProofBandProps {
  eyebrow?: string
  stats: Stat[]
  quotes: Testimonial[]
  awards?: Award[]
}

export function ProofBand({ eyebrow, stats, quotes, awards }: ProofBandProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const yStats = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <Section background="page" className="relative overflow-hidden py-32 sm:py-40">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sage-50/50 via-white to-white -z-10" />

      <Container>
        <div ref={containerRef}>
          <motion.div style={{ opacity }} className="mx-auto max-w-7xl">
            {eyebrow ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-20 text-center"
              >
              <h2 className="inline-flex items-center gap-4 text-sm font-semibold tracking-[0.2em] uppercase text-sage-600">
                <span className="h-[1px] w-12 bg-sage-300"></span>
                {eyebrow}
                <span className="h-[1px] w-12 bg-sage-300"></span>
              </h2>
            </motion.div>
          ) : null}

          {/* Stats Section with architectural borders */}
          <motion.div 
            style={{ y: yStats }}
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-y border-gray-200 bg-white/50 backdrop-blur-sm"
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group p-12 text-center transition-colors hover:bg-sage-50/30"
              >
                <div className="font-serif text-6xl md:text-7xl tracking-tight text-ink-950 mb-4 transition-transform group-hover:scale-105 duration-700">
                  {stat.value}
                </div>
                <div className="text-sm font-medium tracking-wider uppercase text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Real Stories / Quotes */}
          <div className="mt-32 grid gap-12 lg:grid-cols-2 lg:gap-8">
            {quotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.2 }}
                className="relative rounded-3xl bg-white p-10 sm:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 overflow-hidden group"
              >
                {/* Decorative Quote Icon behind text */}
                <div className="absolute -top-6 -left-6 text-sage-50 opacity-50 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110">
                  <Quote size={180} strokeWidth={0.5} />
                </div>
                
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <blockquote className="font-serif text-2xl sm:text-3xl leading-relaxed text-ink-900">
                    "{quote.quote}"
                  </blockquote>
                  
                  <div className="mt-10 flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-sage-300"></div>
                    <div>
                      <div className="font-semibold tracking-wide text-ink-950 uppercase text-sm">
                        {quote.author}
                      </div>
                      {quote.source === 'google' && (
                        <div className="mt-1 text-xs font-medium text-gray-500 tracking-wider uppercase">
                          Verified Google Review
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Awards */}
          {awards?.length ? (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="mt-32 pt-16 border-t border-gray-100"
            >
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">
                Recognized By
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
                {awards.map((award, i) => (
                  <motion.li 
                    key={award.src}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  >
                    <Image
                      src={award.src}
                      alt={award.alt}
                      width={140}
                      height={140}
                      className="h-14 w-auto object-contain opacity-50 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0 hover:-translate-y-1"
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </motion.div>
        </div>
      </Container>
    </Section>
  )
}
