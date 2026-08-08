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
    <footer className=" bg-white text-ink-900">
      <Container>
        <div className="grid gap-12 pt-16 pb-12 text-center md:grid-cols-12 md:gap-8 md:pt-20 md:pb-14 xl:text-left">
          {/* Brand column — centered last row below xl (mobile + md); first column, left-aligned on xl (4-col) */}
          <Reveal
            delay={0}
            className="flex flex-col items-center text-center order-last md:col-span-12 xl:order-none xl:col-span-3 xl:items-start xl:text-left"
          >
            <Image src={logoUrl} alt={siteName} width={227} height={104} />

            <SocialLinks links={socialLinks} variant="navy" className="mt-6 flex gap-3" />

            <div className="mt-6 space-y-3">
              <a
                href={emailHref}
                className="flex items-center gap-3 text-[14px] text-[#111214] transition-colors hover:text-ink-900"
              >
                <Mail className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                {email}
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-3 text-[14px] text-[#111214] transition-colors hover:text-ink-900"
              >
                <Phone className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                {phone}
              </a>
            </div>

            <button   className="mt-6 bg-[#519B99] py-3 text-white rounded-3xl text-[14px] font-bold   w-[275px] hover:bg-[#559795]  uppercase tracking-wide">
              <Link href="/newsletter">Join our newsletter</Link>
            </button>
          </Reveal>

          {/* Contact info: both locations, address + hours */}
          <Reveal delay={60} className="flex flex-col items-center text-center order-1 md:col-span-4 xl:order-none xl:col-span-3 xl:items-start xl:text-left">
            <h2 className="text-base font-sans font-semibold text-ink-900">
              Contact Info
            </h2>
            <div className="mt-6 space-y-7">
              {locations.map((location) => (
                <div key={location.slug}>
                  <p className="text-sm font-sans font-semibold text-[#0B2056]">
                    {location.name.split(' / ')[0]}
                  </p>
                  <p className="mt-2 flex items-start justify-center gap-2 text-[14px] text-[#111214] xl:justify-start">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-ink-900/70" aria-hidden />
                    <span>
                      {location.addressLine}, {location.city}, {location.state} {location.zip}
                    </span>
                  </p>

                  <p className="mt-4 text-sm font-sans font-semibold text-[#0B2056]">Office Hours</p>
                  <p className="mt-2 flex items-center justify-center gap-2 text-[14px] text-[#111214] xl:justify-start">
                    <Clock className="size-4 shrink-0 text-ink-900/70" aria-hidden />
                    <span>
                      {location.hours
                        .filter((h) => h.time.toLowerCase() !== 'closed')
                        .map((h) => `${compactDays(h.days)}: ${compactTime(h.time)}`)
                        .join('   |   ')}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={120} className="flex flex-col items-center text-center order-2 md:col-span-4 xl:order-none xl:col-span-2 xl:items-start xl:text-left">
            <nav aria-label="Quick Links">
              <h2 className="text-base font-sans font-semibold text-ink-900">
                Quick Links
              </h2>
              <ul className="mt-6 space-y-3">
                {footerNav.practice.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-[#0B2056] transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Services */}
          <Reveal delay={180} className="flex flex-col items-center text-center order-3 md:col-span-4 xl:order-none xl:col-span-4 xl:items-start xl:text-left">
            <nav aria-label="Services">
              <h2 className="text-base font-sans font-semibold text-ink-900">
                Services
              </h2>
              <ul className="mt-6 space-y-3">
                {footerNav.treatments.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-[14px] text-[#0B2056] transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className=" flex items-center justify-between border-t border-canvas-300 py-6 text-center text-[14px] uppercase tracking-wide text-[#111214]">
     <div className='flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5'>
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

           <p className="border-t border-canvas-300 py-4 text-center text-[13px] text-[#111214] sm:text-right">
          Developed by{' '}
          <a
            href="https://ghlprime.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-ink-900 transition-colors duration-300 hover:text-[#519B99]"
          >
            GHL Prime
          </a>
        </p>
        </div>

       
      </Container>
    </footer>
  )
}
