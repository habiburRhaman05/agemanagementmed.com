"use client"
import Link from 'next/link'
import { useState, type CSSProperties } from 'react'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'
import { BookingForm } from '@/components/shared/BookingForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
export function PremenopauseCta({
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
const [openModal,setOpenModal] = useState(false)
  return (
    <div
      className={`hero-bg${className ? ` ${className}` : ''}`}
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
           <Dialog open={openModal} onOpenChange={(next) => setOpenModal(next)}>
          
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
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content text-center lg:text-left" style={contentStyle}>
            <h2 className="lg-title">{title}</h2>

            <div className="text-[16px] font-medium max-w-[580px] text-white mb-10 ">
              <p>{body}</p>
            </div>

            <div
              className="cta flex justify-center lg:justify-start"
              style={centered ? { display: 'flex', justifyContent: 'center' } : undefined}
            >
                       <div className="cta">
                <Link href={cta.href} onClick={(e)=>{
if(cta.href === "#"){
  e.preventDefault();
setOpenModal(true)
}
                }} className="lg-btn lg-btn-arrow-right">
                  {cta.label}
                </Link>
              </div>
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
