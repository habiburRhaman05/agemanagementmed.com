
'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

import { bookAppointment } from '@/actions/appointment';

const LOCATIONS = ['Pooler / Savannah', 'Statesboro'];

/**
 * HighLevel webhook
 */
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/TCgWNSOqArBjmBL22qrU/webhook-trigger/92b8b77f-2205-41e5-b434-459a7829b9d0';

/**
 * Website information
 */
const WEBSITE_NAME = 'Age Management';
const WEBSITE_DOMAIN = 'agemanagementmed.com';

/** Maps a LocationSlug to this modal's display label. */
const LOCATION_LABELS: Record<'savannah-pooler' | 'statesboro', string> = {
  'savannah-pooler': 'Pooler / Savannah',
  statesboro: 'Statesboro',
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;

  /** Pre-selects the location dropdown. */
  defaultLocation?: 'savannah-pooler' | 'statesboro';

  /** Pre-selects the service and tags the request. */
  defaultService?: string;
};

function Field({
  id,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        required
        className="w-full rounded-lg border border-white/45 bg-transparent px-3 py-2 sm:px-4 sm:py-3 font-sans text-[13px] sm:text-[16px] text-white outline-none transition placeholder:text-white/90 focus:border-white focus:bg-white/10"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder,
  defaultValue,
}: {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative rounded-lg border border-white/45 pb-1 pl-3 pr-4 pt-1 transition focus-within:border-white sm:pb-2 sm:pl-4 sm:pt-1.5">
      <label
        htmlFor={id}
        className="block font-sans text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.03em] text-white"
      >
        {label}
      </label>

      <select
        id={id}
        name={id}
        required
        defaultValue={defaultValue ?? (placeholder ? '' : options[0])}
        className="w-full appearance-none bg-transparent pr-6 font-sans text-[13px] sm:text-[16px] text-white outline-none"
      >
        {placeholder && (
          <option value="" className="bg-navy text-black">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-navy text-black"
          >
            {option}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 sm:bottom-2.5 right-3 sm:right-4 border-x-[5px] border-t-[6px] border-x-transparent border-t-white"
      />
    </div>
  );
}

/**
 * Get visitor public IP.
 *
 * This is best-effort. If the IP lookup fails, the form still submits.
 */
async function getVisitorIp(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return 'Unavailable';
    }

    const data = (await response.json()) as {
      ip?: string;
    };

    return data.ip || 'Unavailable';
  } catch {
    return 'Unavailable';
  }
}

/**
 * Send lead information to HighLevel.
 */
async function sendToHighLevel({
  name,
  email,
  phone,
  location,
  service,
  pageUrl,
  referrer,
  ipAddress,
}: {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  pageUrl: string;
  referrer: string;
  ipAddress: string;
}) {
  const payload = {
    name,
    email,
    phone,

    location,
    service,

    website: WEBSITE_NAME,
    website_domain: WEBSITE_DOMAIN,

    source: 'Website Booking Modal',
    source_type: 'booking_modal',
    form_name: 'Book Appointment',
    form_source: WEBSITE_DOMAIN,

    page_url: pageUrl,
    landing_page_url: pageUrl,
    referrer_url: referrer,

    ip_address: ipAddress,

    user_agent:
      typeof navigator !== 'undefined'
        ? navigator.userAgent
        : '',

    language:
      typeof navigator !== 'undefined'
        ? navigator.language
        : '',

    screen_width:
      typeof window !== 'undefined'
        ? window.screen.width
        : '',

    screen_height:
      typeof window !== 'undefined'
        ? window.screen.height
        : '',

    submitted_at: new Date().toISOString(),
  };

  try {
    /**
     * HighLevel webhook expects a POST request.
     */
    await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('HighLevel webhook error:', error);
    return false;
  }
}

export default function BookingModal({
  open,
  onClose,
  title,
  defaultLocation,
  defaultService,
}: BookingModalProps) {
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Lock the page behind the dialog and restore focus handling.
   */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href]',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  /**
   * Start clean every time the dialog is reopened.
   */
  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
    }
  }, [open]);

  if (!open || !mounted) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    setError(null);
    setSubmitting(true);

    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const phone = String(form.get('phone') || '');
    const location = String(form.get('location') || '');

    const service =
      defaultService?.trim() || 'General Consultation';

    /**
     * Current page where the modal was submitted.
     */
    const pageUrl =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://${WEBSITE_DOMAIN}`;

    /**
     * Previous page/referrer.
     */
    const referrer =
      typeof document !== 'undefined'
        ? document.referrer || 'Direct'
        : 'Direct';

    /**
     * Visitor IP.
     */
    const ipAddress = await getVisitorIp();

    /**
     * Existing appointment submission.
     *
     * This is kept exactly as part of the existing flow.
     */
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('service', service);

    data.append('message', `Location: ${location}`);

    const result = await bookAppointment(null, data);

    /**
     * Send lead to HighLevel.
     */
    const ghlResult = await sendToHighLevel({
      name,
      email,
      phone,
      location,
      service,
      pageUrl,
      referrer,
      ipAddress,
    });

    setSubmitting(false);

    /**
     * Existing appointment result controls the UI.
     *
     * If HighLevel fails, the existing appointment submission
     * is not considered failed.
     */
    if (result.success) {
      setSent(true);

      if (!ghlResult) {
        console.warn(
          'Appointment submitted successfully, but the HighLevel webhook request failed.',
        );
      }
    } else {
      setError(result.error);
    }
  };

  /**
   * Portalled to <body>: hero/reveal ancestors carry a CSS transform,
   * which would otherwise become the containing block for this fixed overlay.
   */
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 px-4 pb-4 pt-24 backdrop-blur-md sm:items-center sm:py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative w-full max-w-[600px] rounded-2xl bg-[#14214B] px-4 pb-4 pt-6 shadow-menu sm:px-10 sm:pb-8 sm:pt-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          className="absolute right-3 top-3 sm:right-5 sm:top-5 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40"
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="booking-title"
          className="display-3 !text-[20px] text-center text-white sm:!text-[26px] lg:!text-[30px]"
        >
          {title || 'Book Appointment'}
        </h2>

        {sent ? (
          <div className="mt-6 text-center">
            <p className="text-[16px] leading-[1.8] text-white">
              Thank you — your request has been received. Our team will contact
              you shortly to confirm your appointment.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#519B99] px-8 py-3 font-sans text-[14px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-[#458785] sm:py-4"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-2 space-y-1 sm:mt-4 sm:space-y-2"
          >
            <div className="space-y-3 sm:space-y-4">
              <Field
                id="name"
                label="Name"
                autoComplete="name"
              />

              <Field
                id="email"
                label="E-mail Address"
                type="email"
                autoComplete="email"
              />

              <Field
                id="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
              />

              <SelectField
                id="location"
                label="Which location are you interested in?"
                options={LOCATIONS}
                defaultValue={
                  defaultLocation
                    ? LOCATION_LABELS[defaultLocation]
                    : undefined
                }
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-[13px] text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="!mt-3 w-full rounded-full bg-[#519B99] px-8 py-2.5 font-sans text-[13px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-[#458785] disabled:opacity-60 sm:!mt-4 sm:py-3.5 sm:text-[15px]"
            >
              {submitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        )}

        <hr className="mt-8 border-white/25" />

        <p className="mt-4 font-sans text-[10px] uppercase leading-[1.10] tracking-[0.01em] text-white/70">
          By completing and submitting this form, I hereby provide explicit
          written consent to receive communications through text messages and
          phone calls, including those to wireless numbers or numbers
          registered on an internal do not call registry. I acknowledge that
          these communications may be initiated through telephone calls,
          prerecorded voicemails, or postal mail, and may pertain to marketing
          services. I understand that such communications might involve
          automated software. Additionally, I affirm my understanding and
          acceptance of the privacy policy and terms and conditions. I am aware
          that I can opt out of these communications at any time by replying
          with &ldquo;stop&rdquo;. Standard message and data rates may apply.
        </p>
      </div>
    </div>,
    document.body,
  );
}

