'use client';

import { useState } from 'react';


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
  /** Fired when the button is clicked, before the modal opens — e.g. to close an enclosing drawer. */
  onOpen?: () => void;
};

/** "Book Appointment" CTA that opens the shared booking modal instead of navigating. */
export default function BookAppointmentButton({
  children = 'Book Appointment',
  variant = 'navy',
  className = '',
  modalTitle,
  defaultLocation,
  defaultService,
  onOpen,
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className={cn(
          'group inline-flex items-center cursor-pointer justify-center gap-3 rounded-full px-[32px] py-[16px] font-bold font-sans text-[14px] uppercase tracking-[0.15em] transition-colors duration-300',
          variants[variant],
          className,
        )}
      >
        {children}
     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
<path d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z" fill="white"/>
</svg>
      </button>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        title={"Schedule A Consultation"}
        defaultLocation={defaultLocation}
        defaultService={defaultService}
      />
    </>
  );
}
