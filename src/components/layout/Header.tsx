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

interface HeaderProps {
  /** Home sits over a dark immersive hero, so the bar starts transparent. */
  overlay?: boolean
}

export function Header({ overlay = false }: HeaderProps) {
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
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          solid ? 'border-b border-canvas-300/60 bg-canvas-100/95 backdrop-blur-sm' : 'bg-transparent',
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between gap-8 lg:h-24">
            <Link
              href="/"
              className="relative z-10 shrink-0"
              aria-label={`${site.name} — home`}
            >
              <Image
                src="/images/samm-blue-logo.png"
                alt={site.name}
                width={168}
                height={48}
                priority
                className={cn('h-10 w-auto lg:h-12', !solid && 'brightness-0 invert')}
              />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              <MegaMenu inverse={!solid} />
              {primaryNav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-body-sm font-medium transition-opacity hover:opacity-60',
                    solid ? 'text-ink-900' : 'text-canvas-50',
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
                className="hidden sm:inline-flex bg-sage-600 !text-white hover:bg-sage-700"
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
