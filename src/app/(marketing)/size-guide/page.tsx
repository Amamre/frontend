import {
  AppContainer,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { SIZE_CHART } from "@/constants/config";
import { createMetadata } from "@/lib/seo";
import { brandColors } from "@/styles/theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const metadata = createMetadata({
  title: "Size Guide",
  description: "AMAMBRA size guide for clothing and accessories.",
  path: "/size-guide",
});

export default function SizeGuidePage() {
  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>Fit</Eyebrow>
        <Headline>Size guide</Headline>
        <Subhead sx={{ mt: 2.25 }}>
          AMAMBRA pieces are designed with relaxed premium streetwear
          proportions. Choose your normal size for intended volume or size down
          for a closer fit.
        </Subhead>
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
                <TableCell>Size</TableCell>
                <TableCell>Chest</TableCell>
                <TableCell>Waist</TableCell>
                <TableCell>Fit note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SIZE_CHART.clothing.map((row) => (
                <TableRow key={row.size}>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.chest}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.label}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Surface>
      </AppContainer>
    </PageSection>
  );
}
