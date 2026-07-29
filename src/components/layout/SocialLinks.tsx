import type { SiteSettingsData } from '@/lib/settings'

/**
 * lucide-react dropped brand/logo icons in this version, so these are small
 * inline outline marks instead of a new icon-library dependency.
 */
const ICON_PATHS: Record<string, string> = {
  facebook:
    'M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10.5H7.5v3H9.8V21H13.5Z',
  instagram:
    'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.7a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm4.5-8.6a4 4 0 0 1 4 4v6.8a4 4 0 0 1-4 4H7.5a4 4 0 0 1-4-4V9.6a4 4 0 0 1 4-4h9Zm0 1.3H7.5a2.7 2.7 0 0 0-2.7 2.7v6.8a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7V9.6a2.7 2.7 0 0 0-2.7-2.7Zm1-.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z',
  youtube:
    'M21.6 7.9a2.9 2.9 0 0 0-2-2C17.9 5.4 12 5.4 12 5.4s-5.9 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.1 2.9 2.9 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.1ZM10 15V9l5.2 3-5.2 3Z',
  linkedin:
    'M6.9 8.4H4V19h2.9V8.4ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 12.7c0-3-1.6-4.4-3.8-4.4a3.3 3.3 0 0 0-3 1.6V8.4H10.3V19h2.9v-5.9c0-1.6.3-3.1 2.2-3.1s1.7 1.7 1.7 3.2V19H20v-6.3Z',
  tiktok:
    'M16.6 4h-2.9v11.2a2.6 2.6 0 1 1-1.8-2.5v-3a5.6 5.6 0 1 0 4.7 5.5V9.8a7.4 7.4 0 0 0 4.4 1.5V8.4a4.5 4.5 0 0 1-4.4-4.4Z',
}

// Always shown in the footer, connected or not — a muted/disabled icon signals
// "not connected yet" rather than the platform not existing. YouTube and
// TikTok stay opt-in (rendered only when a URL is set) since the requirement
// only called out these three for the always-visible treatment.
const ALWAYS_VISIBLE: (keyof typeof ICON_PATHS)[] = ['facebook', 'instagram', 'linkedin']

interface SocialLinksProps {
  links: SiteSettingsData['socialLinks']
  className?: string
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  const allKeys = Object.keys(ICON_PATHS) as (keyof typeof ICON_PATHS)[]
  const entries = allKeys
    .map((key) => ({ key, href: links[key as keyof SiteSettingsData['socialLinks']] || null }))
    .filter((entry) => ALWAYS_VISIBLE.includes(entry.key) || Boolean(entry.href))

  if (!entries.length) return null

  return (
    <div className={className}>
      {entries.map(({ key, href }) =>
        href ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={key}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100/15 text-sage-400 transition-colors duration-200 hover:bg-sage-200/30"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d={ICON_PATHS[key]} />
            </svg>
          </a>
        ) : (
          <span
            key={key}
            aria-disabled="true"
            aria-label={`${key} (not connected)`}
            className="flex size-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-sage-100/5 text-sage-400/30"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d={ICON_PATHS[key]} />
            </svg>
          </span>
        ),
      )}
    </div>
  )
}
