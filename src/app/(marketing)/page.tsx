import { Header } from '@/components/layout/Header'
import { HomeTemplate } from '@/components/templates/HomeTemplate'
import { homeContent } from '@/content/pages/home'
import { buildMetadata, getPageH1 } from '@/lib/seo'

export const metadata = buildMetadata(homeContent.seo)

export default async function HomePage() {
  // PageSeo.h1 for '/' — the homepage never fetched PageSeo before, so an
  // admin setting an H1 override here had zero effect. Overriding at the
  // content-object level (rather than adding a new HomeTemplate prop) keeps
  // HomeTemplate/HeroImmersive untouched.
  const h1Override = await getPageH1('/')
  const content = h1Override
    ? { ...homeContent, hero: { ...homeContent.hero, title: h1Override } }
    : homeContent

  return (
    <>
      <Header overlay />
      <HomeTemplate content={content} />
    </>
  )
}
