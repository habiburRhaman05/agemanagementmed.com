-- Expected updates: step 1 = 2 Treatment rows; step 2 = 1 Treatment row.
-- Rollback note: reverse the three replacements below (or restore Treatment.data from backup).
-- This file is a dry-run template: review its output, then change the final ROLLBACK to COMMIT manually.

BEGIN;

CREATE TEMP TABLE edits (
  step int,
  slug text,
  old_txt text,
  new_txt text
);

INSERT INTO edits (step, slug, old_txt, new_txt) VALUES
  (1, $q$bioidentical-hormone-replacement-therapy$q$,
      $q$particularly during aging or andropause.$q$,
      $q$particularly during aging or [andropause](/blog/andropause-symptoms).$q$),
  (1, $q$perimenopause-menopause$q$,
      $q$Treatment plans should always be personalized based on medical history, symptoms, and labwork.$q$,
      $q$Treatment plans should always be personalized based on medical history, symptoms, and labwork. Learn more about [HRT pros and cons](/blog/bioidentical-hormones-pros-and-cons), including what newer research says about the Women's Health Initiative findings.$q$),
  (2, $q$bioidentical-hormone-replacement-therapy$q$,
      $q$difficult to manage, and do not evenly deliver hormones.$q$,
      $q$difficult to manage, and do not evenly deliver hormones. If you're researching BHRT pellets side effects or comparing delivery methods, our guide to [bioidentical hormones pros and cons](/blog/bioidentical-hormones-pros-and-cons) is a helpful place to start.$q$);

-- PRE-CHECK: every old fragment must occur exactly once for its scoped slug.
SELECT
  e.step,
  e.slug,
  e.old_txt,
  COALESCE(
    (length(t.data::text) - length(replace(t.data::text, e.old_txt, ''))) / NULLIF(length(e.old_txt), 0),
    0
  ) AS occurrences
FROM edits e
LEFT JOIN "Treatment" t
  ON t.slug = e.slug
 AND t."deletedAt" IS NULL
ORDER BY e.step, e.slug;

-- Step 1 expected UPDATE count: 2 (hub FAQ row and perimenopause FAQ row).
UPDATE "Treatment" t
SET data = replace(t.data::text, e.old_txt, e.new_txt)::jsonb,
    "updatedAt" = now()
FROM edits e
WHERE e.step = 1
  AND t.slug = e.slug
  AND t."deletedAt" IS NULL
  AND (length(t.data::text) - length(replace(t.data::text, e.old_txt, ''))) / NULLIF(length(e.old_txt), 0) = 1;

-- Step 2 expected UPDATE count: 1 (the hub FAQ row; separate because its slug also appears in step 1).
UPDATE "Treatment" t
SET data = replace(t.data::text, e.old_txt, e.new_txt)::jsonb,
    "updatedAt" = now()
FROM edits e
WHERE e.step = 2
  AND t.slug = e.slug
  AND t."deletedAt" IS NULL
  AND (length(t.data::text) - length(replace(t.data::text, e.old_txt, ''))) / NULLIF(length(e.old_txt), 0) = 1;

-- VERIFY: data remains JSONB and each expected FAQ link is present.
SELECT
  t.slug,
  jsonb_typeof(t.data) AS data_type,
  t.data::text LIKE '%[andropause](/blog/andropause-symptoms)%' AS has_andropause_link,
  t.data::text LIKE '%[bioidentical hormones pros and cons](/blog/bioidentical-hormones-pros-and-cons)%' AS has_pros_and_cons_link,
  t.data::text LIKE '%[HRT pros and cons](/blog/bioidentical-hormones-pros-and-cons)%' AS has_hrt_link
FROM "Treatment" t
WHERE t.slug IN ($q$bioidentical-hormone-replacement-therapy$q$, $q$perimenopause-menopause$q$)
  AND t."deletedAt" IS NULL
ORDER BY t.slug;

-- VERIFY the male variant remains untouched for the row 4 link.
SELECT
  t.slug,
  NOT (t.data::text LIKE '%[andropause](/blog/andropause-symptoms)%') AS does_not_have_row_4_link
FROM "Treatment" t
WHERE t.slug = $q$hormone-therapy-men$q$
  AND t."deletedAt" IS NULL;

ROLLBACK;
