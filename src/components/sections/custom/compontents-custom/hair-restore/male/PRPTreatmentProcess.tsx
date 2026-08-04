import { ImageIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

/** Photos haven't been shot yet — a styled placeholder reads as "coming soon", not broken. */
function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-linear-to-br from-ink-900 to-ink-800 ${className}`}
      role="img"
      aria-label="Photo coming soon"
    >
      <ImageIcon className="size-7 text-canvas-50/30" strokeWidth={1.25} aria-hidden />
    </div>
  )
}

interface Step {
  number: number
  imageAlt: string
  title: string
  description: string
  url: string
}

const steps: Step[] = [
  {
    number: 1,
    imageAlt: "Provider examining a patient's scalp during a consultation",
    url:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-1-female_b95t44.jpg",
    title: 'Consultation & Assessment',
    description:
      'Our expert team evaluates your hair loss pattern, discusses your goals, and determines if PRP is right for you.',
  },
  {
    number: 2,
    imageAlt: "Clinician drawing blood from a patient's arm",
    title: 'Blood Draw',
    description: 'A small amount of blood (similar to routine lab work) is drawn from your arm.',
    url:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785304803/hair-treatment-step-2-female_u1mico.jpg"
  },
  {
    number: 3,
    imageAlt: 'Vial of blood being processed to concentrate platelets',
    title: 'Platelet Concentration',
    description: 'Your blood is processed in a specialized centrifuge to separate and concentrate the platelets.',
    url:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-3-female_y7wzqe.jpg"
  },
  {
    number: 4,
    imageAlt: "Clinician preparing a patient's scalp for treatment",
    title: 'Scalp Preparation',
    description: 'The treatment area is cleansed and a topical numbing agent is applied for comfort.',
    url:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785304805/hair-treatment-step-4-female_wqfqfc.jpg"
  },
  {
    number: 5,
    imageAlt: "PRP being injected into a patient's scalp",
    title: 'PRP Injection',
    description:
      'The concentrated platelet-rich plasma is carefully injected into targeted areas of your scalp using fine needles.',
      url:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-5-female_awrdtf.jpg"
  },
]

function StepRow({ step }: { step: Step }) {
  return (
    <Reveal delay={(step.number - 1) * 60}>
      <div className="grid overflow-hidden rounded-2xl bg-ink-950 sm:grid-cols-[1fr_1.4fr]">
        <img src={step.url} className="aspect-4/3 sm:aspect-auto sm:min-h-44" />
        <div className="flex flex-col justify-center p-6 sm:p-7">
          <p className="text-label font-semibold uppercase tracking-[0.14em] text-sage-400">Step {step.number}</p>
          <h3 className="mt-1.5 font-display text-title-lg text-canvas-50">{step.title}</h3>
          <p className="mt-2 text-body-sm leading-relaxed text-canvas-50/75">{step.description}</p>
        </div>
      </div>
    </Reveal>
  )
}

const PRPTreatmentProcess: React.FC = () => {
  return (
    <Section background="page" spacing="lg" className="bg-[#CDDEE1]">
      <Container width="prose">
        <SectionHeader title="The PRP Hair Treatment Process" align="center" />

        <div className="mt-10 space-y-5">
          {steps.map((step) => (
            <StepRow key={step.number} step={step} />
          ))}
        </div>

        <div className="mt-10 space-y-1.5 text-center">
          <p className="text-body-sm text-ink-900">
            Treatment Time: <span className="font-semibold text-sage-700">60–90 minutes</span>
          </p>
          <p className="text-body-sm text-ink-900">
            Downtime: Minimal — return to normal activities{' '}
            <span className="font-semibold text-sage-700">immediately</span>
          </p>
        </div>
      </Container>
    </Section>
  )
}

export default PRPTreatmentProcess