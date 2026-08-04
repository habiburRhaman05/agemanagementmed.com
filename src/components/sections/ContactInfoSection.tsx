import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { contactMedia } from '@/content/pages/contact-media'
import { site } from '@/content/site'
import type { Location } from '@/types/content'

interface ContactInfoSectionProps {
  locations: Location[]
}

/** Live-site heading used "Savannah" for the Pooler clinic — display-only override, doesn't touch the shared `Location.name` used elsewhere. */
function displayName(location: Location) {
  return location.slug === 'savannah-pooler' ? 'Savannah' : location.name
}

/** Live-site copy reads "Mon to Thu" — display-only formatting of the shared `days` string. */
function displayDays(days: string) {
  return days.replace(' – ', ' to ')
}

export function ContactInfoSection({ locations }: ContactInfoSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F7F8F2] py-12 sm:py-16 lg:py-24">
      {/* Background glow – repositioned for mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[500px] rounded-full bg-[#587DBD] opacity-30 blur-[150px] sm:-left-60 sm:-top-60 sm:size-[600px] lg:left-[-200px] lg:top-[-100px] lg:size-[790px]"
      />

      <Container width="wide" className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          {/* Left column – contact info */}
          <Reveal side="left" className="lg:w-[30%] lg:pr-10">
            <h2 className="font-display text-[28px] font-medium leading-[1.1] text-[#0B2055] sm:text-[32px] lg:text-[36px]">
              Contact Information
            </h2>

            {/* Contact fields – stacked on mobile, side‑by‑side on larger screens */}
            <div className="mt-6 flex flex-col gap-y-5 sm:gap-y-4">
              {/* Phone */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-x-4">
                <span className="text-body-sm text-[#141518]/70 sm:w-[100px] sm:flex-shrink-0">
                  Phone:
                </span>
                <a
                  href={site.phoneHref}
                  className="text-body font-semibold text-[#0B2055] transition-opacity hover:opacity-60"
                >
                  {site.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-x-4">
                <span className="text-body-sm text-[#141518]/70 sm:w-[100px] sm:flex-shrink-0">
                  Email:
                </span>
                <a
                  href={site.emailHref}
                  className="break-all text-body font-semibold text-[#0B2055] transition-opacity hover:opacity-60"
                >
                  {site.email}
                </a>
              </div>

              {/* Locations */}
              <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <span className="text-body-sm text-[#141518]/70 sm:w-[100px] sm:flex-shrink-0">
                  Locations:
                </span>
                <div className="space-y-6">
                  {locations.map((location) => (
                    <div key={location.slug}>
                      <p className="font-semibold text-[#0B2055]">{displayName(location)}</p>
                      <p className="mt-1 text-body-sm text-[#141518]">
                        {location.addressLine}
                        <br />
                        {location.city}, {location.state} {location.zip}
                      </p>

                      <p className="mt-3 font-semibold text-[#0B2055]">Office Hours</p>
                      <ul className="mt-1 space-y-1">
                        {location.hours.map((h) => (
                          <li
                            key={h.days}
                            className="grid grid-cols-[minmax(0,70px)_1fr] gap-x-3 text-body-sm text-[#141518] sm:gap-x-4 md:grid-cols-[minmax(0,90px)_1fr]"
                          >
                            <span>{displayDays(h.days)}:</span>
                            <span className="font-semibold text-[#0B2055]">{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right column – photo */}
          <Reveal side="right" delay={100} className="lg:w-[70%] lg:pl-10">
            <div
              className="aspect-[4/3] w-full rounded-[20px] bg-cover bg-center sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]"
              style={{ backgroundImage: `url('${contactMedia.infoPhoto}')` }}
              role="img"
              aria-label="Two SAMM team members reviewing patient materials together"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}