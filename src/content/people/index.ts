import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { prisma } from '@/lib/prisma'
import type { Person } from '@/types/content'

/**
 * Providers and staff — now backed by Postgres (`Person` table) instead of a
 * static array. Every exported function keeps the shape callers already
 * expect (`Person[]` / `Person | undefined`), so `PeopleGrid`,
 * `TreatmentTemplate`, `HomeTemplate`, and `/our-experts` don't know or care
 * the data moved to a database. Mirrors the caching pattern in
 * `src/content/treatments/main.ts` — `cache()` de-dupes within a request,
 * `unstable_cache` persists across requests and is invalidated by the admin
 * API routes via `revalidateTag('people', ...)`.
 */

interface PersonRow {
  slug: string
  name: string
  credentials: string | null
  role: string
  portraitSrc: string
  portraitAlt: string
  summary: string
  bio: unknown
  specialties: unknown
}

function toPerson(row: PersonRow): Person {
  return {
    slug: row.slug,
    name: row.name,
    credentials: row.credentials ?? undefined,
    role: row.role,
    portrait: { src: row.portraitSrc, alt: row.portraitAlt },
    summary: row.summary,
    bio: (row.bio as string[] | null) ?? [],
    specialties: (row.specialties as string[] | null) ?? undefined,
  }
}

/** Every published team member, in admin-set order — the full /our-experts roster. */
export const getAllPeople = cache(async (): Promise<Person[]> => {
  return unstable_cache(
    async () => {
      const rows = await prisma.person.findMany({
        where: { status: 'published' },
        orderBy: { order: 'asc' },
      })
      return rows.map(toPerson)
    },
    ['all-people'],
    { tags: ['people'], revalidate: 3600 },
  )()
})

/** Admin-curated subset shown in the homepage team teaser (historically the first 4). */
export const getFeaturedPeople = cache(async (): Promise<Person[]> => {
  return unstable_cache(
    async () => {
      const rows = await prisma.person.findMany({
        where: { status: 'published', featured: true },
        orderBy: { order: 'asc' },
      })
      return rows.map(toPerson)
    },
    ['featured-people'],
    { tags: ['people'], revalidate: 3600 },
  )()
})

/** Single lookup by slug — used for individual profile links, if ever needed. */
export const getPersonBySlug = cache(async (slug: string): Promise<Person | undefined> => {
  return unstable_cache(
    async () => {
      const row = await prisma.person.findUnique({ where: { slug, status: 'published' } })
      return row ? toPerson(row) : undefined
    },
    ['person-by-slug', slug],
    { tags: ['people', `person:${slug}`], revalidate: 3600 },
  )()
})

/** Batched lookup, order-preserving — used for a treatment's `providers: string[]` slug list. */
export const getPeopleBySlugs = cache(async (slugs: string[]): Promise<Person[]> => {
  if (!slugs.length) return []
  return unstable_cache(
    async () => {
      const rows = await prisma.person.findMany({
        where: { slug: { in: slugs }, status: 'published' },
      })
      const bySlug = new Map(rows.map((row) => [row.slug, toPerson(row)]))
      return slugs.map((slug) => bySlug.get(slug)).filter((p): p is Person => Boolean(p))
    },
    ['people-by-slugs', slugs.join(',')],
    { tags: ['people'], revalidate: 3600 },
  )()
})
