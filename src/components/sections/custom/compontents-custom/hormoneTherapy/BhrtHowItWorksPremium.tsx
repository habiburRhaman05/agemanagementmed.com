import React from 'react'
import { Zap, Brain, Activity, HeartPulse, Flower2, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'

export const BhrtHowItWorksPremium = () => {
  const benefits = [
    { icon: Zap, label: 'Energy & Sleep Quality', desc: 'Restore natural circadian rhythms and daily stamina.' },
    { icon: HeartPulse, label: 'Sexual Wellness', desc: 'Rejuvenate intimacy with enhanced comfort and desire.' },
    { icon: Brain, label: 'Mood Stability', desc: 'Clear brain fog and regain emotional balance and clarity.' },
    { icon: Flower2, label: 'Symptom Relief', desc: 'Effectively manage hot flashes and night sweats safely.' },
    { icon: Activity, label: 'Metabolic Balance', desc: 'Support healthy weight management and body composition.' },
    { icon: CheckCircle2, label: 'Medically Supervised', desc: 'Every plan is prescribed and monitored by expert physicians.' },
  ]

  return (
    <Section className="py-24 bg-[#fcfcfb] relative overflow-hidden">
      {/* Decorative blurred backgrounds for a premium feel */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-sage-50/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-sage-100/30 blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-sage-700 text-xs font-bold tracking-widest uppercase mb-6 border border-sage-200 shadow-sm">
            The Protocol
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink-950 leading-[1.1] mb-6">
            How Bioidentical Hormone Therapy Works
          </h2>
          <p className="text-lg text-canvas-700 leading-relaxed md:px-8">
            BHRT uses plant-derived hormones designed to closely match the body's natural hormones. At SAMM, therapy plans are personalized using detailed lab testing combined with symptom evaluation and health history review.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon
            return (
              <div 
                key={index}
                className="group relative bg-white p-8 md:p-10 rounded-[32px] border border-sage-100/60 shadow-[0_4px_20px_-4px_rgba(20,33,75,0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(20,33,75,0.08)] hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-sage-600 group-hover:text-white">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h4 className="mb-3 font-display text-xl text-ink-950">{item.label}</h4>
                <p className="text-canvas-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
