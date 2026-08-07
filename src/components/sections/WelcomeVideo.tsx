"use client"

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  return id ? `https://player.vimeo.com/video/${id}?h=91f29206b0&autoplay=1` : href
}

/**
 * The live site's welcome block — a heading and a wide 20px-radius video
 * poster with a centred play button, sitting on a pale blue band.
 * Clicking the video opens the video in a modal (matching the hero video modal).
 */
export function WelcomeVideo({
  title,
  posterUrl = homeMedia.welcomePoster,
  videoHref,
}: WelcomeVideoProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <div className="lg-welcome-band">
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h3 className="lg-title">{title}</h3>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="video-d">
          <div className="lg-max-width-1440">
            <div className="lg-container">
              <DialogTrigger asChild>
                <div className="box cursor-pointer group">
                  <div
                    className="img"
                    style={{ backgroundImage: `url('${posterUrl}')` }}
                  />
                  <div className="flex items-center justify-center absolute inset-0">
                    <svg
                      className="play-icon w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform group-hover:scale-110"
                      viewBox="0 0 100 100"
                      fill="none"
                      aria-hidden
                    >
                      <circle cx="50" cy="50" r="49" fill="rgba(255,255,255,0.85)" />
                      <path d="M40 32L70 50L40 68V32Z" fill="#519B98" />
                    </svg>
                  </div>
                </div>
              </DialogTrigger>
            </div>
          </div>
        </div>

        <DialogContent className="w-[calc(100%-1.5rem)] sm:max-w-5xl max-h-[90dvh] border-none bg-black p-0 overflow-hidden !rounded-none sm:!rounded-none md:!rounded-none lg:!rounded-none shadow-2xl [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/80 [&>button]:border-none [&>button]:size-8 [&>button]:top-3 [&>button]:right-3 [&>button]:z-30 [&>button]:rounded-full">
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden bg-black !rounded-none">
            <iframe
              title="vimeo-player"
              src={toPlayerUrl(videoHref)}
              className="absolute inset-0 h-full w-full border-none bg-black"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
