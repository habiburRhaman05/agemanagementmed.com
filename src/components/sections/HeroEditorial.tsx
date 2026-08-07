"use client";

import { Play } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import BookAppointmentButton from "@/components/shared/BookAppointmentButton";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import type { Cta, Media } from "@/types/content";

// react-hook-form + zod only need to load once the lead-capture dialog is
// actually opened, not as part of every treatment page's initial bundle —
// this hero renders on every treatment page, so deferring this form is a
// high-impact JS‑payload cut.
const formLoading = (
  <div className="flex h-48 items-center justify-center text-body-sm text-canvas-600">
    Loading form…
  </div>
);
const LeadForm = dynamic(
  () => import("../shared/LeadForm").then((mod) => mod.LeadForm),
  { loading: () => formLoading }
);

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

function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * An immersive hero style applied to treatments and editorial pages.
 * The image covers the background, overlaid with dark scrim to keep text legible.
 *
 * Sub‑elements stagger on page load for a cinematic entrance.
 *
 * `actions` drives two optional buttons:
 * - `formModal: true` shows a booking CTA (`BookAppointmentButton`) unless `formSource: 'lead'`, in which case it opens the lighter lead‑capture form in a dialog instead
 * - `videoModal: true` shows "Watch video", opening `videoSource` (an iframe embed string) in a dialog
 * Either button is omitted entirely when its flag is false/unset.
 */
export function HeroEditorial({
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
      className={cn(
        "relative isolate flex flex-col justify-end sm:justify-center overflow-hidden",
        fullHeight ? "min-h-[100dvh] sm:min-h-screen" : "min-h-128 lg:min-h-[620px]",
        overideMinheight
      )}
      style={
        {
          "--hero-object-position-mobile": mobileFocalPoint,
        } as Record<string, string | undefined>
      }
    >
      {/* Background Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover hero-editorial-img"
        style={{ objectPosition: image.focalPoint ?? "85% center" }}
      />

      {/* Dark gradient overlay to ensure text legibility while keeping the top of the image vibrant */}
      {/* {overlay && <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />} */}

      <Container className={cn("relative z-10 py-35 md:py-50 lg:py-60 !px-3", containerOverride)}>
        <div className={cn("max-w-[700px] text-center sm:text-left", heroDiv)}>
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

          {/* Custom action CTAs */}
          {(showFormButton || showVideoButton) && (
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
              {showFormButton &&
                (isLeadForm ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        variant="primary"
                        className={cn("bg-[#008080] w-auto justify-center", ctaSizeClass)}
                      >
                        {primaryCtaLabel}
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="
                        w-[calc(100%-1rem)]
                        max-w-2xl
                        max-h-[90dvh]
                        overflow-y-auto
                        rounded-[28px]
                        p-5
                        sm:w-full
                        sm:rounded-[40px]
                        sm:p-10
                      "
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-display text-ink-900">
                          Book Your Consultation
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <LeadForm />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <BookAppointmentButton
                    variant="teal"
                    className={cn("w-auto", bookingCtaSizeClass)}
                    modalTitle="Book Your Consultation"
                  >
                    {primaryCtaLabel}
                  </BookAppointmentButton>
                ))}

              {showVideoButton && (
                <Dialog
                  open={videoOpen}
                  onOpenChange={(next) => {
                    setVideoOpen(next);
                    if (next) setVideoLoading(true);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outlineInverse"
                      className="rounded-full bg-white hover:bg-slate-100 text-[#519B99] hover:text-[#448b89] font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.1em] px-6 py-3.5 sm:px-8 sm:py-4 h-auto inline-flex items-center justify-center gap-2 shadow-md transition-all duration-200 border-none w-auto cursor-pointer"
                    >
                      <Play
                        className="h-3.5 w-3.5 fill-[#519B99] text-[#519B99] translate-x-0.5"
                        aria-hidden="true"
                      />
                      <span>WATCH VIDEO</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-5xl p-1 bg-black border-none max-h-[90vh]">
                    <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
                      {videoLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <svg
                            className="size-12 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          <span className="sr-only">Loading video…</span>
                        </div>
                      )}
                      <div
                        ref={videoContainerRef}
                        className="relative w-full aspect-video overflow-hidden rounded-lg [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
                        // videoSource is CMS‑authored embed markup (e.g. a Vimeo <iframe>), not user input.
                        dangerouslySetInnerHTML={{ __html: actions!.videoSource! }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}