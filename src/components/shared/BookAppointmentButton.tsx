'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import BookingModal from './BookingModal';

type Variant = 'navy' | 'white' | 'teal';

const variants: Record<Variant, string> = {
  // Brand teal — the one background color every AppointmentButton variant uses.
  navy: 'bg-[#519B99] text-white hover:opacity-90',
  white: 'bg-[#519B99] text-white hover:opacity-90',
  teal: 'bg-[#519B99] text-white hover:opacity-90',
};

type BookAppointmentButtonProps = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Title shown at the top of the booking modal. */
  modalTitle?: string;
  /** Pre-selects the modal's location dropdown — e.g. a special tied to one clinic. */
  defaultLocation?: 'savannah-pooler' | 'statesboro';
  /** Pre-selects the modal's service dropdown — e.g. a claimed wellness special. */
  defaultService?: string;
};

/** "Book Appointment" CTA that opens the shared booking modal instead of navigating. */
export default function BookAppointmentButton({
  children = 'Book Appointment',
  variant = 'navy',
  className = '',
  modalTitle,
  defaultLocation,
  defaultService,
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group inline-flex items-center justify-center gap-3 rounded-full px-8 py-[15px] font-bold font-sans text-[14px] uppercase tracking-[0.15em] transition-colors duration-300',
          variants[variant],
          className,
        )}
      >
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        defaultLocation={defaultLocation}
        defaultService={defaultService}
      />
    </>
  );
}
