'use client'

import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { footerNav, primaryNav } from '@/content/navigation'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
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

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <m.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />

          <m.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-canvas-50 shadow-xl"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-canvas-300/60 px-6">
              <span className="font-display text-title-md text-ink-900">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full bg-canvas-200/70 text-ink-900 transition-colors hover:bg-ink-900 hover:text-canvas-50"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
              <ul className="space-y-1">
                {primaryNav.map((item) => {
                  const hasLinks = item.links && item.links.length > 0;
                  const itemKey = item.label;

                  if (hasLinks) {
                    const isOpen = expanded === itemKey;
                    return (
                      <li key={itemKey} className="border-b border-canvas-300/50">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : itemKey)}
                          className="flex w-full items-center justify-between py-4 text-left font-display text-title-md text-ink-900"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'size-5 text-sage-600 transition-transform duration-300',
                              isOpen && 'rotate-180',
                            )}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <m.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="space-y-3 overflow-hidden pb-5 pl-1"
                            >
                              {item.links!.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} onClick={onClose} className="text-body-sm text-canvas-600">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </m.ul>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  return (
                    <li key={item.href || itemKey} className="border-b border-canvas-300/50">
                      <Link
                        href={item.href || '#'}
                        onClick={onClose}
                        className="block py-4 font-display text-title-md text-ink-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

             

              
            </nav>

            {/* Booking stays thumb-reachable — the phone call is the conversion. */}
            <div className="shrink-0 space-y-3 border-t border-canvas-300/60 bg-canvas-100 px-6 py-5">
              <Button asChild className="w-full">
                <Link href={site.bookingHref}>Book consultation</Link>
              </Button>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 py-2 text-body-sm font-medium text-ink-900"
              >
                <Phone className="size-4 text-sage-600" aria-hidden />
                {site.phone}
              </a>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}


