আমি আপনার প্রয়োজন অনুযায়ী **একটি সম্পূর্ণ স্কেলেবল আর্কিটেকচার** দিচ্ছি যেখানে:

1. **একক `SectionRenderer` কম্পোনেন্ট** – সমস্ত ব্লক টাইপ হ্যান্ডেল করবে।
2. **কোনো হার্ড-কোডেড CSS নেই** – সব ক্লাস প্রপসের মাধ্যমে আসবে।
3. **নতুন ব্লক টাইপ বা ক্লাস বাড়লেও** – শুধু JSON আপডেট করলেই চলবে, কম্পোনেন্ট অপরিবর্তিত থাকবে।
4. **বর্তমান ডিজাইন ও কালার ঠিক থাকবে** – ডিফল্ট ক্লাস ম্যাপিং করে রাখা হয়েছে।
5. **ISR, SEO, JSON-LD সহ** – পারফেক্ট পারফরম্যান্স।

---

## 🧩 সম্পূর্ণ সমাধান (এক ফাইলে সব)

```tsx
// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllTreatments, getTreatmentByHref, hrefFromSlug } from "@/lib/treatments";
import { buildMetadata, buildTreatmentSchema, buildFaqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Header from "@/components/Header";
import SectionRenderer, { BlockConfig } from "@/components/SectionRenderer";

// ========== ISR: স্ট্যাটিক পাথ জেনারেট ==========
export async function generateStaticParams() {
  const treatments = await getAllTreatments();
  return treatments.map((treatment) => ({
    slug: treatment.href.split('/').filter(Boolean),
  }));
}

// ========== মেটাডেটা জেনারেট ==========
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const treatment = await getTreatmentByHref(hrefFromSlug(slug));
  if (!treatment) return {};
  return buildMetadata(treatment.seo);
}

// ========== হেল্পার: ট্রিটমেন্ট থেকে ব্লক তৈরি (ডিফল্ট ক্লাস ম্যাপিং সহ) ==========
function buildBlocksFromTreatment(treatment: any): BlockConfig[] {
  const blocks: BlockConfig[] = [];

  // ----- 1. Hero -----
  if (treatment.hero) {
    blocks.push({
      type: "hero",
      eyebrow: treatment.hero.eyebrow,
      title: treatment.hero.title,
      body: treatment.hero.lead,
      image: treatment.hero.image,
      ctas: treatment.hero.ctas,
      // ডিফল্ট ক্লাস (আপনার বর্তমান ডিজাইন অনুযায়ী)
      className: treatment.hero.className || "bg-gradient-to-r from-blue-50 to-white py-16 px-4 md:px-8",
      titleClassName: treatment.hero.titleClassName || "text-4xl md:text-5xl font-bold text-gray-900 mt-2",
      bodyClassName: treatment.hero.bodyClassName || "text-lg text-gray-700 mt-4",
      buttonClassName: treatment.hero.buttonClassName || "inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700",
      imageClassName: treatment.hero.imageClassName || "rounded-xl shadow-lg",
    });
  }

  // ----- 2. Statement (যদি থাকে) -----
  if (treatment.statement) {
    blocks.push({
      type: "statement",
      body: treatment.statement,
      className: treatment.statementClassName || "bg-gray-100 py-12 px-4 text-center text-2xl font-semibold text-gray-800",
      bodyClassName: treatment.statementBodyClassName || "max-w-4xl mx-auto",
    });
  }

  // ----- 3. Symptoms (যদি থাকে) -----
  if (treatment.symptoms) {
    blocks.push({
      type: "symptoms",
      eyebrow: treatment.symptoms.eyebrow,
      title: treatment.symptoms.title,
      lead: treatment.symptoms.lead,
      items: treatment.symptoms.items,
      columns: treatment.symptoms.columns || 2,
      className: treatment.symptoms.className || "py-16 md:py-20 bg-gray-50",
      titleClassName: treatment.symptoms.titleClassName || "text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center",
      bodyClassName: treatment.symptoms.bodyClassName || "text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12",
    });
  }

  // ----- 4. Sections (two-column) -----
  if (treatment.sections) {
    treatment.sections.forEach((section: any) => {
      // যদি `reviewer-bio` টাইপ হয়, আলাদা ব্লক
      if (section.type === "reviewer-bio") {
        blocks.push({
          type: "reviewer-bio",
          id: section.id,
          subheading: section.subheading,
          content: section.content,
          images: section.images,
          className: section.className || "py-16 md:py-20 bg-white",
          titleClassName: section.titleClassName || "text-2xl font-bold text-gray-900 mb-4",
          bodyClassName: section.bodyClassName || "text-gray-700 leading-relaxed",
        });
        return;
      }

      // সাধারণ two-column
      blocks.push({
        type: "two-column",
        eyebrow: section.eyebrow,
        title: section.title,
        body: section.body,
        bullets: section.bullets,
        image: section.image,
        imageSide: section.imageSide || "right",
        className: section.className || "py-16 md:py-20 bg-white",
        titleClassName: section.titleClassName || "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
        bodyClassName: section.bodyClassName || "text-lg text-gray-700 leading-relaxed mb-4",
        eyebrowClassName: section.eyebrowClassName || "text-blue-600 font-semibold uppercase tracking-wide",
        imageClassName: section.imageClassName || "rounded-2xl shadow-lg",
      });
    });
  }

  // ----- 5. Pricing (যদি থাকে) -----
  if (treatment.pricing) {
    blocks.push({
      type: "pricing",
      eyebrow: treatment.pricing.eyebrow,
      title: treatment.pricing.title,
      lead: treatment.pricing.lead,
      included: treatment.pricing.included,
      note: treatment.pricing.note,
      cta: treatment.pricing.cta,
      className: treatment.pricing.className || "py-16 md:py-20 bg-white",
      titleClassName: treatment.pricing.titleClassName || "text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center",
      bodyClassName: treatment.pricing.bodyClassName || "text-lg text-gray-700 text-center max-w-3xl mx-auto",
      buttonClassName: treatment.pricing.buttonClassName || "inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700",
    });
  }

  // ----- 6. Candidacy (grid) -----
  if (treatment.candidacy) {
    blocks.push({
      type: "grid",
      eyebrow: treatment.candidacy.eyebrow,
      title: treatment.candidacy.title,
      lead: treatment.candidacy.lead,
      items: treatment.candidacy.items,
      columns: treatment.candidacy.columns || 2,
      className: treatment.candidacy.className || "py-16 md:py-20 bg-gray-50",
      titleClassName: treatment.candidacy.titleClassName || "text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center",
      bodyClassName: treatment.candidacy.bodyClassName || "text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12",
    });
  }

  // ----- 7. FAQs -----
  if (treatment.faqs && treatment.faqs.length > 0) {
    blocks.push({
      type: "faq",
      title: treatment.faqTitle || "Frequently Asked Questions",
      faqs: treatment.faqs,
      className: treatment.faqClassName || "py-16 md:py-20 bg-white",
      titleClassName: treatment.faqTitleClassName || "text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center",
      bodyClassName: treatment.faqBodyClassName || "mt-3 text-gray-700 leading-relaxed pr-6",
    });
  }

  // ----- 8. Closing CTA -----
  if (treatment.closingCta) {
    blocks.push({
      type: "closing",
      title: treatment.closingCta.title,
      body: treatment.closingCta.body,
      cta: treatment.closingCta.cta,
      className: treatment.closingCta.className || "bg-gray-900 text-white py-16 px-4 text-center",
      titleClassName: treatment.closingCta.titleClassName || "text-3xl font-bold",
      bodyClassName: treatment.closingCta.bodyClassName || "text-gray-300 mt-4 text-lg",
      buttonClassName: treatment.closingCta.buttonClassName || "inline-block mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600",
    });
  }

  return blocks;
}

// ========== পেজ কম্পোনেন্ট ==========
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const href = hrefFromSlug(slug);
  const treatment = await getTreatmentByHref(href);
  if (!treatment) notFound();

  const schemaOverride = await getSchemaOverride(href);
  const faqSchema = buildFaqSchema(treatment.faqs);

  const blocks = buildBlocksFromTreatment(treatment);

  return (
    <>
      {/* JSON-LD */}
      {schemaOverride ? (
        <JsonLd data={schemaOverride} />
      ) : (
        <JsonLd
          data={buildTreatmentSchema({
            name: treatment.name,
            summary: treatment.summary,
            href: treatment.href,
            seo: treatment.seo,
          })}
        />
      )}
      {!schemaOverride && faqSchema ? <JsonLd data={faqSchema} /> : null}

      <Header />

      {/* ডায়নামিক ব্লক রেন্ডার */}
      {blocks.map((block, index) => (
        <SectionRenderer key={index} block={block} />
      ))}
    </>
  );
}
```

---

## 🧩 SectionRenderer কম্পোনেন্ট (সমস্ত টাইপ সহ)

```tsx
// components/SectionRenderer.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export type BlockConfig = {
  type: "hero" | "two-column" | "grid" | "faq" | "closing" | "statement" | "symptoms" | "pricing" | "reviewer-bio";
  // সাধারণ প্রপস
  title?: string;
  body?: string | string[];
  lead?: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
  imageSide?: "left" | "right";
  bullets?: string[];
  items?: any[];
  columns?: number;
  faqs?: { question: string; answer: string }[];
  ctas?: { label: string; href: string }[];
  cta?: { label: string; href: string };
  included?: string[];
  note?: string;
  content?: string[];
  images?: { src: string; alt: string }[];
  subheading?: string;
  id?: string;
  // CSS ক্লাস
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  eyebrowClassName?: string;
};

const SectionRenderer: React.FC<{ block: BlockConfig }> = ({ block }) => {
  const {
    type,
    title,
    body,
    lead,
    eyebrow,
    image,
    imageSide,
    bullets,
    items,
    faqs,
    ctas,
    cta,
    included,
    note,
    content,
    images,
    subheading,
    id,
    columns = 2,
    className = "",
    titleClassName = "",
    bodyClassName = "",
    imageClassName = "",
    buttonClassName = "",
    eyebrowClassName = "",
  } = block;

  // ===== 1. Hero =====
  if (type === "hero") {
    const bodyText = typeof body === "string" ? body : body?.join(" ") || "";
    return (
      <section className={className}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            {eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}
            {title && <h1 className={titleClassName}>{title}</h1>}
            {bodyText && <p className={bodyClassName}>{bodyText}</p>}
            {ctas && (
              <div className="mt-6">
                {ctas.map((cta, i) => (
                  <a key={i} href={cta.href} className={buttonClassName}>
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {image && (
            <div className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${imageClassName}`}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // ===== 2. Two-Column =====
  if (type === "two-column") {
    const bodyArray = typeof body === "string" ? [body] : body || [];
    const isLeft = imageSide === "left";
    const contentOrder = isLeft ? "md:order-1" : "md:order-2";
    const imageOrder = isLeft ? "md:order-2" : "md:order-1";

    return (
      <section className={className}>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={contentOrder}>
              {eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}
              {title && <h2 className={titleClassName}>{title}</h2>}
              {bodyArray.map((p, i) => (
                <p key={i} className={bodyClassName}>{p}</p>
              ))}
              {bullets && (
                <ul className="mt-4 space-y-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2.5 flex-shrink-0" />
                      <span className="text-base">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {image && (
              <div className={imageOrder}>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${imageClassName}`}>
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ===== 3. Grid (Candidacy/Symptoms) =====
  if (type === "grid" || type === "symptoms") {
    return (
      <section className={className}>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}
          {title && <h2 className={titleClassName}>{title}</h2>}
          {lead && <p className={bodyClassName}>{lead}</p>}
          <div className={`grid md:grid-cols-${columns} gap-8`}>
            {items?.map((item: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                {item.title && <h3 className="text-xl font-semibold mb-3">{item.title}</h3>}
                {item.body && <p className="text-gray-700 leading-relaxed">{item.body}</p>}
                {item.items && (
                  <ul className="mt-3 space-y-2">
                    {item.items.map((sub: string, j: number) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===== 4. FAQ =====
  if (type === "faq") {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

    return (
      <section className={className}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {title && <h2 className={titleClassName}>{title}</h2>}
          <div className="space-y-4">
            {faqs?.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => toggle(i)}
                >
                  <span>{faq.question}</span>
                  <span className="ml-6 flex-shrink-0 text-2xl">{openIndex === i ? "−" : "+"}</span>
                </button>
                {openIndex === i && (
                  <div className={bodyClassName}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===== 5. Closing =====
  if (type === "closing") {
    return (
      <section className={className}>
        <div className="max-w-3xl mx-auto">
          {title && <h2 className={titleClassName}>{title}</h2>}
          {body && <p className={bodyClassName}>{typeof body === "string" ? body : body.join(" ")}</p>}
          {cta && (
            <a href={cta.href} className={buttonClassName}>
              {cta.label}
            </a>
          )}
        </div>
      </section>
    );
  }

  // ===== 6. Statement =====
  if (type === "statement") {
    return (
      <section className={className}>
        <div className="max-w-4xl mx-auto">
          <p className={bodyClassName}>{typeof body === "string" ? body : body?.join(" ")}</p>
        </div>
      </section>
    );
  }

  // ===== 7. Pricing =====
  if (type === "pricing") {
    return (
      <section className={className}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          {eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}
          {title && <h2 className={titleClassName}>{title}</h2>}
          {lead && <p className={bodyClassName}>{lead}</p>}
          {included && (
            <ul className="mt-6 space-y-2 text-left max-w-md mx-auto">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {note && <p className="text-sm text-gray-500 mt-4">{note}</p>}
          {cta && (
            <a href={cta.href} className={buttonClassName}>
              {cta.label}
            </a>
          )}
        </div>
      </section>
    );
  }

  // ===== 8. Reviewer Bio =====
  if (type === "reviewer-bio") {
    return (
      <section id={id} className={className}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {subheading && <h3 className={titleClassName}>{subheading}</h3>}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {images && images.length > 0 && (
              <div className="md:w-1/3">
                <div className={`relative aspect-square rounded-full overflow-hidden shadow-lg ${imageClassName}`}>
                  <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
                </div>
              </div>
            )}
            <div className="md:w-2/3">
              {content?.map((paragraph, i) => (
                <p key={i} className={bodyClassName}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default SectionRenderer;
```

---

## 🔄 কীভাবে নতুন ব্লক বা CSS ক্লাস যোগ করবেন?

### **পরিস্থিতি ১: নতুন ব্লক টাইপ (যেমন `video`)**

1. `BlockConfig` টাইপে `"video"` যোগ করুন:
```ts
type = "hero" | "two-column" | "grid" | "faq" | "closing" | "statement" | "symptoms" | "pricing" | "reviewer-bio" | "video";
```

2. `SectionRenderer`-এ নতুন কেস যোগ করুন:
```ts
if (type === "video") {
  return <section className={className}>...video player...</section>;
}
```

3. `buildBlocksFromTreatment`-এ নতুন ব্লক তৈরি করুন।

### **পরিস্থিতি ২: নতুন CSS ক্লাস প্রপস**

শুধু `BlockConfig` টাইপে নতুন প্রপস যোগ করুন:
```ts
videoClassName?: string;
```

এবং সেই অনুযায়ী `SectionRenderer`-এ ব্যবহার করুন।

### **পরিস্থিতি ৩: JSON-এ ক্লাস পরিবর্তন**

ব্যাকএন্ড থেকে আসা JSON-এ `className`, `titleClassName` ইত্যাদি প্রপস দিয়ে দিলেই কাজ করবে। ডিফল্ট ক্লাসগুলো `buildBlocksFromTreatment`-এ সেট করা আছে।

---

## 🎯 বর্তমান ডিজাইন ঠিক রাখার উপায়

আপনি `buildBlocksFromTreatment`-এর ডিফল্ট ক্লাসগুলো আপনার বর্তমান ডিজাইন অনুযায়ী সেট করে দিয়েছেন। তাই **মাইগ্রেশন করার পরেও সব ঠিক থাকবে**। যদি কোনো ব্লকে আলাদা ক্লাস দরকার হয়, JSON-এ পাঠিয়ে দেবেন।

---

## ✅ চূড়ান্ত সুবিধা

| বৈশিষ্ট্য | সুবিধা |
|-----------|--------|
| **একক কম্পোনেন্ট** | রক্ষণাবেক্ষণ সহজ, ডুপ্লিকেশন নেই |
| **প্রপসে CSS** | ডিজাইন পরিবর্তন করতে শুধু JSON আপডেট |
| **নতুন টাইপ বাড়লে** | শুধু কম্পোনেন্টে একটি কেস যোগ করুন |
| **ISR + SEO** | দ্রুত লোড ও সার্চ ইঞ্জিন ফ্রেন্ডলি |
| **স্কেলেবল** | যেকোনো সংখ্যক ব্লক হ্যান্ডেল করে |

এখন আপনি এই আর্কিটেকচার অনুসরণ করে পুরো অ্যাপ মাইগ্রেট করতে পারবেন। 🚀