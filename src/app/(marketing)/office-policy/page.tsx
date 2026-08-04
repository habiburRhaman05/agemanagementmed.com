import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  Clock,
  Info,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'
import TextHero from '@/components/sections/TextHero'

export const metadata = buildMetadata({
  title: 'Office Policies | Savannah Age Management Medicine',
  description:
    "Review Savannah Age Management Medicine's office policies, including appointment cancellations, no-show guidelines, appointment reminders, and contact information.",
  canonical: '/office-policy',
})

export default function OfficePolicyPage() {
  return (
    <>
      {/* Header — clean, simple, matches contact info heading style */}
     <TextHero 
     
     title=' Office Policies'/>

      <Section spacing="lg" className="bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <Reveal>
              <div className="space-y-6 text-body-lg text-ink-700/80 leading-relaxed">
                <p>
                  Welcome to Savannah Age Management Medicine. To ensure we provide the best possible care and
                  a seamless experience for all our clients, we have established the following office policies.
                  We kindly ask that you take a moment to familiarize yourself with these guidelines concerning
                  your appointments and our services.
                </p>
                <p>
                  These policies are designed to help our practice run efficiently and to ensure we can provide
                  timely, high-quality care to all our patients. Thank you for your cooperation and for helping
                  us maintain a respectful and organized environment for everyone.
                </p>
              </div>
            </Reveal>

            <hr className="my-12 border-t border-[#0B2055]/10" />

            {/* Cancellation & Missed Appointment Policy */}
            <Reveal delay={50}>
              <h2 className="text-title-lg font-bold text-[#0B2055] mb-4">
                Cancellation &amp; Missed Appointment Policy
              </h2>
              <p className="text-body text-ink-700/80 leading-relaxed mb-4">
                Our goal is to provide quality health care to all our patients in a timely manner. We
                understand that sometimes, unexpected delays can occur, making schedule adjustments.
              </p>

              {/* Callout box — matches the "highlight" style from contact info */}
              <div className="mb-6 rounded-xl border border-[#587DBD]/30 bg-[#F7F8F2] px-6 py-4">
                <p className="text-body font-semibold text-[#0B2055]">
                  If you need to cancel your appointment, we respectfully request at least two business days&rsquo;
                  notice.
                </p>
              </div>

              <p className="text-body text-ink-700/80 leading-relaxed mb-4">
                This will allow another patient access to that appointment time.
              </p>
              <p className="text-body text-ink-700/80 leading-relaxed">
                When you book your appointment, you are holding a space on our calendar that is no longer
                available to our other patients. Please be aware of our policy regarding missed appointments.
                No-shows, late arrivals, and cancellations inconvenience not only our providers but our other
                patients as well.
              </p>
            </Reveal>

            <hr className="my-12 border-t border-[#0B2055]/10" />

            {/* How to Cancel Your Appointment */}
            <Reveal delay={100}>
              <h2 className="text-title-lg font-bold text-[#0B2055] mb-4">
                How to Cancel Your Appointment
              </h2>
              <p className="text-body text-ink-700/80 leading-relaxed mb-6">
                To cancel your appointment, please contact us between the hours of 9:30 a.m. and 5:00 p.m.
                EST, Monday to Friday.
              </p>

              {/* Contact cards — matches the contact info section style */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] p-5 transition-all hover:border-[#587DBD]/40 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-body-sm text-ink-500">Phone</p>
                      <a
                        href={site.phoneHref}
                        className="font-semibold text-[#0B2055] transition-colors hover:text-[#587DBD]"
                      >
                        {site.phone}
                      </a>
                      <p className="mt-1 text-body-sm text-ink-500">
                        If necessary, you may leave a detailed voicemail message.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] p-5 transition-all hover:border-[#587DBD]/40 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                      <MessageSquare className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-body-sm text-ink-500">Text</p>
                      <a
                        href={site.phoneHref}
                        className="font-semibold text-[#0B2055] transition-colors hover:text-[#587DBD]"
                      >
                        {site.phone}
                      </a>
                      <p className="mt-1 text-body-sm text-ink-500">
                        Reply to one of the automated appointment reminders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] p-5 transition-all hover:border-[#587DBD]/40 hover:shadow-sm sm:col-span-2 lg:col-span-1">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                      <Mail className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-body-sm text-ink-500">Email</p>
                      <a
                        href={site.emailHref}
                        className="font-semibold text-[#0B2055] transition-colors hover:text-[#587DBD] break-all"
                      >
                        {site.email}
                      </a>
                      <p className="mt-1 text-body-sm text-ink-500">
                        Include your full name and appointment details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note box — subtle like the contact info section */}
              <div className="flex items-start gap-3 rounded-xl border border-[#587DBD]/20 bg-[#F7F8F2] px-5 py-3">
                <Info className="mt-0.5 size-4 shrink-0 text-[#587DBD]" aria-hidden />
                <p className="text-body-sm text-ink-600">
                  <span className="font-medium">Note:</span> Cancellations submitted outside regular business
                  hours will be considered received at the beginning of the next business day.
                </p>
              </div>
            </Reveal>

            <hr className="my-12 border-t border-[#0B2055]/10" />

            {/* Appointment Reminders */}
            <Reveal delay={150}>
              <h2 className="text-title-lg font-bold text-[#0B2055] mb-4">
                Appointment Reminders
              </h2>
              <p className="text-body text-ink-700/80 leading-relaxed mb-6">
                To help you remember your scheduled appointment, we send reminders via text and email:
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] px-5 py-4">
                  <span className="rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                    <Calendar className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B2055]">Appointment Created</p>
                    <p className="text-body-sm text-ink-500">
                      Reminder sent when your appointment is first scheduled
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] px-5 py-4">
                  <span className="rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                    <CalendarCheck className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B2055]">3 Days Before</p>
                    <p className="text-body-sm text-ink-500">
                      Follow‑up reminder sent three days prior
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#0B2055]/10 bg-[#F7F8F2] px-5 py-4">
                  <span className="rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                    <Clock className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B2055]">1 Day Before</p>
                    <p className="text-body-sm text-ink-500">
                      Final reminder sent one day before your appointment
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <hr className="my-12 border-t border-[#0B2055]/10" />

            {/* Late Cancellations & No-Shows — FULLY PRESERVED */}
            <Reveal delay={200}>
              <h2 className="text-title-lg font-bold text-[#0B2055] mb-4">
                Late Cancellations &amp; No-Shows
              </h2>

              <div className="rounded-xl border border-rose-200/60 bg-rose-50/50 p-6 sm:p-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 rounded-full bg-rose-100 p-2 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0B2055]">Late Cancellation</p>
                      <p className="text-body-sm text-ink-600">
                        A cancellation is considered late when the appointment is canceled less than two
                        business days before the scheduled appointment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 rounded-full bg-rose-100 p-2 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0B2055]">No‑Show</p>
                      <p className="text-body-sm text-ink-600">
                        A No‑Show occurs when a patient misses an appointment without canceling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 rounded-full bg-rose-100 p-2 text-rose-700">
                      <AlertTriangle className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0B2055]">Prepayment Required</p>
                      <p className="text-body-sm text-ink-600">
                        Patients with two or more late cancellations or no‑shows within a 12‑month period
                        will be required to prepay for future appointments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-rose-200/40 pt-5">
                    <span className="mt-0.5 rounded-full bg-[#587DBD]/10 p-2 text-[#587DBD]">
                      <Info className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0B2055]">Emergencies</p>
                      <p className="text-body-sm text-ink-600">
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