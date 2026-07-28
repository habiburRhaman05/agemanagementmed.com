import { Header } from '@/components/layout/Header'
import { HomeTemplate } from '@/components/templates/HomeTemplate'
import { homeContent } from '@/content/pages/home'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(homeContent.seo)

export default function HomePage() {
  return (
    <>
      <Header overlay />
      <HomeTemplate content={homeContent} />
    </>
  )
}
