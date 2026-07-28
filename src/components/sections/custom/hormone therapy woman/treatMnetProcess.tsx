import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface ProcessStep {
  step: number
  title: string
  description: string
  image: Media
}

export interface TreatmentProcessContent {
  title: string
  steps: ProcessStep[]
}

interface TreatmentProcessProps extends TreatmentProcessContent {
  background?: 'page' | 'alt' | 'raised'
}


 
export function TreatmentProcess({ title, steps, background = 'page' }: TreatmentProcessProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <h2 className="text-center font-serif text-3xl text-ink-900 sm:text-4xl">{title}</h2>

        <ol className="mx-auto mt-12 flex max-w-4xl flex-col gap-6">
          {steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 60}>
              <li className="grid overflow-hidden rounded-3xl bg-[#0B1330] shadow-sm sm:grid-cols-[40%_60%]">
                <div className="relative h-48 sm:h-full sm:min-h-44">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.image.focalPoint ?? 'center' }}
                  />
                </div>

                <div className="flex flex-col justify-center px-6 py-6 sm:px-8">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#8B93B0]">
                    Step {item.step}
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl text-[#F5F1E8] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C7CCDE]">{item.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}