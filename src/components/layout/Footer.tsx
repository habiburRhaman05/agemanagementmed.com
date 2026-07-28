import { FooterClient } from '@/components/layout/FooterClient'
import { getSiteSettings } from '@/lib/settings'

/** Server wrapper — resolves the admin-editable logo/social links before handing off to the client footer. */
export async function Footer() {
  const settings = await getSiteSettings()
  console.log(settings);
  
  return <FooterClient logoUrl={settings.logoDarkUrl} socialLinks={settings.socialLinks} />
}
