"use client"
import { BookingForm } from '@/components/shared/BookingForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { useState } from 'react'

interface MidPageCTAProps {
  backgroundImage: string
  backgroundPosition: string
  title: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  /** Content column: left/right (col-lg-6, weight-loss pages) or full-width (col-12, GLP-1 pages). */
  align?: 'left' | 'right' | 'full'
  /** Explicit override; defaults to true for 'left'/'full' (matches the source's per-page markup). */
  gradient?: boolean
}

/**
 * Live-site `.hero-bg` mid-page CTA band — a left-, right-, or full-width
 * content column over a full-bleed photo. Ported 1:1 from
 * download/_concierge-medical-weight-loss_{female,male}.html and
 * download/_glp-1-microdosing_{female,male}.html; the styling lives in
 * src/app/legacy.css.
 */
export function MidPageCTA({
  backgroundImage,
  backgroundPosition,
  title,
  body,
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
  align = 'left',
  gradient = align !== 'right',
}: MidPageCTAProps) {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div
      className="hero-bg"
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
      {gradient ? <div className="gradient" aria-hidden /> : null}

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
          <div className={`lg-grid${align === 'right' ? ' lg-justify-end' : ''}`}>
            <div className={`content${align === 'full' ? '' : ' lg-col-lg-6'}`}>
              <div className="lg-title">{title}</div>

              <div className="lg-text max-w-[835px]">
                <p>{body}</p>
              </div>

              <div className="cta">
                <Link href={ctaHref} onClick={(e)=>{
if(ctaHref === "#"){
  e.preventDefault();
setOpenModal(true)
}
                }} className="lg-btn lg-btn-arrow-right">
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
