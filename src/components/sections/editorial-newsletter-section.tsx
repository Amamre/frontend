"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { AppContainer, Eyebrow } from "@/components/ui/Primitives";
import { brandColors, transitions } from "@/styles/theme";

const NewsletterSurface = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  border: `1px solid ${alpha(brandColors.goldSoft, 0.18)}`,
  borderRadius: 8,
  background:
    `linear-gradient(118deg, ${alpha(brandColors.olive, 0.34)} 0%, transparent 34%), ` +
    `linear-gradient(250deg, ${alpha(brandColors.goldSoft, 0.13)} 0%, transparent 32%), ` +
    `linear-gradient(180deg, ${alpha("#050505", 0.74)}, ${alpha(brandColors.ink, 0.94)})`,
  boxShadow: "0 34px 110px rgba(0, 0, 0, 0.34)",
  "&::before": {
    position: "absolute",
    inset: 0,
    content: '""',
    backgroundImage:
      "linear-gradient(rgba(250, 248, 241, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 248, 241, 0.03) 1px, transparent 1px)",
    backgroundSize: "96px 96px",
    maskImage:
      "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
    opacity: 0.34,
    pointerEvents: "none",
  },
  "&::after": {
    position: "absolute",
    right: "-12%",
    bottom: "-18%",
    width: "48%",
    height: "72%",
    content: '""',
    background: `radial-gradient(circle, ${alpha(brandColors.goldSoft, 0.18)}, transparent 68%)`,
    filter: "blur(10px)",
    opacity: 0.8,
    pointerEvents: "none",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 6,
  },
}));

export function EditorialNewsletterSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5.5, md: 8.5 },
      }}
    >
      <AppContainer>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <NewsletterSurface>
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(0, 1.08fr) minmax(320px, 0.72fr)",
                },
                gap: { xs: 4, md: 7 },
                alignItems: "end",
                minHeight: { xs: 520, md: 560 },
                p: {
                  xs: "34px 22px",
                  sm: "44px 34px",
                  md: "72px 68px",
                },
              }}
            >
              <Stack spacing={{ xs: 2.5, md: 3.5 }}>
                <Eyebrow
                  sx={{ m: 0, color: alpha(brandColors.goldSoft, 0.92) }}
                >
                  Studio notes
                </Eyebrow>
                <Typography
                  component="h2"
                  sx={{
                    maxWidth: 760,
                    m: 0,
                    color: brandColors.ivory,
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: {
                      xs: "clamp(3rem, 16vw, 4.9rem)",
                      md: "clamp(5rem, 9vw, 8.4rem)",
                    },
                    fontWeight: 500,
                    letterSpacing: 0,
                    lineHeight: { xs: 0.9, md: 0.86 },
                  }}
                >
                  Stay close to the studio.
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 570,
                    color: alpha(brandColors.ivory, 0.7),
                    fontSize: { xs: "1rem", md: "1.12rem" },
                    lineHeight: 1.78,
                  }}
                >
                  Early access to drops, editorials, private Stuttgart releases,
                  and collection notes from the AMAMRE world.
                </Typography>
              </Stack>

              <Box
                sx={{
                  p: { xs: 0, md: "0 0 8px" },
                  transition: `transform 220ms ${transitions.ease}`,
                  "&:hover": {
                    transform: { md: "translateY(-2px)" },
                  },
                }}
              >
                <NewsletterForm source="home-editorial" />
              </Box>
            </Box>
          </NewsletterSurface>
        </Box>
      </AppContainer>
    </Box>
  );
}
