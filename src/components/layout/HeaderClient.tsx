'use client'

import { Menu, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { primaryNav } from '@/content/navigation'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

interface HeaderClientProps {
  /** Home sits over a dark immersive hero, so the bar starts transparent. */
  overlay?: boolean
  logoUrl: string
}

export function HeaderClient({ overlay = false, logoUrl }: HeaderClientProps) {
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
            // Near-opaque, not translucent glass — a hero tall enough to still
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
              aria-label={`${site.name} — home`}
            >
              <Image
                src={logoUrl}
                alt={site.name}
                width={168}
                height={48}
                priority
                className={cn('h-9 w-auto transition-all duration-300 lg:h-10', !solid && 'brightness-0 invert')}
              />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              <MegaMenu inverse={!solid} />
              {primaryNav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-body-sm font-medium transition-colors',
                    solid ? 'text-ink-900 hover:text-sage-700' : 'text-canvas-50 hover:text-sage-400',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={site.phoneHref}
                className={cn(
                  'hidden items-center gap-2 rounded-full px-4 py-2 text-body-sm font-medium transition-colors xl:flex',
                  solid
                    ? 'bg-sage-100 text-ink-900 hover:bg-sage-600 hover:text-white'
                    : 'bg-white/10 text-canvas-50 hover:bg-sage-600 hover:text-white',
                )}
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
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
