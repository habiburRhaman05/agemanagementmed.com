'use client'

import { ArrowRight, ChevronDown, MapPin, MessageSquare, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { primaryNav } from '@/content/navigation'
import { locations, site } from '@/content/site'

interface HeaderClientProps {
  /** Pages over a dark hero keep the bar transparent; others get the solid band. */
  overlay?: boolean
  logoUrl: string
  siteName: string
  phone: string
}

/**
 * Splits "Treatments for Men" across two lines, matching the live header's
 * `Treatments<br>For Men` markup.
 */
function NavLabel({ label }: { label: string }) {
  const match = label.match(/^(.*?)\s+for\s+(.*)$/i)
  if (!match) return <>{label}</>
  return (
    <>
      {match[1]}
      <br />
      For {match[2]}
    </>
  )
}

/* Brand marks are inlined because lucide-react no longer ships brand icons;
   these mirror the Font Awesome glyphs the source drawer used. */
const brandIconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const

function FacebookIcon() {
  return (
    <svg {...brandIconProps}>
      <path d="M14.5 8.5V6.8c0-.8.2-1.2 1.4-1.2h1.5V2.7A20 20 0 0 0 15.2 2.6c-2.4 0-4 1.5-4 4.2v1.7H8.6v3.2h2.6V20h3.3v-8.3h2.5l.4-3.2h-2.9Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg {...brandIconProps}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.83.92 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.8 3.8 0 0 1-.91 1.4c-.43.43-.84.7-1.4.92-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.8 3.8 0 0 1-1.4-.91 3.8 3.8 0 0 1-.92-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2a3.8 3.8 0 0 1 .91-1.4c.43-.43.84-.7 1.4-.92.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.98c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.87 1.35-.17.41-.36 1.03-.41 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.87.41.17 1.03.36 2.18.41 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.87-1.35.17-.41.36-1.03.41-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.87c-.41-.17-1.03-.36-2.18-.41-1.24-.06-1.61-.07-4.75-.07Zm0 3.37a5.03 5.03 0 1 1 0 10.06 5.03 5.03 0 0 1 0-10.06Zm0 8.3a3.27 3.27 0 1 0 0-6.54 3.27 3.27 0 0 0 0 6.53Zm6.4-8.5a1.18 1.18 0 1 1-2.35 0 1.18 1.18 0 0 1 2.35 0Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg {...brandIconProps}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.2 8.9h3.5V20H3.2V8.9Zm5.68 0h3.36v1.52h.05c.47-.85 1.6-1.75 3.3-1.75 3.54 0 4.19 2.2 4.19 5.07V20h-3.5v-5.55c0-1.32-.02-3.02-1.9-3.02-1.9 0-2.2 1.44-2.2 2.92V20h-3.5V8.9Z" />
    </svg>
  )
}

const primaryLocation = locations[0]

/**
 * Header ported to match the live site — the ported rules live in
 * src/app/legacy.css. Structure mirrors the source: logo · centered menu ·
 * phone CTA, collapsing to icon buttons + hamburger with an off-canvas drawer.
 *
 * Desktop dropdowns open on hover through CSS, as on the source site; only the
 * drawer's accordions need JS.
 */
export function HeaderClient({ overlay = false, logoUrl, siteName, phone }: HeaderClientProps) {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // The source locks body scroll behind the drawer (body.hamburger-active).
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navOpen])

  useEffect(() => {
    setNavOpen(false)
    setOpenSubmenu(null)
  }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <div id="header" >
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-row">
              <div className="logo">
                <Link href="/" aria-label={`${siteName} — home`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/samm-logo.png"
                    width={192}
                    height={88}
                    alt={siteName}
                    className="w-[107px]! h-auto! sm:w-30! md:w-35! lg:w-40!"
                  />
                </Link>
              </div>

              <div className="menu">
                <ul>
                  {primaryNav.map((item) => {
                    const submenu = item.links ?? []

                    if (submenu.length === 0) {
                      return (
                        <li
                          key={item.label}
                          className={`menu-li${isActive(item.href) ? ' selected' : ''}`}
                        >
                          <Link href={item.href}>
                            <NavLabel label={item.label} />
                          </Link>
                        </li>
                      )
                    }

                    return (
                      <li key={item.label} className="menu-li has-submenu">
                        <button type="button" aria-haspopup="true">
                          <NavLabel label={item.label} />
                        </button>
                        <ChevronDown className="submenu-icon" size={10} aria-hidden />
                        <ul>
                          {submenu.map((link) =>
                            link.href.startsWith('http') ? (
                              <li key={link.href} className="menu-li">
                                <a href={link.href} target="_blank" rel="noreferrer">
                                  {link.label}
                                  <ArrowRight className="submenu-arrow" size={16} aria-hidden />
                                </a>
                              </li>
                            ) : (
                              <li key={link.href} className="menu-li">
                                <Link href={link.href}>
                                  {link.label}
                                  <ArrowRight className="submenu-arrow" size={16} aria-hidden />
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="cta">
                <a href={site.phoneHref} className="lg-btn">
                  Call: {phone}
                </a>
              </div>

              <div className="phone">
                <a href={site.phoneHref} aria-label={`Call ${phone}`}>
                  <Phone size={18} aria-hidden />
                </a>
              </div>

              <div className="sms">
                <a href={site.smsHref} aria-label="Text us">
                  <MessageSquare size={18} aria-hidden />
                </a>
              </div>

              <div className="hamburger">
                <button
                  type="button"
                  className="box"
                  aria-label="Open menu"
                  aria-expanded={navOpen}
                  onClick={() => setNavOpen(true)}
                >
                  <div />
                  <div />
                  <div />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile-nav" className={navOpen ? 'is-open' : undefined}>
        <div className="close">
          <button
            type="button"
            className="box"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          >
            <div />
            <div />
            <div />
          </button>
          <span className="text">Main Menu</span>
        </div>

        <div className="menu-contact">
          <div className="menu">
            <ul>
              {primaryNav.map((item) => {
                const submenu = item.links ?? []
                const expanded = openSubmenu === item.label

                if (submenu.length === 0) {
                  return (
                    <li key={item.label} className="menu-li">
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  )
                }

                return (
                  <li key={item.label} className={`menu-li${expanded ? ' menu-li-active' : ''}`}>
                    <button
                      type="button"
                      className="submenu-icon"
                      aria-label={`Toggle ${item.label}`}
                      aria-expanded={expanded}
                      onClick={() => setOpenSubmenu(expanded ? null : item.label)}
                    >
                      <ChevronDown size={16} aria-hidden />
                    </button>
                    <span>{item.label}</span>
                    {expanded ? (
                      <ul>
                        {submenu.map((link) =>
                          link.href.startsWith('http') ? (
                            <li key={link.href} className="menu-li">
                              <a href={link.href} target="_blank" rel="noreferrer">
                                {link.label}
                              </a>
                            </li>
                          ) : (
                            <li key={link.href} className="menu-li">
                              <Link href={link.href}>{link.label}</Link>
                            </li>
                          ),
                        )}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="contact">
            <div className="box">
              <p>
                <a href={site.phoneHref}>
                  <Phone size={14} aria-hidden />
                  <span>{phone}</span>
                </a>
              </p>
              {primaryLocation ? (
                <p>
                  <a href={site.mapHref} target="_blank" rel="noreferrer">
                    <MapPin size={14} aria-hidden />
                    <span>
                      {primaryLocation.addressLine}, {primaryLocation.city},{' '}
                      {primaryLocation.state} {primaryLocation.zip}
                    </span>
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="social">
            <ul>
              <li>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className="copyright">
            Copyright © {new Date().getFullYear()} {siteName}
          </div>
        </div>
      </div>

      <div
        id="mobile-nav-overlay"
        className={navOpen ? 'is-open' : undefined}
        onClick={() => setNavOpen(false)}
        aria-hidden
      />
    </>
  )
}
