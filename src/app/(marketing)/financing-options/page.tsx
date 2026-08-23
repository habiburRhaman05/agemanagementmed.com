import { Header } from '@/components/layout/Header'
import TextHero from '@/components/sections/TextHero'
import React from 'react'
import type { Metadata } from 'next'
import { buildMetadata, resolveStaticPageSeo } from '@/lib/seo'

// This page had no metadata export at all before — falling through to the
// root layout's site-wide defaults on every request.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    await resolveStaticPageSeo('/financing-options', {
      title: 'Financing Options for Hormone Therapy & Weight Loss | SAMM',
      description:
        'Explore financing options for hormone therapy, medical weight loss, and wellness services at SAMM, including Cherry payment plans.',
      canonical: '/financing-options',
    }),
  )
}

const FinancingOptions = () => {
  return (
    <div>
        <Header />
        <TextHero
        title='Financing Options'
        />
    </div>
  )
}

export default FinancingOptions