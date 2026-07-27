'use client'

import { ChevronDown, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { footerNav, megaMenu, primaryNav } from '@/content/navigation'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(megaMenu[0]?.href ?? null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Focus trap.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/40"
      />

      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-canvas-100 shadow-lg"
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-canvas-300/60 px-6">
          <span className="font-display text-title-md text-ink-900">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-ink-900/5"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
          <ul className="space-y-1">
            {megaMenu.map((column) => {
              const isOpen = expanded === column.href
              return (
                <li key={column.href} className="border-b border-canvas-300/50">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : column.href)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-title-md text-ink-900"
                  >
                    {column.title}
                    <ChevronDown
                      className={cn('size-5 transition-transform', isOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  {isOpen ? (
                    <ul className="space-y-3 pb-5 pl-1">
                      <li>
                        <Link
                          href={column.href}
                          className="text-body-sm font-medium text-sage-700"
                        >
                          Overview
                        </Link>
                      </li>
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-body-sm text-canvas-600">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}

            {primaryNav.slice(1).map((item) => (
              <li key={item.href} className="border-b border-canvas-300/50">
                <Link
                  href={item.href}
                  className="block py-4 font-display text-title-md text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-3">
            {footerNav.practice.slice(3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body-sm text-canvas-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Booking stays thumb-reachable — the phone call is the conversion. */}
        <div className="shrink-0 space-y-3 border-t border-canvas-300/60 bg-canvas-50 px-6 py-5">
          <Button asChild className="w-full">
            <Link href={site.bookingHref}>Book consultation</Link>
          </Button>
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 py-2 text-body-sm font-medium text-ink-900"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
