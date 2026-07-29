# SEO Launch-Readiness Instructions — agemanagementmed.com
**For: Claude Code** — Execute tasks in order. Each task has file paths, what to build, and an acceptance check. Do not skip Phase 1 — it's the launch blocker.

---

## PHASE 1 — LAUNCH BLOCKER: Redirects

### Task 1.1 — Add a Redirect model
File: `prisma/schema.prisma`

Add a new model:
```prisma
model Redirect {
  id          String   @id @default(cuid())
  fromPath    String   @unique // e.g. "/old-treatment-page"
  toPath      String              // e.g. "/hormone-therapy-men"
  statusCode  Int      @default(301) // 301 permanent, 302 temporary
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([fromPath])
}
```
Run: `npx prisma migrate dev --name add_redirect_model` then `npx prisma generate`.

### Task 1.2 — Build the redirect lookup + middleware wiring
File: `src/lib/redirects.ts` (new)
- Export `getRedirect(pathname: string)` — cached DB lookup (use `unstable_cache`, same pattern as `src/lib/settings.ts`), returns `{ toPath, statusCode } | null`.
- Normalize trailing slashes before lookup (`/foo/` and `/foo` should match the same row).

Edit: `src/middleware.ts`
- Before the existing public-page logic, check `getRedirect(pathname)`. If found, return `NextResponse.redirect(new URL(toPath, request.url), statusCode)`.
- Keep this fast — middleware runs on every request, so the cache in Task 1.2 matters. Do not hit Prisma directly in middleware without caching (Edge runtime + DB latency will hurt TTFB).

### Task 1.3 — Admin UI for redirects
Add a simple CRUD screen under `src/app/admin/(dashboard)/redirects/` mirroring the existing `PageSeo`/blog admin patterns already in the codebase (check `src/components/admin/SeoTable.tsx` for the pattern to copy). Fields: from path, to path, status code, created date. Must validate `fromPath` doesn't equal `toPath` (no redirect loops) and doesn't already exist.

### Task 1.4 — Populate real redirects before launch
- Crawl the **live/old** agemanagementmed.com site (get a full URL list — Screaming Frog export or `site:agemanagementmed.com` in Google, or Google Search Console → Pages report).
- Map every old URL to its new equivalent on this rebuild. Anything with no new equivalent → redirect to the closest relevant category page (e.g. old treatment subpage → new treatment page), not the homepage.
- Bulk-insert these via a seed script (`prisma/seed-redirects.ts`) reading from a CSV, rather than typing 50+ rows into the admin UI by hand.

**Acceptance check:** Hit 5 known old URLs from the live site in a browser after deploy — each must 301 to the correct new URL, not 404.

---

## PHASE 2 — Structured Data (Schema.org)

All schema builders live in `src/lib/seo.ts` — extend this file, keep the existing `buildXSchema()` pattern (pure functions returning plain objects, rendered via the existing `<JsonLd data={...} />` component).

### Task 2.1 — Wire up LocalBusiness schema (replace/extend the current MedicalBusiness org schema)
Edit `buildOrganizationSchema()` in `src/lib/seo.ts` to pull from `src/content/site.ts` (`locations` array) and output one `MedicalBusiness` entity per location, or a single entity with a `department`/`location` array — decide based on whether Google should treat these as one business with two branches (recommended: two `MedicalBusiness` entities, each with its own `@id`, linked via `parentOrganization`).

Include per location: `address` (PostalAddress: streetAddress, addressLocality, addressRegion, postalCode), `openingHoursSpecification` (from `location.hours`), `telephone`, `priceRange` (add a reasonable value like `"$$"` if not already in content), and `image` (site logo or clinic photo).

Render both in `src/app/(marketing)/layout.tsx` where `buildOrganizationSchema` is currently called once — update the call site to pass `locations` from `site.ts`.

### Task 2.2 — Wire up BreadcrumbList schema (currently dead code)
`buildBreadcrumbSchema()` exists in `src/lib/seo.ts` but is never called — confirm this, then call it on every page that renders a visual breadcrumb via `HeroEditorial`. The crumbs passed to `buildBreadcrumbSchema` must exactly match what's visually rendered (same labels, same order) — this is a strict Google requirement.

Files to update: `src/app/(marketing)/our-experts/page.tsx`, `src/app/(marketing)/contact-us/page.tsx`, `src/app/(marketing)/[...slug]/page.tsx`, and any other page using `HeroEditorial` with a `breadcrumbs` prop. Add a `<JsonLd data={buildBreadcrumbSchema(crumbs)} />` next to each.

### Task 2.3 — Add BlogPosting schema to blog posts
File: `src/app/(marketing)/blog/[slug]/page.tsx`

Add a new `buildBlogPostingSchema()` function in `src/lib/seo.ts`:
```ts
export function buildBlogPostingSchema(post: {
  title: string
  excerpt: string | null
  slug: string
  featuredImage: string | null
  publishedAt: Date | null
  updatedAt: Date
  authorName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.featuredImage ?? undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: post.authorName },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/images/samm-logo.webp` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}` },
  }
}
```
Render it via `<JsonLd>` in the blog post page component, alongside the existing content.

### Task 2.4 — Add Person schema for providers
File: `src/app/(marketing)/our-experts/page.tsx` + `src/content/people/index.ts`

Add `buildPersonSchema()` to `src/lib/seo.ts`, one per person in `src/content/people/index.ts` (name, jobTitle, image, worksFor → site.name). Render as an array of `<JsonLd>` blocks on the Our Experts page — check the `people` content shape first (`src/types/content.ts`) to confirm what fields (credentials, photo, bio) already exist to avoid inventing data.

### Task 2.5 — Add Service schema to treatment pages
File: `src/app/(marketing)/[...slug]/page.tsx`, extend `buildTreatmentSchema()` in `src/lib/seo.ts`

Change `MedicalWebPage` to also embed a nested `MedicalProcedure` or `Service` describing what's actually offered — reuse `treatment.summary` and `treatment.name`, do not invent pricing or claims not already in the content.

### Task 2.6 — Add Review/AggregateRating schema
File: wherever `TestimonialSet.tsx` is rendered (check `src/content/shared/testimonials.ts` for the data shape).

Only add this if the testimonials in the codebase are **real, attributable Google reviews** (the comment in the Prisma schema says they are — "sourced from Google reviews"). Add `buildReviewSchema()` — do not fabricate ratings; pull actual star ratings if present in the testimonial data, otherwise skip AggregateRating and only mark up individual `Review` entities.

**Acceptance check for all of Phase 2:** After each task, paste the rendered page's JSON-LD into Google's [Rich Results Test](https://search.google.com/test/rich-results) — zero errors, warnings only where genuinely optional fields are missing.

---

## PHASE 3 — Metadata Gaps

### Task 3.1 — Fix `/in-the-news`
File: `src/app/(marketing)/in-the-news/page.tsx`
- Add `export const metadata = buildMetadata({...})` following the same pattern as `our-experts/page.tsx`. Write a real title/description about press mentions, not a placeholder.
- Add `{ path: '/in-the-news', changeFrequency: 'monthly', priority: 0.5 }` to `STATIC_ROUTES` in `src/app/sitemap.ts`.

### Task 3.2 — Add canonical to `/book-appointment`
File: `src/app/(marketing)/book-appointment/page.tsx`
- Replace the manual `metadata: Metadata = {...}` object with `buildMetadata({ title, description, canonical: '/book-appointment' })` so it gets canonical + OG + robots automatically like every other page.

### Task 3.3 — Noindex `/thank-you`
File: `src/app/(marketing)/thank-you/page.tsx`
- Add `robots: { index: false, follow: true }` to its metadata object. Confirmation pages should never be indexed — they have no unique value for search and can create thin-content flags.

**Acceptance check:** `curl -I` each of these three URLs post-deploy, confirm `X-Robots-Tag` / meta robots and canonical tag are correct in view-source.

---

## PHASE 4 — Tightening & Hardening

### Task 4.1 — Lock down image remotePatterns
File: `next.config.ts`
- Replace `hostname: "**"` with the actual specific hosts in use (likely a Cloudinary domain — check `src/lib/cloudinary.ts` for the exact hostname, plus any admin-uploaded media host). Wildcard `**` allows Next.js to optimize/proxy images from any domain, which is both a security risk and unnecessary here.

### Task 4.2 — Verify analytics wiring before launch
This is not a code task — it's a launch-day checklist item, since GA4/GTM/Meta Pixel are injected via `SiteSettings.headerScripts`/`footerScripts` (admin-editable, not hardcoded):
- [ ] Confirm GA4 measurement ID is pasted into `headerScripts` in the admin panel (`/admin` → Settings)
- [ ] Confirm GTM container (if used) fires — check via GTM Preview mode
- [ ] Confirm Meta Pixel (if used) fires — check via Meta Pixel Helper browser extension
- [ ] Confirm form submissions (`/book-appointment`, contact form) actually push a conversion event — check `src/actions/` for the form submit handlers and whether they call `gtag('event', ...)` / `dataLayer.push(...)` on success. If not, add a client-side event fire on successful submission.
- [ ] Confirm phone number click tracking (`tel:` links in Header/Footer) fires an event if call tracking is required.

### Task 4.3 — Keyword/meta description QA pass
- Grep every page's `buildMetadata()` call and confirm each has a **unique**, page-specific `description` (not the generic fallback in `buildMetadata`'s default keywords string). Treatment pages already do this via `generateMetadata`; double check static pages (`privacy-policy`, `terms-and-conditions`, `office-policy`) aren't all sharing near-identical descriptions.

---

## PHASE 5 — Pre-Launch Technical QA

Run these checks against the staging/preview deployment before DNS cutover:

1. **Crawl staging with a tool** (Screaming Frog, or `next-sitemap` validator) — check for: broken internal links, orphan pages, duplicate titles/descriptions, missing H1s (every page should have exactly one `<h1>`).
2. **robots.txt** — visit `/robots.txt` on staging, confirm it's NOT accidentally blocking everything (staging environments often ship with `Disallow: /` left over — confirm `src/app/robots.ts` output is the intended `allow: '/'` version before go-live, and confirm staging itself has its own separate noindex if it's publicly reachable).
3. **Sitemap validity** — visit `/sitemap.xml`, validate at https://www.xml-sitemaps.com/validate-xml-sitemap.html, confirm all treatment + blog URLs resolve 200.
4. **Structured data** — run the homepage, one treatment page, one blog post, and the Our Experts page through Google Rich Results Test (Phase 2 acceptance check, repeated here as a final gate).
5. **Core Web Vitals** — run staging URL through PageSpeed Insights (mobile + desktop) for homepage and one treatment page. Target: LCP < 2.5s, CLS < 0.1, INP < 200ms.
6. **Canonical audit** — spot-check 10 pages' view-source, confirm canonical tag points to the correct self-referencing HTTPS `www` URL (matches `site.url` in `site.ts`), no mixed `http`/non-`www` versions.
7. **Mobile usability** — Google Search Console mobile usability check (or manual device testing) once staging is crawlable.

---

## PHASE 6 — Launch Day

1. Confirm Redirect table (Phase 1) is fully populated — this must happen **before** DNS cutover, not after.
2. Deploy to production.
3. Submit new sitemap in Google Search Console (add property if not already verified — use domain property with DNS verification for both `www` and non-`www`).
4. Request indexing for homepage + top 5 treatment pages manually via GSC URL Inspection tool (speeds up initial recrawl).
5. Set up a GSC saved report / alert for 404 spikes and coverage errors over the following 2 weeks — this is how you catch missed redirects.
6. Verify Bing Webmaster Tools sitemap submission too, if the practice cares about Bing traffic.

---

## PHASE 7 — Post-Launch (Week 1–4)

- Monitor GSC Coverage report daily for the first week — any spike in 404s means a missed redirect (go back to Phase 1.4).
- Monitor GSC Performance report — compare impressions/clicks against pre-launch baseline (pull this baseline from GSC **before** cutover if you haven't already — Phase 0 you should have exported the old site's last 3 months of GSC data for comparison).
- Re-run Rich Results Test on 3–4 pages after 1 week to confirm Google actually picked up the new structured data (check GSC → Enhancements for FAQ/Breadcrumb/Article reports populating).
- Check Core Web Vitals report in GSC (real-user data, takes ~28 days to populate) against the lab data from Phase 5.

---

## Priority Order Summary (if time-constrained before deadline)
1. Phase 1 (Redirects) — non-negotiable, do this first
2. Task 3.1–3.3 (metadata gaps) — quick wins, low effort
3. Task 2.1, 2.2 (LocalBusiness + Breadcrumb schema) — highest SEO value of the schema tasks
4. Task 2.3 (BlogPosting schema) — if blog is a traffic driver
5. Everything else in Phase 2, then Phase 4, then QA passes in Phase 5
