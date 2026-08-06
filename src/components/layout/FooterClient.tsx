"use client"

import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SocialLinks } from '@/components/layout/SocialLinks'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'
import { footerNav } from '@/content/navigation'
import { locations, site } from '@/content/site'
import { toMailtoHref, toTelHref } from '@/lib/contact'
import type { SiteSettingsData } from '@/lib/settings'

// "Mon – Thu" / "9:00 AM – 5:00 PM" (the canonical, accessible copy used on
// the contact page) compacted to the footer reference's tighter
// "Mon-Thu" / "9AM - 5PM" — display-only, doesn't touch the source data.
function compactDays(days: string) {
  return days.replace(/\s*–\s*/g, '-').replace('Friday', 'Fri')
}
function compactTime(time: string) {
  return time
    .replace(/:00/g, '')
    .replace(/(\d)\s*(AM|PM)/gi, '$1$2')
    .replace(/\s*–\s*/g, ' - ')
}

interface FooterClientProps {
  logoUrl: string
  socialLinks: SiteSettingsData['socialLinks']
  siteName: string
  phone: string
  email: string
}

export function FooterClient({ logoUrl, socialLinks, siteName, phone, email }: FooterClientProps) {
  const phoneHref = toTelHref(phone)
  const emailHref = toMailtoHref(email)

  return (
    <footer className="border-t border-canvas-300 bg-canvas-50 text-ink-900">
      <Container>
        <div className="grid gap-12 pt-16 pb-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-14">
          {/* Brand column */}
          <Reveal delay={0} className="lg:col-span-3">
            <Image src={logoUrl} alt={siteName} width={180} height={80} className="h-16 w-auto" />

            <SocialLinks links={socialLinks} variant="navy" className="mt-6 flex gap-3" />

            <div className="mt-6 space-y-3">
              <a
                href={emailHref}
                className="flex items-center gap-3 text-body-sm text-ink-900/80 transition-colors hover:text-ink-900"
              >
                <Mail className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                {email}
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-3 text-body-sm text-ink-900/80 transition-colors hover:text-ink-900"
              >
                <Phone className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                {phone}
              </a>
            </div>

            <Button asChild size="md" className="mt-6 text-label uppercase tracking-wide">
              <Link href="/newsletter">Join our newsletter</Link>
            </Button>
          </Reveal>

          {/* Contact info: both locations, address + hours */}
          <Reveal delay={60} className="lg:col-span-3">
            <h2 className="text-label font-sans font-semibold uppercase text-ink-900/60">
              Contact Info
            </h2>
            <div className="mt-6 space-y-7">
              {locations.map((location) => (
                <div key={location.slug}>
                  <p className="font-display text-title-md text-ink-900">
                    {location.name.split(' / ')[0]}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-body-sm text-ink-900/70">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-ink-900/70" aria-hidden />
                    <span>
                      {location.addressLine}, {location.city}, {location.state} {location.zip}
                    </span>
                  </p>

                  <p className="mt-4 font-display text-title-md text-ink-900">Office Hours</p>
                  <p className="mt-2 flex items-center gap-2 text-body-sm text-ink-900/70">
                    <Clock className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                    <span>
                      {location.hours
                        .map((h) => `${compactDays(h.days)}: ${compactTime(h.time)}`)
                        .join('   |   ')}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={120} className="lg:col-span-2">
            <nav aria-label="Quick Links">
              <h2 className="text-label font-sans font-semibold uppercase text-ink-900/60">
                Quick Links
              </h2>
              <ul className="mt-6 space-y-3">
                {footerNav.practice.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-ink-900/70 transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Services */}
          <Reveal delay={180} className="lg:col-span-4">
            <nav aria-label="Services">
              <h2 className="text-label font-sans font-semibold uppercase text-ink-900/60">
                Services
              </h2>
              <ul className="mt-6 space-y-3">
                {footerNav.treatments.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-body-sm text-ink-900/70 transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 border-t border-canvas-300 py-6 text-center text-xs uppercase tracking-wide text-ink-900/50">
          <span>
            Copyright &copy; {new Date().getFullYear()} {site.name}
          </span>
          <span className="hidden sm:inline" aria-hidden>
            |
          </span>
          <span>All Rights Reserved</span>
          {footerNav.legal.map((item) => (
            <span key={item.href} className="flex items-center gap-2">
              <span className="hidden sm:inline" aria-hidden>
                |
              </span>
              <Link href={item.href} className="transition-colors hover:text-ink-900">
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </Container>
    </footer>
  )
}
