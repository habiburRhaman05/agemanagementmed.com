import { afterEach, describe, expect, it, vi } from 'vitest'

import { trackLead } from '@/lib/analytics'

/**
 * `trackLead` is called from the success branch of six different forms, so the
 * contract worth testing is: report to both vendors, don't report a lead that
 * isn't one, normalise the location, and never break the caller.
 */

afterEach(() => {
  // The tag globals are real properties on `window` in jsdom, so each test
  // must clear them rather than assume a fresh environment.
  delete (window as unknown as { gtag?: unknown }).gtag
  delete (window as unknown as { fbq?: unknown }).fbq
  vi.restoreAllMocks()
})

/** Installs fake tag globals and returns them for assertions. */
function installTags() {
  const gtag = vi.fn()
  const fbq = vi.fn()
  window.gtag = gtag
  window.fbq = fbq
  return { gtag, fbq }
}

describe('trackLead', () => {
  it('sends generate_lead to GA4 and Lead to the Meta Pixel', () => {
    const { gtag, fbq } = installTags()

    trackLead({
      form: 'booking-form',
      location: 'savannah-pooler',
      service: 'Consultation at Savannah/Pooler',
    })

    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'generate_lead',
      expect.objectContaining({
        event_category: 'lead_acquisition',
        event_label: 'booking-form',
        form_id: 'booking-form',
        lead_type: 'appointment_request',
        service: 'Consultation at Savannah/Pooler',
        value: 1,
        currency: 'USD',
      }),
    )

    expect(fbq).toHaveBeenCalledTimes(1)
    expect(fbq).toHaveBeenCalledWith(
      'track',
      'Lead',
      expect.objectContaining({
        content_name: 'booking-form',
        content_category: 'appointment_request',
        currency: 'USD',
      }),
    )
  })

  it('normalises a location slug to the name guests see', () => {
    const { gtag } = installTags()

    trackLead({ form: 'booking-form', location: 'savannah-pooler' })

    expect(gtag.mock.calls[0][2]).toMatchObject({ location: 'Savannah / Pooler' })
  })

  it('passes through a location label that is already human-readable', () => {
    const { gtag } = installTags()

    // BookingModal's select submits display labels, not slugs.
    trackLead({ form: 'booking-modal', location: 'Pooler / Savannah' })

    expect(gtag.mock.calls[0][2]).toMatchObject({ location: 'Pooler / Savannah' })
  })

  it('omits location and service when the form has neither', () => {
    const { gtag } = installTags()

    trackLead({ form: 'lead-form', leadType: 'contact_request' })

    const payload = gtag.mock.calls[0][2] as Record<string, unknown>
    expect(payload).not.toHaveProperty('location')
    expect(payload).not.toHaveProperty('service')
    expect(payload.lead_type).toBe('contact_request')
  })

  it('labels the quick-inquiry form as a contact request in both vendors', () => {
    const { gtag, fbq } = installTags()

    trackLead({ form: 'lead-form', leadType: 'contact_request' })

    expect(gtag.mock.calls[0][2]).toMatchObject({ lead_type: 'contact_request' })
    expect(fbq.mock.calls[0][2]).toMatchObject({ content_category: 'contact_request' })
  })

  it('stays silent when the tags were blocked or never loaded', () => {
    expect(() => trackLead({ form: 'booking-form' })).not.toThrow()
  })

  it('does not let a broken GA4 call suppress the Meta Pixel', () => {
    const fbq = vi.fn()
    window.gtag = () => {
      throw new Error('gtag exploded')
    }
    window.fbq = fbq
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    trackLead({ form: 'booking-form' })

    expect(fbq).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalled()
  })

  it('never throws out of the caller success path when both vendors fail', () => {
    window.gtag = () => {
      throw new Error('gtag exploded')
    }
    window.fbq = () => {
      throw new Error('fbq exploded')
    }
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => trackLead({ form: 'booking-form' })).not.toThrow()
  })
})
