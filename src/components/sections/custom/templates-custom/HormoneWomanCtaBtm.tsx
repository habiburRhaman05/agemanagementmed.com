import Link from 'next/link'
import type { CSSProperties } from 'react'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { MoveRight } from 'lucide-react'
import { BookingForm } from '@/components/shared/BookingForm'

interface ClosingCTAProps extends ClosingCtaData {
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
  /** Background alignment for the band photo. */
  backgroundPosition?: string
  /** Extra class(es) added to the .hero-bg wrapper. */
  className?: string
  /** Small print under the CTA — e.g. the treatment pages' results disclaimer. */
  note?: string
  /** Caps the text column width (px) so the title wraps onto multiple lines instead of running the full container width. Opt-in — omit to keep the existing full-width behavior. */
  contentMaxWidth?: number
  /** Centers the text column (horizontally, within contentMaxWidth) and centers the title/body/CTA instead of the default left alignment. Opt-in — omit to keep the existing left-aligned behavior. */
  centered?: boolean
}

/**
 * The live site's closing `.hero-bg` band — a full-bleed photo behind a
 * left-aligned heading, lead and pill CTA. Ported live-site CSS.
 */
export function HormoneWomanCtaBtm({
  title,
  body,
  cta,
  note,
  backgroundImage = homeMedia.closingBackground,
  backgroundPosition,
  className,
  contentMaxWidth,
  centered = false,
}: ClosingCTAProps) {
  const contentStyle: CSSProperties = {
    ...(contentMaxWidth ? { maxWidth: contentMaxWidth } : null),
    ...(centered ? { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } : null),
  }

  return (
    <div
      className={`hero-bg${className ? ` ${className}` : ''}`}
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content text-center lg:text-left" style={contentStyle}>
            <h2 className="lg-title">{title}</h2>

            <div className="lg-text">
              <p>{body}</p>
            </div>

            <div
              className="cta flex justify-center lg:justify-start"
              style={centered ? { display: 'flex', justifyContent: 'center' } : undefined}
            >
             <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="primary"
                className="  justify-center bg-[#519B99] min-h-[50px] uppercase tracking-[4px] min-w-[216px] text-[14px] leading-4.25 font-bold "
              >
                Schedule consultation <MoveRight />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="
                max-h-[92dvh]
                w-[calc(100%-1.5rem)]
                max-w-[480px]
                sm:max-w-[520px]
                md:max-w-[580px]
                lg:max-w-[620px]
                overflow-y-auto
                rounded-[28px]
                border-none
                bg-[#0B1530]
                p-6
                sm:p-10
                text-white
                shadow-2xl
                [&>button]:bg-white/10
                [&>button]:text-white/70
                [&>button]:hover:bg-white/20
                [&>button]:hover:text-white
                [&>button]:border-none
                [&>button]:cursor-pointer
                [&>button]:rounded-full
                [&>button]:size-9
              "
            >
              <DialogHeader className="mb-2 text-center">
                <DialogTitle className="font-serif text-2xl sm:text-[32px] font-bold text-white text-center tracking-tight">
                  Schedule A Consultation
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <BookingForm variant="dark" />
              </div>
            </DialogContent>
          </Dialog>
            </div>

            {note ? (
              <div
                className="lg-text lg-max-width-825"
                style={{ marginBottom: 0, marginTop: 25 }}
              >
                <p style={{ fontSize: 16 }}>{note}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
