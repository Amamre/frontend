import { Typography } from "@mui/material";
import {
  AppContainer,
  BodyCopy,
  ContentGrid,
  Eyebrow,
  Headline,
  PageSection,
  Surface,
} from "@/components/ui/Primitives";
import { SHIPPING_OPTIONS } from "@/constants/config";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shipping & Returns",
  description: "AMAMRE shipping, delivery, returns, and exchanges.",
  path: "/shipping-returns",
});

export default function ShippingReturnsPage() {
  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>Support</Eyebrow>
        <Headline>Shipping and returns</Headline>
        <ContentGrid sx={{ mt: 4.5 }}>
          {SHIPPING_OPTIONS.map((option) => (
            <Surface component="article" key={option.id}>
              <Eyebrow>{option.name}</Eyebrow>
              <BodyCopy>{option.description}</BodyCopy>
            </Surface>
          ))}
        </ContentGrid>
        <Typography component="h2" sx={{ mt: 4.25 }}>
          Returns
        </Typography>
        <BodyCopy>
          AMAMRE should support the statutory EU withdrawal period and a clear
          return portal before launch. Items must be unworn, unwashed, and
          returned with original tags.
        </BodyCopy>
      </AppContainer>
    </PageSection>
  );
}
