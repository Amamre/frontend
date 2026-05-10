import {
  AppContainer,
  BodyCopy,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
} from "@/components/ui/Primitives";
import { Box, Typography } from "@mui/material";

type Section = {
  title: string;
  body: string;
};

export function LegalPage({
  intro,
  sections,
  title,
}: {
  intro: string;
  sections: Section[];
  title: string;
}) {
  return (
    <PageSection>
      <AppContainer component="article" sx={{ maxWidth: 860 }}>
        <Eyebrow>AMAMBRA</Eyebrow>
        <Headline>{title}</Headline>
        <Subhead sx={{ mt: 2.25 }}>{intro}</Subhead>
        {sections.map((section) => (
          <Box component="section" key={section.title}>
            <Typography variant="h2" sx={{ mt: 4.25, fontWeight: 600 }}>
              {section.title}
            </Typography>
            <BodyCopy sx={{ pt: 2 }}>{section.body}</BodyCopy>
          </Box>
        ))}
      </AppContainer>
    </PageSection>
  );
}
