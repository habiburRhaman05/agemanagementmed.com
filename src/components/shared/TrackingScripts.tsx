import Script from 'next/script'

import { site } from '@/content/site'

interface TrackingScriptsProps {
  /**
   * Admin-editable IDs from `SiteSettings`. These are *overrides only*: an
   * empty/null value falls through to the hardcoded IDs in `site.tracking`,
   * so the tags always render on every page even when the database is
   * unreachable or a settings field was never filled in.
   */
  googleAnalyticsId?: string | null
  googleTagManagerId?: string | null
  metaPixelId?: string | null
}

/** Treats `null`, `undefined` and whitespace-only strings as "not set". */
const clean = (value?: string | null) => value?.trim() || ''

export interface TrackingIds {
  googleTagManagerId: string
  googleAnalyticsId: string
  metaPixelId: string
}

/**
 * Static IDs from `site.tracking` are the guarantee; a supplied setting only
 * wins when it holds a real value. Exported because this is the exact rule that
 * broke reporting — an empty `SiteSettings` field must fall back, not blank the
 * tag out.
 */
export function resolveTrackingIds(
  overrides: Partial<Record<keyof TrackingIds, string | null>> = {},
): TrackingIds {
  return {
    googleTagManagerId: clean(overrides.googleTagManagerId) || site.tracking.googleTagManagerId,
    googleAnalyticsId: clean(overrides.googleAnalyticsId) || site.tracking.googleAnalyticsId,
    metaPixelId: clean(overrides.metaPixelId) || site.tracking.metaPixelId,
  }
}

/**
 * GA4, Google Tag Manager and the Meta Pixel — rendered on every route from the
 * root layout, eagerly, with no interaction gate and no dependency on a
 * successful database read.
 *
 * History worth keeping in mind before "optimizing" this again: these tags used
 * to be loaded only after the visitor's first scroll/tap/mouse move/key press
 * (a Total Blocking Time optimization). GA4 lead reporting went to zero across
 * every channel the day that shipped, because the tag never fired for a visit
 * that didn't interact. The tags now load on every pageview; `afterInteractive`
 * keeps them off the critical rendering path, which is the safe half of that
 * tradeoff.
 *
 * `strategy="afterInteractive"` also matters for correctness: the GA4 snippet
 * defines a global `gtag` that queues into `dataLayer`, so an event fired by a
 * form before `gtag.js` has finished downloading is buffered and delivered
 * rather than dropped.
 *
 * Note: this renders on `/admin` too. If you'd rather keep staff traffic out of
 * your reports, filter those hosts/paths in GA4 rather than gating the tag.
 */
export function TrackingScripts({
  googleAnalyticsId,
  googleTagManagerId,
  metaPixelId,
}: TrackingScriptsProps) {
  const { googleTagManagerId: gtm, googleAnalyticsId: ga4, metaPixelId: pixel } = resolveTrackingIds({
    googleAnalyticsId,
    googleTagManagerId,
    metaPixelId,
  })

  return (
    <>
      {/* Google Tag Manager — container. Everything else can be configured
          inside GTM once a container ID is supplied. */}
      {gtm ? (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtm}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {/* Google Analytics 4 */}
      {ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4}');`}
          </Script>
        </>
      ) : null}

      {/* Meta Pixel */}
      {pixel ? (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixel}');
              fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  )
}
