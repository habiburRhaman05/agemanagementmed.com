import { HeaderClient } from '@/components/layout/HeaderClient'
import { site } from '@/content/site'
import { getSiteSettings } from '@/lib/settings'

interface HeaderProps {
  /** Home sits over a dark immersive hero, so the bar starts transparent. */
  overlay?: boolean
}

/**
 * Server wrapper — resolves the admin-editable logo/phone/site name before
 * handing off to the interactive client header. Every existing `<Header />`
 * call site is untouched: same import, same props, same JSX. Falls back to
 * the static `site` content only when a DB field is unset, so an empty
 * SiteSettings row never breaks the header.
 */
export async function Header(props: HeaderProps) {
  const settings = await getSiteSettings()
  return (
    <HeaderClient
      {...props}
      logoUrl={settings.logoUrl}
      siteName={settings.siteName}
      phone={settings.phone ?? site.phone}
    />
  )
}
