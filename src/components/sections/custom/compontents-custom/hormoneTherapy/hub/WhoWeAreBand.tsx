import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'
import { homeMedia } from '@/content/pages/home-media'
import Image from 'next/image'

interface WhoWeAreBandProps {
  eyebrow?: string
  title: string
  body: string
  cta?: { label: string; href: string }
  backgroundImage?: string
  image: string
}

/**
 * BHRT hub page's "Who We Are" band — a photo-left/navy-right split over a
 * single full-bleed background image, with the copy confined to the right
 * half via an actual 2-column grid (the shared `HeroBand`/`.hero-bg` doesn't
 * constrain `.content`'s width, so its text wraps far wider than this
 * design calls for — kept as its own file rather than editing that shared,
 * homepage-used component). Styling is the already-ported `.hero-bg` /
 * `.lg-col-lg-6` classes in src/app/legacy.css; no new CSS needed.
 */
export function WhoWeAreBand({
  eyebrow,
  title,
  body,
  cta,
  backgroundImage = homeMedia.whoWeAreBackground,
  image
}: WhoWeAreBandProps) {
  return (
    <div  >
      <div className="w-full h-[560px] flex">

        <div className="lg-col-lg-6" >
          <img src={image} alt="" />
        </div>

        <div className="lg-col-lg-6 h-[560px]  p-30" style={{ backgroundImage: `url('${backgroundImage}')` }}>
          <div className="">
            {eyebrow ? <h1 className=" text-[14px] text-white font-bold">{eyebrow}</h1> : null}
            <h1 className="text-white! sm:text-[48px] rexr-[36px]">{title}</h1>

            <div className=" text-white">
              <p className='text-white text-[16px]'>{body}</p>
            </div>

            {cta ? (
              <div className="cta mt-6">
                <LegacyCtaLink
                  href={cta.href}
                  className="lg-btn lg-btn-arrow-right lg-btn-arrow-svg group"
                >
                  {cta.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    className="absolute right-[25px] top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-x-2"
                  >
                    <path
                      d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
                      fill="white"
                    />
                  </svg>
                </LegacyCtaLink>
              </div>
            ) : null}
          </div>
        </div>

      </div>

    </div>
  )
}
