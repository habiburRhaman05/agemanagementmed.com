import { HeaderClient } from '@/components/layout/HeaderClient'
import { getSiteSettings } from '@/lib/settings'

interface HeaderProps {
  /** Home sits over a dark immersive hero, so the bar starts transparent. */
  overlay?: boolean
}

/**
 * Server wrapper — resolves the admin-editable logo before handing off to the
 * interactive client header. Every existing `<Header />` call site is
 * untouched: same import, same props, same JSX.
 */
export async function Header(props: HeaderProps) {
  const settings = await getSiteSettings()
  return <HeaderClient {...props} logoUrl={settings.logoUrl} />
}
