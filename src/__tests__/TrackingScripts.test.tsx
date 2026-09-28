import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { resolveTrackingIds, TrackingScripts } from '@/components/shared/TrackingScripts'
import { site } from '@/content/site'

/**
 * `next/script` injects its tags imperatively and renders nothing outside a live
 * Next render, so it's mocked down to a plain `<script>` here. That keeps these
 * tests focused on this component's own responsibility: which tags render and
 * which IDs they carry.
 *
 * Assertions use `renderToStaticMarkup` rather than a jsdom container for two
 * reasons: it is the markup that actually ships to the browser, and jsdom
 * serializes `<noscript>` contents as raw text, hiding the fallback tags.
 */
vi.mock('next/script', () => ({
  default: ({
    children,
    id,
    src,
  }: {
    children?: string
    id?: string
    src?: string
    strategy?: string
  }) => (
    <script
      id={id}
      src={src}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: mirrors what next/script emits
      dangerouslySetInnerHTML={children ? { __html: children } : undefined}
    />
  ),
}))

/**
 * The bug these tests lock down: the tags were rendered from DB-backed
 * `SiteSettings`, so a null field, a stale 1-hour cache entry, or an unreachable
 * database meant the tag never reached the page and reporting flatlined across
 * every channel. The static IDs must always render.
 */
describe('resolveTrackingIds', () => {
  it('falls back to the static IDs when nothing is supplied', () => {
    expect(resolveTrackingIds()).toEqual({
      googleAnalyticsId: 'G-5M5JLG845',
      googleTagManagerId: '',
      metaPixelId: '1113520899741041',
    })
  })

  it('falls back when SiteSettings fields are null or empty', () => {
    const ids = resolveTrackingIds({
      googleAnalyticsId: null,
      googleTagManagerId: '',
      metaPixelId: null,
    })

    expect(ids.googleAnalyticsId).toBe(site.tracking.googleAnalyticsId)
    expect(ids.metaPixelId).toBe(site.tracking.metaPixelId)
  })

  it('treats whitespace-only values as unset', () => {
    const ids = resolveTrackingIds({ googleAnalyticsId: '   ', metaPixelId: '\n\t ' })

    expect(ids.googleAnalyticsId).toBe(site.tracking.googleAnalyticsId)
    expect(ids.metaPixelId).toBe(site.tracking.metaPixelId)
  })

  it('prefers a real admin-supplied value', () => {
    expect(resolveTrackingIds({ googleAnalyticsId: 'G-OVERRIDE123' }).googleAnalyticsId).toBe(
      'G-OVERRIDE123',
    )
  })
})

describe('TrackingScripts', () => {
  it('renders GA4, the Meta Pixel and their noscript fallbacks from static IDs', () => {
    const html = renderToStaticMarkup(<TrackingScripts />)

    expect(html).toContain('googletagmanager.com/gtag/js?id=G-5M5JLG845')
    expect(html).toContain("gtag('config', 'G-5M5JLG845')")
    expect(html).toContain('connect.facebook.net/en_US/fbevents.js')
    expect(html).toContain("fbq('init', '1113520899741041')")
    expect(html).toContain("fbq('track', 'PageView')")
    expect(html).toContain('facebook.com/tr?id=1113520899741041')
  })

  it('still renders every tag when SiteSettings come back null', () => {
    const html = renderToStaticMarkup(
      <TrackingScripts googleAnalyticsId={null} googleTagManagerId="" metaPixelId={null} />,
    )

    expect(html).toContain('G-5M5JLG845')
    expect(html).toContain('1113520899741041')
  })

  it('lets an admin-supplied ID override the static one', () => {
    const html = renderToStaticMarkup(
      <TrackingScripts googleAnalyticsId="G-OVERRIDE123" metaPixelId="9999999999" />,
    )

    expect(html).toContain('G-OVERRIDE123')
    expect(html).not.toContain('G-5M5JLG845')
    expect(html).toContain('9999999999')
    expect(html).not.toContain('1113520899741041')
  })

  it('renders no GTM markup while the container ID is blank', () => {
    const html = renderToStaticMarkup(<TrackingScripts />)

    expect(site.tracking.googleTagManagerId).toBe('')
    expect(html).not.toContain('googletagmanager.com/gtm.js')
    expect(html).not.toContain('googletagmanager.com/ns.html')
  })

  it('renders the GTM container and its noscript fallback once an ID is set', () => {
    const html = renderToStaticMarkup(<TrackingScripts googleTagManagerId="GTM-TEST123" />)

    expect(html).toContain('GTM-TEST123')
    expect(html).toContain('googletagmanager.com/gtm.js?id=')
    expect(html).toContain('googletagmanager.com/ns.html?id=GTM-TEST123')
  })
})
