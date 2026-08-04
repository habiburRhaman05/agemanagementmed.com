import { ContactForm } from '@/components/shared/ContactFrom'
import { contactMedia } from '@/content/pages/contact-media'
import type { Location } from '@/types/content'

interface ContactMapFormProps {
  /** Map is centered on the first location (matches the live site's single embedded map). */
  location: Location
}

/**
 * Live-site "Get In Touch With Us!" band — a full-width Google Map with a
 * dark, rounded form card pulled up over its bottom edge. Ported 1:1 from
 * the legacy `#contact-d .map` + `.box` markup (see download/_contact-us_.html).
 */
export function ContactMapForm({ location }: ContactMapFormProps) {
  return (
    <section className="relative bg-[#F7F8F2] mb-16">
      <div className="h-[350px] w-full sm:h-[420px] lg:h-[500px]">
        <iframe
          src={location.mapEmbedUrl}
          title={`Map of ${location.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative -mt-16 rounded-[24px] bg-cover bg-center px-6 py-14 sm:-mt-20 sm:rounded-[40px] sm:px-12 sm:py-16 lg:-mt-[86px] lg:rounded-[50px] lg:px-[110px] lg:py-[100px]"
          style={{ backgroundImage: `url('${contactMedia.formBackground}')`, backgroundColor: '#14214B' }}
        >
          <div className="absolute inset-0 rounded-[24px] bg-[#14214B]/80 sm:rounded-[40px] lg:rounded-[50px]" />

          <div className="relative mx-auto max-w-[700px]">
            <h2 className="text-center font-display text-[32px] font-medium leading-[1.1] text-white sm:text-[40px] lg:text-[48px]">
              Get In Touch With Us!
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-center text-body text-white/85">
              We&apos;re here to answer your questions, address your concerns, and help you take
              the first step toward better health and wellness. Reach out to us today!
            </p>

            <div className="mt-10">
              <ContactForm variant="dark" submitLabel="Submit" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
