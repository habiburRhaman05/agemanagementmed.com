'use client'

import React from 'react'
import { Zap, Brain, Activity, HeartPulse, Flower2 } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'

export interface BenefitItem {
  icon: 'energy' | 'mood' | 'metabolic' | 'wellness' | 'menopause';
  label: string;
}

export interface BhrtHowItWorksSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  supportLabel?: string;
  benefits: BenefitItem[];
}

const ICONS = {
  energy: Zap,
  mood: Brain,
  metabolic: Activity,
  wellness: HeartPulse,
  menopause: Flower2,
}

export const BhrtHowItWorksSection = ({
  eyebrow = 'BHRT',
  title,
  description,
  supportLabel = 'Treatment May Support',
  benefits,
}: BhrtHowItWorksSectionProps) => {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="relative max-w-5xl mx-auto rounded-[32px] bg-white ring-1 ring-[#14214B]/[0.06] shadow-[0_20px_60px_-15px_rgba(20,33,75,0.15)] p-8 md:p-16 overflow-hidden">

          {/* soft corner accents */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#2F8F86]/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#14214B]/[0.05] blur-3xl" />

          {/* Intro: title + description */}
          <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-start pb-12 md:pb-14 border-b border-[#14214B]/10">
            <div>
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-[#2F8F86] font-semibold mb-4">
                {eyebrow}
              </span>
              <h2 className="font-serif text-3xl md:text-[38px] text-[#14214B] leading-[1.15]">
                {title}
              </h2>
            </div>

            <div className="md:pt-1 md:pl-8 md:border-l md:border-[#14214B]/10">
              <p className="text-[#14214B]/70 text-[15px] md:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Support label */}
          <div className="relative flex items-center justify-center gap-4 my-10 md:my-12">
            <span className="h-px w-10 bg-[#14214B]/15" />
            <h3 className="font-serif text-xl md:text-2xl text-[#14214B]">
              {supportLabel}
            </h3>
            <span className="h-px w-10 bg-[#14214B]/15" />
          </div>

          {/* Benefits grid */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {benefits.map((item, index) => {
              const Icon = ICONS[item.icon]
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#FFFDF8] shadow-md rounded-2xl transition-colors hover:bg-sage-200"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#2F8F86]/10 ring-1 ring-[#2F8F86]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#2F8F86]" strokeWidth={1.75} />
                  </div>
                  <p className="text-[#14214B] font-semibold text-[15px] leading-snug pt-2.5">
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
