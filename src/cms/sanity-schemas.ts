type FieldDefinition = {
  name: string;
  title: string;
  type: string;
  of?: Array<{ type: string }>;
  options?: Record<string, unknown>;
  validation?: string;
};

type SchemaDefinition = {
  name: string;
  title: string;
  type: "document";
  fields: FieldDefinition[];
};

export const sanitySchemas: SchemaDefinition[] = [
  {
    name: "productEditorial",
    title: "Product Editorial",
    type: "document",
    fields: [
      { name: "title", title: "Title", type: "string", validation: "required" },
      { name: "slug", title: "Slug", type: "slug", validation: "required" },
      { name: "shopifyHandle", title: "Shopify Handle", type: "string" },
      { name: "collection", title: "Collection", type: "string" },
      { name: "story", title: "Story", type: "text" },
      { name: "campaignImage", title: "Campaign Image", type: "image" },
      {
        name: "modules",
        title: "Editorial Modules",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      },
      { name: "seoTitle", title: "SEO Title", type: "string" },
      { name: "seoDescription", title: "SEO Description", type: "text" },
    ],
  },
  {
    name: "collection",
    title: "Collection",
    type: "document",
    fields: [
      { name: "title", title: "Title", type: "string", validation: "required" },
      { name: "slug", title: "Slug", type: "slug", validation: "required" },
      { name: "description", title: "Description", type: "text" },
      { name: "heroImage", title: "Hero Image", type: "image" },
      { name: "shopifyRule", title: "Shopify Rule", type: "string" },
      {
        name: "modules",
        title: "Modules",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      },
    ],
  },
  {
    name: "page",
    title: "Page",
    type: "document",
    fields: [
      { name: "title", title: "Title", type: "string", validation: "required" },
      { name: "slug", title: "Slug", type: "slug", validation: "required" },
      {
        name: "content",
        title: "Content",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      },
      { name: "seoTitle", title: "SEO Title", type: "string" },
      { name: "seoDescription", title: "SEO Description", type: "text" },
    ],
  },
  {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
      { name: "announcement", title: "Announcement Bar", type: "string" },
      { name: "newsletterCopy", title: "Newsletter Copy", type: "text" },
      { name: "instagramUrl", title: "Instagram URL", type: "url" },
      { name: "returnsPortalUrl", title: "Returns Portal URL", type: "url" },
    ],
  },
];
