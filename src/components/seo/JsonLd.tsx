/** Renders one `<script type="application/ld+json">` block. No business logic — callers build the object. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint: JSON-LD requires raw script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
