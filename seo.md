

**Role:** Act as a Senior Next.js & SEO Engineer.

**Project Context:**
- Framework: Next.js 16+ with App Router.
- Dynamic routes: `app/[...slug]/page.tsx`.


**Current SEO Issues (from Ahrefs Screenshot):**
1. `robots` meta tag is **missing**.
2. `X-Robots-Tag` HTTP header is **missing**.
3. `keywords` meta tag is **missing**.
4. `publisher` meta tag is **missing**.
5. Duplicate `<title>` and `<meta description>` across all pages (currently using the same default for every treatment).
6. `robots.txt` and `sitemap.xml` are likely missing or not dynamically generated.

**Goal:** Fix all these issues systematically, ensuring every page has unique, dynamic SEO metadata while maintaining the existing design and ISR functionality.

---

### 📁 Files to Modify / Create

Please follow these steps exactly and output the full code for each file.

#### Step 1: Update `app/layout.tsx`
Add default `metadata` with a `title` template, default `description`, and default `robots`. Ensure `<html lang="en">` is present.

#### Step 2: Update `app/[...slug]/page.tsx`
Enhance the existing `generateMetadata` function to include:
- `robots` (index, follow, googleBot settings).
- `keywords` (fallback to default if missing in treatment data).
- `alternates.canonical` (use treatment.seo.canonical or treatment.href).
- `openGraph` and `twitter` cards (using treatment data).
- `other.publisher` (set to `'Savannah Age Management Medicine'`).

Ensure the `generateMetadata` receives `params` as a Promise (correct for Next.js 15+).

#### Step 3: Create `middleware.ts` at the root of the project
Add logic to set the `X-Robots-Tag: index, follow` HTTP header on all responses.

#### Step 4: Create `public/robots.txt`
Write a standard `robots.txt` file that allows all user agents, disallows `/api/` and `/admin/`, and points to the `sitemap.xml` URL.

#### Step 5: Create `app/sitemap.ts`
Generate a dynamic sitemap that fetches all treatments via `getAllTreatments()` and maps them to URLs, including static pages like `/`, `/book`, and `/financing-options`.

---

### 📝 Detailed Code Requirements & Placeholders

**A. `app/layout.tsx` requirements:**
- `metadataBase: new URL('https://www.agemanagementmed.com')`
- `title: { template: '%s | Savannah Age Management Medicine', default: 'Hormone Therapy & Weight Loss Clinic in Savannah, GA | SAMM' }`
- `description: 'Savannah Age Management Medicine offers hormone therapy, medical weight loss, PRP, sexual wellness, and age management care in Pooler and Statesboro, GA.'`
- `robots: { index: true, follow: true }`

**B. `app/[...slug]/page.tsx` requirements for `generateMetadata`:**
```typescript
// Make sure to handle Promise params
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const href = hrefFromSlug(slug);
  const treatment = await getTreatmentByHref(href);
  if (!treatment) return {};

  return {
    title: treatment.seo.title,
    description: treatment.seo.description,
    keywords: treatment.seo.keywords || 'hormone therapy, weight loss, age management',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: treatment.seo.canonical || treatment.href,
    },
    openGraph: {
      title: treatment.seo.title,
      description: treatment.seo.description,
      url: treatment.seo.canonical || treatment.href,
      siteName: 'Savannah Age Management Medicine',
      images: treatment.hero?.image?.src ? [{ url: treatment.hero.image.src }] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: treatment.seo.title,
      description: treatment.seo.description,
      images: treatment.hero?.image?.src ? [treatment.hero.image.src] : [],
    },
    other: {
      publisher: 'Savannah Age Management Medicine',
    },
  };
}
```

**C. `middleware.ts` logic:**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'index, follow');
  return response;
}
```

**D. `app/sitemap.ts` logic:**
- Import `getAllTreatments`.
- Generate entries for static pages and dynamic treatments.
- Return an array of `{ url, lastModified, changeFrequency?, priority? }`.

**E. `public/robots.txt`:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://www.agemanagementmed.com/sitemap.xml
```

---

### ✅ Final Verification Checklist (Please confirm in your response)
1. Does `robots` meta tag appear in the `<head>` with `content="index, follow"`?
2. Is the `X-Robots-Tag` header present in the Network tab response headers?
3. Are the `<title>` and `<meta name="description">` unique per slug?
4. Is the canonical URL correctly pointing to the current page?
5. Does `sitemap.xml` list all treatment pages?

---

### Important Constraints:
- Do **not** change the design, colors, or existing CSS of the `SectionRenderer` or any other component.
- Keep the `buildBlocksFromTreatment` function unchanged unless absolutely necessary for metadata.
- Ensure compatibility with Next.js App Router's latest `metadata` API (specifically handling async params).
- Do not break the ISR (`generateStaticParams`). Keep it as is.

Please provide the complete, updated code for **all** the files listed above. Use TypeScript.