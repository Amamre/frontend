import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { CMSArticle, CMSPage, Collection } from "@/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const imageBuilder = imageUrlBuilder(sanityClient);

type ImageBuilderSource = Parameters<typeof imageBuilder.image>[0];

export const urlFor = (source: ImageBuilderSource) =>
  imageBuilder.image(source);

export const isSanityConfigured = (): boolean => Boolean(projectId);

export const getPages = async (): Promise<CMSPage[]> => {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `*[_type == "page"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    content,
    publishedAt,
    "updatedAt": _updatedAt
  }`;

  return sanityClient.fetch<CMSPage[]>(query);
};

export const getPageBySlug = async (slug: string): Promise<CMSPage | null> => {
  if (!isSanityConfigured()) {
    return null;
  }

  const query = `*[_type == "page" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    content,
    publishedAt,
    "updatedAt": _updatedAt
  }`;

  return sanityClient.fetch<CMSPage | null>(query, { slug });
};

export const getArticles = async (limit = 10): Promise<CMSArticle[]> => {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `*[_type == "article"] | order(publishedAt desc)[0...$limit] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    author,
    publishedAt
  }`;

  return sanityClient.fetch<CMSArticle[]>(query, { limit });
};

export const getArticleBySlug = async (
  slug: string,
): Promise<CMSArticle | null> => {
  if (!isSanityConfigured()) {
    return null;
  }

  const query = `*[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    author,
    publishedAt
  }`;

  return sanityClient.fetch<CMSArticle | null>(query, { slug });
};

export const getCollections = async (): Promise<Collection[]> => {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `*[_type == "collection"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    image,
    "products": [],
    publishedAt
  }`;

  return sanityClient.fetch<Collection[]>(query);
};

export default sanityClient;
