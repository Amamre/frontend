import { Box, Button, Container, Stack, Typography } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POST_QUERY = `*[
  _type == "post"
  && slug.current == $slug
][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({
        projectId,
        dataset,
      }).image(source)
    : null;

const options = {
  next: {
    revalidate: 30,
  },
};

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    resolvedParams,
    options,
  );

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(675).url()
    : null;

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        py: 10,
      }}
    >
      <Stack spacing={5}>
        <Link
          href="/debug"
          style={{
            textDecoration: "none",
            alignSelf: "flex-start",
          }}
        >
          <Button
            variant="text"
            sx={{
              px: 0,
              minWidth: "unset",
            }}
          >
            ← Back to posts
          </Button>
        </Link>

        {postImageUrl && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              priority
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {post.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Published: {new Date(post.publishedAt).toLocaleDateString()}
          </Typography>
        </Stack>

        <Box
          sx={{
            "& p": {
              mb: 2,
              lineHeight: 1.8,
            },

            "& h1, & h2, & h3, & h4": {
              mt: 6,
              mb: 2,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            },

            "& ul, & ol": {
              pl: 4,
              mb: 2,
            },

            "& li": {
              mb: 1,
            },

            "& a": {
              color: "primary.main",
            },

            "& img": {
              maxWidth: "100%",
              borderRadius: 16,
            },
          }}
        >
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </Box>
      </Stack>
    </Container>
  );
}
