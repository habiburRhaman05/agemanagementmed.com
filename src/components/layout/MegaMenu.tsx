'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/shared/Container'
import { megaMenu } from '@/content/navigation'
import { cn } from '@/lib/utils'

/** `/treatments` and `/treatments/female` should both count as "on this hub" — but not `/treatments-other`. */
function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Pillar-based mega menu. Replaces the source site's two mirrored gendered
 * dropdowns (16 links) — gender selection moves one level down, where it is
 * the only thing that actually changes. See docs/01-INFORMATION-ARCHITECTURE §3.
 */
export function MegaMenu({ inverse = false }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <div
      ref={containerRef}
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
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="treatments-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 text-body-sm font-medium transition-opacity hover:opacity-60',
          inverse ? 'text-canvas-50' : 'text-ink-900',
        )}
      >
        Treatments
        <ChevronDown
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <div
        id="treatments-menu"
        hidden={!open}
        className="fixed container mx-auto inset-x-0 top-20 border-y border-canvas-300/60 bg-canvas-50/95 shadow-xl backdrop-blur-xl lg:top-24"
      >
        <Container>
          <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
            {megaMenu.map((column) => {
              const columnActive = isActivePath(pathname, column.href)

              return (
                <div key={column.href}>
                  <Link
                    href={column.href}
                    className={cn(
                      'group/title relative inline-block text-title-md font-display transition-colors',
                      columnActive ? 'text-sage-700' : 'text-ink-900 hover:text-sage-700',
                    )}
                  >
                    {column.title}
                    <span
                      className={cn(
                        'pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-sage-600 transition-transform duration-300 ease-out',
                        columnActive ? 'scale-x-100' : 'scale-x-0 group-hover/title:scale-x-100',
                      )}
                      aria-hidden
                    />
                  </Link>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => {
                      const linkActive = pathname === link.href

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              'text-body-sm transition-colors hover:text-sage-700',
                              linkActive ? 'font-semibold text-sage-700' : 'text-canvas-600',
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                </div>
              )
            })}
            
          </div>
          <div className="border-t border-canvas-300/70 bg-gradient-to-r from-sage-50/60 via-white to-sage-50/60">
  <Container>
    <div className="flex flex-col items-center justify-between gap-6 py-7 text-center lg:flex-row lg:text-left">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sage-600">
          Partner Clinic
        </p>

        <h3 className="mt-2 text-lg font-display text-ink-900">
          Medical Aesthetics Services
        </h3>

        <p className="mt-1 max-w-2xl text-body-sm text-canvas-600">
          Botox, dermal fillers, laser treatments, skin rejuvenation and advanced
          aesthetic care from our trusted partner clinic.
        </p>
      </div>

      <Link
        href="https://www.savannahskinmed.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-full border border-sage-300 bg-white px-6 py-3 font-medium text-sage-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sage-500 hover:bg-sage-600 hover:text-white hover:shadow-lg"
      >
        Visit Savannah SkinMed
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </Container>
</div>
        </Container>
      </div>
    </div>
  )
}
