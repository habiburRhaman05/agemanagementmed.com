import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * The "Social links" and "Guest editorials" fields are plain textareas whose
 * free text is parsed into the structured `socialLinks` / `externalArticles`
 * JSON on submit (same convention as `bio` and `specialties`). That parser is
 * the only place a typo can silently produce broken data, so it gets the
 * edge-case coverage here: colons inside URLs, blank/whitespace lines, rows
 * missing half of their data, and optional fields left off.
 *
 * The form is exercised through the real react-hook-form + zod pipeline and
 * the mocked server action, so this also proves the parsed shape actually
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
  it('renders stored social links and guest editorials into the textareas', () => {
    const { container } = render(<PersonForm mode="edit" person={PERSON} />)

    expect(textarea(container, 'socialLinks').value).toBe(
      'LinkedIn: https://www.linkedin.com/in/jane-doe',
    )
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

  it('renders empty textareas when the person has no social links or articles', () => {
    const { container } = render(
      <PersonForm mode="edit" person={{ ...PERSON, socialLinks: null, externalArticles: null }} />,
    )

    expect(textarea(container, 'socialLinks').value).toBe('')
    expect(textarea(container, 'externalArticles').value).toBe('')
  })
})

describe('PersonForm — social links parsing', () => {
  async function submitSocialLinks(value: string) {
    const rendered = render(<PersonForm mode="edit" person={PERSON} />)
    fireEvent.change(textarea(rendered.container, 'socialLinks'), { target: { value } })
    const payload = await submit(rendered)
    return payload.socialLinks
  }

  it('parses multiple lines, trims whitespace and drops blank lines', async () => {
    const links = await submitSocialLinks(
      '  LinkedIn:  https://a.example  \n\n   \nInstagram: https://b.example\n',
    )

    expect(links).toEqual([
      { platform: 'LinkedIn', url: 'https://a.example' },
      { platform: 'Instagram', url: 'https://b.example' },
    ])
  })

  it('keeps colons that are part of the URL (scheme, port, query)', async () => {
    const links = await submitSocialLinks('Website: https://example.com:8443/path?q=1&x=2')

    expect(links).toEqual([{ platform: 'Website', url: 'https://example.com:8443/path?q=1&x=2' }])
  })

  it('drops a line with no colon at all', async () => {
    expect(await submitSocialLinks('JustSomeText')).toEqual([])
  })

  it('drops a line whose URL is empty', async () => {
    expect(await submitSocialLinks('LinkedIn:')).toEqual([])
  })

  it('drops a line whose platform is empty', async () => {
    expect(await submitSocialLinks(': https://example.com')).toEqual([])
  })

  it('keeps the valid rows when one row is malformed', async () => {
    const links = await submitSocialLinks('BadLine\nLinkedIn: https://good.example')

    expect(links).toEqual([{ platform: 'LinkedIn', url: 'https://good.example' }])
  })

  it('treats an empty textarea as no social links', async () => {
    expect(await submitSocialLinks('')).toEqual([])
    expect(await submitSocialLinks('   \n  ')).toEqual([])
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
