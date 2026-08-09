"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import BookAppointmentButton from "@/components/shared/BookAppointmentButton";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Cta, Media } from "@/types/content";



interface Crumb {
  label: string;
  href: string;
}

interface HeroActions {
  /** Show a "Watch video" button that opens `videoSource` in a modal. Omit/false hides the button entirely. */
  videoModal?: boolean;
  /** Show a "Schedule a consultation" button. Omit/false hides the button entirely. */
  formModal?: boolean;
  /** Raw embed markup for the video modal, e.g. a Vimeo/YouTube `<iframe>` string. */
  videoSource?: string;
  /** 'booking' (default) opens the shared appointment modal; 'lead' opens the lighter lead-capture form instead. */
  formSource?: "booking" | "lead";
}

interface HeroEditorialProps {
  eyebrow?: string;
  title: string;
  lead: string;
  lead2?: string;
  textWidth?: string;
  image: Media;
  ctas?: Cta[];
  breadcrumbs?: Crumb[];
  actions?: HeroActions;
  /** Treatment pages want the full viewport; editorial/blog posts stay a shorter, content-forward height. */
  fullHeight?: boolean;
  /** Hide the default fallback CTA button if no actions are specified. */
  hideDefaultCta?: boolean;
  /** Keep CTAs centered until the tablet/desktop breakpoint instead of left-aligning early. */
  centerUntilTablet?: boolean;
  containerOverride?: string;
  overideMinheight?: string;
  overlay?: boolean;
  /** Custom mobile object-position for the background image. */
  mobileFocalPoint?: string;
  /** Left-align CTAs on mobile instead of centering them. */
  leftAlignMobile?: boolean;
  /** Custom text for the primary CTA button; defaults to "START TODAY" */
  primaryCtaLabel?: string;
  heroDiv?: string;
  /** Extra class(es) added to the lead paragraph (overrides max-w-2xl). */
  heroPara?: string;
}


export function SpecialsHero({
  eyebrow,
  title,
  lead,
  lead2,
  image,
  ctas,
  breadcrumbs,
  actions,
  fullHeight = false,
  hideDefaultCta = false,
  centerUntilTablet = false,
  containerOverride,
  overideMinheight,
  mobileFocalPoint,
  leftAlignMobile = false,
  overlay = true,
  primaryCtaLabel = "Schedule a consultation",
  heroDiv,
  heroPara,
  textWidth,
}: HeroEditorialProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const showFormButton = Boolean(actions?.formModal);
  const showVideoButton = Boolean(actions?.videoModal && actions?.videoSource);
  const isLeadForm = actions?.formSource === "lead";

  // Smaller, non‑full‑width CTA on mobile; the "lg" size (via the `size` prop) still applies from `sm:` up.
  const ctaSizeClass =
    "h-11 px-6 text-body-sm font-bold uppercase tracking-wide sm:h-14 sm:px-9 sm:text-body";
  // Same sizing, without text classes — BookAppointmentButton fixes its own font‑size/weight at 14px/700 on every device.
  const bookingCtaSizeClass = "h-11 px-6 sm:h-14 sm:px-9";

  // When the video dialog opens, show a loading spinner until the iframe loads.
  useEffect(() => {
    if (!videoOpen) return;
    const container = videoContainerRef.current;
    if (!container) return;

    const iframe = container.querySelector("iframe");
    if (!iframe) {
      // No iframe found – fallback to hide loading after a short delay.
      const timeout = setTimeout(() => setVideoLoading(false), 2000);
      return () => clearTimeout(timeout);
    }

    const onLoad = () => setVideoLoading(false);
    iframe.addEventListener("load", onLoad);
    // Fallback in case the iframe never fires the load event.
    const timeout = setTimeout(() => setVideoLoading(false), 5000);

    return () => {
      iframe.removeEventListener("load", onLoad);
      clearTimeout(timeout);
    };
  }, [videoOpen]);

  return (
    <section
      id="specialBanner"
      
      style={
    {
      backgroundImage:`url(${image.src})`,
      height:"450px",
      padding:"0px"!
    }
      }
    >
   
      <div className={'mx-auto w-full max-w-[80rem] px-2 lg:px-12 relative z-20  lg-container'}>
        <div className={cn(`text-center mt-20 sm:text-left ${textWidth ? `max-w-${textWidth}px` : "max-w-[700px]"}`, heroDiv)}>
          <h1
            className="text-[40px] sm:text-[46px] lg:text-[56px] font-medium leading-[48px] sm:leading-[62px] text-white font-['Bodoni_Moda',var(--font-bodoni),serif]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h1>

    
          {
            Array.isArray(lead) ? lead.map((text,i)=>{
              return  <div
              key={i+1}
           
          >
            <p
             className={cn(
              "mt-4 max-w-2xl text-[18px] lg:text-[20px] font-normal leading-relaxed text-white/90 md:mt-6",
              heroPara
            )}
            >

            {text}
            </p>
          </div>
            }) :  <p
            className={cn(
              "mt-4 max-w-2xl text-[18px] lg:text-[20px] font-normal leading-relaxed text-white/90 md:mt-6",
              heroPara
            )}
          >
            {lead}
          </p>
          }

          {/* Default CTA – only shown when no custom actions are defined */}
          {!showFormButton && !showVideoButton && !hideDefaultCta && (
            <div
              className={cn(
                "hero-enter mt-8 flex flex-col flex-wrap items-center gap-3 md:mt-10 md:gap-4 w-full",
                leftAlignMobile ? "items-start justify-start" : "justify-center",
                centerUntilTablet
                  ? "min-[992px]:flex-row min-[992px]:justify-start"
                  : "sm:flex-row sm:justify-start"
              )}
              style={{ animationDelay: "0.5s" }}
            >
              <BookAppointmentButton
                variant="teal"
                className={cn("w-auto", bookingCtaSizeClass)}
                modalTitle="Book Your Consultation"
              >
                {primaryCtaLabel}
              </BookAppointmentButton>
            </div>
          )}

         
        </div>
      </div>
    </section>
  );
}