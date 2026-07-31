# AI Prompt: Fix Lighthouse Performance Score (80 → 95+)

Copy everything below into Claude Code / Cursor / your AI coding assistant, run it in the repo root, and let it work through each section in order.

---

## Context (paste this as-is)

I'm running a Next.js app (evidence: `/_next/image` requests, Cloudinary-hosted images). Current Lighthouse Mobile scores: Performance 80, Accessibility 93, Best Practices 100, SEO 100.

Metrics:
- FCP: 1.5s (good)
- LCP: 4.4s (poor — this is the main problem)
- TBT: 20ms (good)
- CLS: 0 (good)
- Speed Index: 5.2s (needs improvement)

LCP breakdown: TTFB is only 10ms, but **Element render delay is 3,980ms** — nearly the entire LCP budget is spent waiting to render the hero text paragraph, not loading it. That means the bottleneck is render-blocking resources and JS execution before paint, not network speed.

Please fix the following issues, in this priority order, and re-measure after each:

### 1. Eliminate render-blocking CSS (est. savings ~1,300ms)
- Two CSS chunks load render-blocking. Find them in `next.config.js` / global styles and:
  - Extract and inline **critical above-the-fold CSS** directly in `<head>` (Next.js supports this via `experimental.optimizeCss` or a critical-CSS plugin).
  - Load the rest of the CSS asynchronously (`media="print" onload="this.media='all'"` pattern, or dynamic `next/dynamic` imports for non-critical component styles).
  - If using CSS-in-JS or a component library, check for unused CSS being bundled globally — split per-route.

### 2. Fix the LCP element render delay (3,980ms — the biggest single win)
This is almost certainly caused by one or more of:
- The hero text is behind client-side hydration (check if the hero section is a client component — mark it `"use server"` or render it statically/SSR so it paints before JS hydrates).
- A web font is blocking text paint (FOIT). Add `font-display: swap` to all `@font-face` rules, and preload the primary font:
  ```html
  <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossorigin>
  ```
- The hero component waits on a JS bundle before rendering. Move the hero markup above any dynamic imports so it's not gated on chunk load.
- Check if an animation library (I see `opacity: 1; transform: none` inline styles suggesting a fade-in animation on load) delays visible paint — set the initial state to already-visible for the LCP element specifically, and only animate elements below the fold.

### 3. Add preconnect / dns-prefetch for critical origins
No origins are currently preconnected. Add these to `<head>` (adjust to your actual origins):
```html
<link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
<link rel="preconnect" href="https://agemanagementmed.ghlprime.com" crossorigin>
```
Limit to your top 2–4 critical origins — don't preconnect everything.

### 4. Fix the network dependency chain (max critical path: 2,153ms)
- The CSS chunks are chained after the initial HTML request. Reduce chain depth by:
  - Combining/splitting CSS bundles so the critical path doesn't require sequential fetches.
  - Self-hosting instead of chaining through a third-party domain where possible.
  - Using `<link rel="modulepreload">` or `rel="preload"` for the second CSS file so it fetches in parallel instead of after the first resolves.

### 5. Fix oversized images (est. savings ~111 KiB)
Cloudinary images are being served at their original size and shrunk via CSS instead of requested at the right size:
- `treatment-plan_rdxnon.png`: served 897×877, displayed 112×118 → request via Cloudinary's URL transforms at the actual display size, e.g. add `w_224,h_236,c_fill` (2x for retina) to the Cloudinary URL.
- `lab-work_yrq7fr.avif`: served 626×616, displayed 112×112 → same fix, `w_224,h_224,c_fill`.
- Site logo via `/_next/image`: served 384×175, displayed 138×63 → let Next/Image compute the right `sizes` prop instead of a fixed oversized source, and increase compression.
- General rule: for every `<Image>` (Next.js) or `<img>`, set explicit `width`/`height` matching 1–2x the rendered size, and use `sizes` so the browser doesn't download desktop-size images on mobile.

### 6. Drop unnecessary legacy JS polyfills (est. savings ~13 KiB)
Your bundle polyfills `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd` — all supported in every browser you likely need to support.
- Update `browserslist` in `package.json` to a modern baseline, e.g.:
  ```json
  "browserslist": [
    "defaults",
    "not IE 11",
    "maintained node versions"
  ]
  ```
- If using Babel, make sure `@babel/preset-env` picks up this browserslist (don't hardcode an old target).
- Re-check your bundler's differential loading config isn't force-including `core-js` polyfills for all these features.

### 7. Eliminate the forced reflow (77ms, unattributed)
- Search client code for reads of layout-triggering properties (`offsetWidth`, `offsetHeight`, `getBoundingClientRect`, `scrollHeight`) that happen right after a DOM/style mutation.
- Batch reads before writes (read all layout values first, then apply style changes), or move the read to `requestAnimationFrame`.
- If it's from a third-party script, wrap its execution so it runs after first paint (`requestIdleCallback` or defer).

### 8. Quick wins to also check while you're in there
- Confirm `next/font` is used instead of manually linked Google Fonts (auto self-hosts + eliminates a render-blocking font request).
- Enable `next/image`'s automatic AVIF/WebP + responsive `srcset` everywhere instead of raw Cloudinary `<img>` tags where possible.
- Set cache headers on static assets (`Cache-Control: public, max-age=31536000, immutable`) for versioned Next.js assets.

---

## After making changes
Re-run Lighthouse (Mobile) and confirm:
- LCP under 2.5s
- Element render delay under ~1s
- No render-blocking requests flagged
- Legacy JavaScript insight gone
- Image delivery insight savings near 0

Report back the new scores and any insight that's still flagged, with the exact file/line where the issue lives, so we can iterate.
