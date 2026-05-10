import { Box } from "@mui/material";
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
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.contactDescription",
    path: "/contact",
    titleKey: "pages.contactTitle",
  });
}

export default async function ContactPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <PageSection>
      <AppContainer>
        <SplitLayout>
          <Box>
            <Eyebrow>{t("contact.eyebrow")}</Eyebrow>
            <Headline>{t("contact.headline")}</Headline>
            <Subhead sx={{ mt: 2.25 }}>{t("contact.body")}</Subhead>

            <ContentGrid sx={{ mt: 4.5 }}>
              <Surface>
                <Eyebrow>{common("labels.email")}</Eyebrow>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </Surface>
              <Surface>
                <Eyebrow>{common("labels.phone")}</Eyebrow>
                <a href={`tel:${BRAND.phone.replaceAll(" ", "")}`}>
                  {BRAND.phone}
                </a>
              </Surface>
              <Surface>
                <Eyebrow>{common("labels.studio")}</Eyebrow>
                <BodyCopy sx={{ m: 0 }}>{common("brand.location")}</BodyCopy>
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
