# UI Migration Plan: Old Site to React

## My Understanding of Your Requirements

✅ **What STAYS the same:**
- Hero sections on all pages (no UI changes needed)
- Content: text, body copy, links, data
- Admin dashboard (completely separate - no changes)
- FAQs logic/functionality (only UI styling changes)
- Database & backend structure

❌ **What CHANGES:**
- All sections BELOW the hero (services, features, testimonials, CTAs, etc.)
- UI design & branding to match old live site exactly
- Component styling & layout
- Forms styling
- Lists & cards styling
- Buttons & interactions
- Responsive behavior

---

## Old Site Technical Stack (from `/download` folder)

### CSS Files Available
- `style.css` — Main custom styles (color scheme, typography, components)
- `bootstrap.css` — Bootstrap grid system
- `fonts.css` — Font declarations (Bodoni-72, Manrope)
- `simply-blue.js` — jQuery interactions
- `swiper-bundle.css` — Slider/carousel
- `magnific-popup.css` — Lightbox/modals
- `animate.min.css` — WOW.js animations
- `all.css` — Font Awesome icons

### Design System
**Colors:**
- Primary Teal: `#519B99`
- Dark Blue: `#14214B`
- Background: `#F7F8F2`
- Text Dark: `#141518` / `#111214`
- Borders: `#ddd`, `#D9D9D9`

**Typography:**
- Headings: Bodoni Moda (500 weight)
- Body: Manrope (400 weight)
- Buttons: Manrope (700 weight)

**Spacing:** Bootstrap grid (12-column, gap patterns)

**Components Identified:**
- `.btn` — Buttons with variants (.btn-pink, .btn-blue, .btn-arrow-right, .btn-play)
- `.form-control` — Input fields with floating labels
- `.list-check`, `.list-check-2`, `.list-arrow-right`, `.list-icon` — Various list styles
- `.card` styles (likely in sections)
- Sliders (Swiper)
- Hero sections (which we're KEEPING)
- Services grid
- Features/sections with images & text
- Testimonials carousel
- FAQs accordion
- Contact forms

---

## Migration Strategy

### Approach: **CSS + HTML → React + Tailwind/CSS Modules**

I will:

1. **Extract & Organize CSS**
   - Copy essential styles from old CSS files into organized sections
   - Create reusable Tailwind classes OR CSS module for precise matching
   - Focus on: colors, typography, spacing, component styles

2. **Convert HTML to React Components**
   - Map Bootstrap grid to Tailwind or CSS Grid
   - Convert jQuery animations (WOW.js) to CSS transitions or Framer Motion
   - Convert Swiper sliders to existing Embla Carousel (already in your package.json)
   - Create component hierarchy:
     ```
     src/components/
     ├── sections/    (Keep existing hero, add new ones)
     ├── ui/         (Update buttons, forms, cards, lists)
     └── shared/     (CTAs, testimonials, etc.)
     ```

3. **Handle Dynamic Sections**
   - Services → Use `Service` model from Prisma (already exists)
   - Testimonials → Use `Testimonial` model (already exists)
   - FAQs → Keep existing logic, update CSS only
   - Blog → Keep existing blog structure

4. **Preserve Responsiveness**
   - Bootstrap breakpoints: `sm`, `md`, `lg`, `xl`, `xxl`
   - Match old site responsive behavior exactly

---

## What I'll Deliver

### Phase 1: Foundation (Today)
✓ Extract CSS from old site → organized stylesheet
✓ Create color & typography scale in Tailwind config (if using Tailwind)
✓ Build component library:
  - Button variants (.btn, .btn-pink, .btn-blue, .btn-arrow-right, .btn-play)
  - Form controls with floating labels
  - List components (check, arrow, icon lists)
  - Card components
  - CTA sections

### Phase 2: Major Sections (Next)
✓ Services section (grid layout)
✓ Features/highlights section
✓ Testimonials carousel (using Embla)
✓ CTA/action sections
✓ Contact form styling

### Phase 3: Page-Specific Sections
✓ Blog page styling
✓ Treatment pages styling
✓ About/experts page styling
✓ All other custom sections matching old design

### Phase 4: Polish & Testing
✓ Responsive behavior verification (mobile, tablet, desktop)
✓ Animations (scrolling effects, hover states)
✓ Cross-browser testing
✓ Side-by-side comparison with old site

---

## Implementation Details

### CSS Strategy
I will create: `src/styles/legacy-compat.css` containing:
- Color variables matching old palette
- Typography classes matching old sizing
- Component base styles for buttons, forms, cards, lists
- Spacing/layout utilities from Bootstrap grid

### Component Conversion Example
**Old HTML:**
```html
<div class="container">
  <div class="row">
    <div class="col-lg-6 wow fadeInUp">
      <h2 class="title">Section Title</h2>
      <p>Content</p>
    </div>
  </div>
</div>
```

**New React:**
```tsx
export function ServiceSection() {
  return (
    <section className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}}>
          <h2 className="text-[48px] font-bodoni font-500 mb-[30px]">
            Section Title
          </h2>
          <p className="text-base text-gray-800 leading-relaxed">
            Content
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

### Animation Approach
- Replace WOW.js animations with **Framer Motion** (already in your dependencies)
- Or use CSS animations for simpler effects
- Trigger on scroll using `whileInView` prop

### Slider/Carousel
- Use **Embla Carousel** (already in your package.json: `embla-carousel-react`)
- Preserve old slider behavior (autoplay, navigation, responsiveness)

---

## Timeline & Effort Estimate

**With provided HTML + CSS files:**

| Phase | Time | Tasks |
|-------|------|-------|
| 1. Setup & CSS extraction | 1-2 hours | Extract CSS, set up component base styles |
| 2. Core components | 2-3 hours | Buttons, forms, cards, lists, CTAs |
| 3. Major sections | 3-4 hours | Services, features, testimonials, content blocks |
| 4. Page-specific | 2-3 hours | Blog, treatments, contact, other pages |
| 5. Responsive + polish | 2-3 hours | Test, align with old design, finalize |
| **TOTAL** | **10-15 hours** | Full UI migration |

**Faster with:** Perfect screenshots or HTML already segmented by section

---

## What I Need From You RIGHT NOW

1. **Screenshots** of the sections that need to change (below hero)
   - Homepage sections
   - Treatment page sections
   - Blog page layout
   - Contact page
   - Any other custom sections

2. **Confirmation on scope:**
   - Which pages need UI changes? (all of them?)
   - Are there custom sections not in the HTML files?
   - Any interactive elements to preserve?

3. **Images:**
   - Can you keep using existing Cloudinary URLs?
   - Do we need to update image paths?

---

## My Confidence Level: 💯 VERY HIGH

**Why:**
✅ Old HTML is well-structured and organized
✅ CSS is clean and follows a system
✅ You already have React 19 + Tailwind + Framer Motion set up
✅ Embla Carousel is already installed for sliders
✅ Your Prisma models already match the content structure
✅ Hero sections stay same = less risk of breaking pages
✅ No logic changes needed = purely UI/CSS work

**Risk mitigation:**
- I'll work section-by-section to avoid breaking things
- Each component will be tested against old screenshots
- Will maintain existing responsive behavior
- FAQs logic won't be touched

---

## Next Steps

1. ✅ You confirm this plan aligns with your vision
2. ✅ You send me a prioritized list of pages/sections to change
3. ✅ I start with Phase 1 (CSS extraction + base components)
4. ✅ I show you working component previews before scaling to full pages

---

## My Commitment

I understand you're under time pressure. Here's what I guarantee:

✅ **Exact UI matching** — Every pixel/spacing compared to old site
✅ **No disappearing** — I'll keep you updated on progress
✅ **Responsive** — Works perfectly on mobile, tablet, desktop
✅ **Fast execution** — Systematic, section-by-section, no wasted time
✅ **Clean code** — Reusable components, no spaghetti code

**Let's go!** Send me the prioritized list of pages and confirm you're happy with this plan.
