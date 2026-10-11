import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * "Social links" is structured state edited via `SocialLinksEditor`'s "Add
 * link" dialog (a predefined platform dropdown + URL field), not a textarea
 * — covered here are adding, removing, and the custom "Other" platform path.
 * "Guest editorials" is still a plain textarea whose free text is parsed
 * into `externalArticles` on submit (same convention as `bio`/`specialties`),
 * so it keeps its parser edge-case coverage: blank lines, rows missing half
 * their data, optional fields left off.
 *
 * The form is exercised through the real react-hook-form + zod pipeline and
 * the mocked server action, so this also proves the submitted shape actually
 * reaches the action payload.
 */
const { createPersonMock, updatePersonMock, pushMock, refreshMock, toastMock } = vi.hoisted(() => ({
  createPersonMock: vi.fn(),
  updatePersonMock: vi.fn(),
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  toastMock: { success: vi.fn(), error: vi.fn() },
}))

vi.mock('@/actions/people', () => ({
  createPerson: createPersonMock,
  updatePerson: updatePersonMock,
}))
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}))
vi.mock('sonner', () => ({ toast: toastMock }))
vi.mock('@/components/admin/ImageUploader', () => ({
  ImageUploader: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: test double for the uploader
    <input aria-label="Photo" value={value} onChange={(event) => onChange(event.target.value)} />
  ),
}))

import { PersonForm } from '@/components/admin/PersonForm'

const PERSON = {
  id: 'person_1',
  slug: 'jane-doe',
  name: 'Jane Doe',
  credentials: 'MD',
  role: 'Medical Director',
  portraitSrc: 'https://res.cloudinary.com/demo/jane.jpg',
  portraitAlt: 'Jane Doe',
  summary: 'Hormone specialist.',
  bio: ['First paragraph.', 'Second paragraph.'],
  specialties: ['Hormones'],
  socialLinks: [{ platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' }],
  externalArticles: [
    { title: 'Feature', url: 'https://magazine.example/x', publication: 'Savannah Magazine' },
  ],
  featured: false,
  status: 'published',
  order: 0,
}

type Rendered = ReturnType<typeof render>

function textarea(container: HTMLElement, name: string): HTMLTextAreaElement {
  const el = container.querySelector(`textarea[name="${name}"]`)
  if (!el) throw new Error(`No textarea named ${name}`)
  return el as HTMLTextAreaElement
}

async function submit(rendered: Rendered) {
  // Scope to this render so a test that submits twice still targets the
  // right form (rather than matching both in document.body).
  const button = rendered.container.querySelector('button[type="submit"]') as HTMLButtonElement
  const callsBefore = updatePersonMock.mock.calls.length
  fireEvent.click(button)
  await waitFor(() => expect(updatePersonMock.mock.calls.length).toBe(callsBefore + 1))
  const fd = updatePersonMock.mock.calls[callsBefore][2] as FormData
  return JSON.parse(fd.get('data') as string) as Record<string, unknown>
}

beforeEach(() => {
  vi.clearAllMocks()
  updatePersonMock.mockResolvedValue({ success: true, data: { id: 'person_1' } })
  createPersonMock.mockResolvedValue({ success: true, data: { id: 'person_new' } })
})

afterEach(() => {
  cleanup()
})

describe('PersonForm — defaults round-trip', () => {
  it('renders the stored social link in the list, and guest editorials into the textarea', () => {
    const { container } = render(<PersonForm mode="edit" person={PERSON} />)

    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('https://www.linkedin.com/in/jane-doe')).toBeInTheDocument()
    expect(textarea(container, 'externalArticles').value).toBe(
      'Feature | https://magazine.example/x | Savannah Magazine',
    )
  })

  it('submits the unchanged fields back as the same structured arrays', async () => {
    const rendered = render(<PersonForm mode="edit" person={PERSON} />)

    const payload = await submit(rendered)

    expect(payload.socialLinks).toEqual([
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' },
    ])
    expect(payload.externalArticles).toEqual([
      { title: 'Feature', url: 'https://magazine.example/x', publication: 'Savannah Magazine' },
    ])
  })

  it('shows no guest editorial textarea value when the article has no publication', () => {
    const { container } = render(
      <PersonForm
        mode="edit"
        person={{
          ...PERSON,
          externalArticles: [{ title: 'Bare', url: 'https://example.com/bare' }],
        }}
      />,
    )

    expect(textarea(container, 'externalArticles').value).toBe('Bare | https://example.com/bare')
  })

  it('shows the empty-state message and an empty guest-editorials textarea when the person has neither', () => {
    const { container } = render(
      <PersonForm mode="edit" person={{ ...PERSON, socialLinks: null, externalArticles: null }} />,
    )

    expect(screen.getByText('No social links added yet.')).toBeInTheDocument()
    expect(textarea(container, 'externalArticles').value).toBe('')
  })
})

describe('PersonForm — social links dialog', () => {
  it('adds a link via the dialog and includes it alongside the existing one on submit', async () => {
    const rendered = render(<PersonForm mode="edit" person={PERSON} />)

    fireEvent.click(screen.getByRole('button', { name: /add link/i }))
    fireEvent.change(screen.getByLabelText('Platform'), { target: { value: 'Instagram' } })
    fireEvent.change(screen.getByLabelText('Link'), { target: { value: 'https://instagram.com/jane' } })
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }))

    // Dialog closes and the new link shows up in the list immediately.
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('https://instagram.com/jane')).toBeInTheDocument()

    const payload = await submit(rendered)
    expect(payload.socialLinks).toEqual([
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' },
      { platform: 'Instagram', url: 'https://instagram.com/jane' },
    ])
  })

  it('supports a custom platform via "Other"', async () => {
    const rendered = render(<PersonForm mode="edit" person={{ ...PERSON, socialLinks: [] }} />)

    fireEvent.click(screen.getByRole('button', { name: /add link/i }))
    fireEvent.change(screen.getByLabelText('Platform'), { target: { value: 'Other' } })
    fireEvent.change(screen.getByLabelText('Platform name'), { target: { value: 'Vagaro' } })
    fireEvent.change(screen.getByLabelText('Link'), { target: { value: 'https://vagaro.com/jane' } })
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }))

    const payload = await submit(rendered)
    expect(payload.socialLinks).toEqual([{ platform: 'Vagaro', url: 'https://vagaro.com/jane' }])
  })

  it('removes an existing link via its remove button', async () => {
    const rendered = render(<PersonForm mode="edit" person={PERSON} />)

    fireEvent.click(screen.getByRole('button', { name: /remove linkedin link/i }))
    expect(screen.getByText('No social links added yet.')).toBeInTheDocument()

    const payload = await submit(rendered)
    expect(payload.socialLinks).toEqual([])
  })

  it('disables the dialog\'s Add button until a URL is entered', () => {
    render(<PersonForm mode="edit" person={{ ...PERSON, socialLinks: [] }} />)

    fireEvent.click(screen.getByRole('button', { name: /add link/i }))
    expect(screen.getByRole('button', { name: /^add$/i })).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Link'), { target: { value: 'https://example.com' } })
    expect(screen.getByRole('button', { name: /^add$/i })).not.toBeDisabled()
  })
})

describe('PersonForm — guest editorials parsing', () => {
  async function submitArticles(value: string) {
    const rendered = render(<PersonForm mode="edit" person={PERSON} />)
    fireEvent.change(textarea(rendered.container, 'externalArticles'), { target: { value } })
    const payload = await submit(rendered)
    return payload.externalArticles
  }

  it('parses "Title | URL" with no publication', async () => {
    expect(await submitArticles('Title | https://example.com/a')).toEqual([
      { title: 'Title', url: 'https://example.com/a', publication: undefined },
    ])
  })

  it('parses "Title | URL | Publication"', async () => {
    expect(await submitArticles('Feature | https://example.com/a | Savannah Magazine')).toEqual([
      { title: 'Feature', url: 'https://example.com/a', publication: 'Savannah Magazine' },
    ])
  })

  it('treats an empty publication cell as undefined', async () => {
    const articles = (await submitArticles('Feature | https://example.com/a |   ')) as Array<{
      publication?: string
    }>
    expect(articles[0]?.publication).toBeUndefined()
  })

  it('ignores anything beyond the third column', async () => {
    expect(await submitArticles('Feature | https://example.com/a | Mag | junk')).toEqual([
      { title: 'Feature', url: 'https://example.com/a', publication: 'Mag' },
    ])
  })

  it('drops a line missing the URL', async () => {
    expect(await submitArticles('Just a title')).toEqual([])
  })

  it('drops a line with an empty title', async () => {
    expect(await submitArticles(' | https://example.com/a')).toEqual([])
  })

  it('parses multiple lines and drops blank ones', async () => {
    expect(
      await submitArticles('One | https://example.com/1\n\nTwo | https://example.com/2 | Mag'),
    ).toEqual([
      { title: 'One', url: 'https://example.com/1', publication: undefined },
      { title: 'Two', url: 'https://example.com/2', publication: 'Mag' },
    ])
  })

  it('treats an empty textarea as no guest editorials', async () => {
    expect(await submitArticles('')).toEqual([])
  })
})

describe('PersonForm — validation and submit behaviour', () => {
  it('blocks submission and warns when a required field is cleared', async () => {
    const { container } = render(<PersonForm mode="edit" person={PERSON} />)
    fireEvent.change(textarea(container, 'bio'), { target: { value: '' } })

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(toastMock.error).toHaveBeenCalled())
    expect(updatePersonMock).not.toHaveBeenCalled()
  })

  it('surfaces the server error instead of navigating away', async () => {
    updatePersonMock.mockResolvedValue({ success: false, error: 'Slug already exists' })
    render(<PersonForm mode="edit" person={PERSON} />)

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith('Slug already exists'))
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('navigates back to the list on success', async () => {
    render(<PersonForm mode="edit" person={PERSON} />)

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/admin/people'))
    expect(toastMock.success).toHaveBeenCalled()
  })
})
