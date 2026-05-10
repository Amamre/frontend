import {
  AppContainer,
  BodyCopy,
  ContentGrid,
  DisplayHeading,
  Eyebrow,
  ImageFrame,
  PageSection,
  SplitLayout,
  Surface,
} from "@/components/ui/Primitives";
import { BRAND } from "@/constants/config";
import { createMetadata } from "@/lib/seo";
import { Box } from "@mui/material";
import Image from "next/image";

export const metadata = createMetadata({
  title: "About",
  description:
    "AMAMBRA is a Stuttgart-based Afro-European accessible premium streetwear brand.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageSection>
        <AppContainer>
          <SplitLayout>
            <Box>
              <Eyebrow>{BRAND.location}</Eyebrow>
              <DisplayHeading>
                A modern wardrobe between cultures.
              </DisplayHeading>
            </Box>
            <Surface>
              <BodyCopy>
                {BRAND.name} was created for people who live in the overlap:
                African heritage, European restraint, streetwear confidence, and
                a practical everyday rhythm. The brand is premium by
                construction, not by exclusion.
              </BodyCopy>
              <BodyCopy sx={{ pt: 2 }}>
                The launch collection focuses on pieces with a real reason to
                exist: satin-lined hoods and beanies, structured layers, precise
                trims, and understated details that carry heritage without
                noise.
              </BodyCopy>
            </Surface>
          </SplitLayout>
        </AppContainer>
      </PageSection>

      <PageSection tight>
        <AppContainer>
          <ImageFrame sx={{ aspectRatio: "16 / 7" }}>
            <Image
              alt="AMAMBRA campaign photographed in a minimal atelier"
              fill
              priority
              sizes="100vw"
              src="/editorial/amambra-hero-campaign.png"
            />
          </ImageFrame>
        </AppContainer>
      </PageSection>

      <PageSection>
        <AppContainer>
          <ContentGrid>
            {[
              {
                title: "European minimalism",
                body: "A restrained visual language: matte black, soft ivory, decisive proportions, and enough whitespace to let materials speak.",
              },
              {
                title: "African heritage",
                body: "References appear through border rhythm, embroidery placement, satin interiors, and subtle pattern language.",
              },
              {
                title: "Accessible premium",
                body: "The goal is a luxury feeling at a price point designed for real wardrobes, repeat wear, and long-term loyalty.",
              },
            ].map((item) => (
              <Surface component="article" key={item.title}>
                <Eyebrow>{item.title}</Eyebrow>
                <BodyCopy sx={{ m: 0 }}>{item.body}</BodyCopy>
              </Surface>
            ))}
          </ContentGrid>
        </AppContainer>
      </PageSection>
    </>
  );
}
