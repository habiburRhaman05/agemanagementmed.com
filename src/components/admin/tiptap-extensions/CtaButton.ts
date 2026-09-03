import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { CtaButtonView } from './CtaButtonView'

/**
 * The "Insert CTA Button" toolbar button in `TipTapEditor` inserts one of
 * these at the cursor. It always renders as exactly
 * `<a class="btn btn-arrow-right" href="#popup-form" target="_blank"
 * rel="noopener noreferrer nofollow">{label}</a>` — the precise markup
 * `PopupFormBridge` (mounted sitewide, see src/app/(marketing)/layout.tsx)
 * already intercepts and turns into the real booking modal on click. There
 * is no live React component embedded in saved article HTML — this is that
 * same markup, inserted by hand instead of pasted from a WordPress export,
 * which is why it behaves identically once published.
 *
 * `parseHTML` deliberately matches that same selector, at a higher-than-
 * default priority, so posts whose content already has this pattern (every
 * blog post seeded from production does) load back into the editor with
 * their existing CTAs recognized as this node — editable/movable/
 * deletable as a single unit — rather than as plain underlined text. An
 * ordinary `<a>` without both the class and the exact href is left alone
 * and still parses as a normal link mark.
 */
export const CtaButton = Node.create({
  name: 'ctaButton',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      label: {
        default: 'Book Appointment',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a.btn-arrow-right[href="#popup-form"]',
        priority: 100,
        getAttrs: (element) => {
          const label = (element as HTMLElement).textContent?.trim()
          return { label: label || 'Book Appointment' }
        },
      },
    ]
  },

  renderHTML({ node }) {
    return [
      'a',
      mergeAttributes({
        class: 'btn btn-arrow-right',
        href: '#popup-form',
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      }),
      node.attrs.label,
    ]
  },

  // Editor-only visual — see CtaButtonView.tsx's comment. `renderHTML`
  // above (not this) is what determines the saved/published markup.
  addNodeView() {
    return ReactNodeViewRenderer(CtaButtonView)
  },

  addCommands() {
    return {
      insertCtaButton:
        (label: string) =>
        ({ chain }: { chain: () => import('@tiptap/core').ChainedCommands }) =>
          chain().insertContent({ type: this.name, attrs: { label } }).run(),
    } as Partial<import('@tiptap/core').RawCommands>
  },
})

// Registers the `insertCtaButton` command on TipTap's `Commands` type so
// `editor.chain().focus().insertCtaButton(...)` type-checks like any
// built-in command.
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ctaButton: {
      insertCtaButton: (label: string) => ReturnType
    }
  }
}
