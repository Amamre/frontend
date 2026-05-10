import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  AppContainer,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { SIZE_CHART } from "@/constants/config";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { brandColors } from "@/styles/theme";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.sizeGuideDescription",
    path: "/size-guide",
    titleKey: "pages.sizeGuideTitle",
  });
}

export default async function SizeGuidePage() {
  const t = await getTypedTranslations("marketing");

  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>{t("sizeGuide.eyebrow")}</Eyebrow>
        <Headline>{t("sizeGuide.headline")}</Headline>
        <Subhead sx={{ mt: 2.25 }}>{t("sizeGuide.body")}</Subhead>
        <Surface sx={{ mt: 4.5, overflowX: "auto" }}>
          <Table
            sx={{
              minWidth: 560,
              "& th, & td": {
                borderColor: brandColors.border,
                color: "inherit",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>{t("sizeGuide.size")}</TableCell>
                <TableCell>{t("sizeGuide.chest")}</TableCell>
                <TableCell>{t("sizeGuide.waist")}</TableCell>
                <TableCell>{t("sizeGuide.fitNote")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SIZE_CHART.clothing.map((row) => (
                <TableRow key={row.size}>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.chest}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{sizeLabel(row.label, t)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Surface>
      </AppContainer>
    </PageSection>
  );
}

function sizeLabel(
  label: string,
  t: Awaited<ReturnType<typeof getTypedTranslations<"marketing">>>,
) {
  const labels: Record<string, Parameters<typeof t>[0]> = {
    Small: "sizeGuide.small",
    Medium: "sizeGuide.medium",
    Large: "sizeGuide.large",
    "Extra Large": "sizeGuide.extraLarge",
  };

  return labels[label] ? t(labels[label]) : label;
}
