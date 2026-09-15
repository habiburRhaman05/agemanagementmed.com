import Image from 'next/image'

interface ContactHeroProps {
  title: string
  lead?: string
}

/**
 * Live-site Contact Us hero — `#banner-d.centered-content`. Full-bleed photo,
 * min-height 850px, centered white serif title + lead. Ported 1:1 from
 * download/_contact-us_.html (banner-20-bg.jpg background).
 *
 * Used only on /contact-us — every other page keeps `HeroCompact`.
 */
export function ContactHero({ title, lead }: ContactHeroProps) {
  return (
    <div className="relative flex min-h-[700px] items-center overflow-hidden bg-ink-900 px-4 py-24 sm:min-h-[650px] sm:py-32 lg:min-h-[850px] lg:py-0">
      {/* A CSS `background-image` here was invisible to the browser's
          preload scanner and couldn't carry `fetchpriority` — the same LCP
          gap as `HeroEditorial`'s and `HeroCompact`'s banners. The container's
          own `bg-ink-900` above shows through until the photo paints, instead
          of the page's white/ivory background behind white hero text. */}
      <Image
        src="/themes/default/assets/images/banner-20-bg.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[50%_75%]"
      />

      <div aria-hidden className="absolute inset-0 bg-[#1111118c]/55" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="font-display  font-medium capitalize leading-[1.1] text-white sm:text-[56px] text-[40px]  hero-title">
            {title}
          </h1>

          {lead ? (
            <p className="mx-auto mt-6 max-w-[800px] text-body-lg text-white/90">{lead}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
