তোমার logic আমি পুরোপুরি বুঝতে পেরেছি।

এটা আর "Treatment Template" না। এটা basically একটা **Landing Page Builder** হবে, যেখানে প্রতিটা treatment page JSON দিয়ে define হবে।

তুমি যেটা চাচ্ছো সেটা এইরকম:

* একই page-এ ১০টা different section থাকতে পারে
* অন্য page-এ ১৫টা
* এক page icon card
* আরেক page left image/right text
* আরেক page comparison
* আরেক page timeline
* আরেক page FAQ
* আরেক page CTA
* কোন page-এ review থাকবে
* কোন page-এ থাকবে না
* Future এ database থেকে আসলেও same rendering system কাজ করবে
* কোন section না থাকলে render হবে না
* কোন error হবে না
* JSON change করলে page change হবে
* UI change না করে rendering হবে

এটাই আসলে professional CMS architecture.

আমি তোমার JSON structure-ও দেখেছি। বর্তমানে `allTreatmentsInfo` এর মধ্যে `page -> sections` structure already আছে এবং বিভিন্ন `type` ব্যবহার করা হচ্ছে (`content-with-image`, `card-grid`, `feature-list`, `process-steps`, `reviewer-bio`, `hero-cta` ইত্যাদি)। 

আমার মতে Phase-1 এ **schema redesign না করে schema evolution** করা উচিত। অর্থাৎ existing format break করা যাবে না, শুধু extensible করতে হবে।

আমি recommend করবো future architecture হবে:

```
Treatment
    ↓
sections[]
    ↓
section.type
    ↓
SectionRenderer
    ↓
Specific Component
```

মানে

```
content-with-image
    ↓
ContentWithImage.tsx

feature-grid
    ↓
FeatureGrid.tsx

icon-grid
    ↓
IconGrid.tsx

cta
    ↓
CTA.tsx

timeline
    ↓
Timeline.tsx
```

অর্থাৎ template শুধু render করবে।

সব logic section renderer করবে।

এটাই scalable architecture.

---

# আমি Claude-কে যেটা বলতাম

## Problems

```
The current TreatmentTemplate works but is too tightly coupled to today's JSON.

It supports only the current layout assumptions.

Future treatment pages may require completely different section combinations.

Some pages may contain:

- icon cards
- feature grids
- comparison blocks
- left/right image sections
- image galleries
- process timelines
- numbered cards
- statistics
- FAQs
- reviewer blocks
- pricing
- notices
- CTA banners
- before/after sliders

while other pages may use completely different combinations.

The rendering system should not require modifying the template every time a new section is introduced.

The current implementation should evolve into a flexible JSON-driven rendering engine.

This project is a production business website.

Stability is more important than adding fancy code.
```

---

## Goal

```
Build a flexible JSON-driven Treatment Detail rendering system.

NOT a page redesign.

NOT a component rewrite.

The UI should remain visually identical.

The rendering engine should become flexible enough that almost every content decision comes from JSON.

The page should behave like a landing-page builder using reusable section components.
```

---

## Current Status

```
Current architecture already exists.

TreatmentTemplate is already rendering sections from JSON.

Current JSON structure should remain the base format.

Do NOT redesign the JSON.

Instead extend it carefully.

Current content file:

src/content/treatments/main.ts

Current template:

src/components/templates/TreatmentTemplate.tsx

Current reusable section components should remain reusable.

Current routes already work.

Current UI already looks good.

Only flexibility is missing.
```

---

## Architecture Target

```
Think of this as a Landing Page Builder.

Every treatment page should be built entirely from JSON.

TreatmentTemplate should become a renderer.

It should never know business logic.

Instead:

JSON
↓

SectionRenderer

↓

Specific reusable component

↓

Rendered UI
```

---

## JSON Requirements

```
Do NOT redesign the entire JSON.

Maintain backward compatibility.

Existing JSON must continue working.

Only add optional fields.

Future data may come from:

- local JSON
- CMS
- API
- Database

The renderer should not care where data comes from.
```

---

## Rendering Requirements

```
Every section should be optional.

If JSON doesn't contain a section:

Skip rendering.

Never throw errors.

Never render empty placeholders.

Never break spacing.

Never create layout shifts.
```

---

## Section Flexibility

Support future section types like:

```
content

content-with-image

feature-grid

icon-grid

icon-list

benefits

symptoms

timeline

process

comparison

accordion

faq

testimonial

reviewer

before-after

gallery

cta

hero-cta

pricing

notice

statistics

cards

video

embed

image-left

image-right

split-layout

rich-text

markdown

custom-html (optional)

table

related-services

doctor-profile

location

insurance

form

custom component
```

without changing TreatmentTemplate.

---

## Images

```
Current placeholder images do not exist.

Never use

themes/default/image.png

or broken assets.

Use existing assets first.

If unavailable,

use relevant online images.

Image must match the section.

Every image must have:

alt

title (optional)

loading

width

height

SEO friendly.
```

---

## SEO

Every page should support

```
title

description

canonical

robots

keywords

og

twitter

schema

breadcrumb

image alt

SSR

metadata API

OpenGraph

JSON-LD where appropriate
```

---

## SSR

All treatment pages must remain

Server Side Rendered

for:

SEO

performance

fast indexing

metadata

social previews

---

## Do NOT Do

```
Do not redesign UI.

Do not replace TreatmentTemplate.

Do not hardcode sections.

Do not hardcode page layouts.

Do not remove reusable components.

Do not invent medical content.

Do not break existing pages.

Do not create duplicate code.

Do not introduce unnecessary abstractions.

Do not change current styling.
```

---

## Have To Do

```
Improve flexibility.

Improve maintainability.

Improve rendering.

Improve schema.

Keep backwards compatibility.

Keep existing UI.

Keep existing routes.

Keep current spacing.

Keep responsive behavior.

Keep accessibility.

Keep SEO.
```

---

## Phase 1

```
Only work with

2 JSON files.

Male BHRT

Female BHRT

Update only these.

Improve renderer only where necessary.

Do not touch other treatments yet.

After completion,

I will review.

If approved,

the remaining treatment pages will be migrated using the same architecture.
```

---

## Final Output

```
1. Architecture summary

2. JSON improvements

3. Files changed

4. Why changes were needed

5. Future scalability notes

6. Phase-1 completed

7. Await review before continuing
```

---

# MASTER PROMPT FOR CLAUDE CODE

You are working inside an existing Next.js + TypeScript production website for a running business.

Your task is **not redesign**.

Your task is to **preserve the current UI/layout structure** while making the service/treatment pages fully JSON-driven, complete, reusable, and content-safe.

## PRIMARY GOAL

Update the current treatment/service pages so they can render from structured JSON data with better completeness and flexibility, while preserving:

* the current visual design
* the current spacing and typography
* the current hero section structure
* the current component system
* the current responsive behavior
* the current business-ready layout flow

This is a live business site, so any change that risks layout breakage, content loss, or visual regressions should be avoided.

## WHAT TO CHECK FIRST

Inspect these files before changing anything:

* `src/components/templates/TreatmentTemplate.tsx`
* `src/types/content.ts`
* `src/content/treatments/index.ts`
* all treatment content files in `src/content/treatments/`
* all route pages in `src/app/**/page.tsx`

## ALL PAGES / ROUTES IN SCOPE

Cross-check the page name, route, slug, and href for every treatment page already present in the repo.

Use the existing route registry and keep names/links aligned.

The pages currently in scope include:

* `/aesthetics` — Medical Aesthetics
* `/bhrt-hrt-trt` — BHRT / HRT / TRT hub
* `/bioidentical-hormone-replacement-therapy/female` — Bioidentical Hormone Replacement Therapy for Women
* `/bioidentical-hormone-replacement-therapy/male` — Bioidentical Hormone Replacement Therapy for Men
* `/concierge-medical-weight-loss/female` — Concierge Medical Weight Loss for Women
* `/concierge-medical-weight-loss/male` — Concierge Medical Weight Loss for Men
* `/glp-1-microdosing/female` — GLP-1 Microdosing for Women
* `/glp-1-microdosing/male` — GLP-1 Microdosing for Men
* `/laser-vaginal-therapy` — Laser Vaginal Therapy
* `/perimenopause-menopause` — Perimenopause & Menopause
* `/platelet-rich-plasma-hair/female` — PRP Hair Restoration for Women
* `/platelet-rich-plasma-hair/male` — PRP Hair Restoration for Men
* `/rejuvenation-enhancement/female` — Sexual Wellness / Rejuvenation for Women
* `/rejuvenation-enhancement/male` — Sexual Wellness / Rejuvenation for Men
* `/shockwave-therapy` — Shockwave Therapy

Also verify any hub/registry links in `src/content/treatments/index.ts` and make sure displayed page names match the content data and breadcrumbs.

## CORE REQUIREMENTS

### 1) Preserve the current treatment template

The current `TreatmentTemplate` approach must remain the foundation.

Do not replace it with a new page architecture.

Instead:

* keep the same template-first approach
* extend it only where needed
* preserve backward compatibility
* add flexibility without changing the visual design system

### 2) Make the template more flexible

The current template must support richer JSON-driven rendering for any treatment page.

The schema should be flexible enough to render:

* hero
* symptoms / benefits
* editorial sections
* process steps
* pricing
* candidacy
* FAQs
* testimonials
* related treatments
* care team / providers
* closing CTA
* optional extra blocks later without redesigning the template again

If the current schema is too narrow, extend it minimally and safely.

### 3) Merge old and new content

I will provide:

* old content or old JSON
* current new JSON
* current page/template code

Your job is to compare the old content with the current JSON and restore missing information into the new structure.

Rules:

* keep the newer structure when it is correct
* bring back missing service details from the old content
* do not invent facts
* do not summarize away useful detail
* do not remove useful sections already present
* if data conflicts, preserve the safer and more complete version and list the conflict separately

### 4) Maintain layout structure

The page below the hero should keep the current section order and layout rhythm.

Do not:

* change the hero design
* change spacing scale
* change typography hierarchy
* change card style or visual language
* introduce a new design system
* break mobile layout
* create a content dump that destroys section rhythm

### 5) Add relevant images

The page content must use relevant images that match the section context.

Do not rely on missing placeholder paths such as:

* `theme/default/image.png`
* other nonexistent fallback files

Use, in order of preference:

1. existing local assets already in the repo
2. existing treatment-specific images already present in the repo
3. relevant online images only if the project supports remote image loading

If remote images are used:

* ensure the app’s image configuration allows the domains
* use images that match the section meaning
* do not use random stock visuals
* keep image relevance strong and medically/business appropriate

### 6) Keep content safe

This is a medical/service site.

Do not fabricate:

* medical claims
* treatment outcomes
* pricing
* provider details
* statistics
* testimonials
* before/after promises

If something cannot be verified, leave it empty or mark it for review.

## WHAT TO DELIVER

### Output 1: Content audit

Produce a clear gap analysis showing:

* which fields exist in old content but are missing in current JSON
* which fields are already present
* which sections need schema expansion
* which route/page names are mismatched, if any

### Output 2: Updated JSON

Return an updated JSON structure for the target treatment page(s).

### Output 3: Minimal code changes

Make only the minimal safe code changes needed so the current `TreatmentTemplate` can render richer JSON reliably.

### Output 4: Flexibility improvements

If the template cannot support the content cleanly, extend the schema and rendering layer in the smallest possible way.

## IMPLEMENTATION STRATEGY

Follow this order:

1. Inspect the current route and content registry.
2. Inspect the treatment template and section components.
3. Compare current JSON with old content.
4. Identify missing content and missing schema support.
5. Update JSON first.
6. Update types next if needed.
7. Update template/component logic only where needed.
8. Verify that the current UI remains visually unchanged.
9. Verify responsive behavior.
10. Verify every page name and route still matches the intended page.

## SECTION RENDERING RULES

The template should remain data-driven.

Below the hero, render from JSON in a predictable order.

Recommended order:

1. optional symptoms/benefits
2. editorial sections
3. process steps
4. pricing
5. candidacy
6. related treatments
7. providers
8. testimonials
9. FAQs
10. closing CTA

If a section is missing, omit it cleanly.

## FLEXIBILITY TARGET FOR THE TEMPLATE

The existing `TreatmentTemplate` should evolve to support a more generic section model without breaking the current pages.

Prefer a schema that can handle future content like:

* section variants
* cards
* image pairs
* callout blocks
* bullet lists
* optional notes
* reusable CTA rows
* anchor-friendly section IDs
* page-specific custom blocks

But do this without changing the current UI style.

## IMAGE RULES

Every image must be relevant to the section content.

Examples:

* symptom section → symptom-related visual
* process section → consultation / procedure / progress visual
* pricing section → consultation / value / care-plan visual
* candidacy section → patient / clinician / assessment visual

If a section image is missing:

* do not leave broken paths
* do not use dummy placeholder names
* choose a better matching asset or remote image

## ROUTE / NAME RULE

For every page:

* keep the page title aligned with the route
* keep the `slug` aligned with the file
* keep `href` aligned with the actual route
* keep breadcrumb labels aligned with the page name
* keep registry entries consistent

## STRICT OUTPUT FORMAT

When you finish, provide:

### A. GAP ANALYSIS

What is missing in the current JSON compared with old content.

### B. UPDATED JSON

The improved JSON structure.

### C. FILES TO EDIT

Exact file names.

### D. MINIMAL CODE CHANGES

Only the smallest safe code changes needed.

### E. FLEXIBILITY NOTES

What schema/template changes were added so the system can support more JSON-based service pages later.

## VERY IMPORTANT

* Do not redesign.
* Do not rewrite the UI.
* Do not lose content.
* Do not invent content.
* Do not break existing pages.
* Do not break the current `TreatmentTemplate` look and feel.
* Do not use placeholder or missing images.
* Do keep the layout structure stable for a live business site.

# STEP-BY-STEP WORKFLOW I WANT YOU TO FOLLOW

## Phase 1 — Audit

Read the current files and list:

* route names
* page names
* current schema fields
* missing content from the old source

## Phase 2 — Merge

Merge old content into the new JSON carefully.

## Phase 3 — Flexibility

Extend the schema/template only if required for completeness.

## Phase 4 — Render

Make sure the page still renders with the current style and layout.

## Phase 5 — Validate

Check:

* route alignment
* page naming
* section order
* image relevance
* responsive stability
* missing content recovery

Now perform the work.
