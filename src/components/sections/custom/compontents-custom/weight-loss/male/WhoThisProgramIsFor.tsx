import { ArrowRight } from 'lucide-react'

import { AspectImage } from '@/components/ui/AspectImage'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <ArrowRight className="mt-1 size-4 shrink-0 text-sage-600" strokeWidth={2} aria-hidden />
          <span className="text-body-sm leading-relaxed text-canvas-600">{item}</span>
        </li>
      ))}
    </ul>
  )
}

interface EditorialCardProps {
  eyebrow: string
  title: string
  lead: string
  items: string[]
  footer?: React.ReactNode
  image: { src: string; alt: string }
  imageSide: 'left' | 'right'
}

function EditorialCard({ eyebrow, title, lead, items, footer, image, imageSide }: EditorialCardProps) {
  const imageBlock = (
    <AspectImage
      media={image}
      ratio="landscape"
      sizes="(min-width: 1024px) 42vw, 100vw"
      className="h-full min-h-56 rounded-2xl shadow-md lg:min-h-full"
    />
  )

  const textBlock = (
    <div className="p-2 sm:p-4 lg:p-6">
      <p className="text-label font-semibold uppercase tracking-[0.14em] text-sage-600">{eyebrow}</p>
      <h3 className="mt-3 font-display text-display-sm text-ink-950">{title}</h3>
      <p className="mt-4 text-body text-canvas-600">{lead}</p>

      <div className="mt-5">
        <BulletList items={items} />
      </div>

      {footer ? <div className="mt-5 text-body-sm text-canvas-600">{footer}</div> : null}
    </div>
  )

  return (
    <Reveal>
      <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-canvas-50 p-5 shadow-sm ring-1 ring-canvas-300/50 sm:p-8 lg:grid-cols-2 lg:gap-10">
        {imageSide === 'left' ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{textBlock}</div>
            <div className="order-1 lg:order-2">{imageBlock}</div>
          </>
        )}
      </div>
    </Reveal>
  )
}

const WhoThisProgramIsFor: React.FC = () => {
  return (
    <Section background="alt" spacing="lg">
      <Container width="wide">
        <div className="space-y-8">
        
          <EditorialCard
            eyebrow="Is this you?"
            title="Who This Program Is For"
            lead="This program is a good fit if:"
            items={[
              'You have tried diets without lasting results',
              'You suspect hormones or metabolism are a factor',
              'You want a medically guided approach',
              'You prefer ongoing support and adjustments',
            ]}
            footer={
              <>
                If you are searching for a{' '}
                <a href="#" className="font-medium text-sage-700 underline underline-offset-2 hover:text-sage-800">
                  weight loss doctor in Savannah
                </a>
                , this program offers a more personalized and informed approach.
              </>
            }
            image={{
              src: 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-67-img.jpg',
              alt: 'A patient discussing their weight loss goals with a provider',
            }}
            imageSide="left"
          />

          <EditorialCard
            eyebrow="Safety first"
            title="Safety And Medical Considerations"
            lead="Because this is a medical program, your safety comes first. You may benefit from medical supervision if you:"
            items={[
              'Have a history of hormone imbalances',
              'Are managing thyroid conditions',
              'Have metabolic or blood sugar concerns',
              'Are considering prescription weight loss medications',
            ]}
            footer="Your provider will review your health history and labs to make sure your plan is appropriate and safe."
            image={{
              src: 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-68-img.jpg',
              alt: 'A provider reviewing a patient’s measurements during a check-in',
            }}
            imageSide="right"
          />
        </div>
      </Container>
    </Section>
  )
}

export default WhoThisProgramIsFor
