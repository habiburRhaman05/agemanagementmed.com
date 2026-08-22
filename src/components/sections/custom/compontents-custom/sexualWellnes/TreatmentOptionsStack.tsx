import Link from 'next/link'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'

export interface TreatmentOptionCard {
  image: string
  imageBg?: string
  title: string
  description: string
  label: string
  bullets: string[]
  cta?: { label: string; href: string }
  /** First/hero card in the stack — rendered on a dark card with a CTA. */
  featured?: boolean
}

export interface TreatmentOptionsStackProps {
  eyebrow?: string
  title: string
  lead?: string
  treatments: TreatmentOptionCard[]
}

/** Thin long-stem arrow used throughout the site's brand CTAs/bullets — matches BookAppointmentButton. */
function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TreatmentCard({ service }: { service: TreatmentOptionCard }) {
  const isFeatured = Boolean(service.featured)

  return (
  <div className="lg-col-lg-6">
                  <div className="box">
                    <div className="img">
              
                      <img
                        src={service.image}
                        alt={service.label}
                        width={150}
                        height={150}
                        loading="lazy"
                        className="w-40! h-40! min-[576px]:w-20! min-[576px]:h-20! min-[992px]:w-[150px]! min-[992px]:h-[150px]!"
                      />
                    </div>

                    <div className="content mt-[16px]! md:mt-0!">
                      <div className="top flex items-center justify-center flex-col">
                        <h3
                          className={`lg-title  text-[30px]!`}
                        >
                          <Link href={""}>{service.title}</Link>
                        </h3>

                        {service.description ? (
                          <div className="lg-text">
                            <p>{service.description}</p>
                          </div>
                        ) : null}
                      </div>

  
                    </div>
                  </div>
                </div>
  )
}

/**
 * Reusable stacked treatment-options section — one dark "featured" card
 * followed by plain cards. Same shape works for the men's and women's
 * sexual-wellness pages by passing different `treatments` data.
 */
export function TreatmentOptionsStack({ eyebrow, title, lead, treatments }: TreatmentOptionsStackProps) {
  return (
    <Section className='bg-[#F4F6F1]' spacing="md">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />
      </Container>

  <div id="column-box-o" className='mt-8'>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {treatments.map((service) => (
                <div className="lg-col-lg-6" >
                  <div className="box">
                    <div className="img">
                      {/* Fixed 150px circular badge inside a ported layout —
                          matches the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                  
                        width={150}
                        height={150}
                        loading="lazy"
                        className="w-40! h-40! min-[576px]:w-20! min-[576px]:h-20! min-[992px]:w-[150px]! min-[992px]:h-[150px]!"
                      />
                    </div>

                    <div className="content mt-[16px]! md:mt-0!">
                      <div className="top flex items-center justify-center flex-col">
                        <h3
                          className={`lg-title ${service.title ? 'w-full' : ''} text-[30px]!`}
                        >
                          <Link href={""}>{service.title}</Link>
                        </h3>

                        {service.description ? (
                          <div className="lg-text">
                            <p>{service.description}</p>
                          </div>
                        ) : null}

                       
                      </div>

                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </Section>
  )
}
