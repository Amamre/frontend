import { Box } from "@mui/material";
import Image from "next/image";
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
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.aboutDescription",
    path: "/about",
    titleKey: "pages.aboutTitle",
  });
}

export default async function AboutPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <>
      <PageSection>
        <AppContainer>
          <SplitLayout>
            <Box>
              <Eyebrow>
                {t("about.eyebrow", { location: common("brand.location") })}
              </Eyebrow>
              <DisplayHeading>{t("about.headline")}</DisplayHeading>
            </Box>
            <Surface>
              <BodyCopy>
                {t("about.bodyOne", { brand: common("brand.name") })}
              </BodyCopy>
              <BodyCopy sx={{ pt: 2 }}>{t("about.bodyTwo")}</BodyCopy>
            </Surface>
          </SplitLayout>
        </AppContainer>
      </PageSection>

      <PageSection tight>
        <AppContainer>
          <ImageFrame sx={{ aspectRatio: "16 / 7" }}>
            <Image
              alt={common("brand.campaignAlt")}
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
                title: t("about.minimalismTitle"),
                body: t("about.minimalismBody"),
              },
              {
                title: t("about.heritageTitle"),
                body: t("about.heritageBody"),
              },
              {
                title: t("about.premiumTitle"),
                body: t("about.premiumBody"),
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
