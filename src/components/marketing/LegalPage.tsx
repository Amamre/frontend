import { alpha, Box, Stack, Typography } from "@mui/material";
import {
  AppContainer,
  BodyCopy,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
} from "@/components/ui/Primitives";
import { brandColors, transitions } from "@/styles/theme";

type Section = {
  body: string | readonly string[];
  title: string;
};

export function LegalPage({
  eyebrow,
  intro,
  sections,
  title,
  tocLabel,
}: {
  eyebrow: string;
  intro: string;
  sections: Section[];
  title: string;
  tocLabel: string;
}) {
  const indexedSections = sections.map((section, index) => ({
    ...section,
    id: `section-${index + 1}`,
  }));

  return (
    <PageSection>
      <AppContainer component="article" sx={{ maxWidth: 1120 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Headline>{title}</Headline>
        <Subhead sx={{ mt: 2.25 }}>{intro}</Subhead>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "220px minmax(0, 1fr)" },
            gap: { xs: 3.5, md: 6 },
            mt: { xs: 4, md: 5.5 },
            alignItems: "start",
          }}
        >
          <Box
            aria-label={tocLabel}
            component="nav"
            sx={{
              position: { md: "sticky" },
              top: { md: "calc(var(--header-height) + 32px)" },
              display: { xs: "none", md: "block" },
              borderLeft: `1px solid ${brandColors.border}`,
              pl: 2,
            }}
          >
            <Typography
              component="p"
              sx={{
                m: "0 0 14px",
                color: alpha(brandColors.goldSoft, 0.78),
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {tocLabel}
            </Typography>
            <Stack spacing={1.2}>
              {indexedSections.map((section) => (
                <Typography
                  component="a"
                  href={`#${section.id}`}
                  key={section.id}
                  sx={{
                    color: alpha(brandColors.ivory, 0.58),
                    fontSize: "0.82rem",
                    lineHeight: 1.45,
                    transition: `color 180ms ${transitions.ease}`,
                    "&:hover": {
                      color: brandColors.goldSoft,
                    },
                    "&:focus-visible": {
                      outline: `1px solid ${alpha(brandColors.goldSoft, 0.65)}`,
                      outlineOffset: "4px",
                    },
                  }}
                >
                  {section.title}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box>
            {indexedSections.map((section, index) => {
              const paragraphs = Array.isArray(section.body)
                ? section.body
                : [section.body];

              return (
                <Box
                  component="section"
                  id={section.id}
                  key={section.id}
                  sx={{
                    scrollMarginTop: "calc(var(--header-height) + 28px)",
                    pt: index === 0 ? 0 : 4.25,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      m: 0,
                      color: brandColors.ivory,
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: { xs: "1.42rem", md: "1.72rem" },
                      fontWeight: 500,
                      letterSpacing: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Stack spacing={1.45} sx={{ pt: 2 }}>
                    {paragraphs.map((paragraph) => (
                      <BodyCopy key={paragraph}>{paragraph}</BodyCopy>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>
      </AppContainer>
    </PageSection>
  );
}
