/**
 * Client-safe contact-formatting helpers. Deliberately kept out of
 * `lib/settings.ts` — that module imports `@/lib/prisma`, and a client
 * component importing anything from it (even a pure string helper) drags the
 * whole module into the browser bundle, which then fails trying to resolve
 * Node-only built-ins (`dns`, `net`, `tls`) required by the `pg` driver.
 */

/** Builds a `tel:` href from a display phone number, keeping only digits and a leading `+`. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function toMailtoHref(email: string): string {
  return `mailto:${email}`
}
