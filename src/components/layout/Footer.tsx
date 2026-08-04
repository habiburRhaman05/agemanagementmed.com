import { FooterClient } from '@/components/layout/FooterClient'
import { site } from '@/content/site'
import { getSiteSettings } from '@/lib/settings'

/**
 * Server wrapper — resolves the admin-editable logo/social links/contact info
 * before handing off to the client footer. Falls back to the static `site`
 * content only when a DB field is unset, so an empty SiteSettings row never
 * breaks the footer.
 */
export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <FooterClient
      logoUrl={settings.logoUrl}
      socialLinks={settings.socialLinks}
      siteName={settings.siteName}
      phone={settings.phone ?? site.phone}
      email={settings.email ?? site.email}
    />
  )
}
