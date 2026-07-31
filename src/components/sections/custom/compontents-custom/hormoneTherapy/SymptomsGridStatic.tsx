import { BatteryCharging, Brain, Activity, HeartPulse, CalendarDays, ArrowRight } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'

export function SymptomsGridStatic() {
  const cards = [
    {
      icon: BatteryCharging,
      title: 'Energy, sleep, and physical vitality',
      desc: 'Hormonal changes often affect overall stamina and sleep quality.',
      bullets: [
        'Persistent fatigue or low energy',
        'Difficulty falling or staying asleep',
        'Waking up feeling unrested',
        'Increased afternoon energy crashes',
        'Reduced motivation for exercise or daily activities'
      ]
    },
    {
      icon: Brain,
      title: 'Mood, cognitive function, and mental clarity',
      desc: 'Shifts in estrogen and progesterone can influence mood regulation and focus.',
      bullets: [
        'Irritability or mood swings',
        'Increased anxiety or low mood',
        'Difficulty concentrating',
        'Brain fog or memory lapses'
      ]
    },
    {
      icon: Activity,
      title: 'Weight, metabolism, and body composition',
      desc: 'Metabolic changes are among the most commonly reported symptoms.',
      bullets: [
        'Weight gain despite no change in diet',
        'Increased abdominal fat',
        'Difficulty building or maintaining muscle',
        'Slower metabolism'
      ]
    },
    {
      icon: HeartPulse,
      title: 'Sexual health and intimacy',
      desc: 'Hormonal decline can affect desire, comfort, and satisfaction.',
      bullets: [
        'Reduced libido',
        'Vaginal dryness or discomfort',
        'Decreased sensitivity',
        'Discomfort during intimacy'
      ]
    },
    {
      icon: CalendarDays,
      title: 'Menstrual changes, perimenopause, and menopause',
      desc: 'Cycle changes are often the earliest signal of hormonal transition.',
      bullets: [
        'Irregular or unpredictable cycles',
        'Hot flashes and night sweats',
        'Heavier or lighter bleeding',
        'Changes in cycle length'
      ]
    }
  ]

  return (
    <Section spacing="lg" className="bg-[#f8fcfb]">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-sage-200 text-sage-900 text-xs font-bold tracking-widest uppercase mb-6">
            Symptoms & Candidacy
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink-950">Is BHRT Right For You?</h2>
          <p className="mt-4 text-lg text-canvas-700 leading-relaxed max-w-3xl mx-auto">
            Hormonal imbalances can affect multiple systems at once. Many women notice symptoms gradually; others experience sudden changes. These are the patterns we evaluate when determining whether BHRT may help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon
            // The last item spans full width on md but normal on lg
            const isLast = idx === cards.length - 1
            return (
              <div 
                key={idx} 
                className={`group flex flex-col rounded-[24px] bg-white border border-sage-100 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-sage-900/5 hover:border-sage-300 hover:-translate-y-1 ${isLast ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 transition-colors duration-300 group-hover:bg-sage-600 group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl leading-tight text-ink-950 transition-colors duration-300 group-hover:text-sage-700">{card.title}</h3>
                </div>
                
                <p className="mb-6 text-body-sm text-canvas-600 border-b border-sage-100 pb-6">{card.desc}</p>
                
                <ul className="flex flex-col gap-3 flex-1">
                  {card.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sage-100 transition-colors duration-300 group-hover:bg-sage-200">
                        <ArrowRight className="h-2.5 w-2.5 text-sage-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-canvas-700 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
