import { Activity, Brain, CheckCircle2, HeartPulse, Sparkles, Zap } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

const supports = [
  { icon: Zap, label: 'Energy and Sleep Quality' },
  { icon: HeartPulse, label: 'Sexual Wellness and Vaginal Health' },
  { icon: Brain, label: 'Mood Stability and Mental Clarity' },
  { icon: Sparkles, label: 'Menopause and Perimenopause Symptom Relief' },
  { icon: Activity, label: 'Metabolic Balance and Body Composition' },
]

export function BhrtHowItWorksPremium() {
  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-950 leading-tight mb-5">
              How Bioidentical Hormone Therapy For Women Works
            </h2>
            <p className="text-base text-canvas-700 leading-relaxed">
              BHRT uses plant-derived hormones designed to closely match the body&apos;s natural
              hormones. At SAMM, therapy plans are personalized using detailed lab testing combined
              with symptom evaluation and health history review.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl sm:text-2xl text-ink-950 mb-6">
              Treatment May Support:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {supports.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm sm:text-base text-ink-950 leading-snug">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
