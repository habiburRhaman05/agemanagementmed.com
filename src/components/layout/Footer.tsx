import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { footerNav, megaMenu } from '@/content/navigation'
import { locations, site } from '@/content/site'

/** Server Component — the footer ships zero JavaScript. */
export function Footer() {
  return (
    <footer className="bg-sage-700 text-canvas-50">
      <Container>
        <div className="grid gap-12 pt-20 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-16">
          <div className="lg:col-span-4">
            <Image
              src="/images/samm-logo.webp"
              alt={site.name}
              width={180}
              height={52}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xs text-body-sm text-canvas-50/60">
              Physician-led age management medicine in coastal Georgia since {site.founded}.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-body-sm text-canvas-50/80 transition-colors hover:text-canvas-50"
              >
                <Phone className="size-4 shrink-0 text-canvas-200" aria-hidden />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-3 text-body-sm text-canvas-50/80 transition-colors hover:text-canvas-50"
              >
                <Mail className="size-4 shrink-0 text-canvas-200" aria-hidden />
                {site.email}
              </a>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Treatments">
            <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">
              Treatments
            </h2>
            <ul className="mt-6 space-y-3">
              {megaMenu.map((column) => (
                <li key={column.href}>
                  <Link
                    href={column.href}
                    className="text-body-sm text-canvas-50/70 transition-colors hover:text-canvas-50"
                  >
                    {column.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/aesthetics"
                  className="text-body-sm text-canvas-50/70 transition-colors hover:text-canvas-50"
                >
                  Medical Aesthetics
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Practice">
            <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">Practice</h2>
            <ul className="mt-6 space-y-3">
              {footerNav.practice.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-canvas-50/70 transition-colors hover:text-canvas-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">
              Locations
            </h2>
            <ul className="mt-6 space-y-7">
              {locations.map((location) => (
                <li key={location.slug}>
                  <p className="font-display text-title-md text-canvas-50">{location.name}</p>
                  <p className="mt-2 flex gap-3 text-body-sm text-canvas-50/70">
                    <MapPin className="mt-1 size-4 shrink-0 text-canvas-200" aria-hidden />
                    <span>
                      {location.addressLine}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </span>
                  </p>
                  <dl className="mt-3 space-y-1 pl-7 text-body-sm text-canvas-50/60">
                    {location.hours.map((h) => (
                      <div key={h.days} className="flex gap-2">
                        <dt className="w-20 shrink-0">{h.days}</dt>
                        <dd className="tabular">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-canvas-50/10 pt-6 pb-4 text-body-sm text-canvas-50/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.legal.copyright}</p>
          <ul className="flex gap-6">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-canvas-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
