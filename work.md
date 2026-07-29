# Build Instructions for Claude Code — Admin UI, Form Validation, In-The-News, Footer

**Read this whole file before starting. Work through Tasks in order (1 → 4). Each task lists exact file paths — touch only those files unless a task explicitly tells you to create a new one. Do not refactor, rename, or "improve" anything outside the listed scope, even if you notice unrelated issues — note them at the end in a summary instead of fixing them.**

Stack context: Next.js App Router, Prisma + PostgreSQL, Tailwind v4 (CSS variables in `src/app/globals.css`, not a `tailwind.config`), `zod` + `react-hook-form` + `@hookform/resolvers` + `sonner` are already installed in `package.json` but currently unused anywhere in `/admin` — wire them up, don't install anything new.

---

## TASK 1 — Admin Dashboard UI Overhaul

### Scope
Only these files/folders:
- `src/app/admin/(dashboard)/layout.tsx`
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/Topbar.tsx`
- `src/components/admin/*Table.tsx` (BlogTable, TreatmentsTable, LeadsTable, AppointmentsTable, SeoTable)
- `src/app/globals.css` (add new CSS variables only — do not edit or remove existing marketing-site variables)

**Do not touch** any file under `src/app/(marketing)/` or `src/components/sections/`, `src/components/layout/Footer*` — those are the public site and must look exactly as they do now.

### 1.1 — Give the dashboard its own color palette (separate from marketing site)
The marketing site and the dashboard currently both pull from the same CSS variables (`--color-ink-*`, `--color-canvas-*`, `--color-sage-*`) in `src/app/globals.css`. Do not repurpose those. Instead, add a new dashboard-only block of CSS variables, clearly namespaced, e.g.:

```css
/* ---- Dashboard palette (admin-only, separate from marketing site) ---- */
--color-dash-navy-950: #0b1220;
--color-dash-navy-900: #111a2e;   /* sidebar background */
--color-dash-navy-800: #1b2740;
--color-dash-slate-400: #94a3b8;  /* muted sidebar text */
--color-dash-bg: #f7f8fa;         /* body background — light mist, not pure white, not marketing canvas */
--color-dash-surface: #ffffff;    /* card/table background */
--color-dash-border: #e6e8ee;
--color-dash-action: #16203a;     /* dark-till button — deep navy/slate, NOT the marketing sage-green */
--color-dash-action-hover: #0d1526;
--color-dash-text: #1a2033;
--color-dash-text-muted: #667085;
```
Pick exact hex values that pass **WCAG AA contrast** (4.5:1 minimum for body text, 3:1 for large text/UI components) against their intended background — verify each text/background pair with a contrast checker before finalizing (e.g. `--color-dash-text` on `--color-dash-bg`, white text on `--color-dash-action`, etc.). This is a hard requirement, not a nice-to-have — check every pairing you introduce.

Sidebar already uses a navy gradient (`from-ink-950 via-ink-950 to-[#081029]`) — replace those marketing `ink-*` references in `Sidebar.tsx` with the new `dash-navy-*` tokens so it's no longer coupled to the marketing palette (same visual navy result, but independently editable going forward).

### 1.2 — Body background and buttons
- `src/app/admin/(dashboard)/layout.tsx` currently sets `bg-canvas-50/60` on the wrapper div — change to the new `bg-dash-bg` (mist/light, not pure white, not the marketing cream).
- Every primary button inside `/admin` (form submit buttons, "Add New" buttons, table row actions) should use the new dark navy/slate action color (`--color-dash-action`) with a lighter hover state — not the marketing site's sage-green. Audit `TreatmentForm.tsx`, `BlogForm.tsx`, `TestimonialsManager.tsx`, `AdminsManager.tsx`, and the table components for any button currently using `bg-sage-*` or `bg-ink-*` and swap to the dashboard tokens.

### 1.3 — Table redesign + skeleton loading
Current tables (`BlogTable.tsx`, `TreatmentsTable.tsx`, `LeadsTable.tsx`, `AppointmentsTable.tsx`, `SeoTable.tsx`) need a visual upgrade:
- Sticky header row, subtle row dividers using `--color-dash-border`, hover state per row (`bg-dash-bg` tint), consistent cell padding, right-aligned action buttons/icons, empty-state illustration or message when there's no data (don't just render an empty `<table>`).
- **Skeleton loading state**: while data is loading (client-side fetch, or `Suspense` boundary for server components), render skeleton rows — same column widths as the real table, animated with `animate-pulse` (Tailwind utility already used elsewhere in the codebase, e.g. `src/app/(marketing)/blog/[slug]/loading.tsx` has a working pattern you can copy the approach from). Build one shared `<TableSkeleton rows={N} columns={N} />` component in `src/components/admin/TableSkeleton.tsx` and reuse it across all five tables rather than duplicating skeleton markup in each.
- If a table currently fetches data client-side inside a `useEffect`, add a `loading` state that renders `<TableSkeleton />` until data resolves. If a table is server-rendered already (data ready at render time), instead wrap it in `<Suspense fallback={<TableSkeleton />}>` at the page level (check each page under `src/app/admin/(dashboard)/*/page.tsx` to see which pattern currently applies before changing anything).

### 1.4 — Topbar
Update `Topbar.tsx` to match the new palette (white/light surface, dash text tokens) — keep its current structure/functionality (admin name, logout, whatever else it currently renders), only restyle.

**Acceptance check:** Visit every admin page. Confirm: sidebar and marketing site no longer visually share a color system (dashboard is light-mist body / deep-navy sidebar / dark-navy buttons — distinct from the marketing site's cream/sage/rose look), every button/text pair passes AA contrast, and every table shows a skeleton before data appears.

---

## TASK 2 — Form Validation (Zod + React Hook Form)

### Scope — exactly these four form components:
- `src/components/admin/BlogForm.tsx`
- `src/components/admin/TestimonialsManager.tsx`
- `src/components/admin/TreatmentForm.tsx`
- `src/components/admin/NewTreatmentForm.tsx`

Do not touch `SettingsForm.tsx`, `AdminsManager.tsx`, `IconUploader.tsx`, `SectionBuilder.tsx`, or `TipTapEditor.tsx` in this task unless a listed form imports and depends on one of them for a field that needs its own validation rule (e.g. if `TreatmentForm` uses `SectionBuilder` for a required field, validate at the `TreatmentForm` level, don't modify `SectionBuilder` itself).

### 2.1 — Pattern to follow for each form
For each of the four components:
1. Define a `zod` schema matching the form's actual fields — check the corresponding Prisma model (`Post`/`PostSeo` for BlogForm, `Testimonial` for TestimonialsManager, `Treatment` for TreatmentForm/NewTreatmentForm in `prisma/schema.prisma`) to get correct types/required-vs-optional right. Don't invent fields that aren't in the model.
2. Mark the genuinely required fields as required in the schema (e.g. blog: title, slug, content; treatment: name, slug, summary; testimonial: name, quote/body) — leave truly optional fields (e.g. SEO meta override, tags) optional in the schema too. Use `.min(1, 'X is required')` style messages that are specific to the field, not generic "Required".
3. Replace the current form state handling with `useForm` + `zodResolver(schema)` from `react-hook-form` / `@hookform/resolvers/zod`.
4. Every input must show its field-level error message below it when invalid (red text, small font, only appears after a failed validation attempt — don't show errors before first submit attempt unless the field was touched and blurred).
5. Submit button: show a loading/spinner state (disable the button, swap label to "Saving…" or similar) while the mutation is in flight — check how each form currently submits (likely a `fetch` to an API route under `src/app/api/admin/...` — find and reuse the existing endpoint, don't create new ones unless one doesn't exist for a form).
6. On success: `toast.success('...')` via `sonner` (already installed, check if a `<Toaster />` is mounted somewhere in `src/app/admin/layout.tsx` — if not, add it there so all four forms can use it).
7. On failure (API error or network error): `toast.error('...')` with a real, useful message (parse the API's error response if it returns one, otherwise a sensible fallback like "Something went wrong — please try again").
8. After a successful create/update, keep existing redirect/refresh behavior as-is — don't change navigation flow, only add validation + toasts + loading state around it.

### 2.2 — Specific notes per form
- **`TestimonialsManager.tsx`** — check the actual file structure first: it may render a modal/inline form for add/edit rather than a dedicated page. Apply the same RHF+zod pattern inside whatever the current add/edit UI is, without restructuring the manager's list/modal architecture.
- **`TreatmentForm.tsx` vs `NewTreatmentForm.tsx`** — these appear to be two separate components (edit vs create, based on `src/app/admin/(dashboard)/treatments/[id]/` and `treatments/new/`). Check whether they share fields closely enough to extract one shared zod schema (`src/lib/validation/treatment.ts`) imported by both, rather than duplicating the schema twice. Do the same shared-schema check for Blog if there's a separate edit form under `blog/[id]/edit/`.
- Put each schema in a new `src/lib/validation/` folder, one file per entity (`blog.ts`, `testimonial.ts`, `treatment.ts`), so schemas are reusable if the same validation is ever needed on the API route side too (bonus, not required, but keep it organized this way rather than defining schemas inline inside the form components).

**Acceptance check:** For each of the four forms — submit empty, confirm every required field shows its own error message (not a single generic banner). Submit valid data, confirm loading state shows then a success toast fires. Force a failed submit (e.g. temporarily break the API URL or test with a duplicate slug if that's a real constraint) and confirm an error toast fires instead of a silent failure or unhandled crash.

---

## TASK 3 — `/in-the-news` Page (DB-backed)

Currently this page (`src/app/(marketing)/in-the-news/page.tsx`) renders static hardcoded data from `expertsContent.press` (`src/content/pages/experts.ts`) and has no metadata. Replace with a real DB-backed model.

### 3.1 — Prisma model
File: `prisma/schema.prisma` — add:
```prisma
model NewsItem {
  id           String   @id @default(cuid())
  title        String
  thumbnailUrl String
  newsLink     String
  order        Int      @default(0)
  published    Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([published, order])
}
```
Run `npx prisma migrate dev --name add_news_item` then `npx prisma generate`.

### 3.2 — Server actions / data fetching
File: `src/actions/news.ts` (new — mirror the pattern already used in `src/actions/blog.ts` for `getPosts`/`getPostBySlug`, check that file first for the codebase's existing conventions before writing this).
- `getNewsItems()` — returns published items ordered by `order` ascending, then `createdAt` descending.
- Admin-side CRUD functions (`createNewsItem`, `updateNewsItem`, `deleteNewsItem`) if there isn't already an equivalent API route pattern — check `src/app/api/admin/` first to see whether the codebase does CRUD via API routes or server actions for similar entities (e.g. check how Testimonials or Treatments do it) and match that exact pattern, don't introduce a second convention.

### 3.3 — Admin CRUD screen
New folder: `src/app/admin/(dashboard)/news/` (list page) + `src/app/admin/(dashboard)/news/new/` (create) — mirror the Treatments admin structure (`src/app/admin/(dashboard)/treatments/`) exactly, including using the Task 2 form-validation pattern (zod schema: `title` required string, `thumbnailUrl` required valid URL, `newsLink` required valid URL) and the Task 1 table/skeleton styling for the list view.
- Add a "News" nav item to `src/components/admin/Sidebar.tsx`'s `navItems` array (pick an appropriate `lucide-react` icon, e.g. `Newspaper`).
- Add image upload for `thumbnailUrl` reusing the existing `src/components/admin/ImageUploader.tsx` component (check how `TreatmentForm.tsx` or `BlogForm.tsx` currently uses it for a featured image field, copy that exact usage pattern).

### 3.4 — Public page render
File: `src/app/(marketing)/in-the-news/page.tsx`
- Add `export const metadata = buildMetadata({...})` (same pattern as `our-experts/page.tsx` — real title like `"In The News | Savannah Age Management Medicine"` and a real description about press coverage).
- Fetch `getNewsItems()` and render using the existing `ContentGrid` + `ContentCard` components (`src/components/sections/ContentGrid.tsx`, `src/components/features/ContentCard.tsx`) — these already accept a `ContentSummary`-shaped array with `href`, `title`, `image`, `external`. Map each `NewsItem` to that shape: `{ href: item.newsLink, title: item.title, image: { src: item.thumbnailUrl, alt: item.title }, external: true }`. Reuse this component rather than building new card markup.
- Keep responsive behavior — `ContentGrid` already handles the 2/3-column responsive grid, just confirm the thumbnail images render correctly at all breakpoints (mobile single column, tablet 2-col, desktop 3-col) since these are external `newsLink`/`thumbnailUrl` values, not local `/images/` assets — make sure `next.config.ts`'s `images.remotePatterns` actually allows whatever domain the thumbnails will be hosted on (check current config; if it's still the wildcard `**` from before, this will already work, but flag if it's since been locked down and the news thumbnail host isn't in the allow-list).
- Add this page to `src/app/sitemap.ts`'s `STATIC_ROUTES` if it isn't already there.

**Acceptance check:** Add 2–3 news items via the new admin screen, confirm they render on `/in-the-news` responsively at mobile/tablet/desktop widths, each card links out to the external `newsLink` in a new tab, and page title/meta description are present in view-source.

---

## TASK 4 — Footer Fixes

### Scope — only these files:
- `src/components/layout/SocialLinks.tsx`
- `src/content/navigation.ts`
- `src/components/layout/Footer.tsx` (one-line cleanup only, see 4.3)

### 4.1 — Show disabled icons when a social link has no value
Current behavior in `SocialLinks.tsx`: it filters out any platform without a URL in `SiteSettingsData.socialLinks`, so if nothing is set in the DB, nothing renders at all. Change this to **always render** Facebook, Instagram, and LinkedIn icons (per the requirement — just these three, not all five in `ICON_PATHS`), and for any of the three with no URL set, render a disabled/greyed-out version instead of a clickable link:
- No `href` → render a `<span>` (not an `<a>`) with the same icon, but muted styling (lower opacity, `cursor-not-allowed`, no hover state, `aria-disabled="true"`, and an `aria-label` like `"Facebook (not connected)"` for accessibility) instead of the active `bg-sage-100/15 text-sage-400 hover:bg-sage-200/30` treatment.
- Has `href` → render exactly as it does now (active link, full opacity, hover state).
- Youtube and TikTok icons: leave them in `ICON_PATHS` for future use, but per the requirement only Facebook/Instagram/LinkedIn need the always-visible disabled-state treatment — don't add Youtube/TikTok to the always-render list unless you want to extend the same treatment to all five for consistency; if unsure, default to applying the disabled-state pattern to all five so the component is consistent (your call, but state which you chose in your summary).

### 4.2 — Add Office Policy and Book Appointment links to footer
File: `src/content/navigation.ts` — `footerNav.practice` array currently has Our Experts, Patient Results, In The News, Blogs. Add:
```ts
{ label: 'Office Policy', href: '/office-policy' },
{ label: 'Book Appointment', href: '/book-appointment' },
```
Confirm both routes actually exist (`src/app/(marketing)/office-policy/page.tsx` and `src/app/(marketing)/book-appointment/page.tsx` — both already exist per the current codebase, this is a content-array change only, no new pages needed).

### 4.3 — Cleanup (do this, it's one line and directly in the file you're already touching)
`src/components/layout/Footer.tsx` has a stray `console.log(settings)` — remove it. Nothing else in this file changes.

**Acceptance check:** With `socialLinks` empty in `SiteSettings` (or a fresh DB), Facebook/Instagram/LinkedIn icons still show in the footer, visually muted, not clickable. With at least one social URL set, that one icon is active and the others (still unset) remain muted. Footer's "Practice" column shows 6 links including Office Policy and Book Appointment, both navigating correctly. No `console.log` output from Footer in the browser console.

---

## Final Step — Summary Report
After all four tasks, give a short written summary (not more code) covering:
- Every file you touched, grouped by task
- Any place you had to deviate from these instructions because the actual code didn't match what's described here (e.g. a form structured differently than expected)
- Any unrelated issue you noticed but did NOT fix (per the "don't touch anything outside scope" rule) — list it so it can be a separate task later
- Confirm you ran `npx prisma migrate dev` successfully for the two new models (Task 3) and that the app builds (`npm run build`) with no TypeScript errors before considering this done
