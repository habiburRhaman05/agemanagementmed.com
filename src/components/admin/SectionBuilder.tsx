'use client'

import { Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

/* ── Types ─────────────────────────────────────────────────────────── */

interface VarEntry {
  key: string
  value: string
}

interface CardEntry {
  title: string
  description: string
  iconKind: string
  iconValue: string
}

interface SectionForm {
  type: string
  id: string
  heading: string
  designClassName: string
  designTitleClassName: string
  designCardClassName: string
  designContainerClassName: string
  vars: VarEntry[]
  cards: CardEntry[]
}

const SECTION_TYPES = [
  { value: 'feature-list', label: 'Feature List (3-col cards)' },
  { value: 'icon-card-list', label: 'Icon Card Grid (3-col with icons)' },
  { value: 'icon-feature-list', label: 'Icon Feature List (2-col ruled rows)' },
  { value: 'before-after-slider', label: 'Before / After Slider' },
  { value: 'reviewer-bio', label: 'Reviewer Bio' },
  { value: 'notice', label: 'Notice / Callout' },
]

const ICON_KINDS = [
  { value: 'lucide', label: 'Lucide Icon' },
  { value: 'emoji', label: 'Emoji' },
  { value: 'image', label: 'Image URL' },
  { value: 'inline-svg', label: 'Inline SVG' },
  { value: 'font-class', label: 'Font Class' },
]

const emptyCard = (): CardEntry => ({
  title: '',
  description: '',
  iconKind: 'lucide',
  iconValue: '',
})

const inputClass =
  'block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

/* ── Component ─────────────────────────────────────────────────────── */

export function SectionBuilder({ onInsert }: { onInsert: (json: string) => void }) {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState<SectionForm>({
    type: 'icon-card-list',
    id: '',
    heading: '',
    designClassName: '',
    designTitleClassName: '',
    designCardClassName: '',
    designContainerClassName: '',
    vars: [],
    cards: [emptyCard()],
  })

  const update = <K extends keyof SectionForm>(key: K, value: SectionForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const addCard = () => update('cards', [...form.cards, emptyCard()])
  const removeCard = (i: number) =>
    update('cards', form.cards.filter((_, idx) => idx !== i))
  const updateCard = (i: number, key: keyof CardEntry, value: string) =>
    update(
      'cards',
      form.cards.map((c, idx) => (idx === i ? { ...c, [key]: value } : c)),
    )

  const addVar = () => update('vars', [...form.vars, { key: '', value: '' }])
  const removeVar = (i: number) =>
    update('vars', form.vars.filter((_, idx) => idx !== i))
  const updateVar = (i: number, key: keyof VarEntry, value: string) =>
    update(
      'vars',
      form.vars.map((v, idx) => (idx === i ? { ...v, [key]: value } : v)),
    )

  const generateJson = (): string => {
    const section: Record<string, unknown> = {
      type: form.type,
    }
    if (form.id) section.id = form.id
    if (form.heading) section.heading = form.heading

    // Design override
    const design: Record<string, unknown> = {}
    if (form.designClassName) design.className = form.designClassName
    if (form.designTitleClassName) design.titleClassName = form.designTitleClassName
    if (form.designCardClassName) design.cardClassName = form.designCardClassName
    if (form.designContainerClassName) design.containerClassName = form.designContainerClassName
    if (form.vars.some((v) => v.key && v.value)) {
      const varsRecord: Record<string, string> = {}
      for (const v of form.vars) {
        if (v.key && v.value) varsRecord[v.key] = v.value
      }
      design.vars = varsRecord
    }
    if (Object.keys(design).length > 0) section.design = design

    // Cards with icons
    const validCards = form.cards.filter((c) => c.title)
    if (validCards.length > 0) {
      section.cards = validCards.map((c) => {
        const card: Record<string, unknown> = { title: c.title }
        if (c.description) card.description = c.description
        if (c.iconKind && c.iconValue) {
          card.icon = {
            kind: c.iconKind,
            value: c.iconValue,
            label: c.title,
          }
        }
        return card
      })
    }

    return JSON.stringify(section, null, 2)
  }

  const handleInsert = () => {
    // If there's already content in the JSON editor, append with comma
    onInsert(generateJson())
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateJson())
  }

  return (
    <div className="rounded-2xl border border-sage-200 bg-sage-50/50">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50/80"
      >
        <span className="flex items-center gap-2">
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          Section Builder — visual section JSON generator
        </span>
        <span className="text-xs text-sage-500">Click to {show ? 'collapse' : 'expand'}</span>
      </button>

      {show ? (
        <div className="space-y-4 border-t border-sage-200 px-4 pb-4 pt-4">
          {/* Section Type */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-gray-500">Section type</label>
              <select
                value={form.type}
                onChange={(e) => update('type', e.target.value)}
                className={inputClass}
              >
                {SECTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Section ID</label>
              <input
                value={form.id}
                onChange={(e) => update('id', e.target.value)}
                placeholder="e.g. benefits-section"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Heading</label>
              <input
                value={form.heading}
                onChange={(e) => update('heading', e.target.value)}
                placeholder="Section title"
                className={inputClass}
              />
            </div>
          </div>

          {/* Design Overrides */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Design Override (Tailwind classes)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-gray-400">Root className</label>
                <input
                  value={form.designClassName}
                  onChange={(e) => update('designClassName', e.target.value)}
                  placeholder="bg-ink-900 text-canvas-50"
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400">Title className</label>
                <input
                  value={form.designTitleClassName}
                  onChange={(e) => update('designTitleClassName', e.target.value)}
                  placeholder="text-gold-400"
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400">Card className</label>
                <input
                  value={form.designCardClassName}
                  onChange={(e) => update('designCardClassName', e.target.value)}
                  placeholder="border-2 border-gold"
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400">Container className</label>
                <input
                  value={form.designContainerClassName}
                  onChange={(e) => update('designContainerClassName', e.target.value)}
                  placeholder="max-w-5xl"
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
            </div>
          </div>

          {/* CSS Vars */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                CSS Custom Properties (vars)
              </label>
              <button
                type="button"
                onClick={addVar}
                className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-800"
              >
                <Plus className="size-3" /> Add var
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {form.vars.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={v.key}
                    onChange={(e) => updateVar(i, 'key', e.target.value)}
                    placeholder="--my-var"
                    className={`${inputClass} w-2/5 font-mono text-xs`}
                  />
                  <input
                    value={v.value}
                    onChange={(e) => updateVar(i, 'value', e.target.value)}
                    placeholder="value"
                    className={`${inputClass} w-3/5 font-mono text-xs`}
                  />
                  <button
                    type="button"
                    onClick={() => removeVar(i)}
                    className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cards / Items
              </label>
              <button
                type="button"
                onClick={addCard}
                className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-800"
              >
                <Plus className="size-3" /> Add card
              </button>
            </div>
            <div className="mt-2 space-y-3">
              {form.cards.map((card, i) => (
                <div key={i} className="rounded-lg border border-canvas-200 bg-white p-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-gray-400">Card {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeCard(i)}
                      className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <input
                      value={card.title}
                      onChange={(e) => updateCard(i, 'title', e.target.value)}
                      placeholder="Title *"
                      className={inputClass}
                    />
                    <input
                      value={card.description}
                      onChange={(e) => updateCard(i, 'description', e.target.value)}
                      placeholder="Description (optional)"
                      className={inputClass}
                    />
                    <select
                      value={card.iconKind}
                      onChange={(e) => updateCard(i, 'iconKind', e.target.value)}
                      className={inputClass}
                    >
                      {ICON_KINDS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                    <input
                      value={card.iconValue}
                      onChange={(e) => updateCard(i, 'iconValue', e.target.value)}
                      placeholder={
                        card.iconKind === 'lucide'
                          ? 'e.g. Sparkles, Zap, Heart'
                          : card.iconKind === 'emoji'
                            ? 'e.g. 🌿, ⚡'
                            : 'URL'
                      }
                      className={`${inputClass} font-mono text-xs`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview + Actions */}
          <div className="border-t border-sage-200 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Generated JSON
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-sage-700 hover:bg-sage-100"
                >
                  <Copy className="size-3" /> Copy
                </button>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="inline-flex items-center gap-1 rounded-lg bg-sage-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sage-700"
                >
                  Insert into editor
                </button>
              </div>
            </div>
            <pre className="overflow-auto rounded-lg border border-canvas-300 bg-ink-900 p-3 font-mono text-xs text-green-400 max-h-48">
              {generateJson()}
            </pre>
          </div>
        </div>
      ) : null}
    </div>
  )
}
