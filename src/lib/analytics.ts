import { locations } from '@/content/site'

/**
 * Identifies which form produced a lead. Sent as GA4 `event_label`/`form_id` and
 * as the Meta Pixel's `content_name`, so reports can be broken down per form
 * instead of collapsing every conversion into one number.
 */
export type LeadFormId =
  | 'booking-form'
  | 'booking-modal'
  | 'contact-form'
  | 'get-connected-form'
  | 'lead-form'

export interface LeadEventOptions {
  form: LeadFormId
  /** Clinic slug (`savannah-pooler` / `statesboro`), or any raw label. */
  location?: string
  /** Service or treatment the lead is for, when the form knows it. */
  service?: string
  /** Defaults to an appointment booking; the quick-inquiry form is a contact request. */
  leadType?: 'appointment_request' | 'contact_request'
}

/** Turns a location slug into the name guests actually see, e.g. "Savannah / Pooler". */
function locationName(location?: string): string | undefined {
  if (!location) return undefined
  return locations.find((entry) => entry.slug === location)?.name ?? location
}

/**
 * Reports a submitted lead to GA4 (`generate_lead`) and the Meta Pixel (`Lead`).
 *
 * Call this **only after the server action reports success**. These forms talk
 * to a server action, not to GA4 directly, so the success result is the only
 * point at which a "lead" is actually true — reporting on submit counted
 * submissions that failed to save.
 *
 * Safe to call from any client component: it no-ops during SSR, tolerates a
 * missing tag (ad blockers are the common cause, and expected), and never
 * throws into the caller's success path.
 *
 * Note that a `gtag` call made before gtag.js has downloaded is buffered by
 * GA4's own `dataLayer` queue, provided the tag's inline snippet has run —
 * which it has, since it lives in the root layout.
 */
/**
 * Runs a reporting call in isolation: one vendor failing (or being blocked by
 * an extension in a way that throws) must not stop the other from reporting,
 * and must never propagate into the caller's already-successful submit path.
 */
function safely(vendor: string, report: () => void): void {
  try {
    report()
  } catch (error) {
    console.warn(`[analytics] Failed to report lead to ${vendor}:`, error)
  }
}

export function trackLead({
  form,
  location,
  service,
  leadType = 'appointment_request',
}: LeadEventOptions): void {
  if (typeof window === 'undefined') return

  const resolvedLocation = locationName(location)

  safely('GA4', () => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'generate_lead', {
      event_category: 'lead_acquisition',
      event_label: form,
      form_id: form,
      value: 1,
      currency: 'USD',
      lead_type: leadType,
      ...(resolvedLocation ? { location: resolvedLocation } : {}),
      ...(service ? { service } : {}),
    })
  })

  safely('Meta Pixel', () => {
    if (typeof window.fbq !== 'function') return

    window.fbq('track', 'Lead', {
      content_name: form,
      content_category: leadType,
      value: 1,
      currency: 'USD',
    })
  })
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}
