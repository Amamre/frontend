import { ContactForm } from "@/components/forms/ContactForm";
import {
  AppContainer,
  BodyCopy,
  ContentGrid,
  Eyebrow,
  Headline,
  PageSection,
  SplitLayout,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { BRAND } from "@/constants/config";
import { createMetadata } from "@/lib/seo";
import { Box } from "@mui/material";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact AMAMBRA customer care, press, and wholesale from Stuttgart, Germany.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageSection>
      <AppContainer>
        <SplitLayout>
          <Box>
            <Eyebrow>Contact</Eyebrow>
            <Headline>Customer care, press, and partnerships.</Headline>
            <Subhead sx={{ mt: 2.25 }}>
              Send us a note for sizing, order questions, editorial requests, or
              wholesale conversations.
            </Subhead>

            <ContentGrid sx={{ mt: 4.5 }}>
              <Surface>
                <Eyebrow>Email</Eyebrow>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </Surface>
              <Surface>
                <Eyebrow>Phone</Eyebrow>
                <a href={`tel:${BRAND.phone.replaceAll(" ", "")}`}>
                  {BRAND.phone}
                </a>
              </Surface>
              <Surface>
                <Eyebrow>Studio</Eyebrow>
                <BodyCopy sx={{ m: 0 }}>{BRAND.location}</BodyCopy>
              </Surface>
            </ContentGrid>
          </Box>

          <Surface>
            <ContactForm />
          </Surface>
        </SplitLayout>
      </AppContainer>
    </PageSection>
  );
}
