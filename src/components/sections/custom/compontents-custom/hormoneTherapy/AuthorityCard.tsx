import Image from 'next/image'

import type { Media } from '@/types/content'

export interface AuthorityCardProps {
  image: Media
  name: string
  lastUpdated: string
  blurb: string
}

/**
 * The BHRT-for-Women "Authority And Trust" reviewer card — `#hero-a`. Ported
 * 1:1 from https://www.agemanagementmed.com/bioidentical-hormone-replacement-therapy/female/;
 * styling lives in src/app/legacy.css.
 */
export function AuthorityCard({ image, name, lastUpdated, blurb }: AuthorityCardProps) {
  return (
    <div id="hero-a">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="box">
            <h2 className="lg-title lg-text-center">Authority And Trust</h2>

            <div className="lg-grid lg-items-center">
              <div className="img lg-col-lg-5">
                <Image src={image.src} alt={image.alt} width={299} height={299} />
              </div>

              <div className="content lg-col-lg-7">
                <div className="lg-top-title">Reviewed By</div>
                <div className="name">{name}</div>
                <div className="lg-top-title">Last Updated: {lastUpdated}</div>
                <div className="lg-text">
                  <p>{blurb}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
