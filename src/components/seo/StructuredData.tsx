import type { JsonLdData } from "@/lib/structured-data";

type StructuredDataProps = {
  data: JsonLdData | readonly JsonLdData[];
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content and the payload is escaped before injection.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
