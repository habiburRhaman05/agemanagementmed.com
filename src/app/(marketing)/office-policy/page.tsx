import { AlertTriangle, Calendar, CalendarCheck, Clock, Info, Mail, MessageSquare, Phone } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { JsonLd } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Office Policies | Savannah Age Management Medicine',
  description:
    "Review Savannah Age Management Medicine's office policies, including appointment cancellations, no-show guidelines, appointment reminders, and contact information.",
  canonical: '/office-policy',
})

export default function OfficePolicyPage() {
  return (
    <>
      <Header />
      <HeroCompact
      align="center"
        eyebrow="Policies"
        title="Office Policies"
        
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Office Policy', href: '/office-policy' }]}
      />

      <Section spacing="lg">
        <Container>
          <div className="container">
            {/* Introduction */}
            <Reveal>
              <h2 className="text-display-sm font-bold text-ink-900 mb-8">
                Savannah Age Management Medicine Office Policies
              </h2>
              <p className="text-body-lg text-canvas-600 leading-relaxed">
                Welcome to Savannah Age Management Medicine. To ensure we provide the best possible care and
                a seamless experience for all our clients, we have established the following office policies.
                We kindly ask that you take a moment to familiarize yourself with these guidelines concerning
                your appointments and our services.
              </p>
              <p className="text-body-lg text-canvas-600 leading-relaxed mt-6">
                These policies are designed to help our practice run efficiently and to ensure we can provide
                timely, high-quality care to all our patients. Thank you for your cooperation and for helping
                us maintain a respectful and organized environment for everyone.
              </p>
            </Reveal>

            <div className="my-16 border-t border-canvas-300/60" />

            {/* Cancellation & Missed Appointment Policy */}
            <Reveal delay={50}>
              <h3 className="text-title-lg font-bold text-ink-900 mb-4">
                Cancellation & Missed Appointment Policy
              </h3>
              <p className="text-body text-canvas-600 leading-relaxed mb-4">
                Our goal is to provide quality health care to all our patients in a timely manner. We
                understand that sometimes, unexpected delays can occur, making schedule adjustments.
              </p>
              <div className="mb-6 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-5">
                <p className="text-body font-semibold text-sage-700">
                  If you need to cancel your appointment, we respectfully request at least two business days&rsquo;
                  notice.
                </p>
              </div>
              <p className="text-body text-canvas-600 leading-relaxed mb-4">
                This will allow another patient access to that appointment time.
              </p>
              <p className="text-body text-canvas-600 leading-relaxed">
                When you book your appointment, you are holding a space on our calendar that is no longer
                available to our other patients. Please be aware of our policy regarding missed appointments.
                No-shows, late arrivals, and cancellations inconvenience not only our providers but our other
                patients as well.
              </p>
            </Reveal>

            <div className="my-16 border-t border-canvas-300/60" />

            {/* How to Cancel Your Appointment */}
            <Reveal delay={100}>
              <h3 className="text-title-lg font-bold text-ink-900 mb-4">
                How to Cancel Your Appointment
              </h3>
              <p className="text-body text-canvas-600 leading-relaxed mb-8">
                To cancel your appointment, please contact us between the hours of 9:30 a.m. and 5:00 p.m.
                EST, Monday to Friday.
              </p>

              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href={site.phoneHref}
                  className="group flex flex-col gap-3 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-colors hover:border-sage-600/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block text-body-sm text-canvas-600">Phone</span>
                    <span className="block font-semibold text-ink-900 group-hover:text-sage-700">
                      {site.phone}
                    </span>
                  </div>
                  <p className="text-body-sm text-canvas-600">
                    If necessary, you may leave a detailed voicemail message.
                  </p>
                </a>

                <a
                  href={site.phoneHref}
                  className="group flex flex-col gap-3 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-colors hover:border-sage-600/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <MessageSquare className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block text-body-sm text-canvas-600">Text</span>
                    <span className="block font-semibold text-ink-900 group-hover:text-sage-700">
                      {site.phone}
                    </span>
                  </div>
                  <p className="text-body-sm text-canvas-600">
                    Reply to one of the automated appointment reminders or send us a text message.
                  </p>
                </a>

                <a
                  href={site.emailHref}
                  className="group flex flex-col gap-3 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-colors hover:border-sage-600/40 sm:col-span-2 lg:col-span-1"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block text-body-sm text-canvas-600">Email</span>
                    <span className="block font-semibold text-ink-900 group-hover:text-sage-700 break-all">
                      {site.email}
                    </span>
                  </div>
                  <p className="text-body-sm text-canvas-600">
                    Include your full name and the appointment details you wish to cancel.
                  </p>
                </a>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-4">
                <Info className="mt-0.5 size-4 shrink-0 text-sage-700" aria-hidden />
                <p className="text-body-sm text-canvas-600">
                  Cancellations submitted outside regular business hours will be considered received at the
                  beginning of the next business day.
                </p>
              </div>
            </Reveal>

            <div className="my-16 border-t border-canvas-300/60" />

            {/* Appointment Reminders */}
            <Reveal delay={150}>
              <h3 className="text-title-lg font-bold text-ink-900 mb-4">
                Appointment Reminders
              </h3>
              <p className="text-body text-canvas-600 leading-relaxed mb-8">
                To help you remember your scheduled appointment, we send reminders via text and email:
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Calendar className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block font-semibold text-ink-900">Appointment Created</span>
                    <span className="block text-body-sm text-canvas-600">
                      Reminder sent when your appointment is first scheduled
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <CalendarCheck className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block font-semibold text-ink-900">3 Days Before</span>
                    <span className="block text-body-sm text-canvas-600">
                      Follow-up reminder sent three days prior
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Clock className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="block font-semibold text-ink-900">1 Day Before</span>
                    <span className="block text-body-sm text-canvas-600">
                      Final reminder sent one day before your appointment
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="my-16 border-t border-canvas-300/60" />

            {/* Late Cancellations & No-Shows */}
            <Reveal delay={200}>
              <h3 className="text-title-lg font-bold text-ink-900 mb-4">
                Late Cancellations & No-Shows
              </h3>

              <div className="rounded-2xl border border-rose-300/60 bg-rose-100 p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <span className="block font-semibold text-ink-900">Late Cancellation</span>
                      <p className="mt-1 text-body-sm text-canvas-600">
                        A cancellation is considered late when the appointment is canceled less than two
                        business days before the scheduled appointment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <span className="block font-semibold text-ink-900">No-Show</span>
                      <p className="mt-1 text-body-sm text-canvas-600">
                        A No-Show occurs when a patient misses an appointment without canceling.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <span className="block font-semibold text-ink-900">Prepayment Required</span>
                      <p className="mt-1 text-body-sm text-canvas-600">
                        Patients with two or more late cancellations or no-shows within a 12-month period
                        will be required to prepay for future appointments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Info className="size-4" aria-hidden />
                    </span>
                    <div>
                      <span className="block font-semibold text-ink-900">Emergencies</span>
                      <p className="mt-1 text-body-sm text-canvas-600">
                        We understand emergencies happen, and exceptions may be made at the discretion of
                        clinic management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Office Policies',
          description:
            "Review Savannah Age Management Medicine's office policies, including appointment cancellations, no-show guidelines, appointment reminders, and contact information.",
          publisher: { '@type': 'MedicalBusiness', name: site.name },
        }}
      />
    </>
  )
}
