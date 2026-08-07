"use client"

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { homeMedia } from '@/content/pages/home-media'

interface WelcomeVideoProps {
  title: string
  /** Animated poster shown before the video is opened. */
  posterUrl?: string
  /** Vimeo page URL opened in a modal, matching the hero's video modal. */
  videoHref: string
}

/** Convert a Vimeo page URL (https://vimeo.com/1080951303) into an embeddable player URL. */
function toPlayerUrl(href: string): string {
  const id = href.match(/vimeo\.com\/(\d+)/)?.[1]
  return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : href
}

/**
 * The live site's welcome block — a heading and a wide 20px-radius video
 * poster with a centred play button, both sitting on a pale blue band.
 * Clicking the play button opens the video in a modal (like the hero).
 */
export function WelcomeVideo({
  title,
  posterUrl = homeMedia.welcomePoster,
  videoHref,
}: WelcomeVideoProps) {
  const [open, setOpen] = useState(false)

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
              <a
                href={videoHref}
                aria-label={`Play video: ${title}`}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(true)
                }}
              >
                <svg className="play-icon" viewBox="0 0 100 100" fill="none" aria-hidden>
                  <circle cx="50" cy="50" r="49" fill="rgba(255,255,255,0.85)" />
                  <path d="M40 32L70 50L40 68V32Z" fill="#519B98" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-1.5rem)] max-h-[90dvh] border-none bg-black p-1 sm:max-w-5xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              title="vimeo-player"
              src={toPlayerUrl(videoHref)}
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
