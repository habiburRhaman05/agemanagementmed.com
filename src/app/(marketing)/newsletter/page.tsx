import Image from 'next/image'

import { Header } from '@/components/layout/Header'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { getSiteSettings } from '@/lib/settings'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: "Join Our Newsletter | Savannah Age Management Medicine",
  description:
    "Join Savannah's Wellness Insiders for educational updates, event invitations, treatment specials, and new offerings from Savannah Age Management Medicine.",
  canonical: '/newsletter',
})

export default async function NewsletterPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <Header overlay />

      <Section background="page" spacing="none" className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/samm-newsletter-hero/1600/1200"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/85" aria-hidden />
        </div>

        <Container className="relative py-32 lg:py-40">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-ink-950/60 p-6 shadow-2xl backdrop-blur-sm sm:p-10 lg:p-12">
              <div className="text-center">
                <h1 className="font-display text-display-md text-white">
                  Join Savannah&apos;s
                  <br />
                  Wellness Insiders
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-body leading-relaxed text-canvas-50/70">
                  Join our community of health-forward individuals. Enter your email below to
                  receive educational updates and information on events, treatment specials, new
                  offerings in our clinic, and more.
                </p>
              </div>

              <div className="mt-8">
                <NewsletterForm />
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
                <p className="font-display text-title-md text-white">Follow Us On Social:</p>
                <SocialLinks links={settings.socialLinks} className="flex gap-3" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
