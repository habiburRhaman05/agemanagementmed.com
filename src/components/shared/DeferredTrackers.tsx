'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface DeferredTrackersProps {
  googleAnalyticsId?: string | null
  metaPixelId?: string | null
}

/** Any of these means a real visitor is on the page. */
const INTERACTION_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel', 'mousemove'] as const

/**
 * Loads Google Analytics and the Meta Pixel on the visitor's first
 * interaction instead of during page load.
 *
 * Both scripts are invisible, but together they cost ~750 ms of main-thread
 * work while the page is loading (Total Blocking Time), and the Pixel sets
 * a third-party `fr` cookie that Lighthouse's Best Practices audit penalizes.
 * Waiting for the first scroll/tap/mouse move/key press takes them out of the
 * load entirely.
 *
 * Tradeoff: a visitor who leaves without ever scrolling, tapping, moving the
 * mouse or pressing a key isn't counted. Nearly every real visit does at
 * least one of those.
 */
export function DeferredTrackers({ googleAnalyticsId, metaPixelId }: DeferredTrackersProps) {
  const [interacted, setInteracted] = useState(false)

  useEffect(() => {
    if (interacted || (!googleAnalyticsId && !metaPixelId)) return
    const start = () => setInteracted(true)
    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, start, { once: true, passive: true })
    }
    return () => {
      for (const event of INTERACTION_EVENTS) window.removeEventListener(event, start)
    }
  }, [interacted, googleAnalyticsId, metaPixelId])

  if (!interacted) return null

  return (
    <>
      {googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');`}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  )
}
