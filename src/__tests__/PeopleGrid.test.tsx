import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Person } from '@/types/content'

/**
 * The roster grid now links a provider's portrait and name through to their
 * `/our-experts/[slug]` page. These tests pin that both entry points work and
 * that the grid still degrades to nothing when there are no providers.
 */
vi.mock('@/components/shared/BookAppointmentButton', () => ({ default: () => null }))

import { PeopleGrid } from '@/components/sections/PeopleGrid'

const PERSON: Person = {
  id: 'person_1',
  slug: 'jane-doe',
  name: 'Jane Doe',
  credentials: 'MD',
  role: 'Medical Director',
  portrait: { src: 'https://res.cloudinary.com/demo/jane.jpg', alt: 'Jane Doe' },
  summary: 'Hormone specialist.',
  bio: ['First paragraph.'],
}

afterEach(() => {
  cleanup()
})

describe('PeopleGrid provider links', () => {
  it('links both the portrait and the name to the provider page', () => {
    const { container } = render(<PeopleGrid people={[PERSON]} />)

    const links = container.querySelectorAll('a[href="/our-experts/jane-doe"]')

    expect(links).toHaveLength(2)
  })

  it('renders the provider name with credentials in the name link', () => {
    render(<PeopleGrid people={[PERSON]} />)

    expect(screen.getByText('Jane Doe, MD')).toHaveAttribute(
      'href',
      '/our-experts/jane-doe',
    )
  })

  it('renders the name without credentials when none are set', () => {
    render(<PeopleGrid people={[{ ...PERSON, credentials: undefined }]} />)

    expect(screen.getByText('Jane Doe')).toHaveAttribute('href', '/our-experts/jane-doe')
  })

  it('still renders the provider role and bio', () => {
    const { container } = render(<PeopleGrid people={[PERSON]} />)

    expect(container.textContent).toContain('Medical Director')
    expect(container.textContent).toContain('First paragraph.')
  })

  it('links each provider independently', () => {
    const { container } = render(
      <PeopleGrid
        people={[PERSON, { ...PERSON, id: 'person_2', slug: 'richard-roe', name: 'Richard Roe' }]}
      />,
    )

    expect(container.querySelectorAll('a[href="/our-experts/jane-doe"]')).toHaveLength(2)
    expect(container.querySelectorAll('a[href="/our-experts/richard-roe"]')).toHaveLength(2)
  })

  it('renders nothing when there are no people', () => {
    const { container } = render(<PeopleGrid people={[]} />)

    expect(container).toBeEmptyDOMElement()
  })
})
