import { cleanup, render, screen } from '@testing-library/react'
import Link from 'next/link'
import { afterEach, describe, expect, it } from 'vitest'

import { FullBleedIconListSection } from '@/components/sections/custom/compontents-custom/rejuvenation/FullBleedIconListSection'
import { SymptomsAndHowItWorks } from '@/components/sections/custom/compontents-custom/hormoneTherapy/SymptomsAndHowItWorks'
import { PhotoContentPanel } from '@/components/sections/custom/compontents-custom/hormoneTherapy/PhotoContentPanel'
import { SafetyAndCandidacy } from '@/components/sections/custom/compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { ThreeTherapiesCard } from '@/components/sections/custom/compontents-custom/hormoneTherapy/ThreeTherapiesCard'
import { SymptomsOutcomesGrid } from '@/components/sections/custom/compontents-custom/shared/SymptomsOutcomesGrid'
import { TreatmentOptionsStack } from '@/components/sections/custom/compontents-custom/sexualWellnes/TreatmentOptionsStack'

afterEach(cleanup)

function expectPlainInternalLink(label: string, href: string) {
  const link = screen.getByRole('link', { name: label })
  expect(link).toHaveAttribute('href', href)
  expect(link).not.toHaveAttribute('target')
  expect(link).not.toHaveAttribute('rel', expect.stringContaining('nofollow'))
}

describe('crosslink text renderers', () => {
  it('renders the male treatment option description as a linked anchor', () => {
    render(
      <TreatmentOptionsStack
        title="Treatment Options"
        treatments={[
          {
            image: '/test.jpg',
            title: 'BHRT',
            description: 'This is [male menopause](/blog/andropause-symptoms), also called andropause.',
            label: 'May help',
            bullets: [],
          },
        ]}
      />,
    )

    expectPlainInternalLink('male menopause', '/blog/andropause-symptoms')
  })

  it('renders closing paragraphs, therapy paragraphs, and symptom lead/item links', () => {
    const { rerender } = render(
      <FullBleedIconListSection
        image={{ src: '/test.jpg', alt: 'Test' }}
        heading="Sexual Wellness for Men"
        items={[]}
        closingParagraphs={[
          'If you wondered, “[can men go through menopause](/blog/andropause-symptoms)?”',
        ]}
      />,
    )
    expectPlainInternalLink('can men go through menopause', '/blog/andropause-symptoms')

    rerender(
      <ThreeTherapiesCard
        title="Therapies"
        rows={[
          {
            image: { src: '/test.jpg', alt: 'Test' },
            heading: 'Hormone Replacement Therapy (HRT)',
            paragraph: 'Compare [bioidentical hormones vs hormone replacement](/blog/bioidentical-hormones-pros-and-cons).',
          },
          {
            image: { src: '/test.jpg', alt: 'Test' },
            heading: 'Testosterone Replacement Therapy (TRT)',
            paragraph: 'Called “[manopause](/blog/andropause-symptoms)” and asks “[does menopause affect libido](/blog/menopause-and-libido)?”',
          },
        ]}
      />,
    )
    expectPlainInternalLink('bioidentical hormones vs hormone replacement', '/blog/bioidentical-hormones-pros-and-cons')
    expectPlainInternalLink('manopause', '/blog/andropause-symptoms')
    expectPlainInternalLink('does menopause affect libido', '/blog/menopause-and-libido')

    rerender(
      <SymptomsOutcomesGrid
        title="Symptoms"
        lead="Common with low [menopause libido](/blog/menopause-and-libido)."
        items={[{ icon: '<svg></svg>', title: 'Low libido', description: 'Learn about [menopause and sex drive](/blog/menopause-and-libido).' }]}
      />,
    )
    expectPlainInternalLink('menopause libido', '/blog/menopause-and-libido')
    expectPlainInternalLink('menopause and sex drive', '/blog/menopause-and-libido')
    expect(screen.getByText('Symptoms')).toBeInTheDocument()

    rerender(
      <PhotoContentPanel
        image={{ src: '/test.jpg', alt: 'Test' }}
        heading="Safety"
        paragraphs={[
          <>
            Patients ask about safety. Read about common{' '}
            <Link href="/blog/bioidentical-hormones-pros-and-cons">side effects of bioidentical hormones</Link>.
          </>,
        ]}
      />,
    )
    expectPlainInternalLink('side effects of bioidentical hormones', '/blog/bioidentical-hormones-pros-and-cons')

    rerender(
      <SafetyAndCandidacy
        image={{ src: '/test.jpg', alt: 'Test' }}
        heading="Safety"
        paragraphs={[]}
        closingParagraph="Read the [pros and cons of bioidentical hormone replacement](/blog/bioidentical-hormones-pros-and-cons)."
      />,
    )
    expectPlainInternalLink('pros and cons of bioidentical hormone replacement', '/blog/bioidentical-hormones-pros-and-cons')
  })

  it('adds the women’s symptom sentence only when the women’s layout supplies it', () => {
    const extra = (
      <>
        Both estrogen and testosterone influence{' '}
        <Link href="/blog/menopause-and-libido">menopause and sexual desire</Link>, which is why low libido is often part of a broader hormone evaluation.
      </>
    )
    const { rerender } = render(<SymptomsAndHowItWorks introExtra={extra} />)
    expectPlainInternalLink('menopause and sexual desire', '/blog/menopause-and-libido')

    rerender(<SymptomsAndHowItWorks />)
    expect(screen.queryByRole('link', { name: 'menopause and sexual desire' })).toBeNull()
  })
})
