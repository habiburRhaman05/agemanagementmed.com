import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { InlineLinks, stripInlineLinkSyntax } from '@/lib/inlineLinks'
import { buildFaqSchema } from '@/lib/seo'

describe('inline links', () => {
  it('renders allowlisted links and leaves surrounding punctuation and brackets intact', () => {
    const { container } = render(
      <p>
        <InlineLinks text="See (this [guide] [Andro](/blog/andropause-symptoms)) and [Pros](https://www.agemanagementmed.com/blog/bioidentical-hormones-pros-and-cons)." />
      </p>,
    )

    expect(screen.getByRole('link', { name: 'Andro' })).toHaveAttribute('href', '/blog/andropause-symptoms')
    expect(screen.getByRole('link', { name: 'Pros' })).toHaveAttribute(
      'href',
      'https://www.agemanagementmed.com/blog/bioidentical-hormones-pros-and-cons',
    )
    expect(container.textContent).toBe('See (this [guide] Andro) and Pros.')
  })

  it('keeps strings without links unchanged', () => {
    const text = 'No linked copy here (with brackets [and parentheses]).'
    const { container } = render(<InlineLinks text={text} />)
    expect(container.textContent).toBe(text)
    expect(container.querySelector('a')).toBeNull()
    expect(stripInlineLinkSyntax(text)).toBe(text)
  })

  it('renders multiple safe links and strips them to plain schema text', () => {
    const answer = 'See [andropause](/blog/andropause-symptoms) and [HRT pros](https://www.agemanagementmed.com/blog/bioidentical-hormones-pros-and-cons).'
    const { container } = render(<InlineLinks text={answer} />)

    expect(container.querySelectorAll('a')).toHaveLength(2)
    expect(stripInlineLinkSyntax(answer)).toBe('See andropause and HRT pros.')
    expect(buildFaqSchema([{ question: 'Question?', answer }])?.mainEntity[0]?.acceptedAnswer.text).toBe(
      'See andropause and HRT pros.',
    )
  })

  it('leaves malicious link syntax as plain text and out of link attributes', () => {
    const malicious = 'Read [unsafe](javascript:alert(1)) now.'
    const { container } = render(<InlineLinks text={malicious} />)

    expect(container.textContent).toBe(malicious)
    expect(container.querySelector('a')).toBeNull()
    expect(stripInlineLinkSyntax(malicious)).toBe(malicious)
  })

  it('renders FAQ answer links with plain JSON-LD answers', () => {
    const { container } = render(
      <FAQAccordion
        title="FAQs"
        items={[{ question: 'Question?', answer: 'Read [andropause](/blog/andropause-symptoms).' }]}
      />,
    )

    expect(container.querySelector('a')).toHaveAttribute('href', '/blog/andropause-symptoms')
    expect(buildFaqSchema([{ question: 'Question?', answer: 'Read [andropause](/blog/andropause-symptoms).' }])
      ?.mainEntity[0]?.acceptedAnswer.text).toBe('Read andropause.')
  })
})
