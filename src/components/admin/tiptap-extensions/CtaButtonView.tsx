'use client'

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react'
import { ArrowRight } from 'lucide-react'

/**
 * How the CTA node looks *inside the editor only* — a recognizable chip so
 * it doesn't read as plain underlined text while writing. This has no
 * effect on the saved article: `CtaButton.ts`'s `renderHTML` (the plain
 * `<a class="btn btn-arrow-right" href="#popup-form">` markup) is what
 * actually gets persisted and published — this view exists purely for
 * editing.
 */
export function CtaButtonView({ node, updateAttributes, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper as="span" className="inline-block align-middle">
      <button
        type="button"
        contentEditable={false}
        onClick={() => {
          const label = window.prompt('Button text:', node.attrs.label)
          if (label) updateAttributes({ label })
        }}
        className={`inline-flex items-center gap-2 rounded-full bg-[#519B99] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#458785] ${
          selected ? 'ring-2 ring-sage-600 ring-offset-1' : ''
        }`}
        title="Click to rename — this becomes a real booking-form button once published"
      >
        {node.attrs.label}
        <ArrowRight className="size-3.5" aria-hidden />
      </button>
    </NodeViewWrapper>
  )
}
