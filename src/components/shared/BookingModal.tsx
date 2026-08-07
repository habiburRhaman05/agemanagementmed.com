'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

import { bookAppointment } from '@/actions/appointment';
import { features } from '@/content/feature';

const LOCATIONS = ['Pooler / Savannah', 'Statesboro'];
const SERVICES = features.map((feature) => feature.shortName);

/** Maps a `LocationSlug` (as used elsewhere in the app) to this modal's display label. */
const LOCATION_LABELS: Record<'savannah-pooler' | 'statesboro', string> = {
  'savannah-pooler': 'Pooler / Savannah',
  statesboro: 'Statesboro',
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Pre-selects the location dropdown — e.g. a special tied to one clinic. */
  defaultLocation?: 'savannah-pooler' | 'statesboro';
  /** Pre-selects the service dropdown and tags the request — e.g. a claimed wellness special. */
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
          <option value="" className="bg-navy text-white">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option} className="bg-navy text-white">
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

  useEffect(() => setMounted(true), []);

  // Lock the page behind the dialog and restore focus handling.
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

      // Keep focus inside the dialog.
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

  // Start clean each time the dialog is reopened.
  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
    }
  }, [open]);

  if (!open || !mounted) return null;

  // A caller-supplied service label (e.g. a wellness special's name) may not
  // be one of the standard treatment names — include it as its own option
  // rather than silently failing to preselect it.
  const serviceOptions =
    defaultService && !SERVICES.includes(defaultService) ? [defaultService, ...SERVICES] : SERVICES;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setSubmitting(true);

    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const phone = form.get('phone') as string;
    const location = form.get('location') as string;
    const service = form.get('service') as string;

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('service', service);
    data.append('message', `Location: ${location}`);

    const result = await bookAppointment(null, data);
    setSubmitting(false);

    if (result.success) {
      setSent(true);
    } else {
      setError(result.error);
    }
  };

  // Portalled to <body>: hero/reveal ancestors carry a CSS transform, which
  // would otherwise become the containing block for this fixed overlay.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-4 backdrop-blur-md sm:py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
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

        <h2 id="booking-title" className="display-3 !text-[20px] sm:!text-[26px] lg:!text-[30px] text-center text-white">
           {title || "Book Appointment" }
        </h2>

        {sent ? (
          <div className="mt-6 text-center">
            <p className="text-[16px] leading-[1.8] text-white">
              Thank you — your request has been received. Our team will contact you shortly to
              confirm your appointment.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#519B99] px-8 py-3 sm:py-4 font-sans text-[14px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-[#458785]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
           <div className="space-y-3 sm:space-y-4">
                <Field id="name" label="Name" autoComplete="name" />
                <Field id="email" label="E-mail Address" type="email" autoComplete="email" />
                <Field id="phone" label="Phone" type="tel" autoComplete="tel" />

                <SelectField
                  id="location"
                  label="Which location are you interested in?"
                  options={LOCATIONS}
                  defaultValue={defaultLocation ? LOCATION_LABELS[defaultLocation] : undefined}
                />

                <SelectField
                  id="service"
                  label="Service:"
                  placeholder="Choose A Service"
                  options={serviceOptions}
                  defaultValue={defaultService}
                />
              </div>

            {error && (
              <p role="alert" className="text-[13px] text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="!mt-3 sm:!mt-4 w-full rounded-full bg-[#519B99] px-8 py-2.5 sm:py-3.5 font-sans text-[13px] sm:text-[15px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-[#458785] disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        )}

        <hr className="mt-8 border-white/25" />

        <p className="mt-4 font-sans text-[10px] uppercase leading-[1.10] tracking-[0.01em] text-white/70">
          By completing and submitting this form, I hereby provide explicit written consent to
          receive communications through text messages and phone calls, including those to
          wireless numbers or numbers registered on an internal do not call registry. I
          acknowledge that these communications may be initiated through telephone calls,
          prerecorded voicemails, or postal mail, and may pertain to marketing services. I
          understand that such communications might involve automated software. Additionally, I
          affirm my understanding and acceptance of the privacy policy and terms and conditions. I
          am aware that I can opt out of these communications at any time by replying with
          &ldquo;stop&rdquo;. Standard message and data rates may apply.
        </p>
      </div>
    </div>,
    document.body,
  );
}
