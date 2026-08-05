import { ArrowRight, BatteryCharging, Brain, CalendarDays, HeartPulse, Scale } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

interface SymptomCard {
  icon: typeof BatteryCharging
  title: string
  desc: string
  bullets: string[]
}

const quadrants: SymptomCard[] = [
  {
    icon: BatteryCharging,
    title: 'Energy, Sleep, And Physical Vitality',
    desc: 'Hormonal changes often impact overall stamina and sleep quality. Women may experience:',
    bullets: [
      'Persistent fatigue or low energy',
      'Difficulty falling or staying asleep',
      'Waking up feeling unrested',
      'Increased afternoon energy crashes',
      'Reduced motivation for exercise or daily activities',
    ],
  },
  {
    icon: Brain,
    title: 'Mood, Cognitive Function, And Mental Clarity',
    desc: 'Hormone fluctuations can affect emotional and cognitive health. Common experiences include:',
    bullets: [
      'Increased anxiety or irritability',
      'Mood swings or emotional sensitivity',
      "Difficulty concentrating or “brain fog”",
      'Memory lapses or reduced mental clarity',
      'Loss of motivation or decreased stress tolerance',
    ],
  },
  {
    icon: Scale,
    title: 'Weight, Metabolism, And Body Composition',
    desc: 'Hormonal shifts can influence metabolism and fat storage patterns. Women may notice:',
    bullets: [
      'Unexplained weight gain',
      'Increased abdominal fat',
      'Difficulty losing weight despite diet or exercise',
      'Slower metabolism',
      'Changes in muscle tone or strength',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Sexual Health And Intimacy',
    desc: 'Hormones play a major role in sexual wellness and comfort. Symptoms may include:',
    bullets: [
      'Low libido',
      'Vaginal dryness or discomfort',
      'Reduced sexual satisfaction',
      'Difficulty with arousal or orgasm',
    ],
  },
]

const menstrual: SymptomCard = {
  icon: CalendarDays,
  title: 'Menstrual Changes, Perimenopause, And Menopause Symptoms',
  desc: 'Hormonal imbalance often appears through cycle and menopause-related changes, including:',
  bullets: [
    'Irregular menstrual cycles',
    'Heavy or unpredictable periods',
    'Hot flashes and night sweats',
    'Increased PMS symptoms',
    'Symptoms associated with perimenopause or menopause',
    'Symptoms sometimes linked to estrogen dominance',
  ],
}

function SymptomPanel({ card }: { card: SymptomCard }) {
  const Icon = card.icon
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sage-200/40 text-sage-200">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg sm:text-xl text-white leading-snug mb-2">{card.title}</h3>
      <p className="mb-4 text-sm text-white/70 leading-relaxed">{card.desc}</p>
      <ul className="flex flex-col gap-2.5">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-white/80 leading-snug">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-300" strokeWidth={2.5} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SymptomsGridStatic() {
  return (
    <Section spacing="lg" className="bg-[#f8fcfb]">
      <Container>
        <div className="relative h-[350px] md:h-[450px] w-full rounded-t-[32px] overflow-hidden">
          <img
            src="/images/column-box-7-img.jpg"
            alt="Woman smiling outdoors"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="relative -mt-20 md:-mt-32 rounded-[32px] bg-ink-950 p-6 sm:p-10 lg:p-14 z-10 shadow-2xl">
          <div className="mx-auto max-w-4xl text-center mb-10 md:mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Symptoms Of Hormone Imbalance In Women
            </h2>
            <p className="mt-6 text-base text-white/80 leading-relaxed">
              Hormonal imbalances can affect multiple systems in the body. Many women notice symptoms
              gradually, while others experience sudden changes. Below are common patterns SAMM
              evaluates when determining whether BHRT may help.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {quadrants.map((card) => (
              <SymptomPanel card={card} key={card.title} />
            ))}
          </div>

          <div className="mt-5 sm:mt-6">
            <SymptomPanel card={menstrual} />
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Button asChild size="lg" variant="primary">
              <Link href="/book-appointment">Schedule Hormone Testing</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
