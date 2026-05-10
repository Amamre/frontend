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
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.shippingReturnsDescription",
    path: "/shipping-returns",
    titleKey: "pages.shippingReturnsTitle",
  });
}

const SHIPPING_OPTION_KEYS = ["standard", "express"] as const;

export default async function ShippingReturnsPage() {
  const t = await getTypedTranslations("marketing");

  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>{t("shipping.eyebrow")}</Eyebrow>
        <Headline>{t("shipping.headline")}</Headline>
        <ContentGrid sx={{ mt: 4.5 }}>
          {SHIPPING_OPTION_KEYS.map((option) => (
            <Surface component="article" key={option}>
              <Eyebrow>{t(`shipping.${option}`)}</Eyebrow>
              <BodyCopy>{t(`shipping.${option}Description`)}</BodyCopy>
            </Surface>
          ))}
        </ContentGrid>
        <Typography variant="h2" sx={{ mt: 4.25, fontWeight: 600 }}>
          {t("shipping.returnsTitle")}
        </Typography>
        <BodyCopy sx={{ pt: 2 }}>{t("shipping.returnsBody")}</BodyCopy>
      </AppContainer>
    </PageSection>
  );
}
