# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Savannah Age Management Medicine (SAMM)** is a Next.js 16 full-stack application for a hormone therapy and age management clinic. It features a public marketing site with treatment pages, blog, appointment booking, and a protected admin dashboard for managing content, appointments, and site settings.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment (DATABASE_URL, JWT_SECRET, Cloudinary keys required in .env)
# See .env for current configuration

# Run development server with Turbo
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
npm run start

# Run standalone production build (Docker-friendly)
npm run start:standalone
```

## Key Commands

**Development & Testing:**
```bash
npm run dev           # Start dev server with Turbo
npm run test          # Run tests in watch mode
npm run test:ui       # Run tests with UI dashboard
npm run test:run      # Run tests once (CI mode)
npm run test:coverage # Generate coverage report
```

**Database:**
```bash
npm run db:generate   # Regenerate Prisma Client (run after schema changes)
npm run db:migrate    # Create and apply migrations interactively
npm run db:push       # Sync schema to database (prototyping only — use migrations in production)
npm run db:seed       # Seed database with initial data
npm run db:studio     # Open Prisma Studio UI (http://localhost:5555)
```

**Linting & Formatting:**
```bash
# Biome handles both linting and formatting
npx biome check --apply src/  # Check and fix issues in src/
npx biome format --write src/  # Format files
# Runs automatically via lint-staged on git commit
```

## Architecture

### Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (marketing)/    # Public site routes (/ prefix stripped)
│   ├── admin/          # Protected admin dashboard
│   │   ├── (auth)/     # Login page (public)
│   │   └── (dashboard) # Protected admin pages (requires session)
│   ├── api/            # API route handlers
│   └── layout.tsx      # Root layout (fonts, global metadata, tracking scripts)
├── components/
│   ├── sections/       # Marketing page sections (hero, features, etc.)
│   ├── shared/         # Reusable UI (forms, layouts, headers)
│   ├── ui/             # Radix UI + shadcn components (buttons, modals, etc.)
│   ├── admin/          # Admin-only components (tables, modals, builders)
│   └── seo/            # JsonLd, metadata helpers
├── actions/            # Server actions (auth, appointments, leads, etc.)
├── lib/
│   ├── prisma.ts       # Prisma Client singleton
│   ├── settings.ts     # Site settings cache & fetch
│   ├── auth.ts         # JWT verification helper
│   ├── utils.ts        # Tailwind/className utilities
│   └── generated/      # Auto-generated Prisma types
├── content/            # Static content (fallback to DB)
│   ├── feature.ts      # Homepage services (replaces Service model fallback)
│   ├── pages/          # Page content templates
│   └── posts.ts        # Blog post fixtures
├── hooks/              # Custom React hooks (useInView, etc.)
└── middleware.ts       # Auth & SEO header injection
```

### Route Groups

**Public Routes (via `(marketing)` group):**
- `/` — Homepage
- `/blog`, `/blog/[slug]` — Blog index and post detail
- `/book-appointment` — Appointment booking form
- `/[treatment-slug]` — Dynamic treatment pages (therapies, procedures)
- `/our-experts` — Staff/provider profiles
- `/in-the-news` — Press coverage from NewsItem model
- `/contact-us`, `/privacy-policy`, `/terms-and-conditions`, `/office-policy` — Legal/info pages

**Admin Routes (protected, requires session cookie):**
- `/admin/login` — Public login page
- `/admin/dashboard` — Overview
- `/admin/blog` — Post management + create/edit pages
- `/admin/appointments` — Appointment list with detail modal
- `/admin/leads` — Lead capture submissions
- `/admin/people` — Staff/provider management (Person model)
- `/admin/treatments` — Treatment page editor
- `/admin/services` — Service card management
- `/admin/news` — Press coverage management
- `/admin/admins` — User management (add/remove admins)

**API Routes:**
- `/api/admin/auth/*` — Login, logout, session check
- `/api/admin/*` — CRUD endpoints for all dashboard models
- `/api/services` — Public service list
- `/api/upload` — File upload handler

### Data Models & Admin Surfaces

**Content Management:**
- `Post` / `PostSeo` — Blog articles (TipTap JSON editor, auto-HTML rendering, draft/published/archived)
- `Treatment` — Dynamic treatment pages (massive JSON blob containing hero, symptoms, process, pricing, candidacy, FAQs, related treatments, providers, custom sections)
- `Service` — Homepage service cards (replaces static `src/content/feature.ts`)
- `Person` — Staff/providers shown on /our-experts and per-treatment team credits
- `NewsItem` — Press coverage on /in-the-news (article/video type, custom publish date label)

**Lead & Appointment Capture:**
- `Appointment` — Full booking intent (name, email, phone, preferred date/time, service choice, notes)
- `Lead` — Lightweight contact form (separate from Appointment; includes sourcePath for tracking which form submitted)
- `NewsletterSubscriber` — Email capture (currently unused but model exists)

**Admin & Auth:**
- `Admin` — Admin users (email, bcrypt password hash, role field for future RBAC)
- `Session` — JWT token storage (expiresAt, adminId or adminToken for session-less flows)

**Site Configuration:**
- `PageSeo` — SEO metadata for every page (path-keyed; one record per unique route like `/`, `/contact-us`, `/bioidentical-hormone-replacement-therapy/male`). Includes optional raw JSON-LD override for schema validation.
- `SiteSettings` — Singleton (id='singleton') for logo, favicon, social links, GA/Meta Pixel tracking IDs, header/footer script injection
- `Testimonial` — Admin-curated reviews (separate from static testimonials.ts)
- `Media` — Metadata for uploaded files (currently minimal usage)

### Authentication & Authorization

**Session Flow:**
1. Admin posts email+password to `/api/admin/auth/login`
2. Server verifies bcrypt hash, generates JWT, stores in `Session` table with expiry
3. JWT signed into `session` cookie (httpOnly, Secure in prod)
4. Middleware verifies cookie + token validity on every `/admin/*` and `/api/*` request
5. Logout invalidates session in DB

**Protected Routes:**
- Middleware blocks unauthenticated access to `/admin` (except `/admin/login`) and most `/api/*` routes
- Public API endpoints: `/api/admin/auth/login`, `/api/admin/auth/logout`, `/api/upload`

### Image Handling

**Remote patterns (next.config.ts):**
- `res.cloudinary.com` — Marketing/treatment images
- `waldoughmediaclients.s3.us-east-2.amazonaws.com` — Seeded news photos
- `assets.cdn.filesafe.space` — Legacy service/provider images

**Optimizations:**
- Next.js Image component used for all marketing images
- Cloudinary serves AVIF/WebP with 31-day cache TTL
- Preconnect + DNS prefetch hints for Cloudinary in root layout

## Key Decisions & Patterns

### Treatment Pages as JSON Blobs

`Treatment.data` is a single JSON column storing the entire TS `Treatment` shape (hero section, symptoms, process, pricing, candidacy, FAQs, closing CTA, related treatments, care team, custom sections). This design avoids schema migrations for every treatment variant while keeping all data in one queryable record. Admin edit UI serializes/deserializes this JSON via forms in the SectionBuilder.

### PageSeo Singleton Pattern

SEO metadata is keyed by route path (`/`, `/contact-us`, `/blog/[slug]`), not by model ID. This allows fine-grained per-page control without duplicating metadata across multiple content types. Routes without a matching PageSeo record fall back to site-wide defaults from SiteSettings.

### Form Submission Patterns

- **Appointments & Leads** — Form data submitted to server actions (`actions/appointment.ts`, `actions/lead.ts`), which write to DB and trigger admin notifications
- **Admin Forms** — Handled via API POST/PUT/DELETE endpoints in `/api/admin/*`, protecting against unauthorized edits
- **Blog/Treatment Editor** — TipTap for posts (stores both JSON + pre-rendered HTML); SectionBuilder for treatments (stores JSON only, no HTML pre-render)

### Caching Strategy

- `getSiteSettings()` cached for 1 hour (revalidate on tag: 'site-settings')
- Blog posts fetched fresh (no caching), individual post fetches may cache in future
- Treatment pages static-rendered where possible (future: on-demand ISR)

## Development Notes

### Adding a New Admin Page

1. Create route file: `src/app/admin/(dashboard)/[feature]/page.tsx`
2. Add data fetch/form logic
3. Create corresponding API routes in `/api/admin/[feature]/route.ts` for CRUD
4. Middleware automatically protects the route

### Adding a New Public Page

1. Create route file: `src/app/(marketing)/[slug]/page.tsx`
2. Add metadata (title, description, og image)
3. Optionally add matching `PageSeo` record in DB for admin override
4. Sections/components go in `src/components/sections/`

### Editing Blog or Treatment Content

- **Blog:** Use admin UI (`/admin/blog/create`, `/admin/blog/[id]/edit`) — TipTap editor saves JSON + auto-renders HTML
- **Treatments:** Same admin UI via SectionBuilder — JSON stored, no HTML rendering (component handles live rendering on public pages)

### Environment Variables

- `DATABASE_URL` — PostgreSQL connection (Neon serverless)
- `JWT_SECRET` — Signing key for session tokens (rotate in production)
- `NEXT_PUBLIC_SITE_URL` — Site root (used for metadata, social links)
- `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINERY_NAME` — Image service credentials

### Typescript & Linting

- **Biome** handles both linting and formatting (configured in biome.json)
- TypeScript strict mode enabled (tsconfig.json)
- Zod for runtime schema validation on server actions + API inputs

### Testing

- **Vitest** for unit & integration tests
- Use `vitest --ui` during development for live feedback
- Coverage reports: `npm run test:coverage`

## Common Gotchas

1. **Prisma Type Generation** — After schema changes, always run `npm run db:generate` before building to regenerate types. Builds will fail without this.
2. **Session Token Validation** — Middleware checks both cookie presence AND token validity. Expired tokens redirect to login even if cookie exists.
3. **Standalone Output** — Next.js is configured for standalone builds (`output: "standalone"` in next.config.ts). When deploying, use `.next/standalone/` and copy `node_modules/.prisma/client/` manually if needed.
4. **Image Domains** — Only the three remote patterns in next.config.ts are allowed. New image sources require config update + rebuild.
5. **JSON Fields** — Prisma `Json` columns (cardBenefits, bio, socialLinks, etc.) are typed as `any` by default — cast to expected shape in code or add a custom scalar type.

## Performance Considerations

- Next.js Turbo dev mode enabled for faster rebuilds
- Images cached client-side for 31 days (Cache-Control via Cloudinary)
- Site settings cached for 1 hour (on-demand revalidation via tag)
- Blog posts and treatments currently fetched fresh (consider ISR for high-traffic pages)
- TipTap editor pre-renders HTML on save to avoid runtime markdown parsing on public pages
