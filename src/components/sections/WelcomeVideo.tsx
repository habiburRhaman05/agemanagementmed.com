import { homeMedia } from '@/content/pages/home-media'

interface WelcomeVideoProps {
  title: string
  /** Animated poster shown before the video is opened. */
  posterUrl?: string
  /** Video opened in a new tab, as on the live site. */
  videoHref: string
}

/**
 * The live site's welcome block — a heading and a wide 20px-radius video
 * poster with a centred play button, both sitting on a pale blue band.
 * Ported live-site CSS (`.video-d`).
 */
export function WelcomeVideo({
  title,
  posterUrl = homeMedia.welcomePoster,
  videoHref,
}: WelcomeVideoProps) {
  return (
    <div className="lg-welcome-band">
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h3 className="lg-title">{title}</h3>
          </div>
        </div>
      </div>

      <div className="video-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              <div className="img" style={{ backgroundImage: `url('${posterUrl}')` }} />
              <a href={videoHref} target="_blank" rel="noreferrer" aria-label={`Play video: ${title}`}>
                <svg className="play-icon" viewBox="0 0 100 100" fill="none" aria-hidden>
                  <circle cx="50" cy="50" r="49" fill="rgba(255,255,255,0.85)" />
                  <path d="M40 32L70 50L40 68V32Z" fill="#519B98" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
