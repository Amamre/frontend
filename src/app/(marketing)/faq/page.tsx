import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import {
  AppContainer,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
} from "@/components/ui/Primitives";
import { BRAND } from "@/constants/config";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.faqDescription",
    path: "/faq",
    titleKey: "pages.faqTitle",
  });
}

const FAQ_KEYS = ["1", "2", "3", "4", "5", "6", "7"] as const;

export default async function FAQPage() {
  const t = await getTypedTranslations("marketing");

  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
        <Headline>{t("faq.headline")}</Headline>
        <Subhead sx={{ mt: 2.25, mb: 4.5 }}>{t("faq.body")}</Subhead>
        <Box sx={{ display: "grid", gap: 1.25 }}>
          {FAQ_KEYS.map((key) => (
            <Accordion key={key} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t(`faq.q${key}`)}
              </AccordionSummary>
              <AccordionDetails>
                {key === "7"
                  ? t("faq.a7", { email: BRAND.email })
                  : t(`faq.a${key}`)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </AppContainer>
    </PageSection>
  );
}
