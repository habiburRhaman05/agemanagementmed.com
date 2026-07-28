import { Info } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'

interface NoticeProps {
  text: string
}

/** A quiet inline callout for billing/insurance notes and disclaimers — not a full Section band. */
export function Notice({ text }: NoticeProps) {
  if (!text) return null

  return (
    <div className="bg-canvas-100 py-6">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-sage-200 bg-sage-50 px-6 py-4 text-body-sm text-canvas-600">
            <Info className="mt-0.5 size-4 shrink-0 text-sage-700" aria-hidden />
            <p>{text}</p>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
