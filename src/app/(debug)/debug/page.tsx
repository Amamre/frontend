import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt
}`;

const options = {
  next: {
    revalidate: 30,
  },
};

export default async function DebugPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        py: 10,
      }}
    >
      <Stack spacing={6}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          Sanity Posts
        </Typography>

        <Stack divider={<Divider flexItem />} spacing={3}>
          {posts.map((post) => (
            <Link
              href={`/debug/${post.slug.current}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box
                key={post._id}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  transition: "opacity 0.2s ease",

                  "&:hover": {
                    opacity: 0.72,
                  },
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Box>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
