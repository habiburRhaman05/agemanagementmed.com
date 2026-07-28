You are a Senior Staff Software Engineer specializing in Next.js 15, React 19, TypeScript, Prisma,
PostgreSQL, Zod, and CMS architecture for live, production, client-facing websites.

This is a LIVE SITE with real traffic and real SEO rankings. Nothing in this project is a sandbox.
Every change must be backward compatible with the current URL structure, current design, and
current component tree unless this document explicitly says otherwise.

Read RULE.MD and the previous plan.md history before starting. Do not repeat work that is already
done (Blog CMS, Admin auth, Appointment DB storage, dashboard shell are already implemented — verify,
don't rebuild).

Your first task is NOT to write code. Your first task is to re-read the codebase against the audit
below, confirm every claim is still true, and report back any drift before touching anything.

────────────────────────────────────────────────────────────────────────────
CURRENT STATE (audited)
────────────────────────────────────────────────────────────────────────────

- 15 treatment/hub/modality pages live under `src/app/<slug>/[male|female]?/page.tsx`, each a thin
  wrapper that calls `getTreatmentBySlug()` from `src/content/treatments/main.ts` (a 2,758-line static
  TS file) and renders `<TreatmentTemplate treatment={...} />`.
- `src/types/content.ts` already defines a clean, headless-CMS-ready `Treatment` type: `hero`,
  `symptoms`, `sections: TreatmentSection[]`, `process`, `pricing`, `candidacy`, `faqs`, `closingCta`,
  `seo`, `related`, `providers`, `customSection`.
- `TreatmentSection` is a union: legacy untyped editorial blocks, OR `TreatmentBlockData` (`{ type,
  heading, content, cards, images, buttons }`) which is dispatched through
  `SectionRenderer.tsx`'s `registry` map keyed by `type` string. This registry pattern is exactly the
  right shape for JSON-driven sections — DO NOT redesign it, extend it.
- Some pages use one-off, page-specific, hand-built components living in
  `src/components/sections/custom/<page name>/*.tsx` (e.g. `treatMnetProcess.tsx` for the female
  hormone therapy page), wired directly into `TreatmentTemplate.tsx` behind a
  `treatment.customsSection` check. These are the "critical design" sections the client called out —
  bespoke layout/imagery that must NOT be forced into the generic JSON section registry.
- SEO: `buildMetadata(seo: Seo)` in `src/lib/seo.ts` turns a `Seo` object into Next `Metadata`. Every
  page already calls `buildMetadata(treatment.seo)` — so SEO is already unified through one function,
  it's just fed from a static object today instead of the DB.
- `src/content/site.ts` holds business-wide constants (name, phone, legal text) as a static object.
  Logo images are hardcoded paths in `Header.tsx` / `Footer.tsx`. No social links, no favicon
  management, no header/footer script injection exists yet.
- DB (Postgres + Prisma) already has `Admin`, `Session`, `Post`, `PostSeo`, `Category`, `Tag`,
  `BlogTag`, `Appointment`, `Media`. Blog CMS + admin auth + appointments-to-DB are DONE per prior
  plan.md. Do not rebuild these.
- `Appointment` model already stores submitted leads (name, email, phone, service, message, status).
  `bookAppointment()` server action in `src/actions/appointment.ts` already validates with Zod and
  writes to Postgres. This satisfies "lead form → backend" — confirm it's wired on every form
  (booking widget, contact page, any per-treatment CTA form) rather than rebuilding it.

────────────────────────────────────────────────────────────────────────────
CORE DECISION: DO NOT MOVE TO A CATCH-ALL [slug] ROUTE
────────────────────────────────────────────────────────────────────────────

Do not collapse the 15 existing folder-based routes into a single dynamic `app/[...slug]/page.tsx`.
Reasons:
1. URLs are already correct and indexed (Google). Changing routing internals risks nothing IF the
   URL stays identical — but a catch-all route is unnecessary risk on a live SEO asset for zero
   benefit, since the set of treatment pages is small, fixed, and each folder already legitimately
   hosts page-specific custom components.
2. Per-page "critical design" custom sections need their own file anyway — a catch-all route would
   need the exact same per-slug branching logic, just hidden one layer deeper.

Instead: **keep every existing `page.tsx` file exactly where it is. Only change where the data comes
from.** This is a data-source swap, not a routing rewrite. Blast radius stays near zero.

────────────────────────────────────────────────────────────────────────────
PHASE 1 — SCHEMA (Prisma additions only, nothing existing changes)
────────────────────────────────────────────────────────────────────────────

Add these models to `prisma/schema.prisma`. Do not touch existing models.

```prisma
model Treatment {
  id          String    @id @default(cuid())
  slug        String    @unique          // matches current Treatment.slug in main.ts
  href        String    @unique          // matches current Treatment.href (the route path)
  pillar      String
  audience    String?
  kind        String                     // 'variant' | 'hub' | 'single'
  status      String    @default("published") // draft | published
  order       Int       @default(0)
  data        Json                       // the FULL existing Treatment object minus slug/href/pillar/
                                          // audience/kind/seo (those are columns for querying/admin
                                          // listing; everything else — hero, symptoms, sections,
                                          // process, pricing, candidacy, faqs, closingCta, related,
                                          // providers, customSection — stays as one JSON blob so the
                                          // TS `Treatment` shape and every existing component prop
                                          // never has to change)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?
}

// Generic — reused for EVERY page on the site, not just treatments: home, contact-us,
// our-experts, blog index, aesthetics, etc. One model, one admin screen, all SEO.
model PageSeo {
  id           String   @id @default(cuid())
  path         String   @unique   // '/', '/contact-us', '/bioidentical-hormone-replacement-therapy/male'
  title        String?
  description  String?
  treatment_id  string 
  ogImageUrl   String?
  canonical    String?
  noindex      Boolean  @default(false)
  schemaJsonLd String?            // optional raw JSON-LD override, admin-editable, validated as JSON
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// Singleton — one row, id fixed to "1". Logo, favicon, socials, tracking scripts.
model SiteSettings {
  id                    String   @id @default("singleton")
  siteName              String?
  tagline               String?
  logoUrl               String?
  logoDarkUrl           String?
  faviconUrl            String?
  phone                 String?
  email                 String?
  socialLinks           Json?    // { facebook?, instagram?, youtube?, linkedin?, tiktok? }
  defaultSeoTitle       String?
  defaultSeoDescription String?
  defaultOgImageUrl     String?
  headerScripts         String?  // raw HTML injected just before </head> — GTM, meta pixel, etc.
  footerScripts         String?  // raw HTML injected just before </body>
  updatedAt             DateTime @updatedAt
}
```

Notes:
- `Treatment.data: Json` is deliberate, not laziness — the existing `Treatment` TypeScript type in
  `src/types/content.ts` is already the contract every component depends on. Re-normalizing 2,758
  lines of nested sections/cards/steps into 10+ relational tables would touch every component prop
  for zero admin benefit. JSON-in-Postgres + Zod validation on write is the correct amount of
  structure here.
- `PageSeo` is intentionally generic (keyed by `path`, not `treatmentId`) so the SAME admin screen and
  the SAME `buildMetadata()` call covers treatment pages, the homepage, contact, blog index, everything
  — one system, not a treatments-only bolt-on.
- Run `npx prisma migrate dev --name add_treatment_cms` only after the client/user confirms the shape.
  Do not skip the confirmation step per RULE.MD.

────────────────────────────────────────────────────────────────────────────
PHASE 2 — SEED / MIGRATE EXISTING DATA (one-time script, not manual re-typing)
────────────────────────────────────────────────────────────────────────────

Write `prisma/migrate-treatments.ts`:
1. Import the existing `treatments` array from `src/content/treatments/main.ts` as-is.
2. For each treatment, `prisma.treatment.create({ data: { slug, href, pillar, audience, kind,
   data: <everything else as JSON> } })`.
3. For each treatment's `seo` field, also insert a `PageSeo` row keyed by `href`.
4. Also seed `PageSeo` rows for every other public route (home `/`, `/contact-us`, `/our-experts`,
   `/aesthetics`, `/blog`, etc.) using whatever `Seo` object each page currently hand-builds.
5. Seed one `SiteSettings` row from the current `src/content/site.ts` values + current logo paths.
6. Run once locally, verify row counts match (15 treatments, N pages), verify JSON deep-equals the
   original objects. Never run this script twice against a populated table without a truncate guard.

────────────────────────────────────────────────────────────────────────────
PHASE 3 — SWAP THE DATA SOURCE, NOT THE COMPONENTS
────────────────────────────────────────────────────────────────────────────

This is the key move. Change ONLY these two files' internals, keep their exported function
signatures byte-for-byte identical so every one of the 15 `page.tsx` files needs zero edits:

- `src/content/treatments/main.ts` → `getTreatmentBySlug(slug)` becomes an async DB read
  (`prisma.treatment.findUnique`) that reconstructs the full `Treatment` object by spreading the
  `data` JSON with the `slug/href/pillar/audience/kind` columns, then attaches `seo` from `PageSeo`
  where `path = href`. Wrap in `unstable_cache` from `next/cache`, tag: `['treatments', slug]`.
- `src/content/treatments/index.ts` → `getTreatments(slugs)` and the `treatments` list similarly
  become cached DB reads, tag: `['treatments']`.

Because both functions become `async`, every `page.tsx` that calls them must add `await` — this is
the ONE mechanical edit required across all 15 pages, everything else (JSX, `TreatmentTemplate`,
`SectionRenderer`) is untouched.

Rendering strategy (ISR, not pure SSR, not pure static):
- Each `page.tsx` keeps `export const metadata = buildMetadata(...)` but since data is now async,
  move to `export async function generateMetadata()` reading from `PageSeo` by path, falling back to
  `SiteSettings.defaultSeoTitle/Description` when a specific `PageSeo` row is missing.
- Add `export const revalidate = 3600` (or a shared constant) on each treatment page as the ISR
  fallback window — content updates within an hour even if nobody touches the admin.
- On admin save (treatment update, SEO update, or settings update), call `revalidateTag('treatments')`
  / `revalidatePath(path)` from the server action so the change is live immediately, not after an
  hour. This gives you the best of both: cheap cached reads (ISR) + instant admin-triggered freshness
  (on-demand revalidation) — the standard Next.js 15 pattern, do not build a custom cache layer.

────────────────────────────────────────────────────────────────────────────
PHASE 4 — "CRITICAL DESIGN" / NON-COMMON SECTIONS
────────────────────────────────────────────────────────────────────────────

These are the bespoke, page-specific components already living in
`src/components/sections/custom/<name>/*.tsx`. Rule: **design/layout code stays in the repo, only
their CONTENT becomes DB-editable.**

1. Give every custom component a stable string key (e.g. `'hormone-therapy-woman-process'`).
2. In `Treatment.data.customSection`, store `{ key: string, props: Record<string, unknown> }` instead
   of raw inline steps.
3. Add one small registry in `TreatmentTemplate.tsx`:
   ```ts
   const customSectionRegistry: Record<string, React.ComponentType<any>> = {
     'hormone-therapy-woman-process': TreatmentProcess,
   }
   ```
   and render `const Custom = treatment.customSection && customSectionRegistry[treatment.customSection.key]`
   then `{Custom && <Custom {...treatment.customSection.props} />}`.
4. Admin UI for these: a dropdown of registered keys (not free text) + a JSON/form editor for that
   key's `props` only, validated against a per-key Zod schema you define next to each custom
   component. This keeps admins from ever being able to inject an unknown component or break layout,
   while still letting them edit the copy/steps/images that component renders.
5. Never let the generic `SectionRenderer` registry and the `customSectionRegistry` merge into one
   system — they solve different problems (repeatable JSON blocks vs. one-off bespoke layouts) and
   collapsing them will eventually force bespoke designs through a generic shape they don't fit.

────────────────────────────────────────────────────────────────────────────
PHASE 5 — SITE SETTINGS (logo, favicon, socials, header/footer scripts)
────────────────────────────────────────────────────────────────────────────

1. `src/lib/settings.ts`: `getSiteSettings()` — cached DB read (tag `['site-settings']`) with sane
   fallback defaults matching current hardcoded values, so a missing row never breaks the site.
2. `Header.tsx` / `Footer.tsx`: replace hardcoded `src="/images/samm-logo.webp"` etc. with
   `settings.logoUrl ?? '/images/samm-logo.webp'` — always keep the current asset as fallback.
3. `layout.tsx` (root): inject `settings.faviconUrl` into the `<head>` icons metadata, and
   dangerously-set `settings.headerScripts` / `settings.footerScripts` (sanitize/validate as
   trusted-admin-only raw HTML — this field must NEVER be exposed to a public form, only the
   authenticated admin dashboard).
4. Social links: add a `SocialLinks` component reading `settings.socialLinks` (facebook, instagram,
   youtube, linkedin, tiktok — only render icons for keys that are actually set).
5. Admin screen `/admin/(dashboard)/settings`: form for every `SiteSettings` field. Logo/favicon
   should be file uploads, not URL text boxes — see Phase 7 note on file storage.

────────────────────────────────────────────────────────────────────────────
PHASE 6 — PER-PAGE SEO ADMIN
────────────────────────────────────────────────────────────────────────────

1. `src/lib/seo.ts`: extend `buildMetadata` (or add `buildMetadataForPath(path)`) to read `PageSeo`
   by path first, falling back to `SiteSettings` defaults, falling back to whatever the page's code
   currently hardcodes as a last resort — three-tier fallback, never a blank title/description.
2. Admin screen `/admin/(dashboard)/seo`: a table listing every known path (static registry array of
   all public routes + all `Treatment.href`s), each row editable inline or via a modal — title,
   description, canonical, og image, noindex toggle, optional JSON-LD.
3. On save: upsert the `PageSeo` row, then `revalidatePath(path)`.


4 fetch all date from db treatmnets page when visit spefeic page oky with loading using ISR STRATIGY OKY 
────────────────────────────────────────────────────────────────────────────
PHASE 7 — ADMIN DASHBOARD ADDITIONS
────────────────────────────────────────────────────────────────────────────

New routes under the existing `/admin/(dashboard)/` group (auth middleware already protects this):
- `/admin/(dashboard)/treatments` — list (slug, pillar, status, updatedAt), search, filter by pillar.
- `/admin/(dashboard)/treatments/[id]` — edit screen. Given the size/nesting of `Treatment.data`,
  build this in two layers, ship layer 1 first:
  - Layer 1 (ship first): structured forms for the fields every treatment definitely has — hero
    (title/lead/image/ctas), symptoms, process, pricing, candidacy, faqs, closingCta — each its own
    Zod schema and its own form section. This covers ~90% of edits admins will actually make.
  - Layer 2 (ship second): a controlled JSON editor (e.g. a code editor component) for the
    `sections: TreatmentSection[]` array specifically, since that's the open-ended, per-type-varying
    part. Validate against the `TreatmentSection`/`TreatmentBlockData` Zod schema before allowing
    save; show a live preview link (open the real page in a new tab) rather than trying to build a
    WYSIWYG for every section `type` up front.
- `/admin/(dashboard)/settings` — Phase 5 form.
- `/admin/(dashboard)/seo` — Phase 6 table.
- File uploads (logo, favicon, og images, treatment images): decide storage NOW, before building
  upload UI — Vercel's filesystem is read-only/ephemeral in production, so uploads cannot write to
  `/public`. Use the existing `Media` model + an external store (Vercel Blob, UploadThing, S3, or
  Cloudinary — pick one, confirm with the client which they already have an account for) and store
  the returned URL in `Media.url`, referencing it from `SiteSettings`/`PageSeo`/`Treatment.data`.

────────────────────────────────────────────────────────────────────────────
PHASE 8 — LEAD / APPOINTMENT FORM (confirm, don't rebuild)
────────────────────────────────────────────────────────────────────────────

`Appointment` + `bookAppointment()` already persist leads to Postgres and already show in the admin
appointments list per the prior plan.md. Before writing any new code here:
1. Grep every form on the site (booking widget, contact page, any treatment-page inline CTA form,
   the `formModal` referenced in `hero.actions` in `main.ts`) and confirm each one actually calls
   `bookAppointment` (or a shared submit handler wrapping it) rather than posting to a dead endpoint
   or a third-party embed.
2. If any form is NOT wired to the DB, wire it — do not duplicate the schema; reuse `Appointment` +
   the existing Zod schema, adding a `sourcePath` (string) field to `Appointment` if you want to know
   which page a lead came from — small, additive, backward-compatible migration.
3. Nice-to-have (only if the client asks): email notification to the clinic on new lead, using
   whatever transactional email provider they already have — do not add a new one unprompted.

────────────────────────────────────────────────────────────────────────────
PHASE 9 — CACHING/REVALIDATION SUMMARY (so you don't reinvent this mid-build)
────────────────────────────────────────────────────────────────────────────

- Read path: DB → `unstable_cache(fn, keyParts, { tags, revalidate: 3600 })` → component.
- Write path (any admin save): after the Prisma write, call `revalidateTag(...)` for list-level
  changes and `revalidatePath(path)` for the specific page(s) affected — both, not one, since a
  treatment edit affects both its own page AND any hub/related-grid that lists it.
- Never fetch treatment data directly in a component without going through the cached helper —
  one call site (`main.ts` / `index.ts`) per data shape is what keeps this maintainable.

────────────────────────────────────────────────────────────────────────────
PHASE 10 — ROLLOUT SAFETY (live site — non-negotiable)
────────────────────────────────────────────────────────────────────────────

1. Do all of Phase 1–3 on a separate branch, against a staging/dev database — never point Phase 2's
   migration script at the production DB on the first run.
2. After Phase 3, do a full visual diff of all 15 treatment pages (before/after) — byte-identical
   HTML output is the bar, since only the data source changed, not the components.
3. Deploy Phase 3 (data source swap) alone first, confirm the live site is unaffected, THEN build the
   admin CRUD (Phase 7) against the now-working DB-backed pages. Don't ship "the admin can edit it"
   and "the site reads from DB" in the same deploy — isolate the risk.
4. Keep `src/content/treatments/main.ts`'s original static array in git history / a backup file until
   the DB-backed version has been live and stable for at least a few days — instant rollback path.
5. Every phase: run `npm run build` and manually click through all 15 treatment pages + home + contact
   + blog before moving to the next phase. Never batch multiple phases into one untested deploy.

────────────────────────────────────────────────────────────────────────────
RULES (same as RULE.MD — repeated because they matter most here)
────────────────────────────────────────────────────────────────────────────

- Never silently change the `Treatment` TypeScript type or any component prop shape — the whole
  point of Phase 3 is that components don't know or care the data moved to Postgres.
- Never force a bespoke/custom section into the generic `SectionRenderer` registry just because it
  would be "more consistent" — Phase 4 exists specifically to keep those separate.
- Never re-run the Phase 2 migration script against a non-empty table without an explicit truncate
  confirmation.
- If a section `type` appears in the JSON that isn't in `SectionRenderer`'s registry, stop and ask —
  do not silently drop it or silently invent a new renderer for it.
- After each phase, review your own diff, run the build, then report back before starting the next
  phase.