"use client"

import { useState } from 'react'
import { Mail, MapPin, Phone, ChevronDown } from 'lucide-react'
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

function FooterIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-600/15 text-sage-400 transition-colors duration-200 group-hover:bg-sage-600/30">
      {children}
    </span>
  )
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
  const [showAllTreatments, setShowAllTreatments] = useState(false)

  // Append hardcoded medical aesthetics link so it's part of the list
  const allTreatments = [
    ...footerNav.treatments,
    { label: 'Medical Aesthetics Services', href: 'https://www.savannahskinmed.com/', external: true }
  ]
  const displayedTreatments = showAllTreatments ? allTreatments : allTreatments.slice(0, 8)

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-900 text-canvas-50">
      <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 pt-20 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-16">

          {/* Brand column */}
          <Reveal delay={0} className="lg:col-span-4">
            <Image
              src={logoUrl}
              alt={siteName}
              width={180}
              height={52}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xs text-body-sm text-canvas-50/60">
              Physician-led age management medicine in coastal Georgia since {site.founded}.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={phoneHref}
                className="group flex items-center gap-3 text-body-sm text-canvas-50/80 transition-colors hover:text-canvas-50"
              >
                <FooterIcon>
                  <Phone className="size-3.5" aria-hidden />
                </FooterIcon>
                {phone}
              </a>
              <a
                href={emailHref}
                className="group flex items-center gap-3 text-body-sm text-canvas-50/80 transition-colors hover:text-canvas-50"
              >
                <FooterIcon>
                  <Mail className="size-3.5" aria-hidden />
                </FooterIcon>
                {email}
              </a>
            </div>

            <SocialLinks links={socialLinks} className="mt-6 flex gap-3" />

            <Button
              asChild
              size="sm"
              className="mt-6 text-label uppercase tracking-wide"
            >
              <Link href="/newsletter">Join our newsletter</Link>
            </Button>
          </Reveal>

          {/* Practice nav */}
          <Reveal delay={60} className="lg:col-span-2">
            <nav aria-label="Practice">
              <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">Quick Links</h2>
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
          </Reveal>

          {/* Locations */}
          <Reveal delay={120} className="lg:col-span-3">
            <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">
              Locations
            </h2>
            <ul className="mt-6 space-y-7">
              {locations.map((location) => (
                <li key={location.slug}>
                  <p className="font-display text-title-md text-canvas-50">{location.name}</p>
                  <p className="mt-2 flex gap-3 text-body-sm text-canvas-50/70">
                    <FooterIcon>
                      <MapPin className="size-3.5" aria-hidden />
                    </FooterIcon>
                    <span className="pt-1">
                      {location.addressLine}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </span>
                  </p>
                  <dl className="mt-3 space-y-1 pl-11 text-body-sm text-canvas-50/60">
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
          </Reveal>

          {/* Treatments nav (Moved to end) */}
          <Reveal delay={180} className="lg:col-span-3">
            <nav aria-label="Treatments">
              <h2 className="text-label font-sans font-semibold uppercase text-canvas-200">
                Treatments
              </h2>
              <ul className="mt-6 space-y-3">
                {displayedTreatments.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={(item as any).external ? "_blank" : undefined}
                      className="text-body-sm text-canvas-50/70 transition-colors hover:text-canvas-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {!showAllTreatments && allTreatments.length > 8 && (
                  <li>
                    <button
                      onClick={() => setShowAllTreatments(true)}
                      className="group mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sage-400 transition-colors hover:text-sage-300"
                    >
                      View More 
                      <ChevronDown className="size-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden />
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 border-t border-canvas-50/10 pt-8 pb-6 text-body-sm text-canvas-50/50 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Side: Copyright + Legal Links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p>{site.legal.copyright}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-canvas-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Redesigned Developer Attribution */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-canvas-50/40 uppercase tracking-widest font-semibold">
              Developed By
            </span>
            <a 
              href="https://ghlprime.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all hover:bg-white/10 hover:border-white/20"
            >
              <span className="font-display font-medium text-canvas-50 text-sm tracking-wide">
                GHL<span className="text-sage-400 font-bold group-hover:text-sage-300 transition-colors">Prime</span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

