// Server-safe (no "use client", no hooks) — renders a single JSON-LD
// <script> tag for whatever schema.org object is passed in.
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
