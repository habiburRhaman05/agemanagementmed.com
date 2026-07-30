'use client'

import { ChevronDown, Menu, Phone, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { primaryNav, NavLink } from '@/content/navigation'
import { site } from '@/content/site'
import { toTelHref } from '@/lib/contact'
import { cn } from '@/lib/utils'

function NavDropdown({ item, solid }: { item: NavLink; solid: boolean }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  // Split label into two lines if it contains "for" to match design
  const labelParts = item.label.toLowerCase().includes('for') 
    ? item.label.split(/for/i)
    : [item.label];

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1 text-[11px] font-bold transition-colors uppercase tracking-[0.1em]',
          solid ? 'text-ink-900 hover:text-sage-700' : 'text-canvas-50 hover:text-sage-400',
        )}
      >
        {labelParts.length > 1 ? (
          <span className="flex flex-col items-center leading-tight">
            <span>{labelParts[0].trim()}</span>
            <span>FOR {labelParts[1].trim()}</span>
          </span>
        ) : (
          <span>{item.label}</span>
        )}
        <ChevronDown
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[340px] rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50">
          <ul className="flex flex-col">
            {item.links?.map((link, i) => {
              const isLast = i === (item.links?.length ?? 0) - 1;
              return (
                <li key={link.href} className={cn(i !== 0 && "border-t border-canvas-200")}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    target={isLast ? "_blank" : undefined}
                    rel={isLast ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center justify-between py-3 px-3 text-sm transition-colors hover:text-sage-700 hover:bg-sage-50/50 rounded-lg",
                      isLast ? "font-bold text-ink-900" : "font-medium text-ink-700"
                    )}
                  >
                    <span>{link.label}</span>
                    {isLast ? (
                      <ExternalLink className="h-4 w-4 text-canvas-500" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-canvas-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

interface HeaderClientProps {
  /** Home sits over a dark immersive hero, so the bar starts transparent. */
  overlay?: boolean
  logoUrl: string
  siteName: string
  phone: string
}

export function HeaderClient({ overlay = false, logoUrl, siteName, phone }: HeaderClientProps) {
  const phoneHref = toTelHref(phone)
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setDrawerOpen(false), [pathname])

  const solid = scrolled || !overlay

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-0 pt-0 transition-[padding] duration-500 lg:px-4 lg:pt-4">
        <Container
          className={cn(
            'transition-all duration-500',
            // Near-opaque, not translucent glass ?" a hero tall enough to still
            // be visible behind the bar after a small scroll must not bleed
            // its headline through the nav. `backdrop-blur` alone gives the
            // soft glass edge without sacrificing legibility.
            solid &&
              'bg-canvas-50/95 shadow-md backdrop-blur-xl lg:max-w-304 lg:rounded-full lg:border lg:border-white/60 lg:shadow-lg',
          )}
        >
          <div className="flex h-20 items-center justify-between gap-8 lg:h-20">
            <Link
              href="/"
              className="relative z-10 shrink-0"
              aria-label={`${siteName} ?" home`}
            >
              <Image
                src={logoUrl}
                alt={siteName}
                width={168}
                height={48}
                priority
                className={cn('h-9 w-auto transition-all duration-300 lg:h-10', !solid && 'brightness-0 invert')}
              />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {primaryNav.map((item) => {
                if (item.links && item.links.length > 0) {
                  return <NavDropdown key={item.label} item={item} solid={solid} />
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative text-[11px] font-bold transition-colors uppercase tracking-[0.1em]',
                      solid ? 'text-ink-900 hover:text-sage-700' : 'text-canvas-50 hover:text-sage-400',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={phoneHref}
                className={cn(
                  'hidden items-center gap-2 rounded-full px-4 py-2 text-body-sm font-medium transition-colors xl:flex',
                  solid
                    ? 'bg-sage-100 text-ink-900 hover:bg-sage-600 hover:text-white'
                    : 'bg-white/10 text-canvas-50 hover:bg-sage-600 hover:text-white',
                )}
              >
                <Phone className="size-4" aria-hidden />
                {phone}
              </a>

              <Button
                asChild
                size="sm"
                variant={solid ? 'primary' : 'inverse'}
                className="hidden sm:inline-flex"
              >
                <Link href={site.bookingHref}>Book consultation</Link>
              </Button>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                className={cn(
                  'inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden',
                  solid ? 'text-ink-900 hover:bg-ink-900/5' : 'text-canvas-50 hover:bg-canvas-50/10',
                )}
              >
                <Menu className="size-6" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
